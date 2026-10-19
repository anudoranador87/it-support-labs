# Lab 3: Modelo OSI, STP, OSPF y DHCP (CCNA · Packet Tracer)

> 🇬🇧 [English version](./README_EN.md)

Primer laboratorio del CCNA donde **configuro dispositivos de verdad**. En los dos anteriores solo coloqué equipos y cables; aquí escribo comandos en el CLI de los routers, configuro direcciones IP en las interfaces, monto un servidor DHCP con relay y preparo la base para OSPF. El objetivo es practicar los comandos aprendidos en el curso de Jeremy conectando una topología pequeña paso a paso.

## Objetivo

Construir una red con dos LANs separadas (una de servidor y otra de cliente), unidas por dos routers, y practicar:

- Configuración de interfaces IPv4 en routers Cisco.
- Direccionamiento estático en un servidor.
- Servicio DHCP y relay entre subredes distintas.
- Verificación de conectividad con `ping`.
- Preparación para OSPF (pendiente).
- Observación de STP en modo simulación (pendiente).

## Por qué separé el servidor del PC

En una empresa real los servidores suelen estar en una red distinta a los puestos de trabajo. Si hubiera puesto todo en la misma LAN (la misma subred), el PC podría obtener su IP por DHCP directamente sin ninguna configuración especial en el router.

Al separar el servidor (`192.168.1.0/24`) del PC (`192.168.2.0/24`) me obligo a:

1. **Configurar interfaces de router en dos subredes distintas**, lo que me enseña que cada interfaz del router es una puerta de entrada a una red diferente.
2. **Usar DHCP relay** (`ip helper-address`), porque las peticiones DHCP son broadcast y no cruzan routers a no ser que el router las reenvíe.
3. **Entender el enrutamiento**, porque el tráfico entre las dos LANs tiene que pasar por R1.

Si todo estuviera en la misma red, no habría aprendido nada de esto.

## Topología

| Dispositivo | Rol |
|---|---|
| R1 | Router principal: conecta la LAN del servidor, la LAN del cliente y R2 |
| R2 | Segundo router para practicar conectividad inter-router y OSPF |
| SW1 | Switch de capa 2 para la LAN del servidor |
| SW2 | Switch de capa 2 para la LAN del cliente |
| SRV1 | Servidor con IP estática y servicio DHCP |
| PC1 | Cliente que obtendrá su IP por DHCP |

### Conexiones físicas

- SRV1 → SW1
- SW1 → R1 GigabitEthernet0/0
- PC1 → SW2
- SW2 → R1 GigabitEthernet0/1
- R1 GigabitEthernet0/2 → R2 GigabitEthernet0/0

Usé Ethernet entre los routers en vez del enlace serial que aparece en algunas guías. El 2911 tiene puertos GigabitEthernet de serie y es más sencillo que añadir módulos seriales.

![Topología física](evidence/01-topology-physical.png)

## Plan de direccionamiento IPv4

| Dispositivo / Interfaz | Dirección IPv4 | Para qué |
|---|---|---|
| R1 G0/0 | 192.168.1.1/24 | Gateway de la LAN del servidor |
| SRV1 | 192.168.1.2/24 | Servidor con IP estática |
| R1 G0/1 | 192.168.2.1/24 | Gateway de la LAN del cliente |
| PC1 | DHCP — pendiente de verificar | IP del cliente, asignada por DHCP |
| R1 G0/2 | 10.0.0.1/30 | Enlace entre routers |
| R2 G0/0 | 10.0.0.2/30 | Enlace entre routers |

### Por qué /30 entre routers

Un enlace punto a punto solo necesita dos direcciones IP (una para cada extremo). La máscara `/30` da exactamente 2 hosts utilizables (`10.0.0.1` y `10.0.0.2`). Usar una `/24` entera desperdiciaría 252 direcciones.

### Configuración del servidor

SRV1 tiene asignado:

- IPv4: `192.168.1.2`
- Máscara: `255.255.255.0`
- Gateway: `192.168.1.1` (la interfaz G0/0 de R1)
- DNS: `8.8.8.8` (es un valor conocido para pruebas; la conectividad externa no está probada en la simulación)

![Configuración IP de SRV1](evidence/07-srv1-ip-configuration.png)

## Configuración del DHCP

El servicio DHCP se activó en SRV1 con un pool llamado `LAN_PC1`.

| Parámetro | Valor |
|---|---|
| Nombre del pool | LAN_PC1 |
| Gateway por defecto | 192.168.2.1 |
| Servidor DNS | 8.8.8.8 |
| Dirección de inicio | 192.168.2.10 |
| Máscara de subred | 255.255.255.0 |
| Usuarios máximos | 50 |

