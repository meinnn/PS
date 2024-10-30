const fs = require("fs");
const input = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((e) => +e);
const T = input.shift();

const arr = [0, 1, 2, 4];

// 0 < n < 11
for (let i = 4; i < 11; i++) {
  arr[i] = arr[i - 1] + arr[i - 2] + arr[i - 3];
}

for (let i = 0; i < T; i++) {
  const n = input[i];
  console.log(arr[n]);
}
