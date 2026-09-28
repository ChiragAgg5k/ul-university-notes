import java.util.concurrent.RecursiveTask;
import java.util.concurrent.ForkJoinPool;
import java.util.Random;

public class ParallelSum {

    public static void main(String[] args) {

        // Display the number of processors/cores, indicating how many tasks (threads) can potentially run in parallel
        int processors = Runtime.getRuntime().availableProcessors();
        System.out.println("Available processors (cores): " + processors);

        //****Try changing the size of the array
        int arraySize = 100_000_000;
        int[] array = generateArray(arraySize);

        ForkJoinPool pool = new ForkJoinPool();

        long startTime = System.nanoTime();

        SumTask task = new SumTask(array, 0, array.length);
        long sum = pool.invoke(task);

        long endTime = System.nanoTime();
        System.out.println("Parallel Sum: " + sum);
        System.out.println("Time taken: " + (endTime - startTime) / 1_000_000 + " ms");
    }

    private static int[] generateArray(int size) {
        Random random = new Random();
        int[] array = new int[size];
        for (int i = 0; i < size; i++) {
            array[i] = random.nextInt(10);
        }
        return array;
    }
    private static class SumTask extends RecursiveTask<Long> {
        private final int[] array;
        private final int start;
        private final int end;

        //**** try changing this value to see the impact
        private static final int THRESHOLD = 100_000;

        public SumTask(int[] array, int start, int end) {
            this.array = array;
            this.start = start;
            this.end = end;
        }

        @Override
        protected Long compute() {
            if (end - start <= THRESHOLD) {
                long sum = 0;
                for (int i = start; i < end; i++) {
                    sum += array[i];
                }
                return sum;
            } else {
                int mid = (start + end) / 2;
                SumTask leftTask = new SumTask(array, start, mid);
                SumTask rightTask = new SumTask(array, mid, end);

                leftTask.fork(); // Start left task asynchronously
                long rightResult = rightTask.compute(); // Compute right task synchronously
                long leftResult = leftTask.join(); // Wait for left task and get result

                return leftResult + rightResult;
            }
        }
    }

    

}





