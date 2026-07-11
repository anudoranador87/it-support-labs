# 04 — Networking

The most frequent area in IT Support. 80% of user tickets are connectivity issues.

---

## Commands

```bash
ip a                                              # network interfaces and IPs
ping -c 4 8.8.8.8                                # internet connectivity test
ping -c 4 192.168.1.1                            # router connectivity test
ss -tuln                                          # open ports
nmcli device status                              # WiFi status
nmcli device wifi list                           # available networks
nmcli device wifi connect "SSID" password "PWD" # connect to WiFi
```

---

## Real Output (ASUS X550JF)

```
$ ip a
1: lo: <LOOPBACK,UP>  inet 127.0.0.1/8
2: enp4s0f1: <NO-CARRIER>  state DOWN        ← ethernet, no cable
3: wlp3s0: <BROADCAST,MULTICAST,UP>  state UP ← WiFi active
   inet 192.168.1.146/24
```

### Reading `ip a`

| Interface | Type | State | Meaning |
|-----------|------|-------|---------|
| `lo` | loopback | UP | Virtual, always active |
| `enp4s0f1` | ethernet | DOWN | No cable connected |
| `wlp3s0` | WiFi | UP | Connected ✅ |

**The `/24`** means the network ranges from `192.168.1.1` to `192.168.1.254`.

---

## Network Troubleshooting Process

```
1. Has it got an IP?        → ip a
2. Can it reach the router? → ping -c 4 192.168.1.1
3. Can it reach internet?   → ping -c 4 8.8.8.8
4. Is DNS failing?          → ping -c 4 google.com
```

Each step rules out one layer of the problem (OSI model).

---

## Common Errors

| Error | Cause |
|-------|-------|
| `Destination Host Unreachable` | No gateway configured |
| `Request timeout` | Host unreachable or firewall blocking |
| `Temporary failure in name resolution` | DNS issue or typo in command |

> ⚠️ `ping 8.8.8.8.` (with trailing dot) fails — Linux treats it as a domain name.

---

## IT Support Use Case

> User has no internet → `ip a` (got an IP?) → `ping 192.168.1.1` (reaches router?) → `ping 8.8.8.8` (internet access?) → each answer tells you exactly where the connection breaks.
