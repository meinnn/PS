import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

	static int L, C;
	static char[] chars;
	static char[] pwd;
	static StringBuilder sb = new StringBuilder();

	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine(), " ");

		L = Integer.parseInt(st.nextToken());
		C = Integer.parseInt(st.nextToken());

		pwd = new char[L];
		chars = new char[C];

		String line = br.readLine();
		for (int i = 0, index = 0; i < C; i++, index += 2) {
			chars[i] = line.charAt(index);
		}

		Arrays.sort(chars);

		comb(0, 0, 0, 0);
		
		System.out.println(sb);
	}

	private static void comb(int cnt, int start, int vowel, int consonant) {
		if (cnt == L) {
			if (vowel < 1 || consonant < 2)
				return;

			for (char c : pwd)
				sb.append(c);
			sb.append("\n");
			
			return;
		}

		for (int i = start; i < C; i++) {
			pwd[cnt] = chars[i];

			if (isVowel(chars[i]))
				comb(cnt + 1, i + 1, vowel + 1, consonant);
			else
				comb(cnt + 1, i + 1, vowel, consonant + 1);
		}
	}

	private static boolean isVowel(char c) {
		return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
	}
}
