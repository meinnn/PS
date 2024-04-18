import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
	static final int MOD = 987654321;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());
		long[] dp = new long[N + 1];

		dp[0] = 1;
		dp[2] = 1;
		for (int i = 4; i <= N; i += 2) {
			for (int j = 0; j <= i - 2; j += 2) {
				dp[i] += dp[j] * dp[i - j - 2];
				dp[i] %= MOD;
			}
		}

		System.out.println(dp[N]);
	}
}
