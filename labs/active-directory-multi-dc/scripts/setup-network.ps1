# ============================================================
# setup-network.ps1
# Configuración de la red virtual NAT para el laboratorio AD DS
# ============================================================
# Ejecutar como Administrador en el host Windows 11
# Este script crea la red interna que conecta las VMs entre sí
# y les da salida a internet a través del host.
# ============================================================

# PASO 1 — Crear el switch virtual interno
# Crea una red privada llamada NATSwitch, aislada de la red doméstica real
New-VMSwitch -SwitchName "NATSwitch" -SwitchType Internal

# PASO 2 — Asignar la IP del host dentro de esa red
# Windows 11 necesita una IP dentro de la red para comunicarse con las VMs
New-NetIPAddress -IPAddress 10.10.10.1 `
    -PrefixLength 24 `
    -InterfaceAlias "vEthernet (NATSwitch)"

# PASO 3 — Habilitar NAT para que las VMs tengan salida a internet
# Sin esto, las VMs solo se verían entre sí pero no podrían descargar
# actualizaciones ni navegar
New-NetNat -Name "NATNetwork" `
    -InternalIPInterfaceAddressPrefix "10.10.10.0/24"

# ============================================================
# Verificación
# ============================================================

Write-Host "`n=== Verificando switch virtual ===" -ForegroundColor Green
Get-VMSwitch | Format-Table Name, SwitchType -AutoSize

Write-Host "`n=== Verificando IP del host en NATSwitch ===" -ForegroundColor Green
Get-NetIPAddress -InterfaceAlias "vEthernet (NATSwitch)" | Format-Table IPAddress, PrefixLength -AutoSize

Write-Host "`n=== Verificando regla NAT ===" -ForegroundColor Green
Get-NetNat | Format-Table Name, InternalIPInterfaceAddressPrefix -AutoSize

Write-Host "`nRed configurada correctamente. Las VMs deben usar:" -ForegroundColor Cyan
Write-Host "  Gateway:  10.10.10.1"
Write-Host "  DC1 IP:   10.10.10.10"
Write-Host "  MBR1 IP:  10.10.10.20"
Write-Host "  Subred:   10.10.10.0/24"
