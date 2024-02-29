import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

	static int N;
	static int[][] W;
	static boolean[] visited;
	static int minCost = Integer.MAX_VALUE;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		N = Integer.parseInt(br.readLine());
		W = new int[N][N];

		for (int i = 0; i < N; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < N; j++) {
				W[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		visited = new boolean[N];
		for (int i = 0; i < N; i++) {
			visited[i] = true;
			travel(1, i, i, 0);
			Arrays.fill(visited, false);
		}

		System.out.println(minCost);
	}

	private static void travel(int cnt, int start, int idx, int cost) {
		if (cnt == N) {
			if (W[idx][start] != 0)
				minCost = Math.min(minCost, cost + W[idx][start]);
			return;
		}

		for (int i = 0; i < N; i++) {
			if (visited[i] || W[idx][i] == 0)
				continue;

			visited[i] = true;
			travel(cnt + 1, start, i, cost + W[idx][i]);
			visited[i] = false;
		}
	}
}
