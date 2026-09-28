# Lab 1 — Sequential vs Concurrent vs Parallel

Worked answers to the four tasks in the handout, plus the measurements they are based on.

## Test machine

| | |
|---|---|
| CPU | Apple M2 Pro — 12 cores (8 performance + 4 efficiency) |
| RAM | 32 GB unified |
| JDK | OpenJDK 26.0.2.1 (Homebrew), 64-bit Server VM |
| Heap | `-Xmx12g -Xms12g` |
| `availableProcessors()` | 12 → default `ForkJoinPool` parallelism 11 |

Method: every configuration runs 3 untimed warm-up iterations (so the JIT has compiled the loop) then 5 timed iterations. Tables below quote the **median** of the 5. Array generation is outside every timed region, as in the supplied files. Raw data in `../Results/bench.csv`, median table in `../Results/summary.txt`, harness in `../Code/Experiments/Bench.java`.

Important: **without warm-up the first run of any variant is 2–5× slower** than the rest, because it executes interpreted before C2 compiles it. If you run the supplied files as-is, one run per JVM launch, most of what you measure is JIT compilation rather than the algorithm. That alone explains a lot of confusing lab results.

## 2.1 Run and compare

At 100M elements:

| Approach | Median | vs sequential |
|---|---|---|
| Sequential | 37 ms | 1.00× |
| Concurrent, as shipped (2 threads) | 41 ms | 0.90× — **slower** |
| Concurrent, fixed (12 threads) | 7 ms | 5.29× |
| Parallel fork/join (threshold 1M) | 6 ms | 6.17× |

The headline result: **the supplied concurrent version is never faster than sequential, at any thread count.** That is not measurement noise, and it is the whole point of the exercise — see §2.3.

The fork/join version and the *fixed* concurrent version land in the same place, because at that point they are doing the same thing: split the array into disjoint chunks, sum each chunk into a private accumulator, add the partials at the end. Fork/join just does the splitting recursively and hands the pieces to a work-stealing pool instead of to threads you created yourself.

Why the ceiling is ~6–9× and not 12×: summing an `int[]` is **memory-bandwidth bound**, not compute bound. Each element is touched once, one add, then never used again — there is no reuse for the cache to exploit. Past a handful of threads you saturate the memory controller and extra cores have nothing to wait on but RAM. The 4 efficiency cores also contribute less than the 8 performance cores, so scaling flattens rather than stopping abruptly.

## 2.2 Array size

| Approach | 100M | 200M | Ratio |
|---|---|---|---|
| Sequential | 37 ms | 75 ms | 2.03× |
| Concurrent, as shipped (8 threads) | 40 ms | 75 ms | 1.88× |
| Concurrent, fixed (16 threads) | 5 ms | 10 ms | 2.00× |
| Parallel fork/join (threshold 100k) | 8 ms | 8 ms | 1.00× |

Doubling the array doubles the time for everything that is actually limited by scanning memory — the work is O(n) and there is nothing else going on. Clean linear scaling is the expected answer here.

The fork/join row looks like it breaks that rule, but it doesn't: at 100M the run is short enough (8 ms) that pool start-up and task overhead are a visible fraction of it. At 200M the same fixed overhead is amortised over twice the work, so *efficiency* improves — speedup rises from 4.6× to 9.4× — and the wall-clock happens to come out level. The general lesson is that **the bigger the problem, the better parallelism pays**, because fixed overheads are paid once regardless of n. Conversely, for small arrays parallel is a net loss.

## 2.3 Number of threads

Two variants, same array (100M), same chunking:

| Threads | As shipped (`synchronized`) | Fixed (local sums) |
|---|---|---|
| 1 | 38 ms | 37 ms |
| 2 | 41 ms | 26 ms |
| 3 | 37 ms | 15 ms |
| 4 | 37 ms | 10 ms |
| 6 | 52 ms | 9 ms |
| 8 | 40 ms | 11 ms |
| 12 | 39 ms | 7 ms |
| 16 | 42 ms | 5 ms |
| 24 | 38 ms | 6 ms |

### Why the shipped version is a flat line

```java
private static synchronized void addRange(int[] array, int start, int end) {
    for (int i = start; i < end; i++) {
        sum += array[i];
    }
}
```

`static synchronized` acquires the lock on the `SeqAndConcurrentSum.class` object, and holds it for **the entire loop**, not per element. So thread 2 cannot start until thread 1 has finished its whole chunk. The threads run one after another; the total work is identical to the sequential loop, plus thread creation and context switching. Adding threads adds overhead and nothing else, which is exactly what the flat 37–52 ms column shows.

