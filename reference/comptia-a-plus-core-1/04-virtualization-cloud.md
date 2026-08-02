# Dominio 4 · Virtualization & Cloud (11%)
## 4.1 · Modelos de servicio en la nube
<table header-row="true">
<tr>
<td>Modelo</td>
<td>Qué gestiona el proveedor</td>
<td>Qué gestionas tú</td>
<td>Ejemplo</td>
</tr>
<tr>
<td>IaaS</td>
<td>Hardware, red y virtualización</td>
<td>SO, apps y datos</td>
<td>AWS EC2, Azure VM</td>
</tr>
<tr>
<td>PaaS</td>
<td>Todo hasta el runtime</td>
<td>Solo tu app y datos</td>
<td>App Engine, Heroku</td>
</tr>
<tr>
<td>SaaS</td>
<td>Toda la pila</td>
<td>Solo la configuración de usuario</td>
<td>Microsoft 365, Gmail</td>
</tr>
</table>
> 🧠 **Mnemotecnia de responsabilidad:** cuanto más "aaS" hacia SaaS, **menos** gestionas tú. IaaS = *I manage* (tú gestionas casi todo), SaaS = *Someone else manages* (el proveedor lo gestiona casi todo).

## 4.1 · Modelos de despliegue
<table header-row="true">
<tr>
<td>Despliegue</td>
<td>Clave</td>
</tr>
<tr>
<td>Pública</td>
<td>Recursos compartidos de un proveedor por internet</td>
</tr>
<tr>
<td>Privada</td>
<td>Infraestructura dedicada a una sola organización</td>
</tr>
<tr>
<td>Híbrida</td>
<td>Combina pública y privada; datos sensibles en privada</td>
</tr>
<tr>
<td>Comunitaria</td>
<td>Compartida por varias organizaciones con intereses comunes</td>
</tr>
</table>
> 🔴 **Trampa:** no confundas híbrida con comunitaria — **híbrida** combina pública y privada de **una misma organización**; **comunitaria** la comparten **varias organizaciones distintas** con intereses comunes (ej. varios hospitales).

## 4.1 · Características de la nube
<table header-row="true">
<tr>
<td>Concepto</td>
<td>Qué significa</td>
</tr>
<tr>
<td>Elasticity</td>
<td>Ajusta recursos automáticamente según la demanda del momento</td>
</tr>
<tr>
<td>Scalability</td>
<td>Capacidad planificada de crecer añadiendo recursos</td>
</tr>
<tr>
<td>Rapid elasticity</td>
<td>Escala en minutos, casi sin intervención</td>
</tr>
<tr>
<td>Measured service</td>
<td>Pago por uso, se mide el consumo</td>
</tr>
<tr>
<td>On-demand</td>
<td>Autoservicio inmediato sin pedir al proveedor</td>
</tr>
<tr>
<td>High availability</td>
<td>Redundancia para minimizar el tiempo de caída</td>
</tr>
</table>
> 🔴 **Trampa clásica — Elasticity vs Scalability:** *elasticity* es automática y reversible (sube y baja al momento); *scalability* es el crecimiento planificado a largo plazo. El examen las confunde a propósito.

- **Cloud file sync:** OneDrive, Google Drive; sincroniza archivos entre dispositivos.
- **VDI (Virtual Desktop Infrastructure):** escritorios virtuales alojados en la nube o en el datacenter.
## 4.2 · Virtualización
<table header-row="true">
<tr>
<td>Hypervisor</td>
<td>Dónde corre</td>
<td>Uso</td>
</tr>
<tr>
<td>Tipo 1 (bare-metal)</td>
<td>Directo sobre el hardware</td>
<td>Servidores, datacenter; más rápido</td>
</tr>
<tr>
<td>Tipo 2 (hosted)</td>
<td>Sobre un SO anfitrión</td>
<td>Escritorio y pruebas (VirtualBox, VMware Workstation)</td>
</tr>
</table>
- **VM:** sistema completo y aislado con SO propio.
- **Sandbox:** entorno aislado para probar software o malware sin riesgo.
- **Requisitos:** CPU con virtualización (Intel VT-x / AMD-V) activada en la BIOS/UEFI, RAM suficiente y almacenamiento para cada VM.
- **Recursos:** cada VM reserva CPU, RAM, disco y red virtual.
> 🟢 **Propósitos de la virtualización:** consolidar servidores, aislar aplicaciones, hacer pruebas seguras, dar formación, virtualizar aplicaciones heredadas y facilitar la recuperación ante desastres.

> 🧠 **Hypervisor tipo 1 vs tipo 2 — ejemplos de examen:**<br>**Tipo 1 (bare-metal):** VMware ESXi, Microsoft Hyper-V, Proxmox, Citrix Hypervisor → producción y datacenter.<br>**Tipo 2 (hosted):** VMware Workstation/Player, Oracle VirtualBox, Parallels → escritorio, pruebas y laboratorio.

> 🔴 **Trampa:** sin **virtualización habilitada en la BIOS/UEFI** (VT-x / AMD-V) el hypervisor no arranca las VM de 64 bits, aunque el hardware la soporte.

### 🧩 PBQ — Dominio 4 (escenario)
<details>
<summary>Una startup quiere desplegar su app sin gestionar SO ni parches, solo el código. ¿Qué modelo de servicio?</summary>
	**PaaS** — el proveedor gestiona todo hasta el runtime; tú solo subes tu app y tus datos.
