const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, C] = input[0].split(' ').map(Number);
const weights = input[1].split(' ').map(Number);

const half = Math.floor(N / 2);
const left = weights.slice(0, half);
const right = weights.slice(half);

const leftSums = getSubsetSums(left);
const rightSums = getSubsetSums(right).sort((a, b) => a - b); // 정렬!

let count = 0;
for (const sum of leftSums) {
  if (sum > C) continue;
  count += upperBound(rightSums, C - sum);
}

console.log(count);

function upperBound(arr, x) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] <= x) left = mid + 1;
    else right = mid;
  }

  return left;
}

function getSubsetSums(arr) {
  const result = [];

  const dfs = (idx, sum) => {
    if (idx === arr.length) {
      result.push(sum);
      return;
    }

    dfs(idx + 1, sum); // 현재 물건 안 넣기
    dfs(idx + 1, sum + arr[idx]); // 현재 물건 넣기
  };

  dfs(0, 0);
  return result;
}
