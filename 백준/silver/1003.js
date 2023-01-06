// input
const fs = require('fs');
const input = fs.readFileSync('../input.txt').toString().split('\n').map(e => +e);
const len = input.shift();

// solution
for (let i = 0; i < len; i++) {
    const n = input[i];
    const fibonacci = [ [1,0], [0,1]];

    for (let j = 2; j <= n; j++) {
        fibonacci[j] = [
            fibonacci[j-1][0] + fibonacci[j-2][0],
            fibonacci[j-1][1] + fibonacci[j-2][1]
        ];
    }
    
    console.log(fibonacci[n].join(' '));
}