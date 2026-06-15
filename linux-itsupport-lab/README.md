# 🖥️ Linux IT Support Lab

Hands-on Linux command reference for IT Support, documented with real cases.

**Machine:** ASUS X550JF — Ubuntu Linux 7.0.0-22-generic — Intel Core i5 — 7.4GB RAM  
**Goal:** Google IT Support Certificate + CompTIA A+ preparation

---

## Modules

| Module | Description |
|--------|-------------|
| [01 - System Info](./01-system-info/commands.md) | `uname`, `uptime`, `whoami`, `hostname` |
| [02 - Disk & Memory](./02-disk-memory/commands.md) | `df`, `free`, `lsblk` |
| [03 - Processes](./03-processes/commands.md) | `top`, `ps`, `kill` |
| [04 - Networking](./04-networking/commands.md) | `ip a`, `ping`, `nmcli`, `ss` |
| [05 - Drivers](./05-drivers/rtl8821ae-fix.md) | Real case: Realtek RTL8821AE WiFi fix |

---

## Real Cases Solved

- 🔧 **Intermittent WiFi** — Diagnosed and permanently fixed RTL8821AE driver bug on Ubuntu
- 🌡️ **CPU Temperature** — Monitored with `sensors` (39°C vs 70–80°C on Windows 10)
- 🔍 **Network Troubleshooting** — Isolated connectivity issue using `ip a`, `ping` and `nmcli`
