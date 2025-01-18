const fs = require('fs');
const [N, mins, ...input] = fs.readFileSync(0, 'utf-8').trim().split('\n');

// 단백질, 지방, 탄수화물, 비타민
const [mp, mf, ms, mv] = mins.split(' ').map(Number);
const ingredients = input.map((line) => line.split(' ').map(Number));

// 최소 비용, 해당 조합
let min = Infinity;
let set = [];

function isLexicographicallySmaller(arr1, arr2) {
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    if (arr1[i] < arr2[i]) return true; // arr1이 더 작음
    if (arr1[i] > arr2[i]) return false; // arr2가 더 작음
  }
  return arr1.length < arr2.length; // 길이가 짧은 배열이 더 작음
}

function subset(idx, p = 0, f = 0, s = 0, v = 0, c = 0, arr = []) {
  if (c > min) return; // 현재 비용이 최소 비용을 초과하면 탐색 종료
  if (idx == N) {
    if (p >= mp && f >= mf && s >= ms && v >= mv) {
      if (
        c < min ||
        (c === min && isLexicographicallySmaller(arr, set)) // 사전순
      ) {
        min = c;
        set = [...arr];
      }
    }
    return;
  }

  // 현재 재료 선택
  subset(
    idx + 1,
    p + ingredients[idx][0],
    f + ingredients[idx][1],
    s + ingredients[idx][2],
    v + ingredients[idx][3],
    c + ingredients[idx][4],
    [...arr, idx + 1]
  );

  // 현재 재료 선택 X
  subset(idx + 1, p, f, s, v, c, arr);
}

// 부분집합 생성
subset(0);

if (set.length > 0) {
  console.log(min);
  console.log(set.join(' '));
} else {
  console.log(-1);
}
