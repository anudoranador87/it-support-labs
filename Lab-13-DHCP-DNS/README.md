# Lab 13: DHCP & DNS Configuration — IP Assignment

**CompTIA A+ Domain:** 220-1201, Domains 2.2 - 2.3  
**Level:** Intermediate  
**Time:** 50 minutes  
**Scenario:** A new department is being set up and computers need to automatically receive IP addresses. You also need an internal domain name for the intranet server.

---

## 🎯 Objective

- Understand DHCP scopes, leases, and reservations
- Configure a basic DHCP Server (on Windows Server or a Router)
- Understand DNS A records and CNAME records
- Configure static vs dynamic IPs

---

## 📸 Step-by-Step Walkthrough

### **Step 1: Set Up DHCP Scope**
1. [Open DHCP Management]
2. [Create a new IPv4 Scope (e.g., 192.168.10.100 - 192.168.10.200)]

### **Step 2: IP Reservation**
1. [Find MAC address of a printer or server]
2. [Create a DHCP reservation so it always gets `.100`]

### **Step 3: DNS Records**
1. [Open DNS Management]
2. [Create an 'A' Record for `intranet.hotel.local` pointing to a server IP]
3. [Test from a client PC using `ping intranet.hotel.local`]

---

## ✅ Verification Checklist

- [ ] Client PC successfully pulled an IP from the DHCP scope
- [ ] Reservation applied successfully to the target MAC address
- [ ] Internal DNS name resolves correctly

---

**Author:** José María Aparicio Portillo  
**Status:** 📋 Planned
