
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;


public class Main {
    static class Node {
        int index;
        int cost;

        public Node(int index, int cost) {
            this.index = index;
            this.cost = cost;
        }
    }

    static ArrayList<Node>[] graph;
    static int[] dist;
    static int V;

    public static void dikstra(int start) {
        boolean[] visited = new boolean[V + 1];

        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;

        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingInt(o -> o.cost));
        pq.offer(new Node(start, 0));

        while (!pq.isEmpty()) {
            int cur = pq.poll().index;

            if (visited[cur]) {
                continue;
            }
            visited[cur] = true;

            for (Node next : graph[cur]) {
                if (dist[next.index] > dist[cur] + next.cost) {
                    dist[next.index] = dist[cur] + next.cost;

                    pq.offer(new Node(next.index, dist[next.index]));
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        V = Integer.parseInt(st.nextToken());
        int E = Integer.parseInt(st.nextToken());
        int P = Integer.parseInt(st.nextToken());

        dist = new int[V + 1];
        graph = new ArrayList[V + 1];
        for (int i = 0; i <= V; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int i = 0; i < E; i++) {
            st = new StringTokenizer(br.readLine());
            int v = Integer.parseInt(st.nextToken());
            int w = Integer.parseInt(st.nextToken());
            int cost = Integer.parseInt(st.nextToken());

            graph[v].add(new Node(w, cost));
            graph[w].add(new Node(v, cost));
        }

        dikstra(1);
        int mj = dist[V];
        int temp = dist[P];
        dikstra(P);
        int gw = temp + dist[V];

        if (mj >= gw) {
            System.out.println("SAVE HIM");
        } else {
            System.out.println("GOOD BYE");
        }

    }
}
