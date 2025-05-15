const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const coords = input.slice(1, N + 1).map((line) => line.split(' ').map(Number));
const linked = input.slice(N + 1).map((line) => line.split(' ').map(Number));

const parent = Array.from({ length: N }, (_, i) => i);

function find(x) {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
}

function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);
  if (rootX === rootY) return false;
  parent[rootY] = rootX;
  return true;
}

// 이미 연결된 간선 처리
for (const [a, b] of linked) {
  union(a - 1, b - 1);
}

function getDistance(i, j) {
  const dx = coords[i][0] - coords[j][0];
  const dy = coords[i][1] - coords[j][1];
  return Math.sqrt(dx * dx + dy * dy);
}

// 모든 간선 구하기
const edges = [];
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    const dist = getDistance(i, j);
    edges.push([dist, i, j]);
  }
}

edges.sort((a, b) => a[0] - b[0]);

let total = 0;
for (const [dist, a, b] of edges) {
  if (union(a, b)) {
    total += dist;
  }
}

console.log(total.toFixed(2));
