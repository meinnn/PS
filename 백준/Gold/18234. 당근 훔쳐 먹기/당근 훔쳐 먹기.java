
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        int T = Integer.parseInt(st.nextToken());


        int[][] carrot = new int[N][2];
        for (int i = 0;i < N; i++) {
            st = new StringTokenizer(br.readLine());
            int w = Integer.parseInt(st.nextToken());
            int p = Integer.parseInt(st.nextToken());

            carrot[i][0] = w;
            carrot[i][1] = p;
        }

        // 영양제 기준 내림차순 정렬, 같으면 초기값 큰 순서로 정렬
        Arrays.sort(carrot, ((o1, o2) -> o1[1] == o2[1] ? o2[0] - o1[0] : o2[1] - o1[1]));

        long answer = 0;
        long t = T - 1;
        for (int i = 0; i < N; i++) {
            answer += carrot[i][0] + carrot[i][1] * t;
            t--;
        }

        System.out.println(answer);

    }
}
