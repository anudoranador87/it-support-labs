# Lab 06: CPU Troubleshooting — Diagnose & Resolve High CPU Usage

Hands-on Linux CPU diagnostics for IT Support.

**Machine:** ASUS X550JF — Ubuntu Linux  
**Goal:** CompTIA A+ Domain 4 + Real production troubleshooting  
**Video:** [IT Support CPU usage](https://youtu.be/2mHf1uUctw0)

---

## 🎯 Scenario

Help Desk Ticket: "Server running slow. Users report timeouts."

Your job: SSH in. Find what's consuming CPU. Fix it. Time: 5 minutes.

---

## Step-by-Step

### Step 1: Check System Baseline

Run diagnostics to isolate the issue:

```bash
free -h              # Check memory
df -h /              # Check disk space
```

**Output:**
- Memory: 7.1Gi total, 2.5Gi used (OK)
- Disk: / has 4.0Gi available (OK)

**Analysis:** Memory and disk are fine. CPU must be the issue.

---

### Step 2: Monitor CPU in Real-Time

```bash
top
```

**Output:** 250 tasks running. Load average: 2.43, 1.41, 1.24

**Finding:** PID 9944 running `cat` consuming **99.7% CPU**. That's the culprit.

Screenshot: [screenshot_006.png](assets/screenshots/screenshot_006.png)

---

### Step 3: Confirm the Process

```bash
ps -p 9944
```

Verify PID 9944 exists and is the problem process.

---

### Step 4: Option A — Kill the Process

```bash
kill 9944
```

**Use when:** Process is broken, unwanted, or serving no purpose.

**Before:**
- Tasks: 250 total
- Load: high
- CPU: 99.7%

**After:**
- Tasks: 248 total
- Load: normal
- CPU: 19.9%

Screenshot (after): [screenshot_008.png](assets/screenshots/screenshot_008.png)

**Result:** Service restored. Users' requests process again.

---

### Step 5: Option B — Lower Priority (Alternative)

```bash
renice +10 -p 9944
```

**Use when:** Process is important but can wait. Want to slow it down without removing it.

**Result:** Process still runs but at lower priority. Other tasks get CPU time. System responsive.

Screenshot: [screenshot_010.png](assets/screenshots/screenshot_010.png)

---

### Step 6: Verify Fix

```bash
ps -p 9944           # Check if process exists
top                  # Check if CPU is normal
```

Confirm:
- ✓ CPU usage back to normal
- ✓ System responsive
- ✓ Load average dropped

---

## 📋 Commands Used

| Command | Purpose |
|---------|---------|
| `free -h` | Memory diagnostics |
| `df -h /` | Disk diagnostics |
| `top` | Real-time process monitor |
| `ps -p <PID>` | Verify specific process |
| `kill <PID>` | Terminate process |
| `renice +10 -p <PID>` | Lower process priority |

---

## 🎓 Key Concepts (CompTIA A+ Domain 4)

**4.3 — Process Management**
- Identifying runaway processes
- Using `top` and `ps` for diagnostics
- `kill` signals and priority management

**4.4 — Performance Troubleshooting**
- CPU vs Memory vs Disk bottleneck
- Isolating root cause with system tools
- Monitoring and verification

**4.5 — Priorities & Scheduling**
- Process priority levels
- `renice` for priority adjustment
- When to kill vs slow down

**4.6 — Monitoring Tools**
- `top`: real-time process view
- `ps`: process snapshot
- `free`, `df`: system diagnostics

---

## 💡 Lessons Learned

1. **Always baseline first** — Check memory and disk before assuming CPU
2. **`top` is your lifeline** — Instantly see what's consuming resources
3. **Decide before acting** — `kill` vs `renice` depending on situation
4. **Verify the fix** — Confirm metrics improved post-action
5. **This happens in production** — Cron jobs fail, queries run wild, services misbehave

---

## 🔗 Related Labs

- Lab 05: Linux Basics (processes, `ps`, `top`)
- Lab 07: Linux Network (networking tools)
- CompTIA A+ Domain 4

---

**Author:** José María Aparicio Portillo  
**Created:** July 2026  
**Status:** ✅ Complete  
**Video:** https://youtu.be/2mHf1uUctw0
