# 🖥️ Lab 02 — Processes and Performance

**Series:** Linux IT Support Fundamentals  
**Environment:** ASUS X550JF — Ubuntu Linux 24.04 LTS  
**Objective:** Monitor system resources, identify resource-heavy processes, and manage process states.  
**Status:** 🟡 In progress (Draft / Placeholder content)

---

## Scenario

A user reports: *"My computer is extremely slow and I hear the fans at 100% speed."* As an IT Support technician, you need to identify which process is hogging the CPU or RAM and decide whether to terminate it.

---

## Commands

| Command | Purpose |
|---|---|
| `top` | Real-time dynamic view of running processes |
| `ps aux` | Snapshot of all current processes |
| `ps aux | grep <name>` | Find a specific process by name |
| `kill <PID>` | Send a signal to a process (usually to stop it) |

---

## Walkthrough

### Step 1 — Real-time Monitoring
Run `top` to see what's happening right now.
```bash
top
```

### Step 2 — Sorting by Usage
While inside `top`:
- Press **`P`** to sort by CPU usage (identifies "hungry" apps).
- Press **`M`** to sort by Memory usage (identifies "leaks").

### Step 3 — Identifying the Culprit
Locate the **PID** (Process ID) of the application causing the slowdown.

### Step 4 — Managing the Process
If a process is unresponsive, press **`k`** inside `top`, enter the PID, and press Enter to kill it.

---

## 🔬 Real Results (ASUS X550JF)

```text
top - 08:28:32 up 10 min,  1 user,  load average: 0.04, 0.26, 0.20
Tasks: 242 total,   1 running, 241 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.2 us,  0.2 sy,  0.0 ni, 99.5 id ...

  PID USER      %CPU  %MEM     TIME+ COMMAND
 4435 jose       1.0   2.1   0:04.12 ptyxis
 1201 root       0.7   1.2   0:02.45 Xorg
```

### Key Indicators
| Field | Status | Meaning |
|-------|--------|---------|
| `99.5 id` | ✅ Healthy | The CPU is 99.5% Idle (doing nothing). |
| `0 zombie` | ✅ Healthy | No "zombie" processes (orphans taking up space). |
| `S` Column | ℹ️ Info | Process State: `S` (Sleeping), `R` (Running), `Z` (Zombie). |

---

## Key Concepts

**The Load Average** — If these numbers (1, 5, 15 min) are higher than your CPU core count (e.g., >2 on this machine), the system is struggling.

**Terminating Processes** — Always try to close the app normally first. Use `kill` (or `k` in top) as a last resort for unresponsive tasks.

---

## IT Support Use Case

> CPU at 99% sustained → `top` → sort by CPU with `P` → identify `firefox` is using 90% → `k` → `1234` (PID) → System returns to normal.

---

## Part of

[`it-support-labs`](https://github.com/anudoranador87/it-support-labs) — Google IT Support Certificate + CompTIA A+ preparation.
