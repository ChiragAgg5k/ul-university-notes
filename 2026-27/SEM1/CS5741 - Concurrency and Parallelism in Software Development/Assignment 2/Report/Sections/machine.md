<!-- Drafting notes for the author

Use the existing machine table once. Describe how Bench.java warms the JVM, captures the program timer and groups repeats. Check the shared-Random repeat cap at Bench.java:109. Verify power and background-load conditions from run notes before claiming them. Distinguish available performance cores from observed thread placement.
-->

At eight workers the application has ten threads including the recorder and main, which waits during the simulation. That count fits within twelve cores, although JVM and system threads may also run. Java’s standard thread API provides no way to pin a worker to a particular macOS core. The OS chose where each worker ran, and the benchmark captured elapsed time without a scheduler trace. The benchmark ran on AC power.

A byte per cell gives payloads of 1 MB for the 1000 × 1000 grid and 4 MB for the 2000 × 2000 grid, before row objects and references. Both fit within one performance cluster’s 16 MiB L2 capacity. Reusing the grid for 400 steps makes sustained main-memory bandwidth a less likely explanation for the eight-worker slowdown. Actual cache residency, cross-cluster traffic and thread placement were unmeasured.
