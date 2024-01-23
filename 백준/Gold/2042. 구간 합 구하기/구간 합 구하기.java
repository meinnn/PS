import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {

	static long[] arr;
	static long[] tree;

	static void init(int node, int start, int end) {
		if (start == end) {
			tree[node] = arr[start];
			return;
		}

		int mid = (start + end) / 2;
		init(node * 2, start, mid);
		init(node * 2 + 1, mid + 1, end);
		tree[node] = tree[node * 2] + tree[node * 2 + 1];
	}

	static long sum(int node, int start, int end, int left, int right) {
		// 범위 밖에 있는 경우
		if (left > end || right < start)
			return 0;

		// 범위 안에 있는 경우
		if (left <= start && end <= right)
			return tree[node];

		// 범위 일부에 있는 경우
		int mid = (start + end) / 2;
		return sum(node * 2, start, mid, left, right) + sum(node * 2 + 1, mid + 1, end, left, right);
	}

	static void update(int node, int start, int end, int index, long diff) {
		// 범위 밖에 있는 경우
		if (index < start || index > end)
			return;

		tree[node] += diff;

		// 리프 노드인 경우 패스
		if (start == end)
			return;

		int mid = (start + end) / 2;
		update(node * 2, start, mid, index, diff);
		update(node * 2 + 1, mid + 1, end, index, diff);
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		int n = Integer.parseInt(st.nextToken());
		int m = Integer.parseInt(st.nextToken());
		int k = Integer.parseInt(st.nextToken());

		tree = new long[4 * n];
		arr = new long[n + 1];

		for (int i = 1; i <= n; i++) {
			arr[i] = Long.parseLong(br.readLine());
		}

		init(1, 1, n);

		for (int i = 0; i < m + k; i++) {
			st = new StringTokenizer(br.readLine());
			int a = Integer.parseInt(st.nextToken());
			int b = Integer.parseInt(st.nextToken());
			long c = Long.parseLong(st.nextToken());

			if (a == 1) {
				long diff = c - arr[b];
				arr[b] = c;
				update(1, 1, n, b, diff);
			} else if (a == 2) {
				System.out.println(sum(1, 1, n, b, (int) c));
			}
		}
	}
}
