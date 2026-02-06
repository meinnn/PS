const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, Q] = input[0].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
let line = 1;

for (let i = 0; i < N - 1; i++) {
  const [p, q, r] = input[line++].split(' ').map(Number);

  graph[p].push([q, r]);
  graph[q].push([p, r]);
}

const result = [];

for (let q = 0; q < Q; q++) {
  const [k, v] = input[line++].split(' ').map(Number);

  const visited = Array(N + 1).fill(false);
  const stack = [v];
  visited[v] = true;

  let cnt = 0;

  while (stack.length) {
    const cur = stack.pop();
    for (const [next, usado] of graph[cur]) {
      if (!visited[next] && usado >= k) {
        visited[next] = true;
        cnt++;
        stack.push(next);
      }
    }
  }

  result.push(cnt);
}

console.log(result.join('\n'));
