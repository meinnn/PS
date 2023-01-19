const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n').map(e => +e);
const input = fs.readFileSync('../input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);

const set1 = input.slice(0, N);
const set2 = new Set(input.slice(N));

const intersect = set1.filter(v => set2.has(v)).sort();
console.log(intersect.length);
console.log(intersect.join('\n'));