# 🖥️ Lab 04 — System Information Gathering & Documentation

## 📝 Scenario
As an IT Support Technician, you receive a report from a user experiencing system instability. Before making any changes or performing deep diagnostics, your first responsibility is to **gather baseline system information** and document the current state of the machine. This ensures you have a reference point and helps identify potential causes like recent reboots or kernel mismatches.

In this lab, we simulate this process using a mobile Linux environment (**Termux**), demonstrating that professional IT support tools and methodologies can be applied even from a mobile device.

## 🎯 Objectives
- Organize a workspace for technical documentation.
- Identify the current user and working directory.
- Retrieve critical system information (Kernel, Uptime, Hostname).
- Document all findings into a persistent text file using command-line redirection.

## 🛠️ Tools & Technology
- **Environment:** Termux (Android Linux Emulator)
- **Shell:** Bash / Zsh
- **Core Commands:** `mkdir`, `cd`, `pwd`, `whoami`, `uname`, `uptime`, `hostname`, `cat`
- **Techniques:** Standard Output Redirection (`>`, `>>`)

## 🚀 Step-by-Step Walkthrough

### 1. Environment Setup
First, we create a dedicated space for our lab to keep our documentation organized.
```bash
mkdir -p ~/lab04
cd ~/lab04
```

### 2. Verification of Context
Before running diagnostics, confirm where you are and who you are in the system.
```bash
pwd      # Confirm current path
whoami   # Identify current user
```

### 3. Gathering System Data
Execute the following commands to collect system metadata:
- **System Details:** `uname -a` (Shows kernel version and architecture)
- **System Uptime:** `uptime` (Checks how long the system has been running)
- **Network Identity:** `hostname` (Identifies the device name)

### 4. Documentation (The "Golden Rule")
In IT Support, **"If it's not documented, it didn't happen."** We save all previous outputs into a single file named `systeminfo.txt`.

```bash
whoami > systeminfo.txt
uname -a >> systeminfo.txt
uptime >> systeminfo.txt
hostname >> systeminfo.txt
```
*Note: We use `>` for the first command to create/overwrite the file, and `>>` for subsequent commands to append data.*

### 5. Verification
Finally, we verify that our documentation is complete.
```bash
cat systeminfo.txt
```

## 📸 Screenshots / Video
> [!TIP]
> This lab was recorded as a screencast demonstrating the efficiency of mobile terminal environments for quick IT diagnostics.

[![Lab 04 Walkthrough](https://img.youtube.com/vi/rkRuyRalGOE/maxresdefault.jpg)](https://youtu.be/rkRuyRalGOE)
*Haz clic en la imagen de arriba para ver el vídeo del laboratorio.*

## 🧠 Key Concepts
- **Baseline:** A set of data representing the normal or initial state of a system.
- **Redirection:** The process of capturing the output of a command and sending it to a file instead of the screen.
- **Uptime:** A critical metric for troubleshooting; unexpected reboots can indicate power or kernel issues.

## ✅ Checklist
- [ ] Created `lab04` directory.
- [ ] Successfully retrieved system information.
- [ ] Documented findings in `systeminfo.txt`.
- [ ] Verified file content with `cat`.

---
**Status:** ✅ Completed
**Lab Category:** Operating Systems / Troubleshooting
**Domain:** CompTIA A+ 1.7, 5.0
