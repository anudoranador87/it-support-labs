# IT Support Labs

Hands-on IT Support practice focused on troubleshooting, Windows, Linux, networking, Active Directory, security and IT service management.

This repository documents practical work through **real scenarios, troubleshooting steps, commands, evidence and verification**.

## 🟢 Portfolio

### Lab 07 — Windows Server & Active Directory Environment

The main infrastructure project in this repository.

It documents:

- Windows Server 2022 installation
- UEFI / GPT troubleshooting
- BIOS and boot configuration
- Static IP configuration
- DNS
- Active Directory Domain Services (AD DS)
- Domain Controller configuration
- Organizational Units
- Users and security groups
- Group Policy and password policy
- NTFS permissions
- DNS host records
- Ubuntu integration with Active Directory
- Kerberos / SSSD domain integration
- Troubleshooting and verification

➡️ **[Open Lab 07 →](labs/07-windows-server-uefi-gpt-ad-ds/)**

## 📋 Roadmap

The repository will grow through a small number of practical case studies. New labs will be added only when the work is actually performed and can be documented with evidence.

The supporting [technical notes](notes/) contain my personal study material on Active Directory, networking, DNS, DHCP, troubleshooting, Windows, PowerShell and Python automation.

Next focus areas:

- Windows troubleshooting
- Network troubleshooting
- DNS / DHCP
- Linux troubleshooting
- ITSM / Help Desk

Active Directory tasks will be added to the existing Windows Server project when they logically belong to the same environment, rather than creating unnecessary separate labs.

➡️ **[View the focused roadmap →](LABS-ROADMAP.md)**

## 🔧 Technical Areas

**Windows:** Windows 11, Windows Server, PowerShell, Windows troubleshooting, Windows Update, Windows Firewall

**Networking:** TCP/IP, DNS, DHCP, network connectivity, SSH, ports and firewall rules

**Active Directory:** AD DS, Domain Controllers, DNS integration, users, groups, OUs, Group Policy, NTFS permissions and authentication

**Linux:** Ubuntu, command line, drivers, kernel modules, SSH, system troubleshooting and Active Directory integration

**Security:** Endpoint security, access control, least privilege, permissions, firewall configuration and authentication

## 🛠️ Tools

`PowerShell` · `Command Prompt` · `diskpart` · `ipconfig` · `netsh` · `ping` · `nslookup` · `Rufus` · `Server Manager` · `Active Directory Users and Computers` · `Group Policy Management` · `DNS Manager` · `Ubuntu` · `realmd` · `SSSD`

## 🧰 Reusable Support Tool

### Network Diagnostics — PowerShell

A reusable PowerShell diagnostic tool that collects adapter, gateway, DNS and selected TCP connectivity results as structured objects. It is **refactored and awaiting practical validation in the personal lab** before being presented as completed portfolio evidence.

➡️ **[View tool documentation →](docs/README-network-diagnostics.md)**

## 🔎 Troubleshooting Approach

```text
Identify the problem
        ↓
Gather evidence
        ↓
Form a hypothesis
        ↓
Test the hypothesis
        ↓
Apply the fix
        ↓
Verify the result
        ↓
Document the solution
```

The objective is to document **why the problem occurred, how it was isolated and how the solution was verified**.

## 📁 Repository Structure

```text
it-support-labs/
├── labs/
│   ├── 07-windows-server-uefi-gpt-ad-ds/
│   └── 08-ad-ds-multi-dc-tailwindtraders/  # initial empty structure
├── drafts/
│   └── linux-wifi-driver-fix/
├── tools/
├── infrastructure-analysis/
├── docs/
├── archive/
├── reference/
├── study-notes/
└── templates/
```

The `labs/` directory contains completed case studies and approved empty structures for future hands-on labs. Only completed work is featured in the portfolio section. Unstarted case ideas remain in `drafts/`, while historical material remains in `archive/`.

## 📚 Documentation Standard

Completed case studies are documented with evidence such as:

- Objective
- Environment
- Scenario
- Investigation
- Commands and tools
- Evidence
- Troubleshooting steps
- Root cause
- Fix
- Verification

Only completed work is presented as completed portfolio evidence.

## 🎯 Current Focus

Building practical IT Support experience around:

**Windows → Networking → Active Directory → Security → Troubleshooting → ITSM**

## 🔗 Other Projects

- [GitHub Profile](https://github.com/anudoranador87)
- [LinkedIn](https://www.linkedin.com/in/joseaparicio87/)
- [Interactive Portfolio](https://anudoranador87.github.io/JoseMaria-Frontend-Portfolio/)
- [Development Journey](https://anudoranador87.github.io/Mi-Camino-Web-365/)

## 📍 Málaga, Spain

Target roles: **IT Support · Technical Support · Help Desk · Desktop Support**

> **Build. Troubleshoot. Verify. Document.**
