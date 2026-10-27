# Lab 5: Inter-VLAN Routing with Router-on-a-Stick (CCNA · Packet Tracer)

> 🇪🇸 [Leer en español](./README.md)

Fifth block of my networking portfolio (CCNA). In the previous lab, two separate VLANs were configured across two switches and proven to be isolated from each other. In this lab, I resolve that limitation by introducing a router (**R1**, Cisco 2911) to connect both networks using **Inter-VLAN Routing (Router-on-a-Stick)**, leveraging a single physical cable subdivided into logical subinterfaces with **802.1Q** tagging.

| | |
|---|---|
| **Tool** | Cisco Packet Tracer |
| **Devices** | 1 × Cisco 2911 (R1), 2 × Catalyst 2960-24TT (SW1, SW2) and 4 PCs |
| **Execution Time** | ~1 h |
| **Date** | 26/10/2026 |
| **Packet Tracer File** | [`05_Router_on_a_Stick.pkt`](05_Router_on_a_Stick.pkt) |

---

## Quick technical summary

| Check | Expected result | What it demonstrates |
|---|---|---|
| PC1 → PC3 (192.168.10.13) | Success; TTL remains 128 in this simulation | Same-VLAN traffic is switched at Layer 2 |
| PC1 → gateway (192.168.10.1) | Success | VLAN 10 gateway is reachable |
| PC1 → PC2 (192.168.20.12) | Success after ARP resolution; TTL 127 | Traffic is routed between VLANs |
| show ip route on R1 | Connected routes for 192.168.10.0/24 and 192.168.20.0/24 | Both subinterfaces are routing endpoints |
| show interfaces gi0/0.20 | Encapsulation is 802.1Q VLAN 20 | Checks the VLAN tag configured on the subinterface |

**Fast diagnostic commands**

```text
show interfaces trunk
show ip interface brief
show ip route
show interfaces gi0/0.10
show interfaces gi0/0.20
```

If the interfaces are up but inter-VLAN traffic fails, check the switch trunk, each subinterface's dot1q VLAN ID, endpoint IP settings and default gateways. **Up/up by itself does not prove the VLAN encapsulation is correct.**

## 🎯 Objectives

- Connect a router to the existing topology using a single physical link to SW1.
- Configure the switch-to-router link as an **802.1Q trunk**.
- Configure logical subinterfaces on the router (`Gi0/0.10` and `Gi0/0.20`) and associate them with their respective VLANs.
- Assign Default Gateways to end workstations.
- Verify Inter-VLAN routing through `ping` tests, observation of **TTL decrement (128 vs 127)**, and `tracert` traces.
- Inspect 802.1Q tag transformations over the same cable in Simulation Mode (entering with tag 10, exiting with tag 20).
- Cause two controlled configuration failures (access port mismatch and encapsulation error), diagnosing and resolving both.

---

## 🗺️ Topology & The "Router-on-a-Stick" Concept

![Initial Topology](img/05-01-topologia-inicial.png)

```text
               [ R1 ] (Cisco 2911)
                 |
            G0/0 | (Single physical link: "the stick")
                 | Subinterfaces: .10 (VLAN 10) & .20 (VLAN 20)
                 |
          Gi0/2  | (Trunk 802.1Q)
        [ SW1 ]-----------------[ SW2 ] (Cisco 2960)
        /     \      Gi0/1      /     \
       /       \    (Trunk)    /       \
     Fa0/1   Fa0/2           Fa0/1   Fa0/2
    [PC1]   [PC2]           [PC3]   [PC4]
   (VLAN10) (VLAN20)       (VLAN10) (VLAN20)
```

### Why "Router-on-a-Stick" and only one router?
Before running the lab, I wondered whether a second router or multiple physical cables were needed. The answer is no: the entire network hangs from a single physical cable connected to the switch, like a lollipop or a router "on a stick".

Running a dedicated physical cable for each VLAN into different router ports would be more expensive, waste costly router interfaces, clutter physical cabling, and introduce more failure points. With Router-on-a-Stick, a single GigabitEthernet port cleanly services multiple virtual networks.

