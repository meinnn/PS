import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

	static int R, C;
	static char[][] map;
	static boolean[][] visited;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		R = Integer.parseInt(st.nextToken());
		C = Integer.parseInt(st.nextToken());

		map = new char[R][C];
		visited = new boolean[R][C];

		for (int i = 0; i < R; i++) {
			String line = br.readLine();
			for (int j = 0; j < C; j++) {
				map[i][j] = line.charAt(j);
			}
		}

		int max = 0;
		for (int i = 0; i < R; i++) {
			if (install(i, 0))
				max++;
		}

		System.out.println(max);
	}

	static int[] dx = { -1, 0, 1 };

	private static boolean install(int r, int c) {

		visited[r][c] = true;

		if (c == C - 1) {
			return true;
		}

		int cx = r;
		int cy = c;

		for (int i = 0; i < 3; i++) {
			int nx = cx + dx[i];
			int ny = cy + 1;

			if (nx < 0 || nx >= R || ny < 0 || ny >= C || visited[nx][ny])
				continue;

			if (map[nx][ny] != '.')
				continue;

			if (install(nx, ny))
				return true;
		}

		return false;
	}

}
