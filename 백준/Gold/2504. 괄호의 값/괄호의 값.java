import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Stack;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String str = br.readLine();

        Stack<Character> stack = new Stack<>();
        int answer = 0;
        int tmp = 1;
        for (int i = 0; i < str.length(); i++) {
            char cur = str.charAt(i);
            if (cur == '(') {
                stack.push(cur);
                tmp *= 2;
            } else if (cur == '[') {
                stack.push(cur);
                tmp *= 3;
            }else if (cur == ')') {
                if (stack.isEmpty() || stack.pop() != '(') {
                    answer = 0;
                    break;
                }
                if (str.charAt(i-1) == '(')
                    answer += tmp;
                tmp /= 2;
            } else if (cur == ']') {
                if (stack.isEmpty() || stack.pop() != '[') {
                    answer = 0;
                    break;
                }
                if (str.charAt(i-1) == '[')
                    answer += tmp;
                tmp /= 3;
            }
        }

        if (!stack.isEmpty())
            answer = 0;

        System.out.println(answer);
    }
}
