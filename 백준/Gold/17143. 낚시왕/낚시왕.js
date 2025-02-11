class Shark {
  constructor(r, c, s, d, z) {
    this.x = r;
    this.y = c;
    this.speed = s;
    this.dir = d;
    this.size = z;
  }
}

const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [R, C, M] = input[0].split(' ').map(Number);
const sharks = new Map();

for (let i = 1; i <= M; i++) {
  const [r, c, s, d, z] = input[i].split(' ').map(Number);
  const shark = new Shark(r - 1, c - 1, s, d, z);
  sharks.set(shark.x * C + shark.y, shark);
}

let result = 0;
const dx = [0, -1, 1, 0, 0]; // 0 상 하 우 좌
const dy = [0, 0, 0, 1, -1];

// 1. 낚시왕이 오른쪽으로 한 칸 이동한다.
for (let i = 0; i < C; i++) {
  // 2. 낚시왕이 있는 열에 있는 상어 중에서 땅과 제일 가까운 상어를 잡는다.
  result += fishing(i);
  // 3. 상어가 이동한다.
  moveSharks();
}

console.log(result);

function fishing(col) {
  for (let i = 0; i < R; i++) {
    const key = i * C + col;
    if (sharks.has(key)) {
      const shark = sharks.get(key);
      sharks.delete(key);

      return shark.size;
    }
  }
  return 0;
}

function moveSharks() {
  const newSharks = new Map();

  for (let [key, shark] of sharks) {
    let { x, y, speed, dir, size } = shark;

    // 이동 거리 계산
    let moveDist = speed;
    if (dir === 1 || dir === 2) moveDist %= (R - 1) * 2; // 세로 방향
    else moveDist %= (C - 1) * 2; // 가로 방향

    for (let i = 0; i < moveDist; i++) {
      let nx = x + dx[dir];
      let ny = y + dy[dir];

      if (nx < 0 || nx >= R || ny < 0 || ny >= C) {
        if (dir === 1) dir = 2;
        else if (dir === 2) dir = 1;
        else if (dir === 3) dir = 4;
        else dir = 3;

        // 방향 바꿔 위치 다시 계산
        nx = x + dx[dir];
        ny = y + dy[dir];
      }

      x = nx;
      y = ny;
    }

    const newKey = x * C + y;

    // 크기가 가장 큰 상어가 나머지 상어를 모두 잡아먹는다.
    if (newSharks.has(newKey)) {
      if (newSharks.get(newKey).size < size) {
        newSharks.set(newKey, new Shark(x, y, speed, dir, size));
      }
    } else {
      newSharks.set(newKey, new Shark(x, y, speed, dir, size));
    }
  }

  sharks.clear();
  for (let [key, shark] of newSharks) {
    sharks.set(key, shark);
  }
}
