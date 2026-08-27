<#
.SYNOPSIS
    Collects repeatable network diagnostics for a personal IT Support laboratory.

.DESCRIPTION
    Reviews active network adapters, optional default-gateway reachability, public
    DNS resolution, Active Directory DNS resolution and selected TCP connectivity.
    Results are emitted as PowerShell objects and can optionally be exported to
    JSON or CSV for a sanitized lab report.

.NOTES
    Scope: personal lab and authorized test environments only.
    A failed ICMP or TCP test is an observation, not a final root-cause diagnosis.
    Correlate results with IP configuration, DNS settings, firewall rules and logs.
#>

[CmdletBinding()]
param(
    [string]$DomainName = 'lab.local',

    [string]$PublicDnsName = 'www.microsoft.com',

    [ValidateRange(100, 10000)]
    [int]$TimeoutMs = 1000,

    [ValidateScript({
        if ([string]::IsNullOrWhiteSpace($_)) { return $true }
        $extension = [System.IO.Path]::GetExtension($_)
        if ($extension -notin '.json', '.csv') {
            throw 'ExportPath must end in .json or .csv.'
        }
        return $true
    })]
    [string]$ExportPath,

    [switch]$SkipGatewayTest,

    [switch]$SkipPortTests
)

Set-StrictMode -Version Latest

function New-DiagnosticResult {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$Category,

        [Parameter(Mandatory)]
        [string]$Check,

        [Parameter(Mandatory)]
        [string]$Target,

        [Parameter(Mandatory)]
        [ValidateSet('Pass', 'Fail', 'Warning', 'Skipped', 'Info')]
        [string]$Status,

        [Parameter(Mandatory)]
        [string]$Observation,

        [string]$Details = ''
    )

    [PSCustomObject]@{
        Timestamp   = Get-Date
        Category    = $Category
        Check       = $Check
        Target      = $Target
        Status      = $Status
        Observation = $Observation
        Details     = $Details
    }
}

function Test-TcpPort {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [string]$ComputerName,

        [Parameter(Mandatory)]
        [ValidateRange(1, 65535)]
        [int]$Port,

        [Parameter(Mandatory)]
        [ValidateRange(100, 10000)]
        [int]$TimeoutMs
    )

    $client = [System.Net.Sockets.TcpClient]::new()

    try {
        $asyncResult = $client.BeginConnect($ComputerName, $Port, $null, $null)
        $completed = $asyncResult.AsyncWaitHandle.WaitOne($TimeoutMs, $false)

        if (-not $completed) {
            return [PSCustomObject]@{
                Status      = 'Warning'
                Observation = 'TCP connection timed out. This can indicate filtering, a path issue, or a nonresponsive service.'
                Details     = "No response within $TimeoutMs ms."
            }
        }

        $client.EndConnect($asyncResult)
        return [PSCustomObject]@{
            Status      = 'Pass'
            Observation = 'TCP connection established.'
            Details     = 'The target accepted a TCP connection during this test.'
        }
    }
    catch {
        return [PSCustomObject]@{
            Status      = 'Fail'
            Observation = 'TCP connection was not established.'
            Details     = $_.Exception.Message
        }
    }
    finally {
        $client.Dispose()
    }
}

$results = [System.Collections.Generic.List[object]]::new()

# 1. Active adapters and IP configuration
try {
    $adapters = Get-CimInstance -ClassName Win32_NetworkAdapterConfiguration -Filter 'IPEnabled = True' -ErrorAction Stop
}
catch {
    $results.Add((New-DiagnosticResult -Category 'Adapter' -Check 'Enumerate active adapters' -Target 'Local computer' -Status 'Fail' -Observation 'Unable to collect active adapter configuration.' -Details $_.Exception.Message))
    $adapters = @()
}

