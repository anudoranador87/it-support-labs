# Diagnóstico: ping PC1 → PC6 falla (Lab 09, prueba base IPv4)

## Síntoma
`ping 192.168.50.120` desde PC1: 100 % de pérdida (`diag-01-ping-log.txt`).

## Qué está bien (evidencias)
- `ping 192.168.50.1` y `ping 192.168.50.113` responden: PC1 llega a su gateway y a la LAN de R2.
- `diag-02`: R1 tiene `S 192.168.50.112/28 [1/0] via 192.168.50.130`.
- `diag-03`: R2 tiene `S* 0.0.0.0/0 via 192.168.50.129` y las rutas conectadas.
- Por tanto, el enrutamiento de ida y vuelta existe.

## Causa
PC6 **ya no tiene la IP .120**. Pasó a DHCP en el Lab 08 y recibe `192.168.50.118` (`diag-04`: máscara 255.255.255.240, gateway 192.168.50.113). El ping de prueba apuntaba a `.120`, una dirección que ningún equipo tiene, así que no había nadie que contestara.

## Prueba que confirma la causa (hecha)
`ping 192.168.50.118` desde PC1 responde: 3 de 4 paquetes con TTL=126 (`diag-05-ping-pc1-pc6-118-ok.png`). El primer paquete se pierde por ARP, como en el resto de la guía.

TTL 126 = dos saltos (R1 y R2), la misma ruta que el ping a `.120` debería haber seguido. Por tanto, el fallo era solo la dirección equivocada: la ruta funciona de ida y vuelta.