| Device | Interface | Connection / Role | VLAN / IP / Gateway |
|---|---|---|---|
| **SW1** | Fa0/1 | PC1 | VLAN 10 · Access |
| **SW1** | Fa0/2 | PC2 | VLAN 20 · Access |
| **SW1** | Gi0/1 | SW2 Gi0/1 | Trunk (switch-to-switch link) |
| **SW1** | Gi0/2 | R1 Gi0/0 | Trunk (switch-to-router link) |
| **SW2** | Fa0/1 | PC3 | VLAN 10 · Access |
| **SW2** | Fa0/2 | PC4 | VLAN 20 · Access |
| **R1** | Gi0/0 | Physical interface | No IP (transport Layer 2/3 only) |
| **R1** | Gi0/0.10 | Logical subinterface | 192.168.10.1/24 (VENTAS Gateway) |
| **R1** | Gi0/0.20 | Logical subinterface | 192.168.20.1/24 (IT Gateway) |
| **PC1** | NIC | SW1 Fa0/1 | 192.168.10.11/24 · GW: 192.168.10.1 |
| **PC2** | NIC | SW1 Fa0/2 | 192.168.20.12/24 · GW: 192.168.20.1 |
| **PC3** | NIC | SW2 Fa0/1 | 192.168.10.13/24 · GW: 192.168.10.1 |
| **PC4** | NIC | SW2 Fa0/2 | 192.168.20.14/24 · GW: 192.168.20.1 |

---

## 🛠️ Step-by-Step Implementation

### Phase 0 · Initial State (The Baseline)

Building upon the previous lab (`02_VLAN_Trunk.pkt`), I saved a clean copy as `05_Router_on_a_Stick.pkt`. I added the Cisco 2911 router (R1) and cabled `Gi0/0` directly to `Gi0/2` on SW1 with a straight-through copper cable. The link initially shows red because Cisco router ports are administratively shut down by default.

Before configuring anything, I ran a baseline ping test from PC1 (VLAN 10) to PC2 (VLAN 20):

![Initial ping failing](img/05-02-ping-antes-falla.png)

As expected, ping timed out with 100% loss: without Layer 3 routing or default gateways, VLANs remain strictly isolated.

On SW1, I verified the initial trunk status:
```text
show interfaces trunk
```

![Initial SW1 trunk](img/05-03-sw1-trunk-inicial.png)

Only `Gi0/1` (toward SW2) was active as a trunk. Port `Gi0/2` had not been configured yet.

---

### Phase 1 · Switch Trunk Port Toward the Router (SW1)

To allow the switch to send 802.1Q tagged frames to the router, I forced `Gi0/2` into trunk mode (routers do not negotiate DTP):

```text
SW1# conf t
SW1(config)# interface gi0/2
SW1(config-if)# switchport mode trunk
SW1(config-if)# end
```

![SW1 Gi0/2 configured as trunk](img/05-04-sw1-gi02-trunk.png)
![SW1 show vlan brief without Gi0/2](img/05-05-sw1-vlan-brief-sin-gi02.png)

In `show vlan brief`, port `Gi0/2` disappeared from the access VLAN list, confirming its operational transition to a trunk.

---

### Phase 2 · Router Subinterfaces (R1)

On router R1, I configured the subinterfaces. The physical parent interface was enabled but **carries no IP address**:

```text
R1# conf t
R1(config)# hostname R1
R1(config)# interface gi0/0
R1(config-if)# no shutdown
R1(config-if)# exit

! Subinterface for VLAN 10 (Sales)
R1(config)# interface gi0/0.10
R1(config-subif)# encapsulation dot1q 10
R1(config-subif)# ip address 192.168.10.1 255.255.255.0
R1(config-subif)# description GW-VENTAS
R1(config-subif)# exit

! Subinterface for VLAN 20 (IT)
R1(config)# interface gi0/0.20
R1(config-subif)# encapsulation dot1q 20
R1(config-subif)# ip address 192.168.20.1 255.255.255.0
R1(config-subif)# description GW-IT
R1(config-subif)# end
```

> **Cisco IOS Golden Rule:** The `encapsulation dot1q <vlan-id>` command must be entered **before** assigning the IP address. If you attempt to assign the IP first, IOS rejects it because the interface has no data-link encapsulation defined.

Interface status and routing table verification:

![R1 show ip interface brief](img/05-06-r1-ip-interface-brief.png)
![R1 show ip route](img/05-07-r1-show-ip-route.png)
![R1 show interfaces Gi0/0.10](img/05-08-r1-subinterfaz-vlan10.png)

In `show ip route`, two directly connected networks (`C`) appeared automatically:
* `192.168.10.0/24` directly connected via `GigabitEthernet0/0.10`.
* `192.168.20.0/24` directly connected via `GigabitEthernet0/0.20`.  
No static routes are needed: the router inherently knows both networks because they terminate on its own subinterfaces.

---

### Phase 3 · Default Gateways on End Hosts

I configured the Default Gateway on all four PCs (PC1/PC3 with `192.168.10.1`, PC2/PC4 with `192.168.20.1`).

![IP and Gateway on PC1](img/05-09-ipconfig-pc1-gateway.png)

I verified that PC1 could reach both gateways:
```text
ping 192.168.10.1
ping 192.168.20.1
```

![Ping to gateways OK](img/05-10-ping-gateways-ok.png)

Both gateways replied. PC1 can reach the opposite subinterface IP (`192.168.20.1`) because R1 handles the packet internally.

