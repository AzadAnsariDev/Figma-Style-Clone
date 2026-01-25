
const state = {
  activeTool: "move",      
  selectedElement: null,
  isDragging: false,
  offsetX: 0,
  offsetY: 0,

  isResizing : false,
  resizingDir : null,

  isEditingText : false,
  justCreatedText : false,

  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
  startLeft: 0,
  startTop: 0

};

let rectCount = 0;
let textCount = 0;
const layersPanel = document.getElementById("layers");
const textColorInput = document.querySelector("#textColor");

textColorInput.addEventListener("input", () => {
  if (!state.selectedElement) return;

  state.selectedElement.style.color = textColorInput.value;
});


function addLayerItem(name, element) {
  const item = document.createElement("div");
  item.className =
    "px-3 py-2 rounded text-sm cursor-pointer bg-gray-700 text-white mb-1 active:bg-red-500 ";

  item.textContent = name;

  // layer click
  item.addEventListener("click", () => {
    selectElement(element);
  });

  layersPanel.appendChild(item);

  // element delete hone pe layer bhi remove
  element._layerItem = item;
}



const rectTool = document.getElementById("rectTool");
const moveTool = document.getElementById("moveTool");
const textTool = document.querySelector("#textTool")
const canvas = document.getElementById("canvas");
const circleTool = document.getElementById("circleTool");
const ovalTool = document.getElementById("ovalTool");

circleTool.addEventListener("click", () => {
  setActiveTool("circle");
});

ovalTool.addEventListener("click", () => {
  setActiveTool("oval");
});


const propHeight = document.querySelector('#propHeight')
const propWidth = document.querySelector('#propWidth')

// -------------------------------
// Handle active tool 
// -------------------------------
function setActiveTool(tool) {

  // all reset
  moveTool.classList.remove("text-blue-600", "bg-blue-100");
  rectTool.classList.remove("text-blue-600", "bg-blue-100");
  textTool.classList.remove("text-blue-600", "bg-blue-100");
  circleTool.classList.remove("text-blue-600", "bg-blue-100");
  ovalTool.classList.remove("text-blue-600", "bg-blue-100");

  // active click
  if (tool === "move") {
    moveTool.classList.add("text-blue-600", "bg-blue-100");
  } 
  else if (tool === "rect") {
    rectTool.classList.add("text-blue-600", "bg-blue-100");
  }
  else if (tool === "circle") {
    circleTool.classList.add("text-blue-600", "bg-blue-100");
  }
  else if (tool === "oval") {
    ovalTool.classList.add("text-blue-600", "bg-blue-100");
  }
  else if (tool === "textTool") {
    textTool.classList.add("text-blue-600", "bg-blue-100");
  }

  state.activeTool = tool;
  canvas.style.cursor = tool === "rect" ? "crosshair" : "default";
}


// -------------------------------
// Toolbar Logics
// -----------------------------
rectTool.addEventListener("click", () => {
  setActiveTool("rect");
});

moveTool.addEventListener("click", () => {
    if (state.isEditingText && state.selectedElement) {
    finishTextEditing(state.selectedElement);
  }
  setActiveTool("move");
});

textTool.addEventListener('click', ()=>{   
  setActiveTool("textTool")
})


setActiveTool("move");

// -------------------------------
// Element selection Logic
// -------------------------------
function selectElement(el) {
  if (state.selectedElement) {
    state.selectedElement.classList.remove("ring-2", "ring-blue-600");
  }

  state.selectedElement = el;
  el.classList.add("ring-2", "ring-blue-600");
  addResizeHandle(el)

    propWidth.value = el.offsetWidth;
    propHeight.value = el.offsetHeight;

    if (el.style.fontSize) {
  textSizeInput.value = parseInt(el.style.fontSize);
} else {
  textSizeInput.value = "";
}

if (el.dataset.type === "text") {
  textValueInput.value = el.innerText || "";
} else {
  textValueInput.value = "";
}



}

// -------------------------------
// Dragging Logic
// -------------------------------
function makeDraggable(el) {
  el.addEventListener("mousedown", (e) => {
    if (state.activeTool !== "move") return;

    state.isDragging = true;
    selectElement(el);

    const box = el.getBoundingClientRect();
    state.offsetX = e.clientX - box.left;
    state.offsetY = e.clientY - box.top;

    e.stopPropagation();
  });
}

