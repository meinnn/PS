const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [R, C] = input[0].split(' ').map(Number);
const maze = input.slice(1).map((row) => row.split(''));

let fireQ = [];
let jihoonQ = [];
let fireVisited = Array.from({ length: R }, () => Array(C).fill(false));
let jihoonVisited = Array.from({ length: R }, () => Array(C).fill(false));

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (maze[i][j] === 'F') {
      fireQ.push([i, j]);
      fireVisited[i][j] = true;
    }
    if (maze[i][j] === 'J') {
      maze[i][j] = '.';
      jihoonQ.push([i, j]);
      jihoonVisited[i][j] = true;
    }
  }
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs() {
  let time = 0;

  while (jihoonQ.length) {
    time++;

    // 불 확산
    const fireSize = fireQ.length;
    for (let i = 0; i < fireSize; i++) {
      const [x, y] = fireQ.shift();
      for (let d = 0; d < 4; d++) {
        const nx = x + dx[d];
        const ny = y + dy[d];
        if (nx < 0 || nx >= R || ny < 0 || ny >= C || fireVisited[nx][ny])
          continue;

        if (maze[nx][ny] === '.') {
          fireQ.push([nx, ny]);
          fireVisited[nx][ny] = true;
          maze[nx][ny] = 'F';
        }
      }
    }

    // 지훈 이동
    const jihoonSize = jihoonQ.length;
    for (let i = 0; i < jihoonSize; i++) {
      const [x, y] = jihoonQ.shift();
      for (let d = 0; d < 4; d++) {
        const nx = x + dx[d];
        const ny = y + dy[d];

        // 탈출 성공
        if (nx < 0 || nx >= R || ny < 0 || ny >= C) {
          console.log(time);
          return;
        }

        if (jihoonVisited[nx][ny]) continue;
        if (maze[nx][ny] === '.') {
          jihoonQ.push([nx, ny]);
          jihoonVisited[nx][ny] = true;
        }
      }
    }
  }

  console.log('IMPOSSIBLE');
}

bfs();
