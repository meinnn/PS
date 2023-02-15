const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n').map(Number);
const input = fs.readFileSync('../input.txt').toString().trim().split('\n');
const N = Number(input.shift());

const board = [...new Array(N)].map(() => []);
for (let i = 0; i < N; i++) {
    board[i] = input.shift().split(' ').map(e => +e);
}


let white = 0, blue = 0;

const cut = (x, y, n) => {
    const color = board[x][y];

    if (n === 1) {
        if (color === 0) white++;
        else blue++;
        return;
    }


    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // 색깔 다른 칸 나오면 4분할
            if (board[x + i][y + j] != color) {
                cut(x, y, n / 2);
                cut(x + n / 2, y, n / 2);
                cut(x, y + n / 2, n / 2);
                cut(x + n / 2, y + n / 2, n / 2);
                return;
            }
        }
    }

    // 색깔 다른 칸 없으면
    if (color === 0) white++;
    else blue++;
}

cut(0, 0, N);
console.log(white);
console.log(blue);