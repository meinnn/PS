import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

public class Main {

	static int N;
	static List<Integer>[] nums = new ArrayList[2];
	static int len1, len2;
	static int[][][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		N = Integer.parseInt(br.readLine());

		for (int i = 0; i < 2; i++) {
			nums[i] = new ArrayList<>();
			StringTokenizer st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < N; j++) {
				int x = Integer.parseInt(st.nextToken());
				if (x != 0)
					nums[i].add(x);
			}
		}

		len1 = nums[0].size();
		len2 = nums[1].size();
		dp = new int[N][len1][len2];
		for (int i = 0; i < N; i++)
			for (int j = 0; j < len1; j++)
				Arrays.fill(dp[i][j], -40001);

		System.out.println(re_dp(0, 0, 0));
	}

	private static int re_dp(int idx, int u, int d) {
		if (u == len1 || d == len2)
			return 0;
		if (idx >= N)
			return -400000;

		if (dp[idx][u][d] != -40001)
			return dp[idx][u][d];

		int ret = dp[idx][u][d];
		// 위 숫자 아래 숫자
		if (idx >= u && idx >= d) {
			ret = Math.max(ret, re_dp(idx + 1, u + 1, d + 1) + nums[0].get(u) * nums[1].get(d));
		}
		// 위 숫자 아래 빈칸
		if (idx >= u && N - idx > len2 - d) {
			ret = Math.max(ret, re_dp(idx + 1, u + 1, d));
		}
		// 위 빈칸 아래 숫자
		if (N - idx > len1 - u && idx >= d) {
			ret = Math.max(ret, re_dp(idx + 1, u, d + 1));
		}
		// 위 빈칸 아래 빈칸
		if (N - idx > len1 - u && N - idx > len2 - d) {
			ret = Math.max(ret, re_dp(idx + 1, u, d));
		}
		return dp[idx][u][d] = ret;
	}

}
