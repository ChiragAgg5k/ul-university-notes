import java.util.Random;

public class SequentialSum {

    public static void main(String[] args) {

        int[] array = generateArray(1_000_000_000);

        long startTime = System.nanoTime();

        long sum = 0;

        for (int value : array) {
            sum += value;
        }

        long endTime = System.nanoTime();

        System.out.println("Sequential Sum: " + sum);
        System.out.println("Time taken: " + (endTime - startTime) / 1_000_000 + " ms");
    }

    private static int[] generateArray(int size) {
        Random random = new Random();
        int[] array = new int[size];
        for (int i = 0; i < size; i++) {
            array[i] = random.nextInt(100);
        }
        return array;
    }
}
