import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();

		int T = Integer.parseInt(br.readLine());
		
		while (T-- > 0) {
			StringTokenizer st= new StringTokenizer(br.readLine(), " ");
			int N = Integer.parseInt(st.nextToken());
			int M = Integer.parseInt(st.nextToken());
			
			int[][] combi = new int[M+1][N+1];
			
			for (int i = 0; i <= M; i++) {
				int end = Math.min(i, N);
				for (int j = 0; j <= end; j++) {
					if (j == 0 || j == i)
						combi[i][j] = 1;
					else
						combi[i][j] = combi[i-1][j-1] + combi[i-1][j];
				}
			}
			
			sb.append(combi[M][N]).append("\n");
		}
		
		System.out.println(sb);
	}

}
