import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

public class Main {
	
	static int[] minAcgt;
	
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		int S = Integer.parseInt(st.nextToken());
		int P = Integer.parseInt(st.nextToken());
		
		String str = br.readLine();
		st = new StringTokenizer(br.readLine());
		minAcgt = new int[4];
		for (int i = 0; i < 4; i++) {
			minAcgt[i] = Integer.parseInt(st.nextToken());
		}
		
		Map<Character, Integer> map = new HashMap<>();
		map.put('A', 0);
		map.put('C', 1);
		map.put('G', 2);
		map.put('T', 3);
		
		int left = 0;
		int right = P-1;
		int[] acgt = new int[4];
		
		for (int i = left; i < right; i++) {
			acgt[map.get(str.charAt(i))]++;
		}
		
		int answer = 0;
		while (right < S) {
			acgt[map.get(str.charAt(right))]++;
			
			if (isValid(acgt)) {
				answer++;
			}
			
			acgt[map.get(str.charAt(left))]--;
			left++;
			right++;
		}
		
		System.out.println(answer);
	}

	public static boolean isValid(int[] acgt) {
		for (int i = 0; i < 4; i++) {
			if (acgt[i] < minAcgt[i])
				return false;
		}
		return true;
	}
}
