import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");
        int N = Integer.parseInt(st.nextToken());
        int S = Integer.parseInt(st.nextToken());

        st = new StringTokenizer(br.readLine(), " ");
        int[] arr = new int[N + 1];
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }

        int start = 0, end = 0;
        int sum = arr[0];
        int len = Integer.MAX_VALUE;

        while (start <= end && end < N) {
            if (sum < S) {
                sum += arr[++end];
            } else {
                len = Math.min(len, end - start + 1);
                sum -= arr[start++];
            }
        }

        System.out.println(len == Integer.MAX_VALUE ? 0 : len);
    }
}