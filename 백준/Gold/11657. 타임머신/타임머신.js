const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const edges = input.slice(1).map((line) => line.split(' ').map(Number));

function bellmanFord() {
  const dist = Array(N + 1).fill(Infinity);
  dist[1] = 0;

  // n-1번
  for (let i = 0; i < N - 1; i++) {
    for (const [from, to, cost] of edges) {
      if (dist[from] !== Infinity && dist[to] > dist[from] + cost) {
        dist[to] = dist[from] + cost;
      }
    }
  }

  // 음수 사이클 검사
  for (const [from, to, cost] of edges) {
    if (dist[from] !== Infinity && dist[to] > dist[from] + cost) {
      return -1;
    }
  }

  const ret = [];
  for (let i = 2; i <= N; i++) ret.push(dist[i] === Infinity ? -1 : dist[i]);

  return ret.join('\n');
}

console.log(bellmanFord());
