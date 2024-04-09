import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

public class Main {
	static class Way {
		int to, score;

		public Way(int to, int score) {
			super();
			this.to = to;
			this.score = score;
		}

	}

	static int N, M;
	static List<Way>[] city;
	static int[][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		int K = Integer.parseInt(st.nextToken());

		city = new ArrayList[N + 1];
		for (int i = 1; i <= N; i++) {
			city[i] = new ArrayList<>();
		}

		for (int i = 0; i < K; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int a = Integer.parseInt(st.nextToken());
			int b = Integer.parseInt(st.nextToken());
			int c = Integer.parseInt(st.nextToken());
			if (a < b) {
				city[a].add(new Way(b, c));
			}
		}

		dp = new int[N + 1][M + 1];
		for (int i = 0; i <= N; i++)
			Arrays.fill(dp[i], -1);
		System.out.println(re_dp(1, 1));
	}

	private static int re_dp(int idx, int cnt) {
		if (idx == N)
			return 0;
		if (cnt >= M)
			return Integer.MIN_VALUE;

		if (dp[idx][cnt] != -1)
			return dp[idx][cnt];

		int max = Integer.MIN_VALUE;
		for (Way next : city[idx]) {
			max = Math.max(max, re_dp(next.to, cnt + 1) + next.score);
		}
		return dp[idx][cnt] = max;
	}
}
