"""Assemble the report from my written sections and the benchmark results.

Usage: python3 -I build.py
Sections are Markdown files in Sections/, converted with pandoc (maths as MathML). A section that
does not exist yet is shown as a red box listing what it must cover. Result tables and figures are
generated from Results/bench.csv. The page is printed with headless Chrome to ID26253925_Report.pdf.
"""

import csv
import re
import statistics
import subprocess
import sys
import tempfile
from collections import defaultdict
from html import escape
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import charts  # noqa: E402
from charts import Series  # noqa: E402

RESULTS = HERE.parent / 'Results' / 'bench.csv'
SECTIONS = HERE / 'Sections'
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
THREADS = [1, 2, 4, 8]
STRONG = [500, 1000, 2000]
WEAK = [707, 1000, 1414, 2000]
VARIANT_SIZE = 1000
VARIANTS = [
    ('', 'Static blocks (chosen)'),
    ('--schedule=dynamic:4', 'Dynamic, 4p chunks'),
    ('--schedule=dynamic:16', 'Dynamic, 16p chunks'),
    ('--recorder=scan', 'Scanning recorder'),
    ('--threads-per-step', 'Threads per step'),
]

Key = tuple[str, str, int, int]

TO_WRITE = {
    'introduction': ['The problem: the forest grid, the three states and the rules', 'Aim: data and task parallelism with synchronisation, then performance analysis', 'How the report is organised'],
    'design': ['Each of the six decisions in the plan: options considered, the choice and why', 'The one-grid constraint and the temporary states', 'Partitioning and chunk sizes, with the checklist answered', 'CyclicBarrier against mutexes and semaphores', 'The recorder task (task parallelism)', 'Per-cell randomness and the fixed seed', 'File and line references for every decision'],
    'implementation': ['Code structure: ForestFire (rules, shared) and ForestFireParallel (threads)', 'Excerpts: row partition, the two barriers, queue hand-off, recorder loop', 'Why each cell has one writer and how the barrier makes writes visible', 'The command-line options and what each variant changes'],
    'correctness': ['Serial vs parallel comparison: 504 cases, sizes 7, 37, 100, steps 1 to 40, two seeds, threads 1 to 16', 'Every variant except the shared Random matches exactly', 'The benchmark re-checks counts against the serial run before timing'],
    'machine': ['How the 8 performance and 4 efficiency cores affect results at p = 8', 'Memory bandwidth and cache for a byte grid of up to 4 MB'],
    'discussion': ['Where parallelism helped: near-linear up to 4 threads, weak scaling 7.04 at 8', 'Where overhead or contention limited it: shared Random 165x slower, scanning recorder, threads per step, uneven load', 'The noisy 8-thread timings and what they mean for the conclusions', 'Limits of the measurements'],
    'conclusion': ['What the design achieved', 'What the analysis showed', 'What I would change'],
    'references': ['Lecture slides used (3, 4, 6, 10)', 'Java API documentation (CyclicBarrier, LinkedBlockingQueue, Semaphore)', 'Any textbook, Harvard style'],
    'ai-statement': ['Which tools, for what, and what I did myself, in the style of the Assignment 1 table'],
}


def samples() -> dict[Key, list[float]]:
    found: dict[Key, list[float]] = defaultdict(list)
    with RESULTS.open() as file:
        for row in csv.DictReader(file):
            found[(row['experiment'], row['variant'], int(row['size']), int(row['threads']))].append(float(row['ms']))
    return found


def section(name: str) -> str:
    path = SECTIONS / f'{name}.md'
    if not path.exists():
        items = ''.join(f'<li>{escape(item)}</li>' for item in TO_WRITE[name])
        return f'<div class="todo"><b>To write: Sections/{name}.md</b><ul>{items}</ul></div>'
    # texmath has no {\rm ...}; \mathrm{...} renders the same upright text.
    source = re.sub(r'\{\\rm ([^}]*)\}', r'\\mathrm{\1}', path.read_text())
    converted = subprocess.run(['pandoc', '-f', 'markdown+tex_math_single_backslash', '-t', 'html', '--mathml',
                                '--shift-heading-level-by=1'],
                               input=source, capture_output=True, text=True, check=True).stdout
    return f'<div class="written">{converted}</div>'


def karp_flatt(speedup: float, threads: int) -> float:
    return (1 / speedup - 1 / threads) / (1 - 1 / threads)


