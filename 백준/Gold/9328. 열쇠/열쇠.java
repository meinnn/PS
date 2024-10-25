import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

    static int h, w;
    static char[][] map;
    static boolean[] keys;
    static ArrayList<int[]>[] doors;
    static boolean[][] visited;

    static int[] dx = {-1, 1, 0, 0};
    static int[] dy = {0, 0, -1, 1};

    public static void main(String[] args) throws Exception {
        StringBuilder sb = new StringBuilder();
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int T = Integer.parseInt(br.readLine());

        for (int t = 0; t < T; t++) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");
            h = Integer.parseInt(st.nextToken());
            w = Integer.parseInt(st.nextToken());
            map = new char[h][w];
            visited = new boolean[h][w];
            Queue<int[]> q = new ArrayDeque<>();

            keys = new boolean[26];
            doors = new ArrayList[26];
            for (int i = 0; i < 26; i++)
                doors[i] = new ArrayList<>();

            for (int i = 0; i < h; i++) {
                String line = br.readLine();
                for (int j = 0; j < w; j++) {
                    map[i][j] = line.charAt(j);
                    if (i == 0 || i == h - 1 || j == 0 || j == w - 1) {
                        if (map[i][j] >= 'A' && map[i][j] <= 'Z') {
                            visited[i][j] = true;
                            doors[map[i][j] - 'A'].add(new int[]{i, j});
                        } else if (map[i][j] != '*') {
                            visited[i][j] = true;
                            q.add(new int[]{i, j});
                            if (map[i][j] >= 'a' && map[i][j] <= 'z') {
                                keys[map[i][j] - 'a'] = true;
                            }
                        }
                    }
                }
            }


            String line = br.readLine();
            if (line.charAt(0) != '0') {
                for (int i = 0; i < line.length(); i++) {
                    keys[line.charAt(i) - 'a'] = true;
                }
            }
            for (int i=0; i < h; i++) {
                for (int j=0; j < w; j++) {
                    if (i == 0 || i == h - 1 || j == 0 || j == w - 1) {
                        if (map[i][j] >= 'A' && map[i][j] <= 'Z' && keys[map[i][j] - 'A']) {
                            q.add(new int[]{i, j});
                        }
                    }
                }
            }
            sb.append(bfs(q)).append("\n");
        }

        System.out.println(sb);
    }

    private static int bfs(Queue<int[]> q) {
        int cnt = 0;

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int cx = cur[0], cy = cur[1];
            if (map[cx][cy] == '$')
                cnt++;

            for (int i = 0; i < 4; i++) {
                int nx = cx + dx[i];
                int ny = cy + dy[i];
                if (nx < 0 || nx >= h || ny < 0 || ny >= w || visited[nx][ny])
                    continue;

                if (map[nx][ny] >= 'A' && map[nx][ny] <= 'Z') {
                    if (keys[map[nx][ny] - 'A']) {
                        visited[nx][ny] = true;
                        q.add(new int[]{nx, ny});
                    } else {
                        doors[map[nx][ny] - 'A'].add(new int[]{nx, ny});
                    }
                } else if (map[nx][ny] != '*') {
                    visited[nx][ny] = true;
                    q.add(new int[]{nx, ny});

                    if (map[nx][ny] >= 'a' && map[nx][ny] <= 'z') {
                        keys[map[nx][ny] - 'a'] = true;
                        for (int[] pos : doors[map[nx][ny] - 'a']) {
                            visited[pos[0]][pos[1]] = true;
                            q.add(new int[]{pos[0], pos[1]});
                        }
                    }
                }
            }
        }

        return cnt;
    }
}