class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i) {
    return i * 2 + 1;
  }
  getRightChildIndex(i) {
    return i * 2 + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.heap.length === 0) return 0;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (
      index > 0 &&
      this.heap[this.getParentIndex(index)] < this.heap[index]
    ) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    let length = this.heap.length;

    while (this.getLeftChildIndex(index) < length) {
      let leftChildIndex = this.getLeftChildIndex(index);
      let rightChildIndex = this.getRightChildIndex(index);

      let biggerChildIndex = leftChildIndex;
      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] > this.heap[leftChildIndex]
      ) {
        biggerChildIndex = rightChildIndex;
      }

      if (this.heap[index] >= this.heap[biggerChildIndex]) break;

      this.swap(index, biggerChildIndex);
      index = biggerChildIndex;
    }
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const result = [];
const heap = new MaxHeap();

for (let line = 1; line <= N; line++) {
  const op = Number(input[line]);

  if (op === 0) {
    result.push(heap.pop());
  } else {
    heap.push(op);
  }
}

console.log(result.join('\n'));
