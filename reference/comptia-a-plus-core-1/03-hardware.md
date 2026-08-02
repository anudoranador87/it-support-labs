# Dominio 3 · Hardware (25%)
## 3.1 · Tipos de pantalla
<table header-row="true">
<tr>
<td>Panel</td>
<td>Fuerte</td>
<td>Débil</td>
</tr>
<tr>
<td>TN</td>
<td>Respuesta rápida, gaming</td>
<td>Ángulos de visión</td>
</tr>
<tr>
<td>IPS</td>
<td>Color excelente</td>
<td>Más caro</td>
</tr>
<tr>
<td>VA</td>
<td>Buen color y contraste</td>
<td>Respuesta más lenta que TN</td>
</tr>
<tr>
<td>OLED</td>
<td>Sin backlight, negros perfectos</td>
<td>Precio</td>
</tr>
<tr>
<td>Mini-LED</td>
<td>Muchas zonas de atenuación</td>
<td>Sigue siendo LCD</td>
</tr>
</table>
- **Touchscreen:** el digitizer responde al tacto.
- **Digitizer con stylus:** entrada gráfica precisa.
- **Backlight:** los LCD lo necesitan; algunos portátiles usan **inverter** (DC a AC).
- **Verificar backlight:** mirar de cerca o iluminar la pantalla con una linterna.
## 3.1 · Atributos de pantalla
- **Pixel density (PPI):** más densidad, más nitidez.
- **Resolution:** ancho × alto; 16:9 es lo habitual.
- **Refresh rate:** en Hz; cine 24, TV 30, juegos 60+.
- **Color gamut:** sRGB o Adobe RGB; OLED cubre más.
## 3.2 · Cables de red
- **Par trenzado:** el trenzado cancela la interferencia; cada par lleva un ritmo distinto.
- **Categorías:** definidas por IEEE 802.3; mínimo **Cat5e** para 1000BASE-T (Cat5 solo llega a 100 Mbit/s).
- **Coaxial:** RG-6 para televisión y cablemódem.
- **UTP vs STP:** sin blindaje vs blindado (U sin, S trenzado, F lámina).
- **Plenum:** cubierta FEP o PVC de bajo humo, obligatoria en espacios de aire.
### 📋 Categorías de cable de cobre
<table header-row="true">
<tr>
<td>Categoría</td>
<td>Velocidad</td>
<td>Distancia / nota</td>
</tr>
<tr>
<td>Cat5</td>
<td>100 Mbit/s</td>
<td>Fast Ethernet, obsoleto</td>
</tr>
<tr>
<td>Cat5e</td>
<td>1 Gbit/s</td>
<td>Mínimo real para Gigabit, 100 m</td>
</tr>
<tr>
<td>Cat6</td>
<td>1 Gbit/s (10 G a \~55 m)</td>
<td>100 m a 1 Gbit/s</td>
</tr>
<tr>
<td>Cat6a</td>
<td>10 Gbit/s</td>
<td>100 m; más grueso y rígido</td>
</tr>
<tr>
<td>Cat7 / Cat8</td>
<td>10–40 Gbit/s</td>
<td>Blindado; centros de datos, tramos cortos</td>
</tr>
</table>
> 🔴 **Trampa:** el cobre Ethernet tiene un límite de **100 m** por segmento; más allá hay que usar fibra o un dispositivo intermedio (switch/repetidor).

> 🟡 **T568A:** blanco/verde, verde, blanco/naranja, azul, blanco/azul, naranja, blanco/marrón, marrón.<br>**T568B:** blanco/naranja, naranja, blanco/verde, azul, blanco/azul, verde, blanco/marrón, marrón.

<table header-row="true">
<tr>
<td>Pin</td>
<td>T568A</td>
<td>T568B</td>
</tr>
<tr>
<td>1</td>
<td>Blanco/Verde</td>
<td>Blanco/Naranja</td>
</tr>
<tr>
<td>2</td>
<td>Verde</td>
<td>Naranja</td>
</tr>
<tr>
<td>3</td>
<td>Blanco/Naranja</td>
<td>Blanco/Verde</td>
</tr>
<tr>
<td>4</td>
<td>Azul</td>
<td>Azul</td>
</tr>
<tr>
<td>5</td>
<td>Blanco/Azul</td>
<td>Blanco/Azul</td>
</tr>
<tr>
<td>6</td>
<td>Naranja</td>
<td>Verde</td>
</tr>
<tr>
<td>7</td>
<td>Blanco/Marrón</td>
<td>Blanco/Marrón</td>
</tr>
<tr>
<td>8</td>
<td>Marrón</td>
<td>Marrón</td>
</tr>
</table>
> 🧠 **Truco mnemotécnico T568A vs T568B:** en **A**, el verde manda (pin 1 = blanco/verde). En **B**, el naranja manda (pin 1 = blanco/naranja). Solo se intercambian los pares naranja y verde; los pares azul y marrón **no cambian** entre A y B.

> 🧠 **Orden de colores T568B (pin 1→8):** Blanco-Naranja, Naranja, Blanco-Verde, Azul, Blanco-Azul, Verde, Blanco-Marrón, Marrón.<br>**Truco:** recita *"BN-N-BV-A-BA-V-BM-M"* en voz alta; para T568A solo intercambias los pares naranja↔verde (pines 1-2 con 3-6).

> 🔴 **Trampa:** ambos extremos deben usar el **mismo** estándar. Mezclar A y B **no** es un cable cruzado válido de gigabit.