![Pool DHCP en SRV1](evidence/09-srv1-dhcp-pool-config.png)

### DHCP relay (ip helper-address)

El servidor DHCP está en `192.168.1.0/24`, pero el PC que necesita la IP está en `192.168.2.0/24`. Las peticiones DHCP son broadcast y no cruzan routers. Sin hacer nada más, el PC envía un DHCP Discover en su red, y como el servidor está en otra, nunca lo recibe.

Para solucionarlo, configuré `ip helper-address` en la interfaz de R1 que da al PC:

```text
interface GigabitEthernet0/1
 ip helper-address 192.168.1.2
```

Lo que hace este comando: cuando R1 recibe un broadcast DHCP en G0/1, lo convierte en unicast y lo reenvía a `192.168.1.2` (SRV1). El servidor responde a R1, y R1 se lo pasa al PC. Sin este comando, el PC nunca obtendría IP.

![DHCP relay en R1](evidence/10-r1-dhcp-relay.png)

**La asignación de IP a PC1 todavía está pendiente de verificar.**

## Configuración de los routers — por qué cada comando

### R1

```text
interface GigabitEthernet0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/1
 ip address 192.168.2.1 255.255.255.0
 ip helper-address 192.168.1.2
 no shutdown
!
interface GigabitEthernet0/2
 ip address 10.0.0.1 255.255.255.252
 no shutdown
```

**Qué creo que hace cada comando:**

- `interface GigabitEthernet0/0` → Entro en la configuración de ese puerto concreto. Cada interfaz se configura por separado, una a una.
- `ip address 192.168.1.1 255.255.255.0` → Asigno la IP y la máscara al puerto. Esta es la dirección que usarán los dispositivos de esa LAN como gateway.
- `no shutdown` → Enciendo el puerto. **Los puertos de los routers vienen apagados por defecto.** Si no escribo esto, el enlace sigue en rojo y no pasa tráfico.
- `ip helper-address 192.168.1.2` → Reenvía los broadcasts DHCP de esta interfaz hacia el servidor. Solo lo pongo en G0/1 porque es la interfaz del lado del PC.

![R1 G0/0 levantado](evidence/02-r1-g0-0-up.png)

![Interfaces LAN de R1](evidence/03-r1-lan-interfaces.png)

![Enlace inter-router de R1](evidence/04-r1-router-link-initial.png)

### R2

```text
interface GigabitEthernet0/0
 ip address 10.0.0.2 255.255.255.252
 no shutdown
```

R2 solo tiene una interfaz configurada por ahora. Cuando configure OSPF, R2 compartirá sus rutas con R1.

![R2 G0/0 levantado](evidence/05-r2-g0-0-up.png)

### OSPF — qué es, qué problema resuelve, y por qué lo necesito

Ahora mismo R1 conoce sus tres redes directamente conectadas, pero R2 solo conoce la red `10.0.0.0/30`. Si más adelante añado una LAN detrás de R2, R1 no sabría cómo llegar a ella, y habría que añadir rutas estáticas a mano.

**OSPF** (Open Shortest Path First) es un protocolo de enrutamiento dinámico. Lo que hace es que los routers se descubren entre sí como vecinos y se intercambian automáticamente las redes que conocen. Si un enlace cae, OSPF recalcula la ruta sin que yo toque nada.

**Por qué OSPF y no otro protocolo:**

- Es un estándar abierto (funciona en cualquier marca, no solo Cisco).
- Es el protocolo de enrutamiento interior que más se usa en entornos empresariales.
- Está en el temario del CCNA.

**Estado:** Pendiente de configurar. Los próximos pasos serán:

1. Activar OSPF en R1 y R2.
2. Anunciar las redes de cada router.
3. Verificar vecindad con `show ip ospf neighbor`.
4. Comprobar que las rutas aprendidas aparecen en `show ip route`.

## Pruebas de conectividad

### Prueba 1 — SRV1 a R1

```text
ping 192.168.1.1
```

- Paquetes enviados: 4
- Paquetes recibidos: 4
- Pérdida: 0%

**Resultado:** El servidor llega a su gateway. La IP de R1 G0/0 está bien configurada y la interfaz está levantada.

![SRV1 ping a R1](evidence/08-srv1-ping-r1.png)

### Prueba 2 — R2 a R1

```text
ping 10.0.0.1
```

- Paquetes enviados: 5
- Paquetes recibidos: 4
- Pérdida: 20%

