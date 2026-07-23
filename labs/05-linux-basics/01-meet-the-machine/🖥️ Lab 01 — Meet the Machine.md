ye# 🖥️ Lab 01 — Meet the Machine

[![Lab 01 - Meet the Machine](https://img.youtube.com/vi/ZFyInAkqaO4/0.jpg)](https://www.youtube.com/watch?v=ZFyInAkqaO4)

**Series:** Linux IT Support Fundamentals  
**Environment:** ASUS X550JF — Ubuntu Linux 24.04 LTS  
**Objective:** Identify basic system specifications, user context, and resource availability (Disk/RAM).  
**Status:** ✅ Completed

---

## Scenario

You sit down at an unfamiliar machine. Before you fix anything, you need to know what you are working with — operating system, user, uptime, disk space, and memory. These are the first questions in any IT support job.

---

## Commands

| Command | Stands for | Purpose |
|---|---|---|
| `uname -a` | Unix Name | OS name, kernel version, architecture |
| `lsb_release -a` | Linux Standard Base | Full distro name and version |
| `whoami` | Who am I | Current logged-in user |
| `uptime` | Up Time | How long the system has been running + load average |
| `df -h` | Disk Free | Available disk space per partition |
| `free -h` | Free Memory | RAM usage — total, used, available |

---

## Walkthrough

```bash
# Step 1 — What OS is this?
uname -a

# Step 2 — Which distro and version?
lsb_release -a

# Step 3 — Who am I logged in as?
whoami

# Step 4 — How long has this machine been running?
uptime

# Step 5 — How much disk space is left?
df -h

# Step 6 — How much RAM is available?
free -h
```

---

## 🔬 Real Results (ASUS X550JF)

### OS and Identity
```bash
$ uname -a
Linux jose-X550JF 7.0.0-22-generic #22-Ubuntu SMP PREEMPT_DYNAMIC Mon May 25 15:54:34 UTC 2026 x86_64 GNU/Linux

$ whoami
jose
```

### System Health
```bash
$ uptime
 08:24:13 up 5 min,  1 user,  load average: 1.30, 0.55, 0.25

$ free -h
               total        used        free      shared  buff/cache   available
Mem:           7.4Gi       1.4Gi       4.2Gi       218Mi       2.1Gi       6.0Gi
Swap:          4.0Gi          0B       4.0Gi
```

---

## Key Concepts

**Load average** — three numbers showing system load over the last 1, 5, and 15 minutes. Values significantly above 1.0 per CPU core indicate the system is under stress.

**Disk Free vs Free Memory** — a full disk (`df`) and low RAM (`free`) are two of the most common causes of system slowness. Always check both.

**`-h` flag** — stands for human readable. Converts raw bytes into gigabytes so the output is easier to read.

---

## Notes

- If `lsb_release` returns "command not found", try `lsb-release` or install it with `sudo apt install lsb-release`
- Run `LANG=C` before `df -h` if your system locale is not English, to get English column headers
- Always `clear` the terminal before starting a lab walkthrough

---

## Part of

[`it-support-labs`](https://github.com/anudoranador87/it-support-labs) — Documenting my journey from hotel management to IT support. Google IT Support Certificate + CompTIA A+ in progress.
