<!-- Drafting notes for the author

Compare the 2000×2000 Karp–Flatt series with the scan recorder series in section 6. Explain which dependency each trend is consistent with. Keep the 1000×1000 strong-scaling median and variant median attached to their respective series. Use their ten-run range when discussing confidence in the eight-worker comparisons. Identify the profiling measurement needed to distinguish load imbalance, memory bandwidth and core placement.
-->

On the 2000 × 2000 grid, increasing the worker count from two to four raised speedup from 1.98 to 3.90. At eight workers it reached 6.03. The smaller 500 × 500 grid reached 3.85 at eight workers: the same two barriers and count hand-offs recur each step with fewer cells to process between them.

The variant comparisons isolate design choices within the same benchmark series. At eight workers on the 1000 × 1000 grid, dynamic scheduling with sixteen chunks per worker achieved 6.81× against 6.02× for fixed blocks. Starting threads for each phase reduced speedup to 4.72×. Scanning the whole grid held the effective serial fraction near 0.25 across worker counts. The largest slowdown came from the shared generator: on the 500 × 500 random-number experiment it took 165 times as long as per-cell draws at eight workers.

The default 1000 × 1000 configuration took 586 to 975 ms across ten eight-worker runs. Its strong-scaling median gives 4.50× and its variant-series median gives 6.02×, each against the serial median for that series. The chunk comparison is consistent with uneven work, and the small-grid overhead measurement accounts for only part of the shortfall. The timings do not separate load imbalance, bandwidth limits, background activity or placement on efficiency cores.
