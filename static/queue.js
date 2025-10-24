// queue.js

class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    reset() {
        this.items = [];
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const queue = new Queue();

const boxWidth = 60;
const boxHeight = 40;
const spacing = 15;

function resizeCanvas() {
    canvas.width = Math.max(600, queue.size() * (boxWidth + spacing) + spacing);
    canvas.height = 150;
}

function drawQueue() {
    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    queue.items.forEach((item, index) => {
        const x = spacing + index * (boxWidth + spacing);
        const y = canvas.height / 2 - boxHeight / 2;

        // Draw box
        ctx.fillStyle = "#f0ad4e";
        ctx.fillRect(x, y, boxWidth, boxHeight);

        // Draw text
        ctx.fillStyle = "#fff";
        ctx.font = "16px Poppins, Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item, x + boxWidth / 2, y + boxHeight / 2);
    });
}

// Event Listeners
document.getElementById('insertBtn').addEventListener('click', () => {
    const data = document.getElementById('dataInput').value.split(',').map(v => v.trim()).filter(v => v !== "");
    if (data.length > 0) {
        data.forEach(value => queue.enqueue(value));
        drawQueue();
        document.getElementById('dataInput').value = '';
    }
});

document.getElementById('deleteBtn').addEventListener('click', () => {
    queue.dequeue();
    drawQueue();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    queue.reset();
    drawQueue();
});

// Optional: visualize initial data input
document.getElementById('visualizeBtn').addEventListener('click', () => {
    const data = document.getElementById('dataInput').value.split(',').map(v => v.trim()).filter(v => v !== "");
    queue.reset();
    data.forEach(value => queue.enqueue(value));
    drawQueue();
});

// Initial draw
drawQueue();
