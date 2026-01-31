const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input[0];
let line = 1;
const result = [];

for (let t = 0; t < T; t++) {
  const [N, M] = input[line++].split(' ').map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let i = 0; i < M; i++) {
    const [a, b] = input[line++].split(' ').map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }

  const visited = Array(N + 1).fill(false);
  let cnt = 0;

  const dfs = (idx) => {
    visited[idx] = true;

    for (const node of graph[idx]) {
      if (!visited[node]) {
        dfs(node);
        cnt++;
      }
    }
  };

  dfs(1);

  result.push(cnt);
}

console.log(result.join('\n'));
