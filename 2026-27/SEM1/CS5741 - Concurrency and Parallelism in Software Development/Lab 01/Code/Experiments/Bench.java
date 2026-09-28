import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.IntStream;

/**
 * Benchmark harness for CS5741 Lab 1.
 *
 * Runs the four experiments from the handout (baseline comparison, array size,
 * thread count, fork/join threshold) with JIT warm-up and repeated timed runs,
 * and prints one CSV row per measurement to stdout.
 *
 * The array is generated outside every timed region, exactly as in the
 * supplied files.
 */
public class Bench {

    private static final int WARMUP_RUNS = 3;
    private static final int TIMED_RUNS = 5;

    /** Shared accumulator used by the two variants that write to static state. */
    private static long sharedSum = 0;

    public static void main(String[] args) throws Exception {
        int processors = Runtime.getRuntime().availableProcessors();
        System.err.println("Available processors (cores): " + processors);
        System.err.println("Max heap: " + Runtime.getRuntime().maxMemory() / (1024 * 1024) + " MB");

        System.out.println("experiment,variant,arraySize,threads,threshold,run,millis,sum,correct");

        int[] sizes = { 100_000_000, 200_000_000 };
        int[] threadCounts = { 1, 2, 3, 4, 6, 8, 12, 16, 24 };
        int[] thresholds = { 1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000, 200_000_000 };

        for (int size : sizes) {
            System.err.println("\n=== array size " + size + " ===");
            final int[] array = generateArray(size);
            final long expected = referenceSum(array);
            System.err.println("reference sum = " + expected);

            measure("baseline", "sequential", size, 1, 0, expected,
                () -> sequentialSum(array));

            for (int threads : threadCounts) {
                measure("threads", "concurrent-synchronized", size, threads, 0, expected,
                    () -> concurrentSynchronized(array, threads));
                measure("threads", "concurrent-localsums", size, threads, 0, expected,
                    () -> concurrentLocalSums(array, threads));
            }

            for (int threshold : thresholds) {
                measure("threshold", "parallel-forkjoin", size, processors - 1, threshold, expected,
                    () -> forkJoinSum(array, threshold));
            }

            System.gc();
        }

        raceDemo();
    }

    /** Runs a variant WARMUP_RUNS times untimed, then TIMED_RUNS times, printing a CSV row each. */
    private static void measure(String experiment, String variant, int size, int threads,
                                int threshold, long expected, LongSupplier body) {
        for (int i = 0; i < WARMUP_RUNS; i++) {
            body.getAsLong();
        }
        for (int run = 1; run <= TIMED_RUNS; run++) {
            long startTime = System.nanoTime();
            long sum = body.getAsLong();
            long endTime = System.nanoTime();
            long millis = (endTime - startTime) / 1_000_000;
            System.out.printf("%s,%s,%d,%d,%d,%d,%d,%d,%b%n",
                experiment, variant, size, threads, threshold, run, millis, sum, sum == expected);
        }
        System.err.println(String.format("  %-24s threads=%-3d threshold=%-10d done", variant, threads, threshold));
    }

    private interface LongSupplier {
        long getAsLong();
    }

    private static long sequentialSum(int[] array) {
        long sum = 0;
        for (int value : array) {
            sum += value;
        }
        return sum;
    }

    /**
     * The variant as shipped in SeqAndConcurrentSum: worker threads call a
     * static synchronized method, so the class lock serialises the whole loop.
     */
    private static long concurrentSynchronized(int[] array, int numOfThreads) {
        sharedSum = 0;
        Thread[] threads = new Thread[numOfThreads];
        int chunkSize = array.length / numOfThreads;

        for (int i = 0; i < numOfThreads; i++) {
            int start = i * chunkSize;
            int end = (i == numOfThreads - 1) ? array.length : start + chunkSize;
            threads[i] = new Thread(() -> addRange(array, start, end));
            threads[i].start();
        }
        joinAll(threads);
        return sharedSum;
    }

