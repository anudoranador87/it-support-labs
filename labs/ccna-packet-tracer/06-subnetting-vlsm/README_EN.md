# Lab 6: Subnetting and VLSM (CCNA · Packet Tracer)

> 🇪🇸 [Versión en español](./README.md)

Sixth block of my networking portfolio (CCNA). In the previous lab I connected two VLANs (SALES and IT) using Router-on-a-Stick. In this lab I extend that same topology: I add a third VLAN (**GUESTS**), a second router (**R2**) for a remote branch office, and a new switch (**SW3**). But before touching a single command, I have to **design the addressing plan from scratch** using VLSM — because a generic `/24` for everything no longer cuts it.

| | |
|---|---|
| **Tool** | Cisco Packet Tracer |
| **Devices** | 2 × Cisco 2911 (R1, R2), 3 × Catalyst 2960-24TT (SW1, SW2, SW3) and 6 PCs |
| **Execution time** | ~1 h 30 min – 2 h |
| **Date** | 27/10/2026 |
| **Packet Tracer file** | [`06_Subnetting_VLSM.pkt`](06_Subnetting_VLSM.pkt) |

---

## 🎯 Objective

- Understand what VLSM is and why it is used instead of fixed-size subnetting.
- Design an addressing plan for four segments of different sizes and one WAN link, all within `192.168.50.0/24`.
- Extend the previous lab topology by adding VLAN 30 (GUESTS), a third switch (SW3) and a second router (R2) for the branch office.
- Configure R1 with a third subinterface (`.30`) and the WAN link.
- Configure R2 with two physical interfaces: WAN and branch LAN.
- Add static routes on both routers to achieve end-to-end connectivity.
- Verify using `show ip route`, `show ip interface brief`, `ping` and `tracert`.
- Understand asymmetric routing failure: when the ping goes but never comes back.

---

## 🧮 Phase 0 · The plan on paper (before opening Packet Tracer)

The first thing I did was step away from the computer. I calculated the VLSM table by hand, ordering the segments from **largest to smallest number of hosts** — that is the key to the method:

![VLSM table on paper](img/06-01-tabla-vlsm-papel.png.jpg)

> **Why you must order from largest to smallest:** if you assign the small blocks first and then try to fit the large ones, you run out of contiguous space or create overlaps. With VLSM you start with the biggest network and chain blocks of exactly the right size.

### Chosen addressing plan

Address space: `192.168.50.0/24`

| Segment | Hosts required | Prefix | Mask | Network | First host | Last host | Broadcast |
|---|---|---|---|---|---|---|---|
| **VLAN 10 · SALES** | ~50 | `/26` | `255.255.255.192` | `192.168.50.0` | `192.168.50.1` | `192.168.50.62` | `192.168.50.63` |
| **VLAN 20 · IT** | ~25 | `/27` | `255.255.255.224` | `192.168.50.64` | `192.168.50.65` | `192.168.50.94` | `192.168.50.95` |
| **VLAN 30 · GUESTS** | ~10 | `/28` | `255.255.255.240` | `192.168.50.96` | `192.168.50.97` | `192.168.50.110` | `192.168.50.111` |
| **BRANCH** | ~10 | `/28` | `255.255.255.240` | `192.168.50.112` | `192.168.50.113` | `192.168.50.126` | `192.168.50.127` |
| **WAN R1 ↔ R2** | 2 | `/30` | `255.255.255.252` | `192.168.50.128` | `192.168.50.129` | `192.168.50.130` | `192.168.50.131` |

> **The no-overlap rule:** every network starts immediately after the broadcast of the previous one. `192.168.50.64` starts at SALES broadcast (`.63`) + 1. `192.168.50.96` starts at IT broadcast (`.95`) + 1. And so on. If there is an unexplained gap, there is a calculation error.

---

## 🗺️ Topology

```text
                        [ R1 ] (Cisco 2911)
                       /      \
                 Gi0/0 |       | Gi0/1
          (subinterfaces        (WAN /30 · crossover cable)
           .10, .20, .30)        |
                 |               |
        Gi0/2   |           192.168.50.129 ←→ 192.168.50.130
      (Trunk)  SW1                         [ R2 ] (Cisco 2911)
              /   \                       /        \
          Gi0/1   Fa0/1 Fa0/2         Gi0/1       Gi0/0
       (Trunk)    PC1   PC2          (BRANCH)     (WAN)
           |     (V10) (V20)            |
          SW2                          SW3
      /    |    \                       |
  Fa0/1 Fa0/2 Fa0/3                  Fa0/2
   PC3   PC4   PC5                    PC6
  (V10) (V20) (V30)               (BRANCH)
```

