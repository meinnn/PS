const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const graph = Array.from({ length: 10001 }, () => []);

for (const info of input) {
  const [a, b, len] = info.split(' ').map(Number);
  if (!a || !b || !len) break;
  graph[a].push([b, len]);
  graph[b].push([a, len]);
}

let start = +input[0].split(' ')[0];
let last = start;
let max = 0;
const visited = Array(10001).fill(false);

function dfs(node, dist) {
  if (dist > max) {
    max = dist;
    last = node;
  }

  visited[node] = true;

  for (const [city, len] of graph[node]) {
    if (!visited[city]) {
      dfs(city, dist + len);
    }
  }
}

dfs(start, 0);
visited.fill(false);
dfs(last, 0);

console.log(max);
