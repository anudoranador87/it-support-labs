---
lab: 01
title: Linux Wi-Fi Driver Fix
status: in-progress
area: linux
level: intermediate
evidence: partial practical evidence
---

# Linux Hardware Troubleshooting — Wi-Fi Driver & Kernel Module Fix

[![Status: In Progress](https://img.shields.io/badge/Status-In%20Progress-yellow?style=flat-square&logo=git)](README.md)
[![OS: Linux / Ubuntu](https://img.shields.io/badge/OS-Linux%20%7C%20Ubuntu-E95420?style=flat-square&logo=ubuntu)](README.md)
[![CompTIA A+](https://img.shields.io/badge/CompTIA%20A%2B-220--1201%20Domain%201.6-red?style=flat-square)](README.md)
[![Category: Hardware & Kernel](https://img.shields.io/badge/Category-Hardware%20%26%20Kernel%20Modules-blue?style=flat-square)](README.md)

[🏠 Home](../../README.md) · [📂 All Labs](../README.md) · [📋 Roadmap](../../LABS-ROADMAP.md)

---

> **A practical hands-on Linux support scenario: diagnosing an unrecognized wireless network interface after OS installation, inspecting kernel ring buffer messages (`dmesg`), managing kernel modules (`modprobe`/`lsmod`), and compiling proprietary drivers via DKMS.**

| Field | Detail |
|---|---|
| **CompTIA A+ Objective** | Core 1 (220-1201) Domain 1.6 — Given a scenario, troubleshoot OS & hardware issues |
| **Level** | Intermediate |
| **Target OS** | Ubuntu Desktop / Debian-based distributions |
| **Real Scenario** | Wi-Fi adapter absent from NetworkManager/settings post-update or fresh OS install |
| **Troubleshooting Path** | `lspci` / `lsusb` ➔ `dmesg` ➔ `lsmod` ➔ `dkms` / `apt` ➔ `modprobe` ➔ `ip a` |

## Diagnostic & Remediation Workflow

```mermaid
flowchart TD
    A["Ticket: No Wi-Fi available on Linux"] --> B["Step 1: Hardware Identification\n`lspci -nnk | grep -i net` or `lsusb`"]
    B --> C{"Hardware detected by bus?"}
    C -->|No| D["Hardware issue / loose card / disabled in UEFI/BIOS"]
    C -->|Yes| E["Step 2: Inspect Kernel Ring Buffer\n`dmesg | grep -iE 'firmware|wifi|wlan'`"]
    E --> F{"Firmware missing or driver crash?"}
    F -->|Missing Firmware / Driver| G["Step 3: Establish Alternative Uplink\nUSB Tethering or Ethernet cable"]
    G --> H["Step 4: Install Proprietary Driver / DKMS\n`sudo apt update && sudo apt install bcmwl-kernel-source`"]
    H --> I["Step 5: Reload Kernel Module\n`sudo modprobe -r b43 && sudo modprobe wl`"]
    I --> J["Step 6: Verification & Handshake\n`ip a` + `nmcli dev wifi list`"]
    J --> K["✅ Resolution Documented in Ticket"]

    classDef proc fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0369a1;
    classDef warn fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#92400e;
    classDef success fill:#d1fae5,stroke:#047857,stroke-width:2px,color:#064e3b;
    class B,E,G,H,I proc;
    class C,F warn;
    class J,K success;
```

## 📋 Ticket Details & Scenario

> [!NOTE]
> **Help Desk Ticket #1042:** *"User installed Ubuntu Desktop on an ASUS laptop, but Wi-Fi options are completely missing in system settings. No wireless SSIDs are listed."*

---

## 🔧 Essential Linux Diagnostic Toolkit

| Command | Purpose |
|---------|---------|
| `lspci` | List PCI devices (shows network controllers) |
| `lsusb` | List USB devices |
| `dmesg` | Kernel ring buffer (hardware logs and driver crashes) |
| `lsmod` | Show loaded kernel modules (drivers) |
| `sudo dkms` / `apt` | Install driver packages |

---

## 📸 Step-by-Step Walkthrough

### **Step 1: Identify the Hardware**

1. Run `lspci | grep -i network` to identify the exact model of the WiFi card (e.g., Realtek RTL8821AE or Broadcom BCM43142).
2. Note the chipset name.

### **Step 2: Check for Loaded Modules**

1. Run `lsmod | grep <chipset_name>` (e.g., `lsmod | grep rtl`).
2. If nothing appears, the driver is not loaded.

### **Step 3: Check Kernel Logs for Errors**

1. Run `dmesg | grep -i firmware` or `dmesg | grep -i network`.
2. Look for errors like "Direct firmware load failed". This indicates missing firmware files.

### **Step 4: Install the Missing Driver/Firmware**

*(Note: The exact command depends on the chipset found in Step 1. Below is a common example for Broadcom)*
1. Connect via Ethernet (or USB tethering from phone).
2. Update repositories: `sudo apt update`
3. Install driver: `sudo apt install bcmwl-kernel-source`
4. Reboot or reload module: `sudo modprobe -r b43 && sudo modprobe wl`

### **Step 5: Verify Connectivity**

1. Check if WiFi interfaces appear: `ip a` (look for `wlan0` or similar).
2. Try connecting to a network via the GUI or `nmcli`.

---

## ✅ Verification Checklist

- [ ] Identified network card hardware using `lspci`
- [ ] Searched kernel logs using `dmesg`
- [ ] Understand the concept of kernel modules (`lsmod`)
- [ ] Successfully installed or loaded the correct driver
- [ ] WiFi connection established

---

## 🎓 Key Concepts

**1.6 — OS Troubleshooting**
- Kernel vs User Space
- Kernel Modules (Linux equivalent of Windows drivers)
- Open-source vs Proprietary drivers
- Using alternate connections (USB tethering/Ethernet) to download drivers

---

**Author:** José María Aparicio Portillo  
**Status:** 🔄 In Progress
