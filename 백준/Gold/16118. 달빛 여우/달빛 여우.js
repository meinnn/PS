const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  const [a, b, d] = input[i].split(' ').map(Number);
  graph[a].push([b, d]);
  graph[b].push([a, d]);
}

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
      let smallest = i;

      if (left < this.heap.length && this.heap[left][1] < this.heap[smallest][1]) {
        smallest = left;
      }
      if (right < this.heap.length && this.heap[right][1] < this.heap[smallest][1]) {
        smallest = right;
      }

      if (smallest === i) break;

      this.swap(i, smallest);
      i = smallest;
    }

    return root;
  }

  size() {
    return this.heap.length - 1;
  }
}

const foxDist = dijkstraFox();
const wolfDist = dijkstraWolf();
const cnt = foxDist.filter((d, i) => d < wolfDist[i]).length;

console.log(cnt);

function dijkstraFox() {
  const dist = Array(N + 1).fill(Infinity);
  dist[1] = 0;

  const pq = new MinHeap();
  pq.push([1, 0]);

  while (pq.size() > 0) {
    const [cur, curDist] = pq.pop();

    if (dist[cur] < curDist) continue;

    for (const [to, d] of graph[cur]) {
      const totalDist = curDist + d * 2;
      if (totalDist < dist[to]) {
        dist[to] = totalDist;
        pq.push([to, totalDist]);
      }
    }
  }

  return dist;
}

function dijkstraWolf() {
  const dist = Array.from({ length: N + 1 }, () => Array(2).fill(Infinity));
  dist[1][0] = 0;

  const pq = new MinHeap();
  pq.push([1, 0, 0]);

  while (pq.size() > 0) {
    const [cur, curDist, tired] = pq.pop();

    if (dist[cur][tired] < curDist) continue;

    for (const [to, d] of graph[cur]) {
      let totalDist = curDist;

      if (tired === 0) {
        totalDist += d;
      } else {
        totalDist += d * 4;
      }

      const nt = Math.abs(tired - 1);
      if (totalDist < dist[to][nt]) {
        dist[to][nt] = totalDist;
        pq.push([to, totalDist, nt]);
      }
    }
  }

  const shorter = Array(N + 1);
  for (let i = 1; i <= N; i++) {
    shorter[i] = Math.min(...dist[i]);
  }

  return shorter;
}
