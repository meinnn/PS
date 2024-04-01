import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
	static final int MOD = 1_000_000_007;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		int N = Integer.parseInt(st.nextToken());
		int K = Integer.parseInt(st.nextToken());

		// 분자 N!
		long a = fact(N);
		// 분모 (K! * (N-K)!) % MOD
		long b = fact(K) * fact(N - K) % MOD;

		long res = a * pow(b, MOD - 2) % MOD;
		System.out.println(res);
	}

	private static long pow(long base, int exp) {
		if (exp == 1)
			return base % MOD;

		long temp = pow(base, exp / 2);
		if (exp % 2 == 0)
			return temp * temp % MOD;
		else
			return (temp * temp % MOD) * base % MOD;
	}

	private static long fact(int n) {
		long fac = 1L;
		for (int i = 2; i <= n; i++) {
			fac = (fac * i) % MOD;
		}
		return fac;
	}
}