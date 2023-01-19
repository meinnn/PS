const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().split('\n').map(e => +e);
const input = fs.readFileSync('../input.txt').toString().trim().split('\n');
const [N, M] = input.shift().split(' ');
const pokemon = input.slice(0, N);
const prob = input.slice(N);

const map = new Map(pokemon.map((v, i) => [v, i + 1]));
prob.forEach(e => {
    // 문자 입력
    if (Number.isNaN(+e)) {
        console.log(map.get(e));
    }
    // 숫자 입력
    else {
        console.log(pokemon[e - 1]);
    }
});