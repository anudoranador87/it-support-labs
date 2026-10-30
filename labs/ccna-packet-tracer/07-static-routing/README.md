# Lab 7: Routing estático (CCNA · Packet Tracer)

> 🇬🇧 [Read in English](./README_EN.md) · [CCNA Packet Tracer lab index](../README.md)

Séptimo bloque de mi portfolio de redes (CCNA). En el lab anterior diseñé el plan VLSM y conecté la sucursal con una sola ruta estática. Aquí sigo sobre esa misma topología y trabajo con rutas estáticas de verdad: por siguiente salto y por interfaz de salida, una ruta resumen, la ruta por defecto, y un enlace de respaldo con una ruta flotante.

| | |
|---|---|
| **Herramienta** | Cisco Packet Tracer |
| **Equipos** | 2 × Cisco 2911 (R1, R2), 3 × Catalyst 2960-24TT (SW1, SW2, SW3) y 6 PCs |
| **Tiempo de ejecución** | ~2 h (sin contar la fase de cálculo en papel) |
| **Fecha** | 30/10/2026 |
| **Archivo Packet Tracer** | [`07_Routing_Estatico.pkt`](07_Routing_Estatico.pkt) |

---

## 🎯 Objetivo

- Entender qué hace cada parte de una ruta estática: red, máscara y siguiente salto o interfaz de salida.
- Entender qué es la ruta por defecto (`0.0.0.0 0.0.0.0`) y cuándo se usa.
- Ver la diferencia entre una ruta con siguiente salto y una con interfaz de salida.
- Usar una ruta resumen para sustituir varias rutas por una sola.
- Montar un enlace de respaldo con una ruta flotante (AD 200) y comprobar el failover con `tracert`.
- Entender la diferencia entre balanceo de carga y respaldo en `show ip route`.
- Romper y reparar tres fallos típicos de rutas estáticas.

---

## 🧮 Fase 0 · El plan en papel

Antes de tocar Packet Tracer, escribí a mano las rutas que necesitaba y el rango que cubría el resumen:

- R1 → sucursal: `192.168.50.112/28` vía `192.168.50.130`.
- R2 → resto de la red: ruta por defecto vía `192.168.50.129`.
- Resumen: `192.168.50.0/25` cubre desde `.0` hasta `.127`, es decir, VENTAS, IT e INVITADOS. Pero también cubre `.112/28`, que es la LAN de la sucursal. Eso lo tuve que pensar bien (ver Fallo 1 y Aprendizajes).
- Respaldo: `192.168.50.132/30` (estaba libre desde el lab anterior), con hosts `.133` (R1) y `.134` (R2).

![Tabla de rutas en papel](img/07-01-tabla-rutas-papel.png)

> **Predicción que hice y fallé:** pensé que R2 usaría la ruta `/25` para `192.168.50.120` porque era más "específica". No tuve en cuenta que la ruta conectada `.112/28` es todavía más específica. Lo entendí al ver la tabla de R2.

---

## 🗺️ Topología

```text
   VENTAS / IT / INVITADOS                          SUCURSAL
        SW1 · SW2 · PC1–PC5                         SW3 · PC6
              |                                       |
           [ R1 ] ==== enlace principal /30 ====> [ R2 ]
   Gi0/0 (trunk)  Gi0/1 (.129 / .130)    Gi0/1 (.113)
              \                                     /
               ==== enlace de respaldo /30 ==========
                  Gi0/2 (.133 / .134)   Gi0/2
```

La topología tiene dos enlaces entre R1 y R2 (el principal y el de respaldo). En Packet Tracer el respaldo sale en el dibujo como una segunda línea discontinua entre los dos routers.

### Tabla de direccionamiento de los enlaces

| Dispositivo | Interfaz | Rol | IP / Máscara |
|---|---|---|---|
| R1 | Gi0/1 | Enlace principal hacia R2 | `192.168.50.129 /30` |
| R2 | Gi0/0 | Enlace principal hacia R1 | `192.168.50.130 /30` |
| R2 | Gi0/1 | LAN sucursal | `192.168.50.113 /28` |
| R1 | Gi0/2 | Enlace de respaldo hacia R2 | `192.168.50.133 /30` |
| R2 | Gi0/2 | Enlace de respaldo hacia R1 | `192.168.50.134 /30` |

---

## 🛠️ Desarrollo paso a paso

### Fase 1 · Estado inicial

Abrí el archivo del lab anterior y lo guardé como `07_Routing_Estatico.pkt` para no tocar el original.

En R2, el estado de partida era solo la ruta por defecto:

![R2 show ip route antes](img/07-02-r2-show-ip-route-antes.png)

En R1 estaba la ruta hacia la sucursal que añadí en el lab anterior:

![R1 show ip route antes](img/07-03-r1-show-ip-route-antes.png)

---

### Fase 2 · Siguiente salto frente a interfaz de salida

Aquí es donde más me costó. Al principio no entendía por qué `0.0.0.0 0.0.0.0` era "todo lo que no conozco", ni para qué servía la IP del vecino. Lo entendí cuando cambié la ruta a interfaz de salida:

```text
R2# conf t
R2(config)# no ip route 0.0.0.0 0.0.0.0 192.168.50.129
R2(config)# ip route 0.0.0.0 0.0.0.0 GigabitEthernet0/0
R2(config)# end
R2# show ip route
```

![Ruta por defecto con interfaz de salida](img/07-04-r2-defecto-interfaz.png)

IOS me avisó con `%Default route without gateway, if not a point-to-point interface, may impact performance`. Lo entendí así: en un enlace punto a punto, con solo dos extremos, la interfaz de salida basta. En una LAN con muchos equipos, el router tendría que resolver por ARP cada destino y eso puede saturar el segmento.

Después comprobé que el ping seguía funcionando desde PC6 a PC3:

![Ping PC6 a PC3 con interfaz de salida](img/07-05-ping-pc6-pc3-interfaz.png)

Y restauré la configuración original con el siguiente salto `.129`, porque el resto del lab depende de él.

> **Predicción fallida:** pensé que la ruta por interfaz no cambiaría nada, y no me di cuenta de la diferencia hasta leer el aviso de IOS. Por eso dejé la anotación aquí.

---

### Fase 3 · Ruta resumen

Añadí en R2 una ruta que cubre `192.168.50.0/25`, junto a la ruta por defecto:

```text
R2(config)# ip route 192.168.50.0 255.255.255.128 192.168.50.129
R2# show ip route
```

![Ruta resumen en R2](img/07-06-r2-ruta-resumen.png)

Los pings desde PC6 a PC3 y desde PC1 a PC6 siguieron funcionando:

![Pings con ruta resumen](img/07-07-ping-resumen-ok.png)

---

### Fase 4 · Ruta por defecto como única salida

Quité la ruta resumen para que R2 saliera solo por la ruta por defecto:

```text
R2(config)# no ip route 192.168.50.0 255.255.255.128 192.168.50.129
```

![R2 solo con ruta por defecto](img/07-08-r2-solo-defecto.png)

Después hice ping a `10.10.10.10`, una red que no existe en el plan. El paquete sale de PC6, R2 lo manda por defecto a R1, y R1 no conoce esa red y responde con `Destination host unreachable`. Ese error venía de R1, no de R2, y me sirvió para ver el recorrido completo:

![Ping a red externa](img/07-09-ping-red-externa.png)

---

### Fase 5 · Enlace de respaldo y ruta flotante

#### Cableado y direcciones

Conecté R1 Gi0/2 con R2 Gi0/2 con cable cruzado y configuré las IPs `.133` y `.134`:

```text
R1(config)# interface gi0/2
R1(config-if)# ip address 192.168.50.133 255.255.255.252
R1(config-if)# no shutdown

R2(config)# interface gi0/2
R2(config-if)# ip address 192.168.50.134 255.255.255.252
R2(config-if)# no shutdown
```

![Topología con respaldo](img/07-10-topologia-respaldo.png)

#### Rutas flotantes

```text
R1(config)# ip route 192.168.50.112 255.255.255.240 192.168.50.134 200
R2(config)# ip route 0.0.0.0 0.0.0.0 192.168.50.133 200
```

El `200` es la distancia administrativa (AD). Las rutas estáticas tienen AD 1 por defecto, así que la ruta principal gana siempre. La de AD 200 queda guardada sin aparecer en la tabla, y solo entra si la principal desaparece. Para mí fue lo que más me costó entender, y lo escribo así para no olvidarlo: **número más bajo, más prioridad; número más alto, respaldo**.

![R1 con ruta primaria activa](img/07-11-r1-ruta-primaria.png)

#### Failover

Apagué R1 Gi0/1 para simular la caída del enlace principal:

```text
R1(config)# interface gi0/1
R1(config-if)# shutdown
R1# show ip route
```

![Failover en R1](img/07-12-r1-failover.png)

En `show ip route` ahora aparece `[200/0] via 192.168.50.134`. Con `tracert` desde PC1 a PC6 comprobé que el salto intermedio cambió de `.130` a `.134`:

