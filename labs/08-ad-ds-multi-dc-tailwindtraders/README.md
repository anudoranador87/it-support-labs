# Active Directory Domain Services — Laboratorio Multi-DC

> Despliegue de un dominio Windows Server 2022 con dos Domain Controllers, gestión de identidades, delegación y políticas de seguridad, sobre Hyper-V.

## Contexto (Situation)

Proyecto de laboratorio basado en **Microsoft Applied Skills — AZ-1008**, diseñado como pieza de portfolio profesional para demostrar competencias reales en administración de Active Directory Domain Services. Forma parte de la transición profesional hacia IT Support, complementando la formación teórica con implementación práctica.

## Objetivo (Task)

El objetivo final de este laboratorio es desplegar y gestionar una infraestructura virtualizada completa que incluya:
- Despliegue de un bosque AD DS con dos Domain Controllers (Alta Disponibilidad).
- Gestión de OUs, usuarios, grupos y delegación de permisos (Principio de Mínimo Privilegio).
- Implementación de políticas de seguridad (FGPP, restricción NTLM, auditoría).

---

## Progreso del Proyecto (Action)

### Fase 0 — Requisitos verificados

Antes de levantar el entorno, se comprobó que el host físico cumple con los recursos necesarios para virtualizar la infraestructura planificada:
- **RAM y Almacenamiento**: Se validó que el equipo dispone de memoria suficiente (mínimo 16 GB recomendados para correr fluidamente 2 DCs y el host) y espacio en disco libre para soportar discos dinámicos de 60GB.
- **Virtualización**: Se confirmó que la virtualización por hardware (Intel VT-x / AMD-V) está habilitada en la BIOS/UEFI.

#### Evidencia de verificación:

![System Info y RAM](evidence/screenshots/fase00-systeminfo.png)
![Virtualización](evidence/screenshots/fase00-virtualizacion.png)
![Espacio en disco](evidence/screenshots/fase00-disk-space.png)

---
*Este proyecto está actualmente en desarrollo. Las siguientes secciones y fases se irán documentando a medida que se despliegue la infraestructura.*
