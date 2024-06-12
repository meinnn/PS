import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

public class Main {
    static class Lecture implements Comparable<Lecture> {
        int start, end;

        @Override
        public int compareTo(Lecture o) {
            return this.start == o.start ? this.end - o.end : this.start - o.start;
        }

        @Override
        public String toString() {
            return "Lecture{" +
                    "start=" + start +
                    ", end=" + end +
                    '}';
        }
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        Lecture[] lectures = new Lecture[N];
        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            lectures[i] = new Lecture();
            lectures[i].start = Integer.parseInt(st.nextToken());
            lectures[i].end = Integer.parseInt(st.nextToken());
        }
        Arrays.sort(lectures);

        int cnt = 0;
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (Lecture lec : lectures) {
            // 강의실 사용 가능
            if (!pq.isEmpty() && lec.start >= pq.peek()) {
                pq.poll();
                pq.add(lec.end);
            } else { // 새 강의실 배정
                pq.add(lec.end);
                cnt++;
            }
        }
        System.out.println(cnt);
    }
}

