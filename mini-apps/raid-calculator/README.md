# RAID Calculator

> Mini app built while studying the **Storage Devices** domain of the CompTIA A+ certification.
> Mini-aplicación construida mientras estudiaba el dominio de **Dispositivos de Almacenamiento** de la certificación CompTIA A+.

🔗 Live demo: *[https://codepen.io/Jose-Aparicio-the-encoder/pen/zxNopvV]*

---

## 🇬🇧 English

### What it does
A vanilla JavaScript calculator that, given a number of drives, a drive size, a unit, and a RAID level, returns:
- Total raw space
- Usable space
- Fault tolerance (how many drives can fail)
- Storage efficiency (%)
- A plain-language description of how that RAID level works
- A visual row of disks representing the array

### Why I built it
I kept getting RAID levels confused when studying for CompTIA A+ — specifically *why* RAID 5 only loses one drive's worth of capacity, or *why* RAID 10 needs an even number of drives. Reading the theory wasn't enough, so I built a small tool that forces me to encode the actual math for each level (0, 1, 5, 6, 10). Writing the logic made the trade-offs click in a way memorizing a table never did.

### RAID levels supported
| Level | Usable space | Fault tolerance |
|---|---|---|
| 0 | num × size | 0 drives |
| 1 | size | num − 1 drives |
| 5 | (num − 1) × size | 1 drive |
| 6 | (num − 2) × size | 2 drives |
| 10 | (num / 2) × size | 1 drive |

### Tech stack
- HTML / CSS
- Vanilla JavaScript (no frameworks — DOM manipulation, dynamic element creation, event listeners)

### Concepts practiced
- Separating business logic (`calcular()`) from UI updates (`actualizar()`)
- `switch` statements for branching logic, including a `default` fallback
- `addEventListener` with `input` (live feedback on number fields) vs `change` (for selects)
- Dynamically building DOM nodes with `createElement` / `classList` / `appendChild` (`pintarDiscos()`)
- Running the render function once on load so the UI isn't empty before the first user interaction

### Known limitations / next steps
- No input validation yet for RAID 10 (requires an even number of drives)
- Empty or invalid number inputs currently produce `NaN%` in the efficiency field instead of a friendly message
- The RAID level is currently checked in two separate `switch` statements (one in `calcular()` for the math, one in `actualizar()` for the description text) — candidate for refactor into a single source of truth (e.g. a lookup object) so adding a new RAID level only requires one change

---

## 🇪🇸 Español

### Qué hace
Un calculador en JavaScript puro que, a partir del número de discos, el tamaño de cada disco, una unidad y el nivel RAID, devuelve:
- Espacio bruto total
- Espacio útil
- Tolerancia a fallos (cuántos discos pueden fallar)
- Eficiencia de almacenamiento (%)
- Una descripción en lenguaje claro de cómo funciona ese nivel RAID
- Una fila visual de discos representando el array

### Por qué lo construí
Me costaba diferenciar los niveles RAID estudiando para CompTIA A+ — sobre todo entender *por qué* RAID 5 solo pierde la capacidad de un disco, o *por qué* RAID 10 necesita un número par de discos. Leer la teoría no era suficiente, así que construí una herramienta pequeña que me obliga a codificar las matemáticas reales de cada nivel (0, 1, 5, 6, 10). Escribir la lógica hizo que las compensaciones de cada nivel encajaran de una forma que memorizar una tabla nunca consiguió.

### Niveles RAID soportados
| Nivel | Espacio útil | Tolerancia a fallos |
|---|---|---|
| 0 | num × tamaño | 0 discos |
| 1 | tamaño | num − 1 discos |
| 5 | (num − 1) × tamaño | 1 disco |
| 6 | (num − 2) × tamaño | 2 discos |
| 10 | (num / 2) × tamaño | 1 disco |

### Stack técnico
- HTML / CSS
- JavaScript puro (sin frameworks — manipulación del DOM, creación dinámica de elementos, event listeners)

### Conceptos practicados
- Separar la lógica de negocio (`calcular()`) de la actualización de la UI (`actualizar()`)
- Sentencias `switch` para lógica condicional, incluyendo un caso `default` de respaldo
- `addEventListener` con `input` (feedback en vivo en los campos numéricos) frente a `change` (para los selects)
- Construcción dinámica de nodos del DOM con `createElement` / `classList` / `appendChild` (`pintarDiscos()`)
- Ejecutar la función de render una vez al cargar la página, para que la UI no esté vacía antes de la primera interacción

### Limitaciones conocidas / próximos pasos
- Todavía no hay validación para RAID 10 (requiere número par de discos)
- Los inputs numéricos vacíos o inválidos producen actualmente `NaN%` en el campo de eficiencia, en vez de un mensaje claro
- El nivel RAID se comprueba ahora mismo en dos sentencias `switch` separadas (una en `calcular()` para las matemáticas, otra en `actualizar()` para el texto de descripción) — candidato a refactor hacia una única fuente de verdad (ej. un objeto de búsqueda), para que añadir un nuevo nivel RAID solo requiera un cambio
