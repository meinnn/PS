const fs = require('fs');
const [n, ...input] = fs.readFileSync(0, 'utf-8').trim().split('\n').map(Number);

const dp = [...Array(n)].map(() => Array(3).fill(-1));

const re_dp = (idx, cnt) => {
    if (idx >= n) return 0;

    if (dp[idx][cnt] !== -1) return dp[idx][cnt];

    // 안 먹고 다음 거
    dp[idx][cnt] = re_dp(idx+1, 0);

    if (cnt < 2) {
        // 안 먹고 다음 거 or 먹고 다음 거
        dp[idx][cnt] = Math.max(dp[idx][cnt], input[idx] + re_dp(idx+1, cnt+1));
    }

    return dp[idx][cnt];
}

console.log(re_dp(0, 0));