import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

public class Main {

	static class Train {
		int x, y;
		int dir; // 0 == 세로, 1 == 가로

		public Train(int x, int y, int dir) {
			this.x = x;
			this.y = y;
			this.dir = dir;
		}

		@Override
		public String toString() {
			return "Train [x=" + x + ", y=" + y + ", dir=" + dir + "]";
		}

	}

	static int N;
	static char[][] map;
	static Train train, end;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		N = Integer.parseInt(br.readLine());
		map = new char[N][N];
		List<int[]> BBB = new ArrayList<>();
		List<int[]> EEE = new ArrayList<>();

		for (int i = 0; i < N; i++) {
			String line = br.readLine();
			for (int j = 0; j < N; j++) {
				map[i][j] = line.charAt(j);

				if (map[i][j] == 'B')
					BBB.add(new int[] { i, j });
				else if (map[i][j] == 'E')
					EEE.add(new int[] { i, j });
			}
		}

		train = new Train(BBB.get(1)[0], BBB.get(1)[1], 0); // 세로
		if (BBB.get(0)[0] == BBB.get(1)[0]) // 가로
			train.dir = 1;

		end = new Train(EEE.get(1)[0], EEE.get(1)[1], 0);
		if (EEE.get(0)[0] == EEE.get(1)[0]) // 가로
			end.dir = 1;

		System.out.println(bfs());
	}

	private static int bfs() {
		boolean[][][] visited = new boolean[N][N][2];
		Queue<Train> q = new ArrayDeque<>();
		q.add(train);
		visited[train.x][train.y][train.dir] = true;

		int cnt = 0;
		while (!q.isEmpty()) {
			int size = q.size();
			while (size-- > 0) {
				Train cur = q.poll();

				for (int i = 0; i < 5; i++) {
					Train nxt = nextMove(cur, i);
					if (nxt != null) {
						if (visited[nxt.x][nxt.y][nxt.dir])
							continue;

						if (nxt.x == end.x && nxt.y == end.y && nxt.dir == end.dir)
							return cnt + 1;

						visited[nxt.x][nxt.y][nxt.dir] = true;
						q.add(nxt);
					}
				}
			}
			cnt++;
		}

		return 0;
	}

	static int[] dx = { -1, -1, -1, 0, 0, 1, 1, 1 };
	static int[] dy = { -1, 0, 1, -1, 1, -1, 0, 1 };

	private static Train nextMove(Train train, int move) {
		int nx = train.x, ny = train.y, nd = train.dir;

		switch (move) {
		case 0: // U
			if (train.dir == 0) { // 세로
				if (train.x - 2 < 0 || map[train.x - 2][train.y] == '1')
					return null;
			} else { // 가로
				if (train.x - 1 < 0)
					return null;
				for (int i = -1; i <= 1; i++)
					if (map[train.x - 1][train.y + i] == '1')
						return null;
			}
			nx = train.x - 1;
			ny = train.y;
			nd = train.dir;
			break;
		case 1: // D
			if (train.dir == 0) { // 세로
				if (train.x + 2 >= N || map[train.x + 2][train.y] == '1')
					return null;
			} else { // 가로
				if (train.x + 1 >= N)
					return null;
				for (int i = -1; i <= 1; i++)
					if (map[train.x + 1][train.y + i] == '1')
						return null;
			}
			nx = train.x + 1;
			ny = train.y;
			nd = train.dir;
			break;
		case 2: // L
			if (train.dir == 0) { // 세로
				if (train.y - 1 < 0)
					return null;
				for (int i = -1; i <= 1; i++)
					if (map[train.x + i][train.y - 1] == '1')
						return null;
			} else { // 가로
				if (train.y - 2 < 0 || map[train.x][train.y - 2] == '1')
					return null;
			}
			nx = train.x;
			ny = train.y - 1;
			nd = train.dir;
			break;
		case 3: // R
			if (train.dir == 0) { // 세로
				if (train.y + 1 >= N)
					return null;
				for (int i = -1; i <= 1; i++)
					if (map[train.x + i][train.y + 1] == '1')
						return null;
			} else { // 가로
				if (train.y + 2 >= N || map[train.x][train.y + 2] == '1')
					return null;
			}
			nx = train.x;
			ny = train.y + 1;
			nd = train.dir;
			break;
		case 4: // T
			for (int i = 0; i < 8; i++) {
				int cx = train.x + dx[i];
				int cy = train.y + dy[i];
				if (cx < 0 || cx >= N || cy < 0 || cy >= N || map[cx][cy] == '1')
					return null;
			}
			nx = train.x;
			ny = train.y;
			nd = 1 - train.dir;
			break;
		}

		return new Train(nx, ny, nd);
	}
}
