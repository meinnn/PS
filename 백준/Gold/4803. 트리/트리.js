const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let line = 0;
let caseNum = 1;
const result = [];

while (true) {
  const [n, m] = input[line++].split(' ').map(Number);
  if (n === 0 && m === 0) break;

  const parent = Array.from({ length: n + 1 }, (_, i) => i);
  const isTree = Array(n + 1).fill(true);

  function find(x) {
    if (parent[x] === x) return x;
    return (parent[x] = find(parent[x]));
  }

  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) {
      isTree[rootX] = false; // 사이클
      return;
    }

    parent[rootY] = rootX;
    isTree[rootX] = isTree[rootX] && isTree[rootY]; // 하나라도 트리 아니면 트리 아님
  }

  for (let i = 0; i < m; i++) {
    const [a, b] = input[line++].split(' ').map(Number);
    union(a, b);
  }

  // 각 루트에 대해 트리인지 확인
  const counted = new Set();
  let count = 0;

  for (let i = 1; i <= n; i++) {
    const root = find(i);
    if (!counted.has(root)) {
      counted.add(root);
      if (isTree[root]) count++;
    }
  }

  if (count === 0) {
    result.push(`Case ${caseNum}: No trees.`);
  } else if (count === 1) {
    result.push(`Case ${caseNum}: There is one tree.`);
  } else {
    result.push(`Case ${caseNum}: A forest of ${count} trees.`);
  }

  caseNum++;
}

console.log(result.join('\n'));
