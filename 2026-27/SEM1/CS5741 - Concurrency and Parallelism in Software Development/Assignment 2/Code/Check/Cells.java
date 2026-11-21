import java.io.OutputStream;
import java.io.PrintStream;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/*
 * Correctness checker for ForestFireParallel (testing tooling, not part of the submission).
 *
 * For grid sizes 7, 37 and 100, seeds 1 and 42, every step count from 1 to 40, threads 1, 2, 3, 4, 8 and 16,
 * and every deterministic variant, it runs the parallel simulation and compares the final grid cell by cell
 * with the serial grid after the same number of steps. Reflection reaches the private grid without changing
 * the submitted code.
 *
 * Usage, from Code/: javac -d /tmp/ff ForestFire.java ForestFireParallel.java Check/Cells.java && java -cp /tmp/ff Cells
 */
public class Cells {
    public static void main(String[] x) throws Exception {
        Constructor<?> make = Class.forName("ForestFireParallel").getDeclaredConstructor(String[].class); make.setAccessible(true);
        Method run = make.getDeclaringClass().getDeclaredMethod("run"); run.setAccessible(true);
        Field gridField = make.getDeclaringClass().getDeclaredField("grid"); gridField.setAccessible(true);
        String[][] variants = {{}, {"--schedule=dynamic:1"}, {"--schedule=dynamic:16"}, {"--recorder=scan"}, {"--threads-per-step"}, {"--threads-per-step", "--schedule=dynamic:4", "--recorder=scan"}};
        PrintStream out = System.out; System.setOut(new PrintStream(OutputStream.nullOutputStream()));
        long cases = 0, bad = 0;
        for (int size : new int[]{7, 37, 100}) for (long seed : new long[]{1, 42}) {
            byte[][] serial = new byte[size][size]; ForestFire.initialise(serial, seed);
            for (int steps = 1; steps <= 40; steps++) {
                ForestFire.decide(serial, steps - 1, seed, 0.05, 0.4, 0, size); ForestFire.commit(serial, 0, size);
                for (int t : new int[]{1, 2, 3, 4, 8, 16}) for (String[] v : variants) {
                    List<String> a = new ArrayList<>(List.of(""+size, ""+steps, "0.05", "0.4", ""+seed, ""+t)); a.addAll(List.of(v));
                    Object sim = make.newInstance((Object) a.toArray(String[]::new)); run.invoke(sim);
                    cases++; if (!Arrays.deepEquals(serial, (byte[][]) gridField.get(sim))) { bad++; out.println("MISMATCH " + a); }
                }
            }
        }
        out.println(cases + " grids compared cell by cell, " + bad + " mismatches");
    }
}
