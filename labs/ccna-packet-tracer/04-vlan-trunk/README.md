# Lab 4: VLANs y Trunk 802.1Q (CCNA · Packet Tracer)

> 🇬🇧 [English version](./README_EN.md)

Cuarto bloque de mi portfolio de redes (CCNA). En este lab configuro dos VLANs en dos switches, las conecto con un enlace **trunk 802.1Q** y compruebo qué se comunica y qué no. Al final rompo la red a propósito para practicar troubleshooting.

| | |
|---|---|
| **Herramienta** | Cisco Packet Tracer |
| **Equipos** | 2 × Catalyst 2960-24TT (SW1, SW2) y 4 PCs |
| **Tiempo** | 1 h 30 min |
| **Fecha** | 26/10/2026 |
| **Archivo Packet Tracer** | [`04_VLAN_Trunk.pkt`](04_VLAN_Trunk.pkt) |

---

## 🎯 Objetivo

- Crear las VLAN 10 (VENTAS) y 20 (IT) en los dos switches.
- Asignar los puertos de acceso a cada VLAN.
- Configurar un enlace trunk entre SW1 y SW2.
- Verificar la conectividad dentro de una VLAN y entre VLANs distintas.
- Ver con mis propios ojos el tag 802.1Q dentro de una trama.
- Provocar dos fallos (trunk caído y VLAN borrada) y repararlos.

## 🗺️ Topología

![Topología inicial](img/02-01-topologia-inicial.png)

| Dispositivo | Puerto | Conecta con | VLAN / IP |
|---|---|---|---|
| SW1 | Fa0/1 | PC1 | VLAN 10 · 192.168.10.11/24 |
| SW1 | Fa0/2 | PC2 | VLAN 20 · 192.168.20.12/24 |
| SW1 | Gi0/1 | SW2 Gi0/1 | Trunk |
| SW2 | Fa0/1 | PC3 | VLAN 10 · 192.168.10.13/24 |
| SW2 | Fa0/2 | PC4 | VLAN 20 · 192.168.20.14/24 |

Sin default gateway: en este lab no hay router.

---

## 🛠️ Desarrollo paso a paso

### Fase 0 · Estado inicial

Cableado, IPs en los PCs y comprobación de que todo está en la VLAN 1 antes de tocar nada.

![ipconfig en PC1](img/02-02-ipconfig-pc1.png)
![show vlan brief inicial](img/02-03-show-vlan-brief-inicial.png)
![ping antes de configurar](img/02-04-ping-antes.png)

Con todo en la VLAN 1 por defecto, el ping entre PC1 y PC3 es mi referencia para comparar después.

### Fase 1 · Crear las VLANs (en SW1 y SW2)

```
conf t
hostname SW1
vlan 10
 name VENTAS
 exit
vlan 20
 name IT
 end
show vlan brief
```

Las VLAN existen pero todavía **sin puertos asignados**. Hay que crearlas en cada switch, porque no se comparten solas (eso sería VTP).

![VLANs creadas en SW1](img/02-05-sw1-vlans-creadas.png)
![VLANs creadas en SW2](img/02-06-sw2-vlans-creadas.png)

### Fase 2 · Puertos de acceso

```
interface fa0/1
 switchport mode access
 switchport access vlan 10
interface fa0/2
 switchport mode access
 switchport access vlan 20
 end
```

Fa0/1 pasa a VENTAS y Fa0/2 a IT, y **desaparecen de la lista de la VLAN 1** (compara con la captura 03).

![Puertos asignados en SW1](img/02-07-sw1-puertos-asignados.png)
![switchport de Fa0/1](img/02-08-sw1-switchport-fa01.png)
![Puertos asignados en SW2](img/02-09-sw2-puertos-asignados.png)

En `show interfaces fa0/1 switchport` se ve *Administrative Mode: static access* (lo que yo configuré) y *Access Mode VLAN: 10 (VENTAS)*.

### Fase 3 · El trunk

```
interface gi0/1
 switchport mode trunk
 end
show interfaces trunk
```

Gi0/1 aparece en modo `on`, encapsulación `802.1q`, estado `trunking`, native VLAN 1.

![Trunk en SW1](img/02-10-sw1-show-trunk.png)
![Trunk en SW2](img/02-11-sw2-show-trunk.png)
![switchport de Gi0/1](img/02-12-sw1-switchport-gi01.png)

