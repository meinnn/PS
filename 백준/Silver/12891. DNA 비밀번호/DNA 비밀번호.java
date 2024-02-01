import java.io.BufferedReader;
import java.io.InputStreamReader;
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
		
		
		int left = 0;
		int right = P-1;
		int[] cnt = new int[26]; // 냅다 알파벳 전부 cnt 배열 만들어버리기
		
		for (int i = left; i < right; i++) {
			cnt[str.charAt(i)-'A']++;
		}
		
		int answer = 0;
		while (right < S) {
			cnt[str.charAt(right)-'A']++;
			
			if (isValid(cnt)) {
				answer++;
			}
			
			cnt[str.charAt(left)-'A']--;
			left++;
			right++;
		}
		
		System.out.println(answer);
	}

	public static boolean isValid(int[] cnt) {
		if (cnt['A'-'A'] >= minAcgt[0] && cnt['C'-'A'] >= minAcgt[1] &&
				cnt['G'-'A'] >= minAcgt[2] && cnt['T'-'A'] >= minAcgt[3]) {
			return true;
		}
		return false;
	}
}
