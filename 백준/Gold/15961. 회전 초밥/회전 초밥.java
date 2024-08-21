import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        int d = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        int c = Integer.parseInt(st.nextToken());

        int[] belt = new int[N];
        for (int i = 0; i < N; i++) {
            belt[i] = Integer.parseInt(br.readLine());
        }

        int[] selected = new int[d + 1];
        int cnt = 0;
        for (int i = 0; i < k; i++) {
            if (selected[belt[i]] == 0) {
                cnt++;
            }
            selected[belt[i]]++;
        }

        int max = 0;
        if (selected[c] == 0)
            max = Math.max(max, cnt + 1);
        else
            max = Math.max(max, cnt);

        for (int i = 0; i < N; i++) {
            int l = i;
            int r = (i + k) % N;

            selected[belt[l]]--;
            if (selected[belt[l]] == 0) {
                cnt--;
            }

            selected[belt[r]]++;
            if (selected[belt[r]] == 1) {
                cnt++;
            }

            if (selected[c] == 0)
                max = Math.max(max, cnt + 1);
            else
                max = Math.max(max, cnt);
        }

        System.out.println(max);
    }
}