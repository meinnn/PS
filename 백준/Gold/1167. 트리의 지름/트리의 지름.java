
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

    static int V;
    static ArrayList<Edge>[] tree;
    static boolean[] visited;

    static int max = 0;
    static int node = 1;

    static class Edge {
        int v;
        int w;

        public Edge(int v, int w) {
            this.v = v;
            this.w = w;
        }
    }

    static void dfs(int x, int cost) {
        visited[x] = true;
        if (cost > max) {
            max = cost;
            node = x;
        }

        for (Edge e : tree[x]) {
            if (!visited[e.v]) {
                dfs(e.v, cost + e.w);
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        V = Integer.parseInt(br.readLine());
        visited = new boolean[V + 1];
        tree = new ArrayList[V+1];
        for (int i = 1; i < V+1; i++) {
            tree[i] = new ArrayList<>();
        }

        for (int i = 0; i < V; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int node = Integer.parseInt(st.nextToken());
            int v = Integer.parseInt(st.nextToken());
            while (v != -1) {
                int w = Integer.parseInt(st.nextToken());
                tree[node].add(new Edge(v, w));
                v = Integer.parseInt(st.nextToken());
            }
        }

        dfs(1, 0);

        Arrays.fill(visited, false);
        dfs(node, 0);

        System.out.println(max);
    }
}
