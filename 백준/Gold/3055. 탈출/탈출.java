import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

	static int R, C;
	static char[][] map;
	static int[] start = new int[2];
	static List<int[]> water = new ArrayList<>();
	static boolean[][] visited;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		R = Integer.parseInt(st.nextToken());
		C = Integer.parseInt(st.nextToken());
		
		map = new char[R][C];
		for (int i = 0; i < R; i++) {
			String line = br.readLine();
			for (int j = 0; j < C; j++) {
				map[i][j] = line.charAt(j);
				if (map[i][j] == 'S') {
					map[i][j] = '.';
					start[0] = i;
					start[1] = j;
				} else if (map[i][j] == '*') {
					water.add(new int[] { i, j });
				}
			}
		}
		visited = new boolean[R][C];
		int res = bfs();
		System.out.println(res == -1 ? "KAKTUS" : res);
	}

	static int[] dx = new int[] { -1, 1, 0, 0 };
	static int[] dy = new int[] { 0, 0, -1, 1 };

	private static int bfs() {
		Queue<int[]> q = new ArrayDeque<>();
		for (int[] w : water) {
			q.add(w);
		}

		Queue<int[]> go = new ArrayDeque<>();
		go.add(start);
		visited[start[0]][start[1]] = true;

		int time = 0;
		while (!go.isEmpty()) {
			time++;
			int size = q.size();
			while (size-- > 0) {
				int[] w = q.poll();

				for (int i = 0; i < 4; i++) {
					int nx = w[0] + dx[i];
					int ny = w[1] + dy[i];
					if (nx < 0 || nx >= R || ny < 0 || ny >= C)
						continue;
					if (map[nx][ny] == '.') {
						map[nx][ny] = '*';
						q.add(new int[] {nx,ny});
					}
				}
			}
			
			size = go.size();
			while (size-- > 0) {
				int[] cur = go.poll();

				for (int i = 0; i < 4; i++) {
					int nx = cur[0] + dx[i];
					int ny = cur[1] + dy[i];
					if (nx < 0 || nx >= R || ny < 0 || ny >= C || visited[nx][ny])
						continue;
					if (map[nx][ny] == 'D')
						return time;
					if (map[nx][ny] == '.') {
						go.add(new int[] {nx,ny});
						visited[nx][ny] = true;
					}
				}
			}
		}
		
		return -1;
	}
}
