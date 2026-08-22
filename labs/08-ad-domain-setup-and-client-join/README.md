---
lab: 08
title: Active Directory Client Join and Authentication
status: planned
area: active-directory
level: advanced
evidence: hands-on evidence pending
---

# Lab 08: Active Directory Client Join and Authentication

> **Planned case study for validating domain connectivity, DNS resolution and standard-user authentication from a Windows client.**

## Scenario

This case study extends the [Lab 07 Windows Server and Active Directory setup](../07-windows-server-uefi-gpt-ad-ds/). The goal is to connect a Windows client to the `lab.local` domain, verify that it can locate the domain controller through DNS and test the `LAB\\JoseAparicio` account from a separate client device.

## Lab topology

| Device | Role | Expected configuration |
|---|---|---|
| `WINSERVER-JOSE` | Domain controller and DNS server | `192.168.1.200`, domain `lab.local` |
| Windows client | Domain-joined workstation | Same network, DNS pointing to `192.168.1.200` |
| Test user | Standard domain account | `LAB\\JoseAparicio` |

> **Important:** the client must use the domain controller as its preferred DNS server. A public DNS server should not be configured as the primary resolver for locating an Active Directory domain.

## Validation plan

### 1. Verify client connectivity

The client must be connected to the same physical or virtual network as `WINSERVER-JOSE`. Initial checks will confirm the address, route, reachability and DNS response:

```powershell
ipconfig /all
ping 192.168.1.200
nslookup lab.local 192.168.1.200
```

### 2. Join the domain

The client will be joined to `lab.local` through the Windows system properties or Settings interface. An authorised account will be used to complete the join, followed by a client restart.

### 3. Verify domain membership

After restarting, the following commands will confirm that the client recognises the domain and can locate its domain controller:

```powershell
whoami
systeminfo | findstr /B /C:"Domain"
nltest /dsgetdc:lab.local
```

### 4. Test standard-user authentication

The test will use **Other user** at the Windows sign-in screen and the `LAB\\JoseAparicio` or `JoseAparicio@lab.local` format. The temporary password created in Lab 07 should be changed at first logon, and the user profile should be created successfully.

### 5. Verify from the domain controller

The final checks will confirm that the client appears in the `Computers` container, the user retains standard permissions, the client DNS records are registered and no authentication errors are present in Event Viewer.

## Evidence to collect

This case study will be marked complete after collecting and reviewing:

- Client IP configuration and DNS settings.
- Connectivity and `nslookup` output.
- Successful domain-join confirmation.
- `nltest` domain-controller discovery output.
- Successful standard-user sign-in.
- Client visibility in Active Directory Users and Computers.
- Any troubleshooting steps required during the process.

## Failure modes to investigate

Authentication may fail if the client uses a DNS server that cannot resolve the `lab.local` zone, if the client is on an unreachable subnet, or if the system clock is sufficiently out of sync to affect Kerberos authentication. These conditions will be tested and documented if encountered.

## Completion checklist

- [ ] Client reaches `192.168.1.200`.
- [ ] Preferred DNS points to the domain controller.
- [ ] `nslookup lab.local` responds through the domain-controller DNS.
- [ ] Client joins `lab.local` successfully.
- [ ] `nltest /dsgetdc:lab.local` locates the domain controller.
- [ ] `LAB\\JoseAparicio` signs in from the client.
- [ ] Temporary password is changed.
- [ ] Client appears in Active Directory Users and Computers.
- [ ] Evidence and troubleshooting notes are documented.

## Status

This case study is currently **planned**. It will be linked from the portfolio as completed only after the second-client validation and evidence review are finished.

---

[Back to the IT Support Labs portfolio](../../README.md)
