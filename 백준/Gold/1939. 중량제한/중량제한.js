const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
let maxWeight = 0;

for (let i = 1; i <= M; i++) {
  const [A, B, C] = input[i].split(' ').map(Number);
  graph[A].push([B, C]);
  graph[B].push([A, C]);
  maxWeight = Math.max(maxWeight, C);
}

const [from, to] = input[input.length - 1].split(' ').map(Number);

let left = 1;
let right = maxWeight;
let answer = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (canGo(mid)) {
    answer = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(answer);

function canGo(limit) {
  const visited = Array(N + 1).fill(false);
  const q = [from];
  let head = 0;
  visited[from] = true;

  while (head < q.length) {
    const cur = q[head++];
    if (cur === to) return true;

    for (const [next, weight] of graph[cur]) {
      if (!visited[next] && weight >= limit) {
        visited[next] = true;
        q.push(next);
      }
    }
  }

  return false;
}
