const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const result = [];

for (let t = 0; t < input.length - 1; t++) {
  const [n, ...hist] = input[t].split(' ').map(Number);
  result.push(getMaxArea(hist));
}

console.log(result.join('\n'));

function getMaxArea(hist) {
  const stack = [];
  let maxArea = 0;
  let idx = 0;

  while (idx < hist.length) {
    // 스택이 비어있거나 현재 높이가 더 크면 push
    if (stack.length === 0 || hist[idx] > hist[stack[stack.length - 1]]) {
      stack.push(idx++);
    } else {
      // 현재 막대가 작으면, pop해서 넓이 계산
      const height = hist[stack.pop()];
      // 넓이 = 확장 가능한 왼쪽 경계 ~ (idx-1)
      const width =
        stack.length === 0 ? idx : idx - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
  }

  // 남은 스택 처리
  while (stack.length > 0) {
    const height = hist[stack.pop()];
    const width = stack.length === 0 ? idx : idx - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, height * width);
  }

  return maxArea;
}
