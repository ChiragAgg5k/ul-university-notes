public class SerialIntegration {

   //f(x)
    public static double f(double x) {
       
        return Math.exp(-x) * Math.sin(x);  
    }

    // Trapezoidal Rule for numerical integration
    public static double trapezoidalRule(double a, double b, int n) {
        // Step size
        double h = (b - a) / n;
        
        // Initial sum with endpoints
        double sum = 0.5 * (f(a) + f(b));  
        
        for (int i = 1; i < n; i++) {
            double x = a + i * h;
            sum += f(x);
        }

        // Multiply by step size
        return sum * h;  
    }

    public static void main(String[] args) {
        // Lower bound
        double a = 0; 
        // Upper bound
        double b = 10;   
        // intervals
        int n = 10_000_000;  

        long startTime = System.nanoTime();
        double result = trapezoidalRule(a, b, n);
        long endTime = System.nanoTime();

        System.out.println("Result of integration: " + result);
        System.out.println("Execution Time (ms): " + (endTime - startTime) / 1_000_000.0);
    }
}
