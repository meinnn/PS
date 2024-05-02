import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class Main {

	static class Node {
		int to, dist;

		public Node(int to, int dist) {
			this.to = to;
			this.dist = dist;
		}

		@Override
		public String toString() {
			return "Node [to=" + to + ", dist=" + dist + "]";
		}

	}

	static int R;
	static List<Node>[] tree;
	static int giga;
	static int trunk;
	static int branch;
	static boolean[] visited;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		int N = Integer.parseInt(st.nextToken());
		R = Integer.parseInt(st.nextToken());
		tree = new ArrayList[N + 1];
		for (int i = 1; i <= N; i++) {
			tree[i] = new ArrayList<>();
		}

		for (int i = 1; i < N; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int a = Integer.parseInt(st.nextToken());
			int b = Integer.parseInt(st.nextToken());
			int d = Integer.parseInt(st.nextToken());
			tree[a].add(new Node(b, d));
			tree[b].add(new Node(a, d));
		}

		visited = new boolean[N + 1];
		visited[R] = true;
		giga(R, 0);
		branch(giga, 0);
		System.out.println(trunk + " " + branch);
	}

	private static void branch(int idx, int len) {
		if (tree[idx].size() == 1) {
			branch = Math.max(branch, len);
			return;
		}

		visited[idx] = true;
		for (Node node : tree[idx]) {
			if (!visited[node.to]) {
				branch(node.to, len + node.dist);
			}
		}
	}

	private static void giga(int idx, int len) {
		if (tree[idx].size() > 2 || tree[idx].size() == 2 && idx == R || tree[idx].size() == 1 && idx != R
				|| tree[idx].size() == 0) {
			giga = idx;
			trunk = len;
			return;
		}
		visited[idx] = true;
		for (Node node : tree[idx]) {
			if (!visited[node.to]) {
				giga(node.to, len + node.dist);
			}
		}
	}
}