---

### Phase 4 · Inter-VLAN Connectivity Verification

This stage clearly demonstrated the distinction between intra-subnet Layer 2 switching and inter-subnet Layer 3 routing:

#### 1. Intra-VLAN Communication (PC1 ➔ PC3)
```text
ping 192.168.10.13
```
* **Result:** 4/4 replies with **TTL = 128**.  
* **Explanation:** Both devices reside in VLAN 10. Traffic travels purely across Layer 2 switches without hitting the router, preserving the default Windows TTL value (128).

![Ping same VLAN OK TTL 128](img/05-11-ping-misma-vlan-ok.png)

#### 2. Inter-VLAN Communication (PC1 ➔ PC2) — The Decisive Test!
```text
ping 192.168.20.12
```
* **Result:** Initial packet dropped (*Request timed out*), followed by 3 successful replies with **TTL = 127**.
* **Technical Explanation:** 
  1. The initial packet loss was caused by **ARP resolution**: PC1 needed to resolve the MAC of its gateway (`192.168.10.1`), and R1 needed to resolve the MAC of PC2 on VLAN 20. Once ARP caches were populated, subsequent packets flowed instantly.
  2. The **TTL = 127** value proves a Layer 3 routing hop took place: each router along an IP path decrements the *Time To Live* field by 1 to prevent forwarding loops.

![Ping across VLANs OK TTL 127](img/05-12-ping-entre-vlans-ok.png)

#### 3. Cross-Switch Inter-VLAN (PC4 ➔ PC1)
Tested from PC4 on SW2 to PC1 on SW1: the packet traverses SW2 ➔ Trunk ➔ SW1 ➔ Stick to R1 ➔ returns down to SW1 ➔ reaches PC1.

![Ping PC4 to PC1 OK](img/05-13-ping-pc4-pc1-ok.png)

#### 4. Route Tracing with `tracert`
```text
tracert 192.168.20.14
```
The trace verified the two mandatory hops:
1. `192.168.10.1` (R1 Gateway Subinterface).
2. `192.168.20.14` (PC4 final destination in VLAN 20).

![Tracert inter-VLAN](img/05-14-tracert-pc1-pc4.png)

---

### Phase 5 · Inspecting 802.1Q Tag Lifecycle in Simulation Mode

Filtering for ICMP and ARP in Simulation Mode, I tracked an ICMP packet from PC1 to PC2 across three distinct segments:

1. **Ascending toward the router on the trunk link (`Gi0/2`):**
   The outbound PDU includes an `Ethernet 802.1q` header with `TCI: 0x000a` (**VLAN 10** in hex) and `TPID: 0x8100`.
   ![PDU toward router VLAN 10](img/05-15-pdu-hacia-router-vlan10.png)

2. **Descending from the router back down the same cable:**
   The router stripped the VLAN 10 tag, evaluated its routing table, decremented TTL to 127, and applied a new `Ethernet 802.1q` header with `TCI: 0x0014` (**VLAN 20** in hex).
   ![PDU from router VLAN 20](img/05-16-pdu-desde-router-vlan20.png)

3. **Delivery to PC2 on access port (`Fa0/2`):**
   Upon exiting toward the end host, the switch stripped the 802.1Q tag, delivering a standard, untagged `Ethernet II` frame.
   ![PDU on access port without tag](img/05-17-pdu-acceso-sin-tag.png)

---

### Phase 6 · Troubleshooting (Break & Fix)

#### Failure 1 · Switch Trunk Port Forcibly Set to Access Mode
* **Trigger:** On SW1, changed `Gi0/2` to `switchport mode access`.
* **Symptom:** Inter-VLAN ping ceased immediately. Port `Gi0/2` vanished from `show interfaces trunk`.
* **Root Cause:** Access ports only carry untagged frames belonging to a single VLAN (default VLAN 1). The router stopped receiving 802.1Q tagged frames for its subinterfaces.
* **Resolution:** Re-enabled `switchport mode trunk` on `Gi0/2`. The port returned to the trunk table and pings recovered.

![Fault access port](img/05-18-fallo-puerto-access.png)
![Fault access port resolved](img/05-19-fallo-puerto-resuelto.png)

---

#### Failure 2 · dot1q Encapsulation Configured with Wrong VLAN ID
* **Trigger:** On R1, modified subinterface `.20` with `encapsulation dot1q 30`.
* **Symptom:** Ping from PC1 to PC2 failed with 100% loss.
* **Critical Diagnostic:** In `show ip interface brief`, subinterface `Gi0/0.20` **remained in state `up / up`** with IP `192.168.20.1`. However, `show interfaces gi0/0.20` revealed it was tagging for `Vlan ID 30` rather than `20`.
* **Key Takeaway:** **"Up / Up" does not mean operational.** Positive interface status only confirms Layer 1 physical and Layer 2 line protocol readiness, but logical encapsulation mismatches silently drop payload traffic.
* **Resolution:** Re-applied `encapsulation dot1q 20` on the subinterface.

