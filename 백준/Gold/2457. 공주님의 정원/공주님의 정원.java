import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        int[][] flowers = new int[N][2];

        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");

            int m1 = Integer.parseInt(st.nextToken());
            int d1 = Integer.parseInt(st.nextToken());
            flowers[i][0] = m1 * 100 + d1;

            int m2 = Integer.parseInt(st.nextToken());
            int d2 = Integer.parseInt(st.nextToken());
            flowers[i][1] = m2 * 100 + d2;
        }

        Arrays.sort(flowers, (a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);

        int cur = 301;
        int cnt = 0;
        int tmp = 301;
        for (int i = 0; i < N; i++) {
            if (flowers[i][0] <= cur) {
                tmp = Math.max(tmp, flowers[i][1]);
                if (tmp > 1130)
                    break;
                continue;
            }

            cur = tmp;
            cnt++;

            if (flowers[i][0] > cur)
                break;

            tmp = flowers[i][1];
            if (tmp > 1130) {
                break;
            }
        }

        if (tmp <= 1130)
            cnt = 0;
        else
            cnt++;

        System.out.println(cnt);
    }
}