```text
C:\>tracert 192.168.50.120
  1   192.168.50.1
  2   192.168.50.134
  3   192.168.50.120
```

![Tracert con failover](img/07-13-tracert-failover.png)

> **Fallo de tecleo que no era de la ruta:** al hacer el ping de comprobación escribí `192.168.20.120` en lugar de `192.168.50.120`. R1 devolvió `Destination host unreachable` porque esa red no existe en mi plan. Perdí tiempo pensando que el failover no funcionaba, cuando el tracert ya demostraba que sí.

![Ping con IP mal escrita](img/07-14-ping-failover-ok.png)

Después restauré el enlace principal con `no shutdown` y comprobé que la ruta volvía a ser la de AD 1:

![R1 restaurada](img/07-15-r1-restaurada.png)

---

### Fase 6 · Troubleshooting (romper y reparar)

#### Fallo 1 · Máscara `/24` en la ruta de R1

Cambié la ruta primaria de R1 por una `/24`:

```text
R1(config)# no ip route 192.168.50.112 255.255.255.240 192.168.50.130
R1(config)# ip route 192.168.50.0 255.255.255.0 192.168.50.130
R1# ping 192.168.50.200
```

> **Evidencia pendiente:** la captura `07-16-fallo-mascara-bucle.png` no está en la carpeta de evidencias disponible.

Salió `Time to live exceeded`. Sé que la ruta `/24` manda ese paquete a R2 y que R2 lo devuelve a R1 por su ruta por defecto, pero **no llegué a entender del todo por qué acaba en bucle hasta que el TTL llega a cero**. Lo dejo como punto pendiente (ver más abajo).

Lo reparé volviendo a poner la ruta `/28`.

#### Fallo 2 · Siguiente salto inalcanzable

Puse como siguiente salto `192.168.50.99`, que no está en ninguna red conectada:

```text
R1(config)# ip route 192.168.50.112 255.255.255.240 192.168.50.99
R1# show ip route
R1# show running-config | include ip route
```

![Fallo siguiente salto](img/07-17-fallo-siguiente-salto.png)

La ruta sí aparecía en `show running-config`, pero no en `show ip route`. El ping seguía funcionando, porque la ruta de respaldo (AD 200) tomaba el relevo. Eso me pareció un fallo peligroso: el error está ahí, pero no se nota hasta que cae el enlace principal.

#### Fallo 3 · Respaldo con la misma AD

Quité la AD 200 a la ruta de respaldo:

```text
R1(config)# no ip route 192.168.50.112 255.255.255.240 192.168.50.134 200
R1(config)# ip route 192.168.50.112 255.255.255.240 192.168.50.134
R1# show ip route
```

![Balanceo en show ip route](img/07-18-fallo-balanceo.png)

Ahora `show ip route` muestra dos rutas activas a la sucursal, una vía `.130` y otra vía `.134`, ambas con `[1/0]`. Eso es balanceo de carga: el tráfico se reparte entre los dos enlaces. En cambio, con AD 200 la ruta de respaldo no aparece en la tabla y solo entra si cae la principal. Esa diferencia se ve directamente en `show ip route`.

---


### Estado final guardado

La configuración final conserva la ruta principal y la ruta flotante en R1. La topología termina con los dos enlaces entre R1 y R2 operativos.

![Configuración final de las rutas estáticas de R1](img/07-19-r1-rutas-config.png)

![Topología final del laboratorio](img/07-20-topologia-final.png)

## ❌ Mis fallos y dificultades (y qué aprendí)

| Fallo / Incidencia | Qué pasó | Causa y qué aprendí |
|---|---|---|
| **Entender la ruta por defecto** | Tardé unos 30 minutos en entender por qué `0.0.0.0 0.0.0.0` es "todo lo que no conozco". | Es la ruta de último recurso. Sin ella, R2 no sabe qué hacer con cualquier destino fuera de su LAN y su enlace. |
| **Interfaz de salida frente a siguiente salto** | Predije que daba lo mismo y no era así. | En un enlace punto a punto funciona; en una LAN con muchos equipos puede saturar el segmento por ARP. Lo entendí gracias al aviso de IOS. |
| **Ruta con IP mal escrita (`19`)** | Escribí `ip route ... 19` en lugar de la IP completa y IOS respondió `%No matching route to delete`. | Antes de pulsar Enter tengo que leer el comando completo. El mensaje `No matching route` indica que la ruta que intentas borrar no existe. |
| **No entender el `200`** | No sabía por qué ponía 200 en la ruta de respaldo. | Es la distancia administrativa. Número más bajo, más prioridad. La ruta de AD 200 queda en reserva. |
| **Ping con IP mal escrita** | Escribí `192.168.20.120` en vez de `192.168.50.120` y me salió `Destination host unreachable`. | Antes de pensar que la ruta falla, compruebo que la IP escrita es la correcta. Un error de tecleo se parece mucho a un fallo de configuración. |
| **Etiquetas de Packet Tracer** | Tuve que corregir varias etiquetas: el `/30` tapado, PC6 con la IP equivocada y gateways mal escritas. | Todavía no tengo soltura con Packet Tracer y lo hago todo desordenado. Antes de hacer capturas, reviso las etiquetas una a una. |
| **Packet Tracer y mensajes de error** | No recuerdo el mensaje exacto que me dio un comando. | Tengo que copiar el mensaje completo en el README en vez de confiar en la memoria. |

