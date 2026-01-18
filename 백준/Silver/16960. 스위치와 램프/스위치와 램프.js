const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const switches = Array(N + 1);

for (let i = 1; i <= N; i++) {
  const [n, ...lamps] = input[i].split(' ').map(Number);
  switches[i] = lamps;
}

let answer = 0;

for (let i = 1; i <= N; i++) {
  const isOn = Array(M + 1).fill(true);

  for (const lamp of switches[i]) {
    isOn[lamp] = false;
  }

  for (let j = 1; j <= N; j++) {
    if (i === j) continue;
    for (const lamp of switches[j]) {
      isOn[lamp] = true;
    }
  }

  if (isOn.every((e) => e === true)) {
    answer = 1;
    break;
  }
}

console.log(answer);
