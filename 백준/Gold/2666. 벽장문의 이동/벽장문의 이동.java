import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
	static int m;
	static int[] order;
	static int[][][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());

		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		int open1 = Integer.parseInt(st.nextToken());
		int open2 = Integer.parseInt(st.nextToken());

		m = Integer.parseInt(br.readLine());
		order = new int[m];
		dp = new int[m][n + 1][n + 1];
		for (int i = 0; i < m; i++) {
			order[i] = Integer.parseInt(br.readLine());
			for (int j = 0; j <= n; j++) {
				Arrays.fill(dp[i][j], -1);
			}
		}
		System.out.println(re_dp(0, open1, open2));
	}

	private static int re_dp(int cnt, int o1, int o2) {
		if (cnt == m)
			return 0;

		if (dp[cnt][o1][o2] != -1)
			return dp[cnt][o1][o2];

		return dp[cnt][o1][o2] = Math.min(Math.abs(o1 - order[cnt]) + re_dp(cnt + 1, order[cnt], o2),
				Math.abs(o2 - order[cnt]) + re_dp(cnt + 1, o1, order[cnt]));
	}
}