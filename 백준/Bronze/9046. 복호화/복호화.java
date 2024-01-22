import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class Main {
	public static void main(String[] args) throws NumberFormatException, IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
		int T = Integer.parseInt(br.readLine());
		for (int i = 0; i < T; i++) {
			String str = br.readLine();
			
			int[] count = new int[26];
			for (int j = 0; j < str.length(); j++) {
				char c = str.charAt(j);
				if (c == ' ') continue;
				count[c - 'a']++;
			}
		
			
			int max = Integer.MIN_VALUE;
			ArrayList<Integer> maxIdx = new ArrayList<>();
			for (int j = 0; j < 26; j++) {
				if (count[j] >= max) {
					if (count[j] == max) {
						maxIdx.add(j);
						continue;
					}
					max = count[j];
					maxIdx.clear();
					maxIdx.add(j);
				}
			}

			if (maxIdx.size() > 1) {
				System.out.println("?");
			} else {
				System.out.println((char) ('a' + maxIdx.get(0)));
			}
		}
	}
}
