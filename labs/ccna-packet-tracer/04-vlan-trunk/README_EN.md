# Lab 4: VLANs and 802.1Q Trunk (CCNA · Packet Tracer)

> 🇪🇸 [Leer en español](./README.md)

Fourth block of my networking portfolio (CCNA). In this lab I configure two VLANs on two switches, connect them with an **802.1Q trunk** link, and check what can and can't communicate. At the end I deliberately break the network to practise troubleshooting.

| | |
|---|---|
| **Tool** | Cisco Packet Tracer |
| **Devices** | 2 × Catalyst 2960-24TT (SW1, SW2) and 4 PCs |
| **Time** | 1 h 30 min |
| **Date** | 26/10/2026 |
| **Packet Tracer File** | [`04_VLAN_Trunk.pkt`](04_VLAN_Trunk.pkt) |

---

## Quick technical summary

| Check | Expected result | Why it matters |
|---|---|---|
| PC1 → PC3 (192.168.10.13) | Success | VLAN 10 crosses the trunk |
| PC2 → PC4 (192.168.20.14) | Success | VLAN 20 crosses the trunk |
| PC1 → PC2 (192.168.20.12) | Failure by design | Different VLANs need Layer 3 routing |
| show interfaces trunk | Gi0/1 is trunking with 802.1Q | Confirms the inter-switch link is operating as a trunk |
| Simulation Mode on the trunk | 802.1Q tag identifies VLAN 10 or 20 | Shows VLAN identification on trunk traffic |

**Fast diagnostic commands**

```text
show vlan brief
show interfaces trunk
show interfaces fa0/1 switchport
show running-config
```

Use the first two commands to check whether VLANs exist and whether the trunk is operational. Use the switchport detail to confirm the access VLAN on an endpoint port. A successful link status alone does not prove that VLAN membership is correct.

## 🎯 Objective

- Create VLAN 10 (VENTAS) and VLAN 20 (IT) on both switches.
- Assign the access ports to each VLAN.
- Configure a trunk link between SW1 and SW2.
- Verify connectivity within a VLAN and between different VLANs.
- See the 802.1Q tag inside a frame with my own eyes.
- Cause two failures (trunk down and deleted VLAN) and fix them.

## 🗺️ Topology

![Initial topology](img/02-01-topologia-inicial.png)

| Device | Port | Connects to | VLAN / IP |
|---|---|---|---|
| SW1 | Fa0/1 | PC1 | VLAN 10 · 192.168.10.11/24 |
| SW1 | Fa0/2 | PC2 | VLAN 20 · 192.168.20.12/24 |
| SW1 | Gi0/1 | SW2 Gi0/1 | Trunk |
| SW2 | Fa0/1 | PC3 | VLAN 10 · 192.168.10.13/24 |
| SW2 | Fa0/2 | PC4 | VLAN 20 · 192.168.20.14/24 |

No default gateway: there is no router in this lab.

---

## 🛠️ Step by step

### Phase 0 · Initial state

Cabling, IPs on the PCs, and a check that everything is in VLAN 1 before touching anything.

![ipconfig on PC1](img/02-02-ipconfig-pc1.png)
![Initial show vlan brief](img/02-03-show-vlan-brief-inicial.png)
![Ping before configuring](img/02-04-ping-antes.png)

With everything in the default VLAN 1, the PC1 to PC3 ping is my baseline to compare against later.

### Phase 1 · Create the VLANs (on SW1 and SW2)

```
conf t
hostname SW1
vlan 10
 name VENTAS
 exit
vlan 20
 name IT
 end
show vlan brief
```

The VLANs exist but **have no ports assigned yet**. They must be created on each switch, because they aren't shared automatically (that would be VTP).

![VLANs created on SW1](img/02-05-sw1-vlans-creadas.png)
![VLANs created on SW2](img/02-06-sw2-vlans-creadas.png)

### Phase 2 · Access ports

```
interface fa0/1
 switchport mode access
 switchport access vlan 10
interface fa0/2
 switchport mode access
 switchport access vlan 20
 end
```

