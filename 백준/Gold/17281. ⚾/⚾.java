import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

    static int N;
    static int[][] result;
    static int batter = 0;
    static int[] batters;
    static boolean[] base;
    static int maxScore = 0;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        N = Integer.parseInt(br.readLine());
        result = new int[N][9];
        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");
            for (int j = 0; j < 9; j++) {
                result[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        batters = new int[9];
        base = new boolean[3];
        perm();

        System.out.println(maxScore);
    }

    private static void perm() {
        int[] player = new int[8];
        for (int i = 0; i < 8; i++) {
            player[i] = i+1;
        }

        do {
            for (int i = 0, j = 0; i < 9; i++) {
                if (i == 3) {
                    batters[i] = 0;
                    continue;
                }
                batters[i] = player[j++];
            }
            play();
        } while (np(player));
    }

    private static void play() {
        int out = 0;
        int score = 0;
        batter = 0;

        for (int i = 0; i < N; i++) {
            while (out < 3) {
                int res = result[i][batters[batter]];

                switch (res) {
                    case 1:
                        if (base[2]) {
                            base[2] = false;
                            score++;
                        }
                        if (base[1]) {
                            base[1] = false;
                            base[2] = true;
                        }
                        if (base[0]) {
                            base[0] = false;
                            base[1] = true;
                        }
                        base[0] = true;
                        break;
                    case 2:
                        if (base[2]) {
                            base[2] = false;
                            score++;
                        }
                        if (base[1]) {
                            base[1] = false;
                            score++;
                        }
                        if (base[0]) {
                            base[0] = false;
                            base[2] = true;
                        }
                        base[1] = true;
                        break;
                    case 3:
                        for (int j = 0; j < 3; j++) {
                            if (base[j]) {
                                base[j] = false;
                                score++;
                            }
                        }
                        base[2] = true;
                        break;
                    case 4:
                        for (int j = 0; j < 3; j++) {
                            if (base[j]) {
                                base[j] = false;
                                score++;
                            }
                        }
                        score++;
                        break;
                    case 0:
                        out++;
                        break;
                }

                batter = (batter + 1) % 9;
            }
            Arrays.fill(base, false);
            out = 0;
        }

        maxScore = Math.max(maxScore, score);
    }

    private static boolean np(int[] p) {
        int N = 8;

        int i = N - 1;
        while (i > 0 && p[i - 1] >= p[i])
            i--;

        if (i == 0)
            return false;

        int j = N - 1;
        while (p[i - 1] >= p[j])
            j--;

        swap(p, i - 1, j);

        int k = N - 1;
        while (i < k)
            swap(p, i++, k--);

        return true;
    }

    private static void swap(int[] p, int i, int j) {
        int temp = p[i];
        p[i] = p[j];
        p[j] = temp;
    }

}
