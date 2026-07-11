# Lab 01: Hardware Basics — Desktop Inventory & Specs

**CompTIA A+ Domain:** 220-1201, Domain 1.1-1.2 (Hardware Identification)  
**Level:** Beginner  
**Time:** 30 minutes  
**Real hardware:** Desktop PC (i7-8700K, RX 6750 XT, 32GB RAM)

---

## 🎯 Objective

After this lab, you will be able to:
- Identify internal hardware components (CPU, RAM, GPU, PSU, motherboard)
- Read and interpret BIOS/system information
- Document hardware specifications professionally
- Answer CompTIA A+ hardware identification questions

---

## 📋 Scenario

**Help Desk Ticket:** "User needs to know system specs for software compatibility check"

Your job: Physically inspect the machine, document all hardware, report specs clearly.

---

## 🔧 Tools & Methods

| Tool | Purpose |
|------|---------|
| Physical inspection | Identify components visually |
| Windows System Info | OS & RAM details |
| BIOS/UEFI | Motherboard, CPU, boot settings |
| GPU-Z / CPU-Z | Detailed chip information |
| Screenshots | Document evidence |

---

## 📸 Step-by-Step Walkthrough

### **Step 1: Physical Inspection**

Open case. Identify:
- CPU socket type (LGA1151 for i7-8700K)
- RAM slots (DDR4, count)
- GPU (NVIDIA RTX 2060 or AMD RX 6750 XT)
- Storage drives (SSD/HDD)
- Power supply (watts)
- Motherboard model

**Screenshot:** [hardware-inside.png](screenshots/hardware-inside.png)

### **Step 2: BIOS/System Info**

1. Restart → Press DEL/F2 during boot
2. Note:
   - CPU: Intel Core i7-8700K @ 3.70 GHz
   - RAM: 32 GB DDR4
   - Storage: 512 GB SSD + 2 TB HDD

**Screenshot:** [bios-info.png](screenshots/bios-info.png)

### **Step 3: Windows System Properties**

1. Settings → System → About
2. Document:
   - Processor: Intel Core i7-8700K
   - Installed RAM: 32.0 GB
   - System type: 64-bit operating system

**Screenshot:** [system-info.png](screenshots/system-info.png)

### **Step 4: Document Findings**

Create hardware summary:
SYSTEM INVENTORY
Date: 2026-07-11
Technician: José M. A.
CPU:        Intel Core i7-8700K (6 cores, 3.7 GHz)
RAM:        32 GB DDR4 2667 MHz
GPU:        AMD Radeon RX 6750 XT (12 GB VRAM)
Storage:    512 GB NVMe SSD + 2 TB 7200 RPM HDD
PSU:        650W 80+ Gold Certified
Motherboard: ASUS ROG Strix Z370-F Gaming
Network:    Intel Gigabit Ethernet + WiFi 5
Condition:  Good - Clean, no thermal issues
Next steps: None required

---

## ✅ Verification Checklist

- [ ] Identified all major components (CPU, RAM, GPU, storage, PSU)
- [ ] Documented specifications accurately
- [ ] Took clear before/after screenshots
- [ ] Noted condition issues (if any)
- [ ] Can explain each component's purpose
- [ ] Can answer "What's the motherboard model?" quickly

---

## 🎓 Key Concepts (CompTIA A+ Alignment)

**1.1 — Storage Devices**
- HDD vs SSD (speed, capacity, lifespan)
- RAID configurations (not relevant here)
- Connectors: SATA, M.2 NVMe

**1.2 — Motherboards & Processors**
- Socket types (LGA1151 = Intel 8th/9th gen)
- CPU specifications (cores, GHz, TDP)
- Chipset (Z370 = high-end gaming)

**1.3 — RAM & Expansion Cards**
- DDR4 specs (speed, capacity, slots)
- GPU: discrete VRAM + power requirements
- Slot types: PCIe x16

---

## 💡 Lessons Learned

1. **Physical inspection first** — never trust labels
2. **BIOS is the source of truth** — Windows can be wrong
3. **Document everything** — helps with troubleshooting later
4. **Know your specs** — helps diagnose hardware failures

---

## 🔗 Related

- Lab 02: Hardware Diagnosis (next)
- Lab 03: Preventive Maintenance
- CompTIA A+ Domain 1.1-1.5

---

**Author:** José María Aparicio Portillo  
**Created:** July 2026  
**Status:** ✅ Complete