## 3.2 · Fibra óptica
<table header-row="true">
<tr>
<td>Tipo</td>
<td>Fuente de luz</td>
<td>Alcance</td>
</tr>
<tr>
<td>Multimode</td>
<td>LED</td>
<td>Hasta \~2 km</td>
</tr>
<tr>
<td>Single-mode</td>
<td>Láser</td>
<td>Hasta \~100 km</td>
</tr>
</table>
- Sin señal de RF: inmune a interferencias y difícil de interceptar.
- **Conectores:** ST *Stick and Twist* · SC *Square Connector* · LC *Little Connector*, con clip.
### 📋 Velocidades USB y Thunderbolt
<table header-row="true">
<tr>
<td>Versión USB</td>
<td>Velocidad</td>
</tr>
<tr>
<td>1.1 Low Speed</td>
<td>1,5 Mbit/s</td>
</tr>
<tr>
<td>1.1 Full Speed</td>
<td>12 Mbit/s</td>
</tr>
<tr>
<td>2.0 Hi-Speed</td>
<td>**480 Mbit/s**</td>
</tr>
<tr>
<td>3.0 SuperSpeed</td>
<td>**5 Gbit/s**</td>
</tr>
<tr>
<td>3.1</td>
<td>10 Gbit/s</td>
</tr>
<tr>
<td>3.2</td>
<td>20 Gbit/s</td>
</tr>
</table>
<table header-row="true">
<tr>
<td>Thunderbolt</td>
<td>Conector</td>
<td>Velocidad</td>
</tr>
<tr>
<td>TB1</td>
<td>Mini DisplayPort</td>
<td>10 Gbit/s por canal</td>
</tr>
<tr>
<td>TB2</td>
<td>Mini DisplayPort</td>
<td>20 Gbit/s</td>
</tr>
<tr>
<td>TB3</td>
<td>USB-C</td>
<td>40 Gbit/s</td>
</tr>
<tr>
<td>TB4</td>
<td>USB-C</td>
<td>40 Gbit/s, doble 4K</td>
</tr>
</table>
- Cobre hasta 3 m, óptico hasta 60 m, cadena de 6 dispositivos.
- **DB-9 / RS-232:** puertos serie y de consola.
### 🔗 Empareja versión con velocidad — tapa la derecha y recita
<table header-row="true">
<tr>
<td>Versión</td>
<td>Velocidad</td>
</tr>
<tr>
<td>USB 2.0</td>
<td>480 Mbit/s</td>
</tr>
<tr>
<td>USB 3.0</td>
<td>5 Gbit/s</td>
</tr>
<tr>
<td>USB 3.1</td>
<td>10 Gbit/s</td>
</tr>
<tr>
<td>USB 3.2</td>
<td>20 Gbit/s</td>
</tr>
<tr>
<td>Thunderbolt 1/2</td>
<td>10-20 Gbit/s</td>
</tr>
<tr>
<td>Thunderbolt 3/4</td>
<td>40 Gbit/s</td>
</tr>
<tr>
<td>SATA 3.0</td>
<td>6 Gbit/s</td>
</tr>
</table>
## 3.2 · Cables de vídeo
<table header-row="true">
<tr>
<td>Interfaz</td>
<td>Audio</td>
<td>Nota</td>
</tr>
<tr>
<td>HDMI</td>
<td>Sí</td>
<td>Digital, 19 pines, \~20 m</td>
</tr>
<tr>
<td>DisplayPort</td>
<td>Sí</td>
<td>Paquetizado, compatible con HDMI y DVI</td>
</tr>
<tr>
<td>DVI</td>
<td>No</td>
<td>Single link 3,7 Gbit/s; dual link 7,4</td>
</tr>
<tr>
<td>VGA</td>
<td>No</td>
<td>Analógico, degrada a partir de 5–10 m</td>
</tr>
</table>
## 3.2 · Cables de almacenamiento
<table header-row="true">
<tr>
<td>Versión SATA</td>
<td>Velocidad</td>
<td>Nota</td>
</tr>
<tr>
<td>1.0</td>
<td>1,5 Gbit/s</td>
<td>Primera generación</td>
</tr>
<tr>
<td>2.0</td>
<td>3 Gbit/s</td>
<td>Duplica SATA 1</td>
</tr>
<tr>
<td>3.0</td>
<td>**6 Gbit/s**</td>
<td>\~600 MB/s útiles</td>
</tr>
<tr>
<td>3.2 Express</td>
<td>16 Gbit/s</td>
<td>Combina SATA y PCIe</td>
</tr>
<tr>
<td>eSATA</td>
<td>Según versión</td>
<td>Externo, conector distinto</td>
</tr>
</table>
> 🔴 **Trampas de conversión:** DVI-D y HDMI son eléctricamente compatibles, basta un adaptador. **VGA a DVI digital necesita un conversor activo**, no un adaptador.

## 3.2 · Conectores de cobre
<table header-row="true">
<tr>
<td>Conector</td>
<td>Uso</td>
</tr>
<tr>
<td>RJ11 (6P2C)</td>
<td>Teléfono y DSL</td>
</tr>
<tr>
<td>RJ45 (8P8C)</td>
<td>Ethernet</td>
</tr>
<tr>
<td>F-connector</td>
<td>Televisión y cablemódem, RG-6</td>
</tr>
<tr>
<td>Punchdown 110</td>
<td>Panel de parcheo</td>
</tr>
<tr>
<td>Molex</td>
<td>Alimentación de 4 pines, +12 V y +5 V</td>
</tr>
</table>
https://commons.wikimedia.org/wiki/Special:FilePath/Rjxx.jpg
## 3.3 · Memoria
<table header-row="true">
<tr>
<td>Generación</td>
<td>Punto clave</td>
</tr>
<tr>
<td>DDR3</td>
<td>Muesca y voltaje propios</td>
</tr>
<tr>
<td>DDR4</td>
<td>Más rápida, físicamente incompatible con DDR3</td>
</tr>
<tr>
<td>DDR5</td>
<td>Más ancho de banda, muesca distinta otra vez</td>
</tr>
</table>
https://commons.wikimedia.org/wiki/Special:FilePath/RAM_n.jpg
- **DIMM:** sobremesa, 64 bits de ancho · **SO-DIMM:** portátil, la mitad de ancho.
- **DRAM:** necesita refresco constante · **SDRAM:** sincronizada con el reloj del sistema.
- **Parity:** solo detecta · **ECC:** detecta **y corrige** al vuelo; servidores y sistemas críticos.
- **Multi-canal:** dual, triple o quad; los módulos deben coincidir. Se mide en MT/s.
> 🔴 **Trampa:** DDR3, DDR4 y DDR5 **no son compatibles entre sí**. Deben coincidir generación, placa y CPU.

