import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());

		int[][][] dp = new int[2][N][3];
		for (int i = 0; i < N; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < 3; j++) {
				int x = Integer.parseInt(st.nextToken());
				dp[0][i][j] = x; // max
				dp[1][i][j] = x; // min
			}
		}

		for (int i = 1; i < N; i++) {
			// max
			dp[0][i][0] += Math.max(dp[0][i - 1][0], dp[0][i - 1][1]);
			dp[0][i][1] += Math.max(Math.max(dp[0][i - 1][0], dp[0][i - 1][1]), dp[0][i - 1][2]);
			dp[0][i][2] += Math.max(dp[0][i - 1][1], dp[0][i - 1][2]);

			// min
			dp[1][i][0] += Math.min(dp[1][i - 1][0], dp[1][i - 1][1]);
			dp[1][i][1] += Math.min(Math.min(dp[1][i - 1][0], dp[1][i - 1][1]), dp[1][i - 1][2]);
			dp[1][i][2] += Math.min(dp[1][i - 1][1], dp[1][i - 1][2]);

		}

		int max = Math.max(Math.max(dp[0][N - 1][0], dp[0][N - 1][1]), dp[0][N - 1][2]);
		int min = Math.min(Math.min(dp[1][N - 1][0], dp[1][N - 1][1]), dp[1][N - 1][2]);

		System.out.println(max + " " + min);
	}
}
