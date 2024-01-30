
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
	
	// 가로, 세로, 대각선 위, 대각선 아래
	// dx -> i, dy -> j임 주의...
	static int[] dx = { 0, 1, -1, 1 };
	static int[] dy = { 1, 0, 1, 1 };
	
	static int[][] board;
	
	static boolean isWinner(int x, int y) {
		
		int color = board[x][y];
		
		for (int i = 0; i < 4; i++) {
			int nx = x + dx[i];
			int ny = y + dy[i];
			int count = 1;
			
			while (nx >= 0 && nx < 19 && ny >= 0 && ny < 19 && board[nx][ny] == color) {
					count++;
				
				if (count == 5) {
					if ((nx+dx[i] >= 0 && nx+dx[i] < 19 && ny+dy[i] >= 0 && ny+dy[i] < 19 && board[nx + dx[i]][ny + dy[i]] == color) ||
					(x-dx[i] >=0 && x-dx[i] < 19 && y-dy[i] >= 0 && y-dy[i] < 19 && board[x-dx[i]][y-dy[i]] == color))
						break;
					return true;
				}
				
				nx += dx[i];
				ny += dy[i];
			}
		}
		
		return false;
	}
	
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		board = new int[19][19];
		
		
		for (int i = 0; i < 19; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine());
			for (int j = 0; j < 19; j++) {
				board[i][j] = Integer.parseInt(st.nextToken());
			}
		}
		
		for (int i = 0; i < 19; i++) {
			for (int j = 0; j < 19; j++) {
				if (board[i][j] == 0) {
					continue;
				}
				
				if (isWinner(i, j)) {
					System.out.println(board[i][j]);
					System.out.println((i+1) + " " + (j+1));
					return;
				}
			}
		}
		
		System.out.println(0);
	}
}