## 3.3 · DDR4 vs DDR5 y ECC
<table header-row="true">
<tr>
<td>Característica</td>
<td>DDR4</td>
<td>DDR5</td>
</tr>
<tr>
<td>Voltaje</td>
<td>1,2 V</td>
<td>1,1 V (más eficiente)</td>
</tr>
<tr>
<td>Velocidad típica</td>
<td>2133–3200 MT/s</td>
<td>4800–8400+ MT/s</td>
</tr>
<tr>
<td>Canales por módulo</td>
<td>1 (64 bits)</td>
<td>2 subcanales (2×32 bits)</td>
</tr>
<tr>
<td>Gestión de energía (PMIC)</td>
<td>En la placa base</td>
<td>En el propio módulo</td>
</tr>
<tr>
<td>Muesca</td>
<td>Distinta a DDR3/DDR5</td>
<td>Distinta a DDR4</td>
</tr>
</table>
> 🟡 **ECC (Error-Correcting Code):** detecta y **corrige** errores de 1 bit al vuelo; se usa en servidores y estaciones críticas. Requiere placa y CPU compatibles. **Parity** solo detecta, no corrige.

> 🔴 **Trampa:** DDR4 y DDR5 tienen **muescas distintas** y **no** encajan en la misma ranura, aunque el módulo parezca entrar en el slot equivocado.

## 3.4 · Almacenamiento
<table header-row="true">
<tr>
<td>Tecnología</td>
<td>Clave</td>
</tr>
<tr>
<td>HDD</td>
<td>Magnético, platos giratorios, partes móviles</td>
</tr>
<tr>
<td>SSD</td>
<td>Memoria, sin partes móviles, muy rápido</td>
</tr>
<tr>
<td>M.2</td>
<td>**Formato físico**; llaves B, M o B+M</td>
</tr>
<tr>
<td>NVMe</td>
<td>**Protocolo** sobre PCIe, baja latencia</td>
</tr>
<tr>
<td>SATA/AHCI</td>
<td>Hasta \~600 MB/s, pensado para discos</td>
</tr>
<tr>
<td>SAS</td>
<td>Empresarial, hasta 22,5 Gbit/s</td>
</tr>
<tr>
<td>mSATA</td>
<td>Formato antiguo, sustituido por M.2</td>
</tr>
</table>
### 📋 Latencia rotacional por RPM
<table header-row="true">
<tr>
<td>RPM</td>
<td>Latencia rotacional media</td>
</tr>
<tr>
<td>15.000</td>
<td>2 ms</td>
</tr>
<tr>
<td>10.000</td>
<td>3 ms</td>
</tr>
<tr>
<td>7.200</td>
<td>4,16 ms</td>
</tr>
<tr>
<td>5.400</td>
<td>5,55 ms</td>
</tr>
</table>
> 🔴 **Trampa clásica:** **M.2 no garantiza NVMe.** Un M.2 puede funcionar con AHCI (SATA); hay que comprobar la documentación.

https://commons.wikimedia.org/wiki/Special:FilePath/MSATA_SATA_M.2_NVMeSSD.jpg
## 3.4 · RAID
### 📋 Niveles RAID
<table header-row="true">
<tr>
<td>Nivel</td>
<td>Mín. discos</td>
<td>Técnica</td>
<td>Tolera</td>
</tr>
<tr>
<td>RAID 0</td>
<td>2</td>
<td>Striping</td>
<td>0 fallos</td>
</tr>
<tr>
<td>RAID 1</td>
<td>2</td>
<td>Mirroring</td>
<td>1 disco por espejo</td>
</tr>
<tr>
<td>RAID 5</td>
<td>3</td>
<td>Striping con paridad</td>
<td>1 fallo</td>
</tr>
<tr>
<td>RAID 6</td>
<td>4</td>
<td>Doble paridad</td>
<td>2 fallos</td>
</tr>
<tr>
<td>RAID 10</td>
<td>4</td>
<td>Stripe de espejos</td>
<td>Según qué discos fallen</td>
</tr>
</table>
https://commons.wikimedia.org/wiki/Special:FilePath/RAID_MATRIX.png
> 🧠 **Mnemotecnia RAID:**<br>• **RAID 0** = Zero protection (0 fallos tolerados).<br>• **RAID 1** = One copy (1 espejo).<br>• **RAID 5** = Five letters, 3 discos mínimo, 1 fallo tolerado.<br>• **RAID 6** = Six letters, 4 discos, 2 fallos tolerados.<br>• **RAID 10** = 1+0 = stripe de espejos: velocidad + redundancia.

> 🔴 **RAID NO ES BACKUP.** No protege de borrado accidental, malware, incendio ni corrupción replicada.

