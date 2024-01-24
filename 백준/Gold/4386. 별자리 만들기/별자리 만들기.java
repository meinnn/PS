import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

	static class Node implements Comparable<Node> {
		int index;
		double cost;

		public Node(int index, double dist) {
			this.index = index;
			this.cost = dist;
		}

		@Override
		public int compareTo(Node o) {
			return (int) (this.cost - o.cost);
		}

	}

	static List<Node>[] graph;
	static int n;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		n = Integer.parseInt(br.readLine());

		graph = new ArrayList[n];
		for (int i = 0; i < n; i++) {
			graph[i] = new ArrayList<>();
		}

		double[][] stars = new double[n][2];

		for (int i = 0; i < n; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine());
			double x = Double.parseDouble(st.nextToken());
			double y = Double.parseDouble(st.nextToken());
			stars[i][0] = x;
			stars[i][1] = y;
		}

		for (int i = 0; i < n; i++) {
			for (int j = i + 1; j < n; j++) {
				double dist = Math
						.sqrt(Math.pow(stars[i][0] - stars[j][0], 2) + Math.pow(stars[i][1] - stars[j][1], 2));
				graph[i].add(new Node(j, dist));
				graph[j].add(new Node(i, dist));
			}
		}

		System.out.println(prim(0));
	}

	static double prim(int start) {
		double total = 0.0;
		boolean[] visited = new boolean[n];

		Queue<Node> pq = new PriorityQueue<>();
		pq.offer(new Node(start, 0));

		while (!pq.isEmpty()) {
			Node node = pq.poll();
			int v = node.index;
			double w = node.cost;

			if (visited[v])
				continue;
			visited[v] = true;
			total += w;

			for (Node next : graph[v]) {
				if (!visited[next.index]) {
					pq.offer(next);
				}
			}
		}

		return total;
	}
}
