const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const parent = Array.from({ length: n }, (_, i) => i);
let result = 0;

for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  if (!union(a, b)) {
    result = i;
    break;
  }
}

console.log(result);

function find(x) {
  if (x === parent[x]) return x;
  return (parent[x] = find(parent[x]));
}

function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);

  if (rootX === rootY) return false;

  parent[rootY] = rootX;
  return true;
}
