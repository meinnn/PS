const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class MinHeap {
  constructor() {
    this.heap = [null]; // 1-based index 사용
  }

  push(value) {
    this.heap.push(value);
    let i = this.heap.length - 1;

    while (i > 1 && this.heap[Math.floor(i / 2)] > this.heap[i]) {
      [this.heap[Math.floor(i / 2)], this.heap[i]] =
        [this.heap[i], this.heap[Math.floor(i / 2)]];
      i = Math.floor(i / 2);
    }
  }

  pop() {
    if (this.heap.length === 1) return null;
    if (this.heap.length === 2) return this.heap.pop();

    const min = this.heap[1];
    this.heap[1] = this.heap.pop();

    let i = 1;
    while (true) {
      const left = i * 2;
      const right = i * 2 + 1;
      let smallest = i;

      if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
      if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === i) break;

      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }

    return min;
  }

  peek() {
    return this.heap[1];
  }

  size() {
    return this.heap.length - 1;
  }
}

const heap = new MinHeap();
let N = -1;

rl.on('line', (line) => {
  if (N === -1) {
    N = parseInt(line);
    return;
  }

  line.split(' ').forEach((num) => {
    const val = parseInt(num);
    heap.push(val);
    if (heap.size() > N) heap.pop();
  });

  N--;
  if (N === 0) {
    console.log(heap.pop()); // N번째 큰 수
    rl.close();
  }
});
