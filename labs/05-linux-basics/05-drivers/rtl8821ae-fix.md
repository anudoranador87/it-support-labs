# 05 — Real Case: Intermittent WiFi — Realtek RTL8821AE

**Machine:** ASUS X550JF  
**OS:** Ubuntu Linux  
**Symptom:** WiFi disconnects randomly after boot  

---

## Diagnosis

### Step 1 — Rule out the router
Tethered phone as mobile hotspot and tested connectivity.  
**Result:** same issue → fault is in the PC's hardware/driver, not the router.

### Step 2 — Identify the network card
```bash
lspci | grep -i wireless
# Realtek Semiconductor Co., Ltd. RTL8821AE 802.11ac PCIe Wireless Network Adapter
```

### Step 3 — Check driver status
```bash
nmcli device status
# wlp3s0   wifi   disconnected
```

### Step 4 — Check kernel module
```bash
lsmod | grep rtl
# rtl8821ae  ...
```

---

## Root Cause

The `rtl8821ae` driver has a known bug on Linux:  
**aggressive power management** puts the card into low-power mode and it doesn't always wake up correctly.

---

## Temporary Fix (no reboot needed)

Reload the driver module:

```bash
sudo modprobe -r rtl8821ae   # unload driver
sudo modprobe rtl8821ae      # reload clean
nmcli device wifi connect "YOUR_SSID" password "YOUR_PASSWORD"
```

---

## Permanent Fix

Create a config file that disables the driver's power management on every boot:

```bash
echo "options rtl8821ae swenc=1 ips=0 swlps=0" | sudo tee /etc/modprobe.d/rtl8821ae.conf
```

### Parameters explained

| Parameter | Value | Effect |
|-----------|-------|--------|
| `ips` | 0 | Disables interface power saving |
| `swlps` | 0 | Disables software low power state |
| `swenc` | 1 | Forces software encryption (more stable) |

This file is applied automatically on every boot.

---

## Verified

Fix confirmed working after full reboot — WiFi connected automatically without any manual intervention.

---

## Lesson Learned

Driver troubleshooting follows the same process as any hardware fault:
1. Isolate the problem (driver vs network?)
2. Identify the component (`lspci`)
3. Restart the component (`modprobe`)
4. Apply permanent fix if issue is recurring (`/etc/modprobe.d/`)
