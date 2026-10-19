# CS5741 Assignment 1: Parallel Numerical Integration

30% of the module. Due **Thu 22 Oct 2026, 23:59** (Week 7). Brightspace closes 23 Oct 09:00. Lecturer: Faeq Alrimawi.

- [`Brief/CS5741_Assignment_1.pdf`](Brief/CS5741_Assignment_1.pdf): the assignment sheet
- [`Brief/SerialIntegration.java`](Brief/SerialIntegration.java): the supplied serial code, unmodified

## Lecture references

- [Lecture 2: Identifying parallelisable problems](../Lectures/Lecture%202%20W02_Identifying%20Parallelisable%20problems.pdf): decomposability, independence and granularity; data vs task parallelism; Amdahl's Law (slides 42–47) and strong vs weak scaling
- [Lecture 3: Parallel algorithms](../Lectures/Lecture%203%20W03_Parallel%20Algorithm.pdf): ForkJoin and estimating the serial fraction (slides 9–10); RAW/WAR/WAW dependencies; static vs dynamic load balancing; Foster's methodology with its four checklists (slides 24–39); parallel patterns, including Map Reduce

## What to submit

**Resubmitted 19 Oct 2026, 12:17** (Brightspace submission ID 1025980) with a fully typed report, after the lecturer said handwritten pages are not accepted. First submitted 14 Oct (ID 1018364). Resubmissions are allowed until 22 Oct 23:59, and each one replaces the last.

Two files, uploaded together. Each upload overwrites the previous one.

- [x] `ID26253925_Report.pdf`
- [x] `ID26253925_Assignment1.java`, starting with a prominent comment giving my ID and name. The public class must be called `ID26253925_Assignment1` or the file will not compile.

## The task

Parallelise the trapezoidal rule for `f(x) = e^-x · sin(x)` on `[0, 10]`. Exact value: `½(1 − e^-10(sin 10 + cos 10)) = 0.5000313961543548`.

| Part | Weight | What it needs |
| --- | --- | --- |
| Foster's methodology | 40% | Partitioning, communication, agglomeration and mapping, each applied to this problem, with diagrams or pseudocode |
| Parallel implementation | 20% | Java with `Thread` and/or `ForkJoinPool`; design decisions, thread management, synchronisation |
| Performance analysis | 40% | Timings, actual speedup, Amdahl's theoretical speedup per combination, maximum theoretical speedup, graphs, machine specs and how they affect results |

Measurement grid: n ∈ {10M, 100M, 500M} × threads ∈ {2, 4, 8, 16}, plus serial for each n.

## AI usage rules (section 4 of the brief)

AI may help brainstorm, clarify writing and produce small snippets. It may not write the whole report, most of it, or most of the code. **I write the parallel class and the report myself.**

## Machine

- Apple M2 Pro: 12 cores, 8 performance and 4 efficiency, no SMT (12 logical CPUs)
- 32 GB RAM
- OpenJDK 27 (2026-09-15)

How this shapes the results:

- 16 threads is more than the 12 cores, so expect no gain past 12, and possibly a small loss from context switching.
- The efficiency cores are slower. With equal static chunks, threads that land on an efficiency core finish last and hold up the join. Expect speedup to flatten between 8 and 12 threads. That is a good point to discuss, and a reason to try a ForkJoin or finer-grained version as a comparison.

## Serial baseline (first look)

`java SerialIntegration` with n = 10M, run cold three times: **~104 ms**, result `0.5000313961542867`, error ~7e-14.

The cold number includes JIT warm-up. Final measurements need warm-up runs and the median of several repeats. The harness in [`../Lab 01/Code/Experiments/Bench.java`](../Lab%2001/Code/Experiments/Bench.java) already does this.

## Plan

