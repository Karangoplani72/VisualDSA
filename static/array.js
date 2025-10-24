let array = [];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const boxWidth = 60;
const boxHeight = 40;
const gap = 20;

function adjustCanvasWidth() {
    const requiredWidth = Math.max(window.innerWidth * 0.8, 50 + array.length * (boxWidth + gap));
    canvas.width = requiredWidth;
    canvas.height = 150;
}

function drawArray() {
    adjustCanvasWidth();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    array.forEach((value, index) => {
        const x = 50 + index * (boxWidth + gap);
        const y = canvas.height / 2 - boxHeight / 2;

        // Draw rectangle
        ctx.fillStyle = '#f0ad4e';
        ctx.fillRect(x, y, boxWidth, boxHeight);
        ctx.strokeStyle = '#1e3a8a';
        ctx.strokeRect(x, y, boxWidth, boxHeight);

        // Draw value
        ctx.fillStyle = '#fff';
        ctx.font = '16px Poppins, Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value, x + boxWidth / 2, y + boxHeight / 2);

        // Draw index below box
        ctx.fillStyle = '#1e3a8a';
        ctx.font = '14px Poppins, Arial';
        ctx.fillText(index, x + boxWidth / 2, y + boxHeight + 15);
    });
}

// Event listeners
document.getElementById('insertBtn').addEventListener('click', () => {
    const value = document.getElementById('valueInput').value.trim();
    const index = parseInt(document.getElementById('indexInput').value);

    if (!value) return;

    if (!isNaN(index) && index >= 0 && index <= array.length) {
        array.splice(index, 0, value);
    } else {
        array.push(value);
    }
    drawArray();
    document.getElementById('valueInput').value = '';
    document.getElementById('indexInput').value = '';
});

document.getElementById('deleteBtn').addEventListener('click', () => {
    const index = parseInt(document.getElementById('indexInput').value);

    if (!isNaN(index) && index >= 0 && index < array.length) {
        array.splice(index, 1);
    } else {
        array.pop();
    }
    drawArray();
    document.getElementById('indexInput').value = '';
});

document.getElementById('resetBtn').addEventListener('click', () => {
    array = [];
    drawArray();
});

// Initial draw
drawArray();
