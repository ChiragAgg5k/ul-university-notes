"""Static SVG charts for the printed report, drawn from the benchmark medians.

Series colours are the first three slots of the dataviz reference palette (validated all-pairs
for colour-vision deficiency). Each series also has its own marker shape and a direct label,
so identity never depends on colour alone, including in greyscale print.
"""

from html import escape

Times = dict[tuple[str, int, int], float]

SURFACE = '#ffffff'
TEXT = '#0b0b0b'
MUTED = '#52514e'
GRID = '#e4e4e0'
AXIS = '#9a9994'
SERIES = {10_000_000: '#2a78d6', 100_000_000: '#eb6834', 500_000_000: '#1baf7a'}
MARKERS = {10_000_000: 'circle', 100_000_000: 'square', 500_000_000: 'triangle'}
FONT = "font-family: Helvetica, Arial, sans-serif"


def label(n: int) -> str:
    return f'{n // 1_000_000}M'


def text(x: float, y: float, content: str, size: int = 11, fill: str = MUTED,
         anchor: str = 'start', weight: int = 400) -> str:
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" '
            f'font-weight="{weight}" style="{FONT}">{escape(content)}</text>')


def marker(shape: str, x: float, y: float, colour: str) -> str:
    ring = f'stroke="{SURFACE}" stroke-width="2"'
    if shape == 'circle':
        return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4.5" fill="{colour}" {ring}/>'
    if shape == 'square':
        return f'<rect x="{x - 4.5:.1f}" y="{y - 4.5:.1f}" width="9" height="9" rx="1.5" fill="{colour}" {ring}/>'
    return (f'<polygon points="{x:.1f},{y - 5.5:.1f} {x + 5.2:.1f},{y + 4:.1f} {x - 5.2:.1f},{y + 4:.1f}" '
            f'fill="{colour}" {ring}/>')


def legend(x: float, y: float, sizes: list[int]) -> str:
    parts = []
    for n in sizes:
        parts.append(marker(MARKERS[n], x + 5, y - 4, SERIES[n]))
        parts.append(text(x + 15, y, f'n = {label(n)}', 11, TEXT))
        x += 82
    return ''.join(parts)


def spread(positions: list[float], gap: float) -> list[float]:
    """Nudge label baselines apart so no two sit closer than gap, keeping their order."""
    order = sorted(range(len(positions)), key=lambda k: positions[k])
    placed = positions[:]
    for previous, current in zip(order, order[1:]):
        if placed[current] - placed[previous] < gap:
            placed[current] = placed[previous] + gap
    return placed


def speedup(times: Times, sizes: list[int], threads: list[int], cores: int) -> str:
    width, height = 640, 380
    left, right, top, bottom = 46, 118, 40, 46
    plot_w, plot_h = width - left - right, height - top - bottom
    maximum = max(threads)
    x = lambda p: left + (p - 1) / (maximum - 1) * plot_w
    y = lambda s: top + plot_h - s / maximum * plot_h

    parts = [f'<rect width="{width}" height="{height}" fill="{SURFACE}"/>', legend(left, 18, sizes)]
    for tick in range(0, maximum + 1, 4):
        parts.append(f'<line x1="{left}" x2="{left + plot_w}" y1="{y(tick):.1f}" y2="{y(tick):.1f}" stroke="{GRID}"/>')
        parts.append(text(left - 8, y(tick) + 4, f'{tick}×', 10, MUTED, 'end'))
    for p in [1, *threads]:
        parts.append(text(x(p), top + plot_h + 17, str(p), 10, MUTED, 'middle'))
    parts.append(text(left + plot_w / 2, height - 8, 'threads (p)', 11, MUTED, 'middle'))
    parts.append(f'<line x1="{left}" x2="{left + plot_w}" y1="{top + plot_h}" y2="{top + plot_h}" stroke="{AXIS}"/>')

    parts.append(f'<line x1="{x(cores):.1f}" x2="{x(cores):.1f}" y1="{top}" y2="{top + plot_h}" stroke="{AXIS}" stroke-dasharray="2 3"/>')
    parts.append(text(x(cores) - 5, top + 12, f'{cores} cores', 10, MUTED, 'end'))
    parts.append(f'<line x1="{x(1):.1f}" y1="{y(1):.1f}" x2="{x(maximum):.1f}" y2="{y(maximum):.1f}" stroke="{AXIS}" stroke-width="1.5" stroke-dasharray="6 4"/>')
    parts.append(text(x(maximum) + 8, y(maximum) + 4, 'ideal (S = p)', 10, MUTED))

    ends = []
    for n in sizes:
        serial = times[('serial', n, 1)]
        points = [(1, 1.0)] + [(p, serial / times[('parallel', n, p)]) for p in threads]
        path = ' '.join(f'{"M" if k == 0 else "L"}{x(p):.1f},{y(s):.1f}' for k, (p, s) in enumerate(points))
        parts.append(f'<path d="{path}" fill="none" stroke="{SERIES[n]}" stroke-width="2" stroke-linejoin="round"/>')
        parts.extend(marker(MARKERS[n], x(p), y(s), SERIES[n]) for p, s in points)
        ends.append((n, points[-1][1]))
    placed = spread([y(s) + 4 for _, s in ends], 14)
    for (n, s), baseline in zip(ends, placed):
        parts.append(text(x(maximum) + 10, baseline, f'{label(n)}  {s:.2f}×', 11, TEXT))
    return f'<svg viewBox="0 0 {width} {height}" role="img" aria-label="Speedup against thread count">{"".join(parts)}</svg>'


