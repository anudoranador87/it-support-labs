# Lab 3: OSI Model, STP, OSPF and DHCP (CCNA · Packet Tracer)

> 🇪🇸 [Versión en español](./README.md)

First CCNA lab where **I actually configure devices**. In the two previous labs I only placed equipment and cables; here I type commands in the router CLI, set IPv4 addresses on interfaces, set up a DHCP server with relay and lay the groundwork for OSPF. The goal is to practise commands learned in Jeremy's course by connecting a small topology step by step.

## Objective

Build a network with two separate LANs (one for a server and one for a client) linked by two routers, and practise:

- IPv4 interface configuration on Cisco routers.
- Static addressing on a server.
- DHCP service and relay between different subnets.
- Connectivity verification with `ping`.
- DHCP working through a relay between two subnets.
- STP and BPDU observation in Simulation Mode.
- OSPF preparation (pending).

## Why I put the server and the PC in different LANs

In a real company, servers usually sit on a separate network from the workstations. If I had placed everything on the same LAN (same subnet), the PC could obtain its IP via DHCP without any special router configuration.

By putting the server on `192.168.1.0/24` and the PC on `192.168.2.0/24` I force myself to:

1. **Configure router interfaces on two different subnets**, which teaches me that each router interface is the gateway to a different network.
2. **Use DHCP relay** (`ip helper-address`), because DHCP requests are broadcast and do not cross routers unless the router forwards them.
3. **Understand routing**, because traffic between the two LANs has to pass through R1.

If everything were on the same network, I would not have learned any of this.

## Topology

| Device | Role |
|---|---|
| R1 | Main router: connects the server LAN, the client LAN and R2 |
| R2 | Second router for inter-router connectivity and OSPF |
| SW1 | Layer 2 switch for the server LAN |
| SW2 | Layer 2 switch for the client LAN |
| SRV1 | Server with a static IP and DHCP service |
| PC1 | Client that will obtain its IP via DHCP |

### Physical connections

- SRV1 → SW1
- SW1 → R1 GigabitEthernet0/0
- PC1 → SW2
- SW2 → R1 GigabitEthernet0/1
- R1 GigabitEthernet0/2 → R2 GigabitEthernet0/0

I used an Ethernet link between the routers instead of the serial link shown in some guides. The 2911 has built-in GigabitEthernet ports, so it is simpler than adding serial modules.

![Physical topology](evidence/01-topology-physical.png)

## IPv4 Addressing Plan

| Device / Interface | IPv4 address | Purpose |
|---|---|---|
| R1 G0/0 | 192.168.1.1/24 | Server LAN gateway |
| SRV1 | 192.168.1.2/24 | Server with static addressing |
| R1 G0/1 | 192.168.2.1/24 | Client LAN gateway |
| PC1 | DHCP — pending verification | Client address, assigned via DHCP |
| R1 G0/2 | 10.0.0.1/30 | Inter-router link |
| R2 G0/0 | 10.0.0.2/30 | Inter-router link |

### Why /30 between routers

A point-to-point link only needs two IP addresses (one per end). A `/30` mask gives exactly 2 usable hosts (`10.0.0.1` and `10.0.0.2`). Using a full `/24` would waste 252 addresses.

### Server configuration

SRV1 has been configured with:

