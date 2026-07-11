# Bits & Bytes — Course 2 Module 1: Glosario

## Conceptos Base

| Término | Definición rápida |
|---------|-------------------|
| **Bit** | Unidad mínima de datos (0 ó 1) |
| **Protocolo** | Conjunto de reglas que los dispositivos deben seguir para comunicarse |
| **Nodo** | Cualquier dispositivo conectado a una red (actúa como cliente o servidor) |
| **Cliente** | Dispositivo que recibe datos de un servidor |
| **Servidor** | Dispositivo que proporciona datos a quien los solicita |

---

## Cables

| Tipo | Medio | Característica clave |
|------|-------|----------------------|
| **Par trenzado (Twisted pair)** | Cobre | El más común. Pares de hilos retorcidos para reducir interferencias |
| **Cable coaxial** | Cobre | Categorías: Cat5, Cat5e, Cat6 |
| **Fibra óptica** | Luz | Usa pulsos de luz en lugar de voltaje eléctrico |

- **Crosstalk** → interferencia entre cables de cobre adyacentes
- **Categorías de cable** → agrupación por material y velocidad

---

## Capa 1 — Física

- Representa los dispositivos físicos que interconectan ordenadores
- **Modulación** → variar el voltaje en un cable de cobre para representar datos
- **Line coding** → modulación usada en redes de ordenadores
- **Duplex completo (Full duplex)** → envía y recibe al mismo tiempo
- **Half duplex** → solo una dirección a la vez
- **Simplex** → solo una dirección, siempre

**Dispositivos:**
- **Hub** → dispositivo de Capa 1. Manda datos a *todos* los dispositivos conectados (broadcast)
- **Patch panel** → panel con muchos puertos de red físicos
- **Puerto de red** → conector físico para conectar un dispositivo a la red

---

## Capa 2 — Enlace de Datos (Data Link)

Primera capa con protocolos. Define cómo interpretar señales para que los dispositivos se comuniquen.

### Ethernet

Protocolo más usado para enviar datos entre dispositivos en la misma red.

**Trama Ethernet (Ethernet Frame):**

```
| Preámbulo | SFD | MAC Destino | MAC Origen | EtherType | (VLAN) | Payload | FCS |
```

| Campo | Tamaño | Función |
|-------|--------|---------|
| Preámbulo | 8 bytes | Sincronización. Avisa que llega una trama |
| SFD (Start Frame Delimiter) | Último byte del preámbulo | Señal de que empieza el frame real |
| MAC Destino | 6 bytes | A quién va dirigido |
| MAC Origen | 6 bytes | Quién lo envía |
| EtherType | 2 bytes (16 bits) | Describe el protocolo del contenido |
| VLAN Header | variable | Indica a qué VLAN lógica pertenece la trama |
| Payload | variable | Los datos reales (todo lo que no es cabecera) |
| FCS | 4 bytes (32 bits) | Checksum para detectar errores (CRC) |

### MAC Address

- Identificador único global de cada interfaz de red
- **48 bits** → 6 grupos de 2 dígitos hexadecimales
- Ejemplo: `00:1A:2B:3C:4D:5E`
- **OUI** (Organizationally Unique Identifier) → primeros 3 octetos (identifica al fabricante)
- **Octet** → cualquier número representable en 8 bits

### Tipos de transmisión

| Tipo | Descripción |
|------|-------------|
| **Unicast** | Solo para un destinatario |
| **Broadcast** | Para todos los dispositivos de la LAN. MAC: `FF:FF:FF:FF:FF:FF` |
| **Multicast** | Grupo de dispositivos. Bit menos significativo del primer octeto = 1 |

### Detección de errores

- **CRC (Cyclical Redundancy Check)** → transformación matemática (división polinomial) que genera un número que representa el frame completo
- **FCS** → almacena ese número. Si no coincide al recibir → trama descartada

### Switch (Network Switch)

- Dispositivo de **Capa 2**
- Inspecciona el contenido Ethernet, identifica el destino y envía solo a ese dispositivo
- Aprende MACs y las guarda en su tabla → reduce colisiones
- Cada puerto = dominio de colisión propio

**vs Hub:**
- Hub → dominio de colisión global (todos compiten)
- Switch → un dominio por puerto

### CSMA/CD

*Carrier-Sense Multiple Access with Collision Detection*

Determina cuándo el canal está libre y el dispositivo puede transmitir.

---

## Capa 3 — Red (Network Layer)

Permite que redes distintas se comuniquen entre sí.

- **Protocolo principal:** IP (Internet Protocol)
- **Dispositivo:** Router
- **Unidad:** Paquete (Data packet)
- **Router** → sabe cómo reenviar datos entre redes independientes
- **Internetwork** → colección de redes conectadas por routers (ej: Internet)
- **ISP** → empresa que proporciona conexión a Internet

---

## Capa 4 — Transporte

Decide qué programa cliente/servidor recibe los datos.

| Protocolo | Características |
|-----------|----------------|
| **TCP** | Requiere conexión establecida. Garantiza entrega. Confirmaciones (ACK) |
| **UDP** | Sin conexión. Sin ACK. Más rápido, acepta pérdidas (streaming) |

---

## Otros Conceptos

- **LAN** → red local donde múltiples dispositivos están conectados
- **VLAN** → múltiples LANs lógicas sobre el mismo equipo físico
- **BGP (Border Gateway Protocol)** → protocolo por el que los routers comparten información entre sí
- **Hexadecimal** → sistema numérico de base 16 (usado en MACs, colores, etc.)
- **Collision domain** → segmento de red donde solo un dispositivo puede comunicarse a la vez
- **Modelo OSI** → 7 capas: Física, Enlace, Red, Transporte, Sesión, Presentación, Aplicación
- **Modelo de 5 capas** → versión simplificada usada en este curso (sin Sesión ni Presentación)

---

## Claves de Examen

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué hace un Hub? | Broadcast a todos — Capa 1 |
| ¿Qué hace un Switch? | Unicast inteligente — Capa 2 |
| ¿Qué es el FCS? | Checksum al final de la trama (CRC) |
| ¿MAC de broadcast? | `FF:FF:FF:FF:FF:FF` |
| ¿Qué son los primeros 3 octetos de una MAC? | OUI — identifica al fabricante |
| ¿TCP vs UDP? | TCP = seguro + lento / UDP = rápido + pérdidas |
| ¿Qué es el payload? | Los datos reales (todo excepto cabeceras) |
| ¿Diferencia Full vs Half duplex? | Full = bidireccional simultáneo / Half = uno a la vez |
| ¿Qué protocolo enruta entre redes distintas? | IP — Capa 3 |