> **About the R1–R2 crossover cable:** router to router, just like the crossover cables between switches in Lab 02. There is no switch in between, so the TX pins of one device go directly to the RX pins of the other. In Packet Tracer, select *Copper Cross-Over*.

### Full addressing table

| Device | Interface | Role | IP / Mask | Gateway |
|---|---|---|---|---|
| **R1** | Gi0/0 | Physical interface (transport only) | — | — |
| **R1** | Gi0/0.10 | VLAN 10 Gateway · SALES | `192.168.50.1 /26` | — |
| **R1** | Gi0/0.20 | VLAN 20 Gateway · IT | `192.168.50.65 /27` | — |
| **R1** | Gi0/0.30 | VLAN 30 Gateway · GUESTS | `192.168.50.97 /28` | — |
| **R1** | Gi0/1 | WAN link to R2 | `192.168.50.129 /30` | — |
| **R2** | Gi0/0 | WAN link to R1 | `192.168.50.130 /30` | — |
| **R2** | Gi0/1 | Branch LAN Gateway | `192.168.50.113 /28` | — |
| **PC1** | NIC | SW1 Fa0/1 · VLAN 10 | `192.168.50.11 /26` | `192.168.50.1` |
| **PC2** | NIC | SW1 Fa0/2 · VLAN 20 | `192.168.50.70 /27` | `192.168.50.65` |
| **PC3** | NIC | SW2 Fa0/1 · VLAN 10 | `192.168.50.13 /26` | `192.168.50.1` |
| **PC4** | NIC | SW2 Fa0/2 · VLAN 20 | `192.168.50.94 /27` | `192.168.50.65` |
| **PC5** | NIC | SW2 Fa0/3 · VLAN 30 | `192.168.50.100 /28` | `192.168.50.97` |
| **PC6** | NIC | SW3 Fa0/2 · BRANCH | `192.168.50.120 /28` | `192.168.50.113` |

---

## 🛠️ Step-by-step walkthrough

### Phase 1 · Initial state (the "before")

Starting from the previous lab file, I checked R1's routing table before touching anything:

![R1 show ip route before](img/06-02-r1-ruta-antes.png)

Only the two directly connected networks from Lab 05 appear (VLAN 10 and VLAN 20). No VLAN 30 or branch yet.

![Initial topology in Packet Tracer](img/06-03-topologia-inicial.png)

The topology already shows R2, SW3, PC5 and PC6 added. The router links show in red — that is normal, Cisco router ports are **shut down by default** and must be brought up with `no shutdown`.

---

### Phase 2 · VLAN 30 (GUESTS) on the switches

VLAN 30 needs to exist on both SW1 and SW2. On SW2, the PC5 port also needs to be assigned:

```text
SW1(config)# vlan 30
SW1(config-vlan)# name GUESTS
SW1(config-vlan)# end

SW2(config)# vlan 30
SW2(config-vlan)# name GUESTS
SW2(config-vlan)# exit
SW2(config)# interface fa0/3
SW2(config-if)# switchport mode access
SW2(config-if)# switchport access vlan 30
SW2(config-if)# end
```

![SW2: VLAN 30 created and Fa0/3 assigned](img/06-04-sw2-vlan30-puerto.png)

The SW1–SW2 trunk already existed from the previous lab and **allows VLANs 1-1005 by default**, so VLAN 30 flows through it automatically as soon as it exists on both switches:

![SW1: trunk with VLAN 30 active](img/06-05-sw1-trunk-vlan30.png)

---

### Phase 3 · New subinterface on R1 (VLAN 30) and WAN link

I updated R1's subinterfaces with the VLSM IPs, added the new `.30` for GUESTS and brought up the WAN link toward R2:

```text
R1# conf t

! Subinterface VLAN 10 (Sales) - /26
R1(config)# interface gi0/0.10
R1(config-subif)# encapsulation dot1q 10
R1(config-subif)# ip address 192.168.50.1 255.255.255.192
R1(config-subif)# exit

! Subinterface VLAN 20 (IT) - /27
R1(config)# interface gi0/0.20
R1(config-subif)# encapsulation dot1q 20
R1(config-subif)# ip address 192.168.50.65 255.255.255.224
R1(config-subif)# exit

! Subinterface VLAN 30 (Guests) - /28  ← NEW
R1(config)# interface gi0/0.30
R1(config-subif)# encapsulation dot1q 30
R1(config-subif)# ip address 192.168.50.97 255.255.255.240
R1(config-subif)# exit

! WAN link to R2 - /30
R1(config)# interface gi0/1
R1(config-if)# ip address 192.168.50.129 255.255.255.252
R1(config-if)# description LINK-R2
R1(config-if)# no shutdown
R1(config-if)# end
```

