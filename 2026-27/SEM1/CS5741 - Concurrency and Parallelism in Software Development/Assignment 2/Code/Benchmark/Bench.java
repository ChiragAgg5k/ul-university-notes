import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/*
 * Benchmark harness for ForestFire and ForestFireParallel (measurement tooling, not part of the submission).
 *
 * Runs each configuration in this JVM after warm-up runs, so the JIT has compiled the hot loops, and keeps
 * every timing. Each run calls the program's own main and reads the "Time:" line it prints, so the
 * timed region is exactly the one in the submitted code. Deterministic runs are also checked against the
 * serial output, so a benchmark never reports the speed of a wrong answer.
 *
 * Experiments:
 *   strong    fixed grids {500, 1000, 2000}, threads {1, 2, 4, 8}, plus serial: speedup, efficiency, Karp-Flatt
 *   weak      grid grows with threads so cells per thread stay at 707^2 (Gustafson): 707, 1000, 1414, 2000
 *   variants  1000^2 grid, one option changed at a time: dynamic chunks, scanning recorder, threads per step
 *   shared    one shared java.util.Random, on a smaller run because it is two orders of magnitude slower
 *   overhead  one row per thread, so the time is almost all barriers, recorder hand-off and thread start
 *
 * Usage: java -cp <classes> Bench <output directory> [repeats] [experiment ...]
 */
public class Bench {

    static final int STEPS = 400;
    static final double GROWTH = 0.05;
    static final double BURN = 0.3;
    static final long SEED = 42;
    static final int WARMUP = 2;
    static final int[] THREADS = {1, 2, 4, 8};
    static final int[] STRONG_SIZES = {500, 1000, 2000};
    static final int[] WEAK_SIZES = {707, 1000, 1414, 2000};
    static final int VARIANT_SIZE = 1000;
    static final String[] VARIANTS = {"", "--schedule=dynamic:4", "--schedule=dynamic:16", "--recorder=scan", "--threads-per-step"};
    static final Pattern TIME = Pattern.compile("Time: ([0-9.]+) ms\\R");

    record Sample(String experiment, String variant, int size, int steps, int threads, int run, double milliseconds) {}

    record Output(double milliseconds, String counts) {}

    public static void main(String[] args) throws Exception {
        Path out = Path.of(args.length > 0 ? args[0] : ".");
        int repeats = args.length > 1 ? Integer.parseInt(args[1]) : 5;
        List<String> experiments = args.length > 2
            ? List.of(args).subList(2, args.length)
            : List.of("overhead", "strong", "weak", "variants", "shared");
        Files.createDirectories(out);
        List<Sample> samples = new ArrayList<>();

        System.err.printf("cores=%d java=%s repeats=%d warmup=%d steps=%d experiments=%s%n",
            Runtime.getRuntime().availableProcessors(), System.getProperty("java.version"),
            repeats, WARMUP, STEPS, experiments);

        for (int i = 0; i < WARMUP; i++) {
            serial(500, STEPS);
            for (String variant : VARIANTS) {
                for (int threads : THREADS) {
                    parallel(500, STEPS, threads, variant);
                }
            }
        }

        if (experiments.contains("overhead")) {
            for (int run = 0; run < repeats; run++) {
                for (int threads : THREADS) {
                    samples.add(sample("overhead", "", threads, STEPS, threads, run, parallel(threads, STEPS, threads, "")));
                }
            }
            System.err.println("overhead done");
        }
        if (experiments.contains("strong")) {
            for (int size : STRONG_SIZES) {
                scaling("strong", size, repeats, samples);
            }
        }
        if (experiments.contains("weak")) {
            for (int t = 0; t < THREADS.length; t++) {
                int size = WEAK_SIZES[t];
                String reference = serial(size, STEPS).counts();
                for (int run = 0; run < repeats; run++) {
                    samples.add(sample("weak", "serial", size, STEPS, 1, run, serial(size, STEPS)));
                    samples.add(sample("weak", "", size, STEPS, THREADS[t], run, checked(reference, parallel(size, STEPS, THREADS[t], ""))));
                }
                System.err.printf("weak size=%d done%n", size);
            }
        }
        if (experiments.contains("variants")) {
            String reference = serial(VARIANT_SIZE, STEPS).counts();
            for (int run = 0; run < repeats; run++) {
                samples.add(sample("variants", "serial", VARIANT_SIZE, STEPS, 1, run, serial(VARIANT_SIZE, STEPS)));
                for (String variant : VARIANTS) {
                    for (int threads : THREADS) {
                        Output output = checked(reference, parallel(VARIANT_SIZE, STEPS, threads, variant));
                        samples.add(sample("variants", variant, VARIANT_SIZE, STEPS, threads, run, output));
                    }
                }
                System.err.printf("variants run %d/%d done%n", run + 1, repeats);
            }
        }
        if (experiments.contains("shared")) {
            int size = 500;
            int steps = 100;
            for (int run = 0; run < Math.min(repeats, 3); run++) {
                samples.add(sample("shared", "serial", size, steps, 1, run, serial(size, steps)));
                for (int threads : THREADS) {
                    samples.add(sample("shared", "", size, steps, threads, run, parallel(size, steps, threads, "")));
                    samples.add(sample("shared", "--random=shared", size, steps, threads, run, parallel(size, steps, threads, "--random=shared")));
                }
                System.err.printf("shared run %d done%n", run + 1);
            }
        }

        write(out.resolve("bench.csv"), samples);
        summarise(out.resolve("summary.txt"), samples, experiments);
    }

