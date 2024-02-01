import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		int N = Integer.parseInt(br.readLine());
		int[][] food = new int[N][2];
		
		for (int i = 0; i < N; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine(), " ");
			food[i][0] = Integer.parseInt(st.nextToken());
			food[i][1] = Integer.parseInt(st.nextToken());
		}
		
		int sour = 1;
		int bitter = 0;
		int min = Integer.MAX_VALUE;
		
		for (int i = 1, size = 1 << N; i < size; i++) { // (0 == 공집합) 제외
			for (int j = 0; j < N; j++) {
				if ((i & (1 << j)) != 0) {
					sour *= food[j][0];
					bitter += food[j][1];
				}
			}
			min = Math.min(min, Math.abs(sour - bitter));
			sour = 1;
			bitter = 0;
		}
		
		System.out.println(min);
	}
}
