import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int n = Integer.parseInt(br.readLine());
		int[] switches = new int[n + 1];

		StringTokenizer st = new StringTokenizer(br.readLine());
		for (int i = 1; i < n + 1; i++) {
			switches[i] = Integer.parseInt(st.nextToken());
		}

		int student = Integer.parseInt(br.readLine());

		for (int i = 0; i < student; i++) {
			st = new StringTokenizer(br.readLine());
			int sex = Integer.parseInt(st.nextToken());
			int num = Integer.parseInt(st.nextToken());

			if (sex == 1) {
				int cur = num;
				while (cur <= n) {
					switches[cur] = (switches[cur] == 1) ? 0 : 1;
					cur += num;
				}
			} else { // sex == 2
				int left = num;
				int right = num;
				while (left > 0 && right <= n && switches[left] == switches[right]) {
					
					switches[left] = (switches[left] == 1) ? 0 : 1;
					switches[right] = switches[left];
					left--;
					right++;
				}
			}
		}

		StringBuilder sb = new StringBuilder();
		for (int i = 1; i < n + 1; i++) {
			sb.append(switches[i]).append(" ");
			if (i % 20 == 0) {
				sb.append("\n");
			}
		}
		System.out.println(sb.toString());
	}
}
