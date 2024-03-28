import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {

	static int[][] board = new int[9][9];
	static List<int[]> blank;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		blank = new ArrayList<>();
		for (int i = 0; i < 9; i++) {
			String line = br.readLine();
			for (int j = 0; j < 9; j++) {
				board[i][j] = line.charAt(j) - '0';
				if (board[i][j] == 0)
					blank.add(new int[] { i, j });
			}
		}

		sudoku(0);
	}

	private static void sudoku(int idx) {
		if (idx == blank.size()) {
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < 9; i++) {
				for (int j = 0; j < 9; j++) {
					sb.append(board[i][j]);
				}
				sb.append("\n");
			}
			System.out.println(sb);
			System.exit(0);
		}

		int x = blank.get(idx)[0];
		int y = blank.get(idx)[1];

		for (int i = 1; i <= 9; i++) {
			if (isPossible(x, y, i)) {
				board[x][y] = i;
				sudoku(idx + 1);
				board[x][y] = 0;
			}
		}
	}

	private static boolean isPossible(int x, int y, int value) {
		for (int i = 0; i < 9; i++) {
			if (board[x][i] == value || board[i][y] == value)
				return false;
		}

		int sx = (x / 3) * 3;
		int sy = (y / 3) * 3;
		for (int i = sx; i < sx + 3; i++) {
			for (int j = sy; j < sy + 3; j++) {
				if (board[i][j] == value)
					return false;
			}
		}
		return true;
	}
}
