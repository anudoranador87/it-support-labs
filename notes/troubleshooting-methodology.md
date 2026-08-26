# Troubleshooting Methodology

## The support mindset

A technical support case should move from symptom to evidence, hypothesis, test, safe remediation and verification. The goal is not to guess the solution quickly; it is to reduce uncertainty without causing data loss or creating a second incident.

```text
SCOPE → INFORMATION → REPRODUCE → CHECK BASICS → ISOLATE → FIX SAFELY → VERIFY → DOCUMENT → ESCALATE
```

## The S.C.O.P.E. shortcut

| Stage | Question |
|---|---|
| Scope | Who is affected: one user, a department or everyone? |
| Change | What changed recently? |
| Observe | What is the exact error, time and affected device? |
| Probe | Which low-risk test can isolate the failing layer? |
| Escalate or explain | Can I resolve it safely, or do I have evidence for escalation? |

## A practical layer model

Start with the user and device, then move down or up the stack: power and link, local configuration, IP and routing, DNS, ports and firewall, service and application. For example, a service name that fails may be a DNS issue before it is an application issue.

## Evidence by platform

| Question | Windows | Linux |
|---|---|---|
| What identity is active? | `whoami` | `whoami` |
| What network settings exist? | `ipconfig /all` | `ip addr`, `ip route` |
| Does the destination respond? | `ping`, `Test-NetConnection` | `ping`, `nc` |
| Does DNS resolve? | `nslookup`, `Resolve-DnsName` | `nslookup`, `dig` |
| Is a service running? | `Get-Service` | `systemctl status` |
| What do the logs say? | `Get-WinEvent` | `journalctl` |
| Which process uses resources? | `Get-Process` | `top`, `ps` |
| Is storage full? | `Get-Volume` | `df -h`, `du -sh` |

## Safe remediation

Before changing a critical setting, record the original state and consider the impact. Do not kill a process, delete a user, change permissions or disable security controls automatically. Apply the smallest reversible change, test it, and communicate the result to the user.

## Documentation and escalation

A useful ticket includes the user impact, affected asset, exact symptom, start time, scope, tests performed, results, changes made and verification. If escalation is required, provide the evidence rather than only saying that something is broken. The receiving team should be able to continue the investigation without repeating the same basic checks.

## Reusable case format

```text
Symptom:
Scope:
Evidence:
Hypothesis:
Test:
Result:
Root cause:
Resolution:
Verification:
Prevention or follow-up:
```
