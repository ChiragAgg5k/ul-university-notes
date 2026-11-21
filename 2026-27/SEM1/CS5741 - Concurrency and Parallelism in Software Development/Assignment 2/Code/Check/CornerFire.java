import java.util.Arrays;

/*
 * From Code/ run:
 * javac -d /tmp/forest-check ForestFire.java Check/CornerFire.java
 * java -cp /tmp/forest-check CornerFire
 */
public class CornerFire {
    public static void main(String[] args) {
        int size = 7;
        byte[][] grid = new byte[size][size];
        for (byte[] row : grid) {
            Arrays.fill(row, ForestFire.TREE);
        }
        grid[0][0] = ForestFire.BURNING;

        long[][] expectedCounts = {{1, 40, 8}, {9, 24, 16}, {25, 0, 24}, {49, 0, 0}};
        for (int step = 0; step < expectedCounts.length; step++) {
            ForestFire.decide(grid, step, 42, 0.0, 1.0, 0, size);
            long[] counts = ForestFire.commit(grid, 0, size);
            if (!Arrays.equals(counts, expectedCounts[step])) {
                throw new AssertionError("Step " + (step + 1) + " counts " + Arrays.toString(counts));
            }
            for (int row = 0; row < size; row++) {
                for (int column = 0; column < size; column++) {
                    // Diagonal spread reaches the larger of the two wrapped axis distances.
                    int distance = Math.max(Math.min(row, size - row), Math.min(column, size - column));
                    byte expected = ForestFire.TREE;
                    if (distance <= step) {
                        expected = ForestFire.EMPTY;
                    } else if (distance == step + 1) {
                        expected = ForestFire.BURNING;
                    }
                    if (grid[row][column] != expected) {
                        throw new AssertionError("Step " + (step + 1) + " mismatch at " + row + "," + column);
                    }
                }
            }
        }
        System.out.println("Corner fire passed: all 49 cells and all three counts matched on each of four steps.");
    }
}
