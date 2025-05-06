const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [V, E] = input[0].split(' ').map(Number);
const dist = Array.from({ length: V + 1 }, () => Array(V + 1).fill(Infinity));

for (let i = 1; i <= V; i++) dist[i][i] = 0;

for (let i = 1; i <= E; i++) {
  const [a, b, c] = input[i].split(' ').map(Number);
  dist[a][b] = c;
}

// 플로이드-워셜
for (let k = 1; k <= V; k++) {
  for (let i = 1; i <= V; i++) {
    for (let j = 1; j <= V; j++) {
      if (dist[i][j] > dist[i][k] + dist[k][j])
        dist[i][j] = dist[i][k] + dist[k][j];
    }
  }
}

let result = Infinity;
for (let i = 1; i <= V; i++) {
  for (let j = i + 1; j <= V; j++) {
    result = Math.min(result, dist[i][j] + dist[j][i]);
  }
}

console.log(result === Infinity ? -1 : result);
