import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class Main {

	static class Node implements Comparable<Node> {
		int v, cost;

		public Node(int v, int cost) {
			super();
			this.v = v;
			this.cost = cost;
		}

		@Override
		public int compareTo(Node o) {
			return Integer.compare(this.cost, o.cost);
		}

	}

	static int V;
	static List<Node>[] graph;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		V = Integer.parseInt(st.nextToken());
		int E = Integer.parseInt(st.nextToken());

		int start = Integer.parseInt(br.readLine());

		graph = new ArrayList[V + 1];
		for (int i = 1; i < V + 1; i++)
			graph[i] = new ArrayList<>();

		for (int i = 0; i < E; i++) {
			st = new StringTokenizer(br.readLine(), " ");

			int u = Integer.parseInt(st.nextToken());
			int v = Integer.parseInt(st.nextToken());
			int w = Integer.parseInt(st.nextToken());

			graph[u].add(new Node(v, w));
		}

		dijkstra(start);
	}

	private static void dijkstra(int start) {
		int[] dist = new int[V + 1];
		Arrays.fill(dist, Integer.MAX_VALUE);

		PriorityQueue<Node> pq = new PriorityQueue<>();
		pq.add(new Node(start, 0));
		dist[start] = 0;

		while (!pq.isEmpty()) {
			Node cur = pq.poll();

			if (dist[cur.v] < cur.cost)
				continue;

			for (Node n : graph[cur.v]) {
				if (dist[n.v] > cur.cost + n.cost) {
					dist[n.v] = cur.cost + n.cost;
					pq.add(new Node(n.v, dist[n.v]));
				}
			}
		}

		StringBuilder sb = new StringBuilder();
		for (int i = 1; i < V + 1; i++) {
			sb.append(dist[i] == Integer.MAX_VALUE ? "INF" : dist[i]).append("\n");
		}
		System.out.println(sb);
	}
}
