const fs = require('fs');
const filePath = process.platform === 'linux' ? 0 : 'input.txt';
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];

function getPrimes(n) {
  const isPrime = Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }

  return primes;
}

const primes = getPrimes(N);
let left = -1;
let right = 0;
let count = 0;
let sum = primes[0];

while (left < right && right < N) {
  if (sum < N) {
    sum += primes[++right];
  } else {
    if (sum === N) count++;
    sum -= primes[++left];
  }
}

console.log(count);
