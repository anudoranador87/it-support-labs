# 🖥️ Lab 04 — Driver Troubleshooting (Real Case)

**Series:** Linux IT Support Fundamentals / Real-World Troubleshooting  
**Environment:** ASUS X550JF — Ubuntu Linux  
**Objective:** Identify, troubleshoot, and permanently fix an intermittent WiFi driver issue.  
**Hardware:** Realtek Semiconductor Co., Ltd. RTL8821AE  
**Status:** 🟡 In progress (Draft / Placeholder content)

---

## Scenario

**Symptom:** WiFi disconnects randomly after boot or when the system has been idle for a few minutes. The user has to manually reconnect or reboot the machine to get internet back.

---

## 🔬 Diagnosis Phase

### Step 1 — Isolate the problem
Test with a mobile hotspot.
- **Result:** Same issue occurs.
- **Conclusion:** The problem is the laptop's network card or driver, not the house router.

### Step 2 — Identify the Hardware
```bash
lspci | grep -i wireless
```
**Output:** `Realtek Semiconductor Co., Ltd. RTL8821AE 802.11ac PCIe Wireless Network Adapter`

### Step 3 — Check Driver Status
```bash
lsmod | grep rtl
```
**Result:** `rtl8821ae` is loaded, but connectivity is unstable.

---

## 🛠️ The Solution

### The Root Cause
The `rtl8821ae` driver has a known bug on Linux: **aggressive power management** puts the card into a low-power state from which it cannot wake up correctly.

### Part A — Temporary Fix (Testing)
Reload the driver module without rebooting:
```bash
sudo modprobe -r rtl8821ae   # Unload
sudo modprobe rtl8821ae      # Reload
```

### Part B — Permanent Fix (Configuration)
Create a configuration file to disable power saving features for this specific driver.

```bash
echo "options rtl8821ae swenc=1 ips=0 swlps=0" | sudo tee /etc/modprobe.d/rtl8821ae.conf
```

| Parameter | Value | Effect |
|-----------|-------|--------|
| `ips=0` | Disabled | Disables "Interruptible Power Save" |
| `swlps=0` | Disabled | Disables "Software Low Power State" |
| `swenc=1` | Enabled | Forces Software Encryption (improves stability) |

---

## 🏁 Validation

After applying the permanent fix and rebooting, the WiFi remains connected for 4+ hours of continuous use and wakes up instantly after system sleep. **Problem solved.**

---

## IT Support Lesson Learned

Hardware troubleshooting follows a logical cycle:
1. **Isolate:** Is it the device or the network?
2. **Identify:** Exactly what model is it? (`lspci`)
3. **Reset:** Does reloading the driver fix it temporarily? (`modprobe`)
4. **Persist:** How do I make this fix stay after a reboot? (`/etc/modprobe.d/`)

---

## Part of

[`it-support-labs`](https://github.com/anudoranador87/it-support-labs) — Google IT Support Certificate + CompTIA A+ preparation.
