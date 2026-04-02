const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, ...probabilities] = input[0].split(' ').map(Number);

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
const visited = Array.from({ length: N * 2 + 1 }, () => Array(N * 2 + 1).fill(false));

let result = 0;

function dfs(x, y, cnt, prob) {
  if (cnt === 0) {
    result += prob;
    return;
  }

  visited[x][y] = true;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (probabilities[i] === 0) continue;

    if (!visited[nx][ny]) {
      dfs(nx, ny, cnt - 1, prob * (probabilities[i] / 100));
    }
  }

  visited[x][y] = false;
}

dfs(N, N, N, 1);
console.log(result);
