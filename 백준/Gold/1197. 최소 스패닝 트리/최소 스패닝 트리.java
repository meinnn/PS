import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class Main {

    static class Node implements Comparable<Node> {
        int idx, weight;

        public Node(int idx, int weight) {
            this.idx = idx;
            this.weight = weight;
        }

        @Override
        public int compareTo(Node o) {
            return Integer.compare(this.weight, o.weight);
        }
    }

    static int V, E;
    static List<Node>[] graph;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        V = Integer.parseInt(st.nextToken());
        E = Integer.parseInt(st.nextToken());

        graph = new ArrayList[V + 1];
        for (int i = 1; i < V + 1; i++)
            graph[i] = new ArrayList<>();

        for (int i = 0; i < E; i++) {
            st = new StringTokenizer(br.readLine());
            int A = Integer.parseInt(st.nextToken());
            int B = Integer.parseInt(st.nextToken());
            int C = Integer.parseInt(st.nextToken());

            graph[A].add(new Node(B, C));
            graph[B].add(new Node(A, C));
        }

        prim();
    }

    private static void prim() {
        boolean[] visited = new boolean[V + 1];
        int[] dist = new int[V + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);

        PriorityQueue<Node> pq = new PriorityQueue<>();
        dist[0] = 0;
        pq.add(new Node(1, 0));

        int cost = 0, cnt = 0;
        while (!pq.isEmpty()) {
            Node cur = pq.poll();

            if (visited[cur.idx])
                continue;

            cost += cur.weight;
            visited[cur.idx] = true;
            if (++cnt == V)
                break;

            for (Node node : graph[cur.idx]) {
                if (!visited[node.idx] && dist[node.idx] > node.weight) {
                    dist[node.idx] = node.weight;
                    pq.add(new Node(node.idx, dist[node.idx]));
                }
            }
        }

        System.out.println(cost);
    }
}
