# ==============================================================================
#   QUICK NETWORK DIAGNOSTICS & SYSTEM AUDIT -- POWERSHELL SUPPORT TOOL
#   IT Support Labs -- aligned with CompTIA A+ Core 1
# ==============================================================================
# Description: Evaluates local network configuration, pings gateway, tests DNS
#              (including hotel.local AD checks), pings public WAN, and checks
#              ports (80, 443, 53, 3389, 445).
# ==============================================================================

Clear-Host

Write-Host "==========================================================" -ForegroundColor Gray
Write-Host "     HERRAMIENTA DE DIAGNOSTICO RAPIDO DE RED (PowerShell)" -ForegroundColor Cyan
Write-Host "                  IT SUPPORT PORTFOLIO TOOL" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Gray

# ------------------------------------------------------------------------------
# 1. AUDITORIA DE ADAPTADORES ACTIVOS
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[1] Informacion del Sistema y Adaptadores Activos:" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------" -ForegroundColor DarkGray

# Get OS details
$os = Get-CimInstance Win32_OperatingSystem
Write-Host "Sistema Operativo: $($os.Caption) (Version $($os.Version))" -ForegroundColor Gray

# Get all active network adapters configuration (IPEnabled = True)
$adapters = Get-CimInstance Win32_NetworkAdapterConfiguration -Filter "IPEnabled = True"

if (-not $adapters) {
    Write-Host "[ERROR] No se encontraron adaptadores de red activos con IPv4." -ForegroundColor Red
} else {
    foreach ($adapter in $adapters) {
        Write-Host ""
        Write-Host "Adaptador: $($adapter.Description)" -ForegroundColor Cyan
        Write-Host "   * Direccion IPv4 : $($adapter.IPAddress[0])" -ForegroundColor White
        Write-Host "   * Mascara Subred : $($adapter.IPSubnet[0])" -ForegroundColor White
        
        if ($adapter.DefaultIPGateway) {
            Write-Host "   * Puerta Enlace  : $($adapter.DefaultIPGateway[0])" -ForegroundColor White
        } else {
            Write-Host "   * Puerta Enlace  : No asignada (Red aislada/local)" -ForegroundColor DarkGray
        }
        
        if ($adapter.DNSServerSearchOrder) {
            Write-Host "   * Servidores DNS : $($adapter.DNSServerSearchOrder -join ', ')" -ForegroundColor White
        } else {
            Write-Host "   * Servidores DNS : Ninguno asignado" -ForegroundColor Red
        }
        
        $dhcpStatus = if ($adapter.DHCPEnabled) { "Habilitado (IP Dinamica)" } else { "Deshabilitado (IP Estatica)" }
        Write-Host "   * Asignacion DHCP: $dhcpStatus" -ForegroundColor Gray
    }
}

# ------------------------------------------------------------------------------
# 2. CONEXION LOCAL (PUESTA DE ENLACE / GATEWAY)
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[2] Prueba de Conectividad con la Puerta de Enlace (Gateway):" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------" -ForegroundColor DarkGray

$testedGateways = @()
foreach ($adapter in $adapters) {
    if ($adapter.DefaultIPGateway) {
        foreach ($gw in $adapter.DefaultIPGateway) {
            if ($testedGateways -notcontains $gw) {
                $testedGateways += $gw
                Write-Host "Enviando eco ICMP a $gw..." -ForegroundColor Gray
                $ping = Test-Connection -ComputerName $gw -Count 1 -ErrorAction SilentlyContinue
                if ($ping) {
                    Write-Host "[OK] Conexion con Gateway ($gw) establecida correctamente. Latencia: $($ping.ResponseTime) ms" -ForegroundColor Green
                } else {
                    Write-Host "[ERROR] No hay respuesta del Gateway ($gw). Comprueba cables o configuracion de VirtualBox." -ForegroundColor Red
                }
            }
        }
    }
}

if ($testedGateways.Count -eq 0) {
    Write-Host "[OMITIDO] No hay puertas de enlace configuradas en los adaptadores." -ForegroundColor Yellow
}

# ------------------------------------------------------------------------------
# 3. RESOLUCION DE NOMBRES DNS
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[3] Prueba de Resolucion de Nombres DNS:" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------" -ForegroundColor DarkGray

