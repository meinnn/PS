import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class Main {
	static int K;
	static int[] building;
	static List<Integer>[] tree;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		K = Integer.parseInt(br.readLine());
		int size = (int) Math.pow(2, K);

		building = new int[size];
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");
		for (int i = 1; i < size; i++) {
			building[i] = Integer.parseInt(st.nextToken());
		}
		tree = new ArrayList[K + 1];
		for (int i = 1; i <= K; i++)
			tree[i] = new ArrayList<>();

		setTree(1, 1, size - 1);

		StringBuilder sb = new StringBuilder();
		for (int i = 1; i <= K; i++) {
			for (int node : tree[i])
				sb.append(node).append(" ");
			sb.append("\n");
		}
		System.out.println(sb.toString());
	}

	private static void setTree(int depth, int start, int end) {
		int mid = (start + end) / 2;
		tree[depth].add(building[mid]);

		if (depth == K) // 리프 노드
			return;

		setTree(depth + 1, start, mid - 1);
		setTree(depth + 1, mid + 1, end);
	}
}
