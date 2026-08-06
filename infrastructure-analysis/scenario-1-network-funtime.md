# Escenario 1: Network Funtime Company

## Contexto de la Empresa
Network Funtime Company es una pequeña empresa de desarrollo de software de código abierto con 100 empleados (ingenieros, diseñadores, RR. HH. y ventas). Actualmente, el departamento de IT está siendo creado desde cero.

## Problemas Identificados
*   **Falta de Estandarización de Hardware:** RR. HH. compra los portátiles más baratos sin criterio técnico, generando un parque informático heterogéneo y potencialmente insuficiente.
*   **Retrasos en la Incorporación (Onboarding):** No hay stock de equipos; se compran al contratar, retrasando el inicio del trabajo varios días.
*   **Ausencia de Inventario:** Los equipos no están etiquetados ni registrados, lo que impide su rastreo en caso de pérdida o robo.
*   **Configuración Manual Ineficiente:** Los ingenieros instalan sus propios SO (Linux) y no hay una configuración base de seguridad.
*   **Gestión de Usuarios Deficiente:** No hay políticas de contraseñas ni métodos de recuperación, obligando a reinstalar equipos completos por olvido de credenciales.

---

## Propuestas de Mejora

### 1. Estandarización de Hardware y Aprovisionamiento
**Propuesta:** Crear una lista de hardware aprobado por departamento (Ingeniería, Diseño, Ventas) y mantener un stock mínimo de 2-3 equipos.
**Beneficio:** Asegura que cada empleado tenga la potencia necesaria y permite que empiecen a trabajar desde el primer día.

### 2. Etiquetado de Activos y Gestión de Inventario
**Propuesta:** Implementar etiquetas físicas con códigos QR y un sistema de registro (Snipe-IT o similar) vinculado al número de serie y usuario.
**Beneficio:** Control total sobre la propiedad de la empresa y facilidad para auditorías o reportes de robo.

### 3. Automatización de Despliegue y Help Desk
**Propuesta:** Utilizar imágenes estándar para el despliegue de SO (PXE Boot/Clonezilla) y establecer un sistema de tickets (Jira Service Management o Zammad) para centralizar peticiones.
**Beneficio:** Configuración uniforme y segura de los equipos, liberando a RR. HH. de tareas técnicas que no le corresponden.

### 4. Gestión Centralizada de Usuarios (Active Directory)
**Propuesta:** Implementar un servicio de directorio (Active Directory o LDAP) para gestionar cuentas, permisos y políticas de contraseñas robustas.
**Beneficio:** Permite reseteos de contraseña seguros sin reinstalar el sistema y mejora la seguridad general mediante GPOs.

### 5. Estrategia de Backup y Offboarding
**Propuesta:** Aplicar la regla 3-2-1 para datos críticos y definir un proceso de salida donde IT revoque accesos a Slack, nube y correo de forma inmediata.
**Beneficio:** Protección contra pérdida de datos y garantía de que ex-empleados no mantienen acceso a información sensible.
