import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		int N = Integer.parseInt(st.nextToken());
		int K = Integer.parseInt(st.nextToken());

		Queue<Integer> q = new ArrayDeque<>();
		for (int i = 1; i <= N; i++) {
			q.add(i);
		}

		StringBuilder sb = new StringBuilder();
		sb.append("<");

		while (!q.isEmpty()) {
			for (int i = 0; i < K - 1; i++) {
				q.add(q.poll());
			}
			sb.append(q.poll());
			if (!q.isEmpty()) {
				sb.append(", ");
			}
		}

		sb.append(">");
		System.out.println(sb.toString());
	}
}
