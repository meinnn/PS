import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class Main {

    static int N;
    static List<Integer>[] graph;
    static int[] population;
    static boolean[] selected;
    static boolean[] visited;
    static int minDiff = Integer.MAX_VALUE;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        N = Integer.parseInt(br.readLine());

        StringTokenizer st = new StringTokenizer(br.readLine());
        population = new int[N + 1];
        for (int i = 1; i < N + 1; i++) {
            population[i] = Integer.parseInt(st.nextToken());
        }

        graph = new ArrayList[N + 1];
        for (int i = 1; i < N + 1; i++) {
            graph[i] = new ArrayList<>();

            st = new StringTokenizer(br.readLine());
            int adj = Integer.parseInt(st.nextToken());

            for (int j = 0; j < adj; j++) {
                int area = Integer.parseInt(st.nextToken());
                graph[i].add(area);
            }
        }

        selected = new boolean[N];
        subset(0);

        System.out.println(minDiff == Integer.MAX_VALUE ? -1 : minDiff);
    }

    private static void subset(int cnt) {
        if (cnt == N) {
            List<Integer> area1 = new ArrayList<>();
            List<Integer> area2 = new ArrayList<>();

            for (int i = 0; i < N; i++) {
                if (selected[i])
                    area1.add(i + 1);
                else
                    area2.add(i + 1);
            }

            if (area1.size() == 0 || area2.size() == 0)
                return;

            int pop1 = totalPopulation(area1);
            int pop2 = totalPopulation(area2);
            if (pop1 != -1 && pop2 != -1) {
                minDiff = Math.min(minDiff, Math.abs(pop1 - pop2));
            }

            return;
        }

        selected[cnt] = true;
        subset(cnt + 1);
        selected[cnt] = false;
        subset(cnt + 1);
    }

    private static int totalPopulation(List<Integer> area) {
        visited = new boolean[N + 1];
        Queue<Integer> q = new ArrayDeque<>();
        visited[area.get(0)] = true;
        q.add(area.get(0));

        int cnt = 1;
        int sum = 0;
        while (!q.isEmpty()) {
            int cur = q.poll();
            sum += population[cur];

            for (int x : graph[cur]) {
                if (!visited[x] && area.contains(x)) {
                    visited[x] = true;
                    q.add(x);
                    cnt++;
                }
            }
        }

        if (cnt == area.size())
            return sum;

        return -1;
    }
}