if (-not $adapters) {
    $results.Add((New-DiagnosticResult -Category 'Adapter' -Check 'Active IPv4 adapters' -Target 'Local computer' -Status 'Warning' -Observation 'No active IP-enabled adapters were returned by CIM.' -Details 'Review physical connectivity, virtual-switch configuration and adapter state.'))
}
else {
    foreach ($adapter in $adapters) {
        $ipv4Address = @($adapter.IPAddress | Where-Object { $_ -match '^\d{1,3}(\.\d{1,3}){3}$' }) -join ', '
        $dnsServers = @($adapter.DNSServerSearchOrder) -join ', '
        $gateway = @($adapter.DefaultIPGateway | Where-Object { $_ -match '^\d{1,3}(\.\d{1,3}){3}$' }) -join ', '
        $addressMethod = if ($adapter.DHCPEnabled) { 'DHCP' } else { 'Static or manually configured' }

        $results.Add((New-DiagnosticResult -Category 'Adapter' -Check 'Active adapter configuration' -Target $adapter.Description -Status 'Info' -Observation 'Collected local IPv4, gateway and DNS settings.' -Details "IPv4: $ipv4Address | Gateway: $gateway | DNS: $dnsServers | Addressing: $addressMethod"))
    }
}

# 2. Default gateway reachability
if ($SkipGatewayTest) {
    $results.Add((New-DiagnosticResult -Category 'Gateway' -Check 'ICMP reachability' -Target 'Default gateway' -Status 'Skipped' -Observation 'Gateway testing was skipped by parameter.' -Details 'Use without -SkipGatewayTest to run one ICMP probe per unique gateway.'))
}
else {
    $gateways = @($adapters | ForEach-Object { $_.DefaultIPGateway } | Where-Object { $_ -match '^\d{1,3}(\.\d{1,3}){3}$' } | Select-Object -Unique)

    if (-not $gateways) {
        $results.Add((New-DiagnosticResult -Category 'Gateway' -Check 'ICMP reachability' -Target 'Default gateway' -Status 'Skipped' -Observation 'No IPv4 default gateway was configured on active adapters.' -Details 'This can be expected in an isolated network.'))
    }
    else {
        foreach ($gateway in $gateways) {
            try {
                $reply = Test-Connection -ComputerName $gateway -Count 1 -ErrorAction Stop
                $results.Add((New-DiagnosticResult -Category 'Gateway' -Check 'ICMP reachability' -Target $gateway -Status 'Pass' -Observation 'Gateway responded to one ICMP probe.' -Details "Latency: $($reply.ResponseTime) ms"))
            }
            catch {
                $results.Add((New-DiagnosticResult -Category 'Gateway' -Check 'ICMP reachability' -Target $gateway -Status 'Warning' -Observation 'No ICMP response was received. This alone does not identify the cause.' -Details 'Confirm adapter state, addressing, route, local firewall and whether the gateway permits ICMP.'))
            }
        }
    }
}

# 3. Public and Active Directory DNS resolution
$domainRecords = @()
$domainControllerHost = $null

try {
    $publicRecords = Resolve-DnsName -Name $PublicDnsName -Type A -ErrorAction Stop
    $publicAddresses = @($publicRecords | Where-Object { $_.IPAddress } | Select-Object -ExpandProperty IPAddress -Unique) -join ', '
    $results.Add((New-DiagnosticResult -Category 'DNS' -Check 'Public A record resolution' -Target $PublicDnsName -Status 'Pass' -Observation 'Public hostname resolved successfully.' -Details "IPv4: $publicAddresses"))
}
catch {
    $results.Add((New-DiagnosticResult -Category 'DNS' -Check 'Public A record resolution' -Target $PublicDnsName -Status 'Fail' -Observation 'Public hostname did not resolve.' -Details $_.Exception.Message))
}

