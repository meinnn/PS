const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const N = +fs.readFileSync(filePath).toString().trim();

console.log(Math.floor(Math.sqrt(N)));
