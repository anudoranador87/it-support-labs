// ==========================================================================
// TRANSLATION ENGINE & DATA
// ==========================================================================

const TRANSLATIONS = {
  es: {
    title: "Calculadora RAID",
    subtitle: "Calcula espacio útil, eficiencia y tolerancia a fallos",
    labelNumDrives: "Número de discos",
    labelDriveSize: "Tamaño por disco",
    labelRaidLevel: "Nivel RAID",
    labelUsableSpace: "Espacio útil",
    labelTotalSpace: "Espacio total raw",
    labelEfficiency: "Eficiencia",
    labelFaultTolerance: "Tolerancia a fallos",
    diagramTitle: "Estructura del Array",
    legendData: "Datos (Stripe)",
    legendMirror: "Espejo (Mirror)",
    legendParityP: "Paridad P",
    legendParityQ: "Paridad Q",
    defaultDescription: "Selecciona un nivel RAID para ver la descripción.",
    warningDrives: "⚠️ Por favor, ingresa números mayores a 0 para discos y tamaño.",
    warningRaid0: "⚠️ RAID 0 requiere al menos 2 discos.",
    warningRaid1: "⚠️ RAID 1 requiere al menos 2 discos.",
    warningRaid5: "⚠️ RAID 5 requiere al menos 3 discos.",
    warningRaid6: "⚠️ RAID 6 requiere al menos 4 discos.",
    warningRaid10Min: "⚠️ RAID 10 requiere al menos 4 discos y un número par.",
    warningRaid10Even: "⚠️ RAID 10 requiere un número par de discos.",
    diskLabel: "Disco",
    diskGroupLabel: "Set Espejo",
    blockData: "Dato",
    blockMirror: "Espejo",
    blockParity: "Paridad",
    unitGB: "GB",
    unitTB: "TB"
  },
  en: {
    title: "RAID Calculator",
    subtitle: "Calculate usable space, efficiency, and fault tolerance",
    labelNumDrives: "Number of drives",
    labelDriveSize: "Size per drive",
    labelRaidLevel: "RAID Level",
    labelUsableSpace: "Usable space",
    labelTotalSpace: "Total raw space",
    labelEfficiency: "Efficiency",
    labelFaultTolerance: "Fault tolerance",
    diagramTitle: "Array Structure",
    legendData: "Data (Stripe)",
    legendMirror: "Mirror Copy",
    legendParityP: "Parity P",
    legendParityQ: "Parity Q",
    defaultDescription: "Select a RAID level to see the description.",
    warningDrives: "⚠️ Please enter numbers greater than 0 for drives and size.",
    warningRaid0: "⚠️ RAID 0 requires at least 2 disks.",
    warningRaid1: "⚠️ RAID 1 requires at least 2 disks.",
    warningRaid5: "⚠️ RAID 5 requires at least 3 disks.",
    warningRaid6: "⚠️ RAID 6 requires at least 4 disks.",
    warningRaid10Min: "⚠️ RAID 10 requires at least 4 disks and an even number.",
    warningRaid10Even: "⚠️ RAID 10 requires an even number of disks.",
    diskLabel: "Drive",
    diskGroupLabel: "Mirror Set",
    blockData: "Data",
    blockMirror: "Mirror",
    blockParity: "Parity",
    unitGB: "GB",
    unitTB: "TB"
  }
};

let currentLang = "es";

// ==========================================================================
// RAID LEVEL SPECIFIC CONFIGURATIONS (Single Source of Truth)
// ==========================================================================

