<!-- Drafting notes for the author

Answer the scaling question with one fixed-size result and one growing-grid result. Choose one design trade-off supported by a within-series comparison. State one open measurement question about the eight-worker spread.
-->

With per-cell randomness and two synchronised phases, the parallel simulation reproduced the serial grid in all 8,640 cell-by-cell comparisons. On the largest fixed grid it achieved 3.90× speedup at four workers and 6.03× at eight. Growing the grid with the worker count gave 7.04× scaled speedup at eight workers.

Of the designs tested, counting during commit avoided a serial scan and per-cell draws avoided contention on a shared generator. Finer row chunks improved the eight-worker variant median. The spread between repeat runs limits how precisely that improvement can be estimated.
