import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

	static int N, M;
	static char[][] board;
	static boolean[][] visited;
	static int[] red, blue;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());

		board = new char[N][M];
		for (int i = 0; i < N; i++) {
			String line = br.readLine();
			for (int j = 0; j < M; j++) {
				board[i][j] = line.charAt(j);

				if (board[i][j] == 'R') {
					red = new int[] { i, j };
				} else if (board[i][j] == 'B') {
					blue = new int[] { i, j };
				}
			}
		}

		visited = new boolean[N][M];
		System.out.println(move());
	}

	static int[] dx = { -1, 1, 0, 0 };
	static int[] dy = { 0, 0, -1, 1 };

	private static int move() {

		Queue<int[]> q = new ArrayDeque<>();
		visited[red[0]][red[1]] = true;
		q.add(new int[] { red[0], red[1], blue[0], blue[1] });

		int cnt = 0;
		while (!q.isEmpty()) {
			if (++cnt > 10) {
				return -1;
			}

			int size = q.size();
			while (size-- > 0) {
				int[] cur = q.poll();


				for (int i = 0; i < 4; i++) {
					int rx = cur[0];
					int ry = cur[1];
					int bx = cur[2];
					int by = cur[3];
					int flag = 0;

					int rMove = 0, bMove = 0;

					board[cur[0]][cur[1]] = 'R';
					board[cur[2]][cur[3]] = 'B';
					while (board[rx + dx[i]][ry + dy[i]] != '#') {
						rx += dx[i];
						ry += dy[i];
						rMove++;

						if (board[rx][ry] == 'O') {
							flag += 1;
							break;
						}
					}

					while (board[bx + dx[i]][by + dy[i]] != '#') {
						bx += dx[i];
						by += dy[i];
						bMove++;

						if (board[bx][by] == 'O') {
							flag += 2;
							break;
						}
					}

					while (board[rx + dx[i]][ry + dy[i]] != '#') {
						rx += dx[i];
						ry += dy[i];
						rMove++;

						if (board[rx][ry] == 'O') {
							flag += 1;
							break;
						}
					}

					if (flag == 1) {
						return cnt;
					}

					if (flag >= 2)
						continue;

					if (rx == bx && ry == by) {
						if (rMove > bMove) {
							rx -= dx[i];
							ry -= dy[i];
						} else if (bMove > rMove) {
							bx -= dx[i];
							by -= dy[i];
						}
					}

					if (rMove > 0 || bMove > 0) {
						q.add(new int[] { rx, ry, bx, by });
					}

					board[rx][ry] = '.';
					board[bx][by] = '.';
				}
			}
		}

		return -1;

	}

}