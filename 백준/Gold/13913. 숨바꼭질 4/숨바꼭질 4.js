const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const prev = Array(100001).fill(null);

function bfs() {
  const visited = Array(100001).fill(false);
  const q = [N];
  let head = 0;
  let time = 0;

  while (head < q.length) {
    let qsize = q.length - head;
    while (qsize-- > 0) {
      const cur = q[head++];
      if (cur === K) return time;

      for (const next of [cur - 1, cur + 1, cur * 2]) {
        if (next < 0 || next > 100000 || visited[next]) continue;
        visited[next] = true;
        q.push(next);
        prev[next] = cur;
      }
    }
    time++;
  }
}

console.log(bfs());

const path = [];
for (let cur = K; cur !== N; cur = prev[cur]) {
  path.push(cur);
}
path.push(N);

console.log(path.reverse().join(' '));
