"""Collapse Results/bench.csv into a median-per-configuration table."""

import collections
import csv
import statistics

rows = list(csv.DictReader(open('Results/bench.csv')))

groups = collections.OrderedDict()
for row in rows:
    key = (row['experiment'], row['variant'], int(row['arraySize']),
           int(row['threads']), int(row['threshold']))
    groups.setdefault(key, []).append((int(row['millis']), row['correct']))

baselines = {
    key[2]: statistics.median(m for m, _ in values)
    for key, values in groups.items() if key[0] == 'baseline'
}

header = f"{'variant':26}{'size':>12}{'thr':>5}{'threshold':>12}{'median':>8}{'min':>6}{'max':>6}{'speedup':>9}  correct"
print(header)
print('-' * len(header))
for key, values in groups.items():
    times = [m for m, _ in values]
    median = statistics.median(times)
    correct = all(c == 'true' for _, c in values)
    speedup = baselines[key[2]] / median if median > 0 and key[2] in baselines else 0.0
    print(f"{key[1]:26}{key[2]:>12}{key[3]:>5}{key[4]:>12}"
          f"{median:>8}{min(times):>6}{max(times):>6}{speedup:>9.2f}  {correct}")