def nice(maximum: float) -> float:
    for scale in (0.01, 0.1, 1, 10, 100, 1000):
        for step in (1, 2, 2.5, 5):
            if step * scale * 4 >= maximum:
                return step * scale
    return maximum / 4


def execution(times: Times, sizes: list[int], threads: list[int]) -> str:
    width, height, gap = 640, 270, 18
    top, bottom, inner_left = 36, 38, 40
    panel_w = (width - gap * (len(sizes) - 1)) / len(sizes)
    plot_h = height - top - bottom
    bars = ['serial', *threads]
    parts = [f'<rect width="{width}" height="{height}" fill="{SURFACE}"/>']

    for index, n in enumerate(sizes):
        origin = index * (panel_w + gap)
        values = [times[('serial', n, 1)]] + [times[('parallel', n, p)] for p in threads]
        seconds = max(values) >= 1000
        unit, divisor = ('s', 1000) if seconds else ('ms', 1)
        scaled = [v / divisor for v in values]
        step = nice(max(scaled))
        ceiling = step * 4
        y = lambda v: top + plot_h - v / ceiling * plot_h
        plot_left = origin + inner_left
        plot_w = panel_w - inner_left
        slot = plot_w / len(bars)
        bar_w = min(26, slot - 2)

        parts.append(text(origin, 16, f'n = {label(n)}', 12, TEXT, weight=600))
        for k in range(5):
            value = step * k
            parts.append(f'<line x1="{plot_left}" x2="{plot_left + plot_w}" y1="{y(value):.1f}" y2="{y(value):.1f}" stroke="{GRID}"/>')
            shown = f'{value:g}'
            parts.append(text(plot_left - 6, y(value) + 4, f'{shown} {unit}' if k == 4 else shown, 10, MUTED, 'end'))
        for k, (name, value) in enumerate(zip(bars, scaled)):
            cx = plot_left + slot * k + slot / 2
            bar_top = y(value)
            base = top + plot_h
            radius = min(4, (base - bar_top) / 2)
            parts.append(
                f'<path d="M{cx - bar_w / 2:.1f},{base:.1f} V{bar_top + radius:.1f} '
                f'Q{cx - bar_w / 2:.1f},{bar_top:.1f} {cx - bar_w / 2 + radius:.1f},{bar_top:.1f} '
                f'H{cx + bar_w / 2 - radius:.1f} Q{cx + bar_w / 2:.1f},{bar_top:.1f} {cx + bar_w / 2:.1f},{bar_top + radius:.1f} '
                f'V{base:.1f} Z" fill="{SERIES[n]}" fill-opacity="{0.45 if name == "serial" else 1}"/>')
            parts.append(text(cx, base + 15, 'S' if name == 'serial' else str(name), 10, MUTED, 'middle'))
            if name == 'serial' or name == threads[-1]:
                shown = f'{value:.2f}' if seconds else f'{value:.0f}'
                parts.append(text(cx, bar_top - 5, shown, 10, TEXT, 'middle'))
        parts.append(f'<line x1="{plot_left}" x2="{plot_left + plot_w}" y1="{top + plot_h}" y2="{top + plot_h}" stroke="{AXIS}"/>')
    parts.append(text(width / 2, height - 6, 'threads (p); S = serial', 11, MUTED, 'middle'))
    return f'<svg viewBox="0 0 {width} {height}" role="img" aria-label="Execution time against thread count">{"".join(parts)}</svg>'


