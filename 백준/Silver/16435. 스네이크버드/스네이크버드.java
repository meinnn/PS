import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		
		int N = Integer.parseInt(st.nextToken());
		int L = Integer.parseInt(st.nextToken());
		
		st = new StringTokenizer(br.readLine(), " ");
		int[] fruit = new int[N];
		for (int i = 0; i < N; i++) {
			fruit[i] = Integer.parseInt(st.nextToken());
		}
		
		Arrays.sort(fruit);
		for (int i = 0; i < N; i++) {
			if (fruit[i] <= L) {
				L++;
			} else {
				break;
			}
		}
		
		System.out.println(L);
		
	}
}
