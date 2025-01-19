const fs = require('fs');
const [N, input] = fs.readFileSync(0, 'utf-8').trim().split('\n');
const arr = input.split(' ').map(Number);

arr.sort((a, b) => a - b);

let left = 0;
let right = arr.length - 1;
let closest = Infinity;
let result = [arr[left], arr[right]];

while (left < right) {
  const sum = arr[left] + arr[right];

  // 현재 합이 0에 더 가까운 경우 업데이트
  if (Math.abs(sum) < Math.abs(closest)) {
    closest = sum;
    result = [arr[left], arr[right]];
  }

  if (sum < 0) left++;
  else if (sum > 0) right--;
  else break;
}

console.log(result[0], result[1]);
