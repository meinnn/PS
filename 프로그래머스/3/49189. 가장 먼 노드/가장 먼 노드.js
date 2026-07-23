function solution(n, edge) {
    let answer = 0;
    
    const graph = Array.from({length: n + 1}, () => []);
    for (const [from, to] of edge) {
        graph[from].push(to);
        graph[to].push(from);
    }
    
    const visited = Array(n).fill(false);
    let q = [1];
    visited[1] = true;
    
    while (q.length > 0) {
        const size = q.length;
        answer = size; // 항상 가장 마지막 너비 개수로 업데이트
        const temp = [];
        
        for (const node of q) {
            for (const next of graph[node]) {
                if (!visited[next]) {
                    temp.push(next);
                    visited[next] = true;
                } 
            }
        }
        
        q = temp;
    }
    
    return answer;
}