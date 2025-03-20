function solution(edges) {
    const size = 1_000_001; // 최대 정점 수
    const indegree = Array(size).fill(0);
    const graph = Array.from({ length: size }, () => []);
    
    // 그래프 정보 저장
    for (const [from, to] of edges) {
        graph[from].push(to);
        indegree[to]++;
    }

    let createdNode = 0;

    // 생성된 정점 찾기
    for (let i = 1; i < size; i++) {
        if (graph[i].length >= 2 && indegree[i] === 0) {
            createdNode = i;
            break;
        }
    }

    const visited = Array(size).fill(false);
    visited[createdNode] = true; // 생성된 정점은 방문 처리

    let donutCnt = 0;
    let barCnt = 0;
    let eightCnt = 0;

    function dfs(node) {
        visited[node] = true;
        let count = 1; // 탐색한 노드 개수
        let edgeCount = 0; // 해당 그래프의 간선 개수
        let queue = [node];

        while (queue.length > 0) {
            let cur = queue.pop();

            for (let next of graph[cur]) {
                edgeCount++; // 간선 개수 증가
                if (!visited[next]) {
                    visited[next] = true;
                    queue.push(next);
                    count++;
                }
            }
        }
        return [count, edgeCount];
    }

    // 생성된 정점에서 직접 연결된 정점들을 탐색
    for (const start of graph[createdNode]) {
        let [nodeCount, edgeCount] = dfs(start);

        if (nodeCount === edgeCount) {
            donutCnt++; // 도넛 그래프
        } else if (edgeCount === nodeCount + 1) {
            eightCnt++; // 8자 그래프
        } else {
            barCnt++; // 막대 그래프
        }
    }

    return [createdNode, donutCnt, barCnt, eightCnt];
}
