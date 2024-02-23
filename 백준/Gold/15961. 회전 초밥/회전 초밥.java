import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		int N = Integer.parseInt(st.nextToken());
		int d = Integer.parseInt(st.nextToken());
		int k = Integer.parseInt(st.nextToken());
		int c = Integer.parseInt(st.nextToken());

		int[] belt = new int[N];
		for (int i = 0; i < N; i++) {
			belt[i] = Integer.parseInt(br.readLine());
		}

		int cnt = 0;
		int[] sushi = new int[d + 1];
		for (int i = 0; i < k; i++) {
			if (sushi[belt[i]] == 0)
				cnt++;
			sushi[belt[i]]++;
		}

		int max = 0;
		for (int i = 1; i < N; i++) {
			int prev = i - 1;
			sushi[belt[prev]]--;
			if (sushi[belt[prev]] == 0)
				cnt--;

			int next = (i + k - 1) % N;
			if (sushi[belt[next]] == 0)
				cnt++;
			sushi[belt[next]]++;

			if (sushi[c] == 0)
				max = Math.max(max, cnt + 1);
			else
				max = Math.max(max, cnt);

			if (max == k + 1)
				break;
		}

		System.out.println(max);
	}
}