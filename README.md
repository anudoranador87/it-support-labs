# IT Support & Systems Administration Labs

> Practical IT Support and Systems Administration portfolio focused on Windows Server, Active Directory, Hyper-V, Linux, networking and structured troubleshooting.

[![Windows Server](https://img.shields.io/badge/Windows%20Server-2022-0078D6?style=flat-square&logo=windows )](labs/)
[![Active Directory](https://img.shields.io/badge/Active%20Directory-AD%20DS%20%7C%20DNS%20%7C%20GPO-0078D6?style=flat-square )](labs/active-directory-multi-dc/)
[![Hyper-V](https://img.shields.io/badge/Virtualization-Hyper--V-0078D6?style=flat-square&logo=windows )](labs/active-directory-multi-dc/)
[![Linux](https://img.shields.io/badge/Linux-Ubuntu%20%7C%20Troubleshooting-E95420?style=flat-square&logo=ubuntu )](labs/linux-wifi-driver-fix/)
[![PowerShell](https://img.shields.io/badge/Automation-PowerShell%20%7C%20Bash-5391FE?style=flat-square&logo=powershell )](tools/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square )](LICENSE)

---

## About This Repository

This repository documents hands-on IT Support and Systems Administration practice through realistic scenarios, infrastructure labs, technical notes and interactive utilities.

Each project focuses on more than simply applying a fix. The documentation explains:

- The initial situation and symptoms
- The evidence collected
- The technical hypotheses considered
- The investigation and troubleshooting process
- The solution applied
- The verification performed
- The confirmed root cause
- The lessons learned and next steps

The goal is to build a practical and interview-ready portfolio based on executed, verified and documented work.

---

## Featured Labs

### 1. Active Directory Multi-DC Environment

**Status:** In progress — Phases 0–10 completed and verified

A virtualized Windows Server 2022 environment built with Hyper-V and an isolated NAT network.

**Demonstrated skills:**

- Hyper-V Generation 2 virtual machines
- Internal virtual switch and WinNAT
- Static IP configuration
- Active Directory Domain Services
- Integrated DNS
- Domain Controller promotion
- Multi-DC replication
- PowerShell network configuration
- Replication verification with `repadmin`
- Identity management and least-privilege planning

**Current environment:**

- `TAILWIND-DC1` — `10.10.10.10`
- `TAILWIND-MBR1` — `10.10.10.20`
- Domain: `tailwindtraders.internal`
- Network: `10.10.10.0/24`
- Virtual switch: `NATSwitch`
- Replication result: `0 failures`

**Next focus:**

- Organizational Units
- Users and security groups
- Role-based administration
- Fine-Grained Password Policies
- Permission delegation
- Auditing and recovery testing

[Open the Active Directory Multi-DC Lab](labs/active-directory-multi-dc/) · [Español](labs/active-directory-multi-dc/README.es.md)

---

### 2. Windows Server UEFI/GPT and Active Directory

**Status:** Completed

A practical Windows Server and Linux integration project covering boot configuration, storage, networking, Active Directory and domain joining.

**Demonstrated skills:**

- UEFI/GPT troubleshooting
- Windows Server 2022 installation
- Static IP configuration
- Active Directory Domain Services
- DNS configuration
- Group Policy password policies
- Linux domain integration with SSSD
- Technical verification through screenshots, logs and command output

[Open the Windows Server Lab](labs/windows-server-uefi-gpt-ad-ds/)

---

### 3. Linux Wi-Fi Driver and Kernel Troubleshooting

**Status:** In progress

A Linux troubleshooting case focused on identifying wireless hardware, analysing kernel information and resolving driver-related issues.

**Demonstrated skills:**

- Hardware identification with `lspci` and `lsusb`
- Kernel log analysis with `dmesg`
- Kernel module management with `modprobe` and `lsmod`
- DKMS driver compilation
- Device and driver verification
- Step-by-step troubleshooting documentation

[Open the Linux Wi-Fi Driver Lab](labs/linux-wifi-driver-fix/)

---

## Help Desk and Support Projects

Additional projects related to support workflows, endpoint diagnostics and technical operations:

| Project | Description |
|---|---|
| [Help Desk Simulation](https://github.com/anudoranador87/help-desk-simulation ) | Simulated IT Help Desk incidents documented through Jira-style tickets, Hyper-V troubleshooting and technical evidence. |
| [Endpoint Health Toolkit](https://github.com/anudoranador87/endpoint-health-toolkit ) | Read-only Windows and Linux endpoint diagnostics for support-oriented health reports. |
| [Hotel Sentinel](https://github.com/anudoranador87/hotel-sentinel ) | Infrastructure monitoring concept designed for hospitality environments. |

---

## Interactive IT Support Tools

Small browser-based utilities created to support common networking, storage and Linux administration tasks.

| Tool | Description | Live Demo |
|---|---|---|
| **IP Subnet Calculator** | IPv4 CIDR breakdown, network address, broadcast address, usable hosts and binary visualization. | [Launch tool](https://anudoranador87.github.io/it-support-labs/tools/subnet-calculator/ ) |
| **RAID Storage Calculator** | Compares capacity, fault tolerance, performance and parity overhead for common RAID configurations. | [Launch tool](https://anudoranador87.github.io/it-support-labs/tools/raid-calculator/ ) |
| **Linux Permissions Visualizer** | Converts symbolic and octal permissions and generates the corresponding `chmod` command. | [Launch tool](https://anudoranador87.github.io/it-support-labs/tools/linux-permissions-visualizer/ ) |

[Browse all tools](tools/)

---

## Troubleshooting Methodology

Each practical case study follows a structured support lifecycle:

```mermaid
flowchart TD
    A["1. Identify the problem"] --> B["2. Gather symptoms and evidence"]
    B --> C["3. Establish probable causes"]
    C --> D["4. Test the hypotheses"]
    D --> E["5. Plan and apply the correction"]
    E --> F["6. Verify system functionality"]
    F --> G["7. Document root cause and lessons learned"]

