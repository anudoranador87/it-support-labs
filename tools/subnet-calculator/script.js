// ==========================================================================
// TRANSLATION ENGINE & DATA
// ==============================================================================

const TRANSLATIONS = {
  es: {
    title: "Calculadora de Subredes",
    subtitle: "Visualiza bits de red y host en binario y calcula rangos de IPs",
    labelIpAddress: "Dirección IP",
    labelCidrPrefix: "Prefijo de Subred (CIDR)",
    labelNetIp: "Dirección de Red",
    labelBroadcastIp: "Dirección de Broadcast",
    labelSubnetMask: "Máscara Decimal",
    labelHostRange: "Rango de Hosts Útiles",
    labelTotalHosts: "Hosts Utilizables",
    labelIpClass: "Clase de IP / Info",
    visualizerTitle: "Visualización de Bits (Binario)",
    legendNet: "Bits de Red (Net)",
    legendHost: "Bits de Host",
    labelBinIp: "Dirección IP en Binario:",
    labelBinMask: "Máscara de Subred en Binario:",
    warningIp: "⚠️ Dirección IP inválida. Debe tener formato X.X.X.X (octetos de 0 a 255).",
    infoPrivate: "Privada",
    infoPublic: "Pública",
    infoLoopback: "Bucle Local (Loopback)",
    infoApipa: "Enlace Local (APIPA / Autoconfigurada)",
    infoMulticast: "Multidifusión (Multicast)",
    infoExperimental: "Experimental / Reservada",
    classText: "Clase",
    hostsSingle: "Host Único (Sin subred)",
    hostsP2P: "Enlace Punto a Punto",
    hostsNone: "Ninguno"
  },
  en: {
    title: "Subnet Calculator",
    subtitle: "Visualize network/host bits in binary and calculate IP ranges",
    labelIpAddress: "IP Address",
    labelCidrPrefix: "Subnet Prefix (CIDR)",
    labelNetIp: "Network Address",
    labelBroadcastIp: "Broadcast Address",
    labelSubnetMask: "Subnet Mask",
    labelHostRange: "Usable Host Range",
    labelTotalHosts: "Usable Hosts",
    labelIpClass: "IP Class / Info",
    visualizerTitle: "Bits Visualization (Binary)",
    legendNet: "Network Bits (Net)",
    legendHost: "Host Bits",
    labelBinIp: "IP Address in Binary:",
    labelBinMask: "Subnet Mask in Binary:",
    warningIp: "⚠️ Invalid IP Address. Must have the format X.X.X.X (octets 0-255).",
    infoPrivate: "Private",
    infoPublic: "Public",
    infoLoopback: "Loopback (Local)",
    infoApipa: "Link-Local (APIPA / Self-assigned)",
    infoMulticast: "Multicast",
    infoExperimental: "Experimental / Reserved",
    classText: "Class",
    hostsSingle: "Single Host (No subnetting)",
    hostsP2P: "Point-to-Point Link",
    hostsNone: "None"
  }
};

let currentLang = "es";

// ==========================================================================
// DOM SELECTORS
// ==========================================================================

const DOM = {
  // Inputs
  ipInput: document.getElementById("ip-address"),
  cidrSlider: document.getElementById("cidr-slider"),
  cidrSelect: document.getElementById("cidr-select"),
  
  // Stats
  netIp: document.getElementById("net-ip"),
  broadcastIp: document.getElementById("broadcast-ip"),
  subnetMask: document.getElementById("subnet-mask"),
  hostRange: document.getElementById("host-range"),
  totalHosts: document.getElementById("total-hosts"),
  ipClass: document.getElementById("ip-class"),
  
  // Warning Banner
  warningBanner: document.getElementById("warning-banner"),
  warningText: document.getElementById("warning-text"),
  
  // Binary visuals
  ipBinaryContainer: document.getElementById("ip-binary-container"),
  maskBinaryContainer: document.getElementById("mask-binary-container"),
  
  // Translations
  headerTitle: document.getElementById("header-title"),
  headerSubtitle: document.getElementById("header-subtitle"),
  labelIpAddress: document.getElementById("label-ip-address"),
  labelCidrPrefix: document.getElementById("label-cidr-prefix"),
  labelNetIp: document.getElementById("label-net-ip"),
  labelBroadcastIp: document.getElementById("label-broadcast-ip"),
  labelSubnetMask: document.getElementById("label-subnet-mask"),
  labelHostRange: document.getElementById("label-host-range"),
  labelTotalHosts: document.getElementById("label-total-hosts"),
  labelIpClass: document.getElementById("label-ip-class"),
  visualizerTitle: document.getElementById("visualizer-title"),
  legendNet: document.getElementById("legend-net"),
  legendHost: document.getElementById("legend-host"),
  labelBinIp: document.getElementById("label-bin-ip"),
  labelBinMask: document.getElementById("label-bin-mask"),
  
  // Lang buttons
  btnEs: document.getElementById("btn-es"),
  btnEn: document.getElementById("btn-en"),
  
  // Cards for error toggling
  cards: [
    document.getElementById("stat-net"),
    document.getElementById("stat-broadcast"),
    document.getElementById("stat-mask"),
    document.getElementById("stat-range"),
    document.getElementById("stat-hosts"),
    document.getElementById("stat-class")
  ]
};

