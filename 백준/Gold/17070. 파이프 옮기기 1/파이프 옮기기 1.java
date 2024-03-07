import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int N = Integer.parseInt(br.readLine());

		int[][] house = new int[N][N];
		for (int i = 0; i < N; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < N; j++) {
				house[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		int[][][] dp = new int[N][N][3]; // 가로, 세로, 대각선 파이프 끝이 오는 경우

		dp[0][1][0] = 1;
		for (int i = 2; i < N; i++) {
			if (house[0][i] != 1) {
				dp[0][i][0] = dp[0][i - 1][0];
			}
		}

		for (int i = 1; i < N; i++) {
			for (int j = 1; j < N; j++) {
				if (house[i][j] != 1 && house[i - 1][j] != 1 && house[i][j - 1] != 1) {
					// 가로, 세로, 대각선 -> 대각선
					dp[i][j][2] = dp[i - 1][j - 1][0] + dp[i - 1][j - 1][1] + dp[i - 1][j - 1][2];
				}

				if (house[i][j] != 1) {
					// 가로 , 대각선 -> 가로
					dp[i][j][0] = dp[i][j - 1][0] + dp[i][j - 1][2];

					// 세로, 대각선 -> 세로
					dp[i][j][1] = dp[i - 1][j][1] + dp[i - 1][j][2];
				}
			}
		}

		int answer = 0;
		for (int i = 0; i < 3; i++) {
			answer += dp[N - 1][N - 1][i];
		}

		System.out.println(answer);
	}
}