Fa0/1 moves to VENTAS and Fa0/2 to IT, and they **disappear from the VLAN 1 list** (compare with capture 03).

![Ports assigned on SW1](img/02-07-sw1-puertos-asignados.png)
![Fa0/1 switchport](img/02-08-sw1-switchport-fa01.png)
![Ports assigned on SW2](img/02-09-sw2-puertos-asignados.png)

`show interfaces fa0/1 switchport` shows *Administrative Mode: static access* (what I configured) and *Access Mode VLAN: 10 (VENTAS)*.

### Phase 3 · The trunk

```
interface gi0/1
 switchport mode trunk
 end
show interfaces trunk
```

Gi0/1 shows mode `on`, encapsulation `802.1q`, status `trunking`, native VLAN 1.

![Trunk on SW1](img/02-10-sw1-show-trunk.png)
![Trunk on SW2](img/02-11-sw2-show-trunk.png)
![Gi0/1 switchport](img/02-12-sw1-switchport-gi01.png)

**Why does the trunk "allow" 1-1005 but only 3 VLANs are active (1, 10 and 20)?**
Because 1-1005 is the range the trunk is *allowed* to carry, while the active ones are the VLANs we have actually **created on the switches**. If a VLAN doesn't exist on the switch, it can't travel over the trunk.

### Phase 4 · Connectivity tests

| Test | Result | Capture |
|---|---|---|
| PC1 → PC3 (VLAN 10, across the trunk) | ✅ Replies | ![](img/02-13-ping-misma-vlan-ok.png) |
| PC2 → PC4 (VLAN 20, across the trunk) | ✅ Replies | ![](img/02-14-ping-vlan20-ok.png) |
| PC1 → PC2 (different VLANs) | ❌ Fails (expected) | ![](img/02-15-ping-entre-vlans-falla.png) |

The trunk connects **devices in the same VLAN across different switches**. For PC1 to reach PC2 (different VLANs), a layer 3 device is needed.

### Phase 5 · The 802.1Q tag inside the frame

In Simulation mode I followed the same ping (ID `0x001d`, SEQ 29) at two points along its path.

**On the trunk (leaving SW1)** · the header is *Ethernet 802.1q*:

![Tagged frame on the trunk](img/02-16-pdu-trunk-802.1q.png)

**On the access port (leaving SW2 towards PC3)** · header is *Ethernet II*, no tag:

![Untagged frame on the access port](img/02-17-pdu-acceso-sin-tag.png)

| Field | Value | Meaning |
|---|---|---|
| TPID | `0x8100` | Fixed marker: "this frame carries an 802.1Q tag" |
| TCI | `0x000a` | Holds the VLAN: `0x000a` in hexadecimal is 10 |

**How I understand it with an analogy:** the two switches are two floors of a hotel and the trunk is the shared lift. When a VLAN 10 packet goes up in the lift, it gets a wristband with the VLAN number (the tag). On the other floor, the switch reads the wristband, delivers the packet only to ports in that VLAN and **removes the wristband** before handing it to the PC. It's like adding a `{ vlan: 10 }` header to a message that the receiver reads and strips before using the data.

### Phase 6 · Troubleshooting

**Failure 1 · Trunk down** (`shutdown` on SW2 Gi0/1). The PC1 → PC3 ping fails and the link turns red.

![Trunk down](img/02-18-fallo-trunk-caido.png)

With `no shutdown` the link goes from red to orange to green (Spanning Tree) and the ping replies again.

![Trunk recovered](img/02-19-trunk-recuperado.png)

**Failure 2 · Deleted VLAN** (`no vlan 10` on SW2). The ping fails and VLAN 10 disappears from `show vlan brief`. Also, **Fa0/1 doesn't appear in any VLAN** (not even VLAN 1): the port becomes orphaned and inactive.

![VLAN deleted](img/02-20-fallo-vlan-borrada.png)

When I recreated it with `vlan 10` and `name VENTAS`, **Fa0/1 came back to VENTAS by itself** with no reassignment, because the port kept its `switchport access vlan 10`.

![Failure fixed](img/02-21-fallo-resuelto.png)

### Phase 7 · Wrap-up

