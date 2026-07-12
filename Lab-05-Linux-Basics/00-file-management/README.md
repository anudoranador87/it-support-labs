# Lab 00 — Fundamentos de gestión de archivos en Linux

**Entorno:** Termux (Android)  
**Duración del video:** ~9:40 min  
**Objetivo:** Practicar el ciclo básico de creación, edición, verificación y organización de archivos desde terminal, como base de los labs de diagnóstico de sistema (Lab 01 en adelante).

---

## 🎬 Video Walkthrough

Puedes ver la resolución paso a paso de este laboratorio aquí:
[**Ver vídeo del laboratorio en YouTube**](https://youtu.be/qiBuNdF3TzM?is=Ak-Bcx61I6HoVrM0)

---

## Comandos ejecutados

### 1. Ubicación inicial

```bash
pwd
```
Confirma el directorio de trabajo antes de crear nada. En Termux devuelve algo como `/data/data/com.termux/files/home/Jose`.

### 2. Crear directorio de trabajo

```bash
mkdir lab00
ls
cd lab00
pwd
```
Se crea una carpeta aislada (`lab00`) para no mezclar archivos de prueba con el resto del home, y se entra en ella.

### 3. Crear el archivo

```bash
touch notas.txt
ls
```
`touch` reserva el archivo vacío antes de escribir contenido.

### 4. Editar con nano

```bash
nano notas.txt
```
Contenido escrito: `Primer archivo creado en linux`
Guardado con `Ctrl+O`, `Enter`, salida con `Ctrl+X`.

```bash
ls
cat notas.txt
```
Verificación del contenido tras guardar.

### 5. Añadir contenido con echo (con error real incluido)

**Primer intento (falló):**
```bash
echo "segunda linea añadida". >> notas.tx
```
```bash
cat notas.txt
```
El `cat` mostró que el archivo **no cambió** — solo seguía la primera línea. Causa: error de sintaxis en el comando (comilla de cierre mal colocada / nombre de archivo cortado como `notas.tx` en vez de `notas.txt`).

**Segundo intento (correcto):**
```bash
echo "segunda linea" >> notas.txt
cat notas.txt
```
Salida:
```
Primer archivo creado en linux
segunda linea
```

> **Nota de aprendizaje:** este fallo es más útil en el video que si todo hubiera salido a la primera — demuestra el hábito de **verificar siempre con `cat` después de cada operación**, que es lo que permitió detectar que el primer `echo` no había funcionado.

### 6. Organizar en subcarpeta

```bash
mkdir documentos
ls
mv notas.txt documentos/
ls
```
Se crea una carpeta de destino y se mueve el archivo dentro.

### 7. Verificación final

```bash
cd documentos
ls
cat notas.txt
```
Salida final confirmando que el archivo llegó íntegro (con las dos líneas) a su nueva ubicación:
```
Primer archivo creado en linux
segunda linea
```

---

## Conceptos demostrados

| Comando | Qué demuestra |
|---|---|
| `pwd` | Confirmar ubicación antes de operar |
| `mkdir` / `cd` | Crear y navegar directorios |
| `touch` | Crear archivo vacío |
| `nano` | Edición interactiva en terminal (flujo real sin GUI, como por SSH) |
| `cat` | Verificación de contenido — nunca se asume que una operación salió bien |
| `echo "texto" >> archivo` | Añadir contenido sin sobrescribir (vs `>` que sí sobrescribe) |
| `mv` | Organización de archivos por carpetas |

## Errores y resolución

Un `echo` con sintaxis incorrecta no añadió la línea al archivo. Se detectó comparando la salida esperada de `cat` contra la real, y se corrigió repitiendo el comando con la sintaxis correcta (`>>` apuntando al nombre de archivo completo). Documentado aquí en vez de recortado del video, siguiendo la misma lógica de la Bitácora: el error y su resolución también son parte del aprendizaje.

## Siguiente paso

Lab 01 — Diagnóstico de red (`check_network.sh`) y Lab 02 — Diagnóstico de disco/logs (`df`, `du`, `journalctl`, `lsof`, `ss -tulpn`).
