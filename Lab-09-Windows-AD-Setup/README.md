# Lab 09: Windows Server AD Setup — Domain Creation

**CompTIA A+ Domain:** 220-1201, Domains 1.0 / 2.0  
**Level:** Advanced  
**Time:** 60 minutes  
**Scenario:** A small hotel needs a centralized way to manage employee logins instead of having local accounts on every computer.

---

## 🎯 Objective

- Install Windows Server (e.g., 2019/2022) in a Virtual Machine (VirtualBox)
- Configure static IP networking for the server
- Install the Active Directory Domain Services (AD DS) role
- Promote the server to a Domain Controller (DC)
- Create a new forest/domain (e.g., `hotel.local`)

---

## 📸 Step-by-Step Walkthrough

### **Step 1: VM Setup & Installation**
1. [Explain how to install the ISO on VirtualBox]
2. [Set a static IP in Windows Server Network Settings]

### **Step 2: Add Roles and Features**
1. [Open Server Manager]
2. [Add AD DS and DNS roles]

### **Step 3: Promote to Domain Controller**
1. [Run the promotion wizard]
2. [Set DSRM password and reboot]

---

## ✅ Verification Checklist

- [ ] Windows Server boots and logs into the domain (e.g., `HOTEL\Administrator`)
- [ ] Active Directory Users and Computers (ADUC) tool is available
- [ ] Server has a static IP address configured

---

**Author:** José María Aparicio Portillo  
**Status:** 📋 Planned
