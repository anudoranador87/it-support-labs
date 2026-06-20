// =====================
// RAID LOGIC
// =====================
// aqui la funcion va a recibir los valores solamente.

//hay que crear una funcion que reciba estos 3 variables
function calcular(num, tam, nivel) {

    // declaro antes estas dos variables fuera
    let espacioUtil
    let fallos
  
    const espacioTotalRaw = num * tam
  
    switch (nivel) {
  
      case 0:
        espacioUtil = num * tam
        fallos = 0
        break
  
      case 1:
        espacioUtil = tam * 1
        fallos = num - 1
        break
  
      case 5:
        espacioUtil = (num - 1) * tam
        fallos = 1
        break
  
      case 6:
        espacioUtil = (num - 2) * tam
        fallos = 2
        break
  
      case 10:
        espacioUtil = (num / 2) * tam
        fallos = 1
        break
  
      default:
        espacioUtil = 0
        fallos = 0
    }
  
    // la calculamos despues
    const eficiencia = (espacioUtil / espacioTotalRaw) * 100
  
    return {
      espacioUtil,
      fallos,
      espacioTotalRaw,
      eficiencia
    }
  }
  
  // =====================
  // UI
  // =====================
  
  
  const numDiscos = document.getElementById("num-drives")
  const tamDiscos = document.getElementById("drive-size")
  const nivelRaid = document.getElementById("raid-level")
  const unidad = document.getElementById("unit")
  
  
  // Agregamos la escucha de eventos por cada uno
  function actualizar() {
  
    //convierto los valores a numeros
    const num = Number(numDiscos.value)
    const tam = Number(tamDiscos.value)
    const nivel = Number(nivelRaid.value)
  
    const util = document.getElementById("usable-space")
    const raw = document.getElementById("total-space")
    const efficient = document.getElementById("efficiency")
    const fault = document.getElementById("fault-tolerance")
  
    const descripcion = document.getElementById("raid-description")
  
    const resultado = calcular(num, tam, nivel)
  
    // pintamos resultados
    util.textContent =
      resultado.espacioUtil + " " + unidad.value
  
    raw.textContent =
      resultado.espacioTotalRaw + " " + unidad.value
  
    efficient.textContent =
      resultado.eficiencia.toFixed(1) + "%"
  
    fault.textContent =
      resultado.fallos
  
    // descripcion del raid
    switch (nivel) {
  
      case 0:
        descripcion.textContent =
          "RAID 0 distribuye los datos entre discos. Máximo rendimiento pero sin tolerancia a fallos."
        break
  
      case 1:
        descripcion.textContent =
          "RAID 1 duplica los datos en todos los discos. Alta seguridad pero poca eficiencia."
        break
  
      case 5:
        descripcion.textContent =
          "RAID 5 usa paridad distribuida. Permite el fallo de un disco."
        break
  
      case 6:
        descripcion.textContent =
          "RAID 6 usa doble paridad. Permite el fallo simultáneo de dos discos."
        break
  
      case 10:
        descripcion.textContent =
          "RAID 10 combina mirroring y striping. Buen rendimiento y redundancia."
        break
    }
  
    pintarDiscos(num, nivel)
  }
  
  
  // dibujar discos
  function pintarDiscos(num, nivel) {
  
    const visual = document.getElementById("disk-visual")
  
    visual.innerHTML = ""
  
    for (let i = 0; i < num; i++) {
  
      const disco = document.createElement("div")
  
      disco.classList.add("disk")
  
      disco.textContent =
        "D" + (i + 1)
  
      visual.appendChild(disco)
    }
  }
  
  
  numDiscos.addEventListener("input", actualizar)
  
  tamDiscos.addEventListener("input", actualizar)
  
  nivelRaid.addEventListener("change", actualizar)
  
  unidad.addEventListener("change", actualizar)
  
  
  // primera carga
  actualizar()