# IT Support Labs

Hands-on IT Support practice focused on troubleshooting, Windows, Linux, networking, Active Directory, security and IT service management.

This repository documents practical work through real scenarios, troubleshooting steps, commands, evidence and verification.

## Featured work

| Project | Status | Skills demonstrated | Evidence |
|---|---|---|---|
| [Windows Server UEFI/GPT and Active Directory](labs/windows-server-uefi-gpt-ad-ds/) | Completed | UEFI/GPT troubleshooting, Windows Server 2022, static IP, AD DS, DNS, OUs and users | Commands, screenshots and verification |
| [Active Directory Multi-DC Environment](labs/active-directory-multi-dc/) | In progress | Hyper-V, virtual NAT, Windows Server 2022, AD DS, DNS and Domain Controller promotion | Screenshots, PowerShell artefact and video |
| [Linux Wi-Fi Driver Fix](labs/linux-wifi-driver-fix/) | In progress | Hardware identification, kernel logs, modules and driver troubleshooting | Guided scenario and verification checklist |

**[Browse all labs →](labs/README.md)**

## 🟢 Current Project

### Active Directory — Multi-DC Environment

Currently building a Windows Server 2022 Active Directory environment using Hyper-V. `TAILWIND-DC1` has been promoted as the first Domain Controller of the `tailwindtraders.internal` forest.

The project covers:

- Hyper-V virtualization and virtual NAT networking
- Windows Server 2022 and Active Directory Domain Services (AD DS)
- Multiple Domain Controllers and DNS
- Organizational Units, users and security groups
- Delegation, permissions and security policies
- Troubleshooting, evidence and verification

**[Open current project →](labs/active-directory-multi-dc/)** · **[View the roadmap →](LABS-ROADMAP.md)**

## Skills demonstrated

| Area | Practical focus |
|---|---|
| Windows and Active Directory | Windows Server, UEFI/GPT, PowerShell, AD DS, DNS, OUs, groups, Group Policy and authentication |
| Networking | TCP/IP, DNS, DHCP, NAT, virtual networking, connectivity testing, SSH and firewall checks |
| Linux | Command line, kernel modules, drivers, SSH, system troubleshooting and Active Directory integration |
| Support methodology | Evidence gathering, hypotheses, safe remediation, verification and documentation |
| Security | Least privilege, access control, permissions, endpoint security and firewall configuration |

## Interactive tools

- [IP Subnet Calculator](tools/subnet-calculator/) — IPv4/CIDR calculations and a binary visualiser.
- [RAID Calculator](tools/raid-calculator/) — compares usable capacity and fault tolerance across RAID levels.
- [Linux Permissions Visualizer](tools/linux-permissions-visualizer/) — explores Linux ownership and permission modes.

## How each case study is documented

```text
Identify the problem
        ↓
Gather evidence
        ↓
Form and test a hypothesis
        ↓
Apply a safe fix
        ↓
Verify the result
        ↓
Document the outcome
```

Completed labs include the environment, scenario, observations, commands, root cause, remediation and reproducible verification. In-progress labs clearly distinguish completed work from planned work.

The [lab template](templates/lab-template.md) defines the standard for future case studies. Reference notes and scenario analysis are available in [notes](notes/), [reference](reference/) and [infrastructure-analysis](infrastructure-analysis/).

## Portfolio focus

Target roles: **IT Support · Technical Support · Help Desk · Desktop Support**

Based in Málaga, Spain. The documentation is primarily in English and Spanish, reflecting the working language of each lab.

- [GitHub Profile](https://github.com/anudoranador87)
- [LinkedIn](https://www.linkedin.com/in/joseaparicio87/)
- [Interactive Portfolio](https://anudoranador87.github.io/JoseMaria-Frontend-Portfolio/)

> **Build. Troubleshoot. Verify. Document.**
