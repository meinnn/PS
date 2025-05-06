const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const graph = Array(101);

for (let i = 1; i <= N + M; i++) {
  const [u, v] = input[i].split(' ').map(Number);
  graph[u] = v;
}

function bfs() {
  const visited = Array(101).fill(false);
  visited[1] = true;
  const q = [1];
  let head = 0;
  let move = 0;

  while (head < q.length) {
    let qsize = q.length - head;

    while (qsize-- > 0) {
      const cur = q[head++];

      for (let i = 1; i <= 6; i++) {
        const next = cur + i;
        if (next > 100 || visited[next]) continue;
        if (next === 100) return move + 1;

        visited[next] = true;
        if (graph[next]) {
          q.push(graph[next]);
        } else {
          visited[graph[next]] = true;
          q.push(next);
        }
      }
    }

    move++;
  }
}

console.log(bfs());
