import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int X = Integer.parseInt(br.readLine());
        int min = 64;
        int sum = 64;
        int cnt = 1;

        while (sum > X) {
            min /= 2;
            if (sum - min >= X)
                sum -= min;
            else
                cnt++;
        }

        System.out.println(cnt);
    }
}