# 3a. Public DNS resolution
Write-Host "Resolviendo dominio publico (google.com)..." -ForegroundColor Gray
try {
    $publicIps = [System.Net.Dns]::GetHostAddresses("google.com")
    if ($publicIps) {
        $ipStr = $publicIps | ForEach-Object { $_.IPAddressToString }
        Write-Host "[OK] Resolucion DNS Publica: google.com -> $($ipStr[0])" -ForegroundColor Green
    }
} catch {
    Write-Host "[ERROR] DNS: No se pudo resolver 'google.com'." -ForegroundColor Red
}

# 3b. Local AD Domain resolution (Lab 09 checkpoint)
$adIps = $null
Write-Host "Resolviendo dominio de Active Directory local (hotel.local)..." -ForegroundColor Gray
try {
    $adIps = [System.Net.Dns]::GetHostAddresses("hotel.local")
    if ($adIps) {
        $adIpStr = $adIps | ForEach-Object { $_.IPAddressToString }
        Write-Host "[AD] Active Directory Detectado: hotel.local -> $($adIpStr[0])" -ForegroundColor Cyan
    }
} catch {
    Write-Host "[INFO] AD: El dominio local 'hotel.local' no esta resolviendo. (Normal si el lab de Active Directory esta apagado)." -ForegroundColor Yellow
}

# ------------------------------------------------------------------------------
# 4. CONEXION EXTERNA DIRECTA (WAN PING)
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[4] Prueba de Acceso a Internet Directo (Sin DNS):" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------" -ForegroundColor DarkGray

Write-Host "Enviando eco ICMP a DNS publico de Google (8.8.8.8)..." -ForegroundColor Gray
$pingWan = Test-Connection -ComputerName 8.8.8.8 -Count 1 -ErrorAction SilentlyContinue

if ($pingWan) {
    Write-Host "[OK] Conexion con Internet (8.8.8.8) correcta. Latencia: $($pingWan.ResponseTime) ms" -ForegroundColor Green
} else {
    Write-Host "[ERROR] WAN: Sin respuesta de 8.8.8.8. Si el Gateway funciona, esto apunta a un problema del proveedor (ISP) o Firewall." -ForegroundColor Red
}

# ------------------------------------------------------------------------------
# 5. AUDITORIA RAPIDA DE PUERTOS (TCP PORT SOCKETS)
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "[5] Prueba de Puertos y Servicios Clave (IT Support Audit):" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------" -ForegroundColor DarkGray

# Helper function to check TCP connections quickly without blocking the thread
function Test-TcpPort {
    param(
        [string]$ComputerName,
        [int]$Port,
        [int]$TimeoutMs = 1000
    )
    $client = New-Object System.Net.Sockets.TcpClient
    $ar = $client.BeginConnect($ComputerName, $Port, $null, $null)
    $wait = $ar.AsyncWaitHandle.WaitOne($TimeoutMs, $false)
    if (-not $wait) {
        $client.Close()
        return $false
    }
    try {
        $client.EndConnect($ar)
        $client.Close()
        return $true
    } catch {
        $client.Close()
        return $false
    }
}

# Ports list for audit
$portsToTest = @(
    [PSCustomObject]@{ Host = "google.com"; Port = 443; Name = "Navegacion Web Segura (HTTPS)" },
    [PSCustomObject]@{ Host = "google.com"; Port = 80;  Name = "Navegacion Web Standard (HTTP)" },
    [PSCustomObject]@{ Host = "127.0.0.1";  Port = 3389; Name = "Escritorio Remoto (RDP Local)" },
    [PSCustomObject]@{ Host = "127.0.0.1";  Port = 445;  Name = "Comparticion de Archivos (SMB Local)" }
)

# If AD domain resolved, add AD server port checks
if ($adIps) {
    $dcIp = $adIps[0].IPAddressToString
    $portsToTest += [PSCustomObject]@{ Host = $dcIp; Port = 53;  Name = "Servicio DNS AD Controller" }
    $portsToTest += [PSCustomObject]@{ Host = $dcIp; Port = 389; Name = "Protocolo de Acceso LDAP AD" }
}

foreach ($item in $portsToTest) {
    Write-Host "Chequeando $($item.Name) [$($item.Host):$($item.Port)]..." -ForegroundColor Gray
    $portOk = Test-TcpPort -ComputerName $item.Host -Port $item.Port
    if ($portOk) {
        Write-Host "   [ABIERTO / ACTIVO]" -ForegroundColor Green
    } else {
        Write-Host "   [CERRADO / FILTRADO]" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Gray
Write-Host "               DIAGNOSTICO FINALIZADO" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Gray
Write-Host ""
