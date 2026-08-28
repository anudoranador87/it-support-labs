# Troubleshooting — Problemas y Soluciones

Registro de problemas encontrados durante el laboratorio y cómo se resolvieron. Esta sección es la más valiosa del repositorio para quien lo revise — demuestra capacidad de diagnóstico real.

---

## Problema 1: MBR1 no puede unirse al dominio

**Síntoma**: Al intentar unir TAILWIND-MBR1 al dominio `tailwindtraders.internal`, aparece el error *"The specified domain either does not exist or could not be contacted"*.

**Diagnóstico**:
1. `ping 10.10.10.10` desde MBR1 → ¿Responde? Si no, problema de red (verificar NATSwitch)
2. `nslookup tailwindtraders.internal` desde MBR1 → ¿Resuelve? Si no, el DNS de MBR1 no apunta al DC
3. Verificar configuración DNS de MBR1: `ipconfig /all` → DNS debe ser `10.10.10.10`, NO `1.1.1.1`

**Solución**: Cambiar el DNS primario de MBR1 a 10.10.10.10 (la IP de DC1, que es el servidor DNS del dominio).

**Lección**: Un cliente de dominio necesita poder resolver el nombre del dominio a través de un DNS que conozca ese dominio. Los DNS públicos no conocen dominios privados.

---

## Problema 2: Las VMs no se ven entre sí (ping falla)

**Síntoma**: `ping 10.10.10.20` desde DC1 (o viceversa) no recibe respuesta.

**Diagnóstico**:
1. Verificar que ambas VMs están conectadas al mismo switch: `Get-VMNetworkAdapter -VMName "TAILWIND-DC1"` y `Get-VMNetworkAdapter -VMName "TAILWIND-MBR1"`
2. Verificar IPs: `ipconfig` en cada VM — ¿Están en la misma subred 10.10.10.0/24?
3. Verificar firewall: Windows Server bloquea ping (ICMP) por defecto

**Solución**: Habilitar ICMP en el firewall de Windows Server:
```powershell
New-NetFirewallRule -DisplayName "Allow ICMPv4" -Protocol ICMPv4 -IcmpType 8 -Action Allow
```

**Lección**: Que el ping falle no siempre significa que no hay conectividad — puede ser el firewall bloqueando ICMP. Verificar con otros métodos (SMB, RDP) antes de asumir un problema de red.

---

## Problema 3: Sin salida a internet desde las VMs

**Síntoma**: Las VMs se ven entre sí y al host, pero no pueden navegar ni hacer `ping 8.8.8.8`.

**Diagnóstico**:
1. `ping 10.10.10.1` → ¿Llega al host? Si sí, la red interna funciona
2. `Get-NetNat` en el host → ¿Existe la regla NAT?
3. Verificar gateway de la VM: debe ser `10.10.10.1`

**Solución**: Crear (o recrear) la regla NAT en el host:
```powershell
New-NetNat -Name "NATNetwork" -InternalIPInterfaceAddressPrefix "10.10.10.0/24"
```

**Lección**: Sin NAT, las VMs en una red Internal solo pueden comunicarse entre sí y con el host. El NAT actúa como "traductor" que permite a las VMs usar la conexión a internet del host.

---

## Problema 4: Error al promover MBR1 a DC — "DNS delegation could not be created"

**Síntoma**: Warning durante la promoción de MBR1 a Domain Controller sobre delegación DNS.

**Diagnóstico**: Este warning es informativo, no bloqueante. Aparece porque no hay una zona DNS padre que delegue a la zona del dominio — en un lab aislado esto es normal.

**Solución**: Ignorar el warning y continuar. Verificar tras la promoción que:
- `dcdiag` no muestra errores críticos
- Ambos DCs aparecen en Active Directory Users and Computers → Domain Controllers

**Lección**: No todos los warnings requieren acción. Saber distinguir entre un warning informativo y un error real es una habilidad clave de administración.

---

## Problema 5: La VM arranca muy lenta o se queda sin respuesta

**Síntoma**: Tras encender ambas VMs, el host se vuelve lento o una VM no responde.

**Diagnóstico**:
1. Abrir Task Manager en el host → ¿RAM al 95-100%?
2. Verificar la configuración de memoria de las VMs en Hyper-V Manager

**Solución**: Activar Dynamic Memory si no lo estaba:
1. Apagar la VM
2. Hyper-V Manager → Configuración de la VM → Memoria
3. Marcar "Enable Dynamic Memory"
4. RAM de inicio: 2048 MB, Mínima: 1024 MB, Máxima: 3072 MB

**Lección**: En un equipo con 8-16 GB de RAM, ejecutar dos Windows Server con RAM fija de 4 GB + el host no es viable. Dynamic Memory es esencial para labs en hardware limitado.

---

## Herramientas de diagnóstico útiles

| Comando | Qué hace | Cuándo usarlo |
|---|---|---|
| `ipconfig /all` | Muestra configuración IP completa | Primer paso en cualquier problema de red |
| `ping <IP>` | Verifica conectividad básica | Confirmar comunicación entre VMs |
| `nslookup <dominio>` | Verifica resolución DNS | Problemas de unión al dominio |
| `dcdiag` | Diagnóstico de Domain Controller | Tras promoción o problemas de replicación |
| `Get-VMSwitch` | Lista switches virtuales | Verificar red de Hyper-V |
| `Get-NetNat` | Lista reglas NAT | Problemas de salida a internet |
| `Test-NetConnection <IP> -Port <N>` | Test de conectividad y puerto | Alternativa a ping con más detalle |
| `repadmin /replsummary` | Estado de replicación entre DCs | Problemas de sincronización AD |
