import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
	static final int MOD = 1_000_000_000;
	static int N;
	static int[][][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		N = Integer.parseInt(br.readLine());

		dp = new int[N + 1][10][1 << 10];

		long res = 0;
		for (int i = 1; i <= 9; i++) {
			res += re_dp(1, i, 1 << i);
		}
		System.out.println(res % MOD);
	}

	private static int re_dp(int n, int k, int visited) {
		if (n == N) {
			if (visited == (1 << 10) - 1)
				return 1;
			return 0;
		}
		if (dp[n][k][visited] != 0)
			return dp[n][k][visited];

		int tmp = 0;
		if (k < 9) {
			tmp += re_dp(n + 1, k + 1, visited | (1 << (k + 1)));
			tmp %= MOD;
		}
		if (k > 0) {
			tmp += re_dp(n + 1, k - 1, visited | (1 << (k - 1)));
			tmp %= MOD;
		}

		return dp[n][k][visited] = tmp;
	}
}