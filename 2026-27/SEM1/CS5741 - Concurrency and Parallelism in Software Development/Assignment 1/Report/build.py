"""Assemble the report from the typed sections and the benchmark results.

Usage: python3 -I build.py
Writes the page to a temporary folder and prints it with headless Chrome to ID26253925_Report.pdf.
"""

import csv
import statistics
import subprocess
import sys
import tempfile
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import charts  # noqa: E402

RESULTS = HERE.parent / 'Results' / 'bench.csv'
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
SIZES = [10_000_000, 100_000_000, 500_000_000]
THREADS = [2, 4, 8, 12, 16]

TYPED = HERE / 'Typed'

FOSTER = [
    ('1.1 Partitioning', ['partitioning-1', 'partitioning-2']),
    ('1.2 Communication', ['communication']),
    ('1.3 Agglomeration', ['agglomeration']),
    ('1.4 Mapping', ['mapping']),
    ('1.5 Summary', ['summary']),
]

IMPLEMENTATION = ['implementation-1', 'implementation-2']
AMDAHL = ['amdahl-1', 'amdahl-2']
DISCUSSION = ['discussion-1', 'discussion-2']
CONCLUSION = ['conclusion']

CONTENTS = [
    ('1', "Foster's Methodology"),
    ('2', 'Parallel Implementation'),
    ('3', 'Machine Specifications'),
    ('4', 'Performance Analysis'),
    ('5', 'Conclusion'),
    ('', 'References'),
    ('', 'AI Usage Statement'),
]


def medians() -> dict[tuple[str, int, int], float]:
    samples: dict[tuple[str, int, int], list[float]] = defaultdict(list)
    with RESULTS.open() as file:
        for row in csv.DictReader(file):
            samples[(row['kind'], int(row['n']), int(row['p']))].append(float(row['ms']))
    return {key: statistics.median(values) for key, values in samples.items()}


def label(n: int) -> str:
    return f'{n // 1_000_000}M'


def tables(times: dict[tuple[str, int, int], float]) -> str:
    head = ''.join(f'<th>p = {p}</th>' for p in THREADS)
    time_rows = ''
    speedup_rows = ''
    efficiency_rows = ''
    for n in SIZES:
        serial = times[('serial', n, 1)]
        time_rows += f'<tr><th>{label(n)}</th><td>{serial:,.1f}</td>' + ''.join(
            f'<td>{times[("parallel", n, p)]:,.1f}</td>' for p in THREADS) + '</tr>'
        speedup_rows += f'<tr><th>{label(n)}</th>' + ''.join(
            f'<td>{serial / times[("parallel", n, p)]:.2f}</td>' for p in THREADS) + '</tr>'
        efficiency_rows += f'<tr><th>{label(n)}</th>' + ''.join(
            f'<td>{serial / times[("parallel", n, p)] / p * 100:.0f}%</td>' for p in THREADS) + '</tr>'
    overhead = ''.join(f'<td>{times[("overhead", 1, p)]:.3f}</td>' for p in THREADS)
    return f'''
    <h3>4.2 Execution time (median, ms)</h3>
    <table><tr><th>n</th><th>serial</th>{head}</tr>{time_rows}</table>
    <h3>4.3 Actual speedup, S = T<sub>serial</sub> / T<sub>parallel</sub></h3>
    <table><tr><th>n</th>{head}</tr>{speedup_rows}</table>
    <h3>4.4 Efficiency, S / p</h3>
    <table><tr><th>n</th>{head}</tr>{efficiency_rows}</table>
    <h3>4.5 Fixed thread overhead (n = 1, every range empty; median of 200 runs, ms)</h3>
    <table><tr>{head}</tr><tr>{overhead}</tr></table>'''


def typed(names: list[str]) -> str:
    return '\n'.join((TYPED / f'{name}.html').read_text() for name in names)


