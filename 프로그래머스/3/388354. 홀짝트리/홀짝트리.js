function solution(nodes, edges) {
    const adj = new Map();
    
    for (const node of nodes) {
        adj.set(node, []);
    }
    
    for (const [u, v] of edges) {
        adj.get(u).push(v);
        adj.get(v).push(u);
    }
    
    // 트리 만들기
    const visited = new Set();
    let holjjakTrees = 0;
    let reverseHoljjakTrees = 0;
    
    for (const node of nodes) {
        if (visited.has(node)) continue;
        
        const tree = [];
        
        const dfs = () => {
            const stack = [node];
            visited.add(node);
            tree.push(node);
            
            while (stack.length > 0) {
                const curr = stack.pop();
                for (const next of adj.get(curr)) {
                    if (!visited.has(next)) {
                        visited.add(next);
                        stack.push(next);
                        tree.push(next);
                    }
                }
            }
        }

        dfs();
        
        // 트리 내의 노드 상태
        let holjjakNodes = 0;
        let reverseNodes = 0;
        
        for (const node of tree) {
            const degree = adj.get(node).length;
            if (node % 2 === degree % 2) {
                holjjakNodes++;
            } else {
                reverseNodes++;
            }
        }
        
        // 홀짝 트리: 홀짝 노드 1개(루트) + 나머지 역홀짝 노드
        // 역홀짝 트리: 역홀짝 노드 1개(루트) + 나머지 역홀짝 노드
        if (holjjakNodes === 1) holjjakTrees++;
        if (reverseNodes === 1) reverseHoljjakTrees++;
    }
    
    return [holjjakTrees, reverseHoljjakTrees];
}