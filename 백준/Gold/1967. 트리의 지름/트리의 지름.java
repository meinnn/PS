
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

public class Main {

    static class Edge {
        int node;
        int cost;

        public Edge(int node, int cost) {
            this.node = node;
            this.cost = cost;
        }
    }

    static List<Edge>[] tree;
    static boolean[] visited;
    static int max = 0;
    static int node = 1;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        tree = new ArrayList[n+1];
        visited = new boolean[n+1];

        for (int i = 1; i < n+1; i++) {
            tree[i] = new ArrayList<>();
        }

        for (int i = 0; i < n-1; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int v = Integer.parseInt(st.nextToken());
            int u = Integer.parseInt(st.nextToken());
            int w = Integer.parseInt(st.nextToken());

            tree[v].add(new Edge(u, w));
            tree[u].add(new Edge(v, w));
        }

        // 루트에서 제일 먼 노드 찾기
        dfs(1, 0);
        Arrays.fill(visited, false);
        // 찾은 노드로부터 가장 먼 노드까지 거리 찾기 = 트리의 지름
        dfs(node, 0);

        System.out.println(max);
    }

    public static void dfs(int idx, int cost) {
        if (cost > max) {
            max = cost;
            node = idx;
        }

        visited[idx] = true;
        for (Edge e : tree[idx]) {
            if (!visited[e.node]) {
                dfs(e.node, cost + e.cost);
            }
        }
    }
}
