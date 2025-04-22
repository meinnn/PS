const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const result = [];

for (let t = 0; t < input.length - 1; t++) {
  const [n, ...hist] = input[t].split(' ').map(Number);
  result.push(divide(hist, 0, n - 1));
}

console.log(result.join('\n'));

function divide(hist, start, end) {
  if (start === end) return hist[start];

  const mid = Math.floor((start + end) / 2);

  const leftArea = divide(hist, start, mid);
  const rightArea = divide(hist, mid + 1, end);
  const midArea = getMidArea(hist, start, end, mid);

  return Math.max(leftArea, rightArea, midArea);
}

function getMidArea(hist, start, end, mid) {
  let left = mid;
  let right = mid + 1;
  let height = Math.min(hist[left], hist[right]);
  let maxArea = height * 2;

  // 좌우 확장
  while (start < left || right < end) {
    // 왼쪽 확장 가능 && (오른쪽 확장 불가 || 왼쪽이 더 높음)
    if (start < left && (right === end || hist[left - 1] > hist[right + 1])) {
      left--;
      height = Math.min(height, hist[left]);
    } else {
      right++;
      height = Math.min(height, hist[right]);
    }

    maxArea = Math.max(maxArea, height * (right - left + 1));
  }

  return maxArea;
}