> **Golden rule:** `encapsulation dot1q` must always come **before** `ip address`. If you try to set the IP first, IOS rejects it.

![R1 show ip interface brief](img/06-06-r1-ip-interface-brief.png)
![R1 show ip route with VLSM](img/06-07-r1-show-ip-route-vlsm.png)

In `show ip route`, four directly connected networks appear with four different masks (`/26`, `/27`, `/28`, `/30`). That is where VLSM's beauty shows.

---

### Phase 4 · Configure R2

R2 does not use subinterfaces: it has one physical interface for the WAN link and another for the branch LAN:

```text
R2# conf t
R2(config)# hostname R2

! WAN link to R1 - /30
R2(config)# interface gi0/0
R2(config-if)# ip address 192.168.50.130 255.255.255.252
R2(config-if)# description LINK-R1
R2(config-if)# no shutdown
R2(config-if)# exit

! Branch LAN - /28
R2(config)# interface gi0/1
R2(config-if)# ip address 192.168.50.113 255.255.255.240
R2(config-if)# description LAN-BRANCH
R2(config-if)# no shutdown
R2(config-if)# end
```

---

### Phase 5 · PC IPs with the new masks

I updated the IPs on all six PCs. The difference from previous labs: each VLAN now has its own mask, not always `/24`:

![PC1 ipconfig with /26 mask](img/06-08-ipconfig-pc1-mascara.png)

---

### Phase 6 · Partial verification

Before adding static routes, I verified what should already work:

**Ping from PC1 to both R1 gateways:**

![Ping to gateways OK](img/06-09-ping-gateways-ok.png)

**Same-VLAN ping (PC1 → PC3, both VLAN 10):**

![Same-VLAN ping OK](img/06-10-ping-misma-vlan-ok.png)

**Inter-VLAN ping through R1 (PC1 → PC2):**

![Inter-VLAN ping OK](img/06-11-ping-entre-vlans-ok.png)

**VLAN 20 to VLAN 30 ping (PC4 → PC5):**

![PC4 to PC5 ping OK](img/06-12-ping-pc4-pc5-ok.png)

The first packet dropped in every case (25% loss). I already expected it: ARP resolution, not a configuration fault.

---

### Phase 7 · Static routes between routers

This is the new part of the lab. R1 knows its four directly connected networks but has no idea how to reach the branch. And R2 knows nothing about R1's networks.

#### WAN link verification R1 ↔ R2

First I confirmed the WAN link works by pinging from R1 to R2's IP:

```text
R1# ping 192.168.50.130
```

![R1 ping R2 via WAN · 80% success](img/06-13-r1-ping-r2-enlace.png)

Result `.!!!!`: 4/5 (80%). The first packet drops due to ARP, the next four go through fine. The `/30` link is working.

#### The asymmetric routing failure

I pinged from PC1 to PC6 (branch) before adding any routes. It failed at 100%:

![PC1 to PC6 ping fails without routes](img/06-14-ping-sin-ruta-falla.png)

I added the static route **only on R1** (toward the branch) and tried again. Still 100% failure, but in a different way:

![One-way ping failure (asymmetric)](img/06-15-ping-solo-ida-falla.png)

The clue: the `ping` from R1 to R2 (router to router) worked perfectly. But PC1 to PC6 kept failing. **The packet was going out but the reply never came back.** R2 had no route back to R1's networks and was silently dropping the reply packets.

#### Static route configuration (both directions)

```text
! On R1: teach the path to the branch
R1(config)# ip route 192.168.50.112 255.255.255.240 192.168.50.130

! On R2: teach the return path to R1's three networks
R2(config)# ip route 192.168.50.0   255.255.255.192 192.168.50.129  ! SALES /26
R2(config)# ip route 192.168.50.64  255.255.255.224 192.168.50.129  ! IT /27
R2(config)# ip route 192.168.50.96  255.255.255.240 192.168.50.129  ! GUESTS /28
```

> **Why routes must go in both directions:** a static route tells one router how to reach a destination, but it tells the destination nothing about how to reply. If you only configure one direction, packets arrive but replies are dropped. It sounds obvious, but it is one of the most common mistakes in practice.

