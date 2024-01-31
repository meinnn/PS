
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
	
	static int N;
	static int[] board;
	static int answer = 0;
	
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		N = Integer.parseInt(br.readLine());
		board = new int[N]; // board[i] = j -> [i,j]에 퀸이 있다
		
		nqueen(0);
		System.out.println(answer);
	}

	public static void nqueen(int row) {
		if (row == N) {
			answer++;
			return;
		}
		
		for (int i = 0; i < N; i++) {
			// [row, i] 에 퀸 놓기
			board[row] = i;
			if (isPromising(row))
				nqueen(row+1);
		}
		
	}

	public static boolean isPromising(int row) {
		for (int i = 0; i < row; i++) { // col 검사
			// 같은 행이나, 대각선에 이미 퀸이 있는 경우
			if (board[i] == board[row] || Math.abs(row-i) == Math.abs(board[row]-board[i]))
				return false;
		}
		return true;
	}
}
