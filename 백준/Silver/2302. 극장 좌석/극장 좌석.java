import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());
		int M = Integer.parseInt(br.readLine());

		boolean[] fixed = new boolean[N + 1];
		for (int i = 0; i < M; i++) {
			int x = Integer.parseInt(br.readLine());
			fixed[x] = true;
			if (x + 1 <= N)
				fixed[x + 1] = true;
		}

		int[] dp = new int[N + 1];
		dp[0] = 1;
		dp[1] = 1;
		for (int i = 2; i <= N; i++) {
			if (fixed[i]) {
				dp[i] = dp[i - 1];
			} else {
				dp[i] = dp[i - 1] + dp[i - 2];
			}
		}

		System.out.println(dp[N]);

	}
}