![Fault encapsulation VLAN 30](img/05-20-fallo-encapsulacion-vlan.png)
![Fault encapsulation resolved](img/05-21-fallo-encapsulacion-resuelto.png)

---

### Phase 7 · Wrap-up and Final State

Saved the configuration across all devices (`copy running-config startup-config`) and reviewed R1's active configuration:

![R1 final running-config](img/05-22-r1-running-config.png)
![Final operational topology](img/05-23-topologia-final.png)

---

## ❌ Mistakes & Difficulties (and what I learned)

| Issue / Mistake | What Happened | Cause & Takeaway |
|---|---|---|
| **`down / down` scare on `Gi0/2`** | Initially configured trunk on SW1, but `Gi0/2` did not appear in `show interfaces trunk` and showed `down/down`. I thought the port or cable was defective. | **Cisco switches suppress trunk interfaces that are physically down.** Because R1 had `Gi0/0` administratively down (`shutdown`) by default, SW1 detected no Layer 1 signal. I learned that `up/up`, `up/down`, and `down/down` states provide essential troubleshooting clues before jumping to conclusions. |
| **Command syntax typo `dotlq` (letter L instead of 1)** | On R1, typed `encapsulation dotlq 10`, which IOS rejected with `% Invalid input`. I was confident I had typed it correctly. | I entered a lowercase `l` instead of the number `1`. Console typography can be deceptive, and the command refers to the IEEE 802.**1**Q numeric standard. |
| **Uncertainty regarding router count** | Initially questioned whether a second router was required to interconnect both networks. | Router-on-a-Stick centralizes all traffic over a single physical cable subdivided logically. Deploying dedicated physical cables per VLAN would be costlier, waste interfaces, and increase configuration complexity. |
| **Initial ping scare (25% loss)** | During the very first inter-VLAN ping, the first packet timed out and I suspected a configuration flaw. | Subsequent packets replied 3/3. This is standard ARP resolution latency both for the host resolving its gateway and the router resolving the destination host. |
| **Simulation Mode inspection** | Deciphering PDU headers and navigating Packet Tracer's simulation event list felt challenging initially. | While event lists require practice, seeing the live frame transformations—entering with one tag and departing with another—solidified the abstract concepts. |

## ✅ Wins & Milestones

- Finished the lab in **~1 hour**, capturing all **23 required evidences** in exact sequential order.
- Correlated the **TTL decrement (128 to 127)** as concrete proof of Layer 3 router transit.
- Mastered the configuration order for subinterfaces: `encapsulation dot1q` strictly before `ip address`.
- Diagnosed the encapsulation failure and understood why interface `up/up` state alone does not guarantee traffic flow.

## 🧠 Key Takeaways

1. **A single physical link can service multiple logical networks:** With 802.1Q tagging on a trunk port, one router interface handles multiple VLANs via virtual subinterfaces.
2. **VLAN isolation requires a Layer 3 router to cross:** Switches isolate broadcast domains at Layer 2; communication between different subnets requires a Layer 3 routing decision.
3. **Routers decrement TTL:** A quick way to confirm whether traffic traversed a router is checking if the TTL dropped from 128 to 127.
4. **`up/up` does not equal healthy end-to-end service:** An interface can be up while mismatched dot1q tagging silently drops packets.
5. **CLI mode mechanics:** Gained solid fluency with Cisco's mode hierarchy (`#`, `(config)#`, `(config-if)#`, and `(config-subif)#`).

## 📋 Quick Command Reference

| Purpose | Device | Command |
|---|---|---|
| Force trunk port | Switch | `interface gi0/2` ➔ `switchport mode trunk` |
| Bring physical interface up | Router | `interface gi0/0` ➔ `no shutdown` |
| Create subinterface and encapsulate | Router | `interface gi0/0.10` ➔ `encapsulation dot1q 10` |
| Assign Gateway IP | Router | `ip address 192.168.10.1 255.255.255.0` |
| View subinterfaces and states | Router | `show ip interface brief` |
| View routing table | Router | `show ip route` |
| Inspect subinterface VLAN detail | Router | `show interfaces gi0/0.10` |
| Trace network hops | PC | `tracert 192.168.20.14` |

---

## ➡️ Next Step

Routing with a **Multilayer Switch (Layer 3 SVI)** to compare hardware-switched inter-VLAN routing with Router-on-a-Stick, or IPv4 network design using **Subnetting & VLSM**.

---

*José María Aparicio Portillo · [GitHub](https://github.com/anudoranador87) · [LinkedIn](https://linkedin.com/in/joseaparicio87)*
