function solution(numbers, target) {
    let count = 0;
    
    const dfs = (idx, acc) => {
        if (idx >= numbers.length) {
            if (acc === target) count++;
            return;
        }

        // 더하기
        dfs(idx + 1, acc + numbers[idx]);
        // 빼기
        dfs(idx + 1, acc - numbers[idx]);
    }
    
    dfs(0, 0);
    
    return count;
}