def strong_table(time: dict[Key, float], experiment: str, variant: str, size: int) -> str:
    serial = time[(experiment, 'serial', size, 1)]
    rows = f'<tr><th>serial</th><td>{serial:,.1f}</td><td>1.00</td><td>100%</td><td>–</td></tr>'
    for p in THREADS:
        parallel = time[(experiment, variant, size, p)]
        speedup = serial / parallel
        epsilon = '–' if p == 1 else f'{karp_flatt(speedup, p):.3f}'
        rows += f'<tr><th>p = {p}</th><td>{parallel:,.1f}</td><td>{speedup:.2f}</td><td>{speedup / p * 100:.0f}%</td><td>{epsilon}</td></tr>'
    return f'<table><tr><th></th><th>Time (ms)</th><th>Speedup</th><th>Efficiency</th><th>Karp–Flatt ε</th></tr>{rows}</table>'


def results(found: dict[Key, list[float]]) -> str:
    time = {key: statistics.median(values) for key, values in found.items()}
    strong = ''.join(f'<h4>{n} × {n}</h4>{strong_table(time, "strong", "", n)}' for n in STRONG)

    spread_rows = ''
    for n in STRONG:
        values = found[('strong', '', n, 8)]
        spread_rows += f'<tr><th>Strong, {n} × {n}</th><td>{min(values):,.1f}</td><td>{statistics.median(values):,.1f}</td><td>{max(values):,.1f}</td></tr>'
    values = found[('variants', '', VARIANT_SIZE, 8)]
    spread_rows += f'<tr><th>Variants run, {VARIANT_SIZE} × {VARIANT_SIZE}</th><td>{min(values):,.1f}</td><td>{statistics.median(values):,.1f}</td><td>{max(values):,.1f}</td></tr>'

    weak_rows = ''
    weak_points = []
    for p, n in zip(THREADS, WEAK):
        serial, parallel = time[('weak', 'serial', n, 1)], time[('weak', '', n, p)]
        weak_rows += f'<tr><th>p = {p}</th><td>{n} × {n}</td><td>{serial:,.1f}</td><td>{parallel:,.1f}</td><td>{serial / parallel:.2f}</td></tr>'
        weak_points.append((p, serial / parallel))

    variant_serial = time[('variants', 'serial', VARIANT_SIZE, 1)]
    variant_rows = ''
    variant_series = []
    for flag, name in VARIANTS:
        speedups = [variant_serial / time[('variants', flag, VARIANT_SIZE, p)] for p in THREADS]
        variant_rows += f'<tr><th>{escape(name)}</th>' + ''.join(f'<td>{s:.2f}</td>' for s in speedups) + f'<td>{karp_flatt(speedups[-1], 8):.3f}</td></tr>'
        variant_series.append(Series(name, list(zip(THREADS, speedups))))

    shared_rows = ''
    for p in THREADS:
        own, shared = time[('shared', '', 500, p)], time[('shared', '--random=shared', 500, p)]
        shared_rows += f'<tr><th>p = {p}</th><td>{own:,.1f}</td><td>{shared:,.1f}</td><td>{shared / own:.1f}×</td></tr>'

    overhead_rows = ''.join(
        f'<tr><th>p = {p}</th><td>{time[("overhead", "", p, p)]:.2f}</td><td>{time[("overhead", "", p, p)] * 1000 / 400:.1f}</td></tr>' for p in THREADS)

    strong_series = [Series(f'{n} × {n}', [(p, time[('strong', 'serial', n, 1)] / time[('strong', '', n, p)]) for p in THREADS]) for n in STRONG]
    epsilon_series = [Series(f'{n} × {n}', [(p, karp_flatt(time[('strong', 'serial', n, 1)] / time[('strong', '', n, p)], p)) for p in THREADS[1:]]) for n in STRONG]
    epsilon_series.append(Series('Scanning recorder', [(p, karp_flatt(variant_serial / time[('variants', '--recorder=scan', VARIANT_SIZE, p)], p)) for p in THREADS[1:]]))

    return f'''
  <h3>6.2 Strong scaling</h3>
  <p class="note">Median of 5 runs, 400 steps. Speedup = serial time / parallel time; efficiency = speedup / p; ε = (1/S − 1/p) / (1 − 1/p).</p>
  {strong}
  <figure>{charts.lines(strong_series, THREADS, 8, [0, 2, 4, 6, 8], '×', True, 'Strong-scaling speedup')}<figcaption>Strong-scaling speedup for each grid size against the ideal S = p.</figcaption></figure>
  <h3>6.3 Spread of the eight-thread runs</h3>
  <table><tr><th></th><th>Min (ms)</th><th>Median (ms)</th><th>Max (ms)</th></tr>{spread_rows}</table>
  <h3>6.4 Weak scaling</h3>
  <p class="note">The grid grows with p so each thread keeps about 707² cells. Scaled speedup = serial time at that size / parallel time.</p>
  <table><tr><th></th><th>Grid</th><th>Serial (ms)</th><th>Parallel (ms)</th><th>Scaled speedup</th></tr>{weak_rows}</table>
  <figure>{charts.lines([Series('Measured', weak_points)], THREADS, 8, [0, 2, 4, 6, 8], '×', True, 'Weak-scaling speedup')}<figcaption>Weak-scaling (Gustafson) speedup against the ideal S = p.</figcaption></figure>
  <h3>6.5 Design variants</h3>
  <p class="note">{VARIANT_SIZE} × {VARIANT_SIZE}, 400 steps, one option changed from the chosen design. Serial median {variant_serial:,.1f} ms.</p>
  <table><tr><th>Variant</th>{''.join(f'<th>p = {p}</th>' for p in THREADS)}<th>ε at p = 8</th></tr>{variant_rows}</table>
  <figure>{charts.lines(variant_series, THREADS, 8, [0, 2, 4, 6, 8], '×', True, 'Speedup of each design variant')}<figcaption>Speedup of each design variant on {VARIANT_SIZE} × {VARIANT_SIZE}.</figcaption></figure>
  <h3>6.6 Shared Random against per-cell randomness</h3>
  <p class="note">500 × 500, 100 steps, median of 3 runs.</p>
  <table><tr><th></th><th>Per-cell (ms)</th><th>Shared Random (ms)</th><th>Slowdown</th></tr>{shared_rows}</table>
  <h3>6.7 Synchronisation overhead</h3>
  <p class="note">One row per thread, so almost all of the time is thread start, two barriers and the recorder hand-off per step.</p>
  <table><tr><th></th><th>Total, 400 steps (ms)</th><th>Per step (µs)</th></tr>{overhead_rows}</table>
  <h3>6.8 Karp–Flatt metric</h3>
  <figure>{charts.lines(epsilon_series, THREADS[1:], 0.3, [0, 0.1, 0.2, 0.3], '', False, 'Karp-Flatt metric', 3)}<figcaption>Experimentally determined serial fraction ε. Rising with p indicates overhead; flat indicates a fixed serial part.</figcaption></figure>'''


