const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

let T = Number(input[0]);
let line = 1;
const result = [];

while (T-- > 0) {
  const n = Number(input[line++]);
  const lastYear = input[line++].split(' ').map(Number);
  const m = Number(input[line++]);

  const adj = Array.from({ length: n + 1 }, () => Array(n + 1).fill(false)); // i가 j보다 더 높은 순위
  const inDegree = Array(n + 1).fill(0);

  // 작년 기준
  for (let i = 0; i < n; i++) {
    const high = lastYear[i];
    for (let j = i + 1; j < n; j++) {
      const low = lastYear[j];
      adj[high][low] = true;
      inDegree[low]++;
    }
  }

  // 간선 방향 반영
  for (let i = 0; i < m; i++) {
    const [a, b] = input[line++].split(' ').map(Number);
    if (adj[a][b]) {
      adj[a][b] = false;
      adj[b][a] = true;
      inDegree[b]--;
      inDegree[a]++;
    } else {
      adj[b][a] = false;
      adj[a][b] = true;
      inDegree[a]--;
      inDegree[b]++;
    }
  }

  // 위상 정렬
  const queue = [];
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const rank = [];
  let certain = true;
  let cycle = false;

  for (let i = 0; i < n; i++) {
    // 정렬 끝나기 전에 큐 비는 경우
    if (queue.length === 0) {
      cycle = true;
      break;
    }
    // 같은 순위가 여러 개?
    if (queue.length > 1) {
      certain = false;
      break;
    }

    const cur = queue.shift();
    rank.push(cur);
    for (let j = 0; j <= n; j++) {
      if (adj[cur][j]) {
        inDegree[j]--;
        if (inDegree[j] === 0) queue.push(j);
      }
    }
  }

  if (cycle) {
    result.push('IMPOSSIBLE');
  } else if (!certain) {
    result.push('?');
  } else {
    result.push(rank.join(' '));
  }
}

console.log(result.join('\n'));
