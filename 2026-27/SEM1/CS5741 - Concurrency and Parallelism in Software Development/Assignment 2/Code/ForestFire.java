/*
 * CS5741 Assignment 2: Simulating Forest Fire Spread and Recovery
 * Student ID: 26253925
 * Name: Chirag Aggarwal
 *
 * Serial version. One grid, updated in place in two phases per step:
 *   phase 1 decides each cell's next state and writes a temporary state,
 *   phase 2 turns temporary states into final states and counts each state.
 * Both runners use the same row-range methods. The decide overload accepts
 * a shared Random for the contention benchmark. The commit overload adds to
 * a worker's counts, or skips counting when the recorder scans the grid.
 */
import java.util.Random;

public class ForestFire {

    // Final states
    static final byte EMPTY = 0;
    static final byte TREE = 1;
    static final byte BURNING = 2;

    // Temporary states written in phase 1, resolved in phase 2
    static final byte TREE_IGNITING = 3;   // was TREE, becomes BURNING
    static final byte BURNING_OUT = 4;     // was BURNING, becomes EMPTY
    static final byte EMPTY_GROWING = 5;   // was EMPTY, becomes TREE

    static final double INITIAL_BURNING_THRESHOLD = 0.001;
    static final double INITIAL_TREE_THRESHOLD = 0.6;

    public static void main(String[] args) {
        if (args.length != 0 && args.length != 5) {
            throw new IllegalArgumentException("Expected: size steps growthProbability burnProbability seed");
        }
        int size = args.length == 0 ? 10 : Integer.parseInt(args[0]);
        int steps = args.length == 0 ? 20 : Integer.parseInt(args[1]);
        double growthProbability = args.length == 0 ? 0.05 : Double.parseDouble(args[2]);
        double burnProbability = args.length == 0 ? 0.3 : Double.parseDouble(args[3]);
        long seed = args.length == 0 ? 42 : Long.parseLong(args[4]);

        byte[][] grid = new byte[size][size];
        initialise(grid, seed);
        long[][] history = new long[steps][3];
        long start = System.nanoTime();
        for (int step = 0; step < steps; step++) {
            decide(grid, step, seed, growthProbability, burnProbability, 0, size);
            long[] counts = commit(grid, 0, size);
            history[step] = counts;
        }
        double elapsedMs = (System.nanoTime() - start) / 1_000_000.0;
        printResults(elapsedMs, history);
    }

    static void printResults(double elapsedMs, long[][] history) {
        int steps = history.length;
        System.out.printf("Time: %.3f ms%n", elapsedMs);
        for (int step = 0; step < steps; step++) {
            if (step < 5 || step == steps - 1) {
                long[] counts = history[step];
                System.out.printf("Step %d: Empty=%d Tree=%d Burning=%d%n",
                                  step, counts[EMPTY], counts[TREE], counts[BURNING]);
            }
        }
    }

    // Random trees, a few of them burning. Use random(seed, -1, row, column)
    // so the starting forest is the same for every thread count.
    static void initialise(byte[][] grid, long seed) {
        for (int row = 0; row < grid.length; row++) {
            for (int column = 0; column < grid[row].length; column++) {
                double r = random(seed, -1, row, column);
                if (r < INITIAL_BURNING_THRESHOLD) {
                    grid[row][column] = BURNING;
                } else if (r < INITIAL_TREE_THRESHOLD) {
                    grid[row][column] = TREE;
                } else {
                    grid[row][column] = EMPTY;
                }
            }
        }
    }

    // Phase 1: for every cell, decide its next state and write the matching
    // temporary state. When reading neighbours, a temporary state still means
    // its old state (TREE_IGNITING is a TREE, BURNING_OUT is BURNING).
    static void decide(byte[][] grid, int step, long seed,
                       double growthProbability, double burnProbability, int fromRow, int toRow) {
        decide(grid, step, seed, growthProbability, burnProbability, fromRow, toRow, null);
    }

    static void decide(byte[][] grid, int step, long seed, double growthProbability,
                       double burnProbability, int fromRow, int toRow, Random shared) {
        for (int row = fromRow; row < toRow; row++) {
            for (int column = 0; column < grid[row].length; column++) {
                double r = shared == null ? random(seed, step, row, column) : shared.nextDouble();
                byte cell = grid[row][column];
                if (cell == BURNING) {
                    grid[row][column] = BURNING_OUT;
                } else if (cell == TREE && hasBurningNeighbour(grid, row, column) && r <= burnProbability) {
                    grid[row][column] = TREE_IGNITING;
                } else if (cell == EMPTY && r <= growthProbability) {
                    grid[row][column] = EMPTY_GROWING;
                }
            }
        }
    }

    // True if any of the 8 neighbours is burning this step. Edges wrap:
    // the row above is (row - 1 + rows) % rows, and the same for columns.
    static boolean hasBurningNeighbour(byte[][] grid, int row, int column) {
        int rows = grid.length;
        int columns = grid[0].length;
        for (int dr = -1; dr <= 1; dr++) {
            for (int dc = -1; dc <= 1; dc++) {
                if (dr == 0 && dc == 0) {
                    continue;
                }
                int neighbourRow = (row + dr + rows) % rows;
                int neighbourColumn = (column + dc + columns) % columns;
                byte neighbour = grid[neighbourRow][neighbourColumn];
                if (neighbour == BURNING || neighbour == BURNING_OUT) {
                    return true;
                }
            }
        }
        return false;
    }

    // Phase 2: turn temporary states into final ones and count each state.
    // Returns {empty, tree, burning}.
    static long[] commit(byte[][] grid, int fromRow, int toRow) {
        long[] counts = new long[3];
        commit(grid, fromRow, toRow, counts);
        return counts;
    }

    // A scan recorder supplies null and counts the committed grid itself.
    static void commit(byte[][] grid, int fromRow, int toRow, long[] counts) {
        for (int row = fromRow; row < toRow; row++) {
            for (int column = 0; column < grid[row].length; column++) {
                switch (grid[row][column]) {
                    case TREE_IGNITING: grid[row][column] = BURNING; break;
                    case BURNING_OUT:   grid[row][column] = EMPTY; break;
                    case EMPTY_GROWING: grid[row][column] = TREE; break;
                }
                if (counts != null) {
                    counts[grid[row][column]]++;
                }
            }
        }
    }

    // A random value in [0, 1) that depends only on (seed, step, row, column),
    // so every cell gets the same number whichever thread updates it.
    // Each mix() call is the SplitMix64 finaliser, which scrambles the bits.
    static double random(long seed, int step, int row, int column) {
        long z = mix(seed + 0x9E3779B97F4A7C15L * (step + 2L));
        z = mix(z + row);
        z = mix(z + column);
        return (z >>> 11) * 0x1.0p-53;
    }

    static long mix(long z) {
        z = (z ^ (z >>> 30)) * 0xBF58476D1CE4E5B9L;
        z = (z ^ (z >>> 27)) * 0x94D049BB133111EBL;
        return z ^ (z >>> 31);
    }
}
