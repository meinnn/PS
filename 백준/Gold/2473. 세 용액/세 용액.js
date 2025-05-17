const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const liquid = input[1].split(' ').map(Number);

liquid.sort((a, b) => a - b);
let result = [];
let minDiff = Infinity;

for (let i = 0; i < N; i++) {
  const tmp = [...liquid];
  tmp.splice(i, 1);
  const [a, b] = getClosest(-liquid[i], tmp);
  const total = liquid[i] + a + b;

  if (Math.abs(total) < minDiff) {
    minDiff = Math.abs(total);
    result = [liquid[i], a, b];
  }
}

console.log(result.sort((a, b) => a - b).join(' '));

function getClosest(target, arr) {
  let left = 0;
  let right = arr.length - 1;
  let diff = Infinity;
  let ret = [];

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (Math.abs(sum - target) < diff) {
      diff = Math.abs(sum - target);
      ret = [arr[left], arr[right]];
    }

    if (sum === target) return ret;
    if (sum < target) left++;
    else right--;
  }

  return ret;
}
