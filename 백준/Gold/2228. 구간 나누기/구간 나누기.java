import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

	static final int INIT = -32768 * 100;
	static int N, M;
	static int[] arr;
	static int[][][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());

		arr = new int[N];
		for (int i = 0; i < N; i++) {
			arr[i] = Integer.parseInt(br.readLine());
		}

		dp = new int[N][M + 1][2];
		for (int i = 0; i < N; i++) {
			for (int j = 0; j <= M; j++)
				Arrays.fill(dp[i][j], INIT);
		}

		System.out.println(re_dp(0, 0, 0));
	}

	private static int re_dp(int idx, int cnt, int linked) {
		if (idx == N) {
			if (cnt == M)
				return 0;
			else
				return INIT - 1;
		}

		if (dp[idx][cnt][linked] != INIT)
			return dp[idx][cnt][linked];

		// 안 포함
		dp[idx][cnt][linked] = re_dp(idx + 1, cnt, 0);

		// 포함
		if (linked == 1) // 이전 거 포함
			dp[idx][cnt][linked] = Math.max(dp[idx][cnt][linked], re_dp(idx + 1, cnt, 1) + arr[idx]);
		else if(cnt < M) // 이전 거 안 포함
			dp[idx][cnt][linked] = Math.max(dp[idx][cnt][linked], re_dp(idx + 1, cnt + 1, 1) + arr[idx]);			

		return dp[idx][cnt][linked];
	}
}