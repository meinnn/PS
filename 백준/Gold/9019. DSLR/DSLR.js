const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = +input[0];
const result = [];

for (let t = 1; t <= T; t++) {
  const [A, B] = input[t].split(' ').map(Number);
  result.push(bfs(A, B));
}

console.log(result.join('\n'));

function bfs(init, target) {
  const text = ['D', 'S', 'L', 'R'];
  const visited = new Array(10000).fill(false);
  const queue = [];

  queue.push([init, '']);
  visited[init] = true;

  while (queue.length > 0) {
    const [cur, acc] = queue.shift();

    const d = (cur * 2) % 10000;
    const s = cur === 0 ? 9999 : cur - 1;
    const l = (cur % 1000) * 10 + Math.floor(cur / 1000);
    const r = (cur % 10) * 1000 + Math.floor(cur / 10);

    const nextNums = [d, s, l, r];

    for (let i = 0; i < 4; i++) {
      if (!visited[nextNums[i]]) {
        if (nextNums[i] === target) {
          return acc + text[i];
        }
        visited[nextNums[i]] = true;
        queue.push([nextNums[i], acc + text[i]]);
      }
    }
  }
}
