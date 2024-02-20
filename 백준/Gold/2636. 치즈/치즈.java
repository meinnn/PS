import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

	static int R, C;
	static int[][] board;
	static boolean[][] visited;
	static int cheese = 0;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		R = Integer.parseInt(st.nextToken());
		C = Integer.parseInt(st.nextToken());

		board = new int[R][C];
		for (int i = 0; i < R; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < C; j++) {
				board[i][j] = Integer.parseInt(st.nextToken());
				if (board[i][j] == 1)
					cheese++;
			}
		}

		visited = new boolean[R][C];
		bfs();
	}

	static int[] dx = { -1, 1, 0, 0 };
	static int[] dy = { 0, 0, -1, 1 };

	private static void bfs() {
		Queue<int[]> q = new ArrayDeque<>();
		q.add(new int[] { 0, 0 });

		int cnt = 0, time = 0;

		while (cheese > 0) {
			while (!q.isEmpty()) {
				int[] cur = q.poll();

				for (int i = 0; i < 4; i++) {
					int nx = cur[0] + dx[i];
					int ny = cur[1] + dy[i];

					if (nx < 0 || nx >= R || ny < 0 || ny >= C)
						continue;
					if (visited[nx][ny])
						continue;

					visited[nx][ny] = true;
					if (board[nx][ny] == 0) {
						q.add(new int[] { nx, ny });
					}
				}
			}

			for (int i = 0; i < R; i++) {
				for (int j = 0; j < C; j++) {
					if (visited[i][j] && board[i][j] == 1) {
						board[i][j] = 0;
						q.add(new int[] { i, j });
					}
				}
			}

			cnt = q.size();
			cheese -= cnt;
			time++;
		}

		System.out.println(time);
		System.out.println(cnt);
	}

}