**¿Por qué el trunk "permite" 1-1005 pero solo hay 3 VLANs activas (1, 10 y 20)?**
Porque 1-1005 es el rango que el trunk *permite* transportar, y las activas son las que realmente **hemos creado en los switches**. Si una VLAN no existe en el switch, no puede viajar por el trunk.

### Fase 4 · Pruebas de conectividad

| Prueba | Resultado | Captura |
|---|---|---|
| PC1 → PC3 (VLAN 10, a través del trunk) | ✅ Responde | ![](img/02-13-ping-misma-vlan-ok.png) |
| PC2 → PC4 (VLAN 20, a través del trunk) | ✅ Responde | ![](img/02-14-ping-vlan20-ok.png) |
| PC1 → PC2 (VLANs distintas) | ❌ Falla (es lo esperado) | ![](img/02-15-ping-entre-vlans-falla.png) |

El trunk comunica **equipos de la misma VLAN entre switches distintos**. Para que PC1 hable con PC2 (VLANs distintas) haría falta un dispositivo de capa 3.

### Fase 5 · El tag 802.1Q dentro de la trama

En modo Simulation seguí el mismo ping (ID `0x001d`, SEQ 29) en dos puntos del camino.

**En el trunk (sale de SW1)** · la cabecera es *Ethernet 802.1q*:

![Trama con tag en el trunk](img/02-16-pdu-trunk-802.1q.png)

**En el puerto de acceso (sale de SW2 hacia PC3)** · cabecera *Ethernet II*, sin tag:

![Trama sin tag en el puerto de acceso](img/02-17-pdu-acceso-sin-tag.png)

| Campo | Valor | Qué significa |
|---|---|---|
| TPID | `0x8100` | Marca fija: "esta trama lleva tag 802.1Q" |
| TCI | `0x000a` | Contiene la VLAN: `0x000a` en hexadecimal es 10 |

**Cómo lo entiendo con una analogía:** los dos switches son dos plantas de un hotel y el trunk es el ascensor compartido. Cuando un paquete de la VLAN 10 sube por el ascensor, le ponen una pulsera con el número de VLAN (el tag). En la otra planta, el switch lee la pulsera, lo entrega solo a los puertos de esa VLAN y **se la quita** antes de dárselo al PC. Es como añadir una cabecera `{ vlan: 10 }` a un mensaje que el receptor lee y elimina antes de usar los datos.

### Fase 6 · Troubleshooting

**Fallo 1 · Trunk caído** (`shutdown` en Gi0/1 de SW2). El ping PC1 → PC3 falla y el enlace se pone en rojo.

![Trunk caído](img/02-18-fallo-trunk-caido.png)

Con `no shutdown` el enlace pasa de rojo a naranja y a verde (Spanning Tree), y el ping vuelve a responder.

![Trunk recuperado](img/02-19-trunk-recuperado.png)

**Fallo 2 · VLAN borrada** (`no vlan 10` en SW2). El ping falla y en `show vlan brief` desaparece la VLAN 10. Además, **Fa0/1 no aparece en ninguna VLAN** (ni en la 1): el puerto queda huérfano e inactivo.

![VLAN borrada](img/02-20-fallo-vlan-borrada.png)

Al recrearla con `vlan 10` y `name VENTAS`, **Fa0/1 volvió sola a VENTAS** sin reasignar nada, porque el puerto conservaba su `switchport access vlan 10`.

![Fallo resuelto](img/02-21-fallo-resuelto.png)

### Fase 7 · Cierre

```
copy running-config startup-config
show running-config
```

![running-config de SW1](img/02-22-sw1-running-config.png)
![Topología final](img/02-23-topologia-final.png)

---

## ❌ Mis fallos (y qué aprendí de cada uno)