// -------------------------------
// Canvas rectangle Cretion Logic
// -------------------------------
canvas.addEventListener("mousedown", (e) => {

  const tag = document.activeElement.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (e.target === canvas) {
    deselectElement();
  }

  if (state.activeTool !== "rect") return;

  const rect = document.createElement("div");
  rect.className = "absolute bg-blue-400 border border-blue-600";

rectCount++;
const layerName = `Rectangle ${rectCount}`;
rect.dataset.layerName = layerName;

addLayerItem(layerName, rect);

  rect.style.width = "120px";
  rect.style.height = "80px";
  rect.style.left = e.offsetX + "px";
  rect.style.top = e.offsetY + "px";

  canvas.appendChild(rect);

  selectElement(rect);
  makeDraggable(rect);

  rect.style.backgroundColor = "#60a5fa";

  setActiveTool("move");
});

// -------------------------------
// Drag Movement Logic
// -------------------------------
document.addEventListener("mousemove", (e) => {

  if (state.isResizing) return;  
   if (state.isEditingText) return;
  if (!state.isDragging || !state.selectedElement) return;

  const canvasBox = canvas.getBoundingClientRect();

  let x = e.clientX - canvasBox.left - state.offsetX;
  let y = e.clientY - canvasBox.top - state.offsetY;


  x = Math.max(0, Math.min(x, canvas.clientWidth - state.selectedElement.offsetWidth));
  y = Math.max(0, Math.min(y, canvas.clientHeight - state.selectedElement.offsetHeight));

  state.selectedElement.style.left = x + "px";
  state.selectedElement.style.top = y + "px";
});

// -------------------------------
// stop drag logic
// -------------------------------
document.addEventListener("mouseup", () => {
  state.isDragging = false;
});


// -------------------------------
// Delete Logic
// -------------------------------

function deselectElement() {
  if (!state.selectedElement) return;

  state.selectedElement.classList.remove("ring-2", "ring-blue-600");
  state.selectedElement.querySelectorAll(".resize-handle").forEach(h => h.remove());
  state.selectedElement = null;

  propWidth.value = "";
  propHeight.value = "";
}

document.addEventListener("keydown", (e) => {
  const tag = document.activeElement.tagName;

  if (tag === "INPUT" || tag === "TEXTAREA") return;

  if (state.isEditingText) return;
  if (document.activeElement?.isContentEditable) return;
  if (!state.selectedElement) return;

  if (e.key === "Delete" || e.key === "Backspace") {
    e.preventDefault();

    if (state.selectedElement._layerItem) {
      state.selectedElement._layerItem.remove();
    }

    state.selectedElement.remove();
    state.selectedElement = null;
  }
});


// -------------------------------
// Resize Shape Logic
// -------------------------------

function addResizeHandle(el) {

  el.querySelectorAll(".resize-handle").forEach(h => h.remove());

  const dirs = ["tl", "tr", "bl", "br"];

  dirs.forEach((d) => {
    const handle = document.createElement("div");
    handle.className = "resize-handle";
    handle.dataset.dir = d;

    // position
    if (d === "tl") handle.style.cssText = "top:-4px; left:-4px; cursor:nwse-resize";
    if (d === "tr") handle.style.cssText = "top:-4px; right:-4px; cursor:nesw-resize";
    if (d === "bl") handle.style.cssText = "bottom:-4px; left:-4px; cursor:nesw-resize";
    if (d === "br") handle.style.cssText = "bottom:-4px; right:-4px; cursor:nwse-resize";

    handle.addEventListener("mousedown", (e) => {
      e.stopPropagation();

      state.isResizing = true;
      state.resizingDir = d;

      const rect = el.getBoundingClientRect();

      state.startX = e.clientX;
      state.startY = e.clientY;
      state.startWidth = rect.width;
      state.startHeight = rect.height;
      state.startLeft = el.offsetLeft;
      state.startTop = el.offsetTop;
    });

    el.appendChild(handle);
  });
}

document.addEventListener("mousemove", (e) => {
  resizeShape(e);

  if (!state.isDragging || !state.selectedElement) return;

  const canvasBox = canvas.getBoundingClientRect();

  let x = e.clientX - canvasBox.left - state.offsetX;
  let y = e.clientY - canvasBox.top - state.offsetY;

  x = Math.max(0, Math.min(x, canvas.clientWidth - state.selectedElement.offsetWidth));
  y = Math.max(0, Math.min(y, canvas.clientHeight - state.selectedElement.offsetHeight));

  state.selectedElement.style.left = x + "px";
  state.selectedElement.style.top = y + "px";
});

