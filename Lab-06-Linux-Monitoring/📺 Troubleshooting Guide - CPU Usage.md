# 📺 IT Support – CPU‑Troubleshooting Lab

A step-by-step guide showing how to diagnose a sluggish Linux server, locate the process consuming CPU, and fix it using the command line.

Watch the video **[IT Support CPU usage](https://youtu.be/2mHf1uUctw0)** to see the full workflow.

---  

## 🎥 Video walkthrough  

[![YouTube thumbnail – CPU Troubleshooting](https://img.youtube.com/vi/2mHf1uUctw0/hqdefault.jpg)](https://youtu.be/2mHf1uUctw0)

---

## 🧭 The Lab

### Step 1: Check System Health

```bash
free -h              # memory usage
df -h /              # disk space
```

### Step 2: Monitor CPU

```bash
top                  # see all processes
```

Look for the process with highest %CPU. In this lab: **PID 9944** running `cat` at **99.7% CPU**.

### Step 3: Check if Process is Really There

```bash
ps -p 9944           # confirm PID 9944 exists
```

### Step 4: Kill It

```bash
kill 9944
```

### Step 5: Verify It's Gone

```bash
ps -p 9944           # should return nothing
top                  # check CPU dropped
```

### Step 6: Alternative - Lower Priority Instead

Instead of killing, you can slow it down:

```bash
renice +10 -p 9944   # lower priority but keep it running
```

---

## When to Use What

**Use `kill`:**
- Process is broken or unwanted
- It's consuming resources for nothing
- Need immediate relief

**Use `renice`:**
- Process is important but can wait
- Want to slow it down, not remove it
- Testing if it's really the culprit

---

## Success

After the lab:
- ✓ System feels responsive again
- ✓ CPU usage is normal
- ✓ Know when to `kill` vs `renice`

---

## Practice

Make a CPU hog and fix it:

```bash
yes > /dev/null &    # start background process consuming CPU
top                  # find it
kill %1              # kill it by job number
```

