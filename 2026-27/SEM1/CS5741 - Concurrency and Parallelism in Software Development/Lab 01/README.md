# CS5741 Lab 1 — Sequential vs Concurrent vs Parallel

Week 2 lab. Compare three ways of summing a large `int[]` in Java and explain the timing differences.

- [`Handout/`](Handout) — the lab sheet from Brightspace
- [`Code/`](Code) — the three supplied files, unmodified: `SequentialSum.java`, `SeqAndConcurrentSum.java`, `ParallelSum.java`
- [`Code/Experiments/`](Code/Experiments) — `Bench.java`, a harness that runs all four tasks with JIT warm-up and repeated runs, plus `summarise.py`
- [`Results/`](Results) — `bench.csv` (raw), `summary.txt` (medians), `bench.log` (console output)
- [**`Notes/README.md`**](Notes/README.md) — **the worked analysis: start here**

## Headline result

On an M2 Pro (12 cores), 100M elements: sequential 37 ms, the supplied concurrent version 38–52 ms *at every thread count*, a corrected concurrent version 5 ms, fork/join 6 ms.

The supplied concurrent version never beats sequential because `addRange` is `static synchronized` and holds the class lock for its entire loop — the threads run one at a time. It is concurrent but not parallel, which is the point the lab is making.
