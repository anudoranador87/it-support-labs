# Lab 07: Linux Network — Connectivity Troubleshooting

**CompTIA A+ Domain:** 220-1201, Domain 2.0 (Networking)  
**Level:** Intermediate  
**Time:** 50 minutes  

---

## 🎯 Objective

- Verify network configuration (IP addresses, subnets, gateways)
- Test network connectivity and routing
- Troubleshoot DNS resolution issues
- Document network states and commands

---

## 📋 Scenario

**Ticket:** "The Linux server cannot reach the internet, but can reach local devices. Need to restore internet connectivity."

---

## 🔧 Tools

| Command | Purpose |
|---------|---------|
| `ip a` / `ifconfig` | View network interfaces and IP addresses |
| `ping` | Test reachability of a host |
| `traceroute` / `tracepath` | Trace the path packets take to destination |
| `nslookup` / `dig` | Query DNS records |
| `ip route` | View the routing table |

---

## 📸 Step-by-Step Walkthrough

### **Step 1: Verify Local Network Configuration**

1. Run `ip a` to check the IP address of your active interface (e.g., `eth0` or `wlan0`).
2. Verify that it has a valid IPv4 address (not `127.0.0.1` and not a `169.254.x.x` APIPA address).

**Expected Output:** Valid IP like `192.168.1.50`

### **Step 2: Test Local Connectivity**

1. Ping the local loopback to ensure the TCP/IP stack works: `ping -c 4 127.0.0.1`
2. Ping your default gateway (router). First find it with `ip route` (look for `default via X.X.X.X`).
3. Ping the gateway: `ping -c 4 X.X.X.X`

**Result:** Local pings should succeed.

### **Step 3: Test External Connectivity & DNS**

1. Ping an external IP (e.g., Google DNS): `ping -c 4 8.8.8.8`
2. If this succeeds, external routing works.
3. Ping a domain name: `ping -c 4 google.com`
4. If IP ping works but domain ping fails, it is a DNS issue.

### **Step 4: Troubleshoot DNS (If applicable)**

1. Check your DNS servers: `cat /etc/resolv.conf`
2. Use `nslookup google.com` to see if a specific DNS server responds.

---

## ✅ Verification Checklist

- [ ] Identified local IP address and subnet
- [ ] Successfully pinged default gateway
- [ ] Tested external connectivity via IP and Domain Name
- [ ] Understand the difference between a routing issue and a DNS issue

---

## 🎓 Key Concepts

**2.0 — Networking**
- IPv4 vs IPv6
- Default Gateways & Subnet Masks
- DNS (Domain Name System) Role
- ICMP (Internet Control Message Protocol) used by ping

---

**Author:** José María Aparicio Portillo  
**Status:** 🔄 In Progress
