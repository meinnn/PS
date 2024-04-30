import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

	static final int MOD = 1_000_007;
	static int N, M, C;
	static int[][] map;
	static int[][][][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		C = Integer.parseInt(st.nextToken());

		map = new int[N + 1][M + 1];
		for (int i = 1; i <= C; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int r = Integer.parseInt(st.nextToken());
			int c = Integer.parseInt(st.nextToken());
			map[r][c] = i;
		}

		dp = new int[N + 1][M + 1][C + 1][C + 1];
		for (int i = 0; i <= N; i++)
			for (int j = 0; j <= M; j++)
				for (int k = 0; k <= C; k++)
					Arrays.fill(dp[i][j][k], -1);

		StringBuilder sb = new StringBuilder();
		for (int i = 0; i <= C; i++) {
			sb.append(re_dp(1, 1, 0, i)).append(" ");
		}
		System.out.println(sb.toString());
	}

	private static int re_dp(int x, int y, int last, int left) {
		if (x > N || y > M || left < 0)
			return 0;
		if (x == N && y == M) {
			if ((left == 0 && map[x][y] == 0) || (left == 1 && map[x][y] > last))
				return 1;
			return 0;
		}

		if (dp[x][y][last][left] != -1)
			return dp[x][y][last][left];

		int ret = 0;
		if (map[x][y] == 0) { // 오락실 아님
			ret = (re_dp(x + 1, y, last, left) + re_dp(x, y + 1, last, left)) % MOD;
		} else { // 오락실
			if (map[x][y] > last) {
				ret = (re_dp(x + 1, y, map[x][y], left - 1) + re_dp(x, y + 1, map[x][y], left - 1)) % MOD;
			}
		}
		return dp[x][y][last][left] = ret % MOD;
	}
}