---

## ✅ Mis aciertos

- Escribí el plan de rutas en papel antes de tocar la CLI.
- Usé `tracert` para comprobar el failover en vez de fiarme solo del ping.
- Comprobé cada cambio con `show ip route` y `show running-config | include ip route`.
- Identifiqué la diferencia entre balanceo y respaldo mirando la tabla de rutas.

---

## 🧠 Aprendizajes clave

1. **La ruta por defecto es la de último recurso:** `0.0.0.0 0.0.0.0` cubre todo lo que el router no conoce. Por eso R2 la necesita para llegar a R1.
2. **Siguiente salto o interfaz de salida:** la diferencia no es el tráfico, es cómo el router resuelve el siguiente paso. En un `/30` la interfaz basta. En una LAN con varios equipos, el siguiente salto es más seguro.
3. **La ruta resumen también engloba redes conectadas:** el `/25` incluye la LAN de la sucursal, pero la ruta conectada `/28` gana por ser más específica.
4. **AD baja gana, AD alta espera:** la ruta flotante con AD 200 no aparece en `show ip route` hasta que cae la principal.
5. **Balanceo y respaldo se ven distintos:** con dos rutas con la misma AD, ambas aparecen activas. Con AD distinta, solo aparece la de menor AD.
6. **Una ruta configurada no es una ruta activa:** el fallo con el siguiente salto `.99` solo se ve en `show running-config`, no en `show ip route`.
7. **Verificar con tracert es mejor que fiarse de un ping:** el tracert muestra qué camino sigue el tráfico, y el ping solo dice si llega o no.

---

## 📝 Pendientes de repaso

- **El bucle del Fallo 1 y el `Time to live exceeded`:** entiendo que el paquete va de R1 a R2 y de vuelta por la ruta por defecto, pero no lo tengo del todo claro hasta que el TTL llega a cero. Lo repasaré antes de seguir con OSPF.
- **El mensaje exacto de IOS en el Fallo 2 y en la ruta con IP incorrecta:** no lo he copiado en el README. Lo añadiré en la siguiente sesión.
- **Soltura con Packet Tracer:** la organización de las etiquetas me sigue costando mucho tiempo.

---

## 📋 Comandos de referencia rápida

| Objetivo | Dispositivo | Comando |
|---|---|---|
| Ruta con siguiente salto | Router | `ip route <red> <máscara> <next-hop>` |
| Ruta con interfaz de salida | Router | `ip route <red> <máscara> <interfaz>` |
| Ruta por defecto | Router | `ip route 0.0.0.0 0.0.0.0 <next-hop>` |
| Ruta flotante (respaldo) | Router | `ip route <red> <máscara> <next-hop> <AD>` |
| Ver tabla de rutas | Router | `show ip route` |
| Ver solo rutas estáticas | Router | `show ip route static` |
| Ver rutas configuradas | Router | `show running-config \| include ip route` |
| Ver camino del tráfico | PC | `tracert <ip>` |
| Eliminar una ruta | Router | `no ip route <red> <máscara> <next-hop>` |
| Guardar configuración | Cualquiera | `copy running-config startup-config` |

---

## ➡️ Siguiente paso

Con las rutas estáticas y el respaldo funcionando, el siguiente paso natural es **OSPF**, para que los routers aprendan las redes solos y no tenga que escribirlas a mano. Lo dejé pendiente en el Lab 03 y ahora tiene sentido, porque aquí ya he visto lo que cuesta mantener rutas estáticas en varios enlaces.

---

*José María Aparicio Portillo · [GitHub](https://github.com/anudoranador87) · [LinkedIn](https://linkedin.com/in/joseaparicio87)*
