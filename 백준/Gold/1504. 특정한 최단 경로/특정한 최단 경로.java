import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;


public class Main {

    static class Node implements Comparable<Node> {
        int v;
        int w;

        public Node(int v, int w) {
            this.v = v;
            this.w = w;
        }

        @Override
        public int compareTo(Node o) {
            return this.w - o.w;
        }
    }

    static int N;
    static List<Node>[] graph;
    static final int MAX = 200_000_000;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        int E = Integer.parseInt(st.nextToken());

        graph = new ArrayList[N + 1];
        for (int i = 0; i < N+1; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int i = 0; i < E; i++) {
            st = new StringTokenizer(br.readLine());

            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            int c = Integer.parseInt(st.nextToken());

            graph[a].add(new Node(b, c));
            graph[b].add(new Node(a, c));
        }

        st = new StringTokenizer(br.readLine());
        int v1 = Integer.parseInt(st.nextToken());
        int v2 = Integer.parseInt(st.nextToken());

        int case1 = dijkstra(1, v1) + dijkstra(v1, v2) + dijkstra(v2, N);
        int case2 = dijkstra(1, v2) + dijkstra(v2, v1) + dijkstra(v1, N);

        System.out.println((case1 >= MAX && case2 >= MAX) ? -1 : Math.min(case1, case2));
    }

    private static int dijkstra(int start, int end) {
        int[] dist = new int[N + 1];
        Arrays.fill(dist, MAX);

        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.add(new Node(start, 0));
        dist[start] = 0;

        while (!pq.isEmpty()) {
            Node cur = pq.poll();

            if (cur.v == end)
                break;

            if (dist[cur.v] < cur.w) {
                continue;
            }

            for (Node adj : graph[cur.v]) {
                if (dist[adj.v] > dist[cur.v] + adj.w) {
                    dist[adj.v] = dist[cur.v] + adj.w;
                    pq.add(new Node(adj.v, dist[adj.v]));
                }
            }
        }

        return dist[end];
    }
}
