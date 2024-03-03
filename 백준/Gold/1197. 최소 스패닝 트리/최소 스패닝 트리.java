import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

    static class Edge implements Comparable<Edge> {
        int from, to, weight;

        public Edge(int from, int to, int weight) {
            this.from = from;
            this.to = to;
            this.weight = weight;
        }


        @Override
        public int compareTo(Edge o) {
            return Integer.compare(this.weight, o.weight);
        }
    }

    static int V, E;
    static Edge[] edgeList;
    static int[] parent;

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        V = Integer.parseInt(st.nextToken());
        E = Integer.parseInt(st.nextToken());

        edgeList = new Edge[E];

        for (int i = 0; i < E; i++) {
            st = new StringTokenizer(br.readLine());
            int A = Integer.parseInt(st.nextToken());
            int B = Integer.parseInt(st.nextToken());
            int C = Integer.parseInt(st.nextToken());

            edgeList[i] = new Edge(A, B, C);
        }

        parent = new int[V + 1];
        kruskal();
    }

    private static void kruskal() {
        Arrays.sort(edgeList);

        make();

        int cost = 0, cnt = 0;
        for (Edge edge : edgeList) {
            if (!union(edge.from, edge.to))
                continue;

            cost += edge.weight;
            if (++cnt == V - 1)
                break;
        }

        System.out.println(cost);
    }

    private static void make() {
        for (int i = 1; i < V + 1; i++)
            parent[i] = i;
    }

    private static int find(int x) {
        if (x == parent[x])
            return x;

        return parent[x] = find(parent[x]);
    }

    private static boolean union(int a, int b) {
        int aRoot = find(a);
        int bRoot = find(b);
        if (aRoot == bRoot)
            return false;

        parent[bRoot] = aRoot;
        return true;
    }

}
