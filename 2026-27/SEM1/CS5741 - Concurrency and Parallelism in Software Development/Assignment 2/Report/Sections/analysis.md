### Amdahl’s law and the default queue recorder

The code gives an estimated serial fraction of f ≈ 1.5×10⁻⁷ at 1000×1000. The estimate applies to the timed simulation. Grid initialisation finishes before the serial timer starts, and printing begins after it stops (ForestFire.java:40–50).

| Frequency | Work inside the timed region | Code |
|---|---|---|
| Once per parallel run | Main starts the recorder, creates and starts the workers, and joins them. Timing ends after the recorder finishes. | ForestFireParallel.java:168–176, 190–215 |
| Every step, outside the serial cell loops | The serial runner tests the step loop, allocates a three-element count array, and stores the result in history[step]. | ForestFire.java:44–47, 130–133 |
| Every step, across workers | Each worker applies decide and commit to its assigned rows. The decision includes three mix calls per cell and up to eight neighbour reads for a tree. Commit converts the state and increments its count in the same pass. | ForestFireParallel.java:141–148; ForestFire.java:90–104, 109–125, 137–149, 155–166 |
| Every step, coordinating workers | Workers meet at two barriers and each enqueues one count array. The recorder takes each array and adds its three values. This aggregation can overlap the next step. | ForestFireParallel.java:103–109, 136, 201–210 |

Counting roughly 3 fixed operations per step and 20 operations per cell across the two passes gives

\[
f_{\rm queue}(N)\approx\frac{3}{3+20N^2}.
\]

The step count cancels because both terms repeat every step. This gives 6.0×10⁻⁷ at N=500 and 1.5×10⁻⁷ at N=1000. Under this operation-count model, f<10⁻⁵ for N≥500. The estimate gives an order of magnitude: it assigns equal weight to operations, and the actual neighbour search can return early.

Amdahl’s law, Sₚ=1/[f+(1-f)/p], therefore predicts approximately 2×, 4× and 8×. On 2000×2000, measured strong-scaling speedups were 1.98×, 3.90× and 6.03×, with Karp–Flatt effective serial fractions of 0.008, 0.009 and 0.047. The code’s fixed bookkeeping is the same at each worker count. The rise in the effective fraction at eight workers shows that the measured scaling loss includes costs that grow with concurrency. On 1000×1000, the eight-worker coordination benchmark took 25.27 ms over 400 steps, accounting for about 6% of the 404.4 ms gap between ideal and measured strong-scaling time. Dynamic chunk allocation improved the eight-worker variant median from 674.1 to 595.6 ms, consistent with some loss from uneven worker finish times (ForestFireParallel.java:120–129). Benchmark results

### Amdahl’s law and the scanning recorder

The scan introduces serial work proportional to the grid area. After committing their rows, workers release a committed permit and wait on scanned (ForestFireParallel.java:131–135). The recorder acquires all permits, reads every cell, increments its state total, and releases the workers (ForestFireParallel.java:92–100). That places the entire scan on the critical path every step.

Counting about 2 operations per cell for the scan and 20 per cell in total for decision and commit gives \(f_{\rm scan}\approx 2N^2/(2N^2+20N^2)=0.091\). Unlike the queue runner’s fixed bookkeeping, this estimated fraction persists as the grid grows. Using that estimate, Amdahl predicts 4.89× at eight workers. The measured speedup against the true serial baseline was 2.89×, and measured Karp–Flatt values were 0.271, 0.234 and 0.252 at 2, 4 and 8 workers. Scan variant results

The code thus predicts a substantial, roughly fixed serial component, while the measurements put its effective value closer to 25%. Waiting through the scan is already included in the 9.1% prediction. The remaining gap can include semaphore hand-off and wake-up time, the memory cost of a separate full-grid pass, and the limits of equal-weight operation counting. The comparison also uses a serial baseline that counts during commit and avoids the extra pass (ForestFire.java:137–147). The timings do not isolate those contributions.

### Gustafson’s law and weak scaling

Gustafson’s law uses the serial share of the scaled run, \(f_{\rm scaled}\). With cells per worker held roughly constant, each worker retains a substantial block of cell work, and the default recorder adds only three counts per worker per step (ForestFireParallel.java:103–109, 141–148). Taking \(f_{\rm scaled}\approx0\) as the ideal prediction gives \(S_{\rm scaled}=p-f_{\rm scaled}(p-1)\approx p\).

| Workers | Grid | Predicted scaled speedup | Measured scaled speedup |
|---:|---:|---:|---:|
| 1 | 707×707 | 1.00× | 1.00× |
| 2 | 1000×1000 | 2.00× | 1.97× |
| 4 | 1414×1414 | 4.00× | 3.82× |
| 8 | 2000×2000 | 8.00× | 7.04× |

At eight workers the simulation achieved 88% of ideal scaled speedup. Increasing the workload kept more time in the cell loops, but each phase still finished at the pace of its slowest worker and required a barrier and recorder hand-off. The measurements support that overhead explanation. They leave the contributions of memory bandwidth and efficiency-core scheduling unresolved. Weak-scaling results