CONTENTS = [
    ('1', 'Introduction'), ('2', 'Design'), ('3', 'Implementation'), ('4', 'Correctness'),
    ('5', 'Machine Specifications'), ('6', 'Performance Analysis'), ('7', 'Discussion'),
    ('8', 'Conclusion'), ('', 'References'), ('', 'AI Usage Statement'),
]


def html(found: dict[Key, list[float]]) -> str:
    contents = ''.join(f'<li><span>{number}</span>{escape(title)}</li>' for number, title in CONTENTS)
    return f'''<!doctype html><html><head><meta charset="utf-8"><title>ID26253925 Report</title><style>
  @page {{ size: A4; margin: 20mm 18mm; }}
  body {{ font-family: Helvetica, Arial, sans-serif; font-size: 10.5pt; line-height: 1.45; color: #111; }}
  h1 {{ font-size: 22pt; margin: 0 0 6pt; }}
  h2 {{ font-size: 15pt; margin: 18pt 0 6pt; break-after: avoid; }}
  h3 {{ font-size: 12pt; margin: 14pt 0 4pt; break-after: avoid; }}
  h4 {{ font-size: 11pt; margin: 10pt 0 2pt; break-after: avoid; }}
  p, li {{ orphans: 3; widows: 3; }}
  .title {{ height: 240mm; display: flex; flex-direction: column; justify-content: center; }}
  .title p {{ margin: 2pt 0; font-size: 12pt; }}
  .page {{ break-before: page; }}
  .contents {{ list-style: none; padding: 0; font-size: 12pt; }}
  .contents li {{ margin: 4pt 0; }}
  .contents span {{ display: inline-block; width: 22pt; }}
  .note {{ color: #52514e; font-size: 9.5pt; }}
  table {{ border-collapse: collapse; margin: 4pt 0 10pt; font-variant-numeric: tabular-nums; break-inside: avoid; }}
  th, td {{ border: 1px solid #999; padding: 3pt 8pt; text-align: right; }}
  th:first-child {{ text-align: left; }}
  figure {{ margin: 8pt 0 14pt; break-inside: avoid; text-align: center; counter-increment: figure; }}
  figure svg {{ width: 100%; height: auto; max-height: 120mm; }}
  figcaption {{ font-size: 10pt; color: #444; margin-top: 4pt; }}
  figcaption::before {{ content: 'Figure ' counter(figure) ': '; }}
  pre {{ background: #f6f6f6; border: 1px solid #ddd; padding: 6pt 8pt; font-size: 8.5pt; line-height: 1.35; white-space: pre-wrap; break-inside: avoid; }}
  code {{ font-size: 9pt; }}
  .written td, .written th {{ text-align: left; vertical-align: top; }}
  .written table {{ font-size: 9.5pt; }}
  math {{ font-size: 1.1em; }}
  .todo {{ border: 2px solid #c0392b; color: #c0392b; padding: 6pt 10pt; margin: 6pt 0; }}
  .todo ul {{ margin: 4pt 0 0; }}
</style></head><body>
<section class="title">
  <h1>Assignment 2: Simulating Forest Fire Spread and Recovery</h1>
  <p>CS5741 Concurrency and Parallelism in Software Development, AY26-27 Semester 1</p>
  <p>Chirag Aggarwal · ID 26253925</p>
  <p>26253925@studentmail.ul.ie</p>
  <p>Lecturer: Faeq Alrimawi</p>
</section>
<section class="page">
  <h2>Contents</h2>
  <ol class="contents">{contents}</ol>
  <h3>Notation</h3>
  <p>N = grid side (N × N cells)<br>p = number of threads<br>f = serial fraction<br>Speedup S = T<sub>serial</sub> / T<sub>parallel</sub>, efficiency E = S / p<br>Amdahl: S = 1 / (f + (1 − f) / p)<br>Gustafson: S = p − f (p − 1)<br>Karp–Flatt: ε = (1/S − 1/p) / (1 − 1/p)</p>
</section>
<section class="page"><h2>1. Introduction</h2>{section('introduction')}</section>
<section class="page"><h2>2. Design</h2>{section('design')}</section>
<section class="page"><h2>3. Implementation</h2>{section('implementation')}</section>
<section class="page"><h2>4. Correctness</h2>{section('correctness')}</section>
<section class="page">
  <h2>5. Machine Specifications</h2>
  <table>
    <tr><th>CPU</th><td style="text-align:left">Apple M2 Pro</td></tr>
    <tr><th>Cores</th><td style="text-align:left">12 (8 performance + 4 efficiency); each core runs one thread at a time</td></tr>
    <tr><th>L2 cache</th><td style="text-align:left">16 MB (performance cluster), 4 MB (efficiency cluster)</td></tr>
    <tr><th>Memory</th><td style="text-align:left">32 GB</td></tr>
    <tr><th>Java</th><td style="text-align:left">OpenJDK 27.0.1</td></tr>
  </table>
  {section('machine')}
</section>
<section class="page">
  <h2>6. Performance Analysis</h2>
  <h3>6.1 Method</h3>
  <p>Each configuration ran 5 times in one JVM after 2 warm-up rounds, and the median is reported. Every run used growth probability 0.05, burn probability 0.3 and seed 42, on AC power. Before a time was recorded, the per-step counts of every deterministic run were checked against the serial run.</p>
  {results(found)}
  <h3>6.9 Amdahl, Gustafson and Karp–Flatt</h3>
  {section('analysis')}
</section>
<section class="page"><h2>7. Discussion</h2>{section('discussion')}</section>
<section class="page"><h2>8. Conclusion</h2>{section('conclusion')}</section>
<section class="page"><h2>References</h2>{section('references')}</section>
<section class="page"><h2>AI Usage Statement</h2>{section('ai-statement')}</section>
</body></html>'''


def main() -> None:
    output = HERE / 'ID26253925_Report.pdf'
    with tempfile.TemporaryDirectory() as directory:
        work = Path(directory)
        page = work / 'report.html'
        page.write_text(html(samples()))
        subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-pdf-header-footer', f'--user-data-dir={work / "profile"}',
                        f'--print-to-pdf={output}', page.as_uri()], check=True, capture_output=True)
    print(output)


if __name__ == '__main__':
    main()
