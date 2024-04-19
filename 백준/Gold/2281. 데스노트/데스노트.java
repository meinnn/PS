import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
	static int n, m;
	static int[] name;
	static int[][] dp;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		n = Integer.parseInt(st.nextToken());
		m = Integer.parseInt(st.nextToken());

		name = new int[n];
		for (int i = 0; i < n; i++) {
			name[i] = Integer.parseInt(br.readLine());
		}

		dp = new int[n][m + 1];
		for (int i = 0; i < n; i++)
			Arrays.fill(dp[i], -1);

		System.out.println(re_dp(0, m));
	}

	private static int re_dp(int idx, int left) {
		if (idx == n)
			return 0;

		if (dp[idx][left] != -1)
			return dp[idx][left];

		// 다음 줄에 쓰기
		int tmp = re_dp(idx + 1, m - name[idx]) + left * left;
		// 같은 줄에 쓰기
		if (left == m && name[idx] <= left) // 맨 처음. 앞에 공백 x
			tmp = Math.min(tmp, re_dp(idx + 1, left - name[idx]));
		else if (name[idx] + 1 <= left) // 앞에 공백 O
			tmp = Math.min(tmp, re_dp(idx + 1, left - name[idx] - 1));

		return dp[idx][left] = tmp;
	}
}