</details>
<details>
<summary>La web sufre picos de tráfico impredecibles y quieres que escale sola y vuelva a bajar. ¿Qué característica de nube?</summary>
	**Elasticity** (rapid elasticity): ajuste automático y reversible según la demanda.
</details>
<details>
<summary>Una VM de 64 bits no arranca en un portátil compatible. ¿Qué revisas primero?</summary>
	Que **VT-x / AMD-V** esté **habilitado en la BIOS/UEFI**.
</details>
<details>
<summary>🔍 Repaso rápido del dominio 4</summary>
	- **IaaS, PaaS, SaaS:** de más a menos gestión propia.
	- **Elasticity vs scalability:** automática y reversible vs crecimiento planificado.
	- **Hypervisor tipo 1 vs 2:** bare-metal vs sobre un SO anfitrión.
	- **Requisito de VM:** virtualización activada en la BIOS/UEFI.
	- **Sandbox:** entorno aislado para pruebas.
</details>
### 🧪 Autoevalúate — Dominio 4
<details>
<summary>1. En SaaS, ¿qué gestiona el cliente?</summary>
	Prácticamente nada de infraestructura: solo la **configuración y los datos de usuario**. El proveedor gestiona toda la pila.<br><br>	❌ El sistema operativo → eso es en IaaS, no en SaaS.<br>	❌ Las aplicaciones y el runtime → eso es responsabilidad del proveedor en SaaS; en PaaS tú gestionas la app.<br>	❌ El hardware y la red → eso es en IaaS; en SaaS todo eso es del proveedor.
</details>
<details>
<summary>2. ¿Qué diferencia hay entre elasticity y scalability?</summary>
	**Elasticity** ajusta recursos automáticamente y de forma reversible según la demanda; **scalability** es el crecimiento planificado añadiendo recursos.<br><br>	❌ Son lo mismo → no: elasticity es automática y reversible (sube y baja), scalability es planificada a largo plazo.<br>	❌ Elasticity es permanente → no, elasticity es reversible; cuando baja la demanda, los recursos se liberan.<br>	❌ Scalability es automática → no, scalability requiere planificación; elasticity es la automática.
</details>
<details>
<summary>3. ¿Qué tipo de hypervisor corre directamente sobre el hardware?</summary>
	El **tipo 1 (bare-metal)**.<br><br>	❌ Tipo 2 → el tipo 2 corre sobre un SO anfitrión (hosted), no directo sobre el hardware.<br>	❌ Ambos tipos → no, solo el tipo 1 (ESXi, Hyper-V, Proxmox) va sobre el hardware directamente.<br>	❌ VirtualBox → es tipo 2, necesita un SO anfitrión.
</details>
<details>
<summary>4. ¿Qué hay que activar en la BIOS/UEFI para ejecutar máquinas virtuales?</summary>
	La **virtualización de CPU**: Intel VT-x o AMD-V.<br><br>	❌ Secure Boot → es para verificar firmas de bootloader, no para virtualización.<br>	❌ Hyper-Threading → es para multitarea en la CPU, no habilita virtualización.<br>	❌ TPM → es para seguridad y cifrado, no para ejecutar VMs.
</details>
<details>
<summary>5. ¿Qué modelo de despliegue combina nube pública y privada?</summary>
	La nube **híbrida**.<br><br>	❌ Comunitaria → la comparten varias organizaciones con intereses comunes, no combina pública y privada de una misma.<br>	❌ Pública → solo usa recursos del proveedor, no combina con infraestructura privada.<br>	❌ Privada → es solo para una organización, sin parte pública.
</details>
> ⚠️ **Top 3 trampas del dominio 4:**<br>① IaaS = tú gestionas más; SaaS = el proveedor gestiona casi todo.<br>② Elasticity (automática y reversible) ≠ scalability (crecimiento planificado).<br>③ Sin VT-x / AMD-V activado no hay VM de 64 bits.

### 🎯 Si ves X, piensa Y — Dominio 4
<table header-row="true">
<tr>
<td>Si ves...</td>
<td>Piensa...</td>
</tr>
<tr>
<td>IaaS / PaaS / SaaS</td>
<td>IaaS=yo gestiono SO y apps. PaaS=solo mi app. SaaS=solo config</td>
</tr>
<tr>
<td>Elasticity vs Scalability</td>
<td>Elasticity=automática y reversible. Scalability=crecimiento planificado</td>
</tr>
<tr>
<td>Híbrida vs Comunitaria</td>
<td>Híbrida=una organización (pública+privada). Comunitaria=varias organizaciones</td>
</tr>
<tr>
<td>Hypervisor tipo 1</td>
<td>Bare-metal, directo sobre hardware. ESXi, Hyper-V, Proxmox</td>
</tr>
<tr>
<td>Hypervisor tipo 2</td>
<td>Sobre un SO anfitrión. VirtualBox, VMware Workstation</td>
</tr>
<tr>
<td>VM no arranca / 64 bits</td>
<td>VT-x / AMD-V no activado en la BIOS/UEFI</td>
</tr>
<tr>
<td>Sandbox</td>
<td>Entorno aislado para pruebas sin riesgo al sistema real</td>
</tr>
<tr>
<td>Rapid elasticity</td>
<td>Escala en minutos, sin intervención humana</td>
</tr>
<tr>
<td>Measured service</td>
<td>Pago por uso, se mide el consumo real</td>
</tr>
</table>
[⬆ Volver al índice](#índice-y-pesos-oficiales)
---