if ([string]::IsNullOrWhiteSpace($DomainName)) {
    $results.Add((New-DiagnosticResult -Category 'Active Directory DNS' -Check 'Domain resolution' -Target 'Not configured' -Status 'Skipped' -Observation 'No domain name was supplied.' -Details 'Provide -DomainName to test a lab domain.'))
}
else {
    try {
        $domainRecords = Resolve-DnsName -Name $DomainName -Type SOA -ErrorAction Stop
        $primaryServers = @($domainRecords | Where-Object { $_.PrimaryServer } | Select-Object -ExpandProperty PrimaryServer -Unique) -join ', '
        $results.Add((New-DiagnosticResult -Category 'Active Directory DNS' -Check 'Domain SOA resolution' -Target $DomainName -Status 'Pass' -Observation 'The lab DNS zone returned an SOA record.' -Details "Primary DNS server: $primaryServers"))
    }
    catch {
        $results.Add((New-DiagnosticResult -Category 'Active Directory DNS' -Check 'Domain SOA resolution' -Target $DomainName -Status 'Warning' -Observation 'The lab DNS zone did not return an SOA record.' -Details $_.Exception.Message))
    }

    $ldapServiceRecord = "_ldap._tcp.dc._msdcs.$DomainName"
    try {
        $srvRecords = Resolve-DnsName -Name $ldapServiceRecord -Type SRV -ErrorAction Stop
        $srvTargets = @($srvRecords | Where-Object { $_.NameTarget } | Select-Object -ExpandProperty NameTarget -Unique)
        $domainControllerHost = $srvTargets | Select-Object -First 1
        $results.Add((New-DiagnosticResult -Category 'Active Directory DNS' -Check 'LDAP SRV record resolution' -Target $ldapServiceRecord -Status 'Pass' -Observation 'Directory service records resolved successfully.' -Details "Targets: $($srvTargets -join ', ')"))
    }
    catch {
        $results.Add((New-DiagnosticResult -Category 'Active Directory DNS' -Check 'LDAP SRV record resolution' -Target $ldapServiceRecord -Status 'Warning' -Observation 'Directory service records did not resolve.' -Details $_.Exception.Message))
    }
}

# 4. Selected TCP connectivity
if ($SkipPortTests) {
    $results.Add((New-DiagnosticResult -Category 'TCP' -Check 'Selected port connectivity' -Target 'Configured test targets' -Status 'Skipped' -Observation 'TCP tests were skipped by parameter.' -Details 'Use without -SkipPortTests to run the selected connectivity checks.'))
}
else {
    $portTests = @(
        [PSCustomObject]@{ Host = $PublicDnsName; Port = 443; Name = 'Public HTTPS' },
        [PSCustomObject]@{ Host = '127.0.0.1'; Port = 3389; Name = 'Local RDP listener' },
        [PSCustomObject]@{ Host = '127.0.0.1'; Port = 445; Name = 'Local SMB listener' }
    )

    if ($domainControllerHost) {
        $portTests += [PSCustomObject]@{ Host = $domainControllerHost; Port = 53; Name = 'Lab DNS listener' }
        $portTests += [PSCustomObject]@{ Host = $domainControllerHost; Port = 389; Name = 'Lab LDAP listener' }
    }

    foreach ($test in $portTests) {
        $tcpResult = Test-TcpPort -ComputerName $test.Host -Port $test.Port -TimeoutMs $TimeoutMs
        $results.Add((New-DiagnosticResult -Category 'TCP' -Check $test.Name -Target "$($test.Host):$($test.Port)" -Status $tcpResult.Status -Observation $tcpResult.Observation -Details $tcpResult.Details))
    }
}

# Emit structured results to the pipeline.
$results

# Optional export for a sanitized lab report.
if ($ExportPath) {
    $parentPath = Split-Path -Path $ExportPath -Parent
    if ($parentPath -and -not (Test-Path -LiteralPath $parentPath)) {
        New-Item -ItemType Directory -Path $parentPath -Force | Out-Null
    }

    $extension = [System.IO.Path]::GetExtension($ExportPath).ToLowerInvariant()
    if ($extension -eq '.json') {
        $results | ConvertTo-Json -Depth 4 | Set-Content -Path $ExportPath -Encoding UTF8
    }
    elseif ($extension -eq '.csv') {
        $results | Export-Csv -Path $ExportPath -NoTypeInformation -Encoding UTF8
    }

    Write-Verbose "Exported diagnostic results to $ExportPath"
}