let resizeShape = (e) =>{
    if (!state.isResizing || !state.selectedElement) return;
   
    let dx = e.clientX - state.startX
    let dy = e.clientY - state.startY

    let newWidth = state.startWidth;
    let newHeight = state.startHeight;
    let newLeft = state.startLeft;
    let newTop = state.startTop;

    if (state.resizingDir === "br") {
    newWidth = state.startWidth + dx;
    newHeight = state.startHeight + dy;
  }
     if (state.resizingDir === "tl") {
    newWidth = state.startWidth - dx;
    newHeight = state.startHeight - dy;
    newLeft = state.startLeft + dx;
    newTop = state.startTop + dy;
  }

  if (state.resizingDir === "tr") {
    newWidth = state.startWidth + dx;
    newHeight = state.startHeight - dy;
    newTop = state.startTop + dy;
  }

  if (state.resizingDir === "bl") {
    newWidth = state.startWidth - dx;
    newHeight = state.startHeight + dy;
    newLeft = state.startLeft + dx;
  }

  newWidth = Math.max(30, newWidth);
  newHeight = Math.max(30, newHeight);
if (newLeft < 0) {
  newWidth += newLeft;
  newLeft = 0;
}

if (newTop < 0) {
  newHeight += newTop;
  newTop = 0;
}

const maxWidth = canvas.clientWidth - newLeft;
const maxHeight = canvas.clientHeight - newTop;

newWidth = Math.min(newWidth, maxWidth);
newHeight = Math.min(newHeight, maxHeight);
  const el = state.selectedElement;

  el.style.width = newWidth + "px";
  el.style.height = newHeight + "px";
  el.style.left = newLeft + "px";
  el.style.top = newTop + "px";

 propWidth.value = Math.round(newWidth);
 propHeight.value = Math.round(newHeight);

}


document.addEventListener("mouseup", () => {
  state.isDragging = false;
  state.isResizing = false;
  state.resizingDir = null;
});

// -------------------------------
// Property Panel Working Logic
// -------------------------------

const colorInput = document.querySelector("#fillColor");

colorInput.addEventListener("input", () => {
  if (!state.selectedElement) return;

  state.selectedElement.style.backgroundColor = colorInput.value;
});

propWidth.addEventListener("blur", applyWidth);
propWidth.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();   
    propWidth.blur();     
  }
});

function applyWidth() {
  if (!state.selectedElement) return;

  let value = Number(propWidth.value);
  if (!value || value < 30) return;

  const maxWidth = canvas.clientWidth - state.selectedElement.offsetLeft;
  value = Math.min(value, maxWidth);

  state.selectedElement.style.width = value + "px";
}



propHeight.addEventListener("change", () => {
  if (!state.selectedElement) return;

  let value = Number(propHeight.value);
  if (!value || value < 30) return;

  const maxHeight = canvas.clientHeight - state.selectedElement.offsetTop;
  value = Math.min(value, maxHeight);

  state.selectedElement.style.height = value + "px";
});


// ===============================
// TEXT Writing logics
// ===============================

canvas.addEventListener("mousedown", (e) => {
  if (state.activeTool !== "textTool") return;
  if (e.target !== canvas) return;

  const textEl = document.createElement("div");
  textEl.className = "absolute border border-transparent text-black text-xl";

  textEl.innerText = "Text";

  textEl.style.left = e.offsetX + "px";
  textEl.style.top = e.offsetY + "px";
  textEl.style.width = "120px";
  textEl.style.height = "40px";
  textEl.style.cursor = "text";

  textEl.dataset.type = "text";

  textEl.contentEditable = "false";
   
  textEl.addEventListener("input", () => {
  if (state.selectedElement !== textEl) return;
  textValueInput.value = textEl.innerText;
});


  // layer
  textCount++;
  const layerName = `Text ${textCount}`;
  textEl.dataset.layerName = layerName;
  addLayerItem(layerName, textEl);

 
  textEl.addEventListener("mousedown", (ev) => {
    ev.stopPropagation();
    selectElement(textEl);
    startSimpleTextEdit(textEl);
  });

  canvas.appendChild(textEl);
  selectElement(textEl);
  makeDraggable(textEl);

  setActiveTool("move");
});

