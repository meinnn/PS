const fs = require('fs');
const [N, r, c] = fs.readFileSync('/dev/stdin').toString().split(' ').map(e => +e);

let ans = 0;

const Z = (x, y, size) => {
    if (x === c && y === r) {
        console.log(ans);
        return;
    }

    // [r,c] 가 사분면 안에 있는 경우
    if (x <= c && c < x + size && y <= r && r < y + size) {
        // 1사분면
        Z(x, y, size / 2);
        // 2사분면
        Z(x + size / 2, y, size / 2);
        // 3사분면
        Z(x, y + size / 2, size / 2);
        // 4사분면
        Z(x + size / 2, y + size / 2, size / 2);
    } 
    // 사분면 안에 없는 경우
    else {
        ans += size * size;
    }
};

Z(0, 0, 1 << N);