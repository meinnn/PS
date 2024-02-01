
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {

    static int N;
    static int[] numbers;
    static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        N = Integer.parseInt(br.readLine());
        numbers = new int[N];

        find(0);

        System.out.println(sb.toString());
    }

    public static void find(int digit) {
        if (digit == N) {
            for (int i = 0; i < N; i++) {
                sb.append(numbers[i]);
            }
            sb.append("\n");
            return;
        }

        for (int i = 0; i <= 9; i++) {
            if (digit == 0 && i == 0) {
                continue;
            }
            numbers[digit] = i;
            if (!isAmazingPrime(digit))
                continue;
            find(digit+1);
        }
    }

    public static boolean isPrime(int x) {
        if (x < 2)
            return false;
        if (x == 2)
            return true;

        for (int i = 2; i < Math.sqrt(x) + 1; i++) {
            if (x % i == 0)
                return false;
        }
        return true;
    }

    public static boolean isAmazingPrime(int digit) {
        StringBuilder num = new StringBuilder();
        for (int i = 0; i <= digit; i++) {
            num.append(numbers[i]);
            if (!isPrime(Integer.parseInt(num.toString())))
                return false;
        }
        return true;
    }
}
