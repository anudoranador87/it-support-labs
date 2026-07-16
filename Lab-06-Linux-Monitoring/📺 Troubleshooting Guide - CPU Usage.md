# 📺 IT Support – CPU‑Troubleshooting Lab

A **step‑by‑step** guide that shows how to diagnose a sluggish Linux server, locate the offending process, and fix it — all using only the command line. The video **[IT Support CPU usage](https://youtu.be/2mHf1uUctw0)** (YouTube) showcases the whole workflow; the screenshots below give you quick visual checkpoints.

---  

## 🎥 Video preview  

[![YouTube thumbnail – CPU Troubleshooting](https://img.youtube.com/vi/2mHf1uUctw0/hqdefault.jpg)](https://youtu.be/2mHf1uUctw0)

*Click the thumbnail to watch the full walkthrough.*

---

## 🧭 Lab outline

| Step | Command (run in a terminal) | What you should see |
|------|----------------------------|---------------------|
| **1️⃣ Check memory & swap** | `free -h` | ![Memory overview](assets/screenshots/screenshot_001.png) |
| **2️⃣ Check disk space** | `df -h /` | ![Disk space](assets/screenshots/screenshot_002.png) |
| **3️⃣ Inspect CPU load** | `top -b -n 1 \| head -n 15` | ![CPU usage (top)](assets/screenshots/screenshot_003.png) |
| **4️⃣ Find the rogue process** | `ps -eo pid,comm,%cpu --sort=-%cpu \| head -n 5` | ![Finding the process](assets/screenshots/screenshot_004.png) |
| **5️⃣ Kill the process** *(hard stop)* | `sudo kill <PID>` | ![Killing the process](assets/screenshots/screenshot_005.png) |
| **6️⃣ Or renice it** *(soft stop)* | `sudo renice +10 -p <PID>` | ![Renice alternative](assets/screenshots/screenshot_006.png) |

> **Tip:** Replace `<PID>` with the actual process ID shown in step 4 (e.g., `9944`).

---  

## ✅ Success criteria

After completing the steps you should see:  

* **Memory** → enough free RAM / minimal swap usage.  
* **Disk** → ≥ 20 % free space on the root partition.  
* **CPU** → no process hogging > 90 % (or you have safely lowered its priority / terminated it).  

If those conditions are met, the system should feel noticeably more responsive.

---  

## 📚 Further reading

* `man free`, `man df`, `man top`, `man ps`, `man kill`, `man renice` – all the commands are documented in the system manual pages.
* **Linux Performance** – https://kernel.org/doc/html/latest/admin-guide/perf.html

Enjoy the lab and happy debugging! 🚀
