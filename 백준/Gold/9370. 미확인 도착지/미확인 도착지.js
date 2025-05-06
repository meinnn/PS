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

let T = Number(input[0]);
let line = 1;
const result = [];

while (T-- > 0) {
  const [n, m, t] = input[line++].split(' ').map(Number);
  const [s, g, h] = input[line++].split(' ').map(Number);

  const graph = Array.from({ length: n + 1 }, () => []);
  let ghWeight = 0;

  for (let i = 0; i < m; i++) {
    const [a, b, d] = input[line++].split(' ').map(Number);
    graph[a].push([b, d]);
    graph[b].push([a, d]);
    if ((a === g && b === h) || (a === h && b === g)) {
      ghWeight = d;
    }
  }

  const sDist = dijkstra(s, n, graph);
  const gDist = dijkstra(g, n, graph);
  const hDist = dijkstra(h, n, graph);

  const dest = [];
  for (let i = 0; i < t; i++) {
    const x = Number(input[line++]);
    if (sDist[x] === Infinity) continue;

    const path1 = sDist[g] + ghWeight + hDist[x];
    const path2 = sDist[h] + ghWeight + gDist[x];
    if (sDist[x] === path1 || sDist[x] === path2) {
      dest.push(x);
    }
  }

  result.push(dest.sort((a, b) => a - b).join(' '));
}

console.log(result.join('\n'));

function dijkstra(start, n, graph) {
  const dist = Array(n + 1).fill(Infinity);
  const pq = new MinHeap();
  pq.push([start, 0]);
  dist[start] = 0;

  while (pq.size()) {
    const [cur, curDist] = pq.pop();
    if (dist[cur] < curDist) continue;

    for (const [next, nextDist] of graph[cur]) {
      const totalCost = curDist + nextDist;
      if (totalCost < dist[next]) {
        dist[next] = totalCost;
        pq.push([next, totalCost]);
      }
    }
  }

  return dist;
}
