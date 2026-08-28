# Active Directory Domain Services — Laboratorio Multi-DC

> Despliegue de un dominio Windows Server 2022 con dos Domain Controllers, gestión de identidades, delegación y políticas de seguridad, sobre Hyper-V.

## Contexto (Situation)

Proyecto de laboratorio basado en **Microsoft Applied Skills — AZ-1008**, diseñado como pieza de portfolio profesional para demostrar competencias reales en administración de Active Directory Domain Services. Forma parte de la transición profesional hacia IT Support, complementando la formación teórica con implementación práctica.

## Objetivo (Task)

Demostrar capacidades de gestión de identidad y acceso en un entorno de dominio real:
- Configuración completa de infraestructura virtualizada con Hyper-V
- Despliegue de un bosque AD DS con dos Domain Controllers
- Gestión de OUs, usuarios, grupos y delegación de permisos
- Implementación de políticas de seguridad avanzadas (FGPP, NTLM, auditoría)

## Requisitos verificados (Fase 0)

Antes de levantar el entorno, se comprobó que el host cumple con los recursos necesarios:
- **RAM**: Se requieren 16 GB mínimo para correr fluidamente 2 DCs y el host. (Verificado en Task Manager).
- **Virtualización**: Habilitada en BIOS/UEFI. (Verificado en Rendimiento > CPU).
- **Almacenamiento**: Espacio en disco suficiente para discos dinámicos de 60GB.

*La evidencia de esta comprobación (capturas de Task Manager y `systeminfo`) está disponible en `evidence/screenshots/fase00-initial-environment.png`.*

## Arquitectura

```
┌──────────────────────────────────────────────────────────┐
│                    HOST Windows 11                       │
│                   10.10.10.1 (NATSwitch)                 │
│                                                          │
│  ┌────────────────────┐    ┌────────────────────┐        │
│  │   TAILWIND-DC1     │    │   TAILWIND-MBR1    │        │
│  │   10.10.10.10      │    │   10.10.10.20      │        │
│  │                    │    │                    │        │
│  │ • Domain Controller│    │ • Domain Controller│        │
│  │ • DNS Server       │    │ • Réplica DC       │        │
│  │ • FSMO Roles       │    │ • RID Master       │        │
│  │ • Win Server 2022  │    │ • Win Server 2022  │        │
│  └────────────────────┘    └────────────────────┘        │
│              │                       │                   │
│              └───────┬───────────────┘                   │
│                      │                                   │
│            NATSwitch 10.10.10.0/24                       │
│            (Internal + NAT → Internet)                   │
└──────────────────────────────────────────────────────────┘

Dominio: tailwindtraders.internal
```

## Qué hice (Action)

### Bloque 1 — Fundación: Hyper-V, red aislada, primer DC
- Verificación del entorno host (RAM, virtualización, edición de Windows)
- Activación de Hyper-V y configuración de rutas de almacenamiento
- Creación de red virtual interna (NATSwitch) con salida a internet
- Provisión de TAILWIND-DC1 (Gen2, Dynamic Memory)
- Configuración IP estática y promoción a primer Domain Controller
- Creación del bosque `tailwindtraders.internal`

### Bloque 2 — Alta disponibilidad: segundo DC y FSMO
- Provisión de TAILWIND-MBR1 con DNS apuntando al DC
- Unión al dominio y promoción a segundo Domain Controller
- Transferencia del rol FSMO RID Master a MBR1

### Bloque 3 — Topología, OUs, usuarios y grupos
- Definición del site 'Sydney' con subnet 172.16.1.0/24
- Creación de OUs: Sydney, Melbourne, Brisbane
- Creación de usuarios contratistas con cuenta temporal
- Grupo de seguridad 'Sydney Administrators'
- Añadir usuario a Protected Users
- Delegación de control (reset de contraseñas) a Sydney Administrators

### Bloque 4 — Políticas de seguridad y auditoría
- Política de contraseñas del dominio (mínimo 14 caracteres)
- Fine-Grained Password Policy para Domain Admins (mínimo 16 caracteres)
- Active Directory Recycle Bin
- Restricción de autenticación NTLM
- Auditoría de gestión de cuentas en OU Sydney
- User Rights Assignment — Deny Log on as a service

## Decisiones técnicas clave

Documentadas en detalle en [`docs/02-decisiones.md`](docs/02-decisiones.md):
1. **IP estática en el DC** — Un Domain Controller no puede depender de DHCP
2. **DNS del member server apunta al DC** — Necesario para resolver `tailwindtraders.internal`
3. **FGPP para Domain Admins** — Mayor privilegio = mayor exigencia de seguridad
4. **Red Internal con NAT** — Aislamiento del entorno de laboratorio
5. **Dynamic Memory** — Optimización de recursos para equipos con 8-16 GB RAM

## Problemas encontrados y resolución

Documentados en [`docs/03-troubleshooting.md`](docs/03-troubleshooting.md)

## Resultado (Result)

Este proyecto demuestra capacidades prácticas directamente aplicables a un rol de IT Support:
- **Gestión diaria**: reset de contraseñas, deshabilitar cuentas, búsqueda de usuarios por atributos
- **Administración de dominio**: OUs, grupos de seguridad, delegación de permisos
- **Seguridad**: políticas de contraseña diferenciadas, restricción de protocolos legacy (NTLM), auditoría
- **Infraestructura**: virtualización, networking, alta disponibilidad con múltiples DCs

## Evidencias

Capturas y vídeos organizados por fase en [`/evidence`](evidence/)

## Stack

`Hyper-V` · `Windows Server 2022` · `Active Directory Domain Services` · `Group Policy` · `PowerShell` · `DNS`

---

*Proyecto de José María Aparicio Portillo · [it-support-labs](https://github.com/anudoranador87/it-support-labs)*
