class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        this._insertNode(this.root, newNode);
    }

    _insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) node.left = newNode;
            else this._insertNode(node.left, newNode);
        } else {
            if (!node.right) node.right = newNode;
            else this._insertNode(node.right, newNode);
        }
    }

    delete(value) {
        this.root = this._deleteNode(this.root, value);
    }

    _deleteNode(node, value) {
        if (!node) return null;

        if (value < node.value) node.left = this._deleteNode(node.left, value);
        else if (value > node.value) node.right = this._deleteNode(node.right, value);
        else {
            // Node with only one child or no child
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Node with two children: get inorder successor
            let temp = this._minValueNode(node.right);
            node.value = temp.value;
            node.right = this._deleteNode(node.right, temp.value);
        }
        return node;
    }

    _minValueNode(node) {
        let current = node;
        while (current.left) current = current.left;
        return current;
    }

    reset() {
        this.root = null;
    }
}

// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = 500;

const tree = new BinaryTree();
const nodeRadius = 20;
const levelGap = 70;

function drawTree(node, x, y, gap) {
    if (!node) return;

    // Draw left branch
    if (node.left) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - gap, y + levelGap);
        ctx.stroke();
        drawTree(node.left, x - gap, y + levelGap, gap / 2);
    }

    // Draw right branch
    if (node.right) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + gap, y + levelGap);
        ctx.stroke();
        drawTree(node.right, x + gap, y + levelGap, gap / 2);
    }

    // Draw node
    ctx.beginPath();
    ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#f0ad4e';
    ctx.fill();
    ctx.stroke();

    // Draw value
    ctx.fillStyle = '#fff';
    ctx.font = '16px Poppins, Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.value, x, y);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (tree.root) drawTree(tree.root, canvas.width / 2, 50, canvas.width / 4);
}

// Event Listeners
document.getElementById('insertBtn').addEventListener('click', () => {
    const val = document.getElementById('dataInput').value.trim();
    if (val) {
        tree.insert(parseInt(val));
        render();
        document.getElementById('dataInput').value = '';
    }
});

document.getElementById('deleteBtn').addEventListener('click', () => {
    const val = document.getElementById('dataInput').value.trim();
    if (val) {
        tree.delete(parseInt(val));
        render();
        document.getElementById('dataInput').value = '';
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    tree.reset();
    render();
});

document.getElementById('visualizeBtn').addEventListener('click', () => {
    const data = document.getElementById('dataInput').value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
    tree.reset();
    data.forEach(value => tree.insert(value));
    render();
    document.getElementById('dataInput').value = '';
});

// Initial render
render();
