// References
const dsButtons = document.querySelectorAll('.ds-btn');
const visualization = document.getElementById('visualization');
const lastOp = document.getElementById('lastOp');
const timeTaken = document.getElementById('timeTaken');
const complexity = document.getElementById('complexity');

let currentDS = 'array';
let data = [];

// Switch Data Structure
dsButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    dsButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDS = btn.dataset.ds;
    data = [];
    visualization.innerHTML = `<div class="placeholder">Ready to visualize ${currentDS}</div>`;
    lastOp.textContent = "Idle";
    timeTaken.textContent = "–";
    complexity.textContent = "–";
  });
});

// Placeholder for Visualize Button
document.getElementById('visualizeBtn').addEventListener('click', () => {
  const start = performance.now();
  // Here backend call or visualization logic will be called
  const end = performance.now();

  lastOp.textContent = `Visualized ${currentDS}`;
  timeTaken.textContent = `${(end - start).toFixed(2)} ms`;
  complexity.textContent = "O(n)";
  visualization.innerHTML = `<div class="placeholder">${currentDS} visualization will appear here</div>`;
});
