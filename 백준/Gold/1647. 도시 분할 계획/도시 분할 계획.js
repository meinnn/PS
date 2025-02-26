const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const edges = input.slice(1).map((line) => line.split(' ').map(Number));
const parent = Array.from({ length: N + 1 }, (v, i) => i);

kruskal();

function kruskal() {
  edges.sort((a, b) => a[2] - b[2]);

  let result = 0;
  let max = 0;
  let cnt = 0;

  for (let edge of edges) {
    const [from, to, cost] = edge;
    if (!union(from, to)) continue;

    result += cost;
    max = Math.max(max, cost);
    if (++cnt === N - 1) break;
  }

  console.log(result - max);
}

function findSet(x) {
  if (x === parent[x]) return x;
  return (parent[x] = findSet(parent[x]));
}

function union(a, b) {
  const aRoot = findSet(a);
  const bRoot = findSet(b);
  if (aRoot === bRoot) return false;

  parent[bRoot] = aRoot;
  return true;
}
