"""Static SVG line charts for the printed report, drawn from the benchmark medians.

Series colours come from the dataviz reference palette. Every series also has its own marker
shape and a direct label at the end of its line, so identity never depends on colour alone,
including in greyscale print.
"""

from dataclasses import dataclass
from html import escape

SURFACE = '#ffffff'
TEXT = '#0b0b0b'
MUTED = '#52514e'
GRID = '#e4e4e0'
AXIS = '#9a9994'
COLOURS = ['#2a78d6', '#eb6834', '#1baf7a', '#9b59d0', '#c9a227']
MARKERS = ['circle', 'square', 'triangle', 'diamond', 'circle']
FONT = 'font-family: Helvetica, Arial, sans-serif'


@dataclass(frozen=True)
class Series:
    name: str
    points: list[tuple[int, float]]


def text(x: float, y: float, content: str, size: int = 11, fill: str = MUTED, anchor: str = 'start') -> str:
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" '
            f'style="{FONT}">{escape(content)}</text>')


def marker(shape: str, x: float, y: float, colour: str) -> str:
    ring = f'stroke="{SURFACE}" stroke-width="2"'
    if shape == 'circle':
        return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4.5" fill="{colour}" {ring}/>'
    if shape == 'square':
        return f'<rect x="{x - 4.5:.1f}" y="{y - 4.5:.1f}" width="9" height="9" rx="1.5" fill="{colour}" {ring}/>'
    if shape == 'diamond':
        return f'<polygon points="{x:.1f},{y - 6:.1f} {x + 6:.1f},{y:.1f} {x:.1f},{y + 6:.1f} {x - 6:.1f},{y:.1f}" fill="{colour}" {ring}/>'
    return (f'<polygon points="{x:.1f},{y - 5.5:.1f} {x + 5.2:.1f},{y + 4:.1f} {x - 5.2:.1f},{y + 4:.1f}" '
            f'fill="{colour}" {ring}/>')


def spread(positions: list[float], gap: float) -> list[float]:
    """Nudge label baselines apart so no two sit closer than gap, keeping their order."""
    order = sorted(range(len(positions)), key=lambda k: positions[k])
    placed = positions[:]
    for previous, current in zip(order, order[1:]):
        if placed[current] - placed[previous] < gap:
            placed[current] = placed[previous] + gap
    return placed


def lines(series: list[Series], threads: list[int], maximum: float, ticks: list[float], unit: str,
          ideal: bool, label: str, decimals: int = 2) -> str:
    """Values against thread count on a linear axis, optionally with the ideal S = p diagonal."""
    width, height = 640, 340
    left, right, top, bottom = 50, 190, 18, 46
    plot_w, plot_h = width - left - right, height - top - bottom
    x = lambda p: left + (p - threads[0]) / (threads[-1] - threads[0]) * plot_w
    y = lambda v: top + plot_h - v / maximum * plot_h

    parts = [f'<rect width="{width}" height="{height}" fill="{SURFACE}"/>']
    for tick in ticks:
        parts.append(f'<line x1="{left}" x2="{left + plot_w}" y1="{y(tick):.1f}" y2="{y(tick):.1f}" stroke="{GRID}"/>')
        parts.append(text(left - 8, y(tick) + 4, f'{tick:g}{unit}', 10, MUTED, 'end'))
    for p in threads:
        parts.append(text(x(p), top + plot_h + 17, str(p), 10, MUTED, 'middle'))
    parts.append(text(left + plot_w / 2, height - 8, 'threads (p)', 11, MUTED, 'middle'))
    parts.append(f'<line x1="{left}" x2="{left + plot_w}" y1="{top + plot_h}" y2="{top + plot_h}" stroke="{AXIS}"/>')

    labels = []
    if ideal:
        end = threads[-1]
        parts.append(f'<line x1="{x(threads[0]):.1f}" y1="{y(threads[0]):.1f}" x2="{x(end):.1f}" y2="{y(end):.1f}" '
                     f'stroke="{AXIS}" stroke-width="1.5" stroke-dasharray="6 4"/>')
        labels.append((y(end) + 4, f'ideal  {end:g}{unit}', MUTED))

    for index, line in enumerate(series):
        colour, shape = COLOURS[index % len(COLOURS)], MARKERS[index % len(MARKERS)]
        path = ' '.join(f'{"M" if k == 0 else "L"}{x(p):.1f},{y(v):.1f}' for k, (p, v) in enumerate(line.points))
        parts.append(f'<path d="{path}" fill="none" stroke="{colour}" stroke-width="2" stroke-linejoin="round"/>')
        parts.extend(marker(shape, x(p), y(v), colour) for p, v in line.points)
        last = line.points[-1][1]
        labels.append((y(last) + 4, f'{line.name}  {last:.{decimals}f}{unit}', TEXT))

    placed = spread([baseline for baseline, _, _ in labels], 14)
    for (_, content, fill), baseline in zip(labels, placed):
        parts.append(text(x(threads[-1]) + 10, baseline, content, 11, fill))
    return f'<svg viewBox="0 0 {width} {height}" role="img" aria-label="{escape(label)}">{"".join(parts)}</svg>'
