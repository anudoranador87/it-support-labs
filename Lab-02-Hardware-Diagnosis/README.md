# Lab 02: Hardware Diagnosis — USB Controller Troubleshooting

**CompTIA A+ Domain:** 220-1201, Domain 1.3-1.4 (Hardware Troubleshooting)  
**Level:** Intermediate  
**Time:** 45 minutes  
**Real scenario:** USB ports stopped working on desktop tower

---

## 🎯 Objective

After this lab, you will be able to:
- Diagnose hardware failures using system tools
- Identify USB controller issues
- Use Device Manager to troubleshoot
- Document and fix hardware problems

---

## 📋 Scenario

**Help Desk Ticket:** "Three USB ports on back of tower aren't recognized. Keyboard/mouse still work from front."

Your job: Diagnose the issue (hardware failure vs driver) and recommend solution.

---

## 🔧 Tools & Methods

| Tool | Purpose |
|------|---------|
| Device Manager | View USB devices & errors |
| BIOS/UEFI | Check if ports disabled |
| System Event Viewer | Check hardware error logs |
| USB testing | Test with different devices |
| Documentation | Screenshot errors |

---

## 📸 Step-by-Step Walkthrough

### **Step 1: Test USB Ports**

1. Try multiple USB devices (keyboard, mouse, flash drive)
2. Test front AND back ports
3. Record which work, which don't

**Result:** Back ports dead, front ports work

### **Step 2: Check Device Manager**

1. Right-click Start → Device Manager
2. Expand "Universal Serial Bus controllers"
3. Look for yellow warning triangles (error)

**Finding:** USB controller marked with "!"

### **Step 3: Check BIOS Settings**

1. Restart → F2/DEL during boot
2. Look for USB settings
3. Check if port is disabled

**Finding:** Port not disabled in BIOS

### **Step 4: Check Event Viewer**

1. Event Viewer → Windows Logs → System
2. Look for USB device errors
3. Note error codes

**Finding:** Error 43 = device failure

### **Step 5: Diagnose Conclusion**

Based on evidence:
- USB controller hardware failure (not driver)
- Recommendation: Replace motherboard or add PCIe USB card

---

## ✅ Verification Checklist

- [ ] Tested multiple USB devices
- [ ] Checked Device Manager for errors
- [ ] Reviewed BIOS settings
- [ ] Examined Event Viewer logs
- [ ] Can explain what error 43 means
- [ ] Can recommend hardware solution

---

## 🎓 Key Concepts

**1.3 — Storage Devices & Connectors**
- USB standards (USB 2.0, 3.0, 3.1, Type-C)
- Port vs controller failures
- Hot-swappable devices

**1.4 — Motherboards & BIOS**
- BIOS settings for USB
- Hardware vs driver issues
- Error codes (43 = USB device failure)

---

## 💡 Lessons Learned

1. **Front vs back ports** = different controllers
2. **Device Manager warnings** = hardware problem (not driver)
3. **BIOS settings** can disable ports (always check)
4. **Event Viewer** tells the truth about hardware

---

**Author:** José María Aparicio Portillo  
**Status:** ✅ Complete
