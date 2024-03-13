import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

	static int N, K;
	static int[][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		N = Integer.parseInt(st.nextToken());
		K = Integer.parseInt(st.nextToken());

		dp = new int[N + 1][K + 1];

		System.out.println(re_dp(N, K));

	}

	private static int re_dp(int target, int cnt) {

		if (cnt == 0) {
			if (target == 0)
				return 1;
			else
				return 0;
		}

		if (dp[target][cnt] != 0)
			return dp[target][cnt];

		int ret = 0;
		for (int i = 0; i <= target; i++) {
			ret += re_dp(target - i, cnt - 1);
			ret %= 1_000_000_000;
		}

		return dp[target][cnt] = ret;
	}
}
