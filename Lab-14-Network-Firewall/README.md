# Lab 14: Network Firewall — Segmentation & Rules

**CompTIA A+ Domain:** 220-1201, Domain 2.4  
**Level:** Advanced  
**Time:** 45 minutes  
**Scenario:** Guest WiFi users are able to see internal hotel servers. You need to segment the network and block this traffic using firewall rules.

---

## 🎯 Objective

- Understand basic network segmentation (VLANs/Subnets)
- Configure Windows Defender Firewall with Advanced Security
- Create Inbound and Outbound rules (Port blocking)
- Test firewall effectiveness

---

## 📸 Step-by-Step Walkthrough

### **Step 1: Network Segmentation Theory**
1. [Explain the difference between Guest Subnet and Internal Subnet]

### **Step 2: Create Firewall Rules**
1. [Open Windows Defender Firewall]
2. [Create an Inbound Rule to Block ICMP (Ping)]
3. [Create a rule to block Port 3389 (RDP) from specific IP ranges]

### **Step 3: Test Rules**
1. [Attempt to Ping the server - should time out]
2. [Attempt to RDP - should fail]

---

## ✅ Verification Checklist

- [ ] Ping is successfully blocked
- [ ] RDP is successfully blocked
- [ ] Understand ports (3389) and protocols (ICMP/TCP/UDP)

---

**Author:** José María Aparicio Portillo  
**Status:** 📋 Planned
