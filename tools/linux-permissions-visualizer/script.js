// ==========================================================================
// TRANSLATION ENGINE & DATA
// ==========================================================================

const TRANSLATIONS = {
  es: {
    title: "Visualizador de Permisos de Linux",
    subtitle: "Entiende y visualiza los permisos de archivos en notación octal y simbólica",
    infoTitle: "¿Qué son los permisos?",
    infoDescription: "Los permisos de Linux controlan quién puede leer, escribir o ejecutar un archivo. Existen 3 categorías de usuarios: propietario, grupo y otros.",
    permValuesTitle: "Valores de Permisos",
    permReadLabel: "r (lectura)",
    permWriteLabel: "w (escritura)",
    permExecLabel: "x (ejecución)",
    permTotalLabel: "Total",
    presetsTitle: "Presets Comunes",
    controlsTitle: "Controles de Permisos",
    ownerTitle: "Propietario",
    ownerDesc: "Permisos del propietario",
    groupTitle: "Grupo",
    groupDesc: "Permisos del grupo",
    othersTitle: "Otros",
    othersDesc: "Permisos de otros usuarios",
    readLabel: "Lectura (r)",
    writeLabel: "Escritura (w)",
    execLabel: "Ejecución (x)",
    resultsTitle: "Resultados",
    octalTitle: "Notación Octal",
    octalDesc: "Representación numérica de los permisos",
    symbolicTitle: "Notación Simbólica",
    symbolicDesc: "Representación textual de los permisos",
    chmodTitle: "Comando chmod",
    chmodDesc: "Comando para aplicar estos permisos",
    previewTitle: "Vista Previa del Archivo",
    previewFilename: "filename.txt",
    previewMeaning: "Sin permisos asignados",
    summaryTitle: "Resumen de Permisos",
    summaryOwnerLabel: "Propietario:",
    summaryGroupLabel: "Grupo:",
    summaryOthersLabel: "Otros:",
    resetBtn: "Reiniciar",
    helpTitle: "Ejemplos Comunes",
    ex755: "Ejecutable por todos, escribible solo por propietario",
    ex644: "Archivo de texto, legible por todos, escribible solo por propietario",
    ex777: "Permiso completo para todos (no recomendado)",
    ex600: "Privado, solo accesible por el propietario",
    noPermissions: "Sin permisos asignados",
    readableByAll: "Legible por todos",
    writableByOwner: "Escribible solo por propietario",
    executableByAll: "Ejecutable por todos",
    executableByOwner: "Ejecutable solo por propietario",
    privateFile: "Privado, solo accesible por propietario",
    fullPermissions: "Permiso completo para todos"
  },
  en: {
    title: "Linux Permissions Visualizer",
    subtitle: "Understand and visualize file permissions in octal and symbolic notation",
    infoTitle: "What are permissions?",
    infoDescription: "Linux permissions control who can read, write, or execute a file. There are 3 categories of users: owner, group, and others.",
    permValuesTitle: "Permission Values",
    permReadLabel: "r (read)",
    permWriteLabel: "w (write)",
    permExecLabel: "x (execute)",
    permTotalLabel: "Total",
    presetsTitle: "Common Presets",
    controlsTitle: "Permission Controls",
    ownerTitle: "Owner",
    ownerDesc: "Owner permissions",
    groupTitle: "Group",
    groupDesc: "Group permissions",
    othersTitle: "Others",
    othersDesc: "Others permissions",
    readLabel: "Read (r)",
    writeLabel: "Write (w)",
    execLabel: "Execute (x)",
    resultsTitle: "Results",
    octalTitle: "Octal Notation",
    octalDesc: "Numeric representation of permissions",
    symbolicTitle: "Symbolic Notation",
    symbolicDesc: "Textual representation of permissions",
    chmodTitle: "chmod Command",
    chmodDesc: "Command to apply these permissions",
    previewTitle: "File Preview",
    previewFilename: "filename.txt",
    previewMeaning: "No permissions assigned",
    summaryTitle: "Permission Summary",
    summaryOwnerLabel: "Owner:",
    summaryGroupLabel: "Group:",
    summaryOthersLabel: "Others:",
    resetBtn: "Reset",
    helpTitle: "Common Examples",
    ex755: "Executable by all, writable only by owner",
    ex644: "Text file, readable by all, writable only by owner",
    ex777: "Full permission for all (not recommended)",
    ex600: "Private, accessible only by owner",
    noPermissions: "No permissions assigned",
    readableByAll: "Readable by all",
    writableByOwner: "Writable only by owner",
    executableByAll: "Executable by all",
    executableByOwner: "Executable only by owner",
    privateFile: "Private, accessible only by owner",
    fullPermissions: "Full permission for all"
  }
};

