function solution(triangle) {
    const sum = Array.from({length: triangle.length}, () => Array(triangle.length + 1).fill(0));
    
    sum[0][1] = triangle[0][0];
    
    for (let i = 1; i < triangle.length; i++) {
        for (let j = 1; j <= i + 1; j++) {
            sum[i][j] = Math.max(sum[i-1][j-1], sum[i-1][j]) + triangle[i][j-1];
        }    
    }
    
    return Math.max(...sum[triangle.length-1]);
}