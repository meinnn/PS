import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {

	static int N;
	static char[][] video;
	static StringBuilder sb = new StringBuilder();

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		N = Integer.parseInt(br.readLine());
		video = new char[N][N];

		for (int i = 0; i < N; i++) {
			String line = br.readLine();
			for (int j = 0; j < N; j++) {
				video[i][j] = line.charAt(j);
			}
		}

		compress(0, 0, N);

		System.out.println(sb);
	}

	private static void compress(int x, int y, int n) {
		boolean allSame = true;

		for (int i = x; i < x + n; i++) {
			for (int j = y; j < y + n; j++) {
				if (video[i][j] != video[x][y]) {
					allSame = false;
					break;
				}
			}
		}

		if (allSame) {
			sb.append(video[x][y]);
		} else {
			sb.append("(");
			int halfN = n / 2;
			compress(x, y, halfN);
			compress(x, y + halfN, halfN);
			compress(x + halfN, y, halfN);
			compress(x + halfN, y + halfN, halfN);
			sb.append(")");
		}
	}
}