// Populate the CIDR drop-down select on load (CIDR /1 to /32)
function populateCidrSelect() {
  DOM.cidrSelect.innerHTML = "";
  for (let i = 1; i <= 32; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `/${i}`;
    if (i === 24) opt.selected = true;
    DOM.cidrSelect.appendChild(opt);
  }
}

// ==========================================================================
// IP ARITHMETIC CORE LOGIC
// ==========================================================================

// Validates whether the IP string is a valid IPv4 address
function parseIp(ipStr) {
  const parts = ipStr.split(".").map(p => p.trim());
  if (parts.length !== 4) return null;
  
  const numericParts = [];
  for (let i = 0; i < 4; i++) {
    const val = Number(parts[i]);
    if (parts[i] === "" || isNaN(val) || val < 0 || val > 255 || parts[i].indexOf(" ") !== -1) {
      return null;
    }
    numericParts.push(val);
  }
  return numericParts;
}

// Converts 4 octet array to unsigned 32-bit integer
function ipToInt(octets) {
  return (octets[0] * 16777216) + (octets[1] * 65536) + (octets[2] * 256) + octets[3];
}

// Converts unsigned 32-bit integer back to IP string
function intToIp(intVal) {
  const o1 = (intVal >>> 24) & 255;
  const o2 = (intVal >>> 16) & 255;
  const o3 = (intVal >>> 8) & 255;
  const o4 = intVal & 255;
  return `${o1}.${o2}.${o3}.${o4}`;
}

// Returns the subnet mask as integer from CIDR prefix
function cidrToMaskInt(cidr) {
  if (cidr === 0) return 0;
  if (cidr === 32) return 0xFFFFFFFF;
  return (~(Math.pow(2, 32 - cidr) - 1)) & 0xFFFFFFFF;
}

// Determines IP Class and type (Private, Public, APIPA, Loopback)
function getIpClassInfo(octets, cidr) {
  const first = octets[0];
  const second = octets[1];
  const t = TRANSLATIONS[currentLang];
  
  let ipClass = "";
  let type = t.infoPublic;
  
  // Loopback check
  if (first === 127) {
    return { class: "A", info: t.infoLoopback };
  }
  
  // APIPA check
  if (first === 169 && second === 254) {
    return { class: "B", info: t.infoApipa };
  }
  
  // Classful sorting & private check
  if (first >= 1 && first <= 126) {
    ipClass = "A";
    if (first === 10) type = t.infoPrivate;
  } else if (first >= 128 && first <= 191) {
    ipClass = "B";
    if (first === 172 && (second >= 16 && second <= 31)) type = t.infoPrivate;
  } else if (first >= 192 && first <= 223) {
    ipClass = "C";
    if (first === 192 && second === 168) type = t.infoPrivate;
  } else if (first >= 224 && first <= 239) {
    return { class: "D", info: t.infoMulticast };
  } else if (first >= 240 && first <= 255) {
    return { class: "E", info: t.infoExperimental };
  } else {
    return { class: "—", info: "—" };
  }
  
  return {
    class: ipClass,
    info: `${t.classText} ${ipClass} (${type})`
  };
}

