import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class Main {

    static class Bus implements Comparable<Bus> {
        int to, cost;

        public Bus(int to, int cost) {
            this.to = to;
            this.cost = cost;
        }

        public int compareTo(Bus o) {
            return this.cost - o.cost;
        }
    }

    static int n;
    static ArrayList<Bus>[] city;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        n = Integer.parseInt(br.readLine());
        int m = Integer.parseInt(br.readLine());

        city = new ArrayList[n + 1];
        for (int i = 1; i <= n; i++) {
            city[i] = new ArrayList<>();
        }

        StringTokenizer st = null;
        for (int i = 0; i < m; i++) {
            st = new StringTokenizer(br.readLine(), " ");
            int from = Integer.parseInt(st.nextToken());
            int to = Integer.parseInt(st.nextToken());
            int cost = Integer.parseInt(st.nextToken());

            city[from].add(new Bus(to, cost));
        }

        st = new StringTokenizer(br.readLine(), " ");
        int start = Integer.parseInt(st.nextToken());
        int end = Integer.parseInt(st.nextToken());

        System.out.println(dijkstra(start, end));
    }

    static String dijkstra(int start, int end) {
        int[] dist = new int[n + 1];
        Arrays.fill(dist, 100_000_000);
        dist[start] = 0;
        PriorityQueue<Bus> pq = new PriorityQueue<>();
        pq.add(new Bus(start, 0));

        int[] prev = new int[n + 1]; // 최단 경로로 왔을 때 직전 도시

        while (!pq.isEmpty()) {
            Bus cur = pq.poll();
            if (cur.to == end) break;

            if (cur.cost > dist[cur.to]) continue;

            for (Bus bus : city[cur.to]) {
                if (dist[bus.to] > dist[cur.to] + bus.cost) {
                    dist[bus.to] = dist[cur.to] + bus.cost;
                    pq.add(new Bus(bus.to, dist[bus.to]));
                    prev[bus.to] = cur.to;
                }
            }
        }

        ArrayList<Integer> path = new ArrayList<>();
        int last = end;
        while (last != start) {
            path.add(last);
            last = prev[last];
        }
        path.add(start);

        StringBuilder sb = new StringBuilder();
        sb.append(dist[end]).append("\n").append(path.size()).append("\n");
        for (int i = path.size() -1; i >= 0; i--) {
            sb.append(path.get(i)).append(" ");
        }

        return sb.toString();
    }
}