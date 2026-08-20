---
lab: 08
title: Active Directory Client Join and Authentication
status: planned
area: active-directory
level: advanced
evidence: guide awaiting hands-on evidence
---

# Lab 08: Active Directory Client Join and Authentication

**Prerequisite:** [Lab 07 — Windows Server UEFI/GPT y Active Directory](../07-windows-server-uefi-gpt-ad-ds/)
**Scenario:** unir un cliente Windows a `lab.local`, comprobar la resolución DNS y validar el inicio de sesión de un usuario estándar.

## Objetivo

Completar la parte cliente del entorno AD creado en el Lab 07. El resultado esperado es un equipo Windows unido al dominio, capaz de localizar el controlador de dominio mediante DNS y permitir el inicio de sesión de `LAB\\JoseAparicio`.

## Topología del laboratorio

| Equipo | Función | Configuración esperada |
|---|---|---|
| `WINSERVER-JOSE` | Controlador de dominio y DNS | `192.168.1.200`, dominio `lab.local` |
| Cliente Windows | Equipo unido al dominio | IP de la misma red, DNS apuntando a `192.168.1.200` |
| Usuario | Cuenta estándar de prueba | `LAB\\JoseAparicio` |

> [!WARNING]
> El cliente debe utilizar como DNS preferido la IP del controlador de dominio. No se debe configurar un DNS público como servidor principal para localizar un dominio Active Directory.

## Procedimiento

### Paso 1 — Preparar el cliente

1. Conectar el cliente a la misma red física o virtual que `WINSERVER-JOSE`.
2. Confirmar que el cliente recibe una dirección de la misma subred.
3. Configurar como DNS preferido `192.168.1.200`.
4. Comprobar conectividad básica:

```powershell
ipconfig /all
ping 192.168.1.200
nslookup lab.local 192.168.1.200
```

**Criterio:** el cliente debe alcanzar el servidor y resolver `lab.local` utilizando el DNS del controlador de dominio.

### Paso 2 — Unir el cliente al dominio

1. Abrir `sysdm.cpl` o **Settings → System → About → Domain or workgroup**.
2. Seleccionar **Change settings** y después **Change**.
3. Elegir **Domain** e introducir `lab.local`.
4. Proporcionar credenciales de una cuenta autorizada para unir equipos al dominio.
5. Reiniciar el cliente cuando Windows lo solicite.

### Paso 3 — Validar la pertenencia al dominio

Después del reinicio:

```powershell
whoami
systeminfo | findstr /B /C:"Domain"
nltest /dsgetdc:lab.local
```

El equipo debe identificar `lab.local` como dominio y localizar `WINSERVER-JOSE` como controlador de dominio.

### Paso 4 — Probar el inicio de sesión del usuario

1. En la pantalla de inicio de sesión elegir **Other user**.
2. Introducir `LAB\\JoseAparicio` o `JoseAparicio@lab.local`.
3. Utilizar la contraseña temporal creada en el Lab 07.
4. Cambiar la contraseña cuando Windows lo solicite.
5. Comprobar que el perfil se crea correctamente.

### Paso 5 — Verificación desde el controlador de dominio

En `WINSERVER-JOSE` comprobar que el equipo aparece en el contenedor `Computers` de ADUC, que el usuario mantiene sus permisos estándar, que los registros DNS del cliente se registran correctamente y que no aparecen errores de autenticación en Event Viewer.

## Evidencia

Cuando se ejecute el laboratorio, añadir capturas dentro de `evidence/` y referenciarlas aquí:

```markdown
![Configuración DNS del cliente](evidence/01-client-dns.png)
![Cliente unido a lab.local](evidence/02-domain-join.png)
![Inicio de sesión de JoseAparicio](evidence/03-domain-login.png)
![Cliente visible en ADUC](evidence/04-aduc-client.png)
```

## Causa raíz que se debe validar

El cliente no podrá autenticarse correctamente si utiliza un DNS que no conoce la zona `lab.local`, si está en una subred distinta sin conectividad con el controlador o si la hora del sistema está demasiado desincronizada para Kerberos.

## Checklist final

- [ ] El cliente alcanza `192.168.1.200`.
- [ ] El DNS preferido del cliente apunta al controlador de dominio.
- [ ] `nslookup lab.local` responde desde el DNS del DC.
- [ ] El cliente está unido a `lab.local`.
- [ ] `nltest /dsgetdc:lab.local` localiza el controlador.
- [ ] `LAB\\JoseAparicio` puede iniciar sesión desde el cliente.
- [ ] El usuario cambia la contraseña temporal.
- [ ] El equipo aparece en ADUC.
- [ ] Se documentan capturas y cualquier incidencia encontrada.

## Siguiente paso

Continuar con el [Lab 09 — Active Directory Users, Groups y OUs](../09-ad-users-groups-and-ous/), ampliando la administración de identidades más allá del usuario inicial.
