import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
	
	static int combination(int n, int r) {
		if (n == r || r == 0)
			return 1;
		else
			return combination(n-1, r-1) + combination(n-1, r);
	}

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		int N = Integer.parseInt(st.nextToken());
		int M = Integer.parseInt(st.nextToken());
		int K = Integer.parseInt(st.nextToken());
		
		
		double c = 0.0;
		for (int i = K; i <= M; i++) {
			// nCr .. n >= r
			if (N-M < M-i)
				continue;
			c += combination(M, i) * combination(N-M, M-i);
		}
		System.out.println(c / combination(N, M));
		
	}

}