const RAID_CONFIGS = {
  0: {
    validate: (num) => num >= 2 ? null : "warningRaid0",
    calc: (num, size) => ({
      usable: num * size,
      raw: num * size,
      efficiency: 100,
      faults: "0"
    }),
    description: {
      es: "RAID 0 distribuye los datos equitativamente entre los discos (striping) sin redundancia. Ofrece la velocidad de lectura/escritura más rápida, pero si un solo disco falla, se pierden todos los datos del array. Utilizado en sistemas donde el rendimiento es crítico y los datos no son irremplazables.",
      en: "RAID 0 stripes data evenly across all disks without redundancy. It offers the fastest read/write performance, but if a single drive fails, all data in the array is lost. Used in systems where performance is critical and data is not irreplaceable."
    }
  },
  1: {
    validate: (num) => num >= 2 ? null : "warningRaid1",
    calc: (num, size) => ({
      usable: size,
      raw: num * size,
      efficiency: (1 / num) * 100,
      faults: `${num - 1}`
    }),
    description: {
      es: "RAID 1 duplica exactamente la información en todos los discos del array (mirroring). Ofrece una excelente tolerancia a fallos (pueden fallar todos los discos excepto uno), pero tiene un coste de almacenamiento alto, ya que el espacio útil siempre es equivalente a un solo disco.",
      en: "RAID 1 duplicates data exactly across all disks in the array (mirroring). It offers excellent fault tolerance (all drives except one can fail), but at a high storage cost, since usable capacity is always equivalent to a single drive."
    }
  },
  5: {
    validate: (num) => num >= 3 ? null : "warningRaid5",
    calc: (num, size) => ({
      usable: (num - 1) * size,
      raw: num * size,
      efficiency: ((num - 1) / num) * 100,
      faults: "1"
    }),
    description: {
      es: "RAID 5 distribuye los datos y la información de paridad a nivel de bloques por todos los discos. Permite el fallo de exactamente un disco sin pérdida de datos. Proporciona un excelente equilibrio entre velocidad de lectura, coste y redundancia.",
      en: "RAID 5 stripes data and parity information at block-level across all disks. It allows exactly one disk to fail without data loss. It provides a great balance of read speed, storage capacity, and redundancy."
    }
  },
  6: {
    validate: (num) => num >= 4 ? null : "warningRaid6",
    calc: (num, size) => ({
      usable: (num - 2) * size,
      raw: num * size,
      efficiency: ((num - 2) / num) * 100,
      faults: "2"
    }),
    description: {
      es: "RAID 6 es similar a RAID 5 pero almacena doble información de paridad independiente distribuida por todos los discos. Puede tolerar el fallo simultáneo de hasta dos discos. Es ideal para arrays de alta capacidad que requieren máxima fiabilidad.",
      en: "RAID 6 is similar to RAID 5 but stores double independent parity information distributed across all drives. It can tolerate the simultaneous failure of up to two disks. Ideal for high-capacity arrays requiring maximum reliability."
    }
  },
  10: {
    validate: (num) => {
      if (num < 4) return "warningRaid10Min";
      if (num % 2 !== 0) return "warningRaid10Even";
      return null;
    },
    calc: (num, size) => ({
      usable: (num / 2) * size,
      raw: num * size,
      efficiency: 50,
      faults: currentLang === "es" ? "1 (mín.) - " + (num / 2) + " (máx.)" : "1 (min.) - " + (num / 2) + " (max.)"
    }),
    description: {
      es: "RAID 10 (1+0) combina la velocidad de RAID 0 (striping) con la seguridad de RAID 1 (mirroring). Requiere al menos 4 discos y un número par. Los discos se agrupan en parejas espejo (mirrors) y la información se divide en bandas (stripes) entre los grupos. Sobrevive a múltiples fallos de discos siempre que no caigan ambos de una misma pareja.",
      en: "RAID 10 (1+0) combines the speed of RAID 0 (striping) with the safety of RAID 1 (mirroring). It requires at least 4 drives and always an even number. Drives are grouped into mirrored sets, and data is striped across these groups. It can survive multiple drive failures as long as both members of the same mirror set do not fail."
    }
  }
};

// ==========================================================================
// DOM SELECTORS
// ==========================================================================

