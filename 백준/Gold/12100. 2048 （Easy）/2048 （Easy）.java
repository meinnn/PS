
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {

    static int N;
    static int max = 0;

    static class Board {
        int[][] board;

        public Board(int[][] board) {
            this.board = board;
        }

        public Board moveUp() {
            for (int c = 0; c < N; c++) {
                boolean mergeable = true;
                for (int r = 1; r < N; r++) {
                    if (board[r][c] == 0)
                        continue;

                    int nr = r;
                    while (nr > 0 && board[nr - 1][c] == 0) {
                        board[nr - 1][c] = board[nr][c];
                        board[nr][c] = 0;
                        nr--;
                    }

                    if (nr > 0 && board[nr - 1][c] == board[nr][c] && mergeable) {
                        mergeable = false;
                        board[nr - 1][c] <<= 1;
                        board[nr][c] = 0;
                    } else {
                        mergeable = true;
                    }
                }
            }
            return this;
        }

        public Board copy() {
            int[][] newBoard = new int[N][N];
            for (int i = 0; i < N; i++) {
                newBoard[i] = Arrays.copyOf(board[i], N);
            }
            return new Board(newBoard);
        }

        public void flipLR() {
            for (int r = 0; r < N; r++) {
                for (int c = 0; c < N / 2; c++) {
                    int temp = board[r][N - 1 - c];
                    board[r][N - 1 - c] = board[r][c];
                    board[r][c] = temp;
                }
            }
        }

        public void transpose() {
            for (int r = 0; r < N; r++) {
                for (int c = 0; c < r; c++) {
                    int temp = board[r][c];
                    board[r][c] = board[c][r];
                    board[c][r] = temp;
                }
            }
        }

        public void rotate() {
            transpose();
            flipLR();
        }
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        N = Integer.parseInt(br.readLine());
        int[][] board = new int[N][N];
        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            for (int j = 0; j < N; j++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        search(new Board(board), 0);
        System.out.println(max);
    }

    public static void search(Board board, int cnt) {
        if (cnt == 5) {
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < N; j++) {
                    max = Math.max(max, board.board[i][j]);
                }
            }
            return;
        }

        // 상하좌우
        for (int i = 0; i < 4; i++) {
            search(board.copy().moveUp(), cnt + 1);
            board.rotate();
        }
    }

}