    static void scaling(String experiment, int size, int repeats, List<Sample> samples) {
        String reference = serial(size, STEPS).counts();
        for (int run = 0; run < repeats; run++) {
            samples.add(sample(experiment, "serial", size, STEPS, 1, run, serial(size, STEPS)));
            for (int threads : THREADS) {
                samples.add(sample(experiment, "", size, STEPS, threads, run, checked(reference, parallel(size, STEPS, threads, ""))));
            }
            System.err.printf("%s size=%d run %d/%d done%n", experiment, size, run + 1, repeats);
        }
    }

    static Sample sample(String experiment, String variant, int size, int steps, int threads, int run, Output output) {
        return new Sample(experiment, variant, size, steps, threads, run, output.milliseconds());
    }

    static Output serial(int size, int steps) {
        return capture(() -> ForestFire.main(arguments(size, steps)));
    }

    static Output parallel(int size, int steps, int threads, String variant) {
        List<String> list = new ArrayList<>(List.of(arguments(size, steps)));
        list.add(String.valueOf(threads));
        if (!variant.isEmpty()) {
            list.addAll(List.of(variant.split(" ")));
        }
        return capture(() -> ForestFireParallel.main(list.toArray(String[]::new)));
    }

    static String[] arguments(int size, int steps) {
        return new String[] {String.valueOf(size), String.valueOf(steps), String.valueOf(GROWTH), String.valueOf(BURN), String.valueOf(SEED)};
    }

    static Output capture(Runnable program) {
        PrintStream original = System.out;
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        System.setOut(new PrintStream(buffer));
        try {
            program.run();
        } finally {
            System.setOut(original);
        }
        String text = buffer.toString();
        Matcher matcher = TIME.matcher(text);
        if (!matcher.find()) {
            throw new IllegalStateException("No Time line in output:\n" + text);
        }
        return new Output(Double.parseDouble(matcher.group(1)), matcher.replaceFirst(""));
    }

    static Output checked(String reference, Output output) {
        if (!output.counts().equals(reference)) {
            throw new IllegalStateException("Parallel counts differ from serial:\n" + output.counts() + "\nexpected:\n" + reference);
        }
        return output;
    }

    static void write(Path file, List<Sample> samples) throws IOException {
        try (PrintWriter writer = new PrintWriter(Files.newBufferedWriter(file))) {
            writer.println("experiment,variant,size,steps,threads,run,ms");
            for (Sample s : samples) {
                writer.printf("%s,%s,%d,%d,%d,%d,%.4f%n", s.experiment(), s.variant(), s.size(), s.steps(), s.threads(), s.run(), s.milliseconds());
            }
        }
    }

