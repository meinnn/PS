const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = Number(input[0]);
const expr = input[1].split('');

const numbers = expr.filter((_, i) => i % 2 === 0).map(Number);
const operators = expr.filter((_, i) => i % 2 !== 0);

let result = -Infinity;
calculate(0, numbers[0]);

console.log(result);

function calculate(idx, acc) {
  if (idx >= operators.length) {
    result = Math.max(result, acc);
    return;
  }

  // 괄호 없음
  calculate(idx + 1, basicOperate(acc, operators[idx], numbers[idx + 1]));

  // 괄호 추가
  if (idx + 1 < operators.length) {
    const bracket = basicOperate(
      numbers[idx + 1],
      operators[idx + 1],
      numbers[idx + 2]
    );
    calculate(idx + 2, basicOperate(acc, operators[idx], bracket));
  }
}

function basicOperate(num1, op, num2) {
  switch (op) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
  }
}
