# Labs Roadmap

Este roadmap organiza el portfolio por una progresión práctica de soporte técnico, sistemas, redes, seguridad y operaciones. El número y la ruta de cada laboratorio son permanentes; el estado se actualiza en sus metadatos y en este índice.

## Estados

| Estado | Significado |
|---|---|
| ✅ Completed | Ejecutado, verificado y documentado con evidencia. |
| 🟡 In progress | Trabajo iniciado con validación todavía pendiente. |
| 🔴 Planned | Escenario preparado, aún no presentado como práctica completada. |
| ⚪ Legacy | Material histórico conservado en `archive/legacy-labs/`. |

## Labs 01–16

| Lab | Título | Estado | Ubicación |
|---:|---|---|---|
| 01 | Linux Wi-Fi Driver Fix | 🟡 In progress | [`labs/01-linux-wifi-driver-fix/`](labs/01-linux-wifi-driver-fix/) |
| 02 | Windows → Ubuntu SSH | 🔴 Planned | [`labs/02-ssh-windows-to-ubuntu/`](labs/02-ssh-windows-to-ubuntu/) |
| 03 | Python System Health Checker | 🔴 Planned | [`labs/03-python-system-health-checker/`](labs/03-python-system-health-checker/) |
| 04 | Windows Update Failure Diagnosis | 🔴 Planned | [`labs/04-windows-update-failure-diagnosis/`](labs/04-windows-update-failure-diagnosis/) |
| 05 | Active Directory Offline Logon Cache Issue | 🔴 Planned | [`labs/05-ad-offline-logon-cache-issue/`](labs/05-ad-offline-logon-cache-issue/) |
| 06 | DNS Resolution Troubleshooting | 🔴 Planned | [`labs/06-dns-resolution-debug/`](labs/06-dns-resolution-debug/) |
| 07 | Windows Server UEFI/GPT + Active Directory | ✅ Completed | [`labs/07-windows-server-uefi-gpt-ad-ds/`](labs/07-windows-server-uefi-gpt-ad-ds/) |
| 08 | Active Directory Client Join and Authentication | 🔴 Planned | [`labs/08-ad-domain-setup-and-client-join/`](labs/08-ad-domain-setup-and-client-join/) |
| 09 | Active Directory Users, Groups y OUs | 🔴 Planned | [`labs/09-ad-users-groups-and-ous/`](labs/09-ad-users-groups-and-ous/) |
| 10 | Group Policy y NTFS Permissions | 🔴 Planned | [`labs/10-gpo-and-ntfs-permissions/`](labs/10-gpo-and-ntfs-permissions/) |
| 11 | Windows Network Connectivity Troubleshooting | 🔴 Planned | [`labs/11-windows-network-connectivity/`](labs/11-windows-network-connectivity/) |
| 12 | DHCP y DNS Configuration | 🔴 Planned | [`labs/12-dhcp-and-dns/`](labs/12-dhcp-and-dns/) |
| 13 | Windows Network Firewall | 🔴 Planned | [`labs/13-windows-network-firewall/`](labs/13-windows-network-firewall/) |
| 14 | Endpoint Security y Windows Defender | 🔴 Planned | [`labs/14-endpoint-security/`](labs/14-endpoint-security/) |
| 15 | Access Control | 🔴 Planned | [`labs/15-access-control/`](labs/15-access-control/) |
| 16 | ITSM y Ticketing | 🔴 Planned | [`labs/16-itsm-ticketing/`](labs/16-itsm-ticketing/) |

## Secuencia técnica

| Fase | Labs | Resultado esperado |
|---|---|---|
| Fundamentos | 01–04 | Sistemas, acceso remoto, automatización y troubleshooting Windows. |
| Identidad y Windows Server | 05–10 | DNS, dominio, cliente unido, usuarios, OUs, GPO y permisos. |
| Redes y seguridad | 11–15 | Conectividad, DHCP, DNS, firewall, endpoint security y acceso. |
| Operaciones | 16 | Tickets, prioridad, SLA, resolución y documentación ITSM. |

## Progresión de Active Directory

El **Lab 07** instala y prepara Windows Server, IP estática, AD DS y el bosque `lab.local`. El **Lab 08** utiliza ese entorno para unir un cliente, verificar DNS y probar un inicio de sesión real. El **Lab 09** amplía la administración de identidades con usuarios, grupos y OUs. El **Lab 10** continúa con GPO, NTFS y recursos compartidos.

## Regla de portfolio

Un laboratorio planificado puede contener una guía o materiales preliminares, pero solo se marca como completado cuando la práctica se ejecuta, se verifica y se documenta con evidencia suficiente para explicarla en una entrevista.

**Objetivo de estudio:** CompTIA A+ Core 1 y Core 2 — octubre de 2026.
**Última actualización:** Agosto de 2026
