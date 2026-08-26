# Technical Notes

This section contains my own study notes for IT Support, system administration and infrastructure. The notes complement the practical labs: `notes/` explains the concepts and diagnostic logic, while `labs/` documents the hands-on work and evidence.

## Notes map

| Note | Main topics |
|---|---|
| [Active Directory](active-directory.md) | Domains, Domain Controllers, DNS, LDAP, Kerberos, OUs, groups, GPOs and user lifecycle. |
| [Networking](networking.md) | VLANs, access ports, trunks, STP, NAT, IPv6, 802.1X, firewalls and monitoring. |
| [DNS and DHCP](dns-and-dhcp.md) | Name resolution, AD DNS, DHCP, DORA, APIPA and practical checks. |
| [Troubleshooting methodology](troubleshooting-methodology.md) | Scope, evidence, hypotheses, testing, safe remediation and escalation. |
| [Windows and PowerShell](windows-powershell.md) | Support commands, account lockout, GPO troubleshooting, recovery and hardening. |

## How to use these notes

The recommended workflow is **learn → practise → document → verify → explain**. Each note is intentionally concise and focuses on the question that a command or procedure answers. Practical results, screenshots and personal lab observations belong in the corresponding laboratory folder.

These notes are adapted from my own Notion study material and rewritten for this repository. They are not intended to replace official documentation or vendor procedures.

## Study priority

For an entry-level IT Support portfolio, the most useful order is networking and DNS first, followed by Active Directory, Windows/PowerShell and troubleshooting methodology. The [Lab 07 Active Directory case study](../labs/07-windows-server-uefi-gpt-ad-ds/) provides the current practical example connected to these notes.