| Fallo | Qué pasó | Qué aprendí |
|---|---|---|
| Comandos en el nivel equivocado | `hostname`, `interface fa0/1` y `vlan 20` escritos en `SW#` me dieron `Invalid input` | Cada nivel de la CLI tiene sus comandos: `#` es modo privilegiado y solo `(config)#` o `(config-if)#` permiten configurar. Antes de teclear, miro el prompt |
| `VLAN 10 name VENTAS` en una línea | `Invalid input` en `name` | `vlan 10` entra en un submodo, y `name` va dentro, en otra línea |
| `end` y luego `vlan 20` | Otra vez error de nivel | `end` sale hasta `#`; con `exit` vuelvo un nivel |
| Errores de escritura | `fa/01` en vez de `fa0/1`, y `1921.168.10.13` en un ping | Eran despistes: sabía perfectamente cuál era la IP. Leer el `^` que marca IOS ayuda a encontrar el fallo |
| Ping inicial al 100 % de pérdida | Aún no había puesto las IPs en todos los PCs | Primero la IP en todos los equipos, después las pruebas |
| Etiqueta de PC2 con la IP equivocada | Puse 192.168.10.12 en vez de 192.168.20.12 en el texto de la topología | Revisar las etiquetas antes de la captura final |
| Modo Simulation | Los pings no avanzaban, la lista se llenaba de paquetes STP y los enlaces estaban naranjas tras el reset | Hay que volver a Realtime, esperar al verde y filtrar solo ICMP |
| Notas de Packet Tracer que desaparecían | Las creaba y se borraban | Hay que escribir el texto antes de hacer clic fuera |

## ✅ Mis aciertos

- Terminé el lab entero en **1 h 30 min**, con 23 capturas hechas en el momento exacto.
- Detecté mis propios errores de nivel en la CLI y los corregí sin ayuda.
- Seguí el mismo paquete en dos puntos del camino y vi la diferencia entre trama con tag y sin tag.
- Entendí qué pasa con los puertos cuando se borra una VLAN.

## 🧠 Aprendizajes clave

1. **La CLI de Cisco tiene niveles**, y cada nivel acepta comandos distintos.
2. **Las VLAN hay que crearlas en cada switch.** Que el trunk las permita no basta si no existen.
3. **El trunk comunica la misma VLAN entre switches**, pero no comunica VLANs distintas entre sí. Para eso hace falta un router.
4. **El tag 802.1Q solo viaja por el trunk**; en los puertos de acceso la trama va sin tag.
5. **Si borras una VLAN, sus puertos quedan inactivos pero conservan su configuración.** Recrear la VLAN con el mismo número los reactiva.
6. **En producción hay que documentar todo antes de borrar nada**, y no guardar la configuración hasta estar seguro. Matiz que quiero comprobar: en estos switches las VLAN se guardan en un fichero aparte (`vlan.dat`) y se aplican al momento, así que "no guardar" no siempre protege. Por eso, además de documentar, conviene tener una copia de la configuración.

## 🔮 Mis predicciones

- **Antes de configurar el trunk** predije que el ping fallaría, porque tenía entendido que el trunk es lo que permite que se comuniquen los switches entre sí.
- **Con el trunk** confirmé que sí se comunican los equipos de la misma VLAN a través de los dos switches, pero no las VLANs distintas.

## 🚧 Qué me costó y qué quiero mejorar

- Lo más duro fue la **jerarquía de modos y comandos** de la CLI, y equivocarme de nivel.
- También el **modo Simulation**: no tengo todavía soltura con Packet Tracer, más que por el concepto, por el manejo del software.
- Antes de empezar, la teoría de las VLAN la tenía clara, pero no cómo se configuran en los equipos Cisco. El lab me pareció **muy sencillo** una vez entendí los niveles de la CLI.

## 📋 Comandos de referencia

| Para qué | Comando |
|---|---|
| Entrar en modo privilegiado | `enable` |
| Entrar en configuración | `conf t` |
| Crear y nombrar VLAN | `vlan 10` → `name VENTAS` |
| Puerto de acceso | `switchport mode access` + `switchport access vlan 10` |
| Puerto trunk | `switchport mode trunk` |
| Ver VLANs | `show vlan brief` |
| Ver trunks | `show interfaces trunk` |
| Ver un puerto | `show interfaces fa0/1 switchport` |
| Guardar | `copy running-config startup-config` |

## ➡️ Siguiente paso

Hacer que PC1 y PC2 (VLANs distintas) sí se comuniquen mediante enrutamiento entre VLANs (*router-on-a-stick*).

---

*José María Aparicio Portillo · [GitHub](https://github.com/anudoranador87) · [LinkedIn](https://linkedin.com/in/joseaparicio87)*
