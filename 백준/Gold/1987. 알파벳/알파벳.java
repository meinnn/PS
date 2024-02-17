import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

    static int R, C;
    static char[][] board;
    static boolean[] visited = new boolean[26];
    static int max = 0;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        R = Integer.parseInt(st.nextToken());
        C = Integer.parseInt(st.nextToken());

        board = new char[R][C];
        for (int i = 0; i < R; i++) {
            String line = br.readLine();
            for (int j = 0; j < C; j++) {
                board[i][j] = line.charAt(j);
            }
        }

        visited[board[0][0] - 'A'] = true;
        dfs(0, 0, 1);

        System.out.println(max);
    }

    static int[] dx = {-1, 1, 0, 0};
    static int[] dy = {0, 0, -1, 1};

    private static void dfs(int x, int y, int cnt) {
        max = Math.max(cnt, max);

        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];

            if (nx < 0 || nx >= R || ny < 0 || ny >= C)
                continue;

            if (visited[board[nx][ny] - 'A'])
                continue;

            visited[board[nx][ny] - 'A'] = true;
            dfs(nx, ny, cnt + 1);
            visited[board[nx][ny] - 'A'] = false;
        }
    }

}