- IPv4: `192.168.1.2`
- Subnet mask: `255.255.255.0`
- Default gateway: `192.168.1.1` (R1's G0/0 interface)
- DNS: `8.8.8.8` (a well-known test value; external DNS reachability has not been tested in the simulation)

![SRV1 IP configuration](evidence/07-srv1-ip-configuration.png)

## DHCP Configuration

The DHCP service was enabled on SRV1 with a pool named `LAN_PC1`.

| Parameter | Value |
|---|---|
| Pool name | LAN_PC1 |
| Default gateway | 192.168.2.1 |
| DNS server | 8.8.8.8 |
| Starting address | 192.168.2.10 |
| Subnet mask | 255.255.255.0 |
| Maximum users | 50 |

![DHCP pool on SRV1](evidence/09-srv1-dhcp-pool-config.png)

### DHCP relay (ip helper-address)

The DHCP server sits on `192.168.1.0/24`, but the PC that needs an IP is on `192.168.2.0/24`. DHCP requests are broadcast and do not cross routers. Without any extra configuration, the PC sends a DHCP Discover on its own network and the server, being on a different subnet, never receives it.

To solve this, I configured `ip helper-address` on R1's interface facing the PC:

```text
interface GigabitEthernet0/1
 ip helper-address 192.168.1.2
```

What this command does: when R1 receives a DHCP broadcast on G0/1, it converts it to unicast and forwards it to `192.168.1.2` (SRV1). The server replies to R1, and R1 passes it on to the PC. Without this command, the PC would never get an IP.

![DHCP relay on R1](evidence/10-r1-dhcp-relay.png)

**Verified:** PC1 received `192.168.2.2/24` through DHCP, with gateway `192.168.2.1` and DNS server `8.8.8.8`. This confirms that both DHCP and R1's relay work across the two subnets.

![Successful DHCP lease on PC1](evidence/12-pc1-dhcp-success.png)

> Configuration note: the current server evidence shows the pool starting at `192.168.2.1`; the intended lab range is `192.168.2.10`–`192.168.2.59`. This should be corrected before saving the final project so the gateway address is not included in the pool range.

## Router Configuration — why each command

### R1

```text
interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/1
 ip address 192.168.2.1 255.255.255.0
 ip helper-address 192.168.1.2
 no shutdown
!
interface GigabitEthernet0/2
 ip address 10.0.0.1 255.255.255.252
 no shutdown
```

**What I believe each command does:**

- `interface GigabitEthernet0/0` → I enter the configuration for that specific port. Each interface is configured separately, one at a time.
- `ip address 192.168.1.1 255.255.255.0` → I assign the IP and the mask to the port. This is the address that devices on that LAN will use as their gateway.
- `no shutdown` → I bring the port up. **Router ports are shut down by default.** If I don't type this, the link stays red and no traffic flows.
- `ip helper-address 192.168.1.2` → Forwards DHCP broadcasts from this interface to the server. I only set it on G0/1 because that is the interface on the PC side.

![R1 G0/0 up](evidence/02-r1-g0-0-up.png)

![R1 LAN interfaces](evidence/03-r1-lan-interfaces.png)

![R1 inter-router link](evidence/04-r1-router-link-initial.png)

### R2

```text
interface GigabitEthernet0/0
 ip address 10.0.0.2 255.255.255.252
 no shutdown
```

R2 only has one configured interface for now. When I configure OSPF, R2 will share its routes with R1.

![R2 G0/0 up](evidence/05-r2-g0-0-up.png)

### OSPF — what it is, what problem it solves, and why I need it

Right now R1 knows its three directly connected networks, but R2 only knows the `10.0.0.0/30` network. If I later add a LAN behind R2, R1 would have no idea how to reach it and I would have to add static routes manually.

**OSPF** (Open Shortest Path First) is a dynamic routing protocol. What it does is let routers discover each other as neighbours and automatically exchange the networks they know about. If a link goes down, OSPF recalculates the route without me touching anything.

**Why OSPF and not another protocol:**

- It is an open standard (works on any vendor, not just Cisco).
- It is the most widely used interior gateway protocol in enterprise environments.
- It is part of the CCNA syllabus.

**Status:** Not yet configured. The next steps will be:

1. Enable OSPF on R1 and R2.
2. Advertise each router's networks.
3. Verify neighbour adjacency with `show ip ospf neighbor`.
4. Check that learned routes appear in `show ip route`.

## Connectivity Tests

### Test 1 — SRV1 to R1

```text
ping 192.168.1.1
```

- Packets sent: 4
- Packets received: 4
- Loss: 0%

**Outcome:** The server can reach its gateway. R1 G0/0's IP is correctly configured and the interface is up.

![SRV1 ping to R1](evidence/08-srv1-ping-r1.png)

### Test 2 — R2 to R1

```text
ping 10.0.0.1
```

- Packets sent: 5
- Packets received: 4
- Loss: 20%

The first ping failed and the next four succeeded. This happens because of ARP resolution: the first time a device talks to another, it needs to discover its MAC address, and that takes long enough for the first packet to time out. In real life and in Packet Tracer this is normal on the first attempt. A second `ping` should show 0% loss.

**Outcome:** Connectivity confirmed; repeat test needed to verify 100% stability.

![R2 ping to R1](evidence/06-r2-ping-r1.png)

### Test 3 — Stable R2 to R1 ping

After the initial ARP entry was resolved, I repeated `ping 10.0.0.1` from R2 and received 5 of 5 replies (0% loss). The `10.0.0.0/30` inter-router link is stable.

I also tested `ping 192.168.2.1` from R2. It failed because R2 does not yet have a route to the client LAN, which is expected before configuring OSPF or a static route.

![Stable R2 to R1 ping](evidence/11-r2-ping-r1-stable.png)

### Test 4 — PC1 to its gateway and the server

PC1 successfully reached both its default gateway (`192.168.2.1`) and SRV1 (`192.168.1.2`) with 4 of 4 replies. This verifies inter-subnet routing through R1.

![PC1 connectivity](evidence/13-pc1-connectivity.png)

### STP observation in Simulation Mode

With only STP enabled in the Simulation Mode filters, the Event List displayed STP BPDUs sent by SW1 and SW2 to connected devices. No port was blocked, which is correct: this topology has no redundant Layer 2 link for STP to block.

[STP BPDU simulation video](evidence/14-stp-bpdu-simulation.mp4)

### DHCP Simulation Mode issue

I separately cleared events, filtered DHCP and ARP, changed PC1 between static addressing and DHCP, and attempted a lease renewal. Packet Tracer did not add DHCP events to the Simulation panel, despite the successful lease and connectivity tests.

This is recorded as a Packet Tracer display/simulation issue, **not** a DHCP relay failure. Capturing the `Discover`, `Offer`, `Request`, and `ACK` sequence remains an investigation item.

## Difficulties and solutions

**1. I forgot `no shutdown` on an interface.**
I configured the IP on G0/0 but did not type `no shutdown`. The link stayed red and pings failed. It took me a while to figure out because the IP was correct. The lesson: **always finish with `no shutdown`** after configuring an interface.

**2. Commands typed at the wrong CLI level.**
I tried to type `ip address ...` from privileged EXEC mode (`Router#`) instead of from interface configuration mode (`Router(config-if)#`). The router returned an error I did not understand at first. The CLI hierarchy is:
- `Router>` → user EXEC mode (basic queries only).
- `Router#` → privileged EXEC mode (`enable`): you can view the configuration and ping, but you cannot change anything.
- `Router(config)#` → global configuration mode (`configure terminal`).
- `Router(config-if)#` → interface configuration mode (`interface G0/0`): this is where you set IP addresses and type `no shutdown`.

**3. Each interface is configured separately.**
At first I thought I could configure several interfaces at once. You cannot. You have to enter each one with `interface GigabitEthernet0/X`, set its IP and `no shutdown`, then move on to the next. Before touching anything it is important to be clear about **which interfaces are cabled and which network each one serves**, because if you configure the wrong interface, you assign the IP to a port that is not connected and nothing works.

**4. The first ping failing because of ARP.**
I explained this above. It is not an error, but the first time I saw it I thought something was misconfigured.

**5. Unsupported `show` command syntax in the Packet Tracer IOS image.**
I tried `show running-config interface GigabitEthernet0/1` from privileged mode and with `do` from configuration mode. This Packet Tracer IOS 15.1 image returned `Invalid input`. Using the full `show running-config` output and locating the interface block manually was the compatible alternative.

**6. DHCP works but no DHCP events are visible in Simulation Mode.**
The missing events initially suggested that relay might be broken. The valid PC1 lease and successful pings to SRV1 showed otherwise. This reinforced the need to validate an apparent simulator issue against real functional evidence.

## What I learned

- Router interfaces are configured one at a time. You need to know which cable goes to which port before you start.
- `no shutdown` is mandatory on routers. Without it, the interface is administratively down and no traffic flows.
- CLI levels matter: each command only works in its mode. If the router says "Invalid input", you are probably at the wrong level.
- DHCP relay (`ip helper-address`) is needed when the DHCP server is on a different subnet. PC1's successful lease demonstrated this in practice.
- A `/30` subnet is the right choice for point-to-point links between routers.
- A working router-to-router ping does not mean R2 knows R1's LANs; without OSPF or static routes, it only knows directly connected networks.
- STP sends BPDUs even when there is no loop; a blocked port requires Layer 2 redundancy.
- Simulator output should be cross-checked against functional tests such as a valid DHCP lease and successful pings.
- OSPF lets routers share routes automatically instead of configuring them by hand; I have not implemented it yet.

## Remaining work

- [x] Repeat the R2-to-R1 ping to confirm stable connectivity.
- [ ] Configure OSPF on R1 and R2.
- [ ] Verify OSPF neighbour adjacency and learned routes.
- [x] Set PC1 to DHCP and verify it receives an IP, gateway and DNS.
- [x] Test connectivity from PC1 to its gateway and SRV1.
- [ ] Investigate why Simulation Mode does not show DHCP messages despite a successful lease.
- [x] Observe STP and identify BPDUs.
- [ ] Change the DHCP pool start address to `192.168.2.10` and renew the lease before saving the final version.
- [ ] Save the final Packet Tracer project and complete the evidence set.

## Evidence

All screenshots are in [`evidence/`](evidence/). The Packet Tracer project file is [`Lab_OSI_JoseAparicio.pkt`](Lab_OSI_JoseAparicio.pkt).

| File | Shows |
|---|---|
| `01-topology-physical.png` | Topology overview |
| `02-r1-g0-0-up.png` | R1 GigabitEthernet0/0 interface up |
| `03-r1-lan-interfaces.png` | R1 LAN interface configuration |
| `04-r1-router-link-initial.png` | R1 inter-router link configuration |
| `05-r2-g0-0-up.png` | R2 GigabitEthernet0/0 interface up |
| `06-r2-ping-r1.png` | R2 ping to R1 (10.0.0.1) |
| `07-srv1-ip-configuration.png` | SRV1 static IPv4 configuration |
| `08-srv1-ping-r1.png` | SRV1 ping to default gateway |
| `09-srv1-dhcp-pool-config.png` | DHCP pool on SRV1 |
| `10-r1-dhcp-relay.png` | DHCP relay (`ip helper-address`) on R1 |
| `11-r2-ping-r1-stable.png` | Second R2 → R1 ping, 5/5 replies |
| `12-pc1-dhcp-success.png` | Successful DHCP lease on PC1 |
| `13-pc1-connectivity.png` | PC1 reaches its gateway and SRV1 |
| `14-stp-bpdu-simulation.mp4` | Simulation Mode showing STP BPDUs |