```
copy running-config startup-config
show running-config
```

![SW1 running-config](img/02-22-sw1-running-config.png)
![Final topology](img/02-23-topologia-final.png)

---

## ❌ My mistakes (and what I learned from each)

| Mistake | What happened | What I learned |
|---|---|---|
| Commands at the wrong level | `hostname`, `interface fa0/1` and `vlan 20` typed at `SW#` gave me `Invalid input` | Each CLI level has its own commands: `#` is privileged mode and only `(config)#` or `(config-if)#` allow configuring. Before typing, I check the prompt |
| `VLAN 10 name VENTAS` on one line | `Invalid input` at `name` | `vlan 10` enters a sub-mode, and `name` goes inside it, on a separate line |
| `end` and then `vlan 20` | Another level error | `end` exits all the way to `#`; `exit` goes back one level |
| Typing errors | `fa/01` instead of `fa0/1`, and `1921.168.10.13` in a ping | Just slips: I knew exactly what the IP was. Reading the `^` that IOS shows helps find the mistake |
| Initial ping at 100% loss | I hadn't set the IPs on all the PCs yet | IP on every device first, tests afterwards |
| PC2 label with the wrong IP | I wrote 192.168.10.12 instead of 192.168.20.12 in the topology text | Check the labels before the final capture |
| Simulation mode | Pings didn't move, the list filled up with STP packets and links were orange after the reset | Go back to Realtime, wait for green and filter only ICMP |
| Packet Tracer notes disappearing | I created them and they vanished | You have to type the text before clicking elsewhere |

## ✅ My wins

- I finished the whole lab in **1 h 30 min**, with 23 captures taken at the exact moment.
- I spotted my own CLI level mistakes and fixed them without help.
- I followed the same packet at two points of its path and saw the difference between a tagged and an untagged frame.
- I understood what happens to ports when a VLAN is deleted.

## 🧠 Key takeaways

1. **The Cisco CLI has levels**, and each level accepts different commands.
2. **VLANs must be created on every switch.** The trunk allowing them isn't enough if they don't exist.
3. **The trunk connects the same VLAN across switches**, but doesn't connect different VLANs to each other. That needs a router.
4. **The 802.1Q tag only travels on the trunk**; on access ports the frame goes untagged.
5. **If you delete a VLAN, its ports become inactive but keep their configuration.** Recreating the VLAN with the same number reactivates them.
6. **In production, document everything before deleting anything**, and don't save the configuration until you're sure. A nuance I want to verify: on these switches VLANs are stored in a separate file (`vlan.dat`) and applied immediately, so "not saving" doesn't always protect you. That's why, besides documenting, it's worth keeping a copy of the configuration.

## 🔮 My predictions

- **Before configuring the trunk** I predicted the ping would fail, because I understood the trunk is what lets the switches communicate with each other.
- **With the trunk** I confirmed that devices in the same VLAN do communicate across both switches, but different VLANs don't.

## 🚧 What was hard and what I want to improve

- The hardest part was the **hierarchy of CLI modes and commands**, and getting the level wrong.
- Also **Simulation mode**: I'm not yet fluent with Packet Tracer, less because of the concept and more because of handling the software.
- Before starting, I understood VLAN theory but not how they are configured on Cisco devices. The lab felt **very straightforward** once I understood the CLI levels.

## 📋 Command reference

| Purpose | Command |
|---|---|
| Enter privileged mode | `enable` |
| Enter configuration | `conf t` |
| Create and name a VLAN | `vlan 10` → `name VENTAS` |
| Access port | `switchport mode access` + `switchport access vlan 10` |
| Trunk port | `switchport mode trunk` |
| Show VLANs | `show vlan brief` |
| Show trunks | `show interfaces trunk` |
| Show a port | `show interfaces fa0/1 switchport` |
| Save | `copy running-config startup-config` |

## ➡️ Next step

Make PC1 and PC2 (different VLANs) communicate using inter-VLAN routing (*router-on-a-stick*).

---

*José María Aparicio Portillo · [GitHub](https://github.com/anudoranador87) · [LinkedIn](https://linkedin.com/in/joseaparicio87)*
