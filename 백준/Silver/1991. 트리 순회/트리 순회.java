import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
	static class Node {
		char value, left, right;

		public Node(char value, char left, char right) {
			super();
			this.value = value;
			this.left = left;
			this.right = right;
		}

		@Override
		public String toString() {
			return "Node [value=" + value + ", left=" + left + ", right=" + right + "]";
		}

	}

	static int N;
	static Node[] tree;
	static StringBuilder sb = new StringBuilder();

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		N = Integer.parseInt(br.readLine());
		tree = new Node[N];
		for (int i = 0; i < N; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine(), " ");
			char val = st.nextToken().charAt(0);
			char left = st.nextToken().charAt(0);
			char right = st.nextToken().charAt(0);

			tree[val - 'A'] = new Node(val, left, right);
		}

		pre(0);
		sb.append("\n");
		in(0);
		sb.append("\n");
		post(0);
		System.out.println(sb.toString());
	}

	private static void post(int idx) {
		if (idx >= N || idx == '.' - 'A')
			return;

		post(tree[idx].left - 'A');
		post(tree[idx].right - 'A');
		sb.append(tree[idx].value);
	}

	private static void in(int idx) {
		if (idx >= N || idx == '.' - 'A')
			return;

		in(tree[idx].left - 'A');
		sb.append(tree[idx].value);
		in(tree[idx].right - 'A');
	}

	private static void pre(int idx) {
		if (idx >= N || idx == '.' - 'A')
			return;

		sb.append(tree[idx].value);
		pre(tree[idx].left - 'A');
		pre(tree[idx].right - 'A');
	}
}
