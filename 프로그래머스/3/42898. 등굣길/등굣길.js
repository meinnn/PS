function solution(m, n, puddles) {
    const dp = Array.from({length: n + 1}, () => Array(m + 1).fill(0));
    
    for (const [y, x] of puddles) {
        dp[x][y] = -1;
    }
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (i === j && j === 1) {
                dp[i][j] = 1;
                continue;
            }
            if (dp[i][j] === -1) {
                dp[i][j] = 0;
                continue;
            }
            dp[i][j] = Math.max(dp[i-1][j], 0) % 1000000007 + Math.max(dp[i][j-1], 0) % 1000000007;
        }
    }
    
    return dp[n][m] % 1000000007;
}