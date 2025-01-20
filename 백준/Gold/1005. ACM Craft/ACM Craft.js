const fs = require('fs');
const [T, ...input] = fs.readFileSync(0, 'utf-8').trim().split('\n');

let line = 0;
for (let t = 0; t < T; t++) {
  const [N, K] = input[line++].split(' ').map(Number);
  const delay = input[line++].split(' ').map(Number);

  const graph = Array.from({ length: N + 1 }, () => []);
  const indegree = Array(N + 1).fill(0);
  for (let i = 0; i < K; i++) {
    const [x, y] = input[line++].split(' ').map(Number);
    graph[x].push(y);
    indegree[y]++;
  }

  const W = Number(input[line++]);
  const dp = Array(N + 1).fill(0);

  // 위상정렬 비슷한 ...
  const q = [];
  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) {
      q.push(i);
      dp[i] = delay[i - 1]; // 초기 비용 설정
    }
  }

  while (q.length > 0) {
    const cur = q.shift();

    for (const next of graph[cur]) {
      dp[next] = Math.max(dp[next], dp[cur] + delay[next - 1]); // 최대 비용 갱신
      indegree[next]--;

      if (indegree[next] === 0) {
        q.push(next);
      }
    }
  }

  console.log(dp[W]);
}
