import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

	static int N;
	static List<Integer>[] student;
	static int[] degree;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		N = Integer.parseInt(st.nextToken());
		int M = Integer.parseInt(st.nextToken());

		student = new ArrayList[N + 1];
		for (int i = 1; i < N + 1; i++) {
			student[i] = new ArrayList<>();
		}

		degree = new int[N + 1];
		for (int i = 0; i < M; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int A = Integer.parseInt(st.nextToken());
			int B = Integer.parseInt(st.nextToken());

			student[A].add(B);
			degree[B]++;
		}

		topologySort();
	}

	private static void topologySort() {
		StringBuilder sb = new StringBuilder();
		Queue<Integer> q = new ArrayDeque<>();

		for (int i = 1; i < N + 1; i++) {
			if (degree[i] == 0)
				q.add(i);
		}

		while (!q.isEmpty()) {
			int cur = q.poll();
			sb.append(cur).append(" ");

			for (int s : student[cur]) {
				degree[s]--;

				if (degree[s] == 0)
					q.add(s);
			}
		}

		System.out.println(sb);
	}
}