---

### Phase 8 · Final verification

With routes configured on both routers, the end-to-end ping worked:

![PC1 to PC6 ping OK](img/06-16-ping-pc1-pc6-ok.png)

The `tracert` showed the full path: PC1 → R1 (`192.168.50.1`) → R2 (`192.168.50.130`) → PC6. Two Layer 3 hops, TTL dropping from 128 to 126:

![Tracert PC1 to PC6](img/06-17-tracert-pc1-pc6.png)

Final routing tables of both routers:

![R1 show ip route final](img/06-18-r1-show-ip-route-final.png)
![R2 show ip route](img/06-19-r2-show-ip-route.png)

---

### Phase 9 · Saving configuration

```text
copy running-config startup-config
```

![R1 running-config part 1](img/06-23-r1-running-configparte1.png)
![R1 running-config part 2](img/06-23-r1-running-configparte2.png)
![Final operational topology](img/06-24-topologia-final.png)

---

### Phase 10 · Troubleshooting (Break and Fix)

> ⚠️ This section describes the controlled faults from the lab. Screenshots of the repair steps are not available in this README, but the symptoms and resolution are fully documented below.

#### Fault 1 · Subnet overlap

![Fault: subnet overlap](img/06-20-fallo-solapamiento.png)

* **Action:** I intentionally assigned an incorrect mask causing two networks to overlap.
* **Symptom:** Packet Tracer rejected the IP assignment with an overlap warning and `show ip route` showed inconsistent entries.
* **Lesson:** Overlap is a design error, not a configuration error. It must be resolved on paper before opening the CLI.
* **Fix:** Recalculate the blocks, verifying that the first host of each network equals the previous broadcast + 1.

#### Fault 2 · `/24` mask on a WAN link (described, no screenshot)

* **Action:** I used `/24` on the R1-R2 WAN link instead of `/30`.
* **Symptom:** The link appeared to work, but the wasted block overlapped with the LANs and the addressing plan fell apart.
* **Diagnosis:** `show ip route` showed the WAN route consuming a much larger block than needed.
* **Lesson learned:** A point-to-point link between two routers only needs 2 usable IPs. `/30` is the standard. Using `/24` here is like reserving a 254-space car park for two cars.

#### Fault 3 · Default gateway outside the subnet (described, no screenshot)

* **Action:** I assigned PC5 a gateway that did not belong to its `/28` subnet.
* **Symptom:** PC5 could ping within its own VLAN (direct Layer 2), but could not communicate with any other network.
* **Diagnosis:** `ipconfig` showed the wrong gateway. The PC was trying to ARP-resolve an IP that was not on its segment.
* **Lesson learned:** A device's default gateway must belong to the same subnet as the device. If it is out of range, ARP never resolves it and the device loses its exit to the outside world.

---

## ❌ My mistakes and difficulties (and what I learned)