def amdahl(times: Times, sizes: list[int], threads: list[int], cores: int) -> str:
    """One panel per problem size: measured speedup, Amdahl's prediction and ideal linear speedup."""
    width, height, gap = 640, 300, 16
    top, bottom, inner_left, inner_right = 58, 40, 30, 50
    panel_w = (width - gap * (len(sizes) - 1)) / len(sizes)
    plot_h = height - top - bottom
    maximum = max(threads)
    overhead = times[('overhead', 1, maximum)]
    parts = [f'<rect width="{width}" height="{height}" fill="{SURFACE}"/>']

    key_x = 0
    parts.append(f'<line x1="{key_x}" x2="{key_x + 22}" y1="12" y2="12" stroke="{TEXT}" stroke-width="2"/>')
    parts.append(marker('circle', key_x + 11, 12, TEXT))
    parts.append(text(key_x + 28, 16, 'measured', 11, TEXT))
    parts.append(f'<line x1="{key_x + 100}" x2="{key_x + 122}" y1="12" y2="12" stroke="{TEXT}" stroke-width="2" stroke-dasharray="5 3"/>')
    parts.append(text(key_x + 128, 16, "Amdahl's Law", 11, TEXT))
    parts.append(f'<line x1="{key_x + 220}" x2="{key_x + 242}" y1="12" y2="12" stroke="{AXIS}" stroke-width="1.5" stroke-dasharray="2 3"/>')
    parts.append(text(key_x + 248, 16, 'ideal (S = p)', 11, TEXT))

    for index, n in enumerate(sizes):
        origin = index * (panel_w + gap)
        plot_left = origin + inner_left
        plot_w = panel_w - inner_left - inner_right
        x = lambda p: plot_left + (p - 1) / (maximum - 1) * plot_w
        y = lambda v: top + plot_h - v / maximum * plot_h
        serial = times[('serial', n, 1)]
        s = overhead / serial
        colour = SERIES[n]

        parts.append(text(origin, 44, f'n = {label(n)}', 12, TEXT, weight=600))
        parts.append(text(origin + panel_w, 44, f's = {s:.4f}', 10, MUTED, 'end'))
        for tick in range(0, maximum + 1, 4):
            parts.append(f'<line x1="{plot_left}" x2="{plot_left + plot_w}" y1="{y(tick):.1f}" y2="{y(tick):.1f}" stroke="{GRID}"/>')
            parts.append(text(plot_left - 5, y(tick) + 4, f'{tick}×', 9, MUTED, 'end'))
        for p in (1, 4, 8, 12, 16):
            parts.append(text(x(p), top + plot_h + 14, str(p), 9, MUTED, 'middle'))
        parts.append(f'<line x1="{plot_left}" x2="{plot_left + plot_w}" y1="{top + plot_h}" y2="{top + plot_h}" stroke="{AXIS}"/>')
        parts.append(f'<line x1="{x(cores):.1f}" x2="{x(cores):.1f}" y1="{top}" y2="{top + plot_h}" stroke="{AXIS}" stroke-dasharray="1 3"/>')
        parts.append(f'<line x1="{x(1):.1f}" y1="{y(1):.1f}" x2="{x(maximum):.1f}" y2="{y(maximum):.1f}" stroke="{AXIS}" stroke-width="1.5" stroke-dasharray="2 3"/>')

        predicted = [(p, 1 / (s + (1 - s) / p)) for p in [1, *threads]]
        path = ' '.join(f'{"M" if k == 0 else "L"}{x(p):.1f},{y(v):.1f}' for k, (p, v) in enumerate(predicted))
        parts.append(f'<path d="{path}" fill="none" stroke="{colour}" stroke-width="2" stroke-dasharray="5 3"/>')

        measured = [(1, 1.0)] + [(p, serial / times[('parallel', n, p)]) for p in threads]
        path = ' '.join(f'{"M" if k == 0 else "L"}{x(p):.1f},{y(v):.1f}' for k, (p, v) in enumerate(measured))
        parts.append(f'<path d="{path}" fill="none" stroke="{colour}" stroke-width="2" stroke-linejoin="round"/>')
        parts.extend(marker(MARKERS[n], x(p), y(v), colour) for p, v in measured)

        ends = spread([y(predicted[-1][1]) + 4, y(measured[-1][1]) + 4], 13)
        parts.append(text(x(maximum) + 6, ends[0], f'{predicted[-1][1]:.1f}×', 10, TEXT))
        parts.append(text(x(maximum) + 6, ends[1], f'{measured[-1][1]:.1f}×', 10, TEXT))
    parts.append(text(width / 2, height - 6, 'threads (p); dotted vertical line = 12 cores', 11, MUTED, 'middle'))
    return f'<svg viewBox="0 0 {width} {height}" role="img" aria-label="Measured speedup against Amdahl\'s Law">{"".join(parts)}</svg>'
