import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class Main {

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringBuilder sb = new StringBuilder();
		int T = Integer.parseInt(br.readLine());
		while (T-- > 0) {
			int M = Integer.parseInt(br.readLine());
			sb.append((M + 1) / 2).append("\n");

			PriorityQueue<Integer> minq = new PriorityQueue<>(Collections.reverseOrder());
			PriorityQueue<Integer> maxq = new PriorityQueue<>();
			StringTokenizer st = null;
			int cnt = 0;
			for (int i = 0; i < M; i++) {
				if (i % 10 == 0) {
					st = new StringTokenizer(br.readLine(), " ");
				}

				int x = Integer.parseInt(st.nextToken());
				if (minq.size() == maxq.size()) {
					maxq.add(x);
				} else {
					minq.add(x);
				}

				if (!minq.isEmpty() && minq.peek() > maxq.peek()) {
					int tmp = minq.poll();
					minq.add(maxq.poll());
					maxq.add(tmp);
				}

				if (i % 2 == 0) {
					sb.append(maxq.peek()).append(" ");
					if (++cnt % 10 == 0)
						sb.append("\n");
				}
			}
			sb.append("\n");
		}
		System.out.println(sb.toString());
	}
}