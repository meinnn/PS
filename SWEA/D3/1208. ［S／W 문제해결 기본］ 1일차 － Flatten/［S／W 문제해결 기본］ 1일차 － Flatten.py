
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Solution {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();

		for (int t = 1; t <= 10; t++) {
			int dump = Integer.parseInt(br.readLine());
			int[] box = new int[100];

			StringTokenizer st = new StringTokenizer(br.readLine());
			for (int i = 0; i < 100; i++) {
				box[i] = Integer.parseInt(st.nextToken());
			}

			Arrays.sort(box);
			for (int i = 0; i < dump; i++) {
				if (box[99] - box[0] < 2) {
					break;
				}

				box[99]--;
				box[0]++;
				Arrays.sort(box);
			}

			sb.append("#").append(t).append(" ").append(box[99] - box[0]).append("\n");
		}
		System.out.println(sb.toString());
	}
}
