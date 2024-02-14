import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

	static int N, M;
	static char[][] map;
	static boolean[][][] visited;

	static int[] dx = { -1, 1, 0, 0 };
	static int[] dy = { 0, 0, -1, 1 };

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());

		map = new char[N][M];
		visited = new boolean[N][M][2];

		for (int i = 0; i < N; i++) {
			String line = br.readLine();
			for (int j = 0; j < M; j++) {
				map[i][j] = line.charAt(j);
			}
		}

		System.out.println(bfs());

	}

	private static int bfs() {

		Queue<int[]> q = new ArrayDeque<>();
		q.add(new int[] { 0, 0, 0, 1 }); // x, y, break, dist
		visited[0][0][0] = true;

		while (!q.isEmpty()) {
			int[] cur = q.poll();
			int cx = cur[0];
			int cy = cur[1];
			int broken = cur[2];
			int dist = cur[3];

			if (cx == N - 1 && cy == M - 1) {
				return dist;
			}

			for (int i = 0; i < 4; i++) {
				int nx = cx + dx[i];
				int ny = cy + dy[i];

				if (nx < 0 || nx >= N || ny < 0 || ny >= M)
					continue;
				if (visited[nx][ny][broken])
					continue;

				if (map[nx][ny] == '0') {
					q.add(new int[] { nx, ny, broken, dist + 1 });
					visited[nx][ny][broken] = true;
				} else {
					if (broken == 0) {
						q.add(new int[] { nx, ny, 1, dist + 1 });
						visited[nx][ny][1] = true;
					}
				}
			}
		}

		return -1;
	}
}
