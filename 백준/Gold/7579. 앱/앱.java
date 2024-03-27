import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		int N = Integer.parseInt(st.nextToken());
		int M = Integer.parseInt(st.nextToken());

		int[] memory = new int[N];
		st = new StringTokenizer(br.readLine(), " ");
		for (int i = 0; i < N; i++) {
			memory[i] = Integer.parseInt(st.nextToken());
		}

		int sum = 0;
		int[] cost = new int[N];
		st = new StringTokenizer(br.readLine(), " ");
		for (int i = 0; i < N; i++) {
			cost[i] = Integer.parseInt(st.nextToken());
			sum += cost[i];
		}

		int[][] dp = new int[N][sum + 1];
		for (int i = 0; i <= sum; i++) {
			if (i >= cost[0])
				dp[0][i] = memory[0];
		}

		for (int i = 1; i < N; i++) {
			for (int j = 0; j <= sum; j++) {
				if (cost[i] > j) {
					dp[i][j] = dp[i - 1][j];
				} else {
					dp[i][j] = Math.max(memory[i] + dp[i - 1][j - cost[i]], dp[i - 1][j]);
				}
			}
		}
		for (int i = 0; i <= sum; i++) {
			if (dp[N - 1][i] >= M) {
				System.out.println(i);
				break;
			}
		}
	}
}