This is the distinction the module is built on: the shipped code is **concurrent** (several threads exist and make progress in an interleaved fashion) but not **parallel** (they never execute at the same instant). Concurrency is a structuring property; parallelism is an execution property. You can have either without the other.

### The fix

Give each thread a private accumulator and combine once at the end:

```java
long[] partials = new long[numOfThreads];
// each thread: long local = 0; for (...) local += array[j]; partials[index] = local;
// after join: total = sum of partials
```

No lock is held during the loop, so the chunks genuinely run at the same time. This is the **map-reduce / privatisation** pattern, and it is the standard answer whenever threads are accumulating into shared state.

Reading the fixed column: near-linear to 4 threads (3.7×), then diminishing returns as memory bandwidth saturates, best around 16 threads (7.4×), then slightly worse at 24 where you have twice as many threads as cores and pay for the scheduling. **Rule of thumb: threads ≈ cores for CPU-bound work.** More than that only helps when threads block on I/O.

### Why not just remove `synchronized`?

Because `sum += array[i]` is read-modify-write, not atomic, so concurrent threads overwrite each other's updates. Measured on 10M elements with 8 threads, expected sum 45,005,980:

| Attempt | Observed | Updates lost |
|---|---|---|
| 1 | 13,372,476 | 70.3% |
| 2 | 14,488,363 | 67.8% |
| 3 | 8,920,700 | 80.2% |
| 4 | 8,510,188 | 81.1% |
| 5 | 8,069,736 | 82.1% |

Every run is wrong, differently wrong, and short by more than two-thirds. Note the failure mode: no exception, no crash, just a plausible-looking number. `AtomicLong` or a `LongAdder` would fix correctness, but per-element atomics on a hot loop are far slower than privatisation. **Don't share the accumulator at all** is the better fix.

## 2.4 Fork/join threshold

`THRESHOLD` is the chunk size at which `SumTask` stops splitting and just does the loop. It sets the leaf size, and therefore the number of tasks: roughly `arraySize / THRESHOLD`.

| Threshold | 100M | 200M | Leaf tasks @100M |
|---|---|---|---|
| 1,000 | 26 ms | 14 ms | ~100,000 |
| 10,000 | 13 ms | 9 ms | ~10,000 |
| 100,000 *(default)* | 8 ms | 8 ms | ~1,000 |
| **1,000,000** | **6 ms** | **8 ms** | ~100 |
| 10,000,000 | 8 ms | 9 ms | ~10 |
| 100,000,000 | 37 ms | 37 ms | 1 (or 2 @200M) |
| 200,000,000 | 37 ms | 74 ms | 1 |

A U-shaped curve, with the optimum on this machine at **~1,000,000 for 100M elements** (6 ms, 6.2×). Both ends are bad for opposite reasons:

- **Too small** — every split allocates a `SumTask`, pushes it to a deque, and later joins it. At threshold 1,000 you create ~100,000 tasks to do ~1,000 additions each; the bookkeeping costs more than the arithmetic. Classic over-decomposition.
- **Too large** — not enough tasks to fill the pool. At threshold = array length there is exactly one leaf, so it runs on one thread and you have written a slow sequential program. The 200M/100M row is a nice check on this: 100M threshold splits 200M into exactly two tasks, giving precisely 2.03× — the parallelism you asked for and no more.

The flat floor from 100k to 10M is worth noticing. The optimum is a **broad plateau, not a sharp point** — anything giving you somewhere between a few times and a few tens of times as many tasks as cores works fine. That is the practical guidance: aim for enough tasks that work-stealing can balance the load (so more than one per core), but large enough leaves that per-task overhead disappears into the work.

## Summary

1. Concurrency is not parallelism. The shipped "concurrent" version has real threads and zero speedup.
2. A lock held across a whole loop serialises that loop completely. Lock *granularity* is what matters, not lock *presence*.
3. Shared mutable accumulators are either slow (locked/atomic) or wrong (unlocked). Give each worker private state and combine at the end.
4. Speedup is capped by the bottleneck resource. For array summing that is memory bandwidth, so ~6–9× on 12 cores, not 12×.
5. Parallelism has fixed overheads, so it pays off in proportion to problem size.
6. Task granularity is a U-curve with a wide flat bottom: too fine drowns in overhead, too coarse starves the pool.
7. Always warm up the JVM before timing anything.

## Reproducing

```sh
# from the Lab 01 directory
java -Xmx12g -Xms12g Code/Experiments/Bench.java > Results/bench.csv 2> Results/bench.log
python3 Code/Experiments/summarise.py > Results/summary.txt
```

Original unmodified files from Brightspace are in `../Code/`; the harness in `../Code/Experiments/` is separate and leaves them untouched.
