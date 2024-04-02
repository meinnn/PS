import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.TreeSet;

public class Main {

	static class Problem implements Comparable<Problem> {
		int prob, level;

		public Problem(int prob, int level) {
			super();
			this.prob = prob;
			this.level = level;
		}

		@Override
		public int compareTo(Problem o) {
			if (this.level == o.level)
				return Integer.compare(this.prob, o.prob);
			return Integer.compare(this.level, o.level);
		}
	}

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int N = Integer.parseInt(br.readLine());
		Map<Integer, Problem> map = new HashMap<>();
		TreeSet<Problem> set = new TreeSet<>();

		StringTokenizer st;
		for (int i = 0; i < N; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			int P = Integer.parseInt(st.nextToken());
			int L = Integer.parseInt(st.nextToken());
			map.put(P, new Problem(P, L));
			set.add(new Problem(P, L));
		}

		StringBuilder sb = new StringBuilder();
		int M = Integer.parseInt(br.readLine());
		for (int i = 0; i < M; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			String comm = st.nextToken();
			switch (comm) {
			case "add":
				int P = Integer.parseInt(st.nextToken());
				int L = Integer.parseInt(st.nextToken());
				map.put(P, new Problem(P, L));
				set.add(new Problem(P, L));
				break;
			case "recommend":
				int x = Integer.parseInt(st.nextToken());
				sb.append(x == 1 ? set.last().prob : set.first().prob).append("\n");
				break;
			case "solved":
				set.remove(map.get(Integer.parseInt(st.nextToken())));
				break;
			}
		}
		System.out.println(sb.toString());
	}
}