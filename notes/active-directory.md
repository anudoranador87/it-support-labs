# Active Directory

## Purpose

Active Directory Domain Services (AD DS) provides a central directory for identities, computers, groups and policies in a Windows environment. The Domain Controller stores the directory and normally provides the DNS service that clients use to locate domain services.

## Core components

| Component | Meaning |
|---|---|
| Domain | Administrative and security boundary, such as `lab.local`. |
| Domain Controller | Windows Server that hosts AD DS and authenticates domain members. |
| OU | Organizational Unit used to organize users, computers and groups and to apply GPOs. |
| Security group | Identity used to assign access and permissions to several users at once. |
| GPO | Central policy object applied to users or computers according to scope and filtering. |
| DNS | The location service used by clients to find LDAP, Kerberos and other domain services. |

## DNS is part of the AD design

A client can have Internet access and still fail to join the domain if it uses a public DNS resolver instead of the Domain Controller. The client should use the internal AD DNS server as its primary resolver. Useful checks are:

```text
nslookup lab.local
nslookup -type=SRV _ldap._tcp.lab.local
nslookup server.lab.local
```

The SRV query is particularly useful because it verifies that the client can locate the LDAP service of the domain.

## Kerberos and time

Kerberos authenticates users with tickets issued by the Key Distribution Center on the Domain Controller. A client whose clock is significantly out of sync may fail authentication even when DNS and the network appear to work. Check the time before investigating more complex authentication errors.

```powershell
w32tm /query /status
w32tm /resync
klist
```

## OU, groups and permissions

The preferred approach is to assign permissions to groups rather than directly to individual users. Users are placed in the appropriate departmental group, and the group receives access to the required resource. This keeps access easier to audit and change when someone joins, changes role or leaves.

A simple lab structure can separate `Empleados`, `Equipos` and `Grupos`. The OU is the organizational container; the group is the access identity. They solve different problems and should not be treated as interchangeable.

## Group Policy

A GPO may contain user or computer settings. Before troubleshooting a policy, verify its scope, link, security filtering, inheritance and whether the client has refreshed its policy.

```powershell
gpupdate /force
gpresult /r
gpresult /h C:\Temp\gpo.html
```

The practical order for troubleshooting is: confirm the GPO is linked to the correct OU, check that the target object is inside that OU, verify filtering and inheritance, force an update and inspect the resulting report.

## User lifecycle

An onboarding process should create the account in the correct OU, add the user to role-based groups, apply a first-login password change and record the computer assigned to the user. During offboarding, disable the account and revoke access before considering deletion, because deleting an account removes its SID and can destroy the traceability of permissions.

## Lab evidence

The [Lab 07 Active Directory case study](../labs/07-windows-server-uefi-gpt-ad-ds/) demonstrates the relationship between static IP configuration, AD DNS, OUs, groups, GPOs and a Linux client joined to the domain.
