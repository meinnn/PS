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

    while (i > 1 && this.heap[parent] > this.heap[i]) {
      this.swap(i, parent);
      i = parent;
      parent = Math.floor(i / 2);
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

      if (left < this.heap.length && this.heap[left] < this.heap[smaller])
        smaller = left;
      if (right < this.heap.length && this.heap[right] < this.heap[smaller])
        smaller = right;
      if (smaller === i) break;

      this.swap(i, smaller);
      i = smaller;
    }

    return root;
  }

  size() {
    return this.heap.length - 1;
  }
}

const [N, M] = input[0].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const indegree = Array(N + 1).fill(0);

for (let i = 1; i <= M; i++) {
  const [A, B] = input[i].split(' ').map(Number);
  graph[A].push(B);
  indegree[B]++;
}

const q = new MinHeap();
for (let i = 1; i <= N; i++) {
  if (indegree[i] === 0) q.push(i);
}

const result = [];
while (q.size()) {
  const cur = q.pop();
  result.push(cur);

  for (const node of graph[cur]) {
    indegree[node]--;
    if (indegree[node] === 0) q.push(node);
  }
}

console.log(result.join(' '));
