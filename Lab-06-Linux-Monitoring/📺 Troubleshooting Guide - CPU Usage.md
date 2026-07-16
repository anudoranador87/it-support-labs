# 📺 Troubleshooting Guide: The Mystery of the Sluggish Server

This guide documents a real-world IT support case: a Linux server that has become painfully slow. Through this narrative, you will learn how to diagnose and resolve performance issues using the command line.

---

## 🎥 The Scenario (Video Walkthrough)

Imagine you receive a high-priority ticket: *"The server is crawling, I can barely type commands."* Before panicking, watch how we approach the problem in this walkthrough:

[![YouTube thumbnail – CPU Troubleshooting](https://img.youtube.com/vi/2mHf1uUctw0/hqdefault.jpg)](https://youtu.be/2mHf1uUctw0)

*Click the thumbnail to watch the full walkthrough on YouTube.*

---

## 🕵️‍♂️ Step 1: Initial Investigation

The first thing a technician does is rule out the "usual suspects." We need to know if the hardware is struggling.

### 🧠 Checking the RAM
Is the system out of memory? We run `free -h` to check. If the system is heavily relying on *Swap*, it will slow down everything.

![Memory Status Check 1](assets/screenshots/screenshot_001.png)
![Memory Status Check 2](assets/screenshots/screenshot_01.png)

### 💽 Checking Disk Space
A disk at 100% capacity can freeze a system. We use `df -h /` to verify the root partition and ensure there's room to breathe.

![Disk Space Verification 1](assets/screenshots/screenshot_002.png)
![Disk Space Verification 2](assets/screenshots/screenshot_02.png)

---

## 🔍 Step 2: Identifying the "Culprit"

If memory and disk look healthy, the issue is usually a "rogue" process hogging the CPU cycles.

### 📊 Real-Time Monitoring with `top`
We launch `top` to see the live heartbeat of the system. We can see processes fighting for resources.

![Real-time CPU Monitoring 1](assets/screenshots/screenshot_003.png)
![Real-time CPU Monitoring 2](assets/screenshots/screenshot_03.png)

### 🎯 Precision Targeting with `ps`
To be absolutely certain and get the exact **PID** (Process ID) for our next move, we run a filtered search for the top CPU consumers.

![Identifying the Rogue PID](assets/screenshots/screenshot_004.png)
![Detailed Process List](assets/screenshots/screenshot_007.png)

---

## 🛠️ Step 3: Taking Action

Now that we have the target in our sights, we must decide how to handle it.

### 💀 Option A: Immediate Termination (Kill)
If the process is non-essential or frozen, we terminate it immediately to restore system health.

![Preparing the Kill Command](assets/screenshots/screenshot_005.png)
![Kill Command Confirmation](assets/screenshots/screenshot_008.png)

### ⚖️ Option B: Adjusting Priority (Renice)
If the process must keep running, we lower its priority so it doesn't starve other important services.

![Adjusting Process Priority](assets/screenshots/screenshot_006.png)
![Renice Verification](assets/screenshots/screenshot_009.png)

---

## ✅ Step 4: Verification & Success

After taking action, we monitor the system to ensure the fix is permanent.

![Post-Fix System Status](assets/screenshots/screenshot_010.png)
![Final Performance Check](assets/screenshots/screenshot_011.png)
![Overall System Health](assets/screenshots/screenshot1.png)

### Final Checklist:
1. **Memory:** Available RAM is back to normal levels.
2. **Disk:** Root partition has plenty of free space.
3. **CPU:** No single process is hogging >90% of the CPU.

Mission accomplished! 🚀