    static double median(List<Sample> samples, String experiment, String variant, int size, int threads) {
        double[] values = samples.stream()
            .filter(s -> s.experiment().equals(experiment) && s.variant().equals(variant) && s.size() == size && s.threads() == threads)
            .mapToDouble(Sample::milliseconds).sorted().toArray();
        if (values.length == 0) {
            return Double.NaN;
        }
        int middle = values.length / 2;
        return values.length % 2 == 1 ? values[middle] : (values[middle - 1] + values[middle]) / 2;
    }

    // Karp-Flatt experimentally determined serial fraction; undefined for one thread.
    static double karpFlatt(double speedup, int threads) {
        return threads == 1 ? Double.NaN : (1 / speedup - 1.0 / threads) / (1 - 1.0 / threads);
    }

    static void summarise(Path file, List<Sample> samples, List<String> experiments) throws IOException {
        StringBuilder text = new StringBuilder();
        text.append(String.format("Median times (ms), %d steps; speedup = serial / parallel; efficiency = speedup / p; e = Karp-Flatt%n%n", STEPS));
        String header = String.format("  %-8s %11s %9s %11s %8s%n", "p", "ms", "speedup", "efficiency", "e");
        if (experiments.contains("overhead")) {
            text.append("Overhead: one row per thread\n");
            for (int threads : THREADS) {
                double ms = median(samples, "overhead", "", threads, threads);
                text.append(String.format("  p=%d  %.2f ms total, %.1f us per step%n", threads, ms, ms * 1000 / STEPS));
            }
            text.append(System.lineSeparator());
        }
        if (experiments.contains("strong")) {
            for (int size : STRONG_SIZES) {
                text.append(String.format("Strong scaling, %d x %d%n", size, size)).append(header);
                table(text, samples, "strong", "", size, median(samples, "strong", "serial", size, 1));
            }
        }
        if (experiments.contains("weak")) {
            text.append("Weak scaling (Gustafson), cells per thread fixed; speedup = serial at that size / parallel\n");
            text.append(String.format("  %-8s %6s %11s %11s %9s%n", "p", "size", "serial ms", "parallel ms", "speedup"));
            for (int t = 0; t < THREADS.length; t++) {
                int size = WEAK_SIZES[t];
                double serial = median(samples, "weak", "serial", size, 1);
                double parallel = median(samples, "weak", "", size, THREADS[t]);
                text.append(String.format("  %-8d %6d %11.1f %11.1f %9.2f%n", THREADS[t], size, serial, parallel, serial / parallel));
            }
            text.append(System.lineSeparator());
        }
        if (experiments.contains("variants")) {
            double serial = median(samples, "variants", "serial", VARIANT_SIZE, 1);
            for (String variant : VARIANTS) {
                text.append(String.format("Variant %s, %d x %d%n", variant.isEmpty() ? "(default: static blocks, queue recorder, barrier)" : variant, VARIANT_SIZE, VARIANT_SIZE)).append(header);
                table(text, samples, "variants", variant, VARIANT_SIZE, serial);
            }
        }
        if (experiments.contains("shared")) {
            text.append("Shared Random vs per-cell random, 500 x 500, 100 steps\n");
            text.append(String.format("  %-8s %14s %14s %8s%n", "p", "per-cell ms", "shared ms", "ratio"));
            for (int threads : THREADS) {
                double own = median(samples, "shared", "", 500, threads);
                double shared = median(samples, "shared", "--random=shared", 500, threads);
                text.append(String.format("  %-8d %14.1f %14.1f %8.1f%n", threads, own, shared, shared / own));
            }
            text.append(System.lineSeparator());
        }
        Files.writeString(file, text);
        System.out.print(text);
    }

    static void table(StringBuilder text, List<Sample> samples, String experiment, String variant, int size, double serial) {
        text.append(String.format("  %-8s %11.1f %9.2f %10.0f%% %8s%n", "serial", serial, 1.0, 100.0, "-"));
        for (int threads : THREADS) {
            double parallel = median(samples, experiment, variant, size, threads);
            double speedup = serial / parallel;
            text.append(String.format("  %-8d %11.1f %9.2f %10.0f%% %8.3f%n", threads, parallel, speedup, speedup / threads * 100, karpFlatt(speedup, threads)));
        }
        text.append(System.lineSeparator());
    }
}
