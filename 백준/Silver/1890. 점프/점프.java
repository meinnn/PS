import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

	static int N;
	static int[][] board;
	static long[][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		N = Integer.parseInt(br.readLine());

		board = new int[N][N];
		dp = new long[N][N];
		for (int i = 0; i < N; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < N; j++) {
				board[i][j] = Integer.parseInt(st.nextToken());
				dp[i][j] = -1;
			}
		}

		System.out.println(dfs(0, 0));
	}

	private static long dfs(int x, int y) {

		if (x == N - 1 && y == N - 1)
			return 1;

		if (dp[x][y] != -1)
			return dp[x][y];

		dp[x][y] = 0;

		int move = board[x][y];
		if (x + move < N)
			dp[x][y] += dfs(x + move, y);
		if (y + move < N)
			dp[x][y] += dfs(x, y + move);

		return dp[x][y];
	}
}
