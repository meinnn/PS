
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;


public class Main {

    public static int N, M;
    public static Computer[] coms;
    public static boolean[] visited;
    public static int[] answer;


    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        coms = new Computer[N + 1];
        answer = new int[N + 1];

        for (int i = 0; i < N + 1; i++) {
            coms[i] = new Computer(i);
        }

        for (int i = 0; i < M; i++) {
            st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());

            coms[b].list.add(coms[a]);
        }


        for (int i = 1; i <= N; i++) {
            visited = new boolean[N + 1];
            visited[i] = true;

            dfs(i, i);
        }

        int max = 0;
        for (int i = 1; i < N + 1; i++) {
            max = Math.max(max, answer[i]);
        }

        StringBuilder sb = new StringBuilder();

        for (int i = 1; i < N + 1; i++) {
            if (answer[i] == max) {
                sb.append(i).append(" ");
            }
        }

        System.out.println(sb);
    }


    public static void dfs(int original, int cur) {
        for (Computer c : coms[cur].list) {
            if (!visited[c.idx]) {
                visited[c.idx] = true;
                dfs(original, c.idx);
                answer[original]++;
            }
        }
    }

    public static class Computer {
        int idx;
        ArrayList<Computer> list;

        public Computer(int idx) {
            this.idx = idx;
            list = new ArrayList<>();
        }
    }

}