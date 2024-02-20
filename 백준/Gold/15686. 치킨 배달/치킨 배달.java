import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class Main {

	static int N, M;
	static int[][] city;
	static List<int[]> chicken = new ArrayList<>();
	static List<int[]> house = new ArrayList<>();
	static int size;
	static boolean[] isSelected;
	static int[] chosen;

	static int minDist = Integer.MAX_VALUE;

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		N = Integer.parseInt(st.nextToken());
		M = Integer.parseInt(st.nextToken());

		city = new int[N][N];
		for (int i = 0; i < N; i++) {
			st = new StringTokenizer(br.readLine(), " ");
			for (int j = 0; j < N; j++) {
				city[i][j] = Integer.parseInt(st.nextToken());

				if (city[i][j] == 1) {
					house.add(new int[] { i, j });
				} else if (city[i][j] == 2) {
					chicken.add(new int[] { i, j });
				}
			}
		}

		size = chicken.size();
		isSelected = new boolean[size];
		chosen = new int[M];

		choose(0, 0);
		
		System.out.println(minDist);
	}

	private static void choose(int cnt, int start) {
		if (cnt == M) {
			minDist = Math.min(minDist, getChickenDist());
			return;
		}

		for (int i = start; i < size; i++) {
			if (isSelected[i])
				continue;

			chosen[cnt] = i;
			isSelected[i] = true;
			choose(cnt + 1, i + 1);
			isSelected[i] = false;
		}
	}

	private static int getChickenDist() {
		int dist = 0;
		for (int i = 0; i < house.size(); i++) {
			int hx = house.get(i)[0];
			int hy = house.get(i)[1];

			int min = Integer.MAX_VALUE;
			for (int idx : chosen) {
				int cx = chicken.get(idx)[0];
				int cy = chicken.get(idx)[1];

				min = Math.min(min, Math.abs(hx - cx) + Math.abs(hy - cy));
			}
			
			dist += min;
		}
		
		return dist;
	}
}
