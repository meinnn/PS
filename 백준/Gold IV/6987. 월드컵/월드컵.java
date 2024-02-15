import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    static int[][] result;
    static boolean possible;
    static int[][] match;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();

        for (int t = 0; t < 4; t++) {
            StringTokenizer st = new StringTokenizer(br.readLine());

            possible = true;
            result = new int[6][3];
            for (int i = 0; i < 6; i++) {
                result[i][0] = Integer.parseInt(st.nextToken());
                result[i][1] = Integer.parseInt(st.nextToken());
                result[i][2] = Integer.parseInt(st.nextToken());

                if (result[i][0] >= 6 || result[i][1] >= 6 || result[i][2] >= 6) {
                    possible = false;
                    break;
                }

                if (result[i][0] + result[i][1] + result[i][2] != 5) {
                    possible = false;
                    break;
                }
            }

            if (!possible) {
                sb.append("0").append(" ");
                continue;
            }

            // 경기 조합 6C2 = 15
            match = new int[15][2];
            for (int i = 0, idx = 0; i < 6; i++) {
                for (int j = i+1; j < 6; j++, idx++) {
                    match[idx][0] = i;
                    match[idx][1] = j;
                }
            }

            possible = false;
            backtracking(0);

            if (possible) {
                sb.append("1").append(" ");
            } else {
                sb.append("0").append(" ");
            }
        }

        System.out.println(sb);
    }

    private static void backtracking(int depth) {
        if (depth == 15) {
            possible = true;
            return;
        }

        int t1 = match[depth][0];
        int t2 = match[depth][1];

        int r1, r2;

        for (int i = 0; i < 3; i++) {
            if (i == 0) { // 승 패
                r1 = 0;
                r2 = 2;
            } else if (i == 2) { // 무 무
                r1 = 1;
                r2 = 1;
            } else { // 패 승
                r1 = 2;
                r2 = 0;
            }

            if (result[t1][r1] > 0 && result[t2][r2] > 0) {
                result[t1][r1]--;
                result[t2][r2]--;
                backtracking(depth + 1);
                result[t1][r1]++;
                result[t2][r2]++;
            }
        }
    }

}
