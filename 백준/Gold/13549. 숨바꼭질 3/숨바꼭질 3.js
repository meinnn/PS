const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  push(node) {
    this.heap.push(node);
    let i = this.heap.length - 1;
    let parent = Math.floor(i / 2);

    while (i > 1 && this.heap[parent][1] > this.heap[i][1]) {
      this.swap(i, parent);
      i = parent;
    }
  }

  pop() {
    if (this.heap.length === 1) return null;
    if (this.heap.length === 2) return this.heap.pop();

    const root = this.heap[1];
    this.heap[1] = this.heap.pop();

    let i = 1;
    while (true) {
      const left = i * 2;
      const right = i * 2 + 1;
      let smaller = i;

      if (left < this.heap.length && this.heap[left][1] < this.heap[smaller][1])
        smaller = left;
      if (
        right < this.heap.length &&
        this.heap[right][1] < this.heap[smaller][1]
      )
        smaller = right;
      if (smaller === i) break;

      this.swap(smaller, i);
      i = smaller;
    }

    return root;
  }

  size() {
    return this.heap.length - 1;
  }
}

const MAX = 100000;
const [N, K] = input[0].split(' ').map(Number);
console.log(dijkstra());

function dijkstra() {
  const dist = Array(MAX + 1).fill(Infinity);
  dist[N] = 0;

  const pq = new MinHeap();
  pq.push([N, 0]);

  while (pq.size()) {
    const [cur, cost] = pq.pop();

    if (dist[cur] < cost) continue; // 이미 처리된 노드

    const nextPos = [
      [cur * 2, 0],
      [cur - 1, 1],
      [cur + 1, 1],
    ];

    for (const [next, nextCost] of nextPos) {
      if (next < 0 || next > MAX) continue;

      const totalCost = cost + nextCost;
      if (totalCost < dist[next]) {
        dist[next] = totalCost;
        pq.push([next, totalCost]);
      }
    }
  }

  return dist[K];
}
