import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

    static int n = 0;
    static int[] input = new int[100_000];
    static int[][][] dp;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        for (int i = 0; i < 100_000; i++) {
            int com = Integer.parseInt(st.nextToken());

            if (com == 0)
                break;

            input[i] = com;
            n++;
        }

        dp = new int[5][5][n];
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                Arrays.fill(dp[i][j], -1);
            }
        }

        System.out.println(ddr(0, 0, 0));

    }

    private static int ddr(int cnt, int l, int r) {
        if (cnt == n) {
            return 0;
        }

        if (dp[l][r][cnt] != -1)
            return dp[l][r][cnt];

        int left = ddr(cnt + 1, input[cnt], r) + power(l, input[cnt]);
        int right = ddr(cnt + 1, l, input[cnt]) + power(r, input[cnt]);
        return dp[l][r][cnt] = Math.min(left, right);
    }

    private static int power(int prev, int next) {
        if (prev == 0)
            return 2;

        if (prev == 1 || prev == 3)
            if (next == 2 || next == 4)
                return 3;
        if (prev == 2 || prev == 4)
            if (next == 1 || next == 3)
                return 3;

        if (Math.abs(prev - next) == 2)
            return 4;

        if (prev == next)
            return 1;

        return 0;
    }
}
