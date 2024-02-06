import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

	static int[] dx = { 1, 0, -1, 0 };
	static int[] dy = { 0, 1, 0, -1 };

	static int[][] board;
	static int[][] result;

	static int N, M, R;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		R = Integer.parseInt(st.nextToken());

		board = new int[N][M];
		result = new int[N][M];
		for (int i = 0; i < N; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < M; j++) {
				board[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		int x1 = 0, y1 = 0, x2 = N - 1, y2 = M - 1;
		while (x1 < x2 && y1 < y2) {

			rotate(x1, y1, x2, y2);

			x1++;
			y1++;
			x2--;
			y2--;
		}

		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < M; j++) {
				sb.append(result[i][j]).append(" ");
			}
			sb.append("\n");
		}
		
		System.out.println(sb.toString());
	}

	private static void rotate(int x1, int y1, int x2, int y2) {
		int d = 0;

		int x = x1, y = y1;

		do {
			int[] np = getNextPosition(x, y, d, x1, y1, x2, y2);
			//System.out.println(x + " " + y);
			result[np[0]][np[1]] = board[x][y];

			int nx = x + dx[d];
			int ny = y + dy[d];

			if (nx < x1 || nx > x2 || ny < y1 || ny > y2) {
				d = (d + 1) % 4;
				nx = x + dx[d];
				ny = y + dy[d];
			}

			x = nx;
			y = ny;
		} while (!(x == x1 && y == y1));
	}

	private static int[] getNextPosition(int x, int y, int d, int x1, int y1, int x2, int y2) {

		for (int i = 0; i < R; i++) {
			int nx = x + dx[d];
			int ny = y + dy[d];

			if (nx < x1 || nx > x2 || ny < y1 || ny > y2) {
				d = (d + 1) % 4;
				nx = x + dx[d];
				ny = y + dy[d];
			}

			x = nx;
			y = ny;
		}
		return new int[] { x, y };
	}
}
