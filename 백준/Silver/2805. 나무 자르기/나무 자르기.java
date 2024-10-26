import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());

        int[] trees = new int[N];
        int start = 0;
        int end = 0;

        st = new StringTokenizer(br.readLine(), " ");
        for (int i = 0; i < N; i++) {
            trees[i] = Integer.parseInt(st.nextToken());
            end = Math.max(end, trees[i]);
        }

        int answer = 0;
        while (start <= end) {
            int mid = (start + end) / 2;
            long sum = 0;
            for (int i = 0; i < N; i++) {
                if (trees[i] > mid)
                    sum += trees[i] - mid;
            }

            if (sum == M) {
                answer = mid;
                break;
            } else if (sum > M) {
                answer = mid; // 임시저장
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }

        System.out.println(answer);
    }
}