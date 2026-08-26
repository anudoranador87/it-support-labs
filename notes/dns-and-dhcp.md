# DNS and DHCP

## DNS answers a different question from ping

`ping` tests basic IP reachability. DNS translates names into addresses and, in Active Directory, publishes service records that help clients locate Domain Controllers. A successful ping does not prove that domain discovery or application access will work.

```powershell
ipconfig /all
nslookup lab.local
nslookup -type=SRV _ldap._tcp.lab.local
Resolve-DnsName lab.local
```

When Internet access works but internal names fail, compare the configured DNS server with the expected internal resolver. In the AD lab, the client should use `192.168.1.200` rather than a public resolver.

## DNS troubleshooting sequence

First confirm the client address, gateway and DNS server. Then query the name using the configured resolver, query a known public name only if Internet diagnosis is needed, and finally test the relevant SRV record. Check for stale, duplicate or incorrect A records before changing server settings.

A useful support statement is: **IP connectivity works, but name resolution fails**. This separates a routing problem from a DNS problem and makes escalation more precise.

## DHCP and DORA

DHCP assigns network settings dynamically. The normal exchange is Discover, Offer, Request and Acknowledge (DORA). The client should receive an address, mask, gateway, DNS server and lease information.

```powershell
ipconfig /all
ipconfig /release
ipconfig /renew
```

The DHCP scope should have enough free addresses, the correct gateway and the Domain Controller as DNS when the clients belong to an AD domain. A reservation can give a known device the same address based on its MAC address.

## APIPA

An address in `169.254.0.0/16` indicates that a Windows client self-assigned an APIPA address after failing to obtain a DHCP lease. The next step is not to assign a random static IP immediately: check the link, VLAN, DHCP scope, relay and server availability.

## Common failure patterns

| Symptom | First hypothesis | Useful evidence |
|---|---|---|
| No address and no gateway | DHCP or link failure | `ipconfig /all`, switch/AP status |
| Internet works but `lab.local` fails | Wrong DNS resolver | `nslookup`, DNS configuration |
| Name resolves but application fails | Port, firewall or service issue | Port test and service status |
| Only some clients fail | VLAN, scope, reservation or local configuration | Compare client network details |

The safest fix is the one that restores the correct network design and can be verified afterward. Avoid changing several variables at once.
