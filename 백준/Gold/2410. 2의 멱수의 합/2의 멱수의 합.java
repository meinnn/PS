import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {

	static final int MOD = 1_000_000_000;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());
		int[] dp = new int[N + 1];
		dp[0] = 1;
		for (int i = 1; i <= N; i++) {
			if (i % 2 != 0) {
				dp[i] = dp[i - 1];
			} else {
				dp[i] = (dp[i - 1] + dp[i / 2]) % MOD;
			}
		}
		System.out.println(dp[N]);
	}
}