function startSimpleTextEdit(el) {
  el.contentEditable = "true";
  el.focus();

  state.isEditingText = true;
  state.selectedElement = el;
}

document.addEventListener("mousedown", (e) => {
  if (!state.isEditingText) return;

  if (state.selectedElement && e.target !== state.selectedElement) {
    state.selectedElement.contentEditable = "false";
    state.isEditingText = false;
  }
});

//Circle And Oval Shape logic 


canvas.addEventListener("mousedown", (e) => {
  if (e.target !== canvas) return;

  // ---------- CIRCLE ----------
  if (state.activeTool === "circle") {
    const circle = document.createElement("div");
    circle.className = "absolute bg-blue-400 border border-blue-600";

    circle.style.width = "100px";
    circle.style.height = "100px";
    circle.style.borderRadius = "50%";
    circle.style.left = e.offsetX + "px";
    circle.style.top = e.offsetY + "px";

    rectCount++;
    const layerName = `Circle ${rectCount}`;
    circle.dataset.layerName = layerName;
    addLayerItem(layerName, circle);

    circle.style.backgroundColor = "#60a5fa";

    canvas.appendChild(circle);
    selectElement(circle);
    makeDraggable(circle);

    setActiveTool("move");
  }

  // ---------- OVAL ----------
  if (state.activeTool === "oval") {
    const oval = document.createElement("div");
    oval.className = "absolute bg-blue-400 border border-blue-600";

    oval.style.width = "140px";
    oval.style.height = "80px";
    oval.style.borderRadius = "50%";
    oval.style.left = e.offsetX + "px";
    oval.style.top = e.offsetY + "px";

    rectCount++;
    const layerName = `Oval ${rectCount}`;
    oval.dataset.layerName = layerName;
    addLayerItem(layerName, oval);

    oval.style.backgroundColor = "#60a5fa";

    canvas.appendChild(oval);
    selectElement(oval);
    makeDraggable(oval);

    setActiveTool("move");
  }
});


//Save Cnavas Logic 

function saveCanvas() {
  const data = [];

  canvas.querySelectorAll(":scope > div").forEach(el => {

    if (el.classList.contains("resize-handle")) return;

    data.push({
      layerName: el.dataset.layerName || "",
      left: el.style.left,
      top: el.style.top,
      width: el.style.width,
      height: el.style.height,
      bgColor: el.style.backgroundColor || "",
      textColor: el.style.color || "",
      text: el.innerText || "",
      borderRadius: el.style.borderRadius || "",
      rotation: el.dataset.rotation || 0,
      fontSize: el.style.fontSize || "16px"
    });
  });

  localStorage.setItem("figma-canvas", JSON.stringify(data));
  alert("Canvas saved successfully ✅");
}


document.getElementById("saveBtn").addEventListener("click", () => {
  saveCanvas();
});

function loadCanvas() {
  const data = JSON.parse(localStorage.getItem("figma-canvas"));
  if (!data) return;

  canvas.innerHTML = "";
  layersPanel.innerHTML = "<h3 class='text-sm font-semibold mb-3'>Layers</h3>";

  data.forEach(item => {
    const el = document.createElement("div");
    el.className = "absolute border border-transparent";

    el.style.left = item.left;
    el.style.top = item.top;
    el.style.width = item.width;
    el.style.height = item.height;

    // styles
    el.style.backgroundColor = item.bgColor || "transparent";
    el.style.color = item.textColor || "black";
    el.style.borderRadius = item.borderRadius || "0";

    // rotation
    el.style.transform = `rotate(${item.rotation}deg)`;
    el.dataset.rotation = item.rotation || 0;

    // text
    el.innerText = item.text || "";
    el.contentEditable = "false";

    // layer
    el.dataset.layerName = item.layerName;
    addLayerItem(item.layerName, el);

    el.style.fontSize = item.fontSize || "16px";

    el.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      selectElement(el);
    });

    canvas.appendChild(el);
    makeDraggable(el);
  });
}


loadCanvas();