// ==========================================================================
// RENDER BITS VISUALIZATION (OCTETS DISPLAY)
// ==========================================================================

function renderBinaryOctets(container, valueInt, isMask, cidr) {
  container.innerHTML = "";
  
  // Convert value to 32 character binary string
  let binaryStr = "";
  if (isMask) {
    // Generate mask binary manually from cidr prefix
    binaryStr = "1".repeat(cidr) + "0".repeat(32 - cidr);
  } else {
    // Standard IP bit padding
    const rawBin = valueInt.toString(2);
    binaryStr = "0".repeat(32 - rawBin.length) + rawBin;
  }
  
  // Divide into 4 octets of 8 bits each
  for (let octetIdx = 0; octetIdx < 4; octetIdx++) {
    const octetDiv = document.createElement("div");
    octetDiv.classList.add("octet");
    
    for (let bitIdx = 0; bitIdx < 8; bitIdx++) {
      const bitPosition = (octetIdx * 8) + bitIdx;
      const bitChar = binaryStr[bitPosition];
      
      const bitDiv = document.createElement("div");
      bitDiv.classList.add("bit");
      bitDiv.textContent = bitChar;
      
      // Color bits by role: net (blue/purple) vs host (orange/yellow)
      if (bitPosition < cidr) {
        bitDiv.classList.add("net-bit");
      } else {
        bitDiv.classList.add("host-bit");
      }
      
      octetDiv.appendChild(bitDiv);
    }
    
    container.appendChild(octetDiv);
    
    // Add dot separator between octets (except after the last one)
    if (octetIdx < 3) {
      const dot = document.createElement("div");
      dot.classList.add("octet-dot");
      container.appendChild(dot);
    }
  }
}

// Render greyed-out empty states for binary grids when inputs are invalid
function renderEmptyBinaryState() {
  DOM.ipBinaryContainer.innerHTML = "";
  DOM.maskBinaryContainer.innerHTML = "";
  
  for (let o = 0; o < 4; o++) {
    const octetIp = document.createElement("div");
    octetIp.classList.add("octet");
    
    const octetMask = document.createElement("div");
    octetMask.classList.add("octet");
    
    for (let b = 0; b < 8; b++) {
      const bitIp = document.createElement("div");
      bitIp.classList.add("bit", "empty-bit");
      bitIp.textContent = "—";
      octetIp.appendChild(bitIp);
      
      const bitMask = document.createElement("div");
      bitMask.classList.add("bit", "empty-bit");
      bitMask.textContent = "—";
      octetMask.appendChild(bitMask);
    }
    
    DOM.ipBinaryContainer.appendChild(octetIp);
    DOM.maskBinaryContainer.appendChild(octetMask);
    
    if (o < 3) {
      const dotIp = document.createElement("div");
      dotIp.classList.add("octet-dot");
      DOM.ipBinaryContainer.appendChild(dotIp);
      
      const dotMask = document.createElement("div");
      dotMask.classList.add("octet-dot");
      DOM.maskBinaryContainer.appendChild(dotMask);
    }
  }
}

// ==========================================================================
// APPLICATION CONTROLLER
// ==========================================================================

