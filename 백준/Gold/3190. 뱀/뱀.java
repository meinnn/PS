
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.StringTokenizer;

public class Main {

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int N = Integer.parseInt(br.readLine());
		int K = Integer.parseInt(br.readLine());
		int[][] apple = new int[K][2];

		StringTokenizer st;
		for (int i = 0; i < K; i++) {
			st = new StringTokenizer(br.readLine());
			apple[i][0] = Integer.parseInt(st.nextToken());
			apple[i][1] = Integer.parseInt(st.nextToken());
		}

		int L = Integer.parseInt(br.readLine());
		int[][] dir = new int[L][2];
		for (int i = 0; i < L; i++) {
			st = new StringTokenizer(br.readLine());
			dir[i][0] = Integer.parseInt(st.nextToken());
			dir[i][1] = st.nextToken().charAt(0); // L, D
		}

		Deque<int[]> snake = new ArrayDeque<int[]>();
		snake.add(new int[] { 1, 1 });

		int[] dx = { 0, 1, 0, -1 };
		int[] dy = { 1, 0, -1, 0 };
		int di = 0;

		boolean isApple = false;
		int sec = 1;
		int idx = 0; // 방향전환 idx
		int nx = 1, ny = 1;
		while (true) {
			
			nx += dx[di];
			ny += dy[di];
			
			// 벽에 부딪히거나
			if (nx < 1 || nx > N || ny < 1 || ny > N)
				break;
			// 자기 몸이랑 부딪히거나
			int x = nx, y = ny;
			if (snake.stream().anyMatch(p -> p[0] == x && p[1] == y)) {
				break;
			}
			
			snake.addFirst(new int[] { nx, ny });

			for (int i = 0; i < K; i++) {
				if (nx == apple[i][0] && ny == apple[i][1]) {
					apple[i][0] = 0;
					apple[i][1] = 0;
					isApple = true;
					break;
				}
			}
			if (!isApple) {
				snake.pollLast();
			} else {
				isApple = false;
			}

			// 방향전환
			if (idx < L && dir[idx][0] == sec) {
				if (dir[idx][1] == 'D') { // 오른쪽
					di = (di + 1) % 4;
				} else { // 왼쪽
					di = (di + 3) % 4;
				}
				idx++;
			}

			sec++;
			
		}

		System.out.println(sec);
	}

}