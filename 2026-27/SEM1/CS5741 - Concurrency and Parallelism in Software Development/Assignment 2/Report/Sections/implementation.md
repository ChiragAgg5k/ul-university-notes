<!-- Drafting notes for the author

Trace one default step from ForestFireParallel.java:201–210 through updateBlock at 141–148 into ForestFire.java:90–104 and 137–149. Track one worker's local counts through ForestFireParallel.java:136 to 103–109. Explain where the parallel timer starts and stops (190–215).
-->

The rules live in `ForestFire` and the threading in `ForestFireParallel`. Both programs initialise the same forest and call the same row-range decision and commit methods. The serial runner passes the full range and retains each step’s counts for printing after timing (ForestFire.java, lines 40–50).

Worker *t* owns rows from `t * size / threads` up to the exclusive bound `(t + 1) * size / threads`. The end of one block is the start of the next, including when the division is uneven. Each worker marks transitions, waits, commits and hands its counts to the recorder, then waits again. Main joins the workers and recorder before stopping the clock (ForestFireParallel.java, lines 136, 141–148 and 190–215).

The parallel command accepts the serial arguments (size, steps, growth probability, burn probability and seed), followed by the worker count. The benchmark selects alternatives with `--schedule=dynamic:16`, `--recorder=scan`, `--random=shared` and `--threads-per-step`. With no flags, it uses static row blocks, queued counts, per-cell draws and long-lived workers.

**Implementation excerpts.** Each expression below is taken from the submitted Java sources.

| Decision | Source excerpt | Location |
|---|---|---|
| Preserve the old burning state | `BURNING_OUT` | ForestFire.java, line 120 |
| Assign the last row bound | `int to = (int) ((block + 1L) * size / blocks);` | ForestFireParallel.java, line 143 |
| Separate the phases | `barrier.await();` | ForestFireParallel.java, line 206 |
| Hand counts to the recorder | `queue.put(new Counts(step, counts));` | ForestFireParallel.java, line 136 |
| Aggregate by state | `totals[state] += counts.values()[state];` | ForestFireParallel.java, line 108 |
| Select the random source | `random(seed, step, row, column)` | ForestFire.java, line 94 |
| Wrap the column | `int neighbourColumn = (column + dc + columns) % columns;` | ForestFire.java, line 118 |
