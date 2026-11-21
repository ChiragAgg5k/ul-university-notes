<!-- Drafting notes for the author

Frame the experiment around the fixed-seed, synchronous forest on a torus. State the single-grid constraint and identify the independently timed serial baseline. End with the question answered by varying both worker count and problem size.
-->

A forest occupies a square grid whose opposite edges meet. Each cell is empty, holds a tree, or is burning. A burning cell becomes empty after one step. A tree with at least one burning neighbour ignites with probability `burnProbability`, and an empty cell grows a tree with probability `growthProbability`. All eight neighbours count, including those across a corner.

Only one grid may hold cell states. Each update must preserve the old state for neighbours still making their decisions, which is why the algorithm uses temporary states.

The aim is to update one shared grid using 2, 4 and 8 workers while a separate task records the three population counts. A serial run supplies the reference trajectory and the timing baseline. Fixed-size experiments measure how much faster the same forest runs. Growing-grid experiments ask how much more forest the workers can process in roughly the same time. The strong-scaling runs use square grids of side 500, 1000 and 2000 for 400 steps, with growth probability 0.05 and ignition probability 0.3.

Sections 2–4 cover design, implementation and correctness. Sections 5–6 describe the machine and performance experiments, and sections 7–8 discuss the results and draw conclusions.
