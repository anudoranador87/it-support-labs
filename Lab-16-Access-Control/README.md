# Lab 16: Access Control — Roles & Best Practices

**CompTIA A+ Domain:** 220-1201, Domains 3.2 - 3.4  
**Level:** Intermediate  
**Time:** 40 minutes  
**Scenario:** The hotel was audited, and several receptionists were found to have local Administrator rights on their PCs. You need to revoke these rights and implement the Principle of Least Privilege.

---

## 🎯 Objective

- Implement Principle of Least Privilege (PoLP)
- Manage Local Users and Groups in Windows (`lusrmgr.msc`)
- Set up a strong password policy
- Understand User Account Control (UAC)

---

## 📸 Step-by-Step Walkthrough

### **Step 1: Audit Local Administrators**
1. [Run `lusrmgr.msc` and check the 'Administrators' group]
2. [Remove unauthorized standard users from the group]

### **Step 2: Password Policies**
1. [Open Local Security Policy (`secpol.msc`)]
2. [Set Minimum Password Length to 12 characters]
3. [Set Password Complexity requirements]

### **Step 3: Test UAC**
1. [Log in as a standard user]
2. [Try to install software — verify that an Admin prompt appears]

---

## ✅ Verification Checklist

- [ ] Unnecessary users removed from Admin group
- [ ] Password policy applied
- [ ] Standard user cannot bypass UAC without admin credentials

---

**Author:** José María Aparicio Portillo  
**Status:** 📋 Planned