let currentLang = "es";

// ==========================================================================
// DOM SELECTORS
// ==========================================================================

const DOM = {
  // Language buttons
  btnEs: document.getElementById("btn-es"),
  btnEn: document.getElementById("btn-en"),
  
  // Translation targets
  headerTitle: document.getElementById("header-title"),
  headerSubtitle: document.getElementById("header-subtitle"),
  infoTitle: document.getElementById("info-title"),
  infoDescription: document.getElementById("info-description"),
  permValuesTitle: document.getElementById("perm-values-title"),
  presetsTitle: document.getElementById("presets-title"),
  controlsTitle: document.getElementById("controls-title"),
  resultsTitle: document.getElementById("results-title"),
  summaryTitle: document.getElementById("summary-title"),
  helpTitle: document.getElementById("help-title"),
  
  // Permission checkboxes
  checkboxes: document.querySelectorAll(".perm-checkbox"),
  
  // Octal displays
  ownerOctal: document.getElementById("owner-octal"),
  groupOctal: document.getElementById("group-octal"),
  othersOctal: document.getElementById("others-octal"),
  
  // Result displays
  octalResult: document.getElementById("octal-result"),
  symbolicResult: document.getElementById("symbolic-result"),
  chmodResult: document.getElementById("chmod-result"),
  
  // File preview
  fileIcon: document.getElementById("file-icon"),
  previewFilename: document.getElementById("preview-filename"),
  previewPerms: document.getElementById("preview-perms"),
  previewMeaning: document.getElementById("preview-meaning"),
  
  // Summary
  summaryOwner: document.getElementById("summary-owner-value"),
  summaryGroup: document.getElementById("summary-group-value"),
  summaryOthers: document.getElementById("summary-others-value"),
  
  // Buttons
  resetBtn: document.getElementById("reset-btn"),
  presetBtns: document.querySelectorAll(".preset-btn"),
  
  // Total value display
  totalValue: document.getElementById("total-value")
};

// ==========================================================================
// PERMISSION CALCULATION LOGIC
// ==========================================================================

function calculatePermissionValue(category) {
  let value = 0;
  const checkboxes = document.querySelectorAll(`.perm-checkbox[data-category="${category}"]`);
  
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const perm = checkbox.dataset.perm;
      if (perm === "read") value += 4;
      if (perm === "write") value += 2;
      if (perm === "exec") value += 1;
    }
  });
  
  return value;
}

function getSymbolicNotation(category) {
  const checkboxes = document.querySelectorAll(`.perm-checkbox[data-category="${category}"]`);
  let notation = "";
  
  checkboxes.forEach(checkbox => {
    const perm = checkbox.dataset.perm;
    if (checkbox.checked) {
      if (perm === "read") notation += "r";
      if (perm === "write") notation += "w";
      if (perm === "exec") notation += "x";
    } else {
      notation += "-";
    }
  });
  
  return notation;
}

function getFullSymbolicNotation() {
  const owner = getSymbolicNotation("owner");
  const group = getSymbolicNotation("group");
  const others = getSymbolicNotation("others");
  return `-${owner}${group}${others}`;
}

