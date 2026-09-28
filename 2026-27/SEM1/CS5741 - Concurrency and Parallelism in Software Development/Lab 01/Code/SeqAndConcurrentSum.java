import java.util.Random;

public class SeqAndConcurrentSum {
    
    private static long sum = 0;

    public static void main(String[] args) {

        // Display the number of processors/cores
        int processors = Runtime.getRuntime().availableProcessors();
        System.out.println("Available processors (cores): " + processors);

        //****Try changing the size of the array
        int arraySize = 100_000_000;
        int[] array = generateArray(arraySize);

        runSequential(array);

        //**** Try changing the number of threads */
        int numOfThreads = 2;
        runConcurrent(array, numOfThreads);

    }

    private static int[] generateArray(int size) {

        Random random = new Random();
        int[] array = new int[size];
        for (int i = 0; i < size; i++) {
            array[i] = random.nextInt(10);
        }
        return array;

    }


    private static void runConcurrent(int [] array, int numOfThreads) {
       
        long startTime = System.nanoTime();

        Thread [] threads  = new Thread[numOfThreads];
        int chunkSize = array.length / numOfThreads;

        for (int i=0; i<numOfThreads; i++) {
            int start = i * chunkSize;
            int end = (i == numOfThreads - 1) ? array.length : start + chunkSize;
            threads[i] = new Thread(() -> addRange(array, start, end));
            threads[i].start();
        }

        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        long endTime = System.nanoTime();

        System.out.println("Concurrent Sum: " + sum);
        System.out.println("Time taken: " + (endTime - startTime) / 1_000_000 + " ms");
    }


    private static synchronized void addRange(int[] array, int start, int end) {

        for (int i = start; i < end; i++) {
            sum += array[i];
        }
    }



    private static void runSequential(int [] array) {

        long startTime = System.nanoTime();

        long sum = 0;

        for (int value : array) {
            sum += value;
        }

        long endTime = System.nanoTime();

        System.out.println("Sequential Sum: " + sum);

        System.out.println("Time taken: " + (endTime - startTime) / 1_000_000 + " ms");
    }

}


