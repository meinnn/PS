const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, k] = input[0].split(' ').map(Number);
const board = [];
board.push(input[1].split('').map(Number));
board.push(input[2].split('').map(Number));

let q = [[0, 0]];
const visited = Array.from({ length: 2 }, () => Array(N).fill(false));
visited[0][0] = true;

let time = 0;
let possible = 0;

while (q.length > 0) {
  let size = q.length;
  const tmp = [];

  while (size-- > 0) {
    const [side, num] = q.pop();

    if (num < time) continue;

    // 앞
    if (num + 1 >= N) {
      possible = 1;
      break;
    }
    if (!visited[side][num + 1] && board[side][num + 1] === 1) {
      tmp.push([side, num + 1]);
      visited[side][num + 1] = true;
    }

    // 뒤
    if (num - 1 > 0 && !visited[side][num - 1] && board[side][num - 1] === 1) {
      tmp.push([side, num - 1]);
      visited[side][num - 1] = true;
    }

    // 점프
    if (num + k >= N) {
      possible = 1;
      break;
    }
    const ns = Math.abs(side - 1);
    const nn = num + k;
    if (!visited[ns][nn] && board[ns][nn] === 1) {
      tmp.push([ns, nn]);
      visited[ns][nn] = true;
    }
  }

  q = tmp;
  time++;
}

console.log(possible);
