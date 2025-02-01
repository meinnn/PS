const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const N = Number(input[0]);

const dx = [-1, 0, 0, 1]; // 상, 좌, 우, 하
const dy = [0, -1, 1, 0];

let time = 0;
let size = 2;
let pos = [];
let fish = 0;
let ate = 0;

const map = [];
for (let i = 0; i < N; i++) {
  map.push(input[i + 1].split(' ').map(Number));
  for (let j = 0; j <= N; j++) {
    if (map[i][j] === 9) pos = [i, j];
    else if (map[i][j] >= 1 && map[i][j] <= 6) fish++;
  }
}

while (fish > 0) {
  const res = bfs();
  if (res === -1) break;
  time += res;
}

console.log(time);

function bfs() {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  const q = [[pos[0], pos[1]]]; // x, y, time
  visited[pos[0]][[pos[1]]] = true;

  let sec = 0; // 소요 시간
  let next = []; // 다음 아기 상어 이동 위치
  while (q.length > 0) {
    // 초당 탐색
    let len = q.length;
    while (len-- > 0) {
      const [cx, cy] = q.shift();

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny]) continue;

        if (map[nx][ny] === 0) {
          // 빈 공간
          q.push([nx, ny]);
          visited[nx][ny] = true;
          continue;
        }

        if (map[nx][ny] >= 1 && map[nx][ny] <= 6) {
          // 아기 상어는 자신의 크기보다 큰 물고기가 있는 칸은 지나갈 수 없다
          if (map[nx][ny] > size) continue;

          // 작거나 같으면 이동 가능
          q.push([nx, ny]);
          visited[nx][ny] = true;

          // 아기 상어는 자신의 크기보다 작은 물고기만 먹을 수 있다.
          if (map[nx][ny] < size) {
            // 우선순위
            if (next.length === 0) next = [nx, ny];
            else {
              if (nx < next[0]) next = [nx, ny];
              else if (nx === next[0] && ny < next[1]) next = [nx, ny];
            }
          }
        }
      }
    }

    sec++;

    // 물고기 찾음!
    if (next.length > 0) {
      map[next[0]][next[1]] = 0; // 물고기를 먹으면, 그 칸은 빈 칸이 된다.
      ate++;
      fish--;
      if (ate === size) {
        // 자신의 크기와 같은 수의 물고기를 먹을 때 마다 크기가 1 증가
        ate = 0;
        size++;
      }

      // 상어 이동
      map[pos[0]][pos[1]] = 0;
      pos = [next[0], next[1]];
      map[pos[0]][pos[1]] = 9;

      return sec;
    }
  }

  // 물고기 못 먹음
  return -1;
}
