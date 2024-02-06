
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

    static int N, M;
    static int[][] map;
    static int[][] copiedMap;
    static int maxSafeArea = 0;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        map = new int[N][M];
        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < M; j++) {
                map[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        comb(0);
        System.out.println(maxSafeArea);
    }

    private static void comb(int wall) {
        if (wall == 3) {
            bfs();
            return;
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (map[i][j] == 0) {
                    map[i][j] = 1;
                    comb(wall + 1);
                    map[i][j] = 0;
                }
            }
        }
    }

    static int[] dx = {-1, 1, 0, 0};
    static int[] dy = {0, 0, -1, 1};

    private static void bfs() {
        copiedMap = new int[N][M];
        for (int i = 0; i < N; i++) {
            copiedMap[i] = Arrays.copyOf(map[i], M);
        }

        Queue<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (map[i][j] == 2) {
                    q.add(new int[]{i, j});
                }
            }
        }

        while (!q.isEmpty()) {
            int[] cur = q.poll();

            for (int i = 0; i < 4; i++) {
                int nx = cur[0] + dx[i];
                int ny = cur[1] + dy[i];

                if (nx < 0 || nx >= N || ny < 0 || ny >= M)
                    continue;

                if (copiedMap[nx][ny] == 0) {
                    copiedMap[nx][ny] = 2;
                    q.add(new int[]{nx, ny});
                }
            }
        }

        maxSafeArea = Integer.max(maxSafeArea, getSafeArea());
    }

    private static int getSafeArea() {
        int cnt = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (copiedMap[i][j] == 0)
                    cnt++;
            }
        }
        return cnt;
    }
}