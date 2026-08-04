# IP Subnet Calculator

> Mini app built to master the **IP Addressing & Subnetting** domain of the CompTIA A+ certification.
> Mini-aplicación construida para dominar el dominio de **Direccionamiento IP y Subneteo** de la certificación CompTIA A+.

---

## 🇬🇧 English

### What it does
An interactive, vanilla JavaScript calculator that parses any IPv4 address and CIDR subnet prefix to output:
- **Network Address:** The base ID of the subnet.
- **Broadcast Address:** The target IP for subnet-wide transmissions.
- **Subnet Mask:** Convert CIDR (e.g. `/24`) to dotted-decimal format (`255.255.255.0`).
- **Usable Host Range:** The specific boundary of IPs that can be assigned to actual network interfaces.
- **Usable Host Count:** Dynamically calculates total hosts using the formula `2^(32-CIDR) - 2` (with special cases for `/31` P2P links and `/32` loopbacks).
- **IP Class & Scope:** Audits first octet rules to display IP Class (Class A, B, C, D, E) and matches private/public network scopes (APIPA ranges, Loopback, Private Intranet).
- **Interactive Binary Visualizer:** Groups the 32 bits of the IP and Mask into 4 distinct octets. Color-codes the bits dynamically: Blue for **Network Bits** and Orange for **Host Bits**. Sliding the CIDR bar dynamically changes the bit allocation!

### Why I built it
Subnetting is famously one of the most challenging parts of network configuration in the CompTIA A+ exam. I wanted to build a visual learning aid that explicitly shows how a subnet mask "splits" a 32-bit IP address into its Network (routing) and Host (device) portions. Coding the bit-masking arithmetic directly solidified my understanding of binary logic, CIDR values, and private IP boundaries.

### Tech Stack
- HTML5
- Vanilla CSS3 (Custom Variables, glassmorphism, responsive grids)
- Vanilla JavaScript (Bit shifting arithmetic, input validation regex, dynamic DOM node manipulation, dual-control synchronization)

---

## 🇪🇸 Español

### Qué hace
Una calculadora interactiva construida en JavaScript puro que procesa cualquier dirección IPv4 y prefijo de subred CIDR para calcular:
- **Dirección de Red:** El identificador base de la subred.
- **Dirección de Broadcast:** La IP de difusión para transmisiones en toda la subred.
- **Máscara de Subred:** Convierte el prefijo CIDR (ej. `/24`) a formato decimal punteado (`255.255.255.0`).
- **Rango de Hosts Útiles:** Las IPs asignables a dispositivos de red.
- **Hosts Utilizables:** Calcula el número total mediante la fórmula `2^(32-CIDR) - 2` (gestionando casos especiales para enlaces punto a punto `/31` y hosts individuales `/32`).
- **Clase e Información de Ámbito:** Clasifica la IP según su primer octeto (Clases A, B, C, D, E) e identifica si el rango es de carácter Público, Privado (intranet), de Bucle Local (Loopback) o Auto-configurado (APIPA).
- **Visualizador Binario Interactivo:** Divide las direcciones en 4 octetos binarios. Pinta en Azul los **Bits de Red** y en Naranja los **Bits de Host**. Al deslizar la barra CIDR, se observa en vivo cómo varía la asignación y máscara de bits.

### Por qué lo construí
El subneteo de direcciones es uno de los temas del examen CompTIA A+ Core 1 que más suele costar memorizar. Quería construir una herramienta visual interactiva que ilustrara gráficamente cómo la máscara "enmascara" los bits para dividir una IP en su porción de red (enrutamiento) y porción de host (dispositivo). Codificar la aritmética binaria reforzó mi dominio de las clases de red, las máscaras y las subredes.

### Stack Técnico
- HTML5
- CSS3 puro (Diseño glassmorphism, variables de diseño, rejillas adaptables)
- JavaScript puro (Aritmética binaria, expresiones regulares para validación de IP, sincronización de controles deslizantes y listas, manipulación dinámica del DOM)
