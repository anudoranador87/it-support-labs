# 🔧 IT Support Labs — CompTIA A+ Hands-On Troubleshooting

**Hands-on IT Support study repository focused on troubleshooting, Windows, Linux, networking and systems administration fundamentals.**

## 🎯 Portfolio objective

Build practical evidence for **IT Support, Help Desk, Desktop Support and Technical Support** roles while preparing for CompTIA A+ Core 1 and Core 2.

The working method is:

**Scenario → Symptoms → Investigation → Root Cause → Fix → Verification → Lessons Learned**

> **Important:** A planned lab is not presented as demonstrated experience. A skill moves to "demonstrated" only after the lab has actually been completed and documented.

## 📊 Current status

| Status | Meaning |
|---|---|
| 🟢 Completed | Lab executed and documented with practical evidence |
| 🟡 In progress | Work has started but is not complete |
| 🔴 Planned | Scenario/structure exists, but the lab has not been completed |
| ⚪ Legacy | Earlier study material kept for reference |

### Current core labs

| Lab | Scenario | Status |
|---|---|---|
| [Lab 01](CORE-LABS/Lab-01-Linux-WiFi-Driver-Fix) | Ubuntu Wi-Fi driver troubleshooting | 🟡 In progress |
| [Lab 02](CORE-LABS/Lab-02-SSH-Windows-to-Ubuntu) | Windows → Ubuntu SSH | 🔴 Planned |
| [Lab 03](CORE-LABS/Lab-03-Python-System-Health-Checker) | Python system health checker | 🔴 Planned |
| [Lab 04](CORE-LABS/Lab-04-Windows-Update-Failure-Diagnosis) | Windows Update failure | 🔴 Planned |
| [Lab 05](CORE-LABS/Lab-05-AD-Offline-Logon-Cache-Issue) | AD offline logon issue | 🔴 Planned |
| [Lab 06](CORE-LABS/Lab-06-DNS-Resolution-Poisoning-Debug) | DNS resolution troubleshooting | 🔴 Planned |
| [Lab 07](CORE-LABS/Lab-07-Windows-Server-UEFI-GPT-Deployment) | Windows Server UEFI/GPT + Active Directory | 🟢 Completed |

Labs 01–06 remain subject to their existing status. Lab 07 is marked completed because the installation, troubleshooting process, AD DS deployment and visual evidence are documented in full.

## 🗂️ Existing practical / legacy work

Earlier hands-on material is retained under [`legacy-labs/`](legacy-labs/) rather than being mixed with the new core-lab progression. This includes hardware, system-information and Linux study work. It represents previous practice and is separate from the current A+ lab roadmap.

## 🗺️ Priority roadmap

### 🔴 Phase 1 — Core IT Support

1. Linux Wi-Fi Driver Fix — finish
2. SSH Windows → Ubuntu
3. Python System Health Checker
4. Windows Update Failure Diagnosis
5. AD Offline Logon Cache Issue
6. DNS Resolution Debug
7. Windows Server UEFI/GPT Deployment + AD DS
8. AD Users, Groups & OU Management
9. GPO Troubleshooting
10. NTFS + Shared Permissions
11. DHCP Failure & APIPA Troubleshooting
12. Windows Network Troubleshooting
13. Windows Firewall Troubleshooting
14. Windows Defender / Malware Incident
15. Account Lockout Investigation

### 🟠 Phase 2 — Automation & ITSM

16. PowerShell IT Support Toolkit
17. ITSM / Help Desk Ticket Simulation

### 🟡 Phase 3 — After A+

18. Microsoft 365 Support
19. Entra ID Fundamentals
20. Intune / Endpoint Management

## 🎫 ITSM ticket format

Future ticket simulations will use a repeatable support workflow:

```text
Ticket ID
User / Device
Category
Priority
Reported issue
Impact
Initial checks
Investigation
Root cause
Resolution
Verification
User communication
Status
Knowledge-base reference
```

This connects the technical lab work to the workflow used in Help Desk and Service Desk environments.

## 🧪 Lab quality standard

Every portfolio-ready lab should contain:

```text
Scenario
Objective
Environment
Symptoms
Investigation
Commands / Tools
Evidence
Root Cause
Fix
Verification
Lessons Learned
Screenshots / Evidence
```

## 🧰 Technical areas being studied

### Operating systems
- Windows 11
- Windows Server fundamentals
- Ubuntu / Linux
- Services and processes
- Drivers and updates

### Networking
- TCP/IP
- DNS
- DHCP
- SSH
- Connectivity troubleshooting
- Windows Firewall

### Identity & access
- Active Directory
- Users and groups
- OUs
- Group Policy
- NTFS permissions
- Account lockout

### Automation
- Python
- PowerShell

### IT Support process
- Incident troubleshooting
- Root-cause analysis
- Verification
- Documentation
- Ticketing / ITSM

These are **study/roadmap areas unless supported by a completed lab**.

## 🧮 Interactive tools

- [RAID Calculator](tools/raid-calculator/) — visual RAID capacity and fault tolerance
- [Subnet Calculator](tools/subnet-calculator/) — IPv4 CIDR network/host breakdown

## 📚 Study materials

- [CompTIA A+ Reference](reference/comptia-a-plus-core-1/)
- [Exam Checklist](reference/comptia-a-plus-core-1/00-exam-checklist.md)
- [Weak Areas Analysis](study-notes/weak-areas.md)
- [Labs Roadmap](LABS-ROADMAP.md)
- [Infrastructure Analysis](infrastructure-analysis/README.md)

## 👨‍💻 About

**José María Aparicio Portillo**

Transitioning into IT Support with 8+ years of hospitality operations experience in Málaga and the UK. Practical work is being documented here alongside CompTIA A+ preparation.

- GitHub: [@anudoranador87](https://github.com/anudoranador87)
- Frontend work: LostDesk, Campus & Crema and other projects
- Learning diary: [Mi Camino Web 365](https://anudoranador87.github.io/Mi-Camino-Web-365/)

## 🎓 Certification goal

**CompTIA A+ Core 1 + Core 2 — October 2026**

The labs reinforce certification objectives through practical scenarios; they are not a replacement for exam preparation.

**Last updated:** August 2026
