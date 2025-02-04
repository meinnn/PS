const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const order = input[1].split(' ').map(Number);

const plugged = new Set(); // 현재 멀티탭에 꽂혀있는 애들
let cnt = 0; // 플러그 빼는 횟수

for (let i = 0; i < K; i++) {
  const device = order[i];

  // 멀티탭에 이미 꽂혀있음
  if (plugged.has(device)) continue;

  // 멀티탭에 빈자리 있음
  if (plugged.size < N) {
    plugged.add(order[i]);
    continue;
  }

  // 가장 나중에 쓰는 애를 교체
  let latest = -1;
  let unplug; // 뺄 코드
  for (let item of plugged) {
    let next = order.slice(i + 1).indexOf(item);
    if (next === -1) {
      // 앞으로 안 쓰임
      unplug = item;
      break;
    }
    if (next > latest) {
      latest = next;
      unplug = item;
    }
  }

  plugged.delete(unplug);
  plugged.add(device);
  cnt++;
}

console.log(cnt);
