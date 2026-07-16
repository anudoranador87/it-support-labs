# 📺 IT Support – CPU‑Troubleshooting Lab

A step-by-step guide showing how to diagnose a sluggish Linux server, locate the process consuming CPU, and fix it using the command line.

The video **[IT Support CPU usage](https://youtu.be/2mHf1uUctw0)** shows the full workflow. Screenshots below are checkpoints at each step.

---  

## 🎥 Video walkthrough  

[![YouTube thumbnail – CPU Troubleshooting](https://img.youtube.com/vi/2mHf1uUctw0/hqdefault.jpg)](https://youtu.be/2mHf1uUctw0)

---

## 🧭 The Lab

### Step 1: System Baseline

Check memory, disk, and load average first.

| Step | Command | What you see |
|------|---------|--------------|
| Memory | `free -h` | RAM usage, swap | 
| Disk | `df -h /` | Partition space |
| Load | `top -b -n 1 \| head -n 15` | System overview + CPU breakdown |

Screenshots: [1](assets/screenshots/screenshot_001.png) [2](assets/screenshots/screenshot_002.png) [3](assets/screenshots/screenshot_003.png)

---

### Step 2: Find the Culprit

Open `top` and look for the process consuming CPU.

```bash
top
```

In this lab: **PID 9944** running `cat` uses **98.7% CPU**. That's the problem.

Screenshot: [interactive top](assets/screenshots/screenshot_006.png)

Alternatively with `ps`:
```bash
ps -eo pid,comm,%cpu --sort=-%cpu | head -n 5
```

---

### Step 3: Fix It

You have two choices.

#### Option A: Kill the process (remove it)

```bash
sudo kill 9944
```

The process stops immediately.

**Before:** 250 tasks, load high, 98.7% CPU  
**After:** 248 tasks, load normal, 19.9% CPU  

Screenshots: [kill](assets/screenshots/screenshot_007.png) [result](assets/screenshots/screenshot_008.png)

#### Option B: Lower its priority (keep it running but slower)

```bash
sudo renice +10 -p 9944
```

The process still runs but doesn't hog CPU. Other tasks can use it.

Screenshots: [renice](assets/screenshots/screenshot_010.png) [result](assets/screenshots/screenshot_011.png)

---

## Commands

### Diagnostics
```bash
free -h              # RAM + swap
df -h /              # disk space
top -b -n 1          # snapshot
vmstat 1 3           # memory stats
```

### Find processes
```bash
top                  # interactive, sorted by CPU
ps -eo pid,comm,%cpu --sort=-%cpu | head -10
ps aux | grep <name>
```

### Control processes
```bash
kill <PID>           # stop it
kill -9 <PID>        # force stop
renice +10 -p <PID>  # lower priority (higher number = lower priority)
nice -n 5 <command>  # start with lower priority
```

### Info
```bash
uptime               # load average
nproc                # CPU count
cat /proc/cpuinfo    # CPU details
```

---

## When to use what

**Use `kill`:**
- Process is broken/unwanted
- Need immediate relief
- It's consuming resources for nothing

**Use `renice`:**
- Process is important but can wait
- Want to slow it down, not remove it
- Testing if it's really the problem

---

## Success

After the lab, you should be able to:
- Check if system is healthy (memory, disk, CPU)
- Find what's consuming CPU
- Decide whether to kill or renice it
- Verify the problem is fixed

---

## Manual testing

Want to practice? Create a CPU hog:

```bash
yes > /dev/null &
```

Then diagnose and kill it. Same as the lab.

