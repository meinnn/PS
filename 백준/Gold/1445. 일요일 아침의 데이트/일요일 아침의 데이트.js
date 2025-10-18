const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1).map((row) => row.split(''));

let start = null;
let end = null;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 'S') start = [i, j];
    if (map[i][j] === 'F') end = [i, j];

    if (map[i][j] === '.') {
      for (let d = 0; d < 4; d++) {
        const nx = i + dx[d];
        const ny = j + dy[d];
        if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
        if (map[nx][ny] === 'g') {
          map[i][j] = 'n'; // 인접 표시
          break;
        }
      }
    }
  }
}

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  isSmaller(i, j) {
    return (
      this.heap[i][0] < this.heap[j][0] || (this.heap[i][0] === this.heap[j][0] && this.heap[i][1] < this.heap[j][1])
    );
  }

  push(v) {
    this.heap.push(v);
    let i = this.heap.length - 1;

    while (i > 1) {
      const p = Math.floor(i / 2);
      if (this.isSmaller(i, p)) {
        [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
        i = p;
      } else {
        break;
      }
    }
  }

  pop() {
    if (this.heap.length === 1) return null;
    if (this.heap.length === 2) return this.heap.pop();

    const root = this.heap[1];
    this.heap[1] = this.heap.pop();

    let i = 1;
    while (true) {
      let left = i * 2;
      let right = i * 2 + 1;
      let smaller = i;

      if (left < this.heap.length && this.isSmaller(left, smaller)) {
        smaller = left;
      }
      if (right < this.heap.length && this.isSmaller(right, smaller)) {
        smaller = right;
      }
      if (smaller === i) break;

      [this.heap[smaller], this.heap[i]] = [this.heap[i], this.heap[smaller]];
      i = smaller;
    }

    return root;
  }

  size() {
    return this.heap.length - 1;
  }
}

const dist = Array.from({ length: N }, () => Array.from({ length: M }, () => [Infinity, Infinity]));
const pq = new MinHeap();

dist[start[0]][start[1]] = [0, 0];
pq.push([0, 0, start[0], start[1]]); // 쓰레기수, 인접수, x, y

while (pq.size()) {
  const [g, ng, x, y] = pq.pop();
  const [cg, cng] = dist[x][y];

  if (g > cg || (g === cg && ng > cng)) continue;

  for (let d = 0; d < 4; d++) {
    const nx = x + dx[d];
    const ny = y + dy[d];
    if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

    let newG = g;
    let newNg = ng;
    if (map[nx][ny] === 'g') newG++;
    else if (map[nx][ny] === 'n') newNg++;

    const [prevG, prevNg] = dist[nx][ny];
    if (newG < prevG || (newG === prevG && newNg < prevNg)) {
      dist[nx][ny] = [newG, newNg];
      pq.push([newG, newNg, nx, ny]);
    }
  }
}

console.log(dist[end[0]][end[1]].join(' '));
