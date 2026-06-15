# 01 — System Information

First thing to do when connecting to a machine in IT Support: identify it.  
These commands give you a full picture in seconds.

---

## Commands

```bash
pwd       # current directory
whoami    # active user
hostname  # machine name
uname -a  # OS, kernel version and architecture
uptime    # system uptime and load average
```

---

## Real Output (ASUS X550JF)

```
$ uname -a
Linux jose-X550JF 7.0.0-22-generic #22-Ubuntu SMP PREEMPT_DYNAMIC Mon May 25 15:54:34 UTC 2026 x86_64 GNU/Linux

$ uptime
08:24:13 up 5 min,  1 user,  load average: 1.30, 0.55, 0.25
```

---

## Reading `uname -a`

| Field | Value | Meaning |
|-------|-------|---------|
| `Linux` | Linux | Operating system |
| `jose-X550JF` | hostname | Machine name |
| `7.0.0-22-generic` | kernel | Kernel version |
| `x86_64` | architecture | 64-bit processor |
| `SMP` | — | Multi-core support |

---

## Reading `uptime`

```
up 5 min,  1 user,  load average: 1.30  0.55  0.25
                                   ↑      ↑      ↑
                                 1 min  5 min  15 min
```

**Rule of thumb:** if load average consistently exceeds the number of CPU cores, there's a performance issue.  
This machine has 2 cores → alert if you see values of 3–4 sustained.

---

## IT Support Use Case

> User reports "the computer is slow". Before touching anything, run `uname -a` and `uptime` to identify the system and check how long it's been running and under what load.
