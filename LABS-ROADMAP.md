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

HD-1 is the **first case in a planned series**, not a standalone help-desk project. New scenarios will remain planned until they have been executed, verified and documented.

- ✅ **[HD-1: Website access failure — DNS misconfiguration](labs/01-dns-misconfiguration/):** Documents a simulated L1 case separating IP connectivity from DNS resolution, correcting the resolver and validating recovery.
- 🗓️ **HD-002: No Internet connection** — isolate local IP, DHCP, gateway and upstream connectivity.
- 🗓️ **HD-003: Printer appears offline** — inspect device state, print queue, spooler and connectivity.
- 🗓️ **HD-004: Low disk space** — identify disk usage, assess safe cleanup and verify free space.
- 🗓️ **HD-005: Shared-folder access denied** — distinguish share permissions from NTFS permissions and apply least privilege.
- 🗓️ **HD-006: Password reset request** — practise identity verification, secure handling and user communication.

**Series hub:** [Help Desk Simulation](https://github.com/anudoranador87/help-desk-simulation), where individual ticket records and evidence will be maintained.

### Windows Troubleshooting

Add further Windows client incidents after they are executed and documented, prioritising Event Viewer, services, updates and application troubleshooting where the evidence supports the diagnosis.

### Linux Troubleshooting

Continue the Linux Wi-Fi investigation with reproducible hardware discovery, kernel/module evidence, and a verified outcome. Do not mark chipset-specific fixes complete until tested.

## Active Directory Direction

The current Active Directory environment will continue to be extended as additional practical tasks are performed. Related AD work will remain part of the existing infrastructure project when it logically belongs to the same environment.

## Portfolio Rule

A project is marked **Completed** only when it has been executed, verified and documented with sufficient evidence to explain the work in an interview.

> The portfolio grows from completed practical work — not from a target number of labs.

**Study focus:** CCNA preparation alongside practical IT Support and Windows/Linux troubleshooting labs.
