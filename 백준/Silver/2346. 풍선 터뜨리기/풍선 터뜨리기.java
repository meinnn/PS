import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine().trim());

        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] val = new int[N];
        for (int i = 0; i < N; i++) {
            val[i] = Integer.parseInt(st.nextToken());
        }

        // 원형 연결 리스트
        int[] next = new int[N];
        int[] prev = new int[N];
        for (int i = 0; i < N; i++) {
            next[i] = (i + 1) % N;
            prev[i] = (i - 1 + N) % N;
        }

        StringBuilder sb = new StringBuilder();

        int cur = 0;
        int alive = N;

        for (int k = 0; k < N; k++) {
            sb.append(cur + 1);
            if (k != N - 1) sb.append(' ');

            int move = val[cur];
            if (--alive == 0) break;

            // cur 제거
            int left = prev[cur];
            int right = next[cur];
            next[left] = right;
            prev[right] = left;

            // 이동
            if (move > 0) {
                cur = right;
                for (int s = 1; s < move; s++) cur = next[cur];
            } else {
                cur = left;
                for (int s = 1; s < -move; s++) cur = prev[cur];
            }
        }

        System.out.print(sb.toString());
    }
}
