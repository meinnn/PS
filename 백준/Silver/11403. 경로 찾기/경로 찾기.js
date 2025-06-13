const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const dist = input.slice(1).map((line) => line.split(' ').map(Number));

for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (dist[i][k] + dist[k][j] === 2) dist[i][j] = 1;
    }
  }
}

console.log(dist.map((row) => row.join(' ')).join('\n'));