const DOM = {
  // Input fields
  numDrives: document.getElementById("num-drives"),
  driveSize: document.getElementById("drive-size"),
  raidLevel: document.getElementById("raid-level"),
  unit: document.getElementById("unit"),
  
  // Results
  usableSpace: document.getElementById("usable-space"),
  totalSpace: document.getElementById("total-space"),
  efficiency: document.getElementById("efficiency"),
  faultTolerance: document.getElementById("fault-tolerance"),
  description: document.getElementById("raid-description"),
  
  // Visual Array
  diskVisual: document.getElementById("disk-visual"),
  
  // Warnings
  warningBanner: document.getElementById("warning-banner"),
  warningText: document.getElementById("warning-text"),
  
  // Translation Targets
  headerTitle: document.getElementById("header-title"),
  headerSubtitle: document.getElementById("header-subtitle"),
  labelNumDrives: document.getElementById("label-num-drives"),
  labelDriveSize: document.getElementById("label-drive-size"),
  labelRaidLevel: document.getElementById("label-raid-level"),
  labelUsableSpace: document.getElementById("label-usable-space"),
  labelTotalSpace: document.getElementById("label-total-space"),
  labelEfficiency: document.getElementById("label-efficiency"),
  labelFaultTolerance: document.getElementById("label-fault-tolerance"),
  diagramTitle: document.getElementById("diagram-title"),
  legendData: document.getElementById("legend-data"),
  legendMirror: document.getElementById("legend-mirror"),
  legendParityP: document.getElementById("legend-parity-p"),
  legendParityQ: document.getElementById("legend-parity-q"),
  
  // Legends items (to toggle visibility)
  legendMirrorItem: document.getElementById("legend-mirror-item"),
  legendParityPItem: document.getElementById("legend-parity-p-item"),
  legendParityQItem: document.getElementById("legend-parity-q-item"),
  
  // Stats cards (for styling errors)
  statUsable: document.getElementById("stat-usable"),
  statTotal: document.getElementById("stat-total"),
  statEfficiency: document.getElementById("stat-efficiency"),
  statFault: document.getElementById("stat-fault"),
  
  // Languages
  btnEs: document.getElementById("btn-es"),
  btnEn: document.getElementById("btn-en")
};

// Helper to map row indices to letters for stripes
const getStripeLetter = (index) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[index % alphabet.length];
};

// ==========================================================================
// TRANSLATION HANDLERS
// ==========================================================================

function updateLanguageUI() {
  const t = TRANSLATIONS[currentLang];
  
  // Text content updates
  DOM.headerTitle.textContent = t.title;
  DOM.headerSubtitle.textContent = t.subtitle;
  DOM.labelNumDrives.textContent = t.labelNumDrives;
  DOM.labelDriveSize.textContent = t.labelDriveSize;
  DOM.labelRaidLevel.textContent = t.labelRaidLevel;
  DOM.labelUsableSpace.textContent = t.labelUsableSpace;
  DOM.labelTotalSpace.textContent = t.labelTotalSpace;
  DOM.labelEfficiency.textContent = t.labelEfficiency;
  DOM.labelFaultTolerance.textContent = t.labelFaultTolerance;
  DOM.diagramTitle.textContent = t.diagramTitle;
  DOM.legendData.textContent = t.legendData;
  DOM.legendMirror.textContent = t.legendMirror;
  DOM.legendParityP.textContent = t.legendParityP;
  DOM.legendParityQ.textContent = t.legendParityQ;
  
  // Recalculate and update descriptions and warnings
  actualizar();
}

DOM.btnEs.addEventListener("click", () => {
  currentLang = "es";
  DOM.btnEs.classList.add("active");
  DOM.btnEn.classList.remove("active");
  updateLanguageUI();
});

DOM.btnEn.addEventListener("click", () => {
  currentLang = "en";
  DOM.btnEn.classList.add("active");
  DOM.btnEs.classList.remove("active");
  updateLanguageUI();
});

// ==========================================================================
// MAIN CONTROLLER & CALCULATOR
// ==========================================================================

function actualizar() {
  const num = parseInt(DOM.numDrives.value, 10);
  const size = parseFloat(DOM.driveSize.value);
  const nivel = parseInt(DOM.raidLevel.value, 10);
  const unitVal = DOM.unit.value;
  
  const t = TRANSLATIONS[currentLang];
  const config = RAID_CONFIGS[nivel];
  
  // 1. General boundaries check
  if (isNaN(num) || isNaN(size) || num <= 0 || size <= 0) {
    showWarning(t.warningDrives);
    invalidateStats();
    pintarDiscosPlaceholder(num || 4, true);
    DOM.description.textContent = t.defaultDescription;
    return;
  }
  
  // 2. RAID Level requirements validation
  const validationErrorKey = config.validate(num);
  if (validationErrorKey) {
    showWarning(t[validationErrorKey]);
    invalidateStats();
    pintarDiscosPlaceholder(num, true);
    DOM.description.textContent = config.description[currentLang];
    toggleLegendItems(nivel, false);
    return;
  }
  
  // 3. Calculation & successful state updates
  hideWarning();
  toggleLegendItems(nivel, true);
  
  const results = config.calc(num, size);
  
  DOM.usableSpace.textContent = `${results.usable.toFixed(1)} ${unitVal}`;
  DOM.totalSpace.textContent = `${results.raw.toFixed(1)} ${unitVal}`;
  DOM.efficiency.textContent = `${results.efficiency.toFixed(0)}%`;
  DOM.faultTolerance.textContent = results.faults;
  DOM.description.textContent = config.description[currentLang];
  
  // Draw physical drives layout
  pintarDiscos(num, nivel);
}

