import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Stack;
import java.util.StringTokenizer;

public class Main {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int N = Integer.parseInt(br.readLine());
		int[] tower = new int[N];

		StringTokenizer st = new StringTokenizer(br.readLine());
		for (int i = 0; i < N; i++) {
			tower[i] = Integer.parseInt(st.nextToken());
		}

		Stack<int[]> stack = new Stack<>();

		StringBuilder sb = new StringBuilder();

		for (int i = 0; i < N; i++) {
			while (!stack.isEmpty()) {
				int[] top = stack.peek();
				if (top[1] >= tower[i]) {
					sb.append(top[0]).append(" ");
					break;
				} else {
					stack.pop();
				}
			}

			if (stack.isEmpty()) {
				sb.append(0).append(" ");
			}

			stack.push(new int[] { i + 1, tower[i] });
		}

		System.out.println(sb.toString());
	}
}
