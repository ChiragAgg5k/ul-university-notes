/*
 * CS5741 Assignment 2: Simulating Forest Fire Spread and Recovery
 * Student ID: 26253925
 * Name: Chirag Aggarwal
 *
 * By default, long-lived workers update fixed row blocks using per-cell random
 * values. A barrier separates phases and a recorder sums queued worker counts.
 * Benchmark options can be combined.
 *   --schedule=dynamic:N  Workers claim chunks (N per worker, capped at one per row).
 *   --recorder=scan       The recorder scans the committed grid once per step.
 *   --random=shared       All workers draw from one seeded Random during decide.
 *   --threads-per-step    Start and join a fresh worker group for each phase.
 */
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.Semaphore;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

public class ForestFireParallel {
    private record Counts(int step, long[] values) {}

    private final int size, steps, threads, chunks;
    private final long seed;
    private final double growth, burn;
    private final boolean scan, threadsPerStep;
    private final Random shared;
    private final byte[][] grid;
    private final long[][] history;
    private final AtomicInteger nextDecision = new AtomicInteger();
    private final AtomicInteger nextCommit = new AtomicInteger();
    private final LinkedBlockingQueue<Counts> queue = new LinkedBlockingQueue<>();
    private final Semaphore committed = new Semaphore(0);
    private final Semaphore scanned = new Semaphore(0);

    private ForestFireParallel(String[] args) {
        List<String> positional = new ArrayList<>();
        int chunksPerWorker = 0;
        boolean scanGrid = false, sharedRandom = false, freshThreads = false;
        for (String arg : args) {
            if (arg.startsWith("--schedule=dynamic:")) {
                chunksPerWorker = Integer.parseInt(arg.substring("--schedule=dynamic:".length()));
                if (chunksPerWorker < 1) {
                    throw new IllegalArgumentException("Chunks per worker must be positive");
                }
            } else {
                switch (arg) {
                    case "--recorder=scan" -> scanGrid = true;
                    case "--random=shared" -> sharedRandom = true;
                    case "--threads-per-step" -> freshThreads = true;
                    default -> {
                        if (arg.startsWith("--")) {
                            throw new IllegalArgumentException("Unknown option: " + arg);
                        }
                        positional.add(arg);
                    }
                }
            }
        }
        if (!positional.isEmpty() && positional.size() != 6) {
            throw new IllegalArgumentException("Expected: size steps growthProbability burnProbability seed threads");
        }
        size = positional.isEmpty() ? 10 : Integer.parseInt(positional.get(0));
        steps = positional.isEmpty() ? 20 : Integer.parseInt(positional.get(1));
        growth = positional.isEmpty() ? 0.05 : Double.parseDouble(positional.get(2));
        burn = positional.isEmpty() ? 0.3 : Double.parseDouble(positional.get(3));
        seed = positional.isEmpty() ? 42 : Long.parseLong(positional.get(4));
        threads = positional.isEmpty() ? 4 : Integer.parseInt(positional.get(5));
        if (threads < 1) {
            throw new IllegalArgumentException("Thread count must be positive");
        }
        chunks = (int) Math.min(size, (long) chunksPerWorker * threads);
        scan = scanGrid;
        threadsPerStep = freshThreads;
        // Random is thread-safe. Workers contend to update its state, and scheduling
        // determines which cell receives each draw, so a fixed seed can give different grids.
        shared = sharedRandom ? new Random(seed) : null;
        grid = new byte[size][size];
        history = new long[steps][3];
        ForestFire.initialise(grid, seed);
    }

    private void record() throws InterruptedException {
        if (scan) {
            for (long[] totals : history) {
                // Each worker releases one committed permit after its final grid write.
                // Acquiring all permits makes those writes visible for the whole-grid scan.
                committed.acquire(threads);
                for (byte[] row : grid) {
                    for (byte cell : row) {
                        totals[cell]++;
                    }
                }
                // Each waiting worker needs one scanned permit to proceed. Releasing them
                // after the last read keeps the grid stable throughout the scan.
                scanned.release(threads);
            }
        } else {
            long messages = (long) threads * steps;
            for (long i = 0; i < messages; i++) {
                Counts counts = queue.take();
                long[] totals = history[counts.step()];
                for (int state = 0; state < totals.length; state++) {
                    totals[state] += counts.values()[state];
                }
            }
        }
    }

    private void phase(int worker, int step, boolean deciding) throws InterruptedException {
        long[] counts = deciding || scan ? null : new long[3];
        if (chunks == 0) {
            // Disjoint half-open row blocks give each cell one writer per phase.
            updateBlock(worker, threads, step, deciding, counts);
        } else {
            AtomicInteger next = deciding ? nextDecision : nextCommit;
            // Barriers (or phase joins) keep phases from overlapping. All workers claim
            // from next in this phase, so worker 0 can reset the idle counter before
            // any worker uses it in the following phase.
            if (worker == 0) {
                (deciding ? nextCommit : nextDecision).set(0);
            }
            for (int chunk = next.getAndIncrement(); chunk < chunks; chunk = next.getAndIncrement()) {
                updateBlock(chunk, chunks, step, deciding, counts);
            }
        }
        if (!deciding) {
            if (scan) {
                committed.release();
                scanned.acquire();
            } else {
                queue.put(new Counts(step, counts));
            }
        }
    }

    private void updateBlock(int block, int blocks, int step, boolean deciding, long[] counts) {
        int from = (int) ((long) block * size / blocks);
        int to = (int) ((block + 1L) * size / blocks);
        if (deciding) {
            ForestFire.decide(grid, step, seed, growth, burn, from, to, shared);
        } else {
            ForestFire.commit(grid, from, to, counts);
        }
    }

    @FunctionalInterface
    private interface Task {
        void run(int worker) throws InterruptedException, BrokenBarrierException;
    }

    private static Thread thread(String name, int id, Task task, Thread.UncaughtExceptionHandler onFailure) {
        Thread thread = new Thread(() -> {
            try {
                task.run(id);
            } catch (InterruptedException | BrokenBarrierException e) {
                throw new RuntimeException(e);
            }
        }, name);
        thread.setUncaughtExceptionHandler(onFailure);
        return thread;
    }

    private static void startAndJoin(Thread[] workers, Task task, Thread.UncaughtExceptionHandler onFailure)
            throws InterruptedException {
        for (int t = 0; t < workers.length; t++) {
            workers[t] = thread("worker-" + t, t, task, onFailure);
            workers[t].start();
        }
        for (Thread worker : workers) {
            worker.join();
        }
    }

    private void run() {
        Thread main = Thread.currentThread();
        AtomicReference<Throwable> failure = new AtomicReference<>();
        Thread.UncaughtExceptionHandler onFailure = (thread, cause) -> {
            if (failure.compareAndSet(null, cause)) {
                main.interrupt();
            }
        };
        Thread recorder = thread("recorder", 0, ignored -> record(), onFailure);
        Thread[] workers = new Thread[threads];
        CyclicBarrier barrier = threadsPerStep ? null : new CyclicBarrier(threads);
        long start = System.nanoTime();
        long stop;
        try {
            recorder.start();
            if (threadsPerStep) {
                for (int step = 0; step < steps; step++) {
                    int current = step;
                    startAndJoin(workers, t -> phase(t, current, true), onFailure);
                    startAndJoin(workers, t -> phase(t, current, false), onFailure);
                }
            } else {
                startAndJoin(workers, t -> {
                    for (int step = 0; step < steps; step++) {
                        phase(t, step, true);
                        // All neighbour reads finish here. Plain byte writes in decide are
                        // visible to every worker after it crosses the barrier into commit.
                        barrier.await();
                        phase(t, step, false);
                        // Each worker's committed byte writes happen-before reads after this
                        // barrier, including reads of a neighbour's edge row in the next step.
                        barrier.await();
                    }
                }, onFailure);
            }
            recorder.join();
            stop = System.nanoTime();
        } catch (InterruptedException e) {
            throw new RuntimeException(failure.get() == null ? e : failure.get());
        } finally {
            recorder.interrupt();
            for (Thread worker : workers) {
                if (worker != null) {
                    worker.interrupt();
                }
            }
        }
        ForestFire.printResults((stop - start) / 1_000_000.0, history);
    }

    public static void main(String[] args) {
        new ForestFireParallel(args).run();
    }
}
