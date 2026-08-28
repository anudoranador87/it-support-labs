# Arquitectura del Laboratorio AD DS

## Diagrama de Red

```
                    ┌─────────────────────────────┐
                    │         INTERNET             │
                    └──────────────┬───────────────┘
                                   │
                                   │ NAT
                                   │
┌──────────────────────────────────┼───────────────────────────────────┐
│                HOST — Windows 11                                     │
│                IP: 10.10.10.1                                        │
│                Hyper-V habilitado                                     │
│                                                                      │
│    ┌─────────────────────────────┴─────────────────────────────┐     │
│    │              NATSwitch (Internal Virtual Switch)           │     │
│    │                    10.10.10.0/24                           │     │
│    ├───────────────────────┬───────────────────────────────────┤     │
│    │                       │                                   │     │
│    │  ┌────────────────────┴───┐   ┌──────────────────────┐   │     │
│    │  │    TAILWIND-DC1        │   │    TAILWIND-MBR1     │   │     │
│    │  │    10.10.10.10         │   │    10.10.10.20       │   │     │
│    │  │                        │   │                      │   │     │
│    │  │  Windows Server 2022   │   │  Windows Server 2022 │   │     │
│    │  │  Gen2 VM               │   │  Gen2 VM             │   │     │
│    │  │  RAM: 2048-4096 MB     │   │  RAM: 2048-4096 MB   │   │     │
│    │  │  Disco: 60 GB (dyn)    │   │  Disco: 60 GB (dyn)  │   │     │
│    │  │                        │   │                      │   │     │
│    │  │  ROLES:                │   │  ROLES:              │   │     │
│    │  │  • Domain Controller   │   │  • Domain Controller │   │     │
│    │  │  • DNS Server          │   │  • Réplica DC        │   │     │
│    │  │  • FSMO (mayoría)      │   │  • RID Master        │   │     │
│    │  └────────────────────────┘   └──────────────────────┘   │     │
│    └──────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────┘

Dominio: tailwindtraders.internal
Nivel funcional del bosque: Windows Server 2022
```

## Componentes

### Host (Windows 11)
- **Rol**: Hipervisor y gateway NAT
- **IP interna**: 10.10.10.1 (interfaz vEthernet NATSwitch)
- **Requisitos**: Windows 11 Pro/Enterprise, virtualización habilitada en BIOS/UEFI
- **RAM recomendada**: 16 GB mínimo (8 GB con ajustes de Dynamic Memory)
- **Espacio**: 100+ GB libres

### TAILWIND-DC1
- **IP**: 10.10.10.10
- **Máscara**: 255.255.255.0
- **Gateway**: 10.10.10.1
- **DNS**: 127.0.0.1 (a sí mismo, tras ser DC) / 1.1.1.1 (temporal pre-promoción)
- **Rol**: Primer Domain Controller del bosque `tailwindtraders.internal`
- **FSMO Roles**: Schema Master, Domain Naming Master, PDC Emulator, Infrastructure Master
- **Generación VM**: Gen 2

### TAILWIND-MBR1
- **IP**: 10.10.10.20
- **Máscara**: 255.255.255.0
- **Gateway**: 10.10.10.1
- **DNS primario**: 10.10.10.10 (DC1) ← **No un DNS público**
- **Rol**: Segundo Domain Controller (réplica)
- **FSMO Roles**: RID Master (transferido desde DC1)
- **Generación VM**: Gen 2

> **Nota importante**: El DNS del member server (MBR1) apunta al DC porque necesita resolver nombres del dominio `tailwindtraders.internal`. Un DNS público como 1.1.1.1 no conoce ese dominio — esta es una pregunta clásica de entrevista L1.

## Red Virtual

| Componente | Valor |
|---|---|
| Tipo de switch | Internal |
| Nombre | NATSwitch |
| Subred | 10.10.10.0/24 |
| Gateway/Host | 10.10.10.1 |
| NAT | Habilitado (salida a internet) |

### ¿Por qué Internal con NAT y no External/Bridged?

- **Aislamiento**: El lab no interfiere con la red doméstica real
- **Reproducibilidad**: Las IPs son fijas y predecibles
- **Seguridad**: El dominio de prueba no se expone a la red real
- **Portabilidad**: Funciona igual en cualquier red física

## Sites y Subnets de AD

| Site | Subnet |
|---|---|
| Sydney | 172.16.1.0/24 |

## Estructura de OUs

```
tailwindtraders.internal
├── Sydney
├── Melbourne
└── Brisbane
```

## Tabla de Ajuste de RAM

| RAM del host | RAM inicial/VM | Dynamic Memory | Recomendación |
|---|---|---|---|
| 8 GB | 2048 MB (mín. 1024) | Activado, máx. 3072 MB | Arranca VMs una a una |
| 16 GB | 3072–4096 MB | Activado, máx. 4096 MB | Ambas VMs simultáneas |
| 32 GB+ | 4096 MB | Opcional | Guía original sin cambios |
