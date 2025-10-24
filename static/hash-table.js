class HashTable {
    constructor(size = 10) {
        this.size = size;
        this.buckets = Array.from({ length: size }, () => []);
    }

    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    insert(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Check if key exists, update value
        const existing = bucket.find(item => item.key === key);
        if (existing) {
            existing.value = value;
        } else {
            bucket.push({ key, value });
        }
    }

    delete(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const idx = bucket.findIndex(item => item.key === key);
        if (idx !== -1) bucket.splice(idx, 1);
    }

    reset() {
        this.buckets = Array.from({ length: this.size }, () => []);
    }
}

// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = 400;

const hashTable = new HashTable();
const bucketWidth = 100;
const bucketHeight = 30;
const nodeGap = 5;

function drawTable() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hashTable.buckets.forEach((bucket, index) => {
        const x = 50 + index * (bucketWidth + 20);
        const y = 50;

        // Draw bucket label
        ctx.fillStyle = '#1e3a8a';
        ctx.font = '16px Poppins, Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Bucket ${index}`, x + bucketWidth / 2, y - 10);

        // Draw bucket rectangle
        ctx.strokeStyle = '#1e3a8a';
        ctx.strokeRect(x, y, bucketWidth, bucketHeight);

        // Draw chained nodes
        bucket.forEach((node, idx) => {
            const nodeY = y + (idx + 1) * (bucketHeight + nodeGap);
            ctx.fillStyle = '#f0ad4e';
            ctx.fillRect(x, nodeY, bucketWidth, bucketHeight);
            ctx.strokeRect(x, nodeY, bucketWidth, bucketHeight);

            ctx.fillStyle = '#fff';
            ctx.font = '14px Poppins, Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${node.key}: ${node.value}`, x + bucketWidth / 2, nodeY + bucketHeight / 2);
        });
    });
}

// Event listeners
document.getElementById('insertBtn').addEventListener('click', () => {
    const key = document.getElementById('keyInput').value.trim();
    const value = document.getElementById('valueInput').value.trim();
    if (key && value) {
        hashTable.insert(key, value);
        drawTable();
        document.getElementById('keyInput').value = '';
        document.getElementById('valueInput').value = '';
    }
});

document.getElementById('deleteBtn').addEventListener('click', () => {
    const key = document.getElementById('keyInput').value.trim();
    if (key) {
        hashTable.delete(key);
        drawTable();
        document.getElementById('keyInput').value = '';
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    hashTable.reset();
    drawTable();
});

// Initial draw
drawTable();