    private static synchronized void addRange(int[] array, int start, int end) {
        for (int i = start; i < end; i++) {
            sharedSum += array[i];
        }
    }

    /**
     * The fix: each thread accumulates into its own slot and the results are
     * combined once the threads have finished, so no lock is held during the loop.
     */
    private static long concurrentLocalSums(int[] array, int numOfThreads) {
        Thread[] threads = new Thread[numOfThreads];
        long[] partials = new long[numOfThreads];
        int chunkSize = array.length / numOfThreads;

        for (int i = 0; i < numOfThreads; i++) {
            int index = i;
            int start = i * chunkSize;
            int end = (i == numOfThreads - 1) ? array.length : start + chunkSize;
            threads[i] = new Thread(() -> {
                long local = 0;
                for (int j = start; j < end; j++) {
                    local += array[j];
                }
                partials[index] = local;
            });
            threads[i].start();
        }
        joinAll(threads);

        long total = 0;
        for (long partial : partials) {
            total += partial;
        }
        return total;
    }

    /** No synchronisation at all: demonstrates lost updates on a shared accumulator. */
    private static long concurrentRacy(int[] array, int numOfThreads) {
        sharedSum = 0;
        Thread[] threads = new Thread[numOfThreads];
        int chunkSize = array.length / numOfThreads;

        for (int i = 0; i < numOfThreads; i++) {
            int start = i * chunkSize;
            int end = (i == numOfThreads - 1) ? array.length : start + chunkSize;
            threads[i] = new Thread(() -> {
                for (int j = start; j < end; j++) {
                    sharedSum += array[j];
                }
            });
            threads[i].start();
        }
        joinAll(threads);
        return sharedSum;
    }

    private static void joinAll(Thread[] threads) {
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new IllegalStateException(e);
            }
        }
    }

    private static long forkJoinSum(int[] array, int threshold) {
        ForkJoinPool pool = ForkJoinPool.commonPool();
        return pool.invoke(new SumTask(array, 0, array.length, threshold));
    }

    private static final class SumTask extends RecursiveTask<Long> {
        private final int[] array;
        private final int start;
        private final int end;
        private final int threshold;

        SumTask(int[] array, int start, int end, int threshold) {
            this.array = array;
            this.start = start;
            this.end = end;
            this.threshold = threshold;
        }

        @Override
        protected Long compute() {
            if (end - start <= threshold) {
                long sum = 0;
                for (int i = start; i < end; i++) {
                    sum += array[i];
                }
                return sum;
            }
            int mid = (start + end) / 2;
            SumTask leftTask = new SumTask(array, start, mid, threshold);
            SumTask rightTask = new SumTask(array, mid, end, threshold);

            leftTask.fork();
            long rightResult = rightTask.compute();
            long leftResult = leftTask.join();
            return leftResult + rightResult;
        }
    }

    /** Shows that dropping the lock gives wrong answers, not just a faster wrong answer. */
    private static void raceDemo() {
        int[] array = generateArray(10_000_000);
        long expected = referenceSum(array);
        System.err.println("\n=== data race demo (10M elements, 8 threads) ===");
        System.err.println("expected sum = " + expected);
        for (int attempt = 1; attempt <= 5; attempt++) {
            long observed = concurrentRacy(array, 8);
            double lossPercent = 100.0 * (expected - observed) / expected;
            System.err.printf("attempt %d: %d (%.2f%% of updates lost)%n", attempt, observed, lossPercent);
            System.out.printf("race,concurrent-racy,%d,%d,%d,%d,%d,%d,%b%n",
                array.length, 8, 0, attempt, -1, observed, observed == expected);
        }
    }

    /** Generated in parallel purely to keep setup time down; never inside a timed region. */
    private static int[] generateArray(int size) {
        int[] array = new int[size];
        IntStream.range(0, size).parallel()
            .forEach(i -> array[i] = ThreadLocalRandom.current().nextInt(10));
        return array;
    }

    private static long referenceSum(int[] array) {
        long sum = 0;
        for (int value : array) {
            sum += value;
        }
        return sum;
    }
}
