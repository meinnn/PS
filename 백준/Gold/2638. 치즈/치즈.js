const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
let board = input.slice(1).map((line) => line.split(' ').map(Number));

let cheese = board.reduce(
  (count, row) => count + row.reduce((c, cell) => c + cell, 0),
  0
);

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

bfs();

function bfs() {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const q = [[0, 0]];
  visited[0][0] = true;

  let time = 0; // 소요 시간
  let edges = []; // 가장자리 치즈

  while (cheese > 0) {
    while (q.length > 0) {
      const [cx, cy] = q.shift();

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M || visited[nx][ny]) continue;

        visited[nx][ny] = true;
        if (board[nx][ny] === 0) {
          q.push([nx, ny]);
        } else {
          edges.push([nx, ny]);
        }
      }
    }

    const tmpBoard = board.map((line) => [...line]);
    let tmp = []; // 안 녹은 가장자리 치즈들 임시 보관

    for (let edge of edges) {
      const [x, y] = edge;
      let air = 0;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
        if (board[nx][ny] === 0 && visited[nx][ny]) air++;
      }

      if (air >= 2) {
        tmpBoard[x][y] = 0; // 치즈 녹아
        cheese--;
        visited[x][y] = true;
        q.push([x, y]); // 새로운 빈 공간
      } else {
        tmp.push([x, y]); // 치즈 안 녹아
      }
    }

    edges = tmp;
    board = tmpBoard;

    time++;
  }

  console.log(time);
}
