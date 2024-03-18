import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());

		int[] box = new int[n];
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		for (int i = 0; i < n; i++) {
			box[i] = Integer.parseInt(st.nextToken());
		}

		int[] dp = new int[n];
		Arrays.fill(dp, 1);
		int max = 1;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < i; j++) {
				if (box[j] < box[i]) {
					dp[i] = Math.max(dp[j] + 1, dp[i]);
				}
			}
			max = Math.max(max, dp[i]);
		}

		System.out.println(max);

	}
}
