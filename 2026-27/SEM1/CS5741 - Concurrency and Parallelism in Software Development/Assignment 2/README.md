# CS5741 Assignment 2: Simulating Forest Fire Spread and Recovery

30% of the module. Due **Thu 26 Nov 2026, 23:59** (Week 12). Lecturer: Faeq Alrimawi. Brief read 20 Nov.

- [`Brief/CS5741_Assignment_2.pdf`](Brief/CS5741_Assignment_2.pdf): the assignment sheet (Brightspace dropbox 52676)
- No starter code is supplied: the serial version is mine to write too.

## Lecture references

- [Lecture 3: Parallel algorithms](../Lectures/Lecture%203%20W03_Parallel%20Algorithm.pdf): Foster's methodology and its four checklists (slides 24–39), static vs dynamic load balancing
- [Lecture 4: Common faults](../Lectures/Lecture%204%20W04_Common%20Faults.pdf): race conditions, deadlock
- [Lecture 6: Performance measurement](../Lectures/Lecture%206%20W07_Performance%20Measurement.pdf): speedup, efficiency, Amdahl, Gustafson–Barsis `S = (1 − p) + p·N` (slide 30), Karp–Flatt `ε = (1/S − 1/N) / (1 − 1/N)` (slides 33–36, including how to read ε rising with N as overhead)
- [Lecture 8](../Lectures/Lecture%208%20W09_Data%20Parallel%20Techniques_Part%201.pdf) and [Lecture 9](../Lectures/Lecture%209%20W10_Data%20Parallel%20Techniques_Part%202.pdf): data-parallel techniques
- [Lecture 10: Shared-memory techniques](../Lectures/Lecture%2010%20W11_Shared-Memory%20Techniques.pdf): mutex, `ReentrantLock`, semaphores, barriers

## What to submit

- [x] `ID26253925_Report.pdf`, fully typed with a title page (Assignment 1 lesson: no handwritten pages)
- [x] One or more `.java` files, each starting with a prominent comment giving my ID and name. No ZIP.

## The task

A torus-wrapped 2D grid of cells, each Empty, Tree or Burning. Each time step:

