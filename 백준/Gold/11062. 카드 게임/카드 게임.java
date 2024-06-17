import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.StringTokenizer;

public class Main {
    static int[] cards;
    static int[][] dp;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        int T = Integer.parseInt(br.readLine());
        while (T-- > 0) {
            int N = Integer.parseInt(br.readLine());
            StringTokenizer st = new StringTokenizer(br.readLine());
            cards = new int[N];
            for (int i = 0; i < N; i++) {
                cards[i] = Integer.parseInt(st.nextToken());
            }

            dp = new int[N][N];
            sb.append(re_dp(0, N - 1, 0)).append("\n");
        }
        System.out.println(sb);
    }

    private static int re_dp(int left, int right, int take) {
        if (left > right)
            return 0;

        if (dp[left][right] != 0)
            return dp[left][right];

        if (take == 0) {
            return dp[left][right] = Math.max(re_dp(left + 1, right, 1 - take) + cards[left],
                    re_dp(left, right - 1, 1 - take) + cards[right]);
        } else {
            return dp[left][right] = Math.min(re_dp(left + 1, right, 1 - take),
                    re_dp(left, right - 1, 1 - take));
        }
    }

}
