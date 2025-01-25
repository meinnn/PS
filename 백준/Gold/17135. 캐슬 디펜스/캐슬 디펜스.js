const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const [N, M, D] = input[0].split(' ').map(Number);
const board = Array(N);
for (let i = 0; i < N; i++) {
  board[i] = input[i + 1].split(' ').map(Number);
}
board.push(Array(M).fill(2));

let enemies = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 1) {
      enemies++;
    }
  }
}

const dx = [0, -1, 0]; // <-, 위, ->
const dy = [-1, 0, 1];

// 조합
let max = 0; // 궁수의 공격으로 제거할 수 있는 적의 최대 수
for (let i = 0; i < M; i++) {
  for (let j = i + 1; j < M; j++) {
    for (let l = j + 1; l < M; l++) {
      play([i, j, l]); // 궁수 위치
    }
  }
}

console.log(max);

function play(positions) {
  const copy = board.map((row) => [...row]);
  let cnt = 0;
  let left = enemies; // 남은 적 수
  while (left > 0) {
    // 공격
    const attacked = attack(positions, copy);
    cnt += attacked;
    left -= attacked;

    // 적 없으면 종료
    if (left <= 0) break;

    // 적 이동
    for (let i = N - 1; i >= 0; i--) {
      for (let j = 0; j < M; j++) {
        if (copy[i][j] === 1) {
          copy[i][j] = 0;
          if (i === N - 1) {
            left--;
          } else {
            copy[i + 1][j] = 1;
          }
        }
      }
    }
  }

  if (cnt > max) max = cnt; // max 갱신
}

function attack(positions, board) {
  // visited[x][y][궁수idx]
  const visited = Array.from({ length: N + 1 }, () =>
    Array.from({ length: M }, () => Array(3).fill(false))
  );
  const q = [];

  for (let i = 0; i < 3; i++) {
    visited[N][positions[i]][i] = true;
    q.push([N, positions[i], i]); //  x, y, 궁수번호
  }

  const shoot = Array(3).fill(false);
  const set = new Set();
  while (q.length > 0) {
    const [cx, cy, idx] = q.shift();
    if (shoot[idx]) continue;

    for (let i = 0; i < 3; i++) {
      const [nx, ny] = [cx + dx[i], cy + dy[i]];
      if (nx < 0 || nx >= N + 1 || ny < 0 || ny >= M || visited[nx][ny][idx])
        continue;

      if (Math.abs(N - nx) + Math.abs(positions[idx] - ny) <= D) {
        visited[nx][ny][idx] = true;
        if (board[nx][ny] === 1) {
          set.add(`${nx},${ny}`);
          shoot[idx] = true;
          break;
        }
        q.push([nx, ny, idx]);
      }
    }
  }

  for (const position of set) {
    const [x, y] = position.split(',').map(Number);
    board[x][y] = 0;
  }

  return set.size; // 제외된 적 수 반환
}