- Burning → Empty
- Tree → Burning with probability `burnProbability` if at least one of its 8 neighbours is Burning (the brief's corner rule, "diagonal opposite", implies the Moore neighbourhood)
- Empty → Tree with probability `growthProbability`

| Part | Weight | What it needs |
| --- | --- | --- |
| Parallel solution | 50% | Grid split across 2, 4, 8 threads; synchronisation so cells update consistently; a **separate task** that records the count of each state every step; grid size, steps, both probabilities adjustable; fixed random seed across thread counts. Report must link design to specific code segments, or "a significant penalty" |
| Performance measurement | 30% | Times per thread count, speedup and efficiency, Amdahl, Gustafson and Karp–Flatt, theoretical and practical |
| Report quality | 20% | Structure, clarity, accuracy, presentation; discuss where parallelism helped and where overhead or contention limited it |

**The constraint that shapes everything: only one grid.** No second grid for the next step. All updates happen in place, using synchronisation and temporary cell states.

Suggested sizes: develop on 10×10 with 10–50 steps; measure on 500×500 or larger with 400–1000 steps. Probabilities: growth 0.01–0.1, burn 0.1–0.5.

## AI usage rules (section 5 of the brief)

Same as Assignment 1. AI may help brainstorm, clarify writing and write small snippets. It may not write the whole or most of the report or code. **I write the simulation and the report myself.** Claude coaches, reviews, debugs and builds the benchmark tooling and report pipeline.

## Assignment 1 feedback to apply

From [`../../LESSONS.md`](../../LESSONS.md). Each one has a step in the plan below.

1. **Show the alternatives and the checklist.** For each design decision, list the options considered and why one was chosen. If Foster frames the design, answer his checklist for each step one by one.
2. **Cite the code for every decision.** Each design paragraph names the method and line numbers that implement it, or shows the excerpt. The brief repeats this requirement in bold terms.
3. **Derive the parallel fraction from the code.** Classify the statements: what runs once (setup, thread start, result output), what runs per step serially (barrier waits, the recorder hand-off), and what runs in the parallel region (the cell updates). Measured timings are only for comparison against that prediction. Karp–Flatt is then the natural way to show the gap between prediction and measurement.

## Design questions to decide (my decisions, recorded with reasons)

Each of these is a report paragraph with options, choice and a code reference.

**Decided 20 Nov** (reasons still to write in my own words):

| # | Decision | Benchmark comparison |
| --- | --- | --- |
| 1 | Two-phase step with transitional states, one writer per cell | none; boundary locks and checkerboard rejected by argument |
| 2 | Row blocks, static (one per thread) as the default | vs dynamic finer chunks (4p, 16p) |
| 3 | `CyclicBarrier`, long-lived workers | vs creating and joining threads every step |
| 4 | Workers count their own cells in the commit phase, hand counts over a `BlockingQueue` to a recorder thread | vs recorder scanning the grid behind a semaphore |
| 5 | Per-cell random value from `(seed, step, row, column)` | vs one shared `Random` (contention) |
| 6 | `(i + rows) % rows` on every neighbour lookup (simplest; precomputing neighbour rows noted as an optimisation not taken) | none |

1. **In-place update with one grid.** Reading a neighbour that another thread has already updated this step would be a race and change the result. Options:
   - Two-phase step with transitional states (e.g. `TREE_IGNITING`, `BURNING_OUT`, `EMPTY_GROWING`): phase 1 computes each cell's next state from the *old* meaning of its neighbours and writes a transitional state; barrier; phase 2 commits transitional states to final states; barrier. Each cell is written only by its owning thread.
   - Locks on partition boundary rows (mutex or `ReentrantLock` per boundary) so neighbours do not read half-updated rows. Finer-grained, but more contention and deadlock risk.
   - Red-black or checkerboard ordering. Changes the model's semantics, so probably reject and say why.
2. **Partitioning.** Row blocks vs column blocks vs 2D tiles vs cyclic rows, and chunk size. Row blocks keep memory contiguous (cache) and give each thread two boundary rows. Fire makes the load uneven (work differs between burning and quiet regions), which argues for testing a finer granularity or dynamic scheduling as a comparison. This is the "chunk sizes considered" point from Assignment 1.
3. **Synchronisation primitive between phases.** `CyclicBarrier` vs `Phaser` vs `CountDownLatch` per step vs joining and restarting threads each step. The brief names mutexes and semaphores, so justify the choice against them explicitly.
4. **The separate state-counting task (task parallelism).** Options:
   - Workers count their own rows during the commit phase and hand per-thread counts to a recorder thread through a `BlockingQueue` (or a semaphore-guarded buffer); the recorder sums and logs them. Recording never stalls the workers.
   - A recorder thread scans the whole grid after each step, guarded by a semaphore so workers wait while it reads. Simple, but serialises a full grid pass every step, and that shows up in Amdahl.
   - The barrier action of a `CyclicBarrier`. Runs on the last arriving worker, so it is not really a separate task.
5. **Randomness and the fixed seed.** One shared `Random` is a contention point and makes results depend on thread scheduling. Per-thread `Random` with a fixed seed is fast but the outcome changes with the thread count, so 2, 4 and 8 threads would not simulate the same forest. A per-cell value derived from `(seed, step, row, column)` gives identical grids for every thread count. That lets me check the parallel version against the serial one cell by cell, which is a strong correctness argument for the report.
6. **Torus neighbours.** Index with `(i + rows) % rows` or precomputed neighbour row indices. Note the cost of `%` in the hot loop.

## Plan

Fri 20 → Thu 26 Nov. Dev Paradigms presentation is Mon 23 morning; SE Evolution workshop Wed 25 morning and its video is due Wed 25 night.

1. [ ] **Fri 20–Sat 21: decide the design.** Answer the six questions above in my own words, with the alternatives. If using Foster as the frame, write the four steps and their checklists (slides 24–39).
2. [x] **Serial version, done 20 Nov** ([`Code/ForestFire.java`](Code/ForestFire.java); checked: state counts sum to the grid size, same seed gives the same run, fire spreads one ring per step at burnProbability 1, corners wrap; 1000² × 200 steps ≈ 2.0 s, about 10 ns per cell per step). Single-threaded, single grid, two-phase transitional states. This is the T₁ baseline and the reference output for correctness.
3. [x] **Parallel version, done 20 Nov** ([`Code/ForestFireParallel.java`](Code/ForestFireParallel.java)); `decide` and `commit` take a row range so both versions share one implementation. Threads 2, 4, 8 over row blocks, barrier between phases, recorder task, command-line arguments for grid size, steps, both probabilities, seed and thread count. Header and section comments as I go (SE Evolution lesson).
4. [x] **Correctness check**: on 20 Nov, 504 cases per variant compared the printed counts (first five steps and the final step) with the serial run. That shows matching counts, not matching cells, so on 21 Nov [`Code/Check/Cells.java`](Code/Check/Cells.java) compared the full grid cell by cell after every step count from 1 to 40: sizes 7, 37, 100; seeds 1, 42; threads 1, 2, 3, 4, 8, 16; all six deterministic variant combinations. 8640 grids, 0 mismatches. First cold timing at 1000² × 200 steps: serial 2.11 s, 1 thread 2.02 s, 2 threads 1.08 s, 4 threads 0.58 s, 8 threads 0.47 s. With per-cell randomness, every thread count must produce the same final grid and the same per-step counts as the serial run. Claude can write a small checker script.
5. [x] **Benchmark, run 20 Nov** on AC power, 5 repeats: [`Results/summary.txt`](Results/summary.txt), raw [`Results/bench.csv`](Results/bench.csv). **8-thread runs are noisy**: at 1000² the same configuration ranged 585–975 ms across 10 runs (strong and variants experiments), probably the macOS scheduler moving threads onto efficiency cores or background load. Report the spread, not just the median, or rerun p = 8 with more repeats. Harness: [`Code/Benchmark/Bench.java`](Code/Benchmark/Bench.java) runs both programs' own `main` in one JVM after 2 warm-ups, reads their `Time:` line, checks every deterministic run against the serial counts, and writes `Results/bench.csv` plus `Results/summary.txt` (speedup, efficiency, Karp–Flatt). Experiments at 400 steps: overhead (one row per thread), strong {500, 1000, 2000}², weak {707, 1000, 1414, 2000}² for p = 1, 2, 4, 8, variants at 1000², shared `Random` at 500² × 100 steps. Full run about 15 minutes. Command, from `Code/`: `javac -d /tmp/ff ForestFire.java ForestFireParallel.java Benchmark/Bench.java && java -cp /tmp/ff Bench ../Results 5 > ../Results/bench.log`. Earlier plan text: Reuse [`../Assignment 1/Code/Benchmark/Bench.java`](../Assignment%201/Code/Benchmark/Bench.java): warm-ups, median of several runs, AC power. Strong scaling: grids {500, 1000, 2000}², 1000 steps, threads {1, 2, 4, 8}, optionally 12. Weak scaling for Gustafson: grow rows with threads (e.g. 500×500 at 1 thread → 4000×500 at 8). Time the recorder separately to show its cost.
6. [x] **Analysis written 20 Nov** ([`Report/Sections/analysis.md`](Report/Sections/analysis.md), my text): Amdahl from an operation count of the code (queue f ≈ 1.5×10⁻⁷ at 1000², scan f ≈ 0.091), compared with Karp–Flatt; Gustafson against weak scaling. Still to add: one sentence on once-per-run costs, one citing serial time growing 7.89× for 8× the cells, why 2000² for Karp–Flatt but 1000² for the gap, and real table/figure numbers for the trailing labels. Original plan: Speedup and efficiency tables; Amdahl from the code-derived serial fraction (lesson 3); Gustafson against the weak-scaling run; Karp–Flatt ε per thread count, and whether it rises with p (overhead) or stays flat (serial code). Graphs via a `charts.py` like Assignment 1's.
7. [ ] **Wed 25–Thu 26: write the report.** Pipeline ready 20 Nov: write each section as Markdown in [`Report/Sections/`](Report/Sections) (`introduction`, `design`, `implementation`, `correctness`, `machine`, `discussion`, `conclusion`, `references`, `ai-statement`; `analysis` is done), then run `python3 -I Report/build.py` to rebuild [`Report/ID26253925_Report.pdf`](Report/ID26253925_Report.pdf). Missing sections show as red boxes listing what to cover; result tables and the four figures come from `Results/bench.csv`. Maths in `\( \)` and `\[ \]` renders via pandoc MathML. Original plan: Sections: introduction and machine; design (each decision with alternatives and code references); implementation walkthrough with excerpts; correctness; performance; discussion of where parallelism helped and where barriers, the recorder and E-cores limited it; conclusion; AI-use statement. Build pipeline adapted from Assignment 1's `build.py`.
8. [x] **Submitted 21 Nov** by Chirag: `ID26253925_Report.pdf` (build `7b8ca82`), `ForestFire.java`, `ForestFireParallel.java`. Submission ID 1083049, received 21 Nov 13:28 GMT. Open at submission: the AI statement credits Chirag with the serial code outline that Claude wrote, and by its own account Codex implemented most of the code and drafted most of the report (brief section 5). Original step: Walk the report against the [LESSONS.md](../../LESSONS.md) checklist, check file names and ID comments, submit before 23:59.

## Machine

Same as Assignment 1: Apple M2 Pro, 8 performance + 4 efficiency cores, 32 GB, OpenJDK 27. At 8 threads all can run on P-cores; any comparison at 12 brings in the slower E-cores and is a good discussion point for load imbalance at the barrier.

## Pitfalls to avoid

- **Reading a neighbour already updated this step.** The whole point of the transitional states and the barrier. Phase 1 must treat `TREE_IGNITING` as Tree and `BURNING_OUT` as Burning when reading neighbours.
- **Visibility.** Plain array writes by one thread are only guaranteed visible to another after a happens-before edge. The barrier provides it; say so in the report.
- **Shared `Random`.** Contended and nondeterministic across thread counts. See design question 5.
- **The recorder reading a grid that is being updated.** Hand it counts, or make the workers wait for it, but never let it scan while phase 1 runs.
- **Printing in the timed region.** Logging every step to the console will dominate the run time. Buffer the counts and write them out after timing stops.
- **Too small a grid.** At 500×500 one step is only 250k cells, so barrier cost per step is visible. That is a finding, not a bug, but use larger grids too.