El primer ping falló y los cuatro siguientes funcionaron. Esto pasa por la resolución ARP: la primera vez que un dispositivo habla con otro, necesita descubrir su dirección MAC y eso tarda lo suficiente para que el primer paquete se pierda. En la vida real y en Packet Tracer esto es normal al primer intento. Un segundo `ping` debería dar 0% de pérdida.

**Resultado:** Hay conectividad; falta repetir para confirmar al 100%.

![R2 ping a R1](evidence/06-r2-ping-r1.png)

## Dificultades y solución

**1. Olvidé `no shutdown` en una interfaz.**
Configuré la IP en G0/0 pero no escribí `no shutdown`. El enlace seguía en rojo y el ping no funcionaba. Me costó un rato darme cuenta porque la IP estaba bien puesta. La lección: **siempre terminar con `no shutdown`** después de configurar una interfaz.

**2. Comandos en el nivel equivocado del CLI.**
Intenté escribir `ip address ...` desde el modo privilegiado (`Router#`) en vez de desde el modo de configuración de interfaz (`Router(config-if)#`). El router me devolvió un error que no entendí al principio. La jerarquía del CLI es:
- `Router>` → modo usuario (solo consultas básicas).
- `Router#` → modo privilegiado (`enable`): se puede ver la configuración y hacer pings, pero no cambiar nada.
- `Router(config)#` → modo de configuración global (`configure terminal`).
- `Router(config-if)#` → modo de configuración de interfaz (`interface G0/0`): aquí es donde se ponen las IPs y el `no shutdown`.

**3. Cada interfaz se configura por separado.**
Al principio pensaba que podía configurar varias interfaces de golpe. No. Hay que entrar en cada una con `interface GigabitEthernet0/X`, ponerle su IP y su `no shutdown`, y luego pasar a la siguiente. Antes de tocar nada es importante tener claro **qué interfaces están cableadas y a qué red va cada una**, porque si te equivocas de interfaz, le pones la IP a un puerto que no está conectado y nada funciona.

**4. El primer ping que falla por ARP.**
Ya lo expliqué arriba. No es un error, pero la primera vez que lo vi pensé que algo estaba mal configurado.

## Qué aprendí

- Las interfaces de un router se configuran de una en una. Hay que saber qué cable va a qué puerto antes de empezar.
- `no shutdown` es obligatorio en los routers. Sin él, la interfaz está administrativamente apagada y no pasa tráfico.
- Los niveles del CLI importan: cada comando solo funciona en su modo. Si el router dice "Invalid input", probablemente estoy en el nivel equivocado.
- DHCP relay (`ip helper-address`) es necesario cuando el servidor DHCP está en otra subred. Sin él, el broadcast del cliente no llega al servidor.
- La subred `/30` es lo adecuado para enlaces punto a punto entre routers.
- OSPF permite que los routers compartan rutas automáticamente en vez de configurarlas a mano; todavía no lo he implementado.

## Trabajo pendiente

- [ ] Repetir el ping de R2 a R1 para confirmar conectividad estable.
- [ ] Configurar OSPF en R1 y R2.
- [ ] Verificar vecindad OSPF y rutas aprendidas.
- [ ] Activar DHCP en PC1 y verificar que recibe IP, gateway y DNS.
- [ ] Probar conectividad de PC1 a su gateway y a SRV1.
- [ ] Inspeccionar los mensajes DHCP en modo simulación.
- [ ] Observar STP e identificar BPDUs.
- [ ] Guardar el proyecto final y completar las capturas.

## Evidencias

Todas las capturas están en [`evidence/`](evidence/). El archivo de Packet Tracer es [`Lab_OSI_JoseAparicio.pkt`](Lab_OSI_JoseAparicio.pkt).

| Archivo | Qué muestra |
|---|---|
| `01-topology-physical.png` | Vista general de la topología |
| `02-r1-g0-0-up.png` | Interfaz G0/0 de R1 levantada |
| `03-r1-lan-interfaces.png` | Configuración de las interfaces LAN de R1 |
| `04-r1-router-link-initial.png` | Enlace inter-router de R1 |
| `05-r2-g0-0-up.png` | Interfaz G0/0 de R2 levantada |
| `06-r2-ping-r1.png` | Ping de R2 a R1 (10.0.0.1) |
| `07-srv1-ip-configuration.png` | IP estática de SRV1 |
| `08-srv1-ping-r1.png` | Ping de SRV1 a su gateway |
| `09-srv1-dhcp-pool-config.png` | Pool DHCP en SRV1 |
| `10-r1-dhcp-relay.png` | DHCP relay (`ip helper-address`) en R1 |