function getPermissionMeaning(octal) {
  const t = TRANSLATIONS[currentLang];
  
  // Common patterns
  if (octal === "755") return t.ex755;
  if (octal === "644") return t.ex644;
  if (octal === "777") return t.ex777;
  if (octal === "600") return t.ex600;
  if (octal === "000") return t.noPermissions;
  
  // Generate custom meaning
  const owner = parseInt(octal[0]);
  const group = parseInt(octal[1]);
  const others = parseInt(octal[2]);
  
  let meanings = [];
  
  if (others >= 4) meanings.push(t.readableByAll);
  if (owner >= 2 && group < 2 && others < 2) meanings.push(t.writableByOwner);
  if (others >= 1) meanings.push(t.executableByAll);
  if (owner >= 1 && group < 1 && others < 1) meanings.push(t.executableByOwner);
  if (owner === 6 && group === 0 && others === 0) meanings.push(t.privateFile);
  if (octal === "777") meanings.push(t.fullPermissions);
  
  return meanings.length > 0 ? meanings.join(", ") : t.noPermissions;
}

function updateDisplay() {
  const ownerValue = calculatePermissionValue("owner");
  const groupValue = calculatePermissionValue("group");
  const othersValue = calculatePermissionValue("others");
  
  const octalCode = `${ownerValue}${groupValue}${othersValue}`;
  const symbolicCode = getFullSymbolicNotation();
  
  // Update octal displays
  DOM.ownerOctal.textContent = ownerValue;
  DOM.groupOctal.textContent = groupValue;
  DOM.othersOctal.textContent = othersValue;
  
  // Update result displays
  DOM.octalResult.textContent = octalCode;
  DOM.symbolicResult.textContent = symbolicCode;
  DOM.chmodResult.textContent = `chmod ${octalCode} filename`;
  
  // Update file preview
  DOM.previewPerms.textContent = symbolicCode;
  DOM.previewMeaning.textContent = getPermissionMeaning(octalCode);
  
  // Update summary
  DOM.summaryOwner.textContent = getSymbolicNotation("owner");
  DOM.summaryGroup.textContent = getSymbolicNotation("group");
  DOM.summaryOthers.textContent = getSymbolicNotation("others");
  
  // Update total value
  const total = ownerValue + groupValue + othersValue;
  DOM.totalValue.textContent = total;
  
  // Add animation to octal displays
  [DOM.ownerOctal, DOM.groupOctal, DOM.othersOctal].forEach(el => {
    el.classList.add("updated");
    setTimeout(() => el.classList.remove("updated"), 300);
  });
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================

// Checkbox change listeners
DOM.checkboxes.forEach(checkbox => {
  checkbox.addEventListener("change", updateDisplay);
});

// Preset buttons
DOM.presetBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const octal = btn.dataset.octal;
    applyOctalCode(octal);
  });
});

// Reset button
DOM.resetBtn.addEventListener("click", () => {
  DOM.checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  updateDisplay();
});

// chmod command copy
DOM.chmodResult.addEventListener("click", () => {
  const text = DOM.chmodResult.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = text;
    DOM.chmodResult.textContent = "✓ Copiado";
    setTimeout(() => {
      DOM.chmodResult.textContent = originalText;
    }, 2000);
  });
});

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

