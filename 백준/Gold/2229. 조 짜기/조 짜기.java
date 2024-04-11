import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

	static int N;
	static int[] score;
	static int[][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		N = Integer.parseInt(br.readLine());
		score = new int[N];
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		for (int i = 0; i < N; i++) {
			score[i] = Integer.parseInt(st.nextToken());
		}

		dp = new int[N][N];
		for (int i = 0; i < N; i++)
			Arrays.fill(dp[i], -1);

		System.out.println(re_dp(0, 0, Integer.MIN_VALUE, Integer.MAX_VALUE));
	}

	private static int re_dp(int start, int end, int max, int min) {
		if (end == N)
			return 0;

		if (dp[start][end] != -1)
			return dp[start][end];

		max = Math.max(max, score[end]);
		min = Math.min(min, score[end]);

		// 조 개수 그대로
		int ret = re_dp(start, end + 1, max, min);
		// 조 개수 늘리기
		ret = Math.max(ret, re_dp(end + 1, end + 1, Integer.MIN_VALUE, Integer.MAX_VALUE) + max - min);
		return dp[start][end] = ret;
	}
}
