import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class Main {

	static int N, M;
	static List<Integer>[] graph;
	static boolean[] isSelected;
	static int flag = 0;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());

		graph = new ArrayList[N];
		for (int i = 0; i < N; i++) {
			graph[i] = new ArrayList<>();
		}

		for (int i = 0; i < M; i++) {
			st = new StringTokenizer(br.readLine(), " ");

			int a = Integer.parseInt(st.nextToken());
			int b = Integer.parseInt(st.nextToken());

			graph[a].add(b);
			graph[b].add(a);
		}

		isSelected = new boolean[N];

		for (int i = 0; i < N; i++) {
			dfs(0, i);

			if (flag == 1)
				break;
		}

		System.out.println(flag);
	}

	private static void dfs(int cnt, int idx) {
		if (flag == 1)
			return;

		if (cnt == 4) {
			flag = 1;
			return;
		}

		isSelected[idx] = true;
		for (int friend : graph[idx]) {
			if (isSelected[friend])
				continue;

			dfs(cnt + 1, friend);
		}
		isSelected[idx] = false;

	}
}
