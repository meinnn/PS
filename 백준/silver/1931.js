const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n').map(Number);
const input = fs.readFileSync('../input.txt').toString().trim().split('\n');
const N = Number(input.shift());

let meeting = Array.from({length: N}, (v, i) => input[i].split(' ').map(Number));

meeting.sort(function(a, b) {
    // 끝나는 시간 기준 정렬. 같을 경우 시작시간 빠른 순
    if (a[1] === b[1]) {
        return a[0] - b[0];
    }
    return a[1] - b[1];
});

let answer = 0;
let time = 0;

for (let i = 0; i < N; i++) {
    if (time <= meeting[i][0]) {
        time = meeting[i][1];
        answer++;
    }
}

console.log(answer);