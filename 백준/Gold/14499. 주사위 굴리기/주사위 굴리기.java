
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    static int[][] map;
    static int[] dice = new int[6];

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int x = Integer.parseInt(st.nextToken());
        int y = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());

        map = new int[N][M];
        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < M; j++) {
                map[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        int cx = x, cy = y;
        StringBuilder sb = new StringBuilder();

        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < K; i++) {
            int com = Integer.parseInt(st.nextToken());
            switch (com) {
                case 1:
                    if (cy + 1 >= M)
                        break;
                    goEast();
                    copy(cx, ++cy);
                    sb.append(dice[2]).append("\n");
                    break;
                case 2:
                    if (cy - 1 < 0)
                        break;
                    goWest();
                    copy(cx, --cy);
                    sb.append(dice[2]).append("\n");
                    break;
                case 3:
                    if (cx - 1 < 0)
                        break;
                    goNorth();
                    copy(--cx, cy);
                    sb.append(dice[2]).append("\n");
                    break;
                case 4:
                    if (cx + 1 >= N)
                        break;
                    goSouth();
                    copy(++cx, cy);
                    sb.append(dice[2]).append("\n");
                    break;
            }
        }

        System.out.println(sb.toString());
    }

    private static void copy(int cx, int cy) {
        if (map[cx][cy] == 0) {
            map[cx][cy] = dice[5];
        } else {
            dice[5] = map[cx][cy];
            map[cx][cy] = 0;
        }
    }

    private static void goSouth() {
        int tmp = dice[5];
        dice[5] = dice[4];
        dice[4] = dice[2];
        dice[2] = dice[0];
        dice[0] = tmp;
    }

    private static void goNorth() {
        int tmp = dice[0];
        dice[0] = dice[2];
        dice[2] = dice[4];
        dice[4] = dice[5];
        dice[5] = tmp;
    }

    private static void goWest() {
        int tmp = dice[1];
        dice[1] = dice[2];
        dice[2] = dice[3];
        dice[3] = dice[5];
        dice[5] = tmp;
    }

    private static void goEast() {
        int tmp = dice[3];
        dice[3] = dice[2];
        dice[2] = dice[1];
        dice[1] = dice[5];
        dice[5] = tmp;
    }
}