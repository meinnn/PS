import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int N = Integer.parseInt(br.readLine());

		int five = N / 5;
		int cnt = 0;

		while (five >= 0) {
			if (five * 5 == N) {
				cnt = five;
				break;
			}
			if ((N - (five * 5)) % 3 == 0) {
				cnt = five + (N - (five * 5)) / 3;
				break;
			}
			five--;
		}

		if (cnt == 0) {
			System.out.println(-1);
		} else {
			System.out.println(cnt);
		}
	}
}
