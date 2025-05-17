const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const limits = input[0].split(' ').map(Number);

// A가 비었을 때 C에 담겨있을 수 있는 물의 양
const result = [];
const visited = Array.from({ length: 201 }, () =>
  Array.from({ length: 201 }, () => Array(201).fill(false))
);

function dfs(a, b, c) {
  visited[a][b][c] = true;
  if (a === 0) result.push(c);

  const current = [a, b, c];

  for (let from = 0; from < 3; from++) {
    for (let to = 0; to < 3; to++) {
      if (from === to || current[from] === 0) continue;

      const next = [...current];
      const move = Math.min(current[from], limits[to] - current[to]);

      next[from] -= move;
      next[to] += move;

      if (!visited[next[0]][next[1]][next[2]]) dfs(...next);
    }
  }
}

dfs(0, 0, limits[2]);
console.log(result.sort((a, b) => a - b).join(' '));
