class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(name) {
        if (!this.nodes.includes(name)) {
            this.nodes.push(name);
        }
    }

    addEdge(from, to) {
        if (this.nodes.includes(from) && this.nodes.includes(to)) {
            if (!this.edges.some(e => (e.from === from && e.to === to) || (e.from === to && e.to === from))) {
                this.edges.push({ from, to });
            }
        } else {
            alert("Both nodes must exist to create an edge!");
        }
    }

    deleteNode(name) {
        this.nodes = this.nodes.filter(n => n !== name);
        this.edges = this.edges.filter(e => e.from !== name && e.to !== name);
    }

    reset() {
        this.nodes = [];
        this.edges = [];
    }
}

// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = 500;

const graph = new Graph();
const nodeRadius = 25;

// Positions will be calculated in circular layout
function calculatePositions() {
    const positions = {};
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 50;
    const totalNodes = graph.nodes.length;

    graph.nodes.forEach((node, index) => {
        const angle = (2 * Math.PI / totalNodes) * index;
        positions[node] = {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    });

    return positions;
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const positions = calculatePositions();

    // Draw edges
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 2;
    graph.edges.forEach(edge => {
        const fromPos = positions[edge.from];
        const toPos = positions[edge.to];
        if (fromPos && toPos) {
            ctx.beginPath();
            ctx.moveTo(fromPos.x, fromPos.y);
            ctx.lineTo(toPos.x, toPos.y);
            ctx.stroke();
        }
    });

    // Draw nodes
    graph.nodes.forEach(node => {
        const pos = positions[node];

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#f0ad4e';
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fff';
        ctx.font = '16px Poppins, Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node, pos.x, pos.y);
    });
}

// Event listeners
document.getElementById('addNodeBtn').addEventListener('click', () => {
    const name = document.getElementById('nodeInput').value.trim();
    if (name) {
        graph.addNode(name);
        drawGraph();
        document.getElementById('nodeInput').value = '';
    }
});

document.getElementById('addEdgeBtn').addEventListener('click', () => {
    const from = document.getElementById('edgeFrom').value.trim();
    const to = document.getElementById('edgeTo').value.trim();
    if (from && to) {
        graph.addEdge(from, to);
        drawGraph();
        document.getElementById('edgeFrom').value = '';
        document.getElementById('edgeTo').value = '';
    }
});

document.getElementById('deleteNodeBtn').addEventListener('click', () => {
    const name = prompt("Enter node name to delete:");
    if (name) {
        graph.deleteNode(name.trim());
        drawGraph();
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    graph.reset();
    drawGraph();
});

// Initial draw
drawGraph();
