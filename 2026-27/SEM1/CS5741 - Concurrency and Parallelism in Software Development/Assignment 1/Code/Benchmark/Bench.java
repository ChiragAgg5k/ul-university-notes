import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
 * Benchmark harness for ID26253925_Assignment1 (measurement tooling, not part of the submission).
 *
 * For each n in {10M, 100M, 500M} it times the serial version and the parallel version with
 * p in {2, 4, 8, 12, 16}, after warm-up runs so the JIT has compiled the hot loops. It also times the
 * parallel version with n = 1, where every thread gets an empty range, which isolates the fixed
 * cost of creating, starting and joining p threads and reducing their partial sums.
 *
 * Usage: java Bench <output directory> [repeats]
 */
public class Bench {

    static final int[] SIZES = {10_000_000, 100_000_000, 500_000_000};
    static final int[] THREADS = {2, 4, 8, 12, 16};
    static final int WARMUP = 3;
    static final int OVERHEAD_REPEATS = 200;

    record Sample(String kind, int n, int p, int run, double milliseconds, double result) {}

    public static void main(String[] args) throws Exception {
        Path out = Path.of(args.length > 0 ? args[0] : ".");
        int repeats = args.length > 1 ? Integer.parseInt(args[1]) : 7;
        Files.createDirectories(out);
        List<Sample> samples = new ArrayList<>();

        System.out.printf("cores=%d java=%s repeats=%d warmup=%d%n",
            Runtime.getRuntime().availableProcessors(), System.getProperty("java.version"), repeats, WARMUP);

        for (int i = 0; i < WARMUP; i++) {
            ID26253925_Assignment1.serial(0, 10, 10_000_000);
            for (int p : THREADS) {
                ID26253925_Assignment1.parallel(0, 10, 10_000_000, p);
            }
        }

        for (int p : THREADS) {
            for (int run = 0; run < OVERHEAD_REPEATS; run++) {
                long startTime = System.nanoTime();
                double result = ID26253925_Assignment1.parallel(0, 10, 1, p);
                samples.add(new Sample("overhead", 1, p, run, (System.nanoTime() - startTime) / 1e6, result));
            }
        }

        for (int n : SIZES) {
            for (int run = 0; run < repeats; run++) {
                long startTime = System.nanoTime();
                double result = ID26253925_Assignment1.serial(0, 10, n);
                samples.add(new Sample("serial", n, 1, run, (System.nanoTime() - startTime) / 1e6, result));
                for (int p : THREADS) {
                    startTime = System.nanoTime();
                    result = ID26253925_Assignment1.parallel(0, 10, n, p);
                    samples.add(new Sample("parallel", n, p, run, (System.nanoTime() - startTime) / 1e6, result));
                }
                System.out.printf("n=%,d run %d/%d done%n", n, run + 1, repeats);
            }
        }

        write(out.resolve("bench.csv"), samples);
        summarise(out.resolve("summary.txt"), samples);
    }

    static void write(Path file, List<Sample> samples) throws IOException {
        try (PrintWriter writer = new PrintWriter(Files.newBufferedWriter(file))) {
            writer.println("kind,n,p,run,ms,result");
            for (Sample s : samples) {
                writer.printf("%s,%d,%d,%d,%.4f,%.17f%n", s.kind(), s.n(), s.p(), s.run(), s.milliseconds(), s.result());
            }
        }
    }

    static double median(List<Sample> samples, String kind, int n, int p) {
        double[] values = samples.stream()
            .filter(s -> s.kind().equals(kind) && s.n() == n && s.p() == p)
            .mapToDouble(Sample::milliseconds).sorted().toArray();
        int middle = values.length / 2;
        return values.length % 2 == 1 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
    }

    static void summarise(Path file, List<Sample> samples) throws IOException {
        StringBuilder text = new StringBuilder();
        text.append(String.format("Median times (ms); speedup = serial / parallel; efficiency = speedup / p%n%n"));
        text.append(String.format("Thread overhead (n = 1, empty ranges): %s%n%n", String.join("  ",
            Arrays.stream(THREADS).mapToObj(p -> String.format("p=%d %.3f ms", p, median(samples, "overhead", 1, p))).toList())));
        for (int n : SIZES) {
            double serial = median(samples, "serial", n, 1);
            text.append(String.format("n = %,d%n", n));
            text.append(String.format("  %-8s %12s %9s %11s%n", "p", "ms", "speedup", "efficiency"));
            text.append(String.format("  %-8s %12.2f %9.2f %10.0f%%%n", "serial", serial, 1.0, 100.0));
            for (int p : THREADS) {
                double parallel = median(samples, "parallel", n, p);
                double speedup = serial / parallel;
                text.append(String.format("  %-8d %12.2f %9.2f %10.0f%%%n", p, parallel, speedup, speedup / p * 100));
            }
            text.append(System.lineSeparator());
        }
        Files.writeString(file, text);
        System.out.print(text);
    }
}