## 3.5 · Placas base y expansión
<table header-row="true">
<tr>
<td>Formato</td>
<td>Uso</td>
</tr>
<tr>
<td>ATX</td>
<td>Tamaño completo, gaming y workstation</td>
</tr>
<tr>
<td>microATX</td>
<td>Equilibrio entre tamaño y expansión</td>
</tr>
<tr>
<td>Mini-ITX</td>
<td>Thin clients y equipos de bajo consumo</td>
</tr>
</table>
https://commons.wikimedia.org/wiki/Special:FilePath/VIA_Mini-ITX_Form_Factor_Comparison.jpg
- **PCI:** heredado, paralelo, 32 y 64 bits.
- **PCIe:** serie, full-duplex, líneas x1, x2, x4, x8, x16 y x32.
- **Alimentación:** 24 pines (antes 20) con +3,3 V, ±5 V y ±12 V.
- **PCIe 6 pines = 75 W · PCIe 8 pines = 150 W.** Los cables 6+2 sirven para ambos.
- **Placas de servidor:** multisocket, muchas ranuras de memoria y expansión.
https://commons.wikimedia.org/wiki/Special:FilePath/PCIExpress.jpg
## 3.5 · BIOS y UEFI
- **BIOS:** firmware que inicializa CPU y memoria, ejecuta **POST** y busca el bootloader.
- **Legacy BIOS:** limitado, sin drivers modernos.
- **UEFI:** sustituto moderno, gráfico, necesario en equipos actuales.
- **Acceso:** Del, F1, F2, Ctrl-S; Fast Startup puede impedirlo, usa Shift + Reiniciar.
- **Secure Boot:** firma digital del bootloader; sin firma válida no arranca.
- **CMOS:** guarda la configuración, alimentada por pila; se resetea con un jumper.
- **Contraseñas:** de usuario impide arrancar; de supervisor impide cambiar el BIOS.
- **Extras:** soporte de virtualización (Intel VT / AMD-V), control de ventiladores y sensores.
## 3.5 · TPM, HSM y CPU
<table header-row="true">
<tr>
<td></td>
<td>TPM</td>
<td>HSM</td>
</tr>
<tr>
<td>Alcance</td>
<td>**Un** dispositivo</td>
<td>**Muchos** sistemas</td>
</tr>
<tr>
<td>Formato</td>
<td>Integrado en la placa</td>
<td>Tarjeta o appliance</td>
</tr>
<tr>
<td>Clave</td>
<td>Única y no exportable</td>
<td>Solo el HSM la conoce</td>
</tr>
</table>
- **32 bits:** hasta 4 GB de RAM · **64 bits:** un SO de 64 bits ejecuta apps de 32, no al revés.
- **ARM:** RISC, eficiente, poco calor · **x86:** Intel y AMD, escritorio y servidor.
- **Núcleos:** cada core tiene su caché; el chip puede tener caché compartida.
## 3.5 · Tarjetas de expansión y refrigeración
- **Tipos:** sonido, vídeo con GPU discreta, captura y NIC.
- **Instalación:** revisa la documentación, descarga drivers, desinstala los antiguos y verifica en el Administrador de dispositivos.
- **Ventiladores:** cuida el flujo de aire; tamaños de 80, 120 o 200 mm.
- **Heatsink:** disipa por conducción, cobre o aluminio; **se calienta mucho**.
- **Pasta térmica:** cantidad del tamaño de un guisante · **pad térmico:** no reutilizable.
- **Fanless:** silencioso, para equipos de bajo consumo · **liquid cooling:** gaming y overclocking.
## 3.6 · Alimentación
<table header-row="true">
<tr>
<td>Raíl</td>
<td>Se usa para</td>
</tr>
<tr>
<td>+12 V</td>
<td>PCIe, motores de disco y ventiladores</td>
</tr>
<tr>
<td>+5 V</td>
<td>Componentes de placa heredados</td>
</tr>
<tr>
<td>+3,3 V</td>
<td>Ranuras M.2 y RAM, lógica de placa</td>
</tr>
<tr>
<td>+5VSB</td>
<td>Voltaje de espera</td>
</tr>
<tr>
<td>−12 V</td>
<td>LAN integrada y puertos serie antiguos</td>
</tr>
</table>
- Convierte 120 V o 240 V AC a 3,3, 5 y 12 V DC.
- **Regla del 50%:** dimensiona la PSU con margen; la GPU es el mayor consumo.
- **Eficiencia:** 80–96%; menos calor y menos gasto.
- **PSU redundante:** hot-swap, cada una asume el 100%.
> 🟡 **Regla del 50%:** nunca cargues una PSU más allá del 50% de su capacidad nominal en uso continuo — así tienes margen para picos y alargas su vida útil.

> 🔴 **Seguridad eléctrica:** desconecta siempre la alimentación, descarga los condensadores y **nunca** conectes tu cuerpo al sistema ni al cable de tierra.

## 3.6 · Cálculo de vatios de la PSU
**Cómo dimensionar la fuente:** suma el consumo de los componentes y añade margen.
<table header-row="true">
<tr>
<td>Componente</td>
<td>Consumo orientativo</td>
</tr>
<tr>
<td>CPU</td>
<td>65–150 W (según TDP)</td>
</tr>
<tr>
<td>GPU discreta</td>
<td>75–350 W (el mayor consumo)</td>
</tr>
<tr>
<td>Placa base</td>
<td>25–80 W</td>
</tr>
<tr>
<td>Cada módulo de RAM</td>
<td>\~3–5 W</td>
</tr>
<tr>
<td>Cada disco/SSD</td>
<td>\~5–10 W</td>
</tr>
<tr>
<td>Ventiladores/RGB</td>
<td>\~5 W cada uno</td>
</tr>
</table>
> 🟡 **Regla práctica:** suma todo y aplica un **margen del 30–50%**. Ejemplo: 400 W estimados → PSU de **600–650 W**. Así trabajas cerca del 50% de carga (máxima eficiencia) y dejas sitio para picos y ampliaciones.

## 3.7 · Dispositivos multifunción
- **Componentes:** impresora, escáner, fax y conexión de red o teléfono.
- **Lenguajes:** **PCL** de HP y **PostScript** de Adobe; el driver debe coincidir.
- **Drivers y firmware:** específicos del modelo; 32 y 64 bits no son intercambiables.
- **Conexión:** USB tipo B al equipo, RJ45, Bluetooth o 802.11.
- **Printer share vs print server:** compartida desde un PC vs cola gestionada en la impresora.
- **Configuración:** duplex, orientación, definición de bandejas.
- **Seguridad:** autenticación de usuario, badging, registros y **secured print** con código.
- **Escaneo:** a correo, a carpeta por SMB o a la nube; ADF para varias páginas.
## 3.8 · Impresoras
<table header-row="true">
<tr>
<td>Tipo</td>
<td>Consumible</td>
<td>Uso</td>
<td>Fallo típico</td>
</tr>
<tr>
<td>Láser</td>
<td>Tóner, OPC, fusor</td>
<td>Oficina, alto volumen</td>
<td>Líneas = tambor rayado</td>
</tr>
<tr>
<td>Inkjet</td>
<td>Tinta CMYK, cabezal</td>
<td>Color y foto</td>
<td>Boquillas obstruidas</td>
</tr>
<tr>
<td>Térmica</td>
<td>Papel térmico</td>
<td>Recibos</td>
<td>Elemento térmico sucio</td>
</tr>
<tr>
<td>Impacto</td>
<td>Cinta y agujas</td>
<td>Copias multiparte</td>
<td>Cinta gastada, mucho ruido</td>
</tr>
</table>
> 🟡 **Proceso láser:** Processing → Charging → Exposing → Developing → Transferring → Fusing → Cleaning.<br>Mnemotecnia: *Please Come Every Day To Fetch Coffee*.

https://commons.wikimedia.org/wiki/Special:FilePath/Laser_printer_%28cutaway_diagram%29.jpg
> 🟢 **Mantenimiento correcto:** kit de mantenimiento según el contador de páginas y **reinicia el contador** al terminar. Limpia con agua o alcohol isopropílico. Apaga la impresora antes de tocar el fusor.

> 🔴 **Peligros:** el **fusor está muy caliente**, el **tambor OPC es sensible a la luz**, y **no** se usa aspiradora normal ni aire comprimido dentro de una láser. El papel térmico no admite sustitutos.

