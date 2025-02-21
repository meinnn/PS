const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const belt = input[1].split(' ').map(Number);
const robots = Array(2 * N).fill(false); // 칸에 로봇이 있는지

let up = 0; // 올리는 위치
let down = N - 1; // 내리는 위치
let cnt = 0; // 내구도가 0인 칸의 개수
let step = 0; // 실행 중인 단계

while (cnt < K) {
  step++;

  // 1. 벨트 회전 (로봇도 함께 이동)
  up = (up - 1 + 2 * N) % (2 * N);
  down = (down - 1 + 2 * N) % (2 * N);
  robots[down] = false; // 내려가는 위치 로봇 제거

  // 2. 로봇 이동 (가장 먼저 올라간 로봇부터)
  for (
    let i = (down - 1 + 2 * N) % (2 * N);
    i !== (up - 1 + 2 * N) % (2 * N);
    i = (i - 1 + 2 * N) % (2 * N)
  ) {
    const next = (i + 1) % (2 * N);
    if (robots[i] && !robots[next] && belt[next] > 0) {
      robots[i] = false;
      if (next !== down) robots[next] = true; // 내려가는 위치면 제거
      belt[next]--;
      if (belt[next] === 0) cnt++;
    }
  }

  // 3. 올리는 위치에 로봇 올리기
  if (belt[up] > 0) {
    robots[up] = true;
    belt[up]--;
    if (belt[up] === 0) cnt++;
  }
}

console.log(step);
