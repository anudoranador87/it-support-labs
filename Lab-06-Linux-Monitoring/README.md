# Lab 06: Linux Monitoring — Processes & Performance

**CompTIA A+ Domain:** 220-1201, Domain 1.9 (Linux Performance)  
**Level:** Intermediate  
**Time:** 45 minutes

---

## 🎯 Objective

- Monitor running processes (ps, top, htop)
- Check system resource usage (CPU, RAM, disk)
- Identify resource hogs
- Kill unresponsive processes

---

## 📋 Scenario

**Ticket:** "Linux server running slow. Need to find what's using resources and terminate it."

---

## 🔧 Tools

| Command | Purpose |
|---------|---------|
| `ps aux` | List all running processes |
| `top` / `htop` | Real-time process monitor |
| `df -h` | Disk space usage |
| `free -m` | Memory usage |
| `kill` / `killall` | Terminate process |

---

## 📸 Step-by-Step Walkthrough

### **Step 1: Check System Memory**

1. Run `free -h` to see memory in human-readable format.
2. Note the "used" vs "available" RAM. If available is very low and swap is heavily used, the system is constrained.

### **Step 2: Check Disk Space**

1. Run `df -h`. 
2. Ensure the root partition `/` is not at 100% capacity, which can cause severe slowness.

### **Step 3: Monitor Processes in Real-Time**

1. Run `top`.
2. Press `P` to sort by CPU usage, or `M` to sort by Memory usage.
3. Identify the Process ID (PID) of the most resource-intensive application.

### **Step 4: Terminate a Process**

1. *(Optional: open a second terminal and run a stress test command like `cat /dev/urandom > /dev/null` to create a fake load)*
2. Note the PID from `top`.
3. Press `q` to quit `top`.
4. Run `kill <PID>` to send a polite termination signal. 
5. If it doesn't close, force kill it with `kill -9 <PID>`.

---

## ✅ Verification Checklist

- [ ] Checked RAM usage with `free`
- [ ] Checked disk space with `df`
- [ ] Used `top` to find a PID
- [ ] Successfully killed a process
- [ ] Understand the difference between `kill` (SIGTERM) and `kill -9` (SIGKILL)

---

## 🎓 Key Concepts

**1.9 — Linux Performance**
- System baselines
- PID (Process ID)
- Daemons vs Foreground processes
- Virtual Memory (Swap)

---

**Author:** José María Aparicio Portillo  
**Status:** 🔄 In Progress
