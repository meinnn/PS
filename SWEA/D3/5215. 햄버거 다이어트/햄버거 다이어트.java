import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Solution {

	static int[] burger;
	static int[][] ingr;
	static int N, L;
	static int maxScore = 0;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();

		int T = Integer.parseInt(br.readLine());
		for (int t = 1; t <= T; t++) {
			StringTokenizer st = new StringTokenizer(br.readLine());

			N = Integer.parseInt(st.nextToken());
			L = Integer.parseInt(st.nextToken());

			ingr = new int[N][2];
			for (int i = 0; i < N; i++) {
				st = new StringTokenizer(br.readLine());
				int score = Integer.parseInt(st.nextToken());
				int kcal = Integer.parseInt(st.nextToken());

				ingr[i] = new int[] { score, kcal };
			}

			maxScore = 0;
			
			for (int i = 1; i <= N; i++) {
				burger = new int[i];
				comb(i, 0, 0, 0, 0);

			}

			sb.append("#").append(t).append(" ").append(maxScore).append("\n");
		}

		System.out.println(sb);
	}

	private static void comb(int depth, int cnt, int start, int score, int kcal) {
		if (cnt == depth) {
			if (kcal < L && score > maxScore)
				maxScore = score;
			return;
		}

		for (int i = start; i < N; i++) {
            if (kcal + ingr[i][1] > L)
				continue;
			
			burger[cnt] = i;
			comb(depth, cnt + 1, i + 1, score + ingr[i][0], kcal + ingr[i][1]);
		}
	}
}