### 🖨️ Impresoras 3D
<table header-row="true">
<tr>
<td>Tecnología</td>
<td>Consumible</td>
<td>Cómo funciona</td>
</tr>
<tr>
<td>FDM (filamento)</td>
<td>Filamento (PLA, ABS, PETG)</td>
<td>Extruye plástico fundido capa a capa sobre la cama de impresión</td>
</tr>
<tr>
<td>SLA / resina</td>
<td>Resina líquida</td>
<td>Cura la resina con luz UV/láser capa a capa; mayor nivel de detalle</td>
</tr>
</table>
> 🟡 **Componentes clave:** cama de impresión (print bed) nivelada y extrusor/boquilla en **FDM**; cuba de resina y fuente UV en **SLA**. Consumibles: **filamento** (FDM) y **resina** (SLA).

> 🔴 **Seguridad:** la **resina es tóxica e irritante** — usa guantes y ventilación. La boquilla FDM y la cama caliente alcanzan temperaturas altas: no las toques en funcionamiento.

## 3.9 · Conectores de alimentación (ATX)
<table header-row="true">
<tr>
<td>Conector</td>
<td>Alimenta</td>
</tr>
<tr>
<td>24 pines (20+4)</td>
<td>Placa base</td>
</tr>
<tr>
<td>EPS 4/8 pines</td>
<td>Alimentación de la CPU</td>
</tr>
<tr>
<td>PCIe 6 pines</td>
<td>GPU — 75 W</td>
</tr>
<tr>
<td>PCIe 8 pines (6+2)</td>
<td>GPU — 150 W</td>
</tr>
<tr>
<td>SATA power</td>
<td>Discos y SSD</td>
</tr>
<tr>
<td>Molex 4 pines</td>
<td>Ventiladores y periféricos heredados</td>
</tr>
<tr>
<td>Berg (mini)</td>
<td>Disquetera heredada</td>
</tr>
</table>
> 🟡 **Recuerda:** el conector de placa pasó de **20 a 24 pines**; los 4 extra aportan más +12 V para CPU y GPU modernas.

## 3.10 · Refrigeración — comparativa
<table header-row="true">
<tr>
<td>Método</td>
<td>Cuándo usarlo</td>
</tr>
<tr>
<td>Disipador + ventilador (aire)</td>
<td>Uso general; barato y fiable</td>
</tr>
<tr>
<td>Refrigeración líquida (AIO)</td>
<td>Gaming y overclocking; más silenciosa a alta carga</td>
</tr>
<tr>
<td>Fanless / pasiva</td>
<td>Equipos de bajo consumo, silenciosos</td>
</tr>
<tr>
<td>Pasta térmica</td>
<td>Mejora la conducción CPU→disipador (cantidad tipo guisante)</td>
</tr>
</table>
### 🧩 PBQ — Dominio 3 (escenario)
<details>
<summary>Quieres 4 discos con tolerancia a 2 fallos simultáneos, sin perder tanta capacidad como en el espejo. ¿Qué RAID?</summary>
	**RAID 6** (doble paridad, mínimo 4 discos, tolera 2 fallos).
</details>
<details>
<summary>Un SSD M.2 va a \~500 MB/s en lugar de varios GB/s. ¿Causa probable?</summary>
	Funciona en modo **SATA/AHCI**, no **NVMe**. M.2 es solo el formato físico; revisa las llaves (B/M) y la documentación.
</details>
<details>
<summary>🔍 Repaso rápido del dominio 3</summary>
	- **¿M.2 es siempre NVMe?** No, puede ser SATA.
	- **RAID 5 y 6:** 3 discos/1 fallo y 4 discos/2 fallos.
	- **TPM vs HSM:** un equipo vs muchos sistemas.
	- **Siete pasos del láser:** Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning.
	- **¿Mezclar 568A y 568B?** No en un cable directo.
</details>
### 🧪 Autoevalúate — Dominio 3
<details>
<summary>1. ¿Un SSD M.2 siempre es NVMe?</summary>
	**No.** M.2 es el formato físico; puede funcionar con SATA/AHCI. Hay que comprobar la documentación.<br><br>	❌ Sí, todo M.2 es NVMe → M.2 con llave B puede ser SATA. Solo M.2 con llave M y soporte NVMe lo es.<br>	❌ NVMe es más lento que SATA → al revés: NVMe sobre PCIe es mucho más rápido (\~3.500 MB/s vs \~550 MB/s).
</details>
<details>
<summary>2. ¿Cuántos discos mínimo para RAID 5 y cuántos fallos tolera?</summary>
	Mínimo **3 discos**, tolera **1 fallo**.<br><br>	❌ 2 discos → RAID 5 necesita mínimo 3 (2 datos + 1 paridad).<br>	❌ Tolera 2 fallos → eso es RAID 6 (mínimo 4 discos).<br>	❌ Tolera 0 fallos → eso es RAID 0 (solo striping).
</details>
<details>
<summary>3. ¿TPM o HSM para proteger las claves de muchos servidores?</summary>
	**HSM** (Hardware Security Module) — protege muchos sistemas, no solo uno.<br><br>	❌ TPM → va integrado en la placa de un solo dispositivo, no gestiona claves de múltiples sistemas.<br>	❌ Ambos sirven igual → no: TPM es para un equipo, HSM es para infraestructuras completas.
</details>
<details>
<summary>4. Recita los 7 pasos del proceso láser en orden.</summary>
	**P**rocessing → **C**harging → **E**xposing → **D**eveloping → **T**ransferring → **F**using → **C**leaning. (Please Come Every Day To Fetch Coffee).<br><br>	❌ Fusing antes de Transferring → el tóner se transfiere al papel primero, luego el fusor lo fija con calor.<br>	❌ Cleaning al principio → la limpieza es el último paso, para dejar el tambor listo para el siguiente ciclo.
</details>
<details>
<summary>5. ¿Qué diferencia hay entre los pares azul y marrón en T568A y T568B?</summary>
	**Ninguna.** Solo cambian los pares naranja y verde; azul y marrón son idénticos en ambos estándares.<br><br>	❌ Todos los pares cambian → solo se intercambian naranja (pines 1-2) y verde (pines 3-6).<br>	❌ Mezclar A y B da un cable cruzado válido → no en Gigabit; ambos extremos deben usar el mismo estándar.
