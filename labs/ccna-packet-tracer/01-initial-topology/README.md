# Lab 1: Topología inicial (CCNA · Jeremy's IT Lab, Día 1)

Primer laboratorio de mi preparación del CCNA con Cisco Packet Tracer. El objetivo es reproducir un diagrama de red completo **sin configurar ningún dispositivo**, practicando el manejo del programa: elegir el modelo correcto de cada equipo, nombrarlos, cablearlos y organizar el diagrama.

## Objetivo

Reproducir en Packet Tracer el diagrama de red de dos sedes (Nueva York y Tokio) conectadas a través de Internet, con un portátil que representa una amenaza externa conectada a Internet.

## Boceto previo

Antes de abrir Packet Tracer dibujé un boceto conceptual a mano para entender la topología.

![Boceto conceptual](./screenshots/conceptual-topology-sketch.png)

## Topología

- **Nueva York:** PC1, PC2, SRV1 y SRV2 → SW1 → R1 → FW1 → Nube Internet
- **Tokio:** Nube Internet → FW2 → R2 → SW2
- **Atacante:** portátil conectado directamente a la nube Internet

![Topología final](./screenshots/topologia-final.png.webp)

## Material

| Cantidad | Dispositivo | Modelo |
|---|---|---|
| 2 | Routers (R1, R2) | Cisco 2911 |
| 2 | Switches (SW1, SW2) | Catalyst 2960 |
| 2 | Firewalls (FW1, FW2) | ASA 5505 |
| 2 | PCs (PC1, PC2) | PC-PT |
| 2 | Servidores (SRV1, SRV2) | Server-PT |
| 1 | Portátil (Atacante) | Laptop-PT |
| 1 | Nube Internet | Cloud-PT-Empty |

## Pasos

1. Activar las etiquetas de los dispositivos y subir el tamaño de fuente (Options > Preferences).
2. Elegir la categoría y el modelo de cada dispositivo.
3. Renombrar los equipos: PC1, PC2, SW1, R1, FW1, R2, FW2, SW2, SRV1, SRV2 y Atacante.
4. Conectar los equipos con la opción de conexión automática (*Automatically Choose Connection Type*).
5. Marcar las dos zonas con elipses y notas de texto (NUEVA YORK y TOKIO).
6. Comprobar que todos los enlaces del diagrama están conectados.

## Dificultades y solución

**1. La nube solo tenía un puerto.**  
La nube Cloud-PT trae un único puerto Ethernet de serie y FW1 ya lo ocupaba, así que no dejaba conectar FW2 ni el Atacante. Lo resolví usando una **Cloud-PT-Empty**: la apagué, le añadí tres módulos Ethernet (uno para FW1, otro para FW2 y otro para el Atacante) y la volví a encender.

**2. Modelo de router equivocado.**  
Empecé con un router 1941, pero el enunciado pedía un **2911**. Lo sustituí por el modelo correcto.

**3. Enlaces en rojo.**  
Varios enlaces aparecen con triángulos rojos. Es el comportamiento esperado: los puertos de routers y firewalls están apagados por defecto y este laboratorio no incluye configuración.

**4. Marcar las zonas.**  
Me costó encontrar cómo etiquetar Nueva York y Tokio. Lo resolví dibujando elipses con la herramienta de formas y añadiendo el texto con *Place Note*.

**5. Diferencia entre mis apuntes y el boceto.**  
Mis apuntes escribían la parte de Tokio como "Internet → R2 → FW2 → SW2", pero el boceto dibuja FW2 delante de R2. Seguí el boceto: Nube → FW2 → R2 → SW2.

## Qué aprendí

- Cada modelo de dispositivo tiene sus propios puertos y módulos, y hay que elegirlos con cuidado desde el principio.
- Los puertos de routers y firewalls están apagados por defecto; los enlaces en rojo no siempre son un error.
- La nube de Packet Tracer necesita módulos añadidos cuando hay que conectar varios equipos.

## Archivos

- `Lab1_Topologia_Inicial.pkt`: archivo de Packet Tracer
- `screenshots/topologia-final.png.webp`: captura de la topología terminada
- `screenshots/conceptual-topology-sketch.png`: boceto previo hecho a mano