// ==========================================================================
// STATE MANAGEMENT & UI SUB-FUNCTIONS
// ==========================================================================

function showWarning(message) {
  DOM.warningText.textContent = message;
  DOM.warningBanner.classList.remove("hidden");
  
  // Add error styles to cards
  [DOM.statUsable, DOM.statTotal, DOM.statEfficiency, DOM.statFault].forEach(card => {
    card.classList.add("error-state");
  });
}

function hideWarning() {
  DOM.warningBanner.classList.add("hidden");
  
  // Remove error styles from cards
  [DOM.statUsable, DOM.statTotal, DOM.statEfficiency, DOM.statFault].forEach(card => {
    card.classList.remove("error-state");
  });
}

function invalidateStats() {
  DOM.usableSpace.textContent = "—";
  DOM.totalSpace.textContent = "—";
  DOM.efficiency.textContent = "—";
  DOM.faultTolerance.textContent = "—";
}

function toggleLegendItems(nivel, isValid) {
  if (!isValid) {
    DOM.legendMirrorItem.style.display = "none";
    DOM.legendParityPItem.style.display = "none";
    DOM.legendParityQItem.style.display = "none";
    return;
  }
  
  // Default values
  DOM.legendMirrorItem.style.display = "none";
  DOM.legendParityPItem.style.display = "none";
  DOM.legendParityQItem.style.display = "none";
  
  if (nivel === 1 || nivel === 10) {
    DOM.legendMirrorItem.style.display = "flex";
  } else if (nivel === 5) {
    DOM.legendMirrorItem.style.display = "none";
    DOM.legendParityPItem.style.display = "flex";
  } else if (nivel === 6) {
    DOM.legendMirrorItem.style.display = "none";
    DOM.legendParityPItem.style.display = "flex";
    DOM.legendParityQItem.style.display = "flex";
  }
}

// Creates active disk element structure
function createDiskElement(diskNum, isWarningState) {
  const disk = document.createElement("div");
  disk.classList.add("disk");
  if (isWarningState) disk.classList.add("warning-state");
  
  // Disk Plate
  const plate = document.createElement("div");
  plate.classList.add("disk-plate");
  disk.appendChild(plate);
  
  // Disk Header Info
  const info = document.createElement("div");
  info.classList.add("disk-info");
  
  const name = document.createElement("span");
  name.classList.add("disk-name");
  name.textContent = `${TRANSLATIONS[currentLang].diskLabel} ${diskNum}`;
  
  const status = document.createElement("span");
  status.classList.add("disk-status");
  
  info.appendChild(name);
  info.appendChild(status);
  disk.appendChild(info);
  
  // Storage blocks area
  const blocksContainer = document.createElement("div");
  blocksContainer.classList.add("disk-blocks");
  disk.appendChild(blocksContainer);
  
  return { disk, blocksContainer };
}

// Renders placeholders when array layout is invalid
function pintarDiscosPlaceholder(num, isWarningState) {
  DOM.diskVisual.innerHTML = "";
  
  // Cap at 16 drives for visualization to prevent UI clutter
  const renderCount = Math.min(num, 16);
  
  for (let i = 0; i < renderCount; i++) {
    const { disk, blocksContainer } = createDiskElement(i + 1, isWarningState);
    
    // Fill with empty blocks
    for (let j = 0; j < 4; j++) {
      const block = document.createElement("div");
      block.classList.add("block", "empty");
      block.textContent = "—";
      blocksContainer.appendChild(block);
    }
    
    DOM.diskVisual.appendChild(disk);
  }
}

// ==========================================================================
// RENDER BLOCKS ACCORDING TO SELECTED RAID ALGORITHMS
// ==========================================================================

