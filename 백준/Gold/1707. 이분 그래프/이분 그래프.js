const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let K = Number(input[0]);
let line = 1;
const result = [];

while (K-- > 0) {
  const [V, E] = input[line++].split(' ').map(Number);
  const graph = Array.from({ length: V + 1 }, () => []);

  for (let i = 0; i < E; i++) {
    const [u, v] = input[line++].split(' ').map(Number);
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = Array(V + 1).fill(0);
  let count = 0;
  let answer = true;

  for (let i = 1; i <= V; i++) {
    if (visited[i] === 0) {
      dfs(i, 1);
      count++;
    }
    if (answer === false) break;
  }

  result.push(answer ? 'YES' : 'NO');

  function dfs(idx, color) {
    if (answer === false) return;
    visited[idx] = color;

    for (const node of graph[idx]) {
      if (visited[node] === 0) {
        dfs(node, color * -1 + 3);
      } else {
        if (visited[node] === color) {
          answer = false;
          return;
        }
      }
    }
  }
}

console.log(result.join('\n'));
