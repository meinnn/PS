
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

    static int N;
    static int[][] dp;
    static boolean[] dayoff;

    static int dfs(int day, int coupon) {
        if (day > N) {
            return 0;
        }
        // 이미 계산한 적 있으면 그대로 return
        if (dp[day][coupon] != Integer.MAX_VALUE) {
            return dp[day][coupon];
        }

        // 가지 못하는 날은 다음날의 최소비용 return
        if (dayoff[day]) {
            return dp[day][coupon] = Math.min(dp[day][coupon], dfs(day + 1, coupon));
        }

        dp[day][coupon] = Math.min(dp[day][coupon], dfs(day + 1, coupon) + 10000); // 하루
        dp[day][coupon] = Math.min(dp[day][coupon], dfs(day + 3, coupon + 1) + 25000); // 3일
        dp[day][coupon] = Math.min(dp[day][coupon], dfs(day + 5, coupon + 2) + 37000); // 5일

        // 쿠폰 사용 1일 무료
        if (coupon >= 3) {
            dp[day][coupon] = Math.min(dp[day][coupon], dfs(day + 1, coupon - 3));
        }

        return dp[day][coupon];
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());

        dayoff = new boolean[N + 1];
        dp = new int[N + 1][40];
        for (int i = 0; i <= N; i++) {
            Arrays.fill(dp[i], Integer.MAX_VALUE);
        }

        if (M > 0) {
            st = new StringTokenizer(br.readLine());
            for (int i = 0; i < M; i++) {
                dayoff[Integer.parseInt(st.nextToken())] = true;
            }
        }

        System.out.println(dfs(1, 0));

    }
}
