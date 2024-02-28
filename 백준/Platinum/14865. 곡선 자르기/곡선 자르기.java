import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());

        int startIdx = 0;
        int[] bottomLeft = {Integer.MAX_VALUE, Integer.MAX_VALUE};
        int[][] input = new int[N][2];
        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");
            int x = Integer.parseInt(st.nextToken());
            int y = Integer.parseInt(st.nextToken());

            input[i] = new int[]{x, y};
            if (x < bottomLeft[0] && y < 0) {
                bottomLeft[0] = x;
                bottomLeft[1] = y;
                startIdx = i;
            }
        }

        Queue<Integer> pair = new ArrayDeque<>();
        List<int[]> mountain = new ArrayList<>();
        int[] prev = bottomLeft;

        for (int i = 0; i < N; i++) {
            int[] cur = input[(startIdx + i) % N];

            if (prev[1] < 0 && cur[1] > 0) {
                prev[0] = cur[0];
                prev[1] = cur[1];
            } else if (prev[1] > 0 && cur[1] < 0) {
                int start = Math.min(prev[0], cur[0]);
                int end = Math.max(prev[0], cur[0]);

                mountain.add(new int[]{start, 0}); // 0 ==start
                mountain.add(new int[]{end, 1}); // 1== end

                prev[0] = cur[0];
                prev[1] = cur[1];
            }
        }

        mountain.sort((o1, o2) -> o1[0] - o2[0]);

        int notIncluded = 0;
        int notInclude = 0;

        Stack<Integer> stack = new Stack<>();
        int cnt = 0;
        for (int[] mt : mountain) {
            if (mt[1] == 0) { // 봉우리 시작
                stack.push(cnt); // mountain index, start/end
            } else {
                int pop = stack.pop();
                if (pop == cnt)
                    notInclude++;

                if (stack.isEmpty())
                    notIncluded++;

                cnt++;
            }
        }

        System.out.println(notIncluded + " " + notInclude);
    }
}
