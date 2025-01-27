const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const T = Number(input[0]);
const result = [];

for (let t = 0; t < T; t++) {
  const n = Number(input[2 * t + 1]);
  const graph = input[2 * (t + 1)].split(' ').map((x) => +x - 1);
  result.push(solve(graph, n));
}

console.log(result.join('\n'));

function solve(graph, n) {
  const visited = Array(n).fill(false); // 방문 여부
  const inPath = Array(n).fill(false); // 현재 dfs 경로에 있는지 여부
  let cnt = 0; // 팀에 속한 학생 수

  function dfs(idx) {
    visited[idx] = true;
    inPath[idx] = true;

    const next = graph[idx];

    if (!visited[next]) {
      dfs(next);
    } else if (inPath[next]) {
      // 사이클 발견
      let node = next;
      do {
        cnt++;
        node = graph[node];
      } while (node !== next);
    }

    inPath[idx] = false; // 경로에서 제거
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }

  return n - cnt; // 전체 학생 수 - 팀에 속한 학생 수
}
