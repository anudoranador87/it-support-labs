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

### Fase 1 — Instalación de Hyper-V

Para aislar el entorno de Active Directory y simular un centro de datos local, se ha habilitado el rol de Hyper-V (hipervisor nativo de Windows) y sus herramientas de administración en el sistema operativo host.

#### Evidencia de configuración:

![Hyper-V habilitado](evidence/screenshots/fase01-hyperv.png)

### Fase 2 — Configuración de rutas de Hyper-V

Para garantizar un rendimiento óptimo de las máquinas virtuales, se definieron las rutas de almacenamiento de los discos virtuales y archivos de configuración.

> **Decisión técnica:** Se mantuvieron las rutas por defecto de Hyper-V en la unidad A:, elegida por ser la de mayor capacidad y velocidad del equipo.

#### Evidencia de configuración:

![Rutas de Hyper-V configuradas](evidence/screenshots/fase02-rutas-hyperv.png)

---
*Este proyecto está actualmente en desarrollo. Las siguientes secciones y fases se irán documentando a medida que se despliegue la infraestructura.*

### Fase 3 — Creación de la red virtual NAT

Una vez preparado Hyper-V, el siguiente paso fue crear la red virtual que utilizarán las máquinas del laboratorio.

Para mantener el entorno aislado de la red física del equipo, se creó un **switch virtual de tipo Internal** denominado `NATSwitch` y posteriormente se configuró una red privada `10.10.10.0/24` con NAT.

#### Configuración realizada

La red se creó mediante PowerShell ejecutado como administrador, utilizando tres comandos principales:

1. **Crear el switch virtual**

   Se creó un switch virtual de tipo `Internal` llamado `NATSwitch`.

2. **Asignar la dirección IP al adaptador virtual**

   Se configuró la dirección `10.10.10.1/24` en el adaptador virtual asociado al switch.

3. **Crear la regla NAT**

   Se creó una red NAT para permitir que las máquinas virtuales puedan acceder a redes externas a través del host, manteniendo al mismo tiempo aislada la infraestructura del laboratorio.

La configuración resultante utiliza la siguiente red:

| Parámetro | Configuración |
|---|---|
| Red | `10.10.10.0/24` |
| Gateway | `10.10.10.1` |
| Switch virtual | `NATSwitch` |
| Tipo de switch | `Internal` |
| NAT | Configurado |

#### Verificación

Una vez creada la infraestructura de red, se utilizaron comandos de PowerShell para comprobar que el switch virtual y la configuración IP habían quedado correctamente establecidos.

La verificación confirmó la existencia de `NATSwitch` y de la dirección `10.10.10.1` asociada a la red virtual.

#### Decisión técnica

Se eligió una red **Internal + NAT** en lugar de conectar directamente las máquinas virtuales a la red física mediante un switch externo.

Esto permite mantener el laboratorio separado de la red doméstica o de producción, mientras que las máquinas virtuales pueden seguir teniendo conectividad hacia el exterior cuando sea necesaria.

Esta separación resulta especialmente útil para un laboratorio de **Active Directory**, ya que permite trabajar con servidores, DNS, políticas y configuraciones de red sin modificar directamente la infraestructura física.

#### Evidencia

**Vídeo — Creación y verificación de la red virtual NAT**

<video controls width="800">
  <source src="evidence/videos/LABNATVIRTUAL_compressed.mp4" type="video/mp4">
  Tu navegador no admite la reproducción de vídeo.
</video>

> El vídeo muestra la creación de `NATSwitch`, la configuración de la dirección IP `10.10.10.1` y la creación de la red NAT `10.10.10.0/24`, seguida de las comprobaciones realizadas mediante PowerShell.

[▶️ Ver el vídeo directamente](evidence/videos/LABNATVIRTUAL_compressed.mp4)

#### Artefacto técnico

Los comandos utilizados durante esta fase se han guardado en:

```text
scripts/setup-network.ps1
