import java.awt.Point;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
	
	static int R, C;
	static boolean visited[][];
	static char[][] yard;
	
	static int[] dx = { 0, 0, -1, 1 };
	static int[] dy = { -1, 1, 0, 0 };
	
	static int wolf = 0;
	static int sheep = 0;
	
	static void bfs(Point p) {
		Queue<Point> queue = new LinkedList<>();
		queue.add(p);
		visited[p.x][p.y] = true;
		
		int v = 0;
		int k = 0;
		
		while (!queue.isEmpty()) {
			Point point = queue.poll();
			
			if (yard[point.x][point.y] == 'v') {
				v++;
			} else if (yard[point.x][point.y] == 'k') {
				k++;
			}
			
			for (int i = 0; i < 4; i++) {
				int nx = point.x + dx[i];
				int ny = point.y + dy[i];
				
				if (nx < 0 || nx >= R || ny < 0 || ny >= C)
					continue;
				
				if (yard[nx][ny] != '#' && !visited[nx][ny]) {
					visited[nx][ny] = true;
					queue.add(new Point(nx, ny));
				}
			}
		}
		
		if (k > v) {
			sheep += k;
		} else {
			wolf += v;
		}
		
	}
	
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		R = Integer.parseInt(st.nextToken());
		C = Integer.parseInt(st.nextToken());
		
		yard = new char[R][C];
		visited = new boolean[R][C];
		
		for (int i = 0; i < R; i++) {
			String line = br.readLine();
			for (int j = 0; j < C; j++) {
				yard[i][j] = line.charAt(j);
			}
		}
		
		for (int i = 0;i < R; i++) {
			for (int j = 0; j < C; j++) {
				if (!visited[i][j] && yard[i][j] != '#') {
					bfs(new Point(i,j));
				}
			}
		}
		
		System.out.println(sheep + " " + wolf);
	}
}

