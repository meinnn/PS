class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  heapifyUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx][1] <= this.heap[idx][1]) break;
      this.swap(parentIdx, idx);
      idx = parentIdx;
    }
  }

  heapifyDown() {
    let idx = 0;
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      if (leftChildIdx >= this.heap.length) break;

      let rightChildIdx = 2 * idx + 2;
      let smallerChild = leftChildIdx;

      if (
        rightChildIdx < this.heap.length &&
        this.heap[rightChildIdx][1] < this.heap[smallerChild][1]
      )
        smallerChild = rightChildIdx;

      if (this.heap[idx][1] <= this.heap[smallerChild][1]) break;

      this.swap(idx, smallerChild);
      idx = smallerChild;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = Number(input[0]);
const m = Number(input[1]);

const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 2; i < m + 2; i++) {
  const [from, to, cost] = input[i].split(' ').map(Number);
  graph[from].push([to, cost]);
}

const [start, end] = input[input.length - 1].split(' ').map(Number);
dijkstra(start, end);

function dijkstra(start, end) {
  const dist = Array(n + 1).fill(100_000_000);
  const pq = new MinHeap();

  dist[start] = 0;
  pq.push([start, 0]);

  const prev = Array(n + 1);

  while (!pq.isEmpty()) {
    const [curNode, curDist] = pq.pop();

    if (curNode === end) break;
    if (dist[curNode] < curDist) continue;

    for (let [adj, cost] of graph[curNode]) {
      const newDist = curDist + cost;
      if (dist[adj] > newDist) {
        dist[adj] = newDist;
        pq.push([adj, newDist]);
        prev[adj] = curNode;
      }
    }
  }

  const path = [];
  let last = end;
  while (last !== start) {
    path.push(last);
    last = prev[last];
  }
  path.push(start);

  const result = [dist[end], path.length, path.reverse().join(' ')];
  console.log(result.join('\n'));
}