1. [x] **Foster design** (handwritten, scanned into the report; pages in [`Report/Foster/`](Report/Foster)):
   - [x] Partitioning, done 10 Oct: [page 1](Report/Foster/partitioning-1.jpeg) (domain decomposition, variables, sketch, task properties) and [page 2](Report/Foster/partitioning-2.jpeg) (why the endpoints get weight ½)
   - [x] Communication, done 14 Oct: no communication between tasks; one global, structured sum reduction at the end; centralised vs tree reduction against the slide 32 checklist. Scan: [`Report/Foster/communication.jpeg`](Report/Foster/communication.jpeg).
   - [x] Agglomeration, done 14 Oct: contiguous blocks, one per thread; n + 1 values become p partial sums; block vs cyclic; remainder handling; slide 35 checklist (task count only partly scales). Scan: [`Report/Foster/agglomeration.jpeg`](Report/Foster/agglomeration.jpeg). Explorer: https://claude.ai/artifact/6DXGSsUG6p8WGio8wSe4e9
   - [x] Mapping, done 14 Oct: static, one block per thread; OS maps threads to cores; efficiency-core imbalance at p ≥ 12; oversubscription at 16; ForkJoin as the dynamic alternative; slide 39 checklist. Scans: [`mapping.jpeg`](Report/Foster/mapping.jpeg), [`summary.jpeg`](Report/Foster/summary.jpeg).
   - Notation: p = number of threads everywhere. Amdahl uses s = serial fraction: S(p) = 1 / (s + (1 − s)/p), max = 1/s. State this once at the top of the report, because the slides use p for the parallel fraction.
2. [x] **Implement** [`Code/ID26253925_Assignment1.java`](Code/ID26253925_Assignment1.java): `java ID26253925_Assignment1 <n> <p>`.
3. [x] **Check correctness**: matches serial within 1.1e-13 on 64 (n, p) cases; error vs exact ≤ 6e-14 at 500M.
4. [x] **Benchmark** (14 Oct, AC power): [`Code/Benchmark/Bench.java`](Code/Benchmark/Bench.java), 3 warm-ups, median of 7. Raw data in [`Results/bench.csv`](Results/bench.csv), medians in [`Results/summary.txt`](Results/summary.txt), plus thread overhead measured at n = 1. **Pick up at step 5.**
5. [x] **Estimate the serial fraction**: s = T_overhead(p = 16) / T_serial(n), one value per n. Handwritten as Figures 10–11 in [`Report/Amdahl/`](Report/Amdahl). Original notes: Time the parts that cannot run in parallel (thread creation and start-up, join, the final reduction, endpoint terms), or derive it from measured speedup with the Karp–Flatt metric. State which method I used.
6. [ ] **Compute** for each cell: actual `S = T_serial / T_parallel` (done, in the report draft), Amdahl `S(p) = 1 / (s + (1 − s)/p)`, and the maximum `1 / s`.
7. [x] **Graphs**: Figures 10–11 in the report, drawn by [`Report/charts.py`](Report/charts.py) from the benchmark medians (execution-time panels, plus actual vs ideal speedup with the 12-core line). Figure 14 compares measured speedup with Amdahl's Law for each n.
8. [ ] **Write the report**. Draft: [`Report/ID26253925_Report.pdf`](Report/ID26253925_Report.pdf), rebuilt with `python3 -I Report/build.py`. It holds the title page, notation, Figures 1–6 (Foster scans), machine specs and result tables; red boxes mark the sections still to write. Section 2 (Parallel Implementation) is done as Figures 7–8, from the handwritten pages in [`Report/Implementation/`](Report/Implementation). Section 3 (Machine Specifications) has the spec table plus the handwritten page as Figure 9 ([`Report/Machine/`](Report/Machine)). The benchmark was rerun on 14 Oct with p = 12 added. Discussion (Figures 15–16, sharing one page, with lighting evened out) and Conclusion (Figure 17) are done. The build pre-rotates and resizes the photos, which keeps the PDF to about 3 MB (19 pages).
9. [ ] **Submit** both files and check the names.

## Pitfalls to avoid

- **int overflow in chunk bounds.** `t * n / threads` overflows `int` when n = 500M (e.g. 15 × 500M > 2³¹). Use `long` for the bound arithmetic.
- **Shared accumulator.** Each thread keeps its own local sum, and the sums are combined after `join()`. A `synchronized` add inside the loop serialises the threads, which was the Lab 01 lesson.
- **Endpoints counted twice or not at all.** Add `0.5·(f(a) + f(b))` once, outside the chunks, and make sure each interior `i` from 1 to n−1 belongs to exactly one chunk.
- **The last digits will change.** Parallel summation reorders floating-point additions. Report the error against the exact value rather than expecting identical output.
- **Timing noise.** Plug in power, close heavy apps, and use the same JVM flags for every run.
