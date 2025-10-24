// static/stack.js
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let stackData = [];

  // Fix DPI / crisp canvas and reset transforms safely on each redraw
  function fixCanvasResolution() {
    const ratio = window.devicePixelRatio || 1;
    // Use client sizes to respect CSS
    const w = canvas.clientWidth;
    const h = Math.max(canvas.clientHeight, 400);
    // Set internal pixel size
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    // Reset any existing transform, then scale for DPR
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(ratio, ratio);
    return { width: w, height: h };
  }

  // Draw with newest element at the TOP (index = last in array)
  function drawStack() {
    const dims = fixCanvasResolution(); // returns CSS width/height
    const width = dims.width;
    const height = dims.height;

    // Clear using CSS coords
    ctx.clearRect(0, 0, width, height);

    // Header label
    ctx.fillStyle = "#1e3a8a";
    ctx.font = "600 16px Poppins";
    ctx.textAlign = "left";
    ctx.fillText(`Stack Size: ${stackData.length}`, 12, 24);

    // Visual parameters
    const boxW = 120;
    const boxH = 44;
    const gap = 12;
    const topMargin = 48; // start drawing below the label
    const centerX = width / 2 - boxW / 2;

    // We'll place the newest (stackData[last]) at y = topMargin
    // and older elements flow downward.
    for (let j = 0; j < stackData.length; j++) {
      // element index from newest -> oldest
      const element = stackData[stackData.length - 1 - j];
      const y = topMargin + j * (boxH + gap);

      // draw rounded rect background
      drawRoundedRect(ctx, centerX, y, boxW, boxH, 8);
      ctx.fillStyle = "#1e3a8a";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#234e8a";
      ctx.stroke();

      // text
      ctx.fillStyle = "#fff";
      ctx.font = "600 16px Poppins";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(element), centerX + boxW / 2, y + boxH / 2);
    }
  }

  function drawRoundedRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // UI handlers
  document.getElementById("visualizeBtn").addEventListener("click", () => {
    const text = document.getElementById("dataInput").value.trim();
    if (!text) return;
    stackData = text.split(",").map(x => x.trim()).filter(x => x !== "");
    drawStack();
  });

  document.getElementById("insertBtn").addEventListener("click", () => {
    const val = prompt("Enter value to push:");
    if (val === null) return;
    const trimmed = val.trim();
    if (trimmed === "") return;
    stackData.push(trimmed); // newest pushed to the end
    drawStack();
  });

  document.getElementById("deleteBtn").addEventListener("click", () => {
    if (stackData.length === 0) {
      alert("Stack is empty!");
      return;
    }
    stackData.pop(); // removes newest (end)
    drawStack();
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    stackData = [];
    drawStack();
  });

  // Keep canvas crisp on resize
  window.addEventListener("resize", drawStack);

  // initial empty render
  drawStack();
});
