import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

	static int N, K;
	static int[][] dp;
	static int[][] things;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		N = Integer.parseInt(st.nextToken());
		K = Integer.parseInt(st.nextToken());

		things = new int[N][2];
		dp = new int[N][K + 1];
		for (int i = 0; i < N; i++) {
			st = new StringTokenizer(br.readLine(), " ");

			things[i][0] = Integer.parseInt(st.nextToken());
			things[i][1] = Integer.parseInt(st.nextToken());
			Arrays.fill(dp[i], -1);
		}

		System.out.println(re_dp(N - 1, K));

	}

	private static int re_dp(int idx, int weight) {
		if (idx < 0)
			return 0;

		if (dp[idx][weight] != -1)
			return dp[idx][weight];

		int w = things[idx][0];
		int v = things[idx][1];

		if (w > weight) {
			dp[idx][weight] = re_dp(idx - 1, weight);
		} else {
			dp[idx][weight] = Math.max(re_dp(idx - 1, weight - w) + v, re_dp(idx - 1, weight));
		}

		return dp[idx][weight];
	}
}
