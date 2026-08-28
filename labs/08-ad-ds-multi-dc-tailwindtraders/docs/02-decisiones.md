# Decisiones Técnicas

Documentación de las decisiones de diseño más relevantes del laboratorio, con el razonamiento detrás de cada una.

---

## 1. IP estática en el Domain Controller

**Decisión**: Asignar IP fija 10.10.10.10 a TAILWIND-DC1 en lugar de usar DHCP.

**Por qué**: Un Domain Controller aloja el servicio DNS del dominio. Si su IP cambiara (como ocurriría con DHCP), todos los clientes del dominio perderían la referencia al DNS y no podrían resolver nombres como `tailwindtraders.internal`. Además, los registros SRV que AD publica en DNS apuntan a esa IP — un cambio rompería la localización de servicios del dominio.

**Impacto real**: En producción, un DC con IP dinámica es un incidente de nivel crítico. Es una de las primeras cosas que se verifican en un diagnóstico de dominio.

---

## 2. DNS del member server apunta al DC, no a un DNS público

**Decisión**: Configurar el DNS primario de TAILWIND-MBR1 como 10.10.10.10 (DC1), no como 1.1.1.1 o 8.8.8.8.

**Por qué**: MBR1 necesita resolver nombres internos del dominio (`tailwindtraders.internal`, registros SRV de AD, nombres de los otros DCs). Un DNS público como Cloudflare o Google no sabe nada de ese dominio privado — solo resuelve nombres de internet. Sin DNS interno, MBR1 no podría unirse al dominio, localizar un DC para autenticarse, ni aplicar Group Policy.

**Pregunta de entrevista clásica**: "¿Por qué un PC unido a dominio no funciona bien si cambias su DNS a 8.8.8.8?" — la respuesta es exactamente esta.

---

## 3. Red Internal con NAT en lugar de External/Bridged

**Decisión**: Crear un switch virtual interno (NATSwitch) con NAT habilitado, en vez de un switch externo conectado a la red doméstica.

**Por qué**:
- **Aislamiento**: El dominio de laboratorio no interfiere con la red real del hogar
- **Control total**: Las IPs son predecibles (10.10.10.0/24) y no dependen del router doméstico
- **Seguridad**: No se expone un Domain Controller a la red doméstica
- **Reproducibilidad**: El lab funciona igual en cualquier ubicación física

**Concesión**: Se pierde la capacidad de acceder a las VMs desde otros dispositivos de la red doméstica, pero para un lab de práctica no es necesario.

---

## 4. Fine-Grained Password Policy (FGPP) para Domain Admins

**Decisión**: Aplicar una política de contraseñas de 16 caracteres mínimos al grupo Domain Admins, frente a los 14 de la política general del dominio.

**Por qué**: El principio de "a mayor privilegio, mayor exigencia de seguridad" es un concepto fundamental tanto en exámenes de certificación como en producción real. Una cuenta de Domain Admin comprometida tiene acceso total al bosque — exigir contraseñas más largas y complejas es una mitigación proporcional al riesgo.

**Contexto técnico**: FGPP (Fine-Grained Password Policies) permite definir políticas de contraseña diferentes para grupos específicos, algo que la Default Domain Policy no soporta (aplica a todos por igual). Esto fue introducido en Windows Server 2008 y es una herramienta infrautilizada en muchas organizaciones.

---

## 5. Dynamic Memory en las VMs

**Decisión**: Activar Dynamic Memory en ambas VMs con un mínimo de 2048 MB y máximo de 3072-4096 MB, en lugar de asignar RAM fija.

**Por qué**: Con un equipo host de 8-16 GB, reservar 4 GB fijos por VM (como sugiere la guía de Microsoft) no es viable. Dynamic Memory permite que Hyper-V asigne RAM bajo demanda — la VM arranca con el mínimo y solo consume más cuando lo necesita, liberando recursos para el host y la otra VM.

**Riesgo controlado**: En producción, la RAM dinámica puede causar problemas de rendimiento bajo carga alta. En un lab de práctica con carga mínima, es la solución correcta.

---

## 6. Desactivar checkpoints automáticos

**Decisión**: Desactivar los checkpoints automáticos en ambas VMs al crearlas.

**Por qué**: Los checkpoints automáticos de Hyper-V consumen espacio en disco y RAM adicional cada vez que se apaga/enciende la VM. En un equipo con recursos limitados, este consumo silencioso puede degradar el rendimiento sin que el usuario sepa por qué. Los checkpoints manuales (cuando realmente los necesites) siguen disponibles.

---

## 7. Transferir el rol FSMO RID Master a MBR1

**Decisión**: Mover el rol RID Master de DC1 a MBR1 en lugar de dejarlo todo en DC1.

**Por qué**: Demostrar que se entiende el concepto de FSMO (Flexible Single Master Operations) y que los roles pueden — y deben — distribuirse entre DCs para balanceo de carga y como preparación para disaster recovery. Si DC1 fallara y tuviera todos los roles, el dominio perdería funcionalidad crítica. Distribuir roles es una práctica de producción real.

---

## 8. Delegación de control vs. hacer Domain Admin

**Decisión**: Usar el wizard "Delegate Control" para dar permisos de reset de contraseña al grupo Sydney Administrators sobre la OU Sydney, en vez de añadirlos como Domain Admins.

**Por qué**: El principio de mínimo privilegio (least privilege) es un pilar de seguridad IT. Un técnico de helpdesk en Sydney solo necesita resetear contraseñas de usuarios de Sydney — no necesita acceso a todo el dominio. Hacerlo Domain Admin sería un riesgo de seguridad innecesario y una mala práctica que muchas organizaciones aún cometen.
