# Lab 11: GPO & NTFS Permissions — Shares & Policies

**CompTIA A+ Domain:** 220-1201, Domain 3.0 (Security)  
**Level:** Advanced  
**Time:** 60 minutes  
**Scenario:** Management wants a shared folder for Reception that other departments can't access. Also, receptionists shouldn't be able to access the Control Panel.

---

## 🎯 Objective

- Understand NTFS File and Folder Permissions (Security Tab)
- Share a folder over the network (Sharing Tab)
- Map a network drive automatically using Group Policy (GPO)
- Restrict Windows features (Control Panel) using GPO

---

## 📸 Step-by-Step Walkthrough

### **Step 1: Folder Sharing & NTFS**
1. [Create `C:\Shared\Reception`]
2. [Set NTFS permissions to only allow the 'Receptionists' group]
3. [Share the folder on the network]

### **Step 2: Group Policy Management**
1. [Open Group Policy Management Console]
2. [Create a GPO linked to the Reception OU]

### **Step 3: Restrict Control Panel**
1. [Navigate to User Configuration > Administrative Templates > Control Panel]
2. [Enable 'Prohibit access to Control Panel and PC settings']

---

## ✅ Verification Checklist

- [ ] Folder is accessible by Reception users but denied to others
- [ ] Group Policy applied successfully (Control Panel is blocked for those users)
- [ ] Understand the difference between Share permissions and NTFS permissions

---

**Author:** José María Aparicio Portillo  
**Status:** 📋 Planned
