const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const N = Number(input[0]);
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i < N; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const parent = Array(N + 1);
const depth = Array(N + 1);
depth[0] = 0;
setParent(1, 0); // 루트는 1번

const result = [];
const M = Number(input[N]);
for (let i = N + 1; i < N + 1 + M; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  result.push(LCA(a, b));
}

console.log(result.join('\n'));

function LCA(x, y) {
  let [lower, higher] = depth[x] > depth[y] ? [x, y] : [y, x];

  // 같은 depth에서 탐색 시작
  while (depth[lower] > depth[higher]) {
    lower = parent[lower];
  }

  // 공통 조상 만날 때까지 올라가기
  while (lower !== higher) {
    lower = parent[lower];
    higher = parent[higher];
  }

  return lower;
}

function setParent(node, prnt) {
  parent[node] = prnt;
  depth[node] = depth[prnt] + 1;

  for (const x of graph[node]) {
    if (x === prnt) continue;
    setParent(x, node);
  }
}
