import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    static int[] solution;
    static int min = Integer.MAX_VALUE;
    static int[] answer = new int[2];

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        solution = new int[N];

        StringTokenizer st = new StringTokenizer(br.readLine(), " ");
        for (int i = 0; i < N; i++) {
            solution[i] = Integer.parseInt(st.nextToken());
        }

        for (int i = 0; i < N - 1; i++) {
            binarySearch(i + 1, N - 1, solution[i]);
        }

        System.out.println(answer[0] + " " + answer[1]);
    }

    private static void binarySearch(int start, int end, int value) {
        while (start <= end) {
            int mid = (start + end) / 2;
            int sum = solution[mid] + value;

            if (Math.abs(sum) < min) {
                min = Math.abs(sum);
                answer[0] = value;
                answer[1] = solution[mid];
            }

            if (sum < 0) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }
}