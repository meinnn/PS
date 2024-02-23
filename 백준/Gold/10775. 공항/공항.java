import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int G = Integer.parseInt(br.readLine());
		int P = Integer.parseInt(br.readLine());

		int[] gate = new int[G + 1];
		int[] plane = new int[P];
		int[] docking = new int[G + 1];

		for (int i = 0; i < P; i++) {
			plane[i] = Integer.parseInt(br.readLine());
		}

		int cnt = 0;

		for (int p : plane) {
			int idx = findAvailableGate(gate, p, docking);
			if (idx == 0) {
				break;
			}
			gate[idx] = p;
			docking[p] = idx;
			cnt++;
		}

		System.out.println(cnt);
	}

	private static int findAvailableGate(int[] gate, int p, int[] docking) {
		while (p > 0 && gate[p] != 0) {
			p = docking[gate[p]] - 1;
		}
		return p;
	}
}