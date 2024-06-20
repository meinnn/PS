import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    static int N;
    static int[] weights;
    static int[][] dp;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        N = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");
        weights = new int[N+1];
        for (int i = 0; i < N; i++) {
            weights[i] = Integer.parseInt(st.nextToken());
        }

        dp = new int[N+1][15001];
        re_dp(0, 0);

        StringBuilder sb = new StringBuilder();
        int M = Integer.parseInt(br.readLine());
        st = new StringTokenizer(br.readLine(), " ");
        for (int i = 0; i < M; i++) {
            int k = Integer.parseInt(st.nextToken());
            if (k > 15000)
                sb.append("N ");
            else if (dp[N][k] == 1)
                sb.append("Y ");
            else
                sb.append("N ");
        }

        System.out.println(sb);
    }

    private static void re_dp(int idx, int w) {
        if (idx > N)
            return;

        if (dp[idx][w] != 0)
            return;

        dp[idx][w] = 1;
        re_dp(idx + 1, w);
        re_dp(idx + 1, w + weights[idx]);
        re_dp(idx + 1, Math.abs(w - weights[idx]));
    }
}
