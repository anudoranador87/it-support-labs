# Windows and PowerShell

## Active Directory account checks

PowerShell can turn a repetitive support task into a consistent check. For a user account, inspect lock status, password state, last logon and group membership before changing anything.

```powershell
Get-ADUser usuario -Properties LockedOut,PasswordExpired,LastLogonDate,MemberOf
Get-ADPrincipalGroupMembership usuario | Select-Object Name
Search-ADAccount -LockedOut | Select-Object Name,LastLogonDate
Unlock-ADAccount -Identity usuario
```

When an account is locked, the useful question is not only how to unlock it but what caused the lockout. Event ID 4740 on the Domain Controller can help identify the originating computer. A stale password on a phone, mapped drive or scheduled task is a common line of investigation.

## GPO troubleshooting

A policy that does not appear to apply can be caused by the wrong OU, link, security filtering, inheritance or client refresh. Use the report to see what was applied and what was filtered.

```powershell
gpupdate /force
gpresult /r
gpresult /h C:\Temp\gpo.html
```

The application order is commonly remembered as LSDOU: Local, Site, Domain and Organizational Unit. Enforced policies and blocked inheritance can change the expected result, so check the actual report rather than relying on assumptions.

## Useful system checks

```powershell
Get-ComputerInfo | Select-Object CsName,OsName,OsVersion
Get-Service Spooler
Restart-Service Spooler
Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name,CPU,WS
Get-WinEvent -FilterHashtable @{LogName='System';Level=1,2} -MaxEvents 20
Get-BitLockerVolume | Select-Object MountPoint,VolumeStatus,ProtectionStatus
```

For a slow computer, identify the process and its purpose before stopping it. For a printer issue, check the Print Spooler service and then verify the print queue. For system corruption, use recovery tools in a controlled order and document the original symptom.

## Onboarding and offboarding

Onboarding should follow authorization, naming, correct OU, role-based groups, first-login password change, equipment inventory and verification. Offboarding should disable the account, revoke sessions, remove sensitive access, recover equipment and update the ticket before any scheduled deletion.

The principle is simple: grant permissions through groups, keep the record, and make the change traceable. Direct permissions on individual users become difficult to audit and maintain.

## Basic workstation hardening

A junior technician should be able to recommend non-admin daily accounts, BitLocker, automatic screen locking, patching, endpoint protection, LAPS, disabled SMBv1, restricted RDP and tested backups. These controls reduce the impact of a compromised or misconfigured endpoint.

## A good support command habit

Before running a command, state the question it answers. After running it, record the result and decide the next test. This turns PowerShell from a list of commands into a repeatable diagnostic method.