</details>
> ⚠️ **Top 3 trampas del dominio 3:**<br>① M.2 ≠ NVMe automáticamente; puede ser SATA.<br>② RAID **no** es backup: no protege contra borrado, malware ni incendios.<br>③ DDR3, DDR4 y DDR5 son **físicamente incompatibles**; no entran en la misma ranura.

### 🎯 Si ves X, piensa Y — Dominio 3
<table header-row="true">
<tr>
<td>Si ves...</td>
<td>Piensa...</td>
</tr>
<tr>
<td>M.2 mencionado como velocidad</td>
<td>M.2 = formato físico. La velocidad depende de si es SATA o NVMe</td>
</tr>
<tr>
<td>RAID en pregunta sobre backups</td>
<td>RAID ≠ backup. RAID protege de fallo de disco, no de borrado/malware</td>
</tr>
<tr>
<td>DDR3 / DDR4 / DDR5 juntos</td>
<td>Físicamente incompatibles. Muesca distinta en cada generación</td>
</tr>
<tr>
<td>TPM vs HSM</td>
<td>TPM = un dispositivo. HSM = muchos sistemas (tarjeta/appliance)</td>
</tr>
<tr>
<td>ECC vs Parity</td>
<td>ECC detecta y corrige. Parity solo detecta</td>
</tr>
<tr>
<td>Cobre Ethernet + "100 metros"</td>
<td>Límite de 100 m por segmento. Más allá = fibra o repetidor</td>
</tr>
<tr>
<td>T568A vs T568B</td>
<td>Solo cambian naranja y verde. Azul y marrón son iguales. Ambos extremos = mismo estándar</td>
</tr>
<tr>
<td>Láser / 7 pasos / "Please Come..."</td>
<td>Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning</td>
</tr>
<tr>
<td>PCIe 6 pines vs 8 pines</td>
<td>6 pines = 75 W. 8 pines = 150 W. Cable 6+2 sirve para ambos</td>
</tr>
<tr>
<td>VGA a DVI/HDMI</td>
<td>VGA es analógico. Necesita conversor activo, no solo adaptador</td>
</tr>
<tr>
<td>Fusor / tambor OPC</td>
<td>Fusor = muy caliente. Tambor OPC = sensible a la luz</td>
</tr>
<tr>
<td>Imagen tenue en pantalla</td>
<td>Backlight o inverter, no el panel. Verificar con linterna</td>
</tr>
<tr>
<td>Touchscreen vs digitizer</td>
<td>Touchscreen=responde al tacto. Digitizer con stylus=entrada gráfica precisa</td>
</tr>
<tr>
<td>M.2 con llave B vs M</td>
<td>B = SATA. M = NVMe (PCIe). B+M = compatible con ambos</td>
</tr>
<tr>
<td>DDR4 voltaje y velocidad</td>
<td>1.2V, 2133–3200 MT/s</td>
</tr>
<tr>
<td>DDR5 voltaje y velocidad</td>
<td>1.1V, 4800–8400+ MT/s, 2 subcanales por módulo</td>
</tr>
<tr>
<td>DIMM vs SO-DIMM</td>
<td>DIMM = sobremesa (64 bits). SO-DIMM = portátil (mitad de ancho)</td>
</tr>
<tr>
<td>DRAM vs SDRAM</td>
<td>DRAM necesita refresco constante. SDRAM sincronizada con reloj del sistema</td>
</tr>
<tr>
<td>Cat5 / Cat5e / Cat6 / Cat6a / Cat7</td>
<td>Cat5=100Mbits, Cat5e=1G, Cat6=1G(10G a 55m), Cat6a=10G, Cat7/8=10-40G blindado</td>
</tr>
<tr>
<td>Plenum</td>
<td>Cubierta FEP/PVC bajo humo; obligatorio en espacios de aire</td>
</tr>
<tr>
<td>UTP vs STP</td>
<td>UTP=sin blindaje. STP=blindado (S=trenzado, F=lámina)</td>
</tr>
<tr>
<td>RG-6 / coaxial</td>
<td>Para TV y cablemódem; conector tipo F</td>
</tr>
<tr>
<td>RJ11 vs RJ45</td>
<td>RJ11=6P2C (teléfono/DSL). RJ45=8P8C (Ethernet)</td>
</tr>
<tr>
<td>USB 2.0 / 3.0 / 3.1 / 3.2</td>
<td>480 Mbit/s / 5 Gbit/s / 10 Gbit/s / 20 Gbit/s</td>
</tr>
<tr>
<td>Thunderbolt 1/2 vs 3/4</td>
<td>1/2=Mini DisplayPort (10-20G). 3/4=USB-C (40G, doble 4K)</td>
</tr>
<tr>
<td>SATA 1.0 / 2.0 / 3.0</td>
<td>1.5 / 3 / 6 Gbit/s. SATA 3 \~600 MB/s útiles</td>
</tr>
<tr>
<td>eSATA / SAS</td>
<td>eSATA=externo(conector distinto). SAS=empresarial(hasta 22.5 Gbit/s)</td>
</tr>
<tr>
<td>HDMI vs DisplayPort vs DVI vs VGA</td>
<td>HDMI=audio+digital(19p). DP=paquetizado. DVI=solo vídeo. VGA=analógico(degradado)</td>
</tr>
<tr>
<td>DVI-D a HDMI</td>
<td>Eléctricamente compatibles; basta un adaptador pasivo</td>
</tr>
<tr>
<td>TN / IPS / VA / OLED</td>
<td>TN=rápido(gaming). IPS=color. VA=contraste. OLED=negros puros(sin backlight)</td>
</tr>
<tr>
<td>Backlight / inverter</td>
<td>LCD necesita backlight. Inverter convierte DC→AC en portátiles antiguos</td>
</tr>
<tr>
<td>Refresh rate / resolución / PPI</td>
<td>Hz=fluidez. Resolución=ancho×alto. PPI=densidad de píxeles</td>
</tr>
<tr>
<td>Láser: tóner vs tambor vs fusor</td>
<td>Tóner=polvo. Tambor(OPC)=imagen latente(sensible a luz). Fusor=fija con calor(muy caliente)</td>
</tr>
<tr>
<td>Inkjet / térmica / impacto</td>
<td>Inkjet=tinta CMYK. Térmica=papel térmico(recibos). Impacto=cinta+agujas(multiparte)</td>
</tr>
<tr>
<td>Líneas en impresión láser</td>
<td>Tambor(OPC) rayado, no el tóner</td>
</tr>
<tr>
<td>PCL vs PostScript</td>
<td>PCL=HP. PostScript=Adobe. El driver debe coincidir con el lenguaje</td>
</tr>
<tr>
<td>Printer share vs print server</td>
<td>Share=compartida desde PC. Print server=cola gestionada en la impresora</td>
</tr>
<tr>
<td>Secured print / ADF</td>
<td>Secured print=PIN. ADF=alimentador automático de documentos</td>
</tr>
<tr>
<td>FDM vs SLA (impresión 3D)</td>
<td>FDM=filamento fundido(PLA/ABS). SLA=resina curada con UV(más detalle)</td>
</tr>
<tr>
<td>PCIe x1/x4/x8/x16</td>
<td>Carriles serie full-duplex. x16 para GPU</td>
</tr>
<tr>
<td>ATX / microATX / Mini-ITX</td>
<td>ATX=gaming. microATX=equilibrio. Mini-ITX=bajo consumo/thin client</td>
</tr>
<tr>
<td>BIOS vs UEFI</td>
<td>BIOS=legacy, sin drivers modernos. UEFI=gráfico, Secure Boot, necesario hoy</td>
</tr>
<tr>
<td>Secure Boot / CMOS / CR2032</td>
<td>Secure Boot=firma digital bootloader. CMOS=configuración(pila CR2032)</td>
</tr>
<tr>
<td>32 bits vs 64 bits</td>
<td>32 bits=máx 4GB RAM. 64 bits=ejecuta apps 32 bits; no al revés</td>
</tr>
<tr>
<td>ARM vs x86</td>
<td>ARM=RISC, eficiente(móviles). x86=Intel/AMD(escritorio/servidor)</td>
</tr>
<tr>
<td>PSU rieles +12V / +5V / +3.3V</td>
<td>+12V=PCIe+motores+ventiladores. +5V=heredados. +3.3V=M.2+RAM+lógica</td>
</tr>
<tr>
<td>PSU 20 pines vs 24 pines</td>
<td>24 pines=20+4 extra; los 4 añaden +12V para CPU y GPU modernas</td>
</tr>
<tr>
<td>Molex vs SATA power vs EPS</td>
<td>Molex=4 pines(ventiladores). SATA power=discos. EPS=CPU 4/8 pines</td>
</tr>
<tr>
<td>PSU redundante</td>
<td>Hot-swap; cada una asume el 100% de carga</td>
</tr>
<tr>
<td>Pasta térmica / Heatsink</td>
<td>Pasta=cantidad tipo guisante. Heatsink=disipa por conducción(cobre/aluminio)</td>
</tr>
<tr>
<td>Fanless / liquid cooling</td>
<td>Fanless=silencioso bajo consumo. Liquid cooling=gaming/overclock</td>
</tr>
</table>
### 🎯 Si ves X, piensa Y — Dominio 3 (ampliado)
> 🎯 Cada fila es un patrón de examen. Si reconoces la pista, la respuesta sale sola.

