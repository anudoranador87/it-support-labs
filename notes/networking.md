# Networking

## VLANs and trunks

A VLAN is a logical broadcast domain. It separates traffic inside a switched network without requiring a different physical network for every group of devices.

| Concept | Practical meaning |
|---|---|
| Access port | Carries one VLAN to an end device. |
| 802.1Q trunk | Carries multiple tagged VLANs between network devices. |
| Native VLAN | Untagged VLAN on a trunk; it must be consistent at both ends. |
| SVI or routed interface | Layer-3 interface used to route between VLANs. |
| Management VLAN | Dedicated network for administering switches, APs and other infrastructure. |

A common troubleshooting clue is that a device receives an IP address but cannot reach the resources expected for its location. Compare the assigned subnet with the VLAN that the port or wireless network should use.

## STP and port security

Spanning Tree Protocol prevents Layer-2 loops by selecting a root bridge and blocking redundant paths. A loop can create a broadcast storm and make the whole network unusable. PortFast is appropriate for end-user ports when combined with BPDU Guard. Port security limits the MAC addresses accepted on a port; moving a device can therefore produce a network failure even when the cable is good.

DHCP snooping and Dynamic ARP Inspection help prevent rogue DHCP servers and ARP spoofing. They are especially useful in environments where users can connect unmanaged equipment.

## NAT and firewall logic

PAT, also called NAT overload, allows many private addresses to share one public address by using different source ports. Static NAT maps one private address to one public address. Port forwarding publishes an internal service and should be used sparingly; remote desktop should not be exposed directly to the Internet.

Firewall and ACL rules are evaluated in order. A permissive rule below a blocking rule may never be reached, and many ACLs finish with an implicit deny. When escalating a network rule, provide the source, destination, port, protocol, direction and business reason.

## IPv6 and wireless authentication

IPv6 uses hexadecimal addresses and commonly assigns `/64` prefixes to subnets. `fe80::/10` is link-local and `::1` is loopback. When a web page is slow, compare IPv4 and IPv6 separately rather than disabling IPv6 without evidence.

Enterprise Wi-Fi commonly uses 802.1X. The client is the supplicant, the access point or switch is the authenticator and RADIUS/NPS validates the request. EAP-TLS uses certificates; PEAP-MSCHAPv2 uses credentials inside a protected TLS tunnel. Certificate trust, clock drift and an incorrect NPS policy are common causes of authentication loops.

## Monitoring

Monitoring turns a reactive support process into a proactive one. SNMP can provide device status, Syslog centralizes events and tools such as LibreNMS, Zabbix, PRTG or Uptime Kuma can provide dashboards and alerts. A useful first monitoring set is the gateway, Internet reachability, Domain Controller, core services and important application endpoints.

## Practical diagnostic sequence

Start with Layer 1: power, cable, link lights and Wi-Fi association. Continue with Layer 2: VLAN, MAC learning and loops. Then validate Layer 3: IP address, mask, gateway and routing. Finally test DNS, ports, firewall rules and the application itself. This order avoids jumping to an application explanation before proving the lower layers.
