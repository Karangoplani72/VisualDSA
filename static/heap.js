class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] >= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    deleteMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return max;
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;

            if (left < length && this.heap[left] > this.heap[largest]) largest = left;
            if (right < length && this.heap[right] > this.heap[largest]) largest = right;
            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }

    reset() {
        this.heap = [];
    }
}

// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = 400;

const heap = new MaxHeap();
const nodeRadius = 20;
const verticalGap = 60;

function drawHeap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (heap.heap.length === 0) return;

    function drawNode(value, x, y) {
        ctx.beginPath();
        ctx.fillStyle = '#f0ad4e';
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#1e3a8a';
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '16px Poppins, Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value, x, y);
    }

    function drawTree(index, x, y, spacing) {
        if (index >= heap.heap.length) return;
        const left = 2 * index + 1;
        const right = 2 * index + 2;

        if (left < heap.heap.length) {
            const leftX = x - spacing;
            const leftY = y + verticalGap;
            ctx.beginPath();
            ctx.moveTo(x, y + nodeRadius);
            ctx.lineTo(leftX, leftY - nodeRadius);
            ctx.stroke();
            drawTree(left, leftX, leftY, spacing / 1.5);
        }

        if (right < heap.heap.length) {
            const rightX = x + spacing;
            const rightY = y + verticalGap;
            ctx.beginPath();
            ctx.moveTo(x, y + nodeRadius);
            ctx.lineTo(rightX, rightY - nodeRadius);
            ctx.stroke();
            drawTree(right, rightX, rightY, spacing / 1.5);
        }

        drawNode(heap.heap[index], x, y);
    }

    drawTree(0, canvas.width / 2, 50, canvas.width / 4);
}

// Event listeners
document.getElementById('insertBtn').addEventListener('click', () => {
    const value = parseInt(document.getElementById('valueInput').value);
    if (!isNaN(value)) {
        heap.insert(value);
        drawHeap();
        document.getElementById('valueInput').value = '';
    }
});

document.getElementById('deleteBtn').addEventListener('click', () => {
    heap.deleteMax();
    drawHeap();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    heap.reset();
    drawHeap();
});

// Initial draw
drawHeap();
