const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const manager = input[1].split(' ').map(Number);

const compliment = Array(n + 1).fill(0);

for (let line = 2; line < 2 + m; line++) {
  const [i, w] = input[line].split(' ').map(Number);
  compliment[i] += w;
}

const tree = Array.from({ length: n + 1 }, () => []);

for (let i = 2; i <= n; i++) {
  tree[manager[i - 1]].push(i);
}

function dfs(idx) {
  for (const next of tree[idx]) {
    compliment[next] += compliment[idx];
    dfs(next);
  }
}

dfs(1);
console.log(compliment.slice(1).join(' '));
