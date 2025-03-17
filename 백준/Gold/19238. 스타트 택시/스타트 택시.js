const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, F] = input[0].split(' ').map(Number);
const map = input.slice(1, N + 1).map((row) => row.split(' ').map(Number));
let pos = input[N + 1].split(' ').map((e) => +e - 1);

for (let i = 0; i < M; i++) {
  const [sx, sy, ex, ey] = input[i + N + 2].split(' ').map((e) => +e - 1);
  map[sx][sy] = [ex, ey]; // 지도에 승객 표시
}

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

let fuel = F; // 연료
let passenger = []; // 선택한 승객 위치
let dest = []; // 선택한 승객의 목적지

for (let i = 0; i < M; i++) {
  if (fuel === -1) break;

  // 승객 이동시키는 일 M번 반복
  passenger = [N, N];
  dist = [];
  takePassenger();
}

console.log(fuel);

// 태울 승객 찾기
function takePassenger() {
  // 현 위치에 승객 있음
  if (map[pos[0]][pos[1]] !== 0 && map[pos[0]][pos[1]] !== 1) {
    dest = [...map[pos[0]][pos[1]]];
    map[pos[0]][pos[1]] = 0; // 승객 이동

    const nextDist = getDist(pos[0], pos[1], dest[0], dest[1]); // 목적지까지 거리
    if (fuel < nextDist) {
      fuel = -1;
      return;
    }

    fuel += nextDist; // 목적지까지 거리만큼 소모, 거리*2만큼 충전
    pos = [dest[0], dest[1]];
    return;
  }

  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  visited[pos[0]][pos[1]] = true;
  const q = [[pos[0], pos[1]]];

  let dist = 0; // 거리
  while (q.length > 0) {
    dist++;

    let size = q.length;
    let flag = 0;

    if (dist > fuel) {
      fuel = -1; // 영업종료
      return;
    }

    while (size-- > 0) {
      const [cx, cy] = q.shift();

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        if (visited[nx][ny] || map[nx][ny] === 1) continue;

        visited[nx][ny] = true;
        // 빈칸 아님 (승객 있음)
        if (map[nx][ny] !== 0) {
          if (passenger[0] > nx || (passenger[0] === nx && passenger[1] > ny)) {
            passenger = [nx, ny];
            dest = [...map[nx][ny]];
            flag = 1;
          }
        } else {
          q.push([nx, ny]);
        }
      }
    }

    if (flag === 1) {
      map[passenger[0]][passenger[1]] = 0; // 승객 이동
      fuel -= dist; // dist 만큼 소모

      const nextDist = getDist(passenger[0], passenger[1], dest[0], dest[1]); // 목적지까지 거리
      if (fuel < nextDist) {
        fuel = -1;
        return;
      }

      fuel += nextDist; // 목적지까지 거리만큼 소모, 거리*2만큼 충전
      pos = [dest[0], dest[1]];
      return;
    }
  }

  // 손님을 태워줄 수 없음!
  fuel = -1;
}

function getDist(startX, startY, endX, endY) {
  if (startX === endX && startY === endY) return 0;

  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  visited[startX][startY] = true;
  const q = [[startX, startY]];

  let dist = 0;
  while (q.length > 0) {
    dist++;

    if (dist > fuel) {
      fuel = -1;
      return Infinity;
    }

    let size = q.length;
    while (size-- > 0) {
      const [cx, cy] = q.shift();

      for (let i = 0; i < 4; i++) {
        const nx = cx + dx[i];
        const ny = cy + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        if (visited[nx][ny] || map[nx][ny] === 1) continue;

        if (nx === endX && ny === endY) {
          return dist;
        }

        visited[nx][ny] = true;
        q.push([nx, ny]);
      }
    }
  }

  // 손님을 태워줄 수 없음!
  fuel = -1;
  return Infinity;
}
