class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let temp = this.head;
        while (temp.next) {
            temp = temp.next;
        }
        temp.next = newNode;
    }

    delete(value) {
        if (!this.head) return;

        if (this.head.value === value) {
            this.head = this.head.next;
            return;
        }

        let temp = this.head;
        while (temp.next && temp.next.value !== value) {
            temp = temp.next;
        }

        if (temp.next && temp.next.value === value) {
            temp.next = temp.next.next;
        }
    }

    reset() {
        this.head = null;
    }

    toArray() {
        const arr = [];
        let temp = this.head;
        while (temp) {
            arr.push(temp.value);
            temp = temp.next;
        }
        return arr;
    }
}

// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const nodeWidth = 60;
const nodeHeight = 40;
const nodeGap = 40;

const linkedList = new LinkedList();

function adjustCanvasWidth() {
    const arrLength = linkedList.toArray().length;
    const requiredWidth = Math.max(window.innerWidth * 0.8, 50 + arrLength * (nodeWidth + nodeGap));
    canvas.width = requiredWidth;
    canvas.height = 150; // fixed height for nodes
}

function drawList() {
    adjustCanvasWidth();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const arr = linkedList.toArray();

    arr.forEach((value, index) => {
        const x = 50 + index * (nodeWidth + nodeGap);
        const y = canvas.height / 2 - nodeHeight / 2;

        // Draw node rectangle
        ctx.fillStyle = '#f0ad4e';
        ctx.fillRect(x, y, nodeWidth, nodeHeight);
        ctx.strokeStyle = '#1e3a8a';
        ctx.strokeRect(x, y, nodeWidth, nodeHeight);

        // Draw value
        ctx.fillStyle = '#fff';
        ctx.font = '16px Poppins, Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value, x + nodeWidth / 2, y + nodeHeight / 2);

        // Draw arrow to next node
        if (index < arr.length - 1) {
            const startX = x + nodeWidth;
            const startY = y + nodeHeight / 2;
            const endX = startX + nodeGap;
            const endY = startY;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            // Draw arrowhead
            ctx.beginPath();
            ctx.moveTo(endX - 5, endY - 5);
            ctx.lineTo(endX, endY);
            ctx.lineTo(endX - 5, endY + 5);
            ctx.stroke();
        }
    });
}

// Event listeners
document.getElementById('insertBtn').addEventListener('click', () => {
    const value = document.getElementById('dataInput').value.trim();
    if (value) {
        linkedList.insert(value);
        drawList();
        document.getElementById('dataInput').value = '';
    }
});

document.getElementById('deleteBtn').addEventListener('click', () => {
    const value = document.getElementById('dataInput').value.trim();
    if (value) {
        linkedList.delete(value);
        drawList();
        document.getElementById('dataInput').value = '';
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    linkedList.reset();
    drawList();
});

// Initial draw
drawList();
