import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.PriorityQueue;

public class Main {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		int N = Integer.parseInt(br.readLine());
		
		PriorityQueue<Integer> pq = new PriorityQueue<>((o1,o2) -> {
			if (Math.abs(o1) == Math.abs(o2))
				return Integer.compare(o1, o2);
			return Integer.compare(Math.abs(o1), Math.abs(o2));
		});
		
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < N; i++) {
			int x = Integer.parseInt(br.readLine());
			
			if (x != 0) {
				pq.add(x);
			} else {
				if (pq.isEmpty()) {
					sb.append(0);
				} else {
					sb.append(pq.poll());
				}
				sb.append("\n");
			}
		}
		
		System.out.println(sb.toString());
	}
}
