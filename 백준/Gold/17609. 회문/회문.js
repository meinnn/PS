const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const T = Number(input[0]);
const result = [];

for (let t = 1; t <= T; t++) {
  const str = input[t];
  result.push(checkPalindrome(str));
}

console.log(result.join('\n'));

function checkPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      if (
        isSubPalindrome(str, left + 1, right) ||
        isSubPalindrome(str, left, right - 1)
      ) {
        return 1; // 유사회문
      } else {
        return 2; // 일반 문자열
      }
    }
    left++;
    right--;
  }

  return 0; // 회문
}

function isSubPalindrome(str, left, right) {
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}
