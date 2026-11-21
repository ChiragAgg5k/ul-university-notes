<!-- Drafting notes for the author

Use the existing machine table once. Describe how Bench.java warms the JVM, captures the program timer and groups repeats. Check the shared-Random repeat cap at Bench.java:109. Verify power and background-load conditions from run notes before claiming them. Distinguish available performance cores from observed thread placement.
-->

The M2 Pro has eight performance cores and four efficiency cores. With eight workers the simulation also has a recorder to schedule. The benchmark ran on AC power. Core placement was not recorded, so the eight-worker timing spread in section 6.3 cannot be attributed to a particular core type. The largest grid contains four million byte-valued cells, about 4 MB of cell data before Java array overhead.