function pintarDiscos(num, nivel) {
  DOM.diskVisual.innerHTML = "";
  
  const renderCount = Math.min(num, 16);
  const totalRows = 4;
  const t = TRANSLATIONS[currentLang];
  
  // RAID 10 uses Group Wrappers to visually separate Mirroring sets
  if (nivel === 10) {
    const groupCount = renderCount / 2;
    for (let g = 0; g < groupCount; g++) {
      const groupEl = document.createElement("div");
      groupEl.classList.add("disk-group");
      groupEl.setAttribute("data-group-label", `${t.diskGroupLabel} ${g + 1}`);
      
      for (let member = 0; member < 2; member++) {
        const diskIdx = g * 2 + member;
        const { disk, blocksContainer } = createDiskElement(diskIdx + 1, false);
        
        for (let r = 0; r < totalRows; r++) {
          const block = document.createElement("div");
          block.classList.add("block");
          
          const stripeL = getStripeLetter(r);
          const blockNum = g + 1;
          
          if (member === 0) {
            block.classList.add("data");
            block.textContent = `${stripeL}${blockNum}`;
          } else {
            block.classList.add("mirror");
            block.textContent = `${stripeL}${blockNum} (M)`;
          }
          blocksContainer.appendChild(block);
        }
        groupEl.appendChild(disk);
      }
      DOM.diskVisual.appendChild(groupEl);
    }
    return;
  }
  
  // RAID 0, 1, 5, 6 Standard Layouts
  // Create all physical disk wrappers beforehand
  const disksData = [];
  for (let i = 0; i < renderCount; i++) {
    const { disk, blocksContainer } = createDiskElement(i + 1, false);
    disksData.push({ element: disk, container: blocksContainer });
  }
  
  // Fill block matrices row by row (stripe by stripe)
  for (let r = 0; r < totalRows; r++) {
    const stripeL = getStripeLetter(r);
    
    switch (nivel) {
      case 0: // Striping
        for (let d = 0; d < renderCount; d++) {
          const block = document.createElement("div");
          block.classList.add("block", "data");
          block.textContent = `${stripeL}${d + 1}`;
          disksData[d].container.appendChild(block);
        }
        break;
        
      case 1: // Mirroring
        for (let d = 0; d < renderCount; d++) {
          const block = document.createElement("div");
          if (d === 0) {
            block.classList.add("block", "data");
            block.textContent = `${t.blockData} ${stripeL}`;
          } else {
            block.classList.add("block", "mirror");
            block.textContent = `${t.blockMirror} ${stripeL}`;
          }
          disksData[d].container.appendChild(block);
        }
        break;
        
      case 5: // Distributed Parity
        {
          // Rotating Parity placement: right-to-left
          const parityIdx = (renderCount - 1 - (r % renderCount) + renderCount) % renderCount;
          let dataCounter = 1;
          
          for (let d = 0; d < renderCount; d++) {
            const block = document.createElement("div");
            if (d === parityIdx) {
              block.classList.add("block", "parity-p");
              block.textContent = `${t.blockParity} ${stripeL}`;
            } else {
              block.classList.add("block", "data");
              block.textContent = `${stripeL}${dataCounter}`;
              dataCounter++;
            }
            disksData[d].container.appendChild(block);
          }
        }
        break;
        
      case 6: // Double Distributed Parity
        {
          // Rotating two parity blocks: P and Q
          const parityPIdx = (renderCount - 2 - (r % renderCount) + renderCount) % renderCount;
          const parityQIdx = (renderCount - 1 - (r % renderCount) + renderCount) % renderCount;
          let dataCounter = 1;
          
          for (let d = 0; d < renderCount; d++) {
            const block = document.createElement("div");
            if (d === parityPIdx) {
              block.classList.add("block", "parity-p");
              block.textContent = `P(${stripeL})`;
            } else if (d === parityQIdx) {
              block.classList.add("block", "parity-q");
              block.textContent = `Q(${stripeL})`;
            } else {
              block.classList.add("block", "data");
              block.textContent = `${stripeL}${dataCounter}`;
              dataCounter++;
            }
            disksData[d].container.appendChild(block);
          }
        }
        break;
    }
  }
  
  // Append finished disk structures to visual DOM
  disksData.forEach(diskObj => {
    DOM.diskVisual.appendChild(diskObj.element);
  });
}

// ==========================================================================
// EVENT LISTENERS & SETUP
// ==========================================================================

DOM.numDrives.addEventListener("input", actualizar);
DOM.driveSize.addEventListener("input", actualizar);
DOM.raidLevel.addEventListener("change", actualizar);
DOM.unit.addEventListener("change", actualizar);

// Initialize application on load
actualizar();
updateLanguageUI();