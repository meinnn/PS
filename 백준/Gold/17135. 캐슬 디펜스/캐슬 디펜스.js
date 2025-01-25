const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, M, D] = input[0].split(' ').map(Number);
const board = [];
for (let i = 1; i <= N; i++) {
  board.push(input[i].split(' ').map(Number));
}
board.push(Array(M).fill(2)); // 제일 아래 성

let enemies = 0; // 초기 적 수
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 1) {
      enemies++;
    }
  }
}

let max = 0;

// 방향 벡터
const dx = [0, -1, 0]; // <-, 위, ->
const dy = [-1, 0, 1];

// 조합 탐색 (궁수 위치)
for (let i = 0; i < M; i++) {
  for (let j = i + 1; j < M; j++) {
    for (let l = j + 1; l < M; l++) {
      max = Math.max(max, play([i, j, l]));
    }
  }
}

console.log(max);

function play(positions) {
  const copy = board.map((row) => [...row]); // 깊은 복사
  let totalKills = 0;
  let leftEnemies = enemies;

  while (leftEnemies) {
    // 적 제거 (공격)
    const kills = attack(positions, copy);
    totalKills += kills;
    leftEnemies -= kills;

    // 적이 없으면 종료
    if (leftEnemies === 0) break;

    // 적 이동
    leftEnemies -= moveEnemies(copy);
  }

  return totalKills;
}

function attack(positions, copy) {
  const targets = new Set();

  for (const pos of positions) {
    const queue = [[N, pos]];
    const visited = Array.from({ length: N + 1 }, () => Array(M).fill(false));
    visited[N][pos] = true;

    while (queue.length) {
      const [cx, cy] = queue.shift();

      for (let i = 0; i < 3; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= N + 1 || ny < 0 || ny >= M || visited[nx][ny])
          continue;

        visited[nx][ny] = true;
        const dist = Math.abs(N - nx) + Math.abs(pos - ny);

        if (dist > D) continue; // 사거리 초과
        if (copy[nx][ny] === 1) {
          targets.add(nx * M + ny); // 좌표를 인덱스로 변환하여 저장
          queue.length = 0; // 첫 번째 적 발견 시 탐색 종료
          break;
        }

        queue.push([nx, ny]);
      }
    }
  }

  // 적 제거
  for (const target of targets) {
    const x = Math.floor(target / M);
    const y = target % M;
    copy[x][y] = 0;
  }

  return targets.size; // 제외된 적 수 반환
}

function moveEnemies(copy) {
  let cnt = 0;
  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j < M; j++) {
      if (copy[i][j] === 1) {
        copy[i][j] = 0; // 현재 위치 초기화
        if (i === N - 1) {
          cnt++;
        } else {
          copy[i + 1][j] = 1; // 아래로 이동
        }
      }
    }
  }

  return cnt; // 이동으로 제외된 적 수 반환
}
