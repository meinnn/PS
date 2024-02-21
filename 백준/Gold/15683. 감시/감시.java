import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

public class Main {

	static int N, M;
	static int[][] office;
	static List<int[]> cctv;

	static int minSize = 64;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());

		cctv = new ArrayList<int[]>();

		office = new int[N][M];
		for (int i = 0; i < N; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < M; j++) {
				office[i][j] = Integer.parseInt(st.nextToken());

				if (office[i][j] >= 1 && office[i][j] <= 5)
					cctv.add(new int[] { office[i][j], i, j });
			}
		}

		getBlindSpot(office, 0);

		System.out.println(minSize);
	}

	private static void getBlindSpot(int[][] map, int idx) {

		if (idx == cctv.size()) {
			int cnt = 0;
			for (int i = 0; i < N; i++) {
				for (int j = 0; j < M; j++) {
					if (map[i][j] == 0)
						cnt++;
				}
			}

			minSize = Math.min(minSize, cnt);
			return;
		}

		int num = cctv.get(idx)[0];
		int x = cctv.get(idx)[1];
		int y = cctv.get(idx)[2];

		
		switch (num) {
		case 1:
			for (int i = 0; i < 4; i++) {
				int[][] tmp = tempMap(map, num, x, y, i);
				getBlindSpot(tmp, idx + 1);
			}
			break;
		case 2:
			for (int i = 0; i < 2; i++) {
				int[][] tmp = tempMap(map, num, x, y, i);
				tmp = tempMap(tmp, num, x, y, i + 2);
				getBlindSpot(tmp, idx + 1);
			}
			break;
		case 3:
			for (int i = 0; i < 4; i++) {
				int[][] tmp = tempMap(map, num, x, y, i);
				tmp = tempMap(tmp, num, x, y, (i + 1) % 4);
				getBlindSpot(tmp, idx + 1);
			}
			break;
		case 4:
			for (int i = 0; i < 4; i++) {
				int[][] tmp = tempMap(map, num, x, y, i);
				tmp = tempMap(tmp, num, x, y, (i + 1) % 4);
				tmp = tempMap(tmp, num, x, y, (i + 2) % 4);
				getBlindSpot(tmp, idx + 1);
			}
			break;
		case 5:
			int[][] tmp = map;
			for (int i = 0; i < 4; i++) {
				tmp = tempMap(tmp, num, x, y, i);
			}
			getBlindSpot(tmp, idx + 1);
			break;
		}
	}

	static int[] dx = { 0, 1, 0, -1 }; // -> down <- up
	static int[] dy = { 1, 0, -1, 0 };

	private static int[][] tempMap(int[][] map, int num, int x, int y, int di) {

		int[][] temp = new int[N][M];
		for (int i = 0; i < N; i++) {
			temp[i] = Arrays.copyOf(map[i], M);
		}

		int cx = x + dx[di];
		int cy = y + dy[di];

		while (cx >= 0 && cx < N && cy >= 0 && cy < M) {
			if (temp[cx][cy] == 6)
				break;

			if (temp[cx][cy] == 0)
				temp[cx][cy] = '#';

			cx += dx[di];
			cy += dy[di];
		}

		return temp;
	}
}
