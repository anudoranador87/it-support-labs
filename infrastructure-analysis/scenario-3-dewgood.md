# Escenario 3: Dewgood (Non-Profit)

## Contexto de la Organización
Dewgood es una organización sin ánimo de lucro con 50 empleados. Tienen un presupuesto limitado y una infraestructura muy centralizada en un único servidor que aloja todo (archivos, correo, web).

## Problemas Identificados
*   **Infraestructura Frágil:** Un solo servidor físico para múltiples servicios críticos. Si falla, la organización se detiene por completo.
*   **Backups Inseguros:** El respaldo depende de un disco externo que el administrador se lleva físicamente a casa. Es un proceso manual y propenso a errores humanos o pérdida del disco.
*   **Seguridad de Cuentas:** Las cuentas de empleados que dejan la organización no se desactivan, creando brechas de seguridad importantes.
*   **Soporte Ineficiente:** El sistema de tickets es tan complejo que nadie lo usa, y la documentación es inexistente o difícil de encontrar.
*   **Sitio Web Inestable:** Alojan su web en el mismo servidor local y nadie sabe cómo recuperarla cuando falla.

---

## Análisis y Mejoras Propuestas

### 1. Estandarización mediante Imágenes de Sistema
**Propuesta:** A pesar de comprar en tienda física, crear una imagen base configurada para desplegar rápidamente en cualquier equipo nuevo.
**Beneficio:** Ahorra tiempo en la instalación manual de software y garantiza que todos los equipos cumplan con los requisitos mínimos de seguridad.

### 2. Resiliencia de Infraestructura y Nube para ONGs
**Propuesta:** Implementar RAID en el servidor actual para proteger contra fallos de disco y aprovechar el programa "Microsoft for Nonprofits" para migrar correo y Teams a la nube de forma gratuita o a bajo coste.
**Beneficio:** Reduce la dependencia del servidor local y garantiza la comunicación interna sin costes elevados.

### 3. Higiene de Directorio Activo
**Propuesta:** Establecer un protocolo estricto de altas y bajas en Active Directory, asegurando la desactivación inmediata de cuentas al finalizar contratos.
**Beneficio:** Protege la información sensible de la organización y evita accesos no autorizados de ex-empleados.

### 4. Optimización del Soporte y Base de Conocimientos
**Propuesta:** Simplificar el sistema de tickets o cambiarlo por uno más intuitivo, y crear una Wiki interna con guías visuales para los problemas más comunes.
**Beneficio:** Reduce las interrupciones directas al administrador y empodera a los usuarios para resolver problemas básicos.

### 5. Profesionalización de Backups y Hosting Web
**Propuesta:** Automatizar copias de seguridad a un almacenamiento en la nube cifrado y mover el sitio web a un hosting externo (ej. GitHub Pages o un hosting compartido económico).
**Beneficio:** Elimina el riesgo del transporte físico de discos y asegura que la web siga online aunque el servidor de la oficina falle.
