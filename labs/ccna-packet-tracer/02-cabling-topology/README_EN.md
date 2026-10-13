# Lab 2: Topology Cabling (CCNA · Packet Tracer)

> 🇪🇸 [Versión en español](./README.md)

Cabling lab with Cisco Packet Tracer. The goal is to connect all devices in a given topology, choosing the right cable type for each link based on the devices it connects and the distance. No device configuration is done: no IPs, no routes, no interfaces.

## Objective

Reproduce the cabling of a network with two LANs (left and right) joined by a four-router path (`R2 - R1 - R3 - R4`), using straight-through copper, crossover copper and fibre as appropriate.

## Topology

**Left:** PC1 → SW3, PC2 → SW4, and switches SW3 - SW1 - SW2 - SW4 daisy-chained. SW1 and SW2 connect to R2, and R2 to R1.
**Core:** R1 - R3 - R4 (fibre links).
**Right:** R4 connects to SW5 and SW6. Switches SW7 - SW5 - SW6 - SW8 are daisy-chained. PC3 hangs off SW7 and SRV1 off SW8.

![Final topology](./img/topologia-final.png)

## Equipment

| Qty | Device | Model |
|---|---|---|
| 4 | Routers (R1, R2, R3, R4) | Cisco 2911 |
| 8 | Switches (SW1 to SW8) | Catalyst 2960-24TT |
| 3 | PCs (PC1, PC2, PC3) | PC-PT |
| 1 | Server (SRV1) | Server-PT |

## Connections (17)

| Cable type | Links | Why |
|---|---|---|
| Straight-through copper (8) | PC1-SW3, PC2-SW4, PC3-SW7, SRV1-SW8, SW1-R2, SW2-R2, SW5-R4, SW6-R4 | Different device types: end device or router to switch |
| Crossover copper (7) | SW3-SW1, SW1-SW2, SW4-SW2, SW7-SW5, SW5-SW6, SW8-SW6, R2-R1 | Same device types: switch to switch and router to router |
| Fibre (2) | R1-R3 (3 km, single-mode), R3-R4 (250 m, multi-mode) | Copper only reaches 100 m |

Why each type:

- **Straight-through:** PCs, the server and routers transmit on pins 1 & 2, while switches transmit on pins 3 & 6. When connecting different device types the pairs already match, so the cable runs pin-to-pin.
- **Crossover:** if both ends are the same type, they transmit on the same pins. The cable swaps the pairs so that the output of one end feeds the receiver of the other. The exercise assumes Auto MDI-X is disabled, which is why the distinction matters.
- **Fibre:** at 3 km copper is not viable and single-mode fibre is needed. At 250 m multi-mode is sufficient. Packet Tracer only has one fibre cable type, so the single-mode/multi-mode distinction comes from the exercise brief.

## Steps

1. Place the devices and choose the correct model for each one.
2. Rename the devices: R1 to R4, SW1 to SW8, PC1 to PC3 and SRV1.
3. Choose the cable type for each link manually, without using the automatic connection.
4. Connect PCs and server to their `FastEthernet0` port and to a free FastEthernet port on the switch.
5. Add fibre modules to R1, R3 and R4 for the two inter-router links.
6. Verify that all 17 connections are present, the cable types are correct and the names are right.

## Difficulties and solutions

**1. SW1-R2 and SW2-R2 were crossover.**
Router to switch requires straight-through copper. I deleted both links and recreated them with the correct cable.

**2. An extra link (R4-SW7).**
It was not in the exercise brief. I deleted it.

**3. SW5-R4 and SW6-R4 were missing.**
I added them with straight-through copper.

**4. The SW5-SW6 cable ran behind SW7.**
It looked like a SW7-SW6 link. I moved the switches to separate the cables and confirmed that SW7 only connects to SW5.

**5. Multi-mode fibre would not connect.**
The 2911 routers only come with copper ports out of the box and R3 needs two fibre ports (one towards R1 and one towards R4). I solved it by powering off the routers, adding modules with fibre ports in the Physical tab and powering them back on.

**6. Red links.**
Several links show red triangles. The exercise says they do not need to be fixed. Most likely the router ports are shut down by default and this lab does not include configuration, which is why links touching a router turn red. Links between switches, PCs and the server are green. I will verify this when I configure the interfaces (`show ip interface brief` and `no shutdown`).

## What I learned

- Straight-through for different device types and crossover for same device types.
- Copper reaches 100 m. Beyond that, fibre is needed — single-mode for kilometres and multi-mode for hundreds of metres.
- The 2911 routers need additional modules to have fibre ports.
- A long cable running behind another device can be misleading. It helps to spread out the devices when reviewing the diagram.
- Red triangles indicate a down link, and in this lab they are expected.

## Files

- `Lab_Cableado.pkt`: Packet Tracer file
- `img/topologia-final.png`: screenshot of the finished topology
