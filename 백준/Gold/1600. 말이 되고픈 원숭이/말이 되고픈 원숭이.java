import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

	static int K, W, H;
	static int[][] board;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		K = Integer.parseInt(br.readLine());

		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		W = Integer.parseInt(st.nextToken());
		H = Integer.parseInt(st.nextToken());

		board = new int[H][W];
		for (int i = 0; i < H; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < W; j++) {
				board[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		System.out.println(bfs());
	}

	static int[] dx = { -1, 1, 0, 0 };
	static int[] dy = { 0, 0, -1, 1 };
	static int[] horseDx = { -1, -2, -2, -1, 1, 2, 2, 1 };
	static int[] horseDy = { -2, -1, 1, 2, 2, 1, -1, -2 };

	private static int bfs() {
		boolean[][][] visited = new boolean[H][W][K+1];

		Queue<int[]> q = new ArrayDeque<>();
		q.add(new int[] { 0, 0, 0 }); // x, y, horseMove

		int move = 0;

		while (!q.isEmpty()) {
			int size = q.size();
			while (size-- > 0) {
				int[] cur = q.poll();
				if (cur[0] == H-1 && cur[1] == W-1)
					return move;

				if (cur[2] < K) {
					for (int i = 0; i < 8; i++) {
						int nx = cur[0] + horseDx[i];
						int ny = cur[1] + horseDy[i];

						if (nx < 0 || nx >= H || ny < 0 || ny >= W)
							continue;
						if (visited[nx][ny][cur[2]+1] || board[nx][ny] == 1)
							continue;
						
						visited[nx][ny][cur[2]+1] = true;
						q.add(new int[] {nx, ny, cur[2]+1});
					}
				}
				
				for (int i = 0;i < 4; i++) {
					int nx = cur[0] + dx[i];
					int ny = cur[1] + dy[i];
					
					if (nx < 0 || nx >= H || ny < 0 || ny >= W)
						continue;
					if (visited[nx][ny][cur[2]] || board[nx][ny] == 1)
						continue;
					
					visited[nx][ny][cur[2]] = true;
					q.add(new int[] {nx, ny, cur[2]});
				}
			}
			move++;
		}
		
		return -1;
	}
}
