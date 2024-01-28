
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Main {

    static class Edge {
        int vertex;
        int weight;

        public Edge(int vertex, int weight) {
            this.vertex = vertex;
            this.weight = weight;
        }
    }

    static List<Edge>[] graph;
    static List<Edge>[] reversedGraph;
    static int N, X;

    static int[] dijkstra(List<Edge>[] graph) {
        int[] dist = new int[N + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);

        Queue<Edge> pq = new PriorityQueue<>(Comparator.comparingInt(o -> o.weight));
        pq.add(new Edge(X, 0));
        dist[X] = 0;

        while (!pq.isEmpty()) {
            Edge cur = pq.poll();

            if (dist[cur.vertex] < cur.weight)
                continue;

            for (Edge next : graph[cur.vertex]) {
                if (dist[next.vertex] > dist[cur.vertex] + next.weight) {
                    dist[next.vertex] = dist[cur.vertex] + next.weight;
                    pq.add(next);
                }
            }
        }

        return dist;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        X = Integer.parseInt(st.nextToken());

        graph = new ArrayList[N + 1];
        reversedGraph = new ArrayList[N + 1];
        for (int i = 1; i < N + 1; i++) {
            graph[i] = new ArrayList<>();
            reversedGraph[i] = new ArrayList<>();
        }

        for (int i = 0; i < M; i++) {
            st = new StringTokenizer(br.readLine());
            int u = Integer.parseInt(st.nextToken());
            int v = Integer.parseInt(st.nextToken());
            int w = Integer.parseInt(st.nextToken());

            graph[u].add(new Edge(v, w));
            reversedGraph[v].add(new Edge(u, w));
        }

        int[] dist1 = dijkstra(graph);
        int[] dist2 = dijkstra(reversedGraph);

        int answer = 0;
        for (int i = 1; i <= N; i++) {
            answer = Math.max(answer, dist1[i] + dist2[i]);
        }

        System.out.println(answer);
    }
}
