import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
	
	static int[] numbers;
	static boolean[] isSelected;
	
	static int N, M;
	
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());
		numbers = new int[M];
		isSelected = new boolean[N+1];
		perm(0);
		
	}
	
	static void perm(int cnt) {
		if (cnt == M) {
			StringBuilder sb = new StringBuilder();
			for (int n : numbers) {
				sb.append(n).append(" ");
			}
			System.out.println(sb);
			return;
		}
		
		for (int i = 1; i <= N; i++) {
			if (isSelected[i])
				continue;
			
			numbers[cnt] = i;
			isSelected[i] = true;
			perm(cnt+1);
			isSelected[i] = false;
		}
		
	}
}
