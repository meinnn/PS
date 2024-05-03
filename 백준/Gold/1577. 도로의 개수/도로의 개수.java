import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

	static int N, M;
	static boolean[][][] map;
	static long[][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		map = new boolean[N + 1][M + 1][2];
		int K = Integer.parseInt(br.readLine());

		for (int i = 0; i < K; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int x1 = Integer.parseInt(st.nextToken());
			int y1 = Integer.parseInt(st.nextToken());
			int x2 = Integer.parseInt(st.nextToken());
			int y2 = Integer.parseInt(st.nextToken());

			if (x1 == x2) { // ->
				map[x1][Math.min(y1, y2)][0] = true;
			} else { // 아래
				map[Math.min(x1, x2)][y1][1] = true;
			}
		}

		dp = new long[N + 1][M + 1];
		for (int i = 0; i <= N; i++)
			Arrays.fill(dp[i], -1);

		System.out.println(re_dp(0, 0));
	}

	private static long re_dp(int x, int y) {
		if (x == N && y == M)
			return 1;

		if (dp[x][y] != -1)
			return dp[x][y];

		long ret = 0;
		if (y + 1 <= M && !map[x][y][0])
			ret += re_dp(x, y + 1);
		if (x + 1 <= N && !map[x][y][1])
			ret += re_dp(x + 1, y);

		return dp[x][y] = ret;
	}
}
