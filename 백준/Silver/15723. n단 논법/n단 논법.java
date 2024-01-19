import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {
	
	static ArrayList<Integer>[] alp = new ArrayList[26];
	static boolean[] visited = new boolean[26];
	static boolean find = false;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		int n = Integer.parseInt(br.readLine());
		
		for (int i =0; i < 26; i++) {
			alp[i] = new ArrayList<Integer>();
		}
		
		for (int i = 0; i < n; i++) {
			String line = br.readLine();
			int p = line.charAt(0);
			int q = line.charAt(5);
			alp[p-'a'].add(q-'a');
		}
		
		int m = Integer.parseInt(br.readLine());
		for (int i = 0; i < m; i++) {
			String line = br.readLine();
			int p = line.charAt(0);
			int q = line.charAt(5);
			
			dfs(p-'a', q-'a');
			if (find) {
				System.out.println("T");
			} else {
				System.out.println("F");
			}
			find = false;
			Arrays.fill(visited, false);
		}
		
	}
	
	static void dfs(int x, int target) {
		visited[x] = true;
		if (target == x) {
			find = true;
			return;
		}
		
		for (int al : alp[x]) {
			if (!visited[al]) {
				dfs(al, target);
			}
		}
	}
}
