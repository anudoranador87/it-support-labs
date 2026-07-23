# 🖥️ Lab 03 — Network Connectivity

**Series:** Linux IT Support Fundamentals  
**Environment:** ASUS X550JF — Ubuntu Linux 24.04 LTS  
**Objective:** Diagnose network connectivity issues, check interface status, and verify DNS resolution.  
**Status:** 🟡 In progress (Draft / Placeholder content)

---

## Scenario

The most frequent area in IT Support. 80% of user tickets are connectivity issues. A user says: *"I can't open any website."* You need to follow a logical path to find where the connection is broken.

---

## Commands

| Command | Purpose |
|---|---|
| `ip a` | List network interfaces and assigned IP addresses |
| `ping -c 4 <target>` | Test connectivity to a local or remote host |
| `nmcli device status` | Check status of physical/virtual network devices |
| `nmcli device wifi list` | List available WiFi networks |
| `ss -tuln` | Show listening ports (useful for service diagnosis) |

---

## 🛠️ The Troubleshooting Process (The "Golden Path")

Follow these steps in order to isolate the fault:

1. **Local Link:** Do I have an IP address?
   ```bash
   ip a
   ```
2. **Gateway:** Can I reach the router?
   ```bash
   ping -c 4 192.168.1.1
   ```
3. **Internet:** Can I reach the outside world (via IP)?
   ```bash
   ping -c 4 8.8.8.8
   ```
4. **DNS:** Can I resolve names?
   ```bash
   ping -c 4 google.com
   ```

---

## 🔬 Real Results (ASUS X550JF)

### Interface Status (`ip a`)
```text
1: lo: <LOOPBACK,UP>  inet 127.0.0.1/8
2: enp4s0f1: <NO-CARRIER>  state DOWN        ← Ethernet, no cable
3: wlp3s0: <BROADCAST,MULTICAST,UP>  state UP ← WiFi Active ✅
   inet 192.168.1.146/24
```

### Connectivity Test
```text
$ ping -c 4 8.8.8.8
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 15.241/18.452/22.104/2.541 ms
```

---

## Common Errors and Meanings

| Error | Cause | IT Support Action |
|-------|-------|-------------------|
| `Destination Host Unreachable` | No route to the target | Check if the network cable is plugged in or WiFi is connected. |
| `Request timeout` | Packet lost or firewall | Check if the router is on or if a firewall is blocking ICMP. |
| `Temporary failure in name resolution` | DNS issue | Check `/etc/resolv.conf` or router DNS settings. |

---

## Key Concepts

**Loopback (`lo`)** — A virtual interface used for internal testing. If `ping 127.0.0.1` fails, the OS networking stack itself is broken.

**The `/24` Notation** — Indicates a standard subnet mask (`255.255.255.0`), allowing for 254 usable IP addresses in the local network.

---

## IT Support Use Case

> User has no internet → `ip a` shows a valid IP → `ping 192.168.1.1` works → `ping 8.8.8.8` works → `ping google.com` fails. **Diagnosis:** The problem is the DNS server.

---

## Part of

[`it-support-labs`](https://github.com/anudoranador87/it-support-labs) — Google IT Support Certificate + CompTIA A+ preparation.
