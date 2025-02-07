const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
// 각 정점은 1부터 N까지
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i < N; i++) {
  const [u, v] = input[i].split(' ').map(Number);
  graph[u].push(v);
  graph[v].push(u);
}

// dp[index][얼리어답터 여부] == index가 (얼리어답터 여부)일 때 (본인~리프까지) 필요한 최소 얼리어답터 수
const dp = Array.from({ length: N + 1 }, () => Array(2).fill(0));
const visited = Array(N + 1).fill(false);

function dfs(idx) {
  visited[idx] = true;

  for (const node of graph[idx]) {
    if (visited[node]) continue;
    dfs(node);

    // 현재 얼리 어답터일 때 => 연결된 노드가 얼리어탑터거나 아닐 때 중 최소
    dp[idx][1] += Math.min(dp[node][0], dp[node][1]);
    // 현재 얼리 어답터가 아닐 때 => 연결된 노드가 무조건 얼리어답터
    // *얼리 아답터가 아닌 사람들은 자신의 모든 친구들이 얼리 아답터일 때만 이 아이디어를 받아들인다.
    dp[idx][0] += dp[node][1];
  }
  dp[idx][1] += 1; // 본인 포함
}

// 1을 루트로 가정 (트리니까 가능)
dfs(1);
console.log(Math.min(dp[1][0], dp[1][1]));
