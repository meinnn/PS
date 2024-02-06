import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		long A = Long.parseLong(st.nextToken());
		long B = Long.parseLong(st.nextToken());
		long C = Long.parseLong(st.nextToken());

		System.out.println(pow(A, B, C));
	}

	private static long pow(long a, long b, long c) {
		if (b == 1)
			return a % c;

		long x = pow(a, b >> 1, c);
		if ((b & 1) == 0) { // 짝수
			return x * x % c;
		} else { // 홀수
			return (x * x % c) * a % c;
		}
	}
}
