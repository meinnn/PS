const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const map = input.slice(1, N + 1).map((line) => line.split('').map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let groupId = 1; // 0 그룹의 id
const groupSize = {}; // 각 공간별 사이즈 저장
const groupMap = Array.from({ length: N }, () => Array(M).fill(0)); // 그룹 id 저장할 map
const visited = Array.from({ length: N }, () => Array(M).fill(false));

function bfs(x, y, id) {
  let q = [[x, y]];
  let cnt = 1;
  visited[x][y] = true;
  groupMap[x][y] = id;

  let idx = 0;
  while (idx < q.length) {
    const [cx, cy] = q[idx++];

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      if (visited[nx][ny] || map[nx][ny] === 1) continue;

      visited[nx][ny] = true;
      groupMap[nx][ny] = id;
      q.push([nx, ny]);
      cnt++;
    }
  }

  return cnt;
}

//모든 0 그룹 찾아서 크기 저장
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 0 && !visited[i][j]) {
      groupSize[groupId] = bfs(i, j, groupId);
      groupId++;
    }
  }
}

const result = Array.from({ length: N }, () => Array(M).fill(0));

// 1에서 인접한 0 그룹들 크기 합해서 결과 계산
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 1) {
      let cnt = 1;
      let adjs = new Set(); // 중복 없이 인접 그룹 담기

      for (let k = 0; k < 4; k++) {
        const ni = i + dx[k];
        const nj = j + dy[k];

        if (ni < 0 || ni >= N || nj < 0 || nj >= M) continue;
        if (map[ni][nj] === 0) adjs.add(groupMap[ni][nj]);
      }

      for (let id of adjs) cnt += groupSize[id];

      result[i][j] = cnt % 10;
    }
  }
}

console.log(result.map((line) => line.join('')).join('\n'));
