import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

    static int N;
    static int[][] W;
    static int[][] dp;
    static int INF = 16_000_000; // overflow 방지

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        N = Integer.parseInt(br.readLine());
        W = new int[N][N];

        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");
            for (int j = 0; j < N; j++) {
                W[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        dp = new int[N][1 << N];
        for (int i = 0; i < N; i++)
            Arrays.fill(dp[i], -1);

        System.out.println(dfs(0, 1));
    }

    private static int dfs(int idx, int visited) {
        if (visited == (1 << N) -1) {
            if (W[idx][0] != 0)
                return W[idx][0];

            return INF;
        }

        if (dp[idx][visited] != -1)
            return dp[idx][visited];

        dp[idx][visited] = INF;
        for (int i = 0; i < N; i++) {
            if (W[idx][i] == 0 || (visited & (1 << i)) != 0)
                continue;

            dp[idx][visited] = Math.min(dp[idx][visited], dfs(i, visited | (1 << i)) + W[idx][i]);
        }

        return dp[idx][visited];
    }
}
