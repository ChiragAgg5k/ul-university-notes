/*
 * CS5741 Assignment 1: Parallel Numerical Integration
 *
 * Name: Chirag Aggarwal
 * ID:   26253925
 *
 * Usage: java ID26253925_Assignment1 <n> <p>
 *   n = number of intervals, e.g. 10000000
 *   p = number of threads, e.g. 8
 *
 * Key variables:
 *   a, b = lower and upper integration limits (0 and 10 in main)
 *   h = interval width: (b - a) / n
 *   i = interior point index; t = thread index
 *   start, end = thread's index range (start included, end excluded)
 *   localSum = one thread's sum; partialSums = array of thread sums
 */
public class ID26253925_Assignment1 {

    static final double A = 0;
    static final double B = 10;
    static final double EXACT = 0.5 * (1 - Math.exp(-10) * (Math.sin(10) + Math.cos(10)));

    public static double f(double x) {
        return Math.exp(-x) * Math.sin(x);
    }

    // Supplied serial version, kept for comparison
    public static double serial(double a, double b, int n) {
        double h = (b - a) / n;
        double sum = 0.5 * (f(a) + f(b));
        for (int i = 1; i < n; i++) {
            sum += f(a + i * h);
        }
        return sum * h;
    }

    public static double parallel(double a, double b, int n, int p) throws InterruptedException {
        if (n <= 0 || p <= 0) {
            throw new IllegalArgumentException("n and p must both be positive");
        }
        double h = (b - a) / n;

        // Step 1: Allocate one partial-sum slot per thread and retain thread references for joining.
        double[] partialSums = new double[p];
        Thread[] threads = new Thread[p];

        // Step 2: Divide the interior indices 1 to n - 1 into balanced, non-overlapping ranges.
        // Each range includes start and excludes end, so every index is evaluated once.
        // Cast to long before multiplication to prevent overflow for large n.
        for (int t = 0; t < p; t++) {
            final int worker = t;
            final int start = 1 + (int) ((long) t * (n - 1) / p);
            final int end = 1 + (int) ((long) (t + 1) * (n - 1) / p);

            // Step 3: Start a worker for this range. Accumulate locally to avoid a shared-sum race,
            // then write once to the worker's own slot. Start all workers before joining any.
            threads[t] = new Thread(() -> {
                double localSum = 0;
                for (int i = start; i < end; i++) {
                    localSum += f(a + i * h);
                }
                partialSums[worker] = localSum;
            });
            threads[t].start();
        }

        // Step 4: Join every worker before reading its result. Joining waits for completion
        // and ensures the worker's writes are visible to this thread.
        for (Thread thread : threads) {
            thread.join();
        }

        // Step 5: Combine the partial sums with the half-weighted endpoints, counted once.
        // Multiply by the interval width h to obtain the trapezoidal approximation.
        double sum = 0.5 * (f(a) + f(b));
        for (double partialSum : partialSums) {
            sum += partialSum;
        }
        return sum * h;
    }

    public static void main(String[] args) throws InterruptedException {
        int n = args.length > 0 ? Integer.parseInt(args[0]) : 10_000_000;
        int p = args.length > 1 ? Integer.parseInt(args[1]) : Runtime.getRuntime().availableProcessors();

        long startTime = System.nanoTime();
        double serialResult = serial(A, B, n);
        double serialMs = (System.nanoTime() - startTime) / 1_000_000.0;

        startTime = System.nanoTime();
        double parallelResult = parallel(A, B, n, p);
        double parallelMs = (System.nanoTime() - startTime) / 1_000_000.0;

        System.out.printf("n = %,d   p = %d%n", n, p);
        System.out.printf("serial:   %.16f   error %.2e   %.2f ms%n", serialResult, serialResult - EXACT, serialMs);
        System.out.printf("parallel: %.16f   error %.2e   %.2f ms%n", parallelResult, parallelResult - EXACT, parallelMs);
        System.out.printf("speedup:  %.2f%n", serialMs / parallelMs);
    }
}
