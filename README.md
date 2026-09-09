# 🛠️ IT Support & Systems Engineering Labs

[![CompTIA A+](https://img.shields.io/badge/Certification-CompTIA%20A%2B%20(In%20Prep)-red?style=flat-square&logo=comptia)](LABS-ROADMAP.md)
[![Windows Server](https://img.shields.io/badge/Windows%20Server-2022%20Standard-0078D6?style=flat-square&logo=windows)](labs/active-directory-multi-dc/)
[![Active Directory](https://img.shields.io/badge/Active%20Directory-AD%20DS%20%7C%20DNS%20%7C%20GPO-0078D6?style=flat-square)](labs/active-directory-multi-dc/)
[![Hyper-V](https://img.shields.io/badge/Virtualization-Hyper--V-0078D6?style=flat-square)](labs/active-directory-multi-dc/)
[![Linux](https://img.shields.io/badge/Linux-Ubuntu%20%7C%20Kernel%20%7C%20SSSD-E95420?style=flat-square&logo=ubuntu)](labs/linux-wifi-driver-fix/)
[![PowerShell](https://img.shields.io/badge/Automation-PowerShell%207%20%7C%20Bash-5391FE?style=flat-square&logo=powershell)](tools/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

Hands-on IT Support and Systems Administration practice focused on real-world troubleshooting, Windows Server, Active Directory, Hyper-V virtualization, Linux kernel/network debugging, security policies, and IT service methodology.

This repository documents practical work through real scenarios, step-by-step commands, technical logs, screenshots, and verifiable outcomes.

---

## 🌟 Featured Projects & Labs

| Project | Status | Skills Demonstrated | Evidence & Artifacts |
|---|---|---|---|
| 🪟 **[Windows Server UEFI/GPT & Active Directory](labs/windows-server-uefi-gpt-ad-ds/)** | [![Completed](https://img.shields.io/badge/Completed-2ea44f?style=flat-square)](labs/windows-server-uefi-gpt-ad-ds/) | UEFI/GPT boot repair, Windows Server 2022 dual-boot, static IP, AD DS, DNS zones, GPO password policies, and Linux (SSSD) domain join. | 📸 18+ Screenshots, logs and full verification |
| 🌐 **[Active Directory Multi-DC HA Environment](labs/active-directory-multi-dc/)** | [![In Progress](https://img.shields.io/badge/Phases%200--10%20Done-yellow?style=flat-square)](labs/active-directory-multi-dc/) | Hyper-V virtual NAT networking, PowerShell automation, multi-DC multi-master replication with 0 failures, DNS, and least-privilege delegation. | 🎥 Video, PowerShell scripts, and command evidence |
| 🐧 **[Linux Wi-Fi Driver & Kernel Fix](labs/linux-wifi-driver-fix/)** | [![In Progress](https://img.shields.io/badge/In%20Progress-yellow?style=flat-square)](labs/linux-wifi-driver-fix/) | Hardware bus identification (`lspci`/`lsusb`), kernel ring buffer (`dmesg`), kernel module management (`modprobe`/`lsmod`), and DKMS driver builds. | 📝 Step-by-step guide and verification checklist |

👉 **[Browse All Practical Labs Directory →](labs/README.md)**

---

## 🟢 Current Live Project

### 🏢 [Active Directory — Multi-DC High Availability Environment](labs/active-directory-multi-dc/)

Currently building a Windows Server 2022 Active Directory enterprise environment on Hyper-V. Both `TAILWIND-DC1` and `TAILWIND-MBR1` are deployed and operating with active multi-master replication (0 failures verified via `repadmin /replsummary`).

```mermaid
flowchart LR
    Host["💻 Host Windows 11\n(WinNAT: 10.10.10.1)"] --> Switch["⚡ NATSwitch\n(10.10.10.0/24)"]
    Switch --> DC1["🖥️ TAILWIND-DC1 (10.10.10.10)\nPrimary DC · DNS · Global Catalog"]
    Switch --> MBR1["🖥️ TAILWIND-MBR1 (10.10.10.20)\nReplica DC · DNS · Global Catalog"]
    DC1 <--> |"AD DS Replication (0 fails)"| MBR1
```

* **Environment:** Hyper-V Generation 2 VMs, `10.10.10.0/24` virtual NAT subnet
* **Current Status:** Phases 0 to 10 completed and verified.
* **Next Focus:** Organizational Unit (OU) structure, role-based security groups, Fine-Grained Password Policies (FGPP), and permission delegation.

📖 **[Open Current Lab Documentation →](labs/active-directory-multi-dc/)** · 🗺️ **[View Roadmap & Milestones →](LABS-ROADMAP.md)**

---

## 🧰 Interactive Web Tools (Live on GitHub Pages)

Interactive utilities built to visualize and accelerate everyday IT Support and SysAdmin tasks:

| Tool | Focus & Description | Live Interactive App |
|---|---|---|
| 🌐 **[IP Subnet Calculator](tools/subnet-calculator/)** | Fast IPv4 CIDR breakdown, network/broadcast range, usable host calculation, and binary visualizer. | [🚀 Launch Subnet Tool](https://anudoranador87.github.io/it-support-labs/tools/subnet-calculator/) |
| 🗄️ **[RAID Storage Calculator](tools/raid-calculator/)** | Compares usable capacity, fault tolerance, read/write speed, and parity overhead across RAID 0, 1, 5, 6, 10. | [🚀 Launch RAID Tool](https://anudoranador87.github.io/it-support-labs/tools/raid-calculator/) |
| 🔒 **[Linux Permissions Visualizer](tools/linux-permissions-visualizer/)** | Interactive chmod permissions calculator (octal vs. symbolic `rwx`), special bits (SUID, SGID, Sticky), and command generator. | [🚀 Launch Permissions Tool](https://anudoranador87.github.io/it-support-labs/tools/linux-permissions-visualizer/) |

---

## 🧭 Troubleshooting & Documentation Methodology

Every practical case study follows the standard **CompTIA / ITIL Support Lifecycle**:

```mermaid
flowchart TD
    Step1["1. Identify the Problem\nGather symptoms, question user, duplicate issue"] --> Step2["2. Establish Theory of Probable Cause\nQuestion the obvious, consider multiple factors"]
    Step2 --> Step3["3. Test Theory to Determine Cause\nConfirm hypothesis or escalate/form new theory"]
    Step3 --> Step4["4. Establish Plan of Action & Implement Fix\nDetermine impact, rollback strategy, safe execution"]
    Step4 --> Step5["5. Verify Full System Functionality\nImplement preventive measures, validate with end-user"]
    Step5 --> Step6["6. Document Findings & Root Cause\nActions, outcomes, commands and knowledge base"]

    classDef stage fill:#f8fafc,stroke:#0284c7,stroke-width:1.5px,color:#0f172a;
    class Step1,Step2,Step3,Step4,Step5,Step6 stage;
```

---

## 🎯 Technical Competency Matrix

| Domain | Practical Knowledge & Tools |
|---|---|
| **Windows & Active Directory** | Windows Server 2022, UEFI/GPT boot repair, PowerShell 7, AD DS, DNS Server, GPO, OUs, Security Groups, Kerberos, SSSD integration. |
| **Networking & Protocols** | TCP/IP, IPv4/IPv6, CIDR subnets, DNS resolution (`nslookup`/`dig`), DHCP scopes, NAT switches, Wireshark, firewall rules. |
| **Linux & Systems** | Ubuntu Desktop/Server, Bash scripting, systemd, `dmesg`, `lspci`/`lsusb`, kernel module loading (`modprobe`/`lsmod`), DKMS driver builds, SSH. |
| **Virtualization & Storage** | Hyper-V Manager, Generation 2 VMs, vSwitches (Internal/NAT/External), dynamic disks, RAID configurations (0, 1, 5, 6, 10). |
| **ITSM & Support Best Practices** | CompTIA 6-step troubleshooting methodology, least-privilege security model, ticket triage, clear root-cause analysis, and verification checklists. |

---

## 👤 Portfolio & Contact

Target roles: **IT Support Specialist · Technical Support Engineer · Help Desk L1/L2 · Junior Systems Administrator**

📍 Based in **Málaga, Spain** · Fluent in English & Spanish

* 💼 **LinkedIn:** [linkedin.com/in/joseaparicio87](https://www.linkedin.com/in/joseaparicio87/)
* 💻 **GitHub:** [@anudoranador87](https://github.com/anudoranador87)
* 🌐 **Interactive Portfolio:** [Jose Maria - Portfolio](https://anudoranador87.github.io/JoseMaria-Frontend-Portfolio/)

> **"Build. Troubleshoot. Verify. Document."**

