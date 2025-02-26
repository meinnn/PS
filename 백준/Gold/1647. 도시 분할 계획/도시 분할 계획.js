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
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex][1] <= this.heap[index][1]) break;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      let leftChildIndex = index * 2 + 1;
      if (leftChildIndex >= this.heap.length) break;

      let rightChildIndex = leftChildIndex + 1;
      let smallerChildIndex = leftChildIndex;
      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex][1] < this.heap[leftChildIndex][1]
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[index][1] <= this.heap[smallerChildIndex][1]) break;
      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const edges = input.slice(1).map((line) => line.split(' ').map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
for (let edge of edges) {
  const [A, B, C] = edge; // A번 집과 B번 집을 연결하는 길의 유지비가 C
  graph[A].push([B, C]);
  graph[B].push([A, C]);
}

prim();

function prim() {
  let result = 0; // MST 비용
  let cnt = 0; // 처리한 정점 수
  let max = 0; // 간선 중 가장 큰 비용

  const visited = Array(N + 1).fill(false);
  const dist = Array(N + 1).fill(Infinity); // 각 정점 기준 타 정점으로의 최소 비용
  const pq = new MinHeap();

  dist[1] = 0;
  pq.push([1, 0]);

  while (!pq.isEmpty()) {
    const [idx, weight] = pq.pop();
    if (visited[idx]) continue;

    result += weight;
    max = Math.max(max, weight);
    visited[idx] = true;
    if (++cnt === N) break;

    for (let node of graph[idx]) {
      if (!visited[node] && dist[node[0]] > node[1]) {
        dist[node[0]] = node[1];
        pq.push(node);
      }
    }
  }

  console.log(result - max);
}