<table header-row="true">
<tr>
<td>Si ves...</td>
<td>Piensa...</td>
</tr>
<tr>
<td>M.2 mencionado como velocidad</td>
<td>M.2 = formato físico. La velocidad depende de si es SATA o NVMe</td>
</tr>
<tr>
<td>M.2 con llave B vs M</td>
<td>B = SATA. M = NVMe (PCIe). B+M = compatible con ambos</td>
</tr>
<tr>
<td>RAID en pregunta sobre backups</td>
<td>RAID ≠ backup. RAID protege de fallo de disco, no de borrado/malware</td>
</tr>
<tr>
<td>DDR3 / DDR4 / DDR5 juntos</td>
<td>Físicamente incompatibles. Muesca distinta en cada generación</td>
</tr>
<tr>
<td>DDR4 voltaje y velocidad</td>
<td>1.2V, 2133–3200 MT/s</td>
</tr>
<tr>
<td>DDR5 voltaje y velocidad</td>
<td>1.1V, 4800–8400+ MT/s, 2 subcanales por módulo</td>
</tr>
<tr>
<td>DIMM vs SO-DIMM</td>
<td>DIMM = sobremesa (64 bits). SO-DIMM = portátil (mitad de ancho)</td>
</tr>
<tr>
<td>TPM vs HSM</td>
<td>TPM = un dispositivo. HSM = muchos sistemas (tarjeta/appliance)</td>
</tr>
<tr>
<td>ECC vs Parity</td>
<td>ECC detecta y corrige. Parity solo detecta</td>
</tr>
<tr>
<td>DRAM vs SDRAM</td>
<td>DRAM necesita refresco constante. SDRAM sincronizada con reloj del sistema</td>
</tr>
<tr>
<td>Cobre Ethernet + "100 metros"</td>
<td>Límite de 100 m por segmento. Más allá = fibra o repetidor</td>
</tr>
<tr>
<td>Cat5 / Cat5e / Cat6 / Cat6a / Cat7</td>
<td>Cat5=100Mbits, Cat5e=1G, Cat6=1G(10G a 55m), Cat6a=10G, Cat7/8=10-40G blindado</td>
</tr>
<tr>
<td>Plenum</td>
<td>Cubierta FEP/PVC bajo humo; obligatorio en espacios de aire</td>
</tr>
<tr>
<td>UTP vs STP</td>
<td>UTP=sin blindaje. STP=blindado (S=trenzado, F=lámina)</td>
</tr>
<tr>
<td>RG-6 / coaxial</td>
<td>Para TV y cablemódem; conector tipo F</td>
</tr>
<tr>
<td>T568A vs T568B</td>
<td>Solo cambian naranja y verde. Azul y marrón son iguales. Ambos extremos = mismo estándar</td>
</tr>
<tr>
<td>RJ11 vs RJ45</td>
<td>RJ11=6P2C (teléfono/DSL). RJ45=8P8C (Ethernet)</td>
</tr>
<tr>
<td>Fibra SMF vs MMF</td>
<td>SMF=láser, fino, \~100km. MMF=LED, ancho, \~2km</td>
</tr>
<tr>
<td>Conectores fibra LC / SC / ST</td>
<td>LC=Little(clip), SC=Square(push-pull), ST=Stick&Twist</td>
</tr>
<tr>
<td>USB 2.0 / 3.0 / 3.1 / 3.2</td>
<td>480 Mbit/s / 5 Gbit/s / 10 Gbit/s / 20 Gbit/s</td>
</tr>
<tr>
<td>Thunderbolt 1/2 vs 3/4</td>
<td>1/2=Mini DisplayPort (10-20G). 3/4=USB-C (40G, doble 4K)</td>
</tr>
<tr>
<td>SATA 1.0 / 2.0 / 3.0</td>
<td>1.5 / 3 / 6 Gbit/s. SATA 3 \~600 MB/s útiles</td>
</tr>
<tr>
<td>eSATA / SAS</td>
<td>eSATA=externo(conector distinto). SAS=empresarial(hasta 22.5 Gbit/s)</td>
</tr>
<tr>
<td>HDMI vs DisplayPort vs DVI vs VGA</td>
<td>HDMI=audio+digital(19p). DP=paquetizado. DVI=solo vídeo. VGA=analógico(degradado)</td>
</tr>
<tr>
<td>VGA a DVI/HDMI</td>
<td>VGA es analógico. Necesita conversor activo, no solo adaptador</td>
</tr>
<tr>
<td>DVI-D a HDMI</td>
<td>Eléctricamente compatibles; basta un adaptador pasivo</td>
</tr>
<tr>
<td>TN / IPS / VA / OLED</td>
<td>TN=rápido(gaming). IPS=color. VA=contraste. OLED=negros puros(sin backlight)</td>
</tr>
<tr>
<td>Backlight / inverter</td>
<td>LCD necesita backlight. Inverter convierte DC→AC en portátiles antiguos</td>
</tr>
<tr>
<td>Refresh rate / resolución / PPI</td>
<td>Hz=fluidez. Resolución=ancho×alto. PPI=densidad de píxeles</td>
</tr>
<tr>
<td>Láser / 7 pasos / "Please Come..."</td>
<td>Processing, Charging, Exposing, Developing, Transferring, Fusing, Cleaning</td>
</tr>
<tr>
<td>Láser: tóner vs tambor vs fusor</td>
<td>Tóner=polvo. Tambor(OPC)=imagen latente(sensible a luz). Fusor=fija con calor(muy caliente)</td>
</tr>
<tr>
<td>Inkjet / térmica / impacto</td>
<td>Inkjet=tinta CMYK. Térmica=papel térmico(recibos). Impacto=cinta+agujas(multiparte)</td>
</tr>
<tr>
<td>Impresora no imprime</td>
<td>Reiniciar spooler de impresión; cola atascada</td>
</tr>
<tr>
<td>Líneas en impresión láser</td>
<td>Tambor(OPC) rayado, no el tóner</td>
</tr>
<tr>
<td>Imágenes fantasma repetidas</td>
<td>Tambor/OPC o fusor; si patrón se repite a intervalos regulares = tambor</td>
</tr>
<tr>
<td>PCL vs PostScript</td>
<td>PCL=HP. PostScript=Adobe. El driver debe coincidir con el lenguaje</td>
</tr>
<tr>
<td>Printer share vs print server</td>
<td>Share=compartida desde PC. Print server=cola gestionada en la impresora</td>
</tr>
<tr>
<td>Secured print / ADF</td>
<td>Secured print=PIN. ADF=alimentador automático de documentos</td>
</tr>
<tr>
<td>FDM vs SLA (impresión 3D)</td>
<td>FDM=filamento fundido(PLA/ABS). SLA=resina curada con UV(más detalle)</td>
</tr>
<tr>
<td>PCIe 6 pines vs 8 pines</td>
<td>6 pines = 75 W. 8 pines = 150 W. Cable 6+2 sirve para ambos</td>
</tr>
<tr>
<td>PCIe x1/x4/x8/x16</td>
<td>Carriles serie full-duplex. x16 para GPU</td>
</tr>
<tr>
<td>ATX / microATX / Mini-ITX</td>
<td>ATX=gaming. microATX=equilibrio. Mini-ITX=bajo consumo/thin client</td>
</tr>
<tr>
<td>BIOS vs UEFI</td>
<td>BIOS=legacy, sin drivers modernos. UEFI=gráfico, Secure Boot, necesario hoy</td>
</tr>
<tr>
<td>Secure Boot / CMOS / CR2032</td>
<td>Secure Boot=firma digital bootloader. CMOS=configuración(pila CR2032)</td>
</tr>
<tr>
<td>32 bits vs 64 bits</td>
<td>32 bits=máx 4GB RAM. 64 bits=ejecuta apps 32 bits; no al revés</td>
</tr>
<tr>
<td>ARM vs x86</td>
<td>ARM=RISC, eficiente(móviles). x86=Intel/AMD(escritorio/servidor)</td>
</tr>
<tr>
<td>PSU rieles +12V / +5V / +3.3V</td>
<td>+12V=PCIe+motores+ventiladores. +5V=heredados. +3.3V=M.2+RAM+lógica</td>
</tr>
<tr>
<td>PSU 20 pines vs 24 pines</td>
<td>24 pines=20+4 extra; los 4 añaden +12V para CPU y GPU modernas</td>
</tr>
<tr>
<td>Molex vs SATA power vs EPS</td>
<td>Molex=4 pines(ventiladores). SATA power=discos. EPS=CPU 4/8 pines</td>
</tr>
<tr>
<td>PSU redundante</td>
<td>Hot-swap; cada una asume el 100% de carga</td>
</tr>
<tr>
<td>Pasta térmica / Heatsink</td>
<td>Pasta=cantidad tipo guisante. Heatsink=disipa por conducción(cobre/aluminio)</td>
</tr>
<tr>
<td>Fanless / liquid cooling</td>
<td>Fanless=silencioso bajo consumo. Liquid cooling=gaming/overclock</td>
</tr>
<tr>
<td>Fusor / tambor OPC</td>
<td>Fusor = muy caliente. Tambor OPC = sensible a la luz</td>
</tr>
<tr>
<td>Imagen tenue en pantalla</td>
<td>Backlight o inverter, no el panel. Verificar con linterna</td>
</tr>
<tr>
<td>Touchscreen vs digitizer</td>
<td>Touchscreen=responde al tacto. Digitizer con stylus=entrada gráfica precisa</td>
</tr>
</table>
[⬆ Volver al índice](#índice-y-pesos-oficiales)
---
