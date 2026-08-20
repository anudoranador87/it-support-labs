# IT Support Labs

Repositorio de práctica técnica orientado a **IT Support, Help Desk, Desktop Support y administración de sistemas**. La organización está pensada como un portfolio: cada laboratorio tiene un objetivo, un estado, evidencia y un siguiente paso claro.

## Cómo leer el repositorio

La estructura separa los laboratorios por estado de avance. Así se evita mezclar trabajo demostrado con ideas futuras o material antiguo.

| Carpeta | Qué contiene |
|---|---|
| [`labs/completed/`](labs/completed/) | Laboratorios ejecutados y documentados con evidencia práctica. |
| [`labs/in-progress/`](labs/in-progress/) | Laboratorios iniciados que todavía necesitan cerrar una parte de la validación. |
| [`labs/planned/`](labs/planned/) | Escenarios y laboratorios planificados, todavía no presentados como experiencia completada. |
| [`labs/legacy/`](labs/legacy/) | Material anterior conservado como referencia histórica, separado del portfolio actual. |
| [`docs/`](docs/) | Guías generales, notas de terminal y material de configuración. |
| [`study-notes/`](study-notes/) | Apuntes de estudio, estrategias y análisis de formación. |
| [`reference/`](reference/) | Referencia de CompTIA A+ y otros materiales conceptuales. |
| [`tools/`](tools/) | Herramientas y utilidades desarrolladas durante el aprendizaje. |
| [`infrastructure-analysis/`](infrastructure-analysis/) | Análisis de escenarios e infraestructura. |

## Portfolio actual

### ✅ Completados

| Lab | Tema | Evidencia |
|---:|---|---|
| [07](labs/completed/07-windows-server-uefi-gpt-ad-ds/) | Windows Server, UEFI/GPT, arranque dual y Active Directory | Troubleshooting documentado, capturas, IP estática, AD DS, bosque, OU y usuario |

### 🟡 En progreso

| Lab | Tema | Siguiente paso |
|---:|---|---|
| [01](labs/in-progress/01-linux-wifi-driver-fix/) | Diagnóstico y corrección de driver Wi-Fi en Linux | Cerrar la verificación final y consolidar la evidencia |

### 🔴 Planificados

| Lab | Tema | Área |
|---:|---|---|
| [02](labs/planned/02-ssh-windows-to-ubuntu/) | SSH Windows → Ubuntu | Acceso remoto |
| [03](labs/planned/03-python-system-health-checker/) | Python System Health Checker | Automatización y diagnóstico |
| [04](labs/planned/04-windows-update-failure-diagnosis/) | Diagnóstico de Windows Update | Troubleshooting Windows |
| [05](labs/planned/05-ad-offline-logon-cache-issue/) | Inicio de sesión offline en AD | Autenticación |
| [06](labs/planned/06-dns-resolution-debug/) | Troubleshooting de resolución DNS | Redes |
| [08](labs/planned/08-windows-ad-domain-setup/) | Configuración de dominio Windows Server | Active Directory |
| [09](labs/planned/09-ad-users-groups-ou-management/) | Usuarios, grupos y OUs | Identidad |
| [10](labs/planned/10-gpo-permissions/) | GPO y permisos NTFS | Administración Windows |
| [11](labs/planned/11-network-connectivity/) | Conectividad de red Windows | Redes |
| [12](labs/planned/12-dhcp-dns/) | DHCP y DNS | Servicios de red |
| [13](labs/planned/13-network-firewall/) | Firewall de red Windows | Seguridad |
| [14](labs/planned/14-endpoint-security/) | Seguridad de endpoint y Defender | Seguridad |
| [15](labs/planned/15-access-control/) | Control de acceso | Seguridad e identidad |
| [16](labs/planned/16-ticketing-system/) | ITSM y sistema de tickets | Soporte y operaciones |

## Método de documentación

Cada laboratorio debe avanzar siguiendo este patrón:

> **Escenario → síntomas → investigación → causa raíz → solución → verificación → lecciones aprendidas**

Un laboratorio planificado no se presenta como experiencia demostrada. El estado solo pasa a **completado** cuando la práctica se ejecuta, se verifica y se documenta con suficiente evidencia.

## Integración con CompTIA A+

Los laboratorios refuerzan troubleshooting, hardware, sistemas operativos, redes, seguridad y fundamentos de soporte técnico. No sustituyen la preparación específica del examen, pero convierten los conceptos en evidencia práctica y explicable durante una entrevista.

**Objetivo de estudio:** CompTIA A+ Core 1 y Core 2 — octubre de 2026.

**Última actualización:** Agosto de 2026
