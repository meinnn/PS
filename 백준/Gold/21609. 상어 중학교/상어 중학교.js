const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);

let board = Array.from({ length: N }, () => Array(N));
for (let i = 0; i < N; i++) {
  board[i] = input[i + 1].split(' ').map(Number);
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

// 가장 큰 블록 기준 블록, 블록의 수
let guide = [];
let max = 0;
let rainbow = 0;

// 획득 점수
let score = 0;

// 1. 크기가 가장 큰 블록 그룹을 찾는다
const visited = Array.from({ length: N }, () => Array(N).fill(false));
findMaxBlockGroup();

while (max > 1) {
  // 2. 찾은 블록 그룹을 제거한다, B^2점 획득
  visited.forEach((v, i) => visited[i].fill(false));
  bfs(guide[0], guide[1], board[guide[0]][guide[1]], -1);
  score += max * max;

  // 3. 중력 작용
  gravity();

  // 4. 90도 반시계 회전
  rotate();

  // 5. 다시 중력 작용
  gravity();

  // 1. 크기가 가장 큰 블록 그룹을 찾는다
  max = 0;
  rainbow = 0;
  visited.forEach((v, i) => visited[i].fill(false));
  findMaxBlockGroup();
}

console.log(score);

function findMaxBlockGroup() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j] && board[i][j] > 0) bfs(i, j, board[i][j], 0);
    }
  }
}

function bfs(x, y, color, status) {
  // status 0: 찾기, -1: 제거하기
  const q = [];

  q.push([x, y]);
  visited[x][y] = true;

  let cnt = 0;
  let zero = 0;
  while (q.length > 0) {
    const [cx, cy] = q.shift();
    if (status === 0) cnt++; // 찾기
    else board[cx][cy] = -2; // 제거

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [cx + dx[i], cy + dy[i]];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny]) continue;

      // 같은 색이거나 무지개
      if (board[nx][ny] === color || board[nx][ny] === 0) {
        q.push([nx, ny]);
        visited[nx][ny] = true;
        if (board[nx][ny] === 0) zero++;
      }
    }
  }

  // 최대 블록 그룹 갱신
  if (status === 0) {
    // 블록 그룹이 여러 개라면 무지개 블록 수가 가장 많은 그룹
    if (cnt > max || (cnt === max && zero >= rainbow)) {
      guide = [x, y];
      max = cnt;
      rainbow = zero;
    }

    // 무지개 블록은 중복 방문할 수 있게
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (visited[i][j] && board[i][j] === 0) visited[i][j] = false;
      }
    }
  }
}

function gravity() {
  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j < N; j++) {
      // 빈 공간
      if (board[i][j] === -2) {
        let col = i - 1;
        while (col >= 0 && board[col][j] === -2) col--;

        // 검은색 블록이 아니면
        if (col >= 0 && board[col][j] !== -1) {
          board[i][j] = board[col][j];
          board[col][j] = -2;
        }
      }
    }
  }
}

function rotate() {
  const tmp = Array.from({ length: N }, () => Array(N));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      tmp[i][j] = board[j][N - i - 1];
    }
  }

  board = tmp;
}