function applyOctalCode(octal) {
  // Reset all checkboxes
  DOM.checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Parse octal code
  const owner = parseInt(octal[0]);
  const group = parseInt(octal[1]);
  const others = parseInt(octal[2]);
  
  // Apply owner permissions
  if (owner >= 4) document.querySelector('.perm-checkbox[data-category="owner"][data-perm="read"]').checked = true;
  if (owner >= 2) document.querySelector('.perm-checkbox[data-category="owner"][data-perm="write"]').checked = true;
  if (owner >= 1) document.querySelector('.perm-checkbox[data-category="owner"][data-perm="exec"]').checked = true;
  
  // Apply group permissions
  if (group >= 4) document.querySelector('.perm-checkbox[data-category="group"][data-perm="read"]').checked = true;
  if (group >= 2) document.querySelector('.perm-checkbox[data-category="group"][data-perm="write"]').checked = true;
  if (group >= 1) document.querySelector('.perm-checkbox[data-category="group"][data-perm="exec"]').checked = true;
  
  // Apply others permissions
  if (others >= 4) document.querySelector('.perm-checkbox[data-category="others"][data-perm="read"]').checked = true;
  if (others >= 2) document.querySelector('.perm-checkbox[data-category="others"][data-perm="write"]').checked = true;
  if (others >= 1) document.querySelector('.perm-checkbox[data-category="others"][data-perm="exec"]').checked = true;
  
  updateDisplay();
}

// ==========================================================================
// TRANSLATION HANDLERS
// ==========================================================================

function updateLanguageUI() {
  const t = TRANSLATIONS[currentLang];
  
  DOM.headerTitle.textContent = t.title;
  DOM.headerSubtitle.textContent = t.subtitle;
  DOM.infoTitle.textContent = t.infoTitle;
  DOM.infoDescription.textContent = t.infoDescription;
  DOM.permValuesTitle.textContent = t.permValuesTitle;
  DOM.presetsTitle.textContent = t.presetsTitle;
  DOM.controlsTitle.textContent = t.controlsTitle;
  DOM.resultsTitle.textContent = t.resultsTitle;
  DOM.summaryTitle.textContent = t.summaryTitle;
  DOM.helpTitle.textContent = t.helpTitle;
  DOM.resetBtn.textContent = t.resetBtn;
  
  // Update labels
  document.getElementById("perm-read-label").textContent = t.permReadLabel;
  document.getElementById("perm-write-label").textContent = t.permWriteLabel;
  document.getElementById("perm-exec-label").textContent = t.permExecLabel;
  document.getElementById("perm-total-label").textContent = t.permTotalLabel;
  
  document.getElementById("owner-title").textContent = t.ownerTitle;
  document.getElementById("owner-desc").textContent = t.ownerDesc;
  document.getElementById("group-title").textContent = t.groupTitle;
  document.getElementById("group-desc").textContent = t.groupDesc;
  document.getElementById("others-title").textContent = t.othersTitle;
  document.getElementById("others-desc").textContent = t.othersDesc;
  
  document.getElementById("octal-title").textContent = t.octalTitle;
  document.getElementById("octal-desc").textContent = t.octalDesc;
  document.getElementById("symbolic-title").textContent = t.symbolicTitle;
  document.getElementById("symbolic-desc").textContent = t.symbolicDesc;
  document.getElementById("chmod-title").textContent = t.chmodTitle;
  document.getElementById("chmod-desc").textContent = t.chmodDesc;
  
  document.getElementById("preview-title").textContent = t.previewTitle;
  document.getElementById("preview-filename").textContent = t.previewFilename;
  
  document.getElementById("summary-owner-label").textContent = t.summaryOwnerLabel;
  document.getElementById("summary-group-label").textContent = t.summaryGroupLabel;
  document.getElementById("summary-others-label").textContent = t.summaryOthersLabel;
  
  document.getElementById("ex-755").textContent = t.ex755;
  document.getElementById("ex-644").textContent = t.ex644;
  document.getElementById("ex-777").textContent = t.ex777;
  document.getElementById("ex-600").textContent = t.ex600;
  
  // Update all read/write/exec labels
  document.querySelectorAll('[id="read-label"]').forEach(el => {
    el.textContent = t.readLabel;
  });
  document.querySelectorAll('[id="write-label"]').forEach(el => {
    el.textContent = t.writeLabel;
  });
  document.querySelectorAll('[id="exec-label"]').forEach(el => {
    el.textContent = t.execLabel;
  });
  
  updateDisplay();
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
// INITIALIZATION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();
});
