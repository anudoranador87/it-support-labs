# Dominio 2 · Networking (23%)
## 2.0 · Modelo OSI — las 7 capas
![](https://prod-files-secure.s3.us-west-2.amazonaws.com/dc44bbb8-5d26-81c1-a63e-0003fc68a636/de6e3e08-9440-49a5-9050-758119354310/ai-generated-image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZAEGK57%2F20260802%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260802T134304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIBrX%2FFyeCDfyxuyweH3BlcP1W85a%2B3WOL%2B0kwKQtVGokAiAeWqrpQZNNOUjW7dO%2BmYFvYXEDHuUjafQBWltI2O%2FdJiqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM85idBhb6VibSoBXvKtwDmuZu7%2BX4LWvCZrIGyvgWyWN%2FANxVO3YUHzNVe%2Fk%2FRFM6t4a4IgQokCuv0qRQ4ZtSZA6Qrrv5BmiI9PE3ckPrGoiGC2%2BHe87%2BoOhmJqc50z6u%2BAPIpts6dm8D9JgSKiChjWuomH84%2BP%2FvKAxE6fASOWJLtBHlT%2F6kxhrhFmq%2F2FSy8IwY5KUMitcQn8ccc9EXl2DIzBmQj6tIOhhbmyD56flBIur6MPnzQ9agY3Wpk376y510VZSkRVtREYKijxlyXND2xiEuFLj%2BFpj%2Ftryd8KzN1EuJs%2B5u4yFRs4qxaD3ZwJuHT0karLF0pjwGYyhQbDf7xu36oJWeDR9scWgq1Wy7LOp62wLvhPGivsX6lVoGWi1x7k9nJ5adY%2F2Ps0L%2FrX%2FA55lqF9EKK%2BXR%2BKM3jsDLu2cnmhcFMBUY%2FqZa3frqhq0kTMg7ftyabvIhIyVN5gSVpfUn0rcyadAy2raOBBnnTJvXk3KOQ5aSDM6OHkIa3uuMn3Gw%2B93IyaO4ZPN3XJRGLcBtvepsFssXD4rk9oVFF7uI7DBwuQ1sbuUWtCKZJYvoa1VEDqrH8lEDxLvC7%2BE8F%2FvTNB3lWo8o0Ouj2nuLE0SkJbOeFb57mOuLWQw1M2UAIr3tjiVZ5mcw8Y690wY6pgFQdDmZyczm2Y5LF5Og0KE1vc3%2By2BHZfkkG06poSY3YgumtdnZ8QWfz2Xi%2BS4k5jHOczkQ46q1gH8yt5EGOl4xy0qYrTUOyWCTsBDBXseWDbr5ZFQL1u7Lmk72zpgl%2B05g1R5WLN6u7JOSeL%2B4FA4lP0RiAsqUY47a7U5o78D7CCmT0n8g1qZXbfisulo3WLPuHAZW3Z7Q4I6PjPOsgfYQ8FXKUpIQ&X-Amz-Signature=4d34daeb19dbdddb8e335604ba731caefe205e50eaa215685281ad418e4dc15d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
<table header-row="true">
<tr>
<td>#</td>
<td>Capa</td>
<td>Función</td>
<td>Ejemplos / Protocolos</td>
<td>Dispositivo</td>
</tr>
<tr>
<td>7</td>
<td>Application</td>
<td>Interfaz con el usuario</td>
<td>HTTP, SMTP, DNS, FTP</td>
<td>—</td>
</tr>
<tr>
<td>6</td>
<td>Presentation</td>
<td>Formato, cifrado y compresión</td>
<td>SSL/TLS, JPEG, ASCII</td>
<td>—</td>
</tr>
<tr>
<td>5</td>
<td>Session</td>
<td>Control de diálogo entre equipos</td>
<td>NetBIOS, RPC</td>
<td>—</td>
</tr>
<tr>
<td>4</td>
<td>Transport</td>
<td>Entrega fiable (TCP) o rápida (UDP)</td>
<td>TCP, UDP</td>
<td>—</td>
</tr>
<tr>
<td>3</td>
<td>Network</td>
<td>Enrutamiento y direccionamiento lógico</td>
<td>IPv4, IPv6, ICMP</td>
<td>**Router**</td>
</tr>
<tr>
<td>2</td>
<td>Data Link</td>
<td>Direccionamiento físico (MAC), tramas</td>
<td>Ethernet, 802.11, ARP</td>
<td>**Switch**</td>
</tr>
<tr>
<td>1</td>
<td>Physical</td>
<td>Señales eléctricas, cables, bits</td>
<td>RJ45, fibra, coaxial</td>
<td>Hub, repetidor</td>
</tr>
</table>
> 🧠 **Mnemotecnia (de abajo arriba):** *Please Do Not Throw Sausage Pizza Away* → **P**hysical, **D**ata Link, **N**etwork, **T**ransport, **S**ession, **P**resentation, **A**pplication.<br><br>
> **Mnemotecnia (de arriba abajo):** *All People Seem To Need Data Processing* → **A**pplication, **P**resentation, **S**ession, **T**ransport, **N**etwork, **D**ata Link, **P**hysical.

> 🔴 **Trampa de examen:** el switch decide en capa 2 (MAC), el router en capa 3 (IP). Si te preguntan por un firewall tradicional, es capa 4 (transporte, por puertos), pero los NGFW inspeccionan hasta capa 7.

## 2.1 · Introducción a IP
<table header-row="true">
<tr>
<td>Protocolo</td>
<td>Conexión</td>
<td>Fiabilidad</td>
<td>Se usa en</td>
</tr>
<tr>
<td>TCP</td>
<td>Orientado a conexión</td>
<td>Retransmite y controla el flujo</td>
<td>HTTPS, SSH</td>
</tr>
<tr>
<td>UDP</td>
<td>Sin conexión</td>
<td>Sin recuperación de errores</td>
<td>VoIP, DHCP, TFTP</td>
</tr>
</table>
> 🟡 **Puertos:** 0–1023 **no efímeros** (servicios) · 1024–65535 **efímeros** (los elige el cliente). Los números TCP y UDP son espacios independientes.

### 📋 Puertos que hay que saber
<table header-row="true">
<tr>
<td>Puerto</td>
<td>Protocolo</td>
<td>Clave de examen</td>
</tr>
<tr>
<td>20/21 TCP</td>
<td>FTP</td>
<td>20 datos, 21 control; sin cifrar</td>
</tr>
<tr>
<td>22 TCP</td>
<td>SSH</td>
<td>Administración remota cifrada</td>
</tr>
<tr>
<td>23 TCP</td>
<td>Telnet</td>
<td>Texto claro, inseguro</td>
</tr>
<tr>
<td>25 TCP</td>
<td>SMTP</td>
<td>Envío de correo</td>
</tr>
<tr>
<td>53 TCP/UDP</td>
<td>DNS</td>
<td>Nombre ↔ IP; UDP para consultas, TCP para transferencias de zona</td>
</tr>
<tr>
<td>67/68 UDP</td>
<td>DHCP</td>
<td>67 servidor, 68 cliente</td>
</tr>
<tr>
<td>80 TCP</td>
<td>HTTP</td>
<td>Web sin cifrar</td>
</tr>
<tr>
<td>110 TCP</td>
<td>POP3</td>
<td>Descarga el correo</td>
</tr>
<tr>
<td>137–139</td>
<td>NetBIOS</td>
<td>Nombre y sesión; heredado</td>
</tr>
<tr>
<td>143 TCP</td>
<td>IMAP4</td>
<td>Sincroniza carpetas</td>
</tr>
<tr>
<td>161/162 UDP</td>
<td>SNMP</td>
<td>161 consultas, 162 traps; v3 es el seguro</td>
</tr>
<tr>
<td>389 TCP</td>
<td>LDAP</td>
<td>Directorio</td>
</tr>
<tr>
<td>443 TCP</td>
<td>HTTPS</td>
<td>Web cifrada con TLS</td>
</tr>
<tr>
<td>445 TCP</td>
<td>SMB</td>
<td>Archivos e impresoras Windows</td>
</tr>
<tr>
<td>3389 TCP</td>
<td>RDP</td>
<td>Escritorio remoto</td>
</tr>
</table>
> 🧠 **Mnemotecnia de puertos — recitado encadenado:**<br>
> *FTP va al 20-21, SSH al 22, Telnet al 23...*<br>
> **20-21-22-23-25** · **53** (DNS) · **67/68** (DHCP) · **80-110-143** (web y correo) · **389** (LDAP) · **443-445** (seguridad y archivos) · **3389** (escritorio remoto).<br><br>
> **Truco extra:** los pares "bonitos" son tráfico seguro: 22 (SSH), 443 (HTTPS), 3389 (RDP).

### 📧 Protocolos de correo y puertos (inseguro vs seguro)
<table header-row="true">
<tr>
<td>Protocolo</td>
<td>Puerto sin cifrar</td>
<td>Puerto seguro</td>
<td>Función</td>
</tr>
<tr>
<td>SMTP</td>
<td>25 (relay) / 587 (envío)</td>
<td>465 (SMTPS)</td>
<td>Envío de correo</td>
</tr>
<tr>
<td>POP3</td>
<td>110</td>
<td>995 (POP3S)</td>
<td>Descarga y suele borrar del servidor</td>
</tr>
<tr>
<td>IMAP</td>
<td>143</td>
<td>993 (IMAPS)</td>
<td>Sincroniza carpetas en el servidor</td>
</tr>
</table>
> 🔴 **Trampa:** el examen adora los pares seguro/inseguro: **IMAP 143 → 993**, **POP3 110 → 995**, **SMTP 25/587 → 465**. Memoriza las dos columnas.

### 🔦 Fibra óptica: SMF vs MMF y conectores
<table header-row="true">
<tr>
<td>Tipo</td>
<td>Fuente</td>
<td>Núcleo</td>
<td>Alcance</td>
</tr>
<tr>
<td>SMF (single-mode)</td>
<td>Láser</td>
<td>Fino (\~9 µm)</td>
<td>Largas distancias (\~100 km)</td>
</tr>
<tr>
<td>MMF (multimode)</td>
<td>LED</td>
<td>Ancho (\~50/62,5 µm)</td>
<td>Corto alcance (\~2 km)</td>
</tr>
</table>
> 🟡 **Conectores de fibra:** **LC** (Little Connector, clip pequeño) · **SC** (Square Connector, push-pull) · **ST** (Stick and Twist, bayoneta). **APC** (verde, pulido angular) vs **UPC** (azul).

https://commons.wikimedia.org/wiki/Special:FilePath/Tipos_conectores_fibra_optica.jpg
## 2.2 · Tecnologías inalámbricas
<table header-row="true">
<tr>
<td>Estándar</td>
<td>Nombre comercial</td>
<td>Banda</td>
<td>Velocidad máx.</td>
<td>Clave</td>
</tr>
<tr>
<td>802.11a</td>
<td>—</td>
<td>5 GHz</td>
<td>54 Mbit/s</td>
<td>Antiguo, poca interferencia</td>
</tr>
<tr>
<td>802.11b</td>
<td>—</td>
<td>2,4 GHz</td>
<td>11 Mbit/s</td>
<td>Muy antiguo, mucho alcance</td>
</tr>
<tr>
<td>802.11g</td>
<td>—</td>
<td>2,4 GHz</td>
<td>54 Mbit/s</td>
<td>Compatible con b</td>
</tr>
<tr>
<td>802.11n</td>
<td>Wi-Fi 4</td>
<td>2,4 y 5 GHz</td>
<td>600 Mbit/s</td>
<td>Introduce MIMO</td>
</tr>
<tr>
<td>802.11ac</td>
<td>Wi-Fi 5</td>
<td>5 GHz</td>
<td>\~1,3+ Gbit/s</td>
<td>MU-MIMO</td>
</tr>
<tr>
<td>802.11ax</td>
<td>Wi-Fi 6 y 6E</td>
<td>2,4 / 5 / 6 GHz</td>
<td>\~9,6 Gbit/s</td>
<td>OFDMA; 6E añade 6 GHz</td>
</tr>
<tr>
<td>802.11be</td>
<td>Wi-Fi 7</td>
<td>2,4 / 5 / 6 GHz</td>
<td>Multi-Gbit/s</td>
<td>MLO, canales de 320 MHz</td>
</tr>
</table>
- **Bandas:** 2,4 GHz (más alcance, más interferencia) · 5 GHz · 6 GHz (Wi-Fi 6E).
![](https://prod-files-secure.s3.us-west-2.amazonaws.com/dc44bbb8-5d26-81c1-a63e-0003fc68a636/c7f8fb15-3163-4520-914c-9c7c52b5aeab/ai-generated-image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZAEGK57%2F20260802%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260802T134304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIBrX%2FFyeCDfyxuyweH3BlcP1W85a%2B3WOL%2B0kwKQtVGokAiAeWqrpQZNNOUjW7dO%2BmYFvYXEDHuUjafQBWltI2O%2FdJiqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM85idBhb6VibSoBXvKtwDmuZu7%2BX4LWvCZrIGyvgWyWN%2FANxVO3YUHzNVe%2Fk%2FRFM6t4a4IgQokCuv0qRQ4ZtSZA6Qrrv5BmiI9PE3ckPrGoiGC2%2BHe87%2BoOhmJqc50z6u%2BAPIpts6dm8D9JgSKiChjWuomH84%2BP%2FvKAxE6fASOWJLtBHlT%2F6kxhrhFmq%2F2FSy8IwY5KUMitcQn8ccc9EXl2DIzBmQj6tIOhhbmyD56flBIur6MPnzQ9agY3Wpk376y510VZSkRVtREYKijxlyXND2xiEuFLj%2BFpj%2Ftryd8KzN1EuJs%2B5u4yFRs4qxaD3ZwJuHT0karLF0pjwGYyhQbDf7xu36oJWeDR9scWgq1Wy7LOp62wLvhPGivsX6lVoGWi1x7k9nJ5adY%2F2Ps0L%2FrX%2FA55lqF9EKK%2BXR%2BKM3jsDLu2cnmhcFMBUY%2FqZa3frqhq0kTMg7ftyabvIhIyVN5gSVpfUn0rcyadAy2raOBBnnTJvXk3KOQ5aSDM6OHkIa3uuMn3Gw%2B93IyaO4ZPN3XJRGLcBtvepsFssXD4rk9oVFF7uI7DBwuQ1sbuUWtCKZJYvoa1VEDqrH8lEDxLvC7%2BE8F%2FvTNB3lWo8o0Ouj2nuLE0SkJbOeFb57mOuLWQw1M2UAIr3tjiVZ5mcw8Y690wY6pgFQdDmZyczm2Y5LF5Og0KE1vc3%2By2BHZfkkG06poSY3YgumtdnZ8QWfz2Xi%2BS4k5jHOczkQ46q1gH8yt5EGOl4xy0qYrTUOyWCTsBDBXseWDbr5ZFQL1u7Lmk72zpgl%2B05g1R5WLN6u7JOSeL%2B4FA4lP0RiAsqUY47a7U5o78D7CCmT0n8g1qZXbfisulo3WLPuHAZW3Z7Q4I6PjPOsgfYQ8FXKUpIQ&X-Amz-Signature=fde5e6652fa7589287e890deca97b84dd66cde726c337d8063e4f86adb2790a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
- **Anchos de canal:** 20, 40, 80, 160 y 320 MHz.
- **Bluetooth:** banda ISM de 2,4 GHz, unos 10 m en equipos de consumo.
- **RFID:** identificación por radio; etiquetas pasivas o activas.
- **NFC:** bidireccional, se apoya en RFID, admite cifrado.
## 2.3 · Servicios de red
<table header-row="true">
<tr>
<td>Servicio</td>
<td>Función</td>
</tr>
<tr>
<td>DNS</td>
<td>Traduce nombres a IP</td>
</tr>
<tr>
<td>DHCP</td>
<td>Configura IP automáticamente</td>
</tr>
<tr>
<td>File share</td>
<td>Almacenamiento central: SMB, AFP</td>
</tr>
<tr>
<td>Print server</td>
<td>SMB, IPP, LPD</td>
</tr>
<tr>
<td>Mail server</td>
<td>Correo entrante y saliente</td>
</tr>
<tr>
<td>Syslog</td>
<td>Registro centralizado</td>
</tr>
<tr>
<td>Web server</td>
<td>HTTP/HTTPS</td>
</tr>
<tr>
<td>Auth server</td>
<td>Login centralizado</td>
</tr>
<tr>
<td>Load balancer</td>
<td>Reparte carga y da tolerancia a fallos</td>
</tr>
<tr>
<td>Proxy</td>
<td>Control de acceso, caché, filtrado de URL</td>
</tr>
<tr>
<td>NTP</td>
<td>Hora exacta, **udp/123**</td>
</tr>
<tr>
<td>Spam gateway</td>
<td>Filtra correo no deseado</td>
</tr>
<tr>
<td>UTM / all-in-one</td>
<td>Firewall, filtrado, antimalware y VPN</td>
</tr>
</table>
![](https://prod-files-secure.s3.us-west-2.amazonaws.com/dc44bbb8-5d26-81c1-a63e-0003fc68a636/d6125178-08cc-46a4-8ad0-965260e91806/ai-generated-image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZAEGK57%2F20260802%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260802T134304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLXdlc3QtMiJGMEQCIBrX%2FFyeCDfyxuyweH3BlcP1W85a%2B3WOL%2B0kwKQtVGokAiAeWqrpQZNNOUjW7dO%2BmYFvYXEDHuUjafQBWltI2O%2FdJiqIBAjf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM85idBhb6VibSoBXvKtwDmuZu7%2BX4LWvCZrIGyvgWyWN%2FANxVO3YUHzNVe%2Fk%2FRFM6t4a4IgQokCuv0qRQ4ZtSZA6Qrrv5BmiI9PE3ckPrGoiGC2%2BHe87%2BoOhmJqc50z6u%2BAPIpts6dm8D9JgSKiChjWuomH84%2BP%2FvKAxE6fASOWJLtBHlT%2F6kxhrhFmq%2F2FSy8IwY5KUMitcQn8ccc9EXl2DIzBmQj6tIOhhbmyD56flBIur6MPnzQ9agY3Wpk376y510VZSkRVtREYKijxlyXND2xiEuFLj%2BFpj%2Ftryd8KzN1EuJs%2B5u4yFRs4qxaD3ZwJuHT0karLF0pjwGYyhQbDf7xu36oJWeDR9scWgq1Wy7LOp62wLvhPGivsX6lVoGWi1x7k9nJ5adY%2F2Ps0L%2FrX%2FA55lqF9EKK%2BXR%2BKM3jsDLu2cnmhcFMBUY%2FqZa3frqhq0kTMg7ftyabvIhIyVN5gSVpfUn0rcyadAy2raOBBnnTJvXk3KOQ5aSDM6OHkIa3uuMn3Gw%2B93IyaO4ZPN3XJRGLcBtvepsFssXD4rk9oVFF7uI7DBwuQ1sbuUWtCKZJYvoa1VEDqrH8lEDxLvC7%2BE8F%2FvTNB3lWo8o0Ouj2nuLE0SkJbOeFb57mOuLWQw1M2UAIr3tjiVZ5mcw8Y690wY6pgFQdDmZyczm2Y5LF5Og0KE1vc3%2By2BHZfkkG06poSY3YgumtdnZ8QWfz2Xi%2BS4k5jHOczkQ46q1gH8yt5EGOl4xy0qYrTUOyWCTsBDBXseWDbr5ZFQL1u7Lmk72zpgl%2B05g1R5WLN6u7JOSeL%2B4FA4lP0RiAsqUY47a7U5o78D7CCmT0n8g1qZXbfisulo3WLPuHAZW3Z7Q4I6PjPOsgfYQ8FXKUpIQ&X-Amz-Signature=ac7307e190faae2ad913618a023c357fb8e8594740fd5d0071712fdab0c4ca34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)
- **SCADA / ICS:** control industrial multisede; exige segmentación estricta.
- **IoT:** electrodomésticos y sensores; segmenta la red para limitar brechas.
## 2.4 · DNS
<table header-row="true">
<tr>
<td>Registro</td>
<td>Función</td>
</tr>
<tr>
<td>A</td>
<td>Nombre → IPv4</td>
</tr>
<tr>
<td>AAAA</td>
<td>Nombre → IPv6</td>
</tr>
<tr>
<td>CNAME</td>
<td>Alias de otro nombre</td>
</tr>
<tr>
<td>MX</td>
<td>Servidor de correo</td>
</tr>
<tr>
<td>TXT</td>
<td>Texto; aquí viven SPF, DKIM y DMARC</td>
</tr>
</table>
- **SPF:** lista de servidores autorizados a enviar.
- **DKIM:** firma digital del correo saliente.
- **DMARC:** política para el correo no autenticado y sus informes.
- Sistema jerárquico y distribuido: 13 clústeres raíz y cientos de TLD.
```bash
$ dig www.professormesser.com
;; ANSWER SECTION:
www.professormesser.com. 300 IN A 104.22.72.108
www.professormesser.com. 300 IN A 172.67.41.114
;; Query time: 42 msec
```
## 2.4 · DHCP
> 🟡 **DORA:** **D**iscover → **O**ffer → **R**equest → **A**cknowledge.

- **Entrega:** IP, máscara, gateway, DNS y servidores NTP.
- **Scope:** rango, exclusiones, duración de la concesión y opciones.
- **Reservation:** tabla de MAC con su IP fija; también llamada *static DHCP*.
## 2.4 · VLAN y VPN
- **LAN:** mismo dominio de broadcast.
- **VLAN:** mismo dominio separado **lógicamente** con 802.1Q.
- **VPN:** datos cifrados sobre una red pública; el **concentrador** cifra y descifra.
- **Client-to-site:** acceso bajo demanda desde un equipo remoto.
- **Site-to-site:** siempre activa, con firewalls como concentradores.
`Cliente → Internet → Concentrador VPN → Red corporativa`
`Firewall sede A ←→ Internet ←→ Firewall sede B`
## 2.5 · Dispositivos de red
<table header-row="true">
<tr>
<td>Dispositivo</td>
<td>Capa / decisión</td>
</tr>
<tr>
<td>Router</td>
<td>Capa 3, decide por **IP**</td>
</tr>
<tr>
<td>Switch</td>
<td>Capa 2, decide por **MAC**</td>
</tr>
<tr>
<td>Access point</td>
<td>Puente que extiende la red al aire</td>
</tr>
<tr>
<td>Multilayer switch</td>
<td>Switch con routing</td>
</tr>
<tr>
<td>Firewall</td>
<td>Filtra por puerto, capa 4</td>
</tr>
<tr>
<td>NIC</td>
<td>Contiene la MAC</td>
</tr>
<tr>
<td>Patch panel</td>
<td>Punch-down + RJ-45</td>
</tr>
<tr>
<td>PoE</td>
<td>Datos y energía en el mismo cable</td>
</tr>
</table>
- **Unmanaged:** plug and play, sin VLAN ni gestión.
- **Managed:** 802.1Q, priorización, STP, port mirroring y SNMP.
- **PoE:** 15,4 W · **PoE+:** 25,5 W · **PoE++:** 51 W (tipo 3) y 71,3 W (tipo 4).
- **Cable modem:** DOCSIS · **DSL:** línea telefónica, límite \~10.000 pies · **ONT:** fibra hasta el domicilio, punto de demarcación.
> 🔴 **Trampa:** un access point **no es** un wireless router. El router inalámbrico es router + AP en un solo aparato.

## 2.6 · IPv4, IPv6 y asignación
<table header-row="true">
<tr>
<td>Rango privado</td>
<td>CIDR</td>
</tr>
<tr>
<td>10.0.0.0 – 10.255.255.255</td>
<td>10.0.0.0/8</td>
</tr>
<tr>
<td>172.16.0.0 – 172.31.255.255</td>
<td>172.16.0.0/12</td>
</tr>
<tr>
<td>192.168.0.0 – 192.168.255.255</td>
<td>192.168.0.0/16</td>
</tr>
</table>
- **IPv4:** 32 bits, notación decimal con puntos.
- **IPv6:** 128 bits, hexadecimal; primeros 64 bits de red, últimos 64 de host.
- **Máscara:** determina la subred local.
- **Gateway:** debe ser una IP **de la propia subred**.
- **Estática vs dinámica:** manual vs DHCP; la reserva combina lo mejor de ambas.
> 🔴 **APIPA ****`169.254.0.0/16`****:** dirección link-local asignada cuando **no se encuentra servidor DHCP**. Solo conectividad local, sin internet.

## 2.7 · Conexiones y tipos de red
<table header-row="true">
<tr>
<td>Conexión</td>
<td>Clave</td>
</tr>
<tr>
<td>Satélite</td>
<td>Alta latencia, línea de visión, *rain fade*</td>
</tr>
<tr>
<td>Fibra</td>
<td>Máxima velocidad, instalación costosa</td>
</tr>
<tr>
<td>Cable</td>
<td>DOCSIS, ancho compartido</td>
</tr>
<tr>
<td>DSL</td>
<td>Asimétrica, límite de distancia</td>
</tr>
<tr>
<td>Celular</td>
<td>Tethering y hotspot</td>
</tr>
<tr>
<td>WISP</td>
<td>Wireless terrestre para zonas rurales</td>
</tr>
<tr>
<td>LAN / WAN</td>
<td>Local / global</td>
</tr>
<tr>
<td>PAN / MAN</td>
<td>Personal / metropolitana</td>
</tr>
<tr>
<td>SAN / WLAN</td>
<td>Bloques de almacenamiento / 802.11</td>
</tr>
</table>
## 2.8 · Herramientas de red
<table header-row="true">
<tr>
<td>Herramienta</td>
<td>Para qué</td>
</tr>
<tr>
<td>Crimper</td>
<td>Fijar el conector al cable</td>
</tr>
<tr>
<td>Punch-down</td>
<td>Terminar en bloque 66 o 110</td>
</tr>
<tr>
<td>Tone generator + probe</td>
<td>Localizar un cable concreto</td>
</tr>
<tr>
<td>Wi-Fi analyzer</td>
<td>Interferencia y colocación de antenas</td>
</tr>
<tr>
<td>Cable tester</td>
<td>Continuidad y pines cruzados</td>
</tr>
<tr>
<td>Loopback plug</td>
<td>Probar un puerto físico</td>
</tr>
<tr>
<td>Tap / port mirror</td>
<td>Copiar tráfico para análisis</td>
</tr>
</table>
## 2.9 · Subnetting práctico
> 🧠 El subnetting es de lo más rentable del examen. Memoriza la tabla de máscaras y practica el cálculo de red, broadcast y rango de hosts.

### 📋 Máscaras, CIDR y hosts
<table header-row="true">
<tr>
<td>CIDR</td>
<td>Máscara</td>
<td>Hosts útiles</td>
<td>Bloque (último octeto)</td>
</tr>
<tr>
<td>/24</td>
<td>255.255.255.0</td>
<td>254</td>
<td>256</td>
</tr>
<tr>
<td>/25</td>
<td>255.255.255.128</td>
<td>126</td>
<td>128</td>
</tr>
<tr>
<td>/26</td>
<td>255.255.255.192</td>
<td>62</td>
<td>64</td>
</tr>
<tr>
<td>/27</td>
<td>255.255.255.224</td>
<td>30</td>
<td>32</td>
</tr>
<tr>
<td>/28</td>
<td>255.255.255.240</td>
<td>14</td>
<td>16</td>
</tr>
<tr>
<td>/29</td>
<td>255.255.255.248</td>
<td>6</td>
<td>8</td>
</tr>
<tr>
<td>/30</td>
<td>255.255.255.252</td>
<td>2</td>
<td>4</td>
</tr>
</table>
> 🟡 **Fórmulas:** hosts útiles = 2\^(bits de host) − 2 · nº de subredes = 2\^(bits prestados). El −2 corresponde a la dirección de red y a la de broadcast.

### 🧮 Ejemplo resuelto 1 — ¿A qué subred pertenece 192.168.1.100/26?
<details>
<summary>Ver solución paso a paso</summary>
	1. /26 → máscara 255.255.255.192 → bloque de 64 en el último octeto.<br>2. Subredes: 0, 64, 128, 192.<br>3. 100 cae entre 64 y 127 → **red 192.168.1.64**.<br>4. **Broadcast: 192.168.1.127**.<br>5. **Rango de hosts: 192.168.1.65 – 192.168.1.126** (62 hosts útiles).
</details>
### 🧮 Ejemplo resuelto 2 — Necesitas 6 hosts por subred. ¿Qué máscara?
<details>
<summary>Ver solución paso a paso</summary>
	1. 2\^3 − 2 = 6 → necesitas 3 bits de host.<br>2. 32 − 3 = **/29** → 255.255.255.248.<br>3. Bloques de 8 (0, 8, 16, 24...), con 6 hosts útiles cada uno.
</details>
## 2.10 · Router SOHO — configuración típica
<table header-row="true">
<tr>
<td>Función</td>
<td>Para qué sirve</td>
</tr>
<tr>
<td>Port forwarding</td>
<td>Redirige un puerto externo a un host interno concreto</td>
</tr>
<tr>
<td>DMZ</td>
<td>Expone un host completo a internet; úsala con cuidado</td>
</tr>
<tr>
<td>UPnP</td>
<td>Apertura automática de puertos; cómoda pero insegura</td>
</tr>
<tr>
<td>QoS</td>
<td>Prioriza tráfico (VoIP, streaming) frente al resto</td>
</tr>
<tr>
<td>Filtrado MAC</td>
<td>Permite o bloquea equipos por su dirección física</td>
</tr>
<tr>
<td>DHCP + reservas</td>
<td>Reparte IP y fija algunas por MAC</td>
</tr>
<tr>
<td>SSID / WPA3 / WPS</td>
<td>Nombre de red y cifrado moderno; desactivar WPS</td>
</tr>
</table>
> 🔴 **Trampa:** la **DMZ** expone TODO el host, no un solo puerto. Si solo necesitas un servicio, usa **port forwarding**, no la DMZ.

### 🌐 Esquema de una red SOHO
```mermaid
flowchart LR
    ISP["Internet / ISP"] --> Modem["Módem o ONT"]
    Modem --> Router["Router SOHO<br>NAT + Firewall + DHCP"]
    Router --> Switch["Switch LAN"]
    Router --> AP["Wi-Fi<br>SSID + WPA3"]
    Switch --> PC["PCs por cable"]
    AP --> Movil["Móviles y portátiles"]
```
## 2.11 · IPv6 esencial
<table header-row="true">
<tr>
<td>Tipo</td>
<td>Prefijo</td>
<td>Clave</td>
</tr>
<tr>
<td>Link-local</td>
<td>fe80::/10</td>
<td>Automática, solo enlace local (equivale a APIPA)</td>
</tr>
<tr>
<td>Global unicast</td>
<td>2000::/3</td>
<td>Enrutable en internet</td>
</tr>
<tr>
<td>Unique local</td>
<td>fc00::/7</td>
<td>Privada, análoga a 10.x en IPv4</td>
</tr>
<tr>
<td>Loopback</td>
<td>::1</td>
<td>Equivale a 127.0.0.1</td>
</tr>
</table>
- **128 bits** en hexadecimal; se comprimen los ceros (`2001:0db8:0000:0000:...` → `2001:db8::`).
- **SLAAC:** autoconfiguración de dirección sin DHCP.
- **Dual stack:** IPv4 e IPv6 conviviendo; **tunneling** para transportar uno sobre el otro.
- **Sin NAT ni broadcast:** IPv6 usa multicast y anycast en su lugar.
### 🧩 PBQ — Dominio 2 (escenario)
<details>
<summary>Un PC obtiene 169.254.20.30 y no navega, pero otro con IP fija del rango sí. ¿Diagnóstico y siguiente paso?</summary>
	**Diagnóstico:** APIPA → el cliente no alcanzó el servidor DHCP.<br>**Siguiente paso:** revisar cable/NIC y el servicio DHCP; luego `ipconfig /release` + `ipconfig /renew`.
</details>
<details>
<summary>VoIP entrecortada en un Wi-Fi saturado. ¿Qué configuras en el router SOHO?</summary>
	**QoS** para priorizar el tráfico de voz, y valorar pasar a **5 GHz** o a un canal menos congestionado.
</details>
<details>
<summary>🔍 Repaso rápido del dominio 2</summary>
	- **VoIP en tiempo real:** UDP, por menor sobrecarga.
	- **169.254.x.x:** falló DHCP, solo red local.
	- **SPF, DKIM y DMARC:** registros TXT.
	- **Proceso DHCP:** DORA.
	- **Capa del switch:** 2, decide por MAC.
</details>
### 🧪 Autoevalúate — Dominio 2
<details>
<summary>1. Un equipo tiene IP 169.254.10.5. ¿Qué ha pasado?</summary>
	**No encontró servidor DHCP.** Es una dirección APIPA; solo tiene conectividad local.<br><br>	❌ Tiene un firewall bloqueando internet → APIPA es por falta de DHCP, no por firewall.<br>	❌ El DNS está mal configurado → con APIPA ni siquiera hay ruta a internet.<br>	❌ El cable de red está desconectado → podría ser la causa de no alcanzar DHCP, pero APIPA es el síntoma, no el diagnóstico.
</details>
<details>
<summary>2. ¿Qué protocolo usa VoIP y por qué?</summary>
	**UDP**, porque la menor sobrecarga es más importante que retransmitir paquetes perdidos en tiempo real.<br><br>	❌ TCP → fiable pero con más latencia por retransmisiones; en voz en tiempo real un paquete perdido ya no sirve.<br>	❌ ICMP → es para diagnóstico (ping), no transporta datos de aplicación.
</details>
<details>
<summary>3. Nombra los 4 pasos del proceso DHCP.</summary>
	**DORA:** Discover → Offer → Request → Acknowledge.<br><br>	❌ DORA no es DNS, Offer, Renew, Accept → Renew y Accept no existen en el handshake inicial.<br>	❌ Discover, Obtain, Release, Assign → no es el acrónimo estándar.
</details>
<details>
<summary>4. ¿Qué registros DNS contienen SPF, DKIM y DMARC?</summary>
	Registros **TXT**.<br><br>	❌ MX → son para servidores de correo, no para políticas de autenticación.<br>	❌ A/AAAA → resuelven nombres a IP, no contienen texto de políticas.<br>	❌ CNAME → es un alias, no almacena políticas.
</details>
<details>
<summary>5. ¿En qué capa OSI decide un switch y en qué capa un router?</summary>
	Switch: **capa 2** (MAC). Router: **capa 3** (IP).<br><br>	❌ Switch en capa 3 → eso es un multilayer switch, no un switch básico.<br>	❌ Router en capa 2 → el router opera por IP (capa 3), no por MAC.<br>	❌ Ambos en capa 4 → la capa 4 es transporte (TCP/UDP), no enrutamiento.
</details>
### 🔗 Empareja puerto con servicio — tapa la derecha y recita
<table header-row="true">
<tr>
<td>Puerto</td>
<td>Servicio</td>
</tr>
<tr>
<td>20/21</td>
<td>FTP</td>
</tr>
<tr>
<td>22</td>
<td>SSH</td>
</tr>
<tr>
<td>23</td>
<td>Telnet</td>
</tr>
<tr>
<td>25</td>
<td>SMTP</td>
</tr>
<tr>
<td>53</td>
<td>DNS</td>
</tr>
<tr>
<td>67/68</td>
<td>DHCP</td>
</tr>
<tr>
<td>80</td>
<td>HTTP</td>
</tr>
<tr>
<td>110</td>
<td>POP3</td>
</tr>
<tr>
<td>143</td>
<td>IMAP4</td>
</tr>
<tr>
<td>389</td>
<td>LDAP</td>
</tr>
<tr>
<td>443</td>
<td>HTTPS</td>
</tr>
<tr>
<td>445</td>
<td>SMB</td>
</tr>
<tr>
<td>3389</td>
<td>RDP</td>
</tr>
</table>
> ⚠️ **Top 3 trampas del dominio 2:**<br>① APIPA (169.254.x.x) = sin DHCP, **no** sin internet por otro motivo.<br>② Un access point **no** es un router inalámbrico; son dispositivos distintos.<br>③ NTP usa **UDP/123**, no TCP; memoriza la excepción.

### 🎯 Si ves X, piensa Y — Dominio 2 (ampliado)
> 🎯 Cada fila es un patrón de examen. Si reconoces la pista, la respuesta sale sola.

<table header-row="true">
<tr>
<td>Si ves...</td>
<td>Piensa...</td>
</tr>
<tr>
<td>169.254.x.x / APIPA</td>
<td>Sin DHCP, solo red local. Solución: revisar cable/NIC/DHCP, ipconfig /renew</td>
</tr>
<tr>
<td>Ping a IP sí, ping a nombre no</td>
<td>Fallo de DNS. Verificar con nslookup</td>
</tr>
<tr>
<td>Switch vs Router en la misma pregunta</td>
<td>Switch=capa 2 (MAC), Router=capa 3 (IP)</td>
</tr>
<tr>
<td>Hub mencionado</td>
<td>Capa 1 (Physical), repite señal a todos los puertos, sin inteligencia</td>
</tr>
<tr>
<td>Multilayer switch</td>
<td>Switch con routing: opera en capa 2 y capa 3</td>
</tr>
<tr>
<td>Firewall tradicional vs NGFW</td>
<td>Tradicional=capa 4 (puertos). NGFW=inspecciona hasta capa 7</td>
</tr>
<tr>
<td>UDP mencionado como protocolo</td>
<td>VoIP, DHCP, TFTP, NTP, DNS (consultas), SNMP. Sin conexión, rápido</td>
</tr>
<tr>
<td>TCP mencionado como protocolo</td>
<td>HTTPS, SSH, SMTP, FTP. Orientado a conexión, fiable, retransmite</td>
</tr>
<tr>
<td>Puertos 0–1023</td>
<td>No efímeros (servicios conocidos)</td>
</tr>
<tr>
<td>Puertos 1024–65535</td>
<td>Efímeros (los elige el cliente). TCP y UDP son espacios independientes</td>
</tr>
<tr>
<td>FTP 20 vs 21</td>
<td>20 = datos, 21 = control</td>
</tr>
<tr>
<td>SMTP 25 vs 587 vs 465</td>
<td>25=relay, 587=envío con auth, 465=SMTPS (cifrado)</td>
</tr>
<tr>
<td>IMAP 143 vs 993</td>
<td>143=sin cifrar, 993=IMAPS sobre TLS</td>
</tr>
<tr>
<td>POP3 110 vs 995</td>
<td>110=sin cifrar, 995=POP3S sobre TLS</td>
</tr>
<tr>
<td>Access Point vs Wireless Router</td>
<td>AP = solo Wi‑Fi. Wireless Router = router + switch + AP en uno</td>
</tr>
<tr>
<td>DMZ</td>
<td>Expone TODO el host. Si solo necesitas un puerto, usa port forwarding</td>
</tr>
<tr>
<td>DORA</td>
<td>Discover → Offer → Request → Acknowledge (proceso DHCP)</td>
</tr>
<tr>
<td>DHCP scope vs reservation</td>
<td>Scope = rango dinámico. Reservation = IP fija por MAC (static DHCP)</td>
</tr>
<tr>
<td>SPF, DKIM, DMARC</td>
<td>Registros TXT del DNS. Autenticación de correo</td>
</tr>
<tr>
<td>NTP / sincronización de hora</td>
<td>UDP/123. No es TCP</td>
</tr>
<tr>
<td>QoS / VoIP entrecortada</td>
<td>Priorizar tráfico de voz en el router</td>
</tr>
<tr>
<td>Port forwarding vs DMZ</td>
<td>Port forwarding = un puerto a un host. DMZ = todo el host expuesto</td>
</tr>
<tr>
<td>Fibra SMF vs MMF</td>
<td>SMF=láser, núcleo fino, \~100 km. MMF=LED, núcleo ancho, \~2 km</td>
</tr>
<tr>
<td>Conectores fibra LC / SC / ST</td>
<td>LC=Little (clip pequeño), SC=Square (push‑pull), ST=Stick & Twist</td>
</tr>
<tr>
<td>APC vs UPC (fibra)</td>
<td>APC=verde, pulido angular. UPC=azul, pulido plano</td>
</tr>
<tr>
<td>VLAN</td>
<td>Separación lógica con 802.1Q; mismo dominio broadcast separado</td>
</tr>
<tr>
<td>VPN client-to-site vs site-to-site</td>
<td>Client-to-site=bajo demanda. Site-to-site=siempre activa entre sedes</td>
</tr>
<tr>
<td>PoE / PoE+ / PoE++</td>
<td>15.4 W / 25.5 W / 51–71.3 W</td>
</tr>
<tr>
<td>DOCSIS</td>
<td>Estándar de cable módem</td>
</tr>
<tr>
<td>DSL</td>
<td>Línea telefónica, asimétrico, límite \~10.000 pies</td>
</tr>
<tr>
<td>ONT</td>
<td>Fibra hasta el domicilio, punto de demarcación</td>
</tr>
<tr>
<td>IPv4 vs IPv6</td>
<td>32 bits decimal vs 128 bits hexadecimal</td>
</tr>
<tr>
<td>IPv6 link-local / fe80::</td>
<td>Automática, solo enlace local (equivale a APIPA en IPv4)</td>
</tr>
<tr>
<td>IPv6 unique local / fc00::</td>
<td>Privada (análoga a 10.x en IPv4)</td>
</tr>
<tr>
<td>SLAAC</td>
<td>Autoconfiguración de dirección IPv6 sin DHCP</td>
</tr>
<tr>
<td>Dual stack</td>
<td>IPv4 e IPv6 conviviendo en el mismo equipo</td>
</tr>
<tr>
<td>Rangos privados IPv4</td>
<td>10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16</td>
</tr>
<tr>
<td>Subnetting / 2\^n − 2</td>
<td>Hosts útiles. El −2 es por la IP de red y la de broadcast</td>
</tr>
<tr>
<td>DNS registros A / AAAA</td>
<td>A=nombre→IPv4. AAAA=nombre→IPv6</td>
</tr>
<tr>
<td>DNS registros MX / CNAME / TXT</td>
<td>MX=servidor correo. CNAME=alias. TXT=SPF, DKIM, DMARC</td>
</tr>
<tr>
<td>Managed vs Unmanaged switch</td>
<td>Managed=802.1Q, VLAN, SNMP. Unmanaged=plug and play</td>
</tr>
<tr>
<td>Crimper vs Punch-down vs Cable tester</td>
<td>Crimper=fija RJ45. Punch‑down=bloque 110. Tester=continuidad</td>
</tr>
<tr>
<td>Tone generator + probe</td>
<td>Localizar un cable concreto entre muchos</td>
</tr>
<tr>
<td>Loopback plug</td>
<td>Probar un puerto físico enviando señal a sí mismo</td>
</tr>
<tr>
<td>Wi‑Fi analyzer</td>
<td>Ver interferencia, canales ocupados y colocación de AP</td>
</tr>
<tr>
<td>2.4 GHz canales sin solape</td>
<td>Solo 3: 1, 6, 11</td>
</tr>
<tr>
<td>Wi‑Fi 4 / 5 / 6 / 6E</td>
<td>n=Wi‑Fi 4, ac=Wi‑Fi 5, ax=Wi‑Fi 6 y 6E (añade 6 GHz)</td>
</tr>
<tr>
<td>UPnP</td>
<td>Apertura automática de puertos; cómoda pero insegura</td>
</tr>
<tr>
<td>WPS</td>
<td>Wi‑Fi Protected Setup; desactivar por vulnerabilidades de seguridad</td>
</tr>
<tr>
<td>WPA3</td>
<td>Cifrado Wi‑Fi moderno; sustituye a WPA2</td>
</tr>
<tr>
<td>SCADA / ICS</td>
<td>Control industrial; exige segmentación estricta de red</td>
</tr>
<tr>
<td>IoT</td>
<td>Dispositivos conectados; segmentar en VLAN separada</td>
</tr>
<tr>
<td>Proxy</td>
<td>Intermediario: control de acceso, caché, filtrado de URL</td>
</tr>
<tr>
<td>Load balancer</td>
<td>Reparte carga entre servidores; da tolerancia a fallos</td>
</tr>
</table>
[⬆ Volver al índice](#índice-y-pesos-oficiales)
---
