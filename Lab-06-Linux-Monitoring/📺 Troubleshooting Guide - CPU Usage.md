# 📺 IT Support – CPU Troubleshooting Lab

## Scenario

Production server in distress. Users report slowness. Requests timing out. You SSH in. **You have 5 minutes to diagnose and fix it.**

This lab walks through exactly that workflow.

---

## What You'll Learn

- **Real-time process monitoring** using `top`
- **Root cause identification** (finding which process is the culprit)
- **Decision-making under pressure** (kill vs renice)
- **Verification** (confirming the issue is resolved)

---

## 🎥 Video Walkthrough

[![YouTube thumbnail – CPU Troubleshooting](https://img.youtube.com/vi/2mHf1uUctw0/hqdefault.jpg)](https://youtu.be/2mHf1uUctw0)

Watch to see the exact workflow. ~5 min.

---

## The Lab: Step by Step

### Step 1: Establish Baseline

Check if it's memory, disk, or CPU causing slowness:

```bash
free -h              # Is RAM full?
df -h /              # Is disk full?
```

In this case: Memory and disk are fine. CPU must be the issue.

### Step 2: Monitor CPU in Real-Time

```bash
top
```

Instantly see all processes sorted by CPU usage. 

**Finding:** PID 9944 running `cat` is consuming **99.7% CPU**. That's the problem.

### Step 3: Confirm the Culprit

```bash
ps -p 9944           # Verify process exists
```

Yes, PID 9944 is real. It's consuming almost all CPU.

### Step 4: Decision Point

You have two options:

#### Option A: Kill the Process (Remove It)

```bash
kill 9944
```

**When to use:** Process is broken, unwanted, or serving no purpose.

**Result:**
- Before: 250 tasks running, load high, 99.7% CPU
- After: 248 tasks, load normal, 19.9% CPU
- Users' requests process again. Service restored.

#### Option B: Lower Its Priority (Slow It Down)

```bash
renice +10 -p 9944
```

**When to use:** Process is important but can wait. You want to test if it's really the culprit without destroying it.

**Result:** Process still runs but at lower priority. Other tasks get CPU time. System responsive without losing the process.

### Step 5: Verify Fix

```bash
ps -p 9944           # Is it gone? (if you killed it)
top                  # Check: is CPU normal now?
```

Confirm:
- ✓ CPU usage back to normal
- ✓ System responsive
- ✓ Users' requests processed again

---

## Skills Demonstrated

| Skill | Evidence |
|-------|----------|
| **Diagnostics** | Used `free`, `df`, `top` to isolate CPU as issue |
| **Root Cause Analysis** | Identified exact process (PID 9944) causing bottleneck |
| **Decision-Making** | Chose `kill` vs `renice` based on business impact |
| **Verification** | Confirmed metrics improved post-fix |
| **Linux Fundamentals** | Process management, system monitoring, priorities |

---

## Real-World Context

This exact scenario happens in production:
- A cron job misbehaves → consumes 99%+ CPU
- A query runs forever → database hogging CPU
- A misconfigured service spawns too many processes
- User load unexpectedly spikes → system can't keep up

**Your job:** Find it in seconds. Fix it before customers notice.

---

## Tools Used

| Tool | Purpose |
|------|---------|
| `top` | Real-time process monitor (built-in) |
| `free` | Memory diagnostics (built-in) |
| `df` | Disk diagnostics (built-in) |
| `ps` | Process verification (built-in) |
| `kill` | Process termination (built-in) |
| `renice` | Priority adjustment (built-in) |

All standard Linux tools. No special software needed.

---

## Beyond This Lab

Once you master it:

**Know these exist (don't need to use, but mention them):**
- `htop` - prettier version of `top` with better UI
- `atop` | `nmon` - advanced process/system monitoring
- `systemd-analyze` - service performance analysis
- `perf`, `flamegraph` - CPU profiling (overkill for most cases)

**Real production setups use:**
- Continuous monitoring (`Prometheus`, `Datadog`, `New Relic`)
- Alerting (`PagerDuty`, `OpsGenie`)
- Historical data (`InfluxDB`, `Grafana`)

But for troubleshooting *right now*? `top` is your lifeline.

---

## Practice It

Create a CPU hog and diagnose it yourself:

```bash
yes > /dev/null &    # Start background process eating CPU
top                  # Find it
kill %1              # Kill by job number
```

Do this 5 times until it's muscle memory.

---

## For Interviews / Portfolio

**What this demonstrates:**
- Linux troubleshooting (practical, not theoretical)
- Problem-solving under pressure
- Understanding of system bottlenecks
- Video + documentation (proof you actually did it)

**You can say:**
> "I've documented a production CPU troubleshooting workflow. I can diagnose and resolve CPU bottlenecks in Linux systems using standard tools like top, isolate root causes, and make decisions between process termination and priority adjustment based on business impact."

---

## Success Criteria

After completing this lab, you should be able to:

✓ Recognize when CPU is the bottleneck (vs memory/disk)  
✓ Use `top` to identify processes consuming resources  
✓ Decide between `kill` and `renice` based on context  
✓ Verify the fix actually works  
✓ Explain what happened to your manager/team  

---

That's it. Go watch the video. Go practice. Go nail your interviews. 🚀
