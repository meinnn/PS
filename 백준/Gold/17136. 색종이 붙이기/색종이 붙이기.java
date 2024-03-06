import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    static int[][] paper = new int[10][10];
    static int[] count = new int[6];
    static int min = Integer.MAX_VALUE;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        for (int i = 0; i < 10; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");
            for (int j = 0; j < 10; j++) {
                paper[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        fill(0, 0, 0);

        System.out.println(min == Integer.MAX_VALUE ? -1 : min);

    }

    private static void fill(int x, int y, int cnt) {
        if (x >= 9 && y > 9) {
            min = Math.min(min, cnt);
            return;
        }

        if (cnt >= min)
            return;

        if (y > 9) {
            fill(x + 1, 0, cnt);
            return;
        }

        if (paper[x][y] == 1) {
            for (int size = 5; size > 0; size--) {
                if (count[size] >= 5 || !isPossible(x, y, size))
                    continue;

                count[size]++;
                cover(x, y, size, 0);
                fill(x, y + size, cnt + 1);
                count[size]--;
                cover(x, y, size, 1);
            }
        } else {
            fill(x, y + 1, cnt);
        }
    }

    private static void cover(int x, int y, int size, int flag) {
        for (int i = x; i < x + size; i++) {
            for (int j = y; j < y + size; j++) {
                paper[i][j] = flag;
            }
        }
    }

    private static boolean isPossible(int x, int y, int size) {
        for (int i = x; i < x + size; i++) {
            for (int j = y; j < y + size; j++) {
                if (i < 0 || i >= 10 || j < 0 || j >= 10)
                    return false;

                if (paper[i][j] == 0)
                    return false;
            }
        }
        return true;
    }
}
