import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        int[] dp = new int[N + 1];
        int res = 0;

        for (int i = 1; i <= N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");
            int time = Integer.parseInt(st.nextToken());
            int indgree = Integer.parseInt(st.nextToken());

            dp[i] = time;
            for (int j = 0; j < indgree; j++) {
                int idx = Integer.parseInt(st.nextToken());
                dp[i] = Math.max(dp[i], dp[idx] + time);
            }
            res = Math.max(res, dp[i]);
        }

        System.out.println(res);
    }
}