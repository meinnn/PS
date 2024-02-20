import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {

	static int N;
	static char[][] grid;
	static boolean[][] visited;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		N = Integer.parseInt(br.readLine());

		grid = new char[N][N];
		visited = new boolean[N][N];

		for (int i = 0; i < N; i++) {
			String line = br.readLine();
			for (int j = 0; j < N; j++) {
				grid[i][j] = line.charAt(j);
			}
		}

		int cnt = 0;
		
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				if (!visited[i][j]) {
					dfs(i, j, grid[i][j]);
					cnt++;
				}
			}
		}
		
		System.out.print(cnt + " ");
		
		for (int i = 0; i < N; i++)
			Arrays.fill(visited[i], false);
		cnt = 0;
		
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				if (!visited[i][j]) {
					redGreenDfs(i, j, grid[i][j]);
					cnt++;
				}
			}
		}
		
		System.out.println(cnt);
	}

	static int[] dx = { -1, 1, 0, 0 };
	static int[] dy = { 0, 0, -1, 1 };

	private static void dfs(int r, int c, char color) {

		visited[r][c] = true;
		
		int cx = r;
		int cy = c;
		
		for (int i = 0; i < 4; i++) {
			int nx = cx + dx[i];
			int ny = cy + dy[i];
			
			if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny])
				continue;
			
			if (grid[nx][ny] == color)
				dfs(nx, ny, color);
		}
	}
	
	private static void redGreenDfs(int r, int c, char color) {

		visited[r][c] = true;
		
		int cx = r;
		int cy = c;
		
		for (int i = 0; i < 4; i++) {
			int nx = cx + dx[i];
			int ny = cy + dy[i];
			
			if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny])
				continue;
			
			if (grid[nx][ny] == color || grid[nx][ny] + color == 'R'+'G')
				redGreenDfs(nx, ny, color);
		}
	}

}
