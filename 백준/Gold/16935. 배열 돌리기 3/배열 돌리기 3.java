import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

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

		st = new StringTokenizer(br.readLine(), " ");
		for (int i = 0; i < R; i++) {
			int r = Integer.parseInt(st.nextToken());

			switch (r) {
			case 1:
				flipUD();
				break;
			case 2:
				flipLR();
				break;
			case 3:
				rotateR();
				break;
			case 4:
				rotateL();
				break;
			case 5:
				groupRotateR();
				break;
			case 6:
				groupRotateL();
				break;
			}
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

	private static void groupRotateL() {
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < M; j++) {
				if (i < N / 2 && j < M / 2)
					result[i + N / 2][j] = board[i][j];
				else if (i < N / 2 && j >= M / 2)
					result[i][j - M / 2] = board[i][j];
				else if (i >= N / 2 && j >= M / 2)
					result[i - N / 2][j] = board[i][j];
				else
					result[i][j + M / 2] = board[i][j];
			}
		}
		deepCopy();
	}

	private static void groupRotateR() {
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < M; j++) {
				if (i < N / 2 && j < M / 2)
					result[i][j + M / 2] = board[i][j];
				else if (i < N / 2 && j >= M / 2)
					result[i + N / 2][j] = board[i][j];
				else if (i >= N / 2 && j >= M / 2)
					result[i][j - M / 2] = board[i][j];
				else
					result[i - N / 2][j] = board[i][j];
			}
		}
		deepCopy();
	}

	private static void rotateL() {
		result = new int[M][N];

		for (int i = 0; i < N; i++) {
			for (int j = 0; j < M; j++) {
				result[M - 1 - j][i] = board[i][j];
			}
		}

		int tmp = N;
		N = M;
		M = tmp;
		deepCopy();
	}

	private static void rotateR() {
		result = new int[M][N];

		for (int i = 0; i < N; i++) {
			for (int j = 0; j < M; j++) {
				result[j][N - 1 - i] = board[i][j];
			}
		}

		int tmp = N;
		N = M;
		M = tmp;
		deepCopy();
	}

	private static void flipLR() {
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < M; j++) {
				result[i][M - 1 - j] = board[i][j];
			}
		}
		deepCopy();
	}

	private static void flipUD() {
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < M; j++) {
				result[N - 1 - i][j] = board[i][j];
			}
		}
		deepCopy();
	}

	private static void deepCopy() {
		board = new int[N][M];
		for (int i = 0; i < N; i++) {
			board[i] = Arrays.copyOf(result[i], M);
		}
	}

}
