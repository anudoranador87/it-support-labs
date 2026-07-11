# Lab 12: Network Connectivity — Ping, Trace, DNS

**CompTIA A+ Domain:** 220-1201, Domains 2.1 - 2.3  
**Level:** Beginner  
**Time:** 45 minutes  
**Scenario:** A user reports they can access local intranet sites but cannot reach the internet.

---

## 🎯 Objective

- Use basic command-line network tools in Windows (`ipconfig`, `ping`, `tracert`, `nslookup`)
- Understand how to isolate a network fault (local vs gateway vs ISP vs DNS)
- Read and interpret command outputs

---

## 📸 Step-by-Step Walkthrough

### **Step 1: Check Local Config**
1. [Run `ipconfig /all`]
2. [Verify IP, Subnet Mask, Default Gateway, and DNS Servers]

### **Step 2: Ping Tests (Isolation)**
1. [Ping loopback 127.0.0.1]
2. [Ping Default Gateway]
3. [Ping 8.8.8.8]

### **Step 3: DNS and Trace**
1. [Run `nslookup google.com` to test DNS resolution]
2. [Run `tracert 8.8.8.8` to see where the connection drops]

---

## ✅ Verification Checklist

- [ ] Successfully found IP and Gateway
- [ ] Understand the 4-step ping isolation method
- [ ] Can identify if an issue is DNS-related or routing-related

---

**Author:** José María Aparicio Portillo  
**Status:** 📋 Planned
