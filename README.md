# IT Support Labs

Repositorio de práctica técnica orientado a **IT Support, Help Desk, Desktop Support y administración de sistemas**. Los laboratorios tienen rutas permanentes; su estado se registra dentro de cada README y no modifica la URL cuando avanzan.

## Estructura

| Ubicación | Contenido |
|---|---|
| [`labs/`](labs/) | Los 16 laboratorios numerados del portfolio, cada uno con una ruta permanente. |
| [`archive/legacy-labs/`](archive/legacy-labs/) | Material histórico de hardware, Linux y mantenimiento. |
| [`docs/`](docs/) | Guías generales y documentación de configuración. |
| [`templates/`](templates/) | Plantilla común para crear nuevos laboratorios. |
| [`study-notes/`](study-notes/) | Apuntes de estudio y análisis de formación. |
| [`reference/`](reference/) | Material de referencia de CompTIA A+. |
| [`tools/`](tools/) | Herramientas desarrolladas durante el aprendizaje. |
| [`infrastructure-analysis/`](infrastructure-analysis/) | Análisis de escenarios e infraestructura. |

## Portfolio actual

| Lab | Tema | Estado | Evidencia o siguiente paso |
|---:|---|---|---|
| [01](labs/01-linux-wifi-driver-fix/) | Linux Wi-Fi Driver Fix | 🟡 En progreso | Cerrar verificación final y consolidar evidencia |
| [02](labs/02-ssh-windows-to-ubuntu/) | Windows → Ubuntu SSH | 🔴 Planificado | Escenario y notas de troubleshooting |
| [03](labs/03-python-system-health-checker/) | Python System Health Checker | 🔴 Planificado | Código y escenario de automatización |
| [04](labs/04-windows-update-failure-diagnosis/) | Windows Update Failure Diagnosis | 🔴 Planificado | Flujo diagnóstico y procedimiento |
| [05](labs/05-ad-offline-logon-cache-issue/) | AD Offline Logon Cache Issue | 🔴 Planificado | Diagnóstico de autenticación |
| [06](labs/06-dns-resolution-debug/) | DNS Resolution Troubleshooting | 🔴 Planificado | Análisis y trazas DNS |
| [07](labs/07-windows-server-uefi-gpt-ad-ds/) | Windows Server UEFI/GPT + Active Directory | ✅ Completado | Capturas, comandos, instalación y verificación |
| [08](labs/08-ad-domain-setup-and-client-join/) | AD Client Join and Authentication | 🔴 Planificado | Unir cliente, verificar DNS y probar login |
| [09](labs/09-ad-users-groups-and-ous/) | AD Users, Groups y OUs | 🔴 Planificado | Administración de identidades |
| [10](labs/10-gpo-and-ntfs-permissions/) | GPO y permisos NTFS | 🔴 Planificado | Políticas, herencia y recursos compartidos |
| [11](labs/11-windows-network-connectivity/) | Windows Network Connectivity | 🔴 Planificado | Conectividad y diagnóstico de red |
| [12](labs/12-dhcp-and-dns/) | DHCP y DNS | 🔴 Planificado | Servicios de red |
| [13](labs/13-windows-network-firewall/) | Windows Network Firewall | 🔴 Planificado | Reglas, puertos y verificación |
| [14](labs/14-endpoint-security/) | Endpoint Security y Defender | 🔴 Planificado | Detección, aislamiento y remediación |
| [15](labs/15-access-control/) | Access Control | 🔴 Planificado | Roles y privilegios |
| [16](labs/16-itsm-ticketing/) | ITSM y Ticketing | 🔴 Planificado | Simulación de soporte y SLA |

## Cómo funciona el estado

Cada README de laboratorio comienza con metadatos como estos:

```yaml
---
lab: 07
status: completed
area: windows-server
level: intermediate
evidence: screenshots, commands, verification
---
```

El estado puede cambiar de `planned` a `in-progress` y después a `completed`, pero la carpeta y la URL permanecen estables.

## Progresión recomendada

La ruta técnica avanza desde troubleshooting de sistemas y acceso remoto, pasa por Windows Server y Active Directory, continúa con redes y seguridad, y termina con operaciones ITSM. La progresión de Active Directory es deliberadamente secuencial: **Lab 07 instala y prepara el dominio; Lab 08 une un cliente y prueba autenticación; Lab 09 administra usuarios, grupos y OUs; Lab 10 aplica políticas y permisos**.

## Método de documentación

Cada laboratorio debe seguir el patrón:

> **Objetivo → escenario → síntomas → herramientas → procedimiento → causa raíz → solución → verificación → evidencias → lecciones aprendidas → siguiente paso**

La plantilla reutilizable está disponible en [`templates/lab-template.md`](templates/lab-template.md).

**Objetivo de estudio:** CompTIA A+ Core 1 y Core 2 — octubre de 2026.
**Última actualización:** Agosto de 2026
