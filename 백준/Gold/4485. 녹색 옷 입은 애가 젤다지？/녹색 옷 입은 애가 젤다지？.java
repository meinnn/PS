import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class Main {

	static int N;
	static int[][] cave;

	static class Node implements Comparable<Node> {
		int x, y, rupee;

		public Node(int x, int y, int rupee) {
			super();
			this.x = x;
			this.y = y;
			this.rupee = rupee;
		}

		@Override
		public int compareTo(Node o) {
			return Integer.compare(this.rupee, o.rupee);
		}
	}

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();
		N = Integer.parseInt(br.readLine());
		int cnt = 0;

		while (N != 0) {
			cave = new int[N][N];
			for (int i = 0; i < N; i++) {
				StringTokenizer st = new StringTokenizer(br.readLine(), " ");
				for (int j = 0; j < N; j++) {
					cave[i][j] = Integer.parseInt(st.nextToken());
				}
			}

			sb.append("Problem ").append(++cnt).append(": ").append(dijkstra(0, 0)).append("\n");
			N = Integer.parseInt(br.readLine());
		}

		System.out.println(sb);
	}

	static int[] dx = { -1, 1, 0, 0 };
	static int[] dy = { 0, 0, -1, 1 };

	private static int dijkstra(int x, int y) {
		int[][] cost = new int[N][N];
		for (int i = 0; i < N; i++)
			Arrays.fill(cost[i], Integer.MAX_VALUE);

		PriorityQueue<Node> pq = new PriorityQueue<>();
		pq.add(new Node(x, y, cave[x][y]));
		cost[x][y] = cave[x][y];

		while (!pq.isEmpty()) {
			Node cur = pq.poll();

			if (cost[cur.x][cur.y] < cur.rupee)
				continue;

			for (int i = 0; i < 4; i++) {
				int nx = cur.x + dx[i];
				int ny = cur.y + dy[i];
				if (nx < 0 || nx >= N || ny < 0 || ny >= N)
					continue;

				if (cost[nx][ny] > cur.rupee + cave[nx][ny]) {
					cost[nx][ny] = cur.rupee + cave[nx][ny];
					pq.add(new Node(nx, ny, cost[nx][ny]));
				}
			}
		}

		return cost[N - 1][N - 1];
	}

}
