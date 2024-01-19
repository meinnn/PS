import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.StringTokenizer;

public class Main {
	
	static int[] trains;
	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		
		int n = Integer.parseInt(st.nextToken());
		int m = Integer.parseInt(st.nextToken());
		
		trains = new int[n+1];
		
		for (int i = 0; i < m; i++) {
			st = new StringTokenizer(br.readLine());
			command(st);
		}
		
		HashSet<Integer> set = new HashSet<>();
		for (int i = 1; i <= n; i++)
			set.add(trains[i]);
		
		System.out.println(set.size());
		
	}
	
	static void command(StringTokenizer st) {
		int num = Integer.parseInt(st.nextToken());
		int i = Integer.parseInt(st.nextToken());
		int x;
		switch(num) {
		case 1: // i 기차, x 번째 좌석에 사람 태우기
			x = Integer.parseInt(st.nextToken()) -1; // x 1부터니까....
			trains[i] |= (1 << x);
			break;
		case 2:	// i 기차, x 번째 좌석 사람 하차 
			x = Integer.parseInt(st.nextToken()) -1;
			trains[i] &= ~(1 << x);
			break;
		case 3:	// i 기차 한칸씩 뒤로
			trains[i] <<= 1;
			trains[i] &= (1 << 20) -1; // // 뒤로 보내면 20번째 bit가 생기므로 0 ~ 19 까지 비트를 1과 & 해주어 없애준다.
			break;
		case 4:	// i 기차 한칸씩 앞으로
			trains[i] >>= 1;
			break;
		}
	}
}