def html(times: dict[tuple[str, int, int], float]) -> str:
    foster = ''.join(f'<h3>{heading}</h3>{typed(names)}' for heading, names in FOSTER)
    contents = ''.join(f'<li><span>{number}</span>{title}</li>' for number, title in CONTENTS)
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>ID26253925 Report</title>
<style>
  @page {{ size: A4; margin: 18mm 16mm; }}
  body {{ font: 11pt/1.5 Georgia, 'Times New Roman', serif; color: #111; counter-reset: figure; }}
  h1 {{ font-size: 22pt; margin: 0 0 6pt; }}
  h2 {{ font-size: 15pt; margin: 18pt 0 6pt; break-after: avoid; }}
  h3 {{ font-size: 12pt; margin: 14pt 0 4pt; break-after: avoid; }}
  h4 {{ font-size: 11pt; margin: 10pt 0 2pt; break-after: avoid; }}
  p, li {{ orphans: 3; widows: 3; }}
  ul, ol {{ margin: 2pt 0 6pt; padding-left: 18pt; }}
  .title {{ height: 240mm; display: flex; flex-direction: column; justify-content: center; }}
  .title p {{ margin: 2pt 0; font-size: 12pt; }}
  .page {{ break-before: page; }}
  .contents {{ list-style: none; padding: 0; font-size: 12pt; }}
  .contents li {{ margin: 4pt 0; }}
  .contents span {{ display: inline-block; width: 22pt; }}
  table {{ border-collapse: collapse; margin: 4pt 0 10pt; font-variant-numeric: tabular-nums; }}
  th, td {{ border: 1px solid #999; padding: 3pt 8pt; text-align: right; }}
  th:first-child {{ text-align: left; }}
  figure {{ margin: 8pt 0 14pt; break-inside: avoid; text-align: center; counter-increment: figure; }}
  figure svg {{ width: 100%; height: auto; max-height: 150mm; }}
  figcaption {{ font-size: 10pt; color: #444; margin-top: 4pt; }}
  figcaption::before {{ content: 'Figure ' counter(figure) ': '; }}
  pre {{ background: #f6f6f6; border: 1px solid #ddd; padding: 6pt 8pt; font-size: 9pt; line-height: 1.35; white-space: pre-wrap; break-inside: avoid; }}
  .references {{ padding-left: 18pt; font-size: 10pt; }}
  .references li {{ margin-bottom: 6pt; }}
  .references span {{ color: #52514e; }}
  code {{ font-size: 9pt; }}
  table.ai {{ font-size: 9pt; line-height: 1.35; width: 100%; }}
  table.ai th, table.ai td {{ text-align: left; vertical-align: top; }}
  table.ai td:first-child {{ font-weight: 600; width: 22%; }}
</style></head><body>
<section class="title">
  <h1>Assignment 1: Parallel Numerical Integration</h1>
  <p>CS5741 Concurrency and Parallelism in Software Development, AY26-27 Semester 1</p>
  <p>Chirag Aggarwal · ID 26253925</p>
  <p>26253925@studentmail.ul.ie</p>
  <p>Lecturer: Faeq Alrimawi</p>
</section>

<section class="page">
  <h2>Contents</h2>
  <ol class="contents">{contents}</ol>
  <h3>Notation</h3>
  <p>n = number of intervals<br>h = (b − a) / n<br>p = number of threads<br>s = serial fraction<br>Amdahl's Law: S(p) = 1 / (s + (1 − s) / p)<br>Maximum speedup = 1 / s</p>
</section>

<section class="page">
  <h2>1. Foster&#39;s Methodology</h2>
  {foster}
</section>

<section class="page">
  <h2>2. Parallel Implementation</h2>
  {typed(IMPLEMENTATION)}
</section>

<section class="page">
  <h2>3. Machine Specifications</h2>
  <table>
    <tr><th>CPU</th><td style="text-align:left">Apple M2 Pro</td></tr>
    <tr><th>Cores</th><td style="text-align:left">12 (8 performance + 4 efficiency); each core runs one thread at a time</td></tr>
    <tr><th>L2 cache</th><td style="text-align:left">16 MB (performance cluster), 4 MB (efficiency cluster)</td></tr>
    <tr><th>Memory</th><td style="text-align:left">32 GB</td></tr>
    <tr><th>OS</th><td style="text-align:left">macOS 26.6.2</td></tr>
    <tr><th>Java</th><td style="text-align:left">OpenJDK 27</td></tr>
  </table>
  {typed(['machine-specifications'])}
</section>

<section class="page">
  <h2>4. Performance Analysis</h2>
  <h3>4.1 Method</h3>
  <p>Each configuration was run 7 times after 3 warm-up rounds, and the median is reported. Runs were made on AC power.</p>
  {tables(times)}
  <h3>4.6 Amdahl&#39;s Law</h3>
  {typed(AMDAHL)}
  <h3>4.7 Graphs</h3>
  <figure>{charts.execution(times, SIZES, THREADS)}<figcaption>Median execution time for each problem size (S = serial). Each panel has its own scale.</figcaption></figure>
  <figure>{charts.speedup(times, SIZES, THREADS, 12)}<figcaption>Actual speedup against thread count, with ideal linear speedup and the 12-core limit.</figcaption></figure>
  <figure>{charts.amdahl(times, SIZES, THREADS, 12)}<figcaption>Measured speedup against Amdahl&#39;s Law for each problem size, using s = T<sub>overhead</sub>(p = 16) / T<sub>serial</sub>(n). At 100M and 500M the Amdahl line lies almost on top of the ideal line.</figcaption></figure>
  <h3>4.8 Discussion</h3>
  {typed(DISCUSSION)}
</section>

<section>
  <h2>5. Conclusion</h2>
  {typed(CONCLUSION)}
</section>

<section class="page">
  <h2>References</h2>
  <ol class="references">
    <li>Alrimawi, F. (2026a) <i>CS5741 Assignment 1: Parallel Numerical Integration</i> [assignment brief and supplied <code>SerialIntegration.java</code>]. University of Limerick, Brightspace, 8 October.<br><span>Task specification, marking criteria, the trapezoidal rule and the serial baseline code.</span></li>
    <li>Alrimawi, F. (2026b) <i>Lecture 2: Identifying Parallelisable Problems</i> [lecture slides], CS5741. University of Limerick.<br><span>Decomposability, independence and granularity; data vs task parallelism; Amdahl's Law (slides 42–47); strong vs weak scaling (slide 48).</span></li>
    <li>Alrimawi, F. (2026c) <i>Lecture 3: Parallel Algorithms</i> [lecture slides], CS5741. University of Limerick.<br><span>ForkJoin and estimating the serial fraction (slides 9–10); task dependencies (RAW/WAR/WAW); static vs dynamic load balancing; Foster's methodology and its four checklists (slides 24–39); parallel patterns (slide 40).</span></li>
    <li>Alrimawi, F. (2026d) <i>Lab 1: Sequential vs Concurrent vs Parallel</i> [lab handout and code], CS5741. University of Limerick.<br><span>Shown in practice: a shared, synchronised accumulator serialises the threads.</span></li>
    <li>Amdahl, G.M. (1967) 'Validity of the single processor approach to achieving large scale computing capabilities', in <i>Proceedings of the AFIPS Spring Joint Computer Conference</i>, Atlantic City, 18–20 April, pp. 483–485. doi:10.1145/1465482.1465560.<br><span>Original statement of the speedup limit used in Section 4.</span></li>
    <li>Apple Inc. (2023) 'Apple unveils M2 Pro and M2 Max: next-generation chips for next-level workflows', <i>Apple Newsroom</i>, 17 January. Available at: https://www.apple.com/newsroom/2023/01/apple-unveils-m2-pro-and-m2-max-next-generation-chips-for-next-level-workflows/ (accessed 14 October 2026).<br><span>Core configuration of the test machine (performance and efficiency cores).</span></li>
    <li>Foster, I. (1995) <i>Designing and Building Parallel Programs: Concepts and Tools for Parallel Software Engineering</i>. Reading, MA: Addison-Wesley.<br><span>Source of the four-stage design methodology (partitioning, communication, agglomeration, mapping) applied in Section 1.</span></li>
    <li>Gosling, J., Joy, B., Steele, G., Bracha, G., Buckley, A., Smith, D. and Bierman, G. (2023) <i>The Java Language Specification, Java SE 21 Edition</i>, §17.4.4–17.4.5. Oracle. Available at: https://docs.oracle.com/javase/specs/jls/se21/html/jls-17.html (accessed 14 October 2026).<br><span>Memory-model guarantee that all actions in a thread happen-before another thread returns from <code>join()</code> on it, which is why the partial sums are visible without locks.</span></li>
    <li>Grama, A., Gupta, A., Karypis, G. and Kumar, V. (2003) <i>Introduction to Parallel Computing</i>. 2nd edn. Harlow: Addison-Wesley.<br><span>Decomposition techniques (recursive, data, exploratory, speculative), used when considering alternative partitions.</span></li>
    <li>Oracle (2023) <i>Class Thread</i>, Java SE 21 API documentation. Available at: https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Thread.html (accessed 14 October 2026).<br><span><code>Thread</code> creation, <code>start()</code> and <code>join()</code> as used in the implementation.</span></li>
    <li>Anthropic (2026) <i>Claude</i> [AI assistant]. Available at: https://claude.ai (accessed 10–19 October 2026).<br><span>Used within the limits of section 4 of the brief; see the AI Usage Statement for exactly how.</span></li>
  </ol>
  <h2>AI Usage Statement</h2>
  <p>I used Claude (Anthropic, 2026), an AI assistant, during this assignment within the limits set in section 4 of the brief. This is how it was used.</p>
  <table class="ai">
    <tr><th>Area</th><th>What the AI did</th><th>What I did</th></tr>
    <tr><td>Understanding the problem</td><td>Explained the trapezoidal rule, the integrand e<sup>−x</sup>·sin(x), the endpoint weights and terms such as global reduction, block grouping and SMT. Built two interactive explainer pages (the curve with its trapezoids, and agglomeration).</td><td>Studied the explanations and the lecture slides.</td></tr>
    <tr><td>Foster's methodology (Section 1)</td><td>Gave outlines for all four stages, cross-checked against the Lecture 3 checklists. Wrote example drafts for the Partitioning and Communication stages, and reviewed my Partitioning notes.</td><td>Wrote all of Section 1 by hand in my own words, including the sketches.</td></tr>
    <tr><td>Parallel implementation (Section 2, Java file)</td><td>Supplied a skeleton: the header comment, the supplied serial method, the timing and printing in <code>main</code>, and numbered TODO comments. Reviewed my finished code and tested it against the serial version on 64 (n, p) combinations.</td><td>Wrote the <code>parallel()</code> method: range bounds, thread creation, local sums, <code>join()</code> and the reduction. Wrote Section 2 by hand in my own words.</td></tr>
    <tr><td>Machine specifications (Section 3)</td><td>Read the hardware details from the machine and explained what they mean.</td><td>Wrote the notes in Section 3 by hand in my own words.</td></tr>
    <tr><td>Performance measurement (Section 4)</td><td>Wrote and ran the benchmark harness (warm-up, median of 7 runs, the thread-overhead measurement at n = 1). Generated the result tables and graphs in Section 4 from the measured data.</td><td>Chose the experiments, including the extra p = 12 comparison.</td></tr>
    <tr><td>Amdahl's Law (Section 4.6)</td><td>Explained the law, and calculated the serial fraction s, the predicted speedups and the maximum speedup from the measured data.</td><td>Wrote Section 4.6 by hand in my own words, including the comparison of Amdahl's assumptions with the real hardware.</td></tr>
    <tr><td>Discussion and conclusion (Sections 4.8 and 5)</td><td>Gave outlines listing the points to cover and the supporting numbers from the results.</td><td>Wrote Sections 4.8 and 5 by hand in my own words.</td></tr>
    <tr><td>Report production</td><td>Downloaded the brief and lecture slides from Brightspace, typed up my handwritten pages and edited them lightly for grammar and formatting, pointed out slips (arithmetic errors, numbers that did not match the measured results, a mistake in the Amdahl table and inconsistent notation), which I asked it to correct, redrew my hand sketches as diagrams, assembled this PDF and formatted the reference list.</td><td>Decided the structure and content of the report, and checked the typed text against my handwritten originals.</td></tr>
  </table>
  <p>I checked all AI output for accuracy before using it, and I can explain every part of the design, the code and the results.</p>
</section>
</body></html>'''


def main() -> None:
    output = HERE / 'ID26253925_Report.pdf'
    with tempfile.TemporaryDirectory() as directory:
        work = Path(directory)
        page = work / 'report.html'
        page.write_text(html(medians()))
        subprocess.run([CHROME, '--headless', '--disable-gpu', '--no-pdf-header-footer', f'--user-data-dir={work / "profile"}',
                        f'--print-to-pdf={output}', page.as_uri()],
                       check=True, capture_output=True)
    print(output)


if __name__ == '__main__':
    main()