document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Sab delete ho jayega. Sure?")) return;

  localStorage.removeItem("figma-canvas");
  canvas.innerHTML = "";
  layersPanel.innerHTML = "<h3 class='text-sm font-semibold mb-3'>Layers</h3>";
});

document.getElementById("exportBtn").addEventListener("click", exportAsSVG);


function exportAsSVG() {
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;

  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="${width}"
     height="${height}">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml"
         style="width:${width}px;height:${height}px;background:white;">
      ${canvas.innerHTML}
    </div>
  </foreignObject>
</svg>`;

  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "design.svg";
  a.click();

  URL.revokeObjectURL(url);
}

document.getElementById("exportJsonBtn").addEventListener("click", exportAsJSON);

function exportAsJSON() {
  const elements = [];

  canvas.querySelectorAll(":scope > div").forEach(el => {
    elements.push({
      layerName: el.dataset.layerName || "",
      left: el.style.left,
      top: el.style.top,
      width: el.style.width,
      height: el.style.height,
      backgroundColor: el.style.backgroundColor || "",
      color: el.style.color || "",
      borderRadius: el.style.borderRadius || "",
      text: el.innerText || ""
    });
  });

  const json = JSON.stringify(elements, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "design.json";
  a.click();

  URL.revokeObjectURL(url);
}

document.getElementById("exportHtmlBtn").addEventListener("click", exportAsHTML);

function exportAsHTML() {
  let htmlElements = "";

  canvas.querySelectorAll(":scope > div").forEach(el => {
    htmlElements += `
      <div style="
        position:absolute;
        left:${el.style.left};
        top:${el.style.top};
        width:${el.style.width};
        height:${el.style.height};
        background:${el.style.backgroundColor || "transparent"};
        color:${el.style.color || "black"};
        border-radius:${el.style.borderRadius || "0"};
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:Arial, sans-serif;
      ">
        ${el.innerText || ""}
      </div>
    `;
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Exported Design</title>
</head>
<body style="margin:0; position:relative; width:${canvas.offsetWidth}px; height:${canvas.offsetHeight}px; background:white;">
  ${htmlElements}
</body>
</html>
`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "design.html";
  a.click();

  URL.revokeObjectURL(url);
}


// roTate logic

document.getElementById("rotateLeft").addEventListener("click", () => {
  rotateSelected(-15);
});

document.getElementById("rotateRight").addEventListener("click", () => {
  rotateSelected(15);
});

function rotateSelected(deg) {
  if (!state.selectedElement) return;

  // current rotation read karo
  const current = state.selectedElement.dataset.rotation
    ? Number(state.selectedElement.dataset.rotation)
    : 0;

  const newRotation = current + deg;

  state.selectedElement.style.transform = `rotate(${newRotation}deg)`;
  state.selectedElement.dataset.rotation = newRotation;
}

const textSizeInput = document.getElementById("textSize");

textSizeInput.addEventListener("input", () => {
  if (!state.selectedElement) return;

  state.selectedElement.style.fontSize = textSizeInput.value + "px";
});

document.addEventListener("keydown", (e) => {
  if (!state.selectedElement) return;
  if (state.isEditingText) return;

  let step = e.shiftKey ? 10 : 1;

  let left = parseInt(state.selectedElement.style.left) || 0;
  let top = parseInt(state.selectedElement.style.top) || 0;

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    left -= step;
  }

  if (e.key === "ArrowRight") {
    e.preventDefault();
    left += step;
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    top -= step;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    top += step;
  }

  // canvas boundary
  left = Math.max(0, Math.min(left, canvas.clientWidth - state.selectedElement.offsetWidth));
  top = Math.max(0, Math.min(top, canvas.clientHeight - state.selectedElement.offsetHeight));

  state.selectedElement.style.left = left + "px";
  state.selectedElement.style.top = top + "px";
});


// TextBox Content 

const textValueInput = document.getElementById("textValueInput");

textValueInput.addEventListener("input", () => {
  if (!state.selectedElement) return;
  if (state.selectedElement.dataset.type !== "text") return;

  state.selectedElement.innerText = textValueInput.value;
});

const gridToggle = document.getElementById("gridToggle");

gridToggle.addEventListener("click", () => {
  canvas.classList.toggle("canvas-grid");
  if(gridToggle.innerText == "Add Grid"){
    gridToggle.innerText = "Remove Grid"
  }else{
    gridToggle.innerText = "Add Grid"
  }
});
