import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class Main {
    static List<Integer>[] graph;
    static boolean[] visited;
    static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int V = Integer.parseInt(st.nextToken());

        graph = new ArrayList[N+1];
        for (int i = 1; i <= N; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int i = 0; i < M; i++) {
            st = new StringTokenizer(br.readLine(), " ");

            int v = Integer.parseInt(st.nextToken());
            int u = Integer.parseInt(st.nextToken());

            graph[v].add(u);
            graph[u].add(v);
        }

        for (int i = 1; i <= N; i++) {
            Collections.sort(graph[i]);
        }

        visited = new boolean[N+1];
        dfs(V);
        sb.append("\n");

        Arrays.fill(visited, false);
        bfs(V);

        System.out.println(sb);
    }

    private static void bfs(int v) {
        visited[v] = true;
        sb.append(v).append(" ");

        Queue<Integer> q = new ArrayDeque<>();
        q.add(v);

        while (!q.isEmpty()) {
            int cur = q.poll();

            for (int node : graph[cur]) {
                if (visited[node])
                    continue;

                visited[node] = true;
                sb.append(node).append(" ");
                q.add(node);
            }
        }
    }

    private static void dfs(int v) {
        visited[v] = true;
        sb.append(v).append(" ");

        for (int node : graph[v]) {
            if (visited[node])
                continue;

            dfs(node);
        }
    }

}
