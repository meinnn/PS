import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Stack;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());

        Stack<int[]> stack = new Stack<>();
        int score = 0;
        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");

            int task = Integer.parseInt(st.nextToken());
            if (task == 1) {
                int A = Integer.parseInt(st.nextToken());
                int T = Integer.parseInt(st.nextToken());

                if (T == 1) {
                    score += A;
                } else {
                    stack.push(new int[] { A, T - 1 });
                }

            } else {
                if (stack.isEmpty())
                    continue;

                int[] pop = stack.pop();
                if (pop[1] == 1) {
                    score += pop[0];
                } else {
                    stack.push(new int[] { pop[0], --pop[1] });
                }
            }
        }

        System.out.println(score);
    }
}
