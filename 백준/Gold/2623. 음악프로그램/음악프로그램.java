import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

	static int N;
	static List<Integer>[] graph;
	static int[] inDegree;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		N = Integer.parseInt(st.nextToken());
		int M = Integer.parseInt(st.nextToken());

		inDegree = new int[N + 1];
		graph = new ArrayList[N + 1];
		for (int i = 1; i < N + 1; i++)
			graph[i] = new ArrayList<>();

		for (int i = 0; i < M; i++) {
			st = new StringTokenizer(br.readLine());

			int n = Integer.parseInt(st.nextToken());
			int[] order = new int[n];
			for (int j = 0; j < n; j++) {
				order[j] = Integer.parseInt(st.nextToken());

				if (j != 0) {
					graph[order[j - 1]].add(order[j]);
					inDegree[order[j]]++;
				}
			}
		}

		topologySort();
	}

	private static void topologySort() {
		StringBuilder sb = new StringBuilder();
		Queue<Integer> q = new ArrayDeque<>();

		for (int i = 1; i < N + 1; i++) {
			if (inDegree[i] == 0)
				q.add(i);
		}

		int cnt = 0;
		while (!q.isEmpty()) {
			int cur = q.poll();
			sb.append(cur).append("\n");
			cnt++;

			for (int x : graph[cur]) {
				inDegree[x]--;

				if (inDegree[x] == 0)
					q.add(x);
			}
		}

		System.out.println(cnt == N ? sb : 0);
	}
}
