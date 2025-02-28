const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input[0];
const forest = input.slice(1).map((line) => line.split(' ').map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const dp = Array.from({ length: n }, () => Array(n).fill(0));
let result = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (dp[i][j] === 0) dfs(i, j);
  }
}

console.log(result);

function dfs(x, y) {
  if (dp[x][y] > 0) return dp[x][y];

  let ret = 1;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

    if (forest[nx][ny] > forest[x][y]) {
      ret = Math.max(ret, dfs(nx, ny) + 1);
    }
  }

  result = Math.max(result, ret);
  return (dp[x][y] = ret);
}
