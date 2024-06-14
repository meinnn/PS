import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
    static int N;
    static int[] left, right;
    static long[][] dp;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        N = Integer.parseInt(br.readLine());

        StringTokenizer st = new StringTokenizer(br.readLine());
        left = new int[N];
        for (int i = 0; i < N; i++) {
            left[i] = Integer.parseInt(st.nextToken());
        }

        st = new StringTokenizer(br.readLine());
        right = new int[N];
        for (int i = 0; i < N; i++) {
            right[i] = Integer.parseInt(st.nextToken());
        }

        dp = new long[N][N];
        for (int i = 0; i < N; i++) {
            Arrays.fill(dp[i], -1);
        }

        System.out.println(re_dp(0, 0));
    }

    private static long re_dp(int li, int ri) {
        if (li >= N || ri >= N)
            return 0;

        if (dp[li][ri] != -1)
            return dp[li][ri];

        long ret = 0;
        // 왼쪽 카드만 버리거나 왼쪽 오른쪽 둘 다 버리기
        ret = Math.max(re_dp(li + 1, ri), re_dp(li + 1, ri + 1));
        // 오른쪽만 버리기
        if (right[ri] < left[li])
            ret = Math.max(ret, re_dp(li, ri + 1) + right[ri]);

        return dp[li][ri] = ret;
    }
}
