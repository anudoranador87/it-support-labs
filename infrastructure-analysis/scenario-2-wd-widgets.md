# Escenario 2: W.D. Widgets

## Contexto de la Empresa
W.D. Widgets es una empresa de ventas en rápido crecimiento (80-100 empleados, con previsión de cientos más). Aunque usan Active Directory y tienen un proveedor empresarial, el administrador único está saturado por procesos manuales y una infraestructura local (on-premises) sin redundancia.

## Problemas Identificados
*   **Procesos Manuales no Escalables:** La creación de usuarios y la instalación de software de ventas se hace equipo por equipo, consumiendo horas de trabajo.
*   **Punto Único de Fallo en Servicios:** El administrador gestiona servidores de correo, mensajería y archivos de forma local y solitaria.
*   **Riesgo Crítico de Datos:** Los datos de clientes están en un solo servidor sin copias de seguridad. La pérdida de un archivo es permanente.
*   **Gestión de Permisos Caótica:** La propiedad de las carpetas depende de quién las crea, lo que genera silos de información y problemas de acceso.
*   **Saturación del Administrador:** Las solicitudes llegan por email directo, sin priorización ni seguimiento.

---

## Análisis y Mejoras Propuestas

### 1. Automatización de Onboarding con PowerShell
**Propuesta:** Utilizar scripts de PowerShell para la creación masiva de usuarios en Active Directory a partir de archivos CSV proporcionados por RR. HH.
**Beneficio:** Permite gestionar el crecimiento de cientos de empleados sin aumentar linealmente la carga de trabajo manual.

### 2. Despliegue Automatizado de Software y Ticketing
**Propuesta:** Implementar una herramienta de gestión de endpoints (como SCCM o PDQ Deploy) para instalar aplicaciones de ventas de forma remota y masiva. Sustituir el email por un sistema de tickets.
**Beneficio:** Reduce el tiempo de preparación de equipos de horas a minutos y organiza la demanda de soporte por prioridad.

### 3. Migración a la Nube (Microsoft 365)
**Propuesta:** Migrar el correo y la mensajería a Exchange Online y Microsoft Teams.
**Beneficio:** Elimina la carga de mantenimiento de servidores locales, mejora la disponibilidad y permite el acceso remoto seguro, delegando la infraestructura a Microsoft.

### 4. Reestructuración de Permisos y Estrategia 3-2-1
**Propuesta:** Gestionar el acceso a archivos mediante grupos de seguridad en AD (no por usuarios individuales) e implementar backups automatizados en local y nube.
**Beneficio:** Garantiza la integridad de los datos de los clientes y asegura que la información sea accesible independientemente de quién haya creado la carpeta.

### 5. Escalabilidad del Equipo de IT y Documentación
**Propuesta:** Contratar a un técnico de Nivel 1 para el Help Desk y documentar exhaustivamente la infraestructura (diagramas de red, credenciales de admin, procedimientos).
**Beneficio:** Evita que el conocimiento resida en una sola persona y permite al administrador senior enfocarse en proyectos estratégicos de crecimiento.