function actualizar() {
  const ipStr = DOM.ipInput.value.trim();
  const cidr = parseInt(DOM.cidrSlider.value, 10);
  
  const t = TRANSLATIONS[currentLang];
  
  // 1. IP Validation
  const octets = parseIp(ipStr);
  if (!octets) {
    showWarning(t.warningIp);
    invalidateStats();
    renderEmptyBinaryState();
    return;
  }
  
  // Clear any active errors
  hideWarning();
  
  // 2. Perform Subnet Calculations
  const ipInt = ipToInt(octets);
  const maskInt = cidrToMaskInt(cidr);
  
  const netInt = ipInt & maskInt;
  const broadcastInt = netInt | (~maskInt & 0xFFFFFFFF);
  
  const netIpStr = intToIp(netInt);
  const broadcastIpStr = intToIp(broadcastInt);
  const maskIpStr = intToIp(maskInt);
  
  // Formulate usable ranges and usable host counts based on CIDR specs
  let rangeStr = "";
  let hostCountStr = "";
  
  if (cidr === 32) {
    rangeStr = ipStr;
    hostCountStr = `1 (${t.hostsSingle})`;
  } else if (cidr === 31) {
    rangeStr = `${netIpStr} - ${broadcastIpStr}`;
    hostCountStr = `2 (${t.hostsP2P})`;
  } else if (cidr === 30) {
    // /30 has 4 IPs: network, gateway/host1, host2, broadcast (2 usable hosts)
    const firstUsable = netInt + 1;
    const lastUsable = broadcastInt - 1;
    rangeStr = `${intToIp(firstUsable)} - ${intToIp(lastUsable)}`;
    hostCountStr = "2";
  } else {
    // Standard subnet /1 to /29
    const firstUsable = netInt + 1;
    const lastUsable = broadcastInt - 1;
    rangeStr = `${intToIp(firstUsable)} - ${intToIp(lastUsable)}`;
    
    // Formula: (2^(32-cidr)) - 2
    const totalHostsCount = Math.pow(2, 32 - cidr) - 2;
    hostCountStr = totalHostsCount.toLocaleString();
  }
  
  const classInfo = getIpClassInfo(octets, cidr);
  
  // 3. Populate Results UI
  DOM.netIp.textContent = netIpStr;
  DOM.broadcastIp.textContent = broadcastIpStr;
  DOM.subnetMask.textContent = maskIpStr;
  DOM.hostRange.textContent = rangeStr;
  DOM.totalHosts.textContent = hostCountStr;
  DOM.ipClass.textContent = classInfo.info;
  
  // 4. Render Binary Visualization Grid
  renderBinaryOctets(DOM.ipBinaryContainer, ipInt, false, cidr);
  renderBinaryOctets(DOM.maskBinaryContainer, maskInt, true, cidr);
}

// ==========================================================================
// STATE MANAGEMENT & TRANSLATION TRIGGERS
// ==========================================================================

function showWarning(message) {
  DOM.warningText.textContent = message;
  DOM.warningBanner.classList.remove("hidden");
  DOM.cards.forEach(card => card.classList.add("error-state"));
}

function hideWarning() {
  DOM.warningBanner.classList.add("hidden");
  DOM.cards.forEach(card => card.classList.remove("error-state"));
}

function invalidateStats() {
  DOM.netIp.textContent = "—";
  DOM.broadcastIp.textContent = "—";
  DOM.subnetMask.textContent = "—";
  DOM.hostRange.textContent = "—";
  DOM.totalHosts.textContent = "—";
  DOM.ipClass.textContent = "—";
}

function updateLanguageUI() {
  const t = TRANSLATIONS[currentLang];
  
  // Translate labels
  DOM.headerTitle.textContent = t.title;
  DOM.headerSubtitle.textContent = t.subtitle;
  DOM.labelIpAddress.textContent = t.labelIpAddress;
  DOM.labelCidrPrefix.textContent = t.labelCidrPrefix;
  DOM.labelNetIp.textContent = t.labelNetIp;
  DOM.labelBroadcastIp.textContent = t.labelBroadcastIp;
  DOM.labelSubnetMask.textContent = t.labelSubnetMask;
  DOM.labelHostRange.textContent = t.labelHostRange;
  DOM.labelTotalHosts.textContent = t.labelTotalHosts;
  DOM.labelIpClass.textContent = t.labelIpClass;
  DOM.visualizerTitle.textContent = t.visualizerTitle;
  DOM.legendNet.textContent = t.legendNet;
  DOM.legendHost.textContent = t.legendHost;
  DOM.labelBinIp.textContent = t.labelBinIp;
  DOM.labelBinMask.textContent = t.labelBinMask;
  
  actualizar();
}

// Synchronize CIDR controls (slider & select)
DOM.cidrSlider.addEventListener("input", () => {
  DOM.cidrSelect.value = DOM.cidrSlider.value;
  actualizar();
});

DOM.cidrSelect.addEventListener("change", () => {
  DOM.cidrSlider.value = DOM.cidrSelect.value;
  actualizar();
});

// Event Listeners for inputs
DOM.ipInput.addEventListener("input", actualizar);

// Translation selection listeners
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
// INITIAL SETUP
// ==========================================================================

populateCidrSelect();
updateLanguageUI();
