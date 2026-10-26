# IT Support Labs Roadmap

This roadmap keeps the portfolio focused on practical IT Support skills rather than a fixed number of labs.

## 🟢 Current Work

| Project | Status |
|---|---|
| Active Directory — Multi-DC Environment | 🟢 In progress (Phases 0–10 done) |
| Incident HD-1 — DNS Misconfiguration | ✅ Completed |
| CCNA 200-301 Packet Tracer | 🟢 In progress (Labs 01, 02, 04 & 05 done; Lab 03 in progress) |

The current Active Directory project extends the Windows Server and Active Directory work into a virtualized multi-DC environment using Hyper-V.

Current work completed includes:

- Host requirements verification
- Hyper-V installation and storage configuration
- Virtual NAT networking and PowerShell configuration
- Windows Server 2022 virtual machines (`TAILWIND-DC1` and `TAILWIND-MBR1`)
- Active Directory Domain Services and DNS deployment
- First Domain Controller promoted for `tailwindtraders.internal`
- Replica Domain Controller promoted (`TAILWIND-MBR1`) with multi-master replication verified (0 fails)

Next milestones for this project are identity management, organizational units (OUs), security groups, and least-privilege delegation.

## Next Focus Areas

The practical case studies are created as the work is executed and documented with evidence.

### Network Troubleshooting & ITSM / Help Desk

- ✅ **[HD-1: Unable to Access Websites (DNS Misconfiguration)](labs/01-dns-misconfiguration/):** Completed realistic L1 support case covering symptom diagnosis, distinguishing IP connectivity from DNS resolution, remediation via `netsh`/`ipconfig /flushdns`, and documentation.
- Further realistic network and ticketing scenarios covering DHCP lease issues, gateway misconfigurations, and multi-tier escalation will follow.

### Windows Troubleshooting

A realistic Windows support case covering diagnosis, commands, system evidence, remediation and verification.

### Linux Troubleshooting

A Linux support scenario documented from problem identification through verification.

## Active Directory Direction

The current Active Directory environment will continue to be extended as additional practical tasks are performed. Related AD work will remain part of the existing infrastructure project when it logically belongs to the same environment.

## Portfolio Rule

A project is marked **Completed** only when it has been executed, verified and documented with sufficient evidence to explain the work in an interview.

> The portfolio grows from completed practical work — not from a target number of labs.

**Study focus:** CompTIA A+ Core 1 and Core 2 — October 2026.
