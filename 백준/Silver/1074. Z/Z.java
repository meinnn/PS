import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

	static int r, c;
	static int answer = 0;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		int N = Integer.parseInt(st.nextToken());
		r = Integer.parseInt(st.nextToken());
		c = Integer.parseInt(st.nextToken());

		Z(0, 0, 1 << N);
	}

	private static void Z(int x, int y, int size) {
		if (x == r && y == c) {
			System.out.println(answer);
			return;
		}

		if (x <= r && r < x + size && y <= c && c < y + size) {
			int half = size / 2;
			Z(x, y, half);
			Z(x, y + half, half);
			Z(x + half, y, half);
			Z(x + half, y + half, half);
		} else {
			answer += size * size;
		}
	}
}
