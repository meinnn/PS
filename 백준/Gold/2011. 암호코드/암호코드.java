import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {

	static final int MOD = 1000000;
	static String code;
	static int n;
	static int dp[];

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String input = br.readLine();
		n = input.length();

		int[] code = new int[n + 1];
		for (int i = 0; i < n; i++) {
			code[i + 1] = input.charAt(i) - '0';
		}

		dp = new int[n + 1];
		dp[0] = 1;

		for (int i = 1; i <= n; i++) {
			if (code[i] != 0) {
				dp[i] = (dp[i - 1]) % MOD;
			}

			int x = code[i - 1] * 10 + code[i];
			if (10 <= x && x <= 26) {
				dp[i] = (dp[i] + dp[i - 2]) % MOD;
			}
		}

		System.out.println(dp[n] % MOD);

	}
}
