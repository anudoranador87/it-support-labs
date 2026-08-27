# Network Diagnostics Support Tool

> **Status: refactored, not yet executed in the current lab.** The script must be tested and its real results reviewed before it is presented as completed portfolio evidence.

## Purpose

[`check_network.ps1`](check_network.ps1) collects repeatable network-diagnostic observations for a personal IT Support lab. It checks active network-adapter configuration, optional default-gateway reachability, public DNS resolution, the lab DNS zone through an SOA record, Active Directory LDAP SRV records and selected TCP connectivity.

The tool returns `PSCustomObject` results to the PowerShell pipeline. This makes it possible to review results on screen or export a sanitized JSON/CSV report for a lab ticket or evidence record.

## Scope and safety

This tool is for a personal lab or an environment where you have explicit authorization to perform diagnostics. Do not use it against a workplace, customer or production Active Directory environment without approval. Do not commit reports that contain credentials, secrets, personal paths, Wi-Fi names, non-lab IP addresses or unrelated machine details.

A failed ICMP or TCP test is an **observation**, not a final diagnosis. A failed ping may occur because ICMP is intentionally blocked; a TCP timeout may result from filtering, routing, a nonresponsive service or another network condition. Confirm the finding with configuration, DNS, firewall and log evidence.

## Requirements

| Requirement | Detail |
|---|---|
| Operating system | Windows, because the script queries Windows network configuration through CIM. |
| Shell | Windows PowerShell 5.1 or PowerShell 7 with Windows CIM support. |
| Permissions | Standard user permissions are normally sufficient for collection; individual environment policies may differ. |
| Network scope | Local machine, configured default gateway, a public hostname and an optional personal lab AD domain. |

## Parameters

| Parameter | Default | Purpose |
|---|---|---|
| `DomainName` | `lab.local` | Private lab domain whose DNS zone and LDAP SRV records will be tested. |
| `PublicDnsName` | `www.microsoft.com` | Public hostname for a DNS check and optional HTTPS test. |
| `TimeoutMs` | `1000` | Timeout in milliseconds for each TCP connection attempt. |
| `ExportPath` | Not set | Optional path ending in `.json` or `.csv` for exported results. |
| `SkipGatewayTest` | Not set | Skips ICMP probes to detected default gateways. |
| `SkipPortTests` | Not set | Skips TCP connection tests. |

## Intended use

The following commands show how the tool is meant to be used. They are examples only; no execution result is claimed in this document.

```powershell
# Show structured results for the existing lab domain.
.\check_network.ps1

# Use the future Tailwind Traders lab domain without changing code.
.\check_network.ps1 -DomainName 'tailwindtraders.internal'

# Produce a JSON report after reviewing its contents for sanitization.
.\check_network.ps1 -DomainName 'lab.local' -ExportPath '.\outputs\network-report.json'

# Run DNS and adapter checks only.
.\check_network.ps1 -SkipGatewayTest -SkipPortTests
```

## Result fields

| Field | Meaning |
|---|---|
| `Timestamp` | Time at which the result was created. |
| `Category` | Adapter, Gateway, DNS, Active Directory DNS or TCP. |
| `Check` | Individual diagnostic operation. |
| `Target` | Adapter, hostname, address or host:port tested. |
| `Status` | `Pass`, `Fail`, `Warning`, `Skipped` or `Info`. |
| `Observation` | Factual outcome of the check. |
| `Details` | Supporting output or context for the observation. |

## Validation checklist

Do not label the tool as completed portfolio evidence until these checks have been performed in your own lab and their output has been reviewed:

- [ ] Default execution returns adapter and DNS objects without errors.
- [ ] An absent or nonresponsive gateway produces a warning without terminating the tool.
- [ ] A stopped or unavailable lab domain produces a useful warning and preserves the remaining results.
- [ ] A working lab DNS zone resolves through both SOA and LDAP SRV queries.
- [ ] JSON or CSV export works and is sanitized before publication.
- [ ] The README is updated with real evidence only after the checks have been performed.

## Related resources

- [Main IT Support Labs portfolio](../README.md)
- [PowerShell study notes](../notes/windows-powershell.md)
