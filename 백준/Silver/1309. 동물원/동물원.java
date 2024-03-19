import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
	
	static final int MOD = 9901;
	
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());

		int[] dp = new int[N+1];
		dp[0] = 1;
		dp[1] = 3;
		for (int i = 2; i <= N; i++) {
			dp[i] += dp[i-2] % MOD;
			dp[i] += 2 * dp[i-1] % MOD;
		}

		System.out.println(dp[N] % MOD);
	}
}
