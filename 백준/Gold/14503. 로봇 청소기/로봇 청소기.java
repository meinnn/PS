import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

	static int N, M;
	static int[][] room;

	static int[] dx = { -1, 0, 1, 0 }; // 북 동 남 서
	static int[] dy = { 0, 1, 0, -1 };
	static int d;
	static int cnt = 0;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());

		st = new StringTokenizer(br.readLine(), " ");
		int r = Integer.parseInt(st.nextToken());
		int c = Integer.parseInt(st.nextToken());
		d = Integer.parseInt(st.nextToken());

		room = new int[N][M];
		for (int i = 0; i < N; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < M; j++) {
				room[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		clean(r, c);

		System.out.println(cnt);
	}

	private static void clean(int r, int c) {
		int x = r, y = c;

		int flag = 0;
		while (true) {
			if (room[x][y] == 0) {
				room[x][y] = 2;
				cnt++;
			}

			for (int i = 0; i < 4; i++) {
				if (room[x + dx[i]][y + dy[i]] == 0) {
					flag = 1;
					break;
				}
			}

			if (flag == 1) {
				d = (d + 3) % 4;
				if (room[x + dx[d]][y + dy[d]] == 0) {
					x += dx[d];
					y += dy[d];
				}
				flag = 0;
				continue;
			}

			if (room[x - dx[d]][y - dy[d]] == 1) {
				break;
			} else {
				x -= dx[d];
				y -= dy[d];
			}
		}

	}

}