| Mistake / Issue | What happened | Root cause and lesson |
|---|---|---|
| **`ip route` in exec mode → `% Invalid input`** | After the verification ping, I tried to add the static route directly at `R1#` without entering configuration mode. IOS returned `% Invalid input detected at '^' marker`. | `ip route` is a **global configuration mode** command. You must enter `configure terminal` first and see the `R1(config)#` prompt. The `^` caret IOS prints points to exactly the first character it does not recognise. |
| **`end` in exec mode → DNS lookup hang** | Immediately after, still at `R1#`, I typed `end` (which means nothing at that level). IOS treated it as a hostname: `Translating "end"...domain server (255.255.255.255)` and the prompt froze waiting for a DNS reply. | At `R1#`, `end` is not a valid command. IOS treats unrecognised input as a hostname and tries to resolve it. The escape is **Ctrl+Shift+6**. To prevent it happening again: `no ip domain-lookup` in configuration mode. |
| **Binary calculation going off the rails** | I had the VLSM concept clear, but when I started verifying block boundaries in binary I got confused with the subnet bits and lost track. | I learned to use the "next power of two" as the fast method: for ~50 hosts I need 64 addresses (2⁶) → `/26`. For ~25 I need 32 (2⁵) → `/27`. Full binary is for verification, not for calculation. |
| **Lost between interfaces: which one goes to which network** | With two routers, six PCs and five subnets, I got confused about which router interface should carry which IP. | A fully completed addressing table on paper before touching the CLI is mandatory. If you configure on the fly without a written plan, errors stack up. |
| **Overlap I didn't see** | At first I didn't notice that two subnets were overlapping until Packet Tracer rejected the IP assignment. I thought I had calculated it correctly. | Always verify that the first host of the next network equals the previous broadcast + 1. If there is an unexplained gap, there is a calculation error. |
| **Asymmetric failure (ping goes but doesn't come back)** | I configured the route on R1 toward the branch, launched the ping from PC1 to PC6, and… 100% loss. I stared at the screen thinking something was wrong on R1. | Seeing that the ping from R1 to R2 worked fine made it click: R2 had no return route. Routing is bidirectional; if you only configure one direction, replies are lost. |
| **Labels with IPs from the previous lab** | When preparing the topology screenshot, the PC and R1 labels still showed Lab 05 IPs (192.168.10.x/24), contradicting the VLSM notes next to them. | Always check labels before capturing. In Packet Tracer it is easy to forget updating text notes when you change the actual device address. |
| **First ping at 25% loss as usual** | When I launched the first inter-VLAN ping with routes already configured, the first packet dropped and I thought something was still broken. | I already know this one from the previous lab: it is ARP resolution. Once the tables are populated, the following packets fly through. |

## ✅ My wins

- I calculated the VLSM plan **on paper before opening Packet Tracer**, which made the configuration phase much more organised.
- Completed the lab in **~1 h 30 min – 2 h** (slightly longer than previous labs because of the planning phase — worth every minute).
- Identified the asymmetric routing fault by comparing the router-to-router ping (which worked) against the end-to-end ping (which failed), and deduced the missing return route on R2.
- Learned to escape a DNS-lookup frozen prompt using **Ctrl+Shift+6** without restarting.
- Linked the `tracert` TTL value (128 → 126, two decrements) to the two router hops the packet takes.
- The Cisco CLI felt more natural than in previous labs, though I still need to think before entering each submode.

## 🧠 Key takeaways

1. **VLSM means giving each network exactly the space it needs:** Instead of always using `/24`, you calculate the minimum power of two that covers the required hosts. That avoids wasting address space.
2. **Always sort from largest to smallest before assigning blocks:** If you start with the small blocks, the large ones won't fit later. Order is everything.
3. **The design on paper comes before the CLI:** If you start configuring without a complete plan, you end up entering wrong IPs and troubleshooting becomes chaos. A fully filled addressing table is the mandatory starting point.
4. **Static routes must go in both directions:** A route tells one router how to reach a destination, but the destination also needs to know how to reply. Without a return route, traffic is one-way only.
5. **Overlap is a design error, not a configuration error:** If two subnets overlap, the problem is in the calculation. Routers cannot fix what is wrong in the plan.
6. **`ip route` only works in `(config)#` mode:** Typing it at `R1#` gives `% Invalid input`. The prompt is the fastest clue about where you are.
7. **`no ip domain-lookup` saves time:** It stops a mistyped command in exec mode from locking the terminal while waiting for a DNS response. Ctrl+Shift+6 is the emergency exit when it does happen.

## 📋 Quick reference commands

| Goal | Device | Command |
|---|---|---|
| View routing table | Router | `show ip route` |
| View interface status | Router | `show ip interface brief` |
| Add a static route | Router | `ip route <network> <mask> <next-hop>` |
| Prevent DNS lookup hangs | Router | `no ip domain-lookup` |
| Escape a frozen prompt | — | **Ctrl + Shift + 6** |
| View interface detail | Router | `show interfaces gi0/1` |
| Test connectivity | Any | `ping <ip>` |
| Trace route | PC | `tracert <ip>` |
| Save configuration | Any | `copy running-config startup-config` |

### Quick powers-of-2 reference for VLSM

| Hosts needed | Block size | Prefix | Mask |
|---|---|---|---|
| 1–2 | 4 | `/30` | `255.255.255.252` |
| 3–6 | 8 | `/29` | `255.255.255.248` |
| 7–14 | 16 | `/28` | `255.255.255.240` |
| 15–30 | 32 | `/27` | `255.255.255.224` |
| 31–62 | 64 | `/26` | `255.255.255.192` |
| 63–126 | 128 | `/25` | `255.255.255.128` |
| 127–254 | 256 | `/24` | `255.255.255.0` |

---

## ➡️ Next step

With addressing design and static routing mastered, the logical next step is **dynamic routing with OSPF** — so that routers discover each other's networks automatically without manual routes — or **DHCP**, so that routers assign IPs to PCs without configuring them one by one.

---

*José María Aparicio Portillo · [GitHub](https://github.com/anudoranador87) · [LinkedIn](https://linkedin.com/in/joseaparicio87)*
