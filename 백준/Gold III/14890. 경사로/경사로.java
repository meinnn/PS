import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    static int N, L;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        N = Integer.parseInt(st.nextToken());
        L = Integer.parseInt(st.nextToken());

        int[][] map = new int[N][N];
        int[][] mapT = new int[N][N];

        for (int i = 0; i < N; i++) {
            String line = br.readLine();
            for (int j = 0, idx = 0; j < N; j++, idx += 2) {
                map[i][j] = line.charAt(idx) - '0';
                mapT[j][i] = map[i][j];
            }
        }

        int path = 0;
        for (int i = 0; i < N; i++) {
            if (isPassable(i, map))
                path++;
            if (isPassable(i, mapT))
                path++;
        }

        System.out.println(path);
    }

    private static boolean isPassable(int row, int[][] map) {

        int cnt = 1;
        for (int i = 1; i < N; i++) {
            if (map[row][i] == map[row][i - 1]) { // 평지
                cnt++;
            } else if (map[row][i] == map[row][i - 1] + 1) { // 오르막
                if (cnt < L)
                    return false;
                cnt = 1;
            } else if (map[row][i] == map[row][i - 1] - 1) { // 내리막
                for (int j = 0; j < L; j++) {
                    if (i + j >= N)
                        return false;
                    if (map[row][i + j] != map[row][i])
                        return false;
                }
                i += L - 1; // 반복문 끝에 i++ 하니까
                cnt = 0;
            } else { // 높이차 2 이상
                return false;
            }
        }
        return true;
    }
}