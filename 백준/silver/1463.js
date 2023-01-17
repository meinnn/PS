const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n').map(e => +e);
const input = fs.readFileSync('../input.txt').toString();
const N = Number(input);

const d = new Array(N + 1).fill(0);

for (let i = 2; i < N + 1; i++) {
    d[i] = d[i - 1] + 1;
    if (i % 2 === 0) {
        d[i] = Math.min(d[i], d[i/2] + 1);
    }
    if (i % 3 === 0) {
        d[i] = Math.min(d[i], d[i/3] + 1);
    }
} 
console.log(d[N]);