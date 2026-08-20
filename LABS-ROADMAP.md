# Labs Roadmap

Este roadmap organiza el portfolio por una progresión práctica de soporte técnico, sistemas, redes, seguridad y operaciones. El número del laboratorio representa su posición en la ruta, no necesariamente su estado actual.

## Estados

| Estado | Significado |
|---|---|
| ✅ Completed | Ejecutado, verificado y documentado con evidencia. |
| 🟡 In progress | Trabajo iniciado con alguna validación todavía pendiente. |
| 🔴 Planned | Escenario preparado, pero aún no presentado como práctica completada. |
| ⚪ Legacy | Material anterior conservado como referencia. |

## Estado actual

| Lab | Título | Estado | Ubicación |
|---:|---|---|---|
| 01 | Linux Wi-Fi Driver Fix | 🟡 In progress | [`labs/in-progress/01-linux-wifi-driver-fix/`](labs/in-progress/01-linux-wifi-driver-fix/) |
| 02 | SSH Windows → Ubuntu | 🔴 Planned | [`labs/planned/02-ssh-windows-to-ubuntu/`](labs/planned/02-ssh-windows-to-ubuntu/) |
| 03 | Python System Health Checker | 🔴 Planned | [`labs/planned/03-python-system-health-checker/`](labs/planned/03-python-system-health-checker/) |
| 04 | Windows Update Failure Diagnosis | 🔴 Planned | [`labs/planned/04-windows-update-failure-diagnosis/`](labs/planned/04-windows-update-failure-diagnosis/) |
| 05 | Active Directory Offline Logon Cache Issue | 🔴 Planned | [`labs/planned/05-ad-offline-logon-cache-issue/`](labs/planned/05-ad-offline-logon-cache-issue/) |
| 06 | DNS Resolution Troubleshooting | 🔴 Planned | [`labs/planned/06-dns-resolution-debug/`](labs/planned/06-dns-resolution-debug/) |
| 07 | Windows Server UEFI/GPT + Active Directory | ✅ Completed | [`labs/completed/07-windows-server-uefi-gpt-ad-ds/`](labs/completed/07-windows-server-uefi-gpt-ad-ds/) |
| 08 | Windows Server Active Directory Domain Setup | 🔴 Planned | [`labs/planned/08-windows-ad-domain-setup/`](labs/planned/08-windows-ad-domain-setup/) |
| 09 | Active Directory Users, Groups y OUs | 🔴 Planned | [`labs/planned/09-ad-users-groups-ou-management/`](labs/planned/09-ad-users-groups-ou-management/) |
| 10 | Group Policy y NTFS Permissions | 🔴 Planned | [`labs/planned/10-gpo-permissions/`](labs/planned/10-gpo-permissions/) |
| 11 | Windows Network Connectivity Troubleshooting | 🔴 Planned | [`labs/planned/11-network-connectivity/`](labs/planned/11-network-connectivity/) |
| 12 | DHCP y DNS Configuration | 🔴 Planned | [`labs/planned/12-dhcp-dns/`](labs/planned/12-dhcp-dns/) |
| 13 | Windows Network Firewall | 🔴 Planned | [`labs/planned/13-network-firewall/`](labs/planned/13-network-firewall/) |
| 14 | Endpoint Security y Windows Defender | 🔴 Planned | [`labs/planned/14-endpoint-security/`](labs/planned/14-endpoint-security/) |
| 15 | Access Control | 🔴 Planned | [`labs/planned/15-access-control/`](labs/planned/15-access-control/) |
| 16 | ITSM y Ticketing | 🔴 Planned | [`labs/planned/16-ticketing-system/`](labs/planned/16-ticketing-system/) |

## Secuencia recomendada

La ruta empieza con troubleshooting de sistemas y acceso remoto, continúa con Windows y Active Directory, y después avanza hacia redes, seguridad y operaciones ITSM.

| Fase | Laboratorios | Objetivo |
|---|---|---|
| 1. Fundamentos de soporte | 01–04 | Hardware, Linux, acceso remoto, automatización y troubleshooting de Windows. |
| 2. Identidad y servicios Windows | 05–10 | AD, dominio, usuarios, OUs, GPO y permisos. |
| 3. Redes y seguridad | 11–15 | Conectividad, DHCP, DNS, firewall, endpoint security y control de acceso. |
| 4. Operaciones | 16 | Simulación de tickets, priorización, resolución y documentación ITSM. |

## Regla de portfolio

La carpeta y el índice deben reflejar el estado real del trabajo. Un laboratorio planificado puede tener documentación preliminar, pero solo se marca como completado cuando existe una ejecución verificable y evidencia suficiente para explicarlo en una entrevista.

**Objetivo de estudio:** CompTIA A+ Core 1 y Core 2 — octubre de 2026.
**Última actualización:** Agosto de 2026
