const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n').map(Number);
const [N, ...input] = fs.readFileSync('../input.txt').toString().trim().split('\n').map(Number);

class MinHeap {
    constructor() {
        this.heap = [];
    }

    isEmpty() {
        return (this.heap.length === 0);
    }

    swap(x, y) {
        [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
    }

    insert(num) {
        this.heap.push(num);

        let currentIndex = this.heap.length - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[currentIndex]) break;
            this.swap(parentIndex, currentIndex);
            currentIndex = parentIndex;
        }
    }

    del() {
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.sinkDown(0);
        return min;
    }

    sinkDown(index) {
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        const length = this.heap.length;
        let minIdx = index;

        if (leftIndex < length && this.heap[leftIndex] < this.heap[minIdx]) {
            minIdx = leftIndex;
        }
        if (rightIndex < length && this.heap[rightIndex] < this.heap[minIdx]) {
            minIdx = rightIndex;
        }
        if (minIdx != index) {
            this.swap(index, minIdx);
            this.sinkDown(minIdx);
        }
    }
}

const answer = [];
const heap = new MinHeap();
input.forEach(v => {
    if (v === 0) {
        if (heap.isEmpty()) {
            answer.push(0);
        } else {
            answer.push(heap.del());
        }
    } else {
        heap.insert(v);
    }
});

console.log(answer.join('\n'));