"""Fill the lecturer's Assessment 4 template with the portfolio story and write dist/<name>.pptx.

Run from this folder: uv run --with python-pptx python build.py
Facts come from the Assessment 1 README, the Assessment 2 review notes and the Assessment 3 report.
Rebuilding overwrites dist/, so record narration only once the slides are final.
"""

from pathlib import Path

from lxml import etree
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches, Pt

HERE = Path(__file__).resolve().parent
MODULE = HERE.parent.parent
TEMPLATE = HERE.parent / 'brief' / 'Digital_Portfolio_Presentation_Template.pptx'
OUTPUT = HERE / 'dist' / 'ID26253925_CS5709_Assessment4_Technical_Presentation.pptx'
PHASE1 = MODULE / 'Assignment 1'
PHASE2 = MODULE / 'Assignment 3'

GREEN = RGBColor(0x01, 0x51, 0x36)
BRIGHT = RGBColor(0x07, 0xA4, 0x57)
TINT = RGBColor(0xE6, 0xF2, 0xEC)
TEXT = RGBColor(0x1F, 0x2A, 0x24)
MUTED = RGBColor(0x55, 0x66, 0x5D)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
DATE = '24.11.26'

LEFT = 0.71
WIDTH = 11.9
TOP = 1.8


def remove(shape) -> None:
    element = shape._element
    element.getparent().remove(element)


def placeholder(slide, index: int):
    for shape in slide.placeholders:
        if shape.placeholder_format.idx == index:
            return shape
    return None


def frame(slide, title: str, notes: str) -> None:
    """Set the title and date, drop the template's body placeholder and write the speaker notes."""
    heading = slide.shapes.title
    heading.text_frame.text = title
    run = heading.text_frame.paragraphs[0].runs[0]
    run.font.color.rgb = GREEN
    body = placeholder(slide, 1)
    if body is not None:
        remove(body)
    date = placeholder(slide, 10)
    if date is not None:
        date.text_frame.paragraphs[0].runs[0].text = DATE
    slide.notes_slide.notes_text_frame.text = notes


def text(slide, x: float, y: float, w: float, h: float, paragraphs: list, size: int = 14, color=TEXT, anchor=MSO_ANCHOR.TOP):
    """Add a text box. Each paragraph is a string or a list of (text, bold) runs."""
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame_ = box.text_frame
    frame_.word_wrap = True
    frame_.vertical_anchor = anchor
    for margin in ('margin_left', 'margin_right', 'margin_top', 'margin_bottom'):
        setattr(frame_, margin, 0)
    fill(frame_, paragraphs, size, color)
    return box


def fill(frame_, paragraphs: list, size: int, color, spacing: int = 6) -> None:
    for number, content in enumerate(paragraphs):
        paragraph = frame_.paragraphs[0] if number == 0 else frame_.add_paragraph()
        paragraph.space_after = Pt(spacing)
        runs = [(content, False)] if isinstance(content, str) else content
        for value, bold in runs:
            run = paragraph.add_run()
            run.text = value
            run.font.size = Pt(size)
            run.font.bold = bold
            run.font.color.rgb = color


def card(slide, x: float, y: float, w: float, h: float, heading: str, body: list, background=TINT, size: int = 13):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    shape.adjustments[0] = 0.08
    shape.fill.solid()
    shape.fill.fore_color.rgb = background
    shape.line.fill.background()
    shape.shadow.inherit = False
    frame_ = shape.text_frame
    frame_.word_wrap = True
    frame_.vertical_anchor = MSO_ANCHOR.TOP
    frame_.margin_left = frame_.margin_right = Inches(0.15)
    frame_.margin_top = frame_.margin_bottom = Inches(0.12)
    dark = background == GREEN
    fill(frame_, [[(heading, True)]], size + 2, WHITE if dark else GREEN)
    for paragraph in frame_.paragraphs:
        paragraph.alignment = PP_ALIGN.LEFT
    for line in body:
        paragraph = frame_.add_paragraph()
        paragraph.alignment = PP_ALIGN.LEFT
        paragraph.space_after = Pt(4)
        run = paragraph.add_run()
        run.text = line
        run.font.size = Pt(size)
        run.font.color.rgb = WHITE if dark else TEXT
    return shape


def stat(slide, x: float, y: float, w: float, figure: str, label: str) -> None:
    text(slide, x, y, w, 0.75, [[(figure, True)]], size=40, color=BRIGHT)
    text(slide, x, y + 0.8, w, 0.6, [label], size=13, color=MUTED)


def picture(slide, path: Path, x: float, y: float, w: float, h: float, caption: str = '') -> None:
    """Fit an image inside the box, keeping its aspect ratio, centred horizontally."""
    shape = slide.shapes.add_picture(str(path), Inches(x), Inches(y))
    ratio = min(Inches(w) / shape.width, Inches(h) / shape.height)
    shape.width = int(shape.width * ratio)
    shape.height = int(shape.height * ratio)
    shape.left = int(Inches(x) + (Inches(w) - shape.width) / 2)
    shape.line.color.rgb = RGBColor(0xD0, 0xD8, 0xD3)
    shape.line.width = Pt(0.75)
    if caption:
        top = (shape.top + shape.height) / 914400 + 0.08
        text(slide, x, top, w, 0.3, [caption], size=11, color=MUTED)


def table(slide, x: float, y: float, w: float, rows: list, widths: list, size: int = 12, height: float = 0.4):
    shape = slide.shapes.add_table(len(rows), len(rows[0]), Inches(x), Inches(y), Inches(w), Inches(height * len(rows)))
    grid = shape.table
    style = shape._element.graphic.graphicData.tbl.tblPr
    style.set('bandRow', '0')
    for index, width in enumerate(widths):
        grid.columns[index].width = Inches(width)
    for r, row in enumerate(rows):
        grid.rows[r].height = Inches(height)
        for c, value in enumerate(row):
            cell = grid.cell(r, c)
            cell.fill.solid()
            cell.fill.fore_color.rgb = GREEN if r == 0 else (TINT if r % 2 == 0 else WHITE)
            cell.margin_left = cell.margin_right = Inches(0.08)
            cell.margin_top = cell.margin_bottom = Inches(0.04)
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            frame_ = cell.text_frame
            frame_.word_wrap = True
            frame_.text = ''
            run = frame_.paragraphs[0].add_run()
            run.text = value
            run.font.size = Pt(size)
            run.font.bold = r == 0 or c == 0
            run.font.color.rgb = WHITE if r == 0 else (GREEN if c == 0 else TEXT)
    return shape


def arrow(slide, x1: float, y1: float, x2: float, y2: float) -> None:
    line = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
    line.line.color.rgb = BRIGHT
    line.line.width = Pt(2)
    end = etree.SubElement(line.line._get_or_add_ln(), '{http://schemas.openxmlformats.org/drawingml/2006/main}tailEnd')
    end.set('type', 'triangle')


def title_slide(slide) -> None:
    slide.shapes.title.text_frame.text = 'Digital Portfolio'
    subtitle = placeholder(slide, 1)
    subtitle.text_frame.text = 'Chirag Aggarwal · 26253925 · CS5709 Software Engineering Evolution · Assessment 4'
    for run in subtitle.text_frame.paragraphs[0].runs:
        run.font.size = Pt(14)
        run.font.color.rgb = WHITE
    title = slide.shapes.title
    top = (title.top + title.height) / 914400 + 0.1
    text(slide, title.left / 914400, top, 8.3, 0.9, ['From a static site to a live React application:', 'two phases, two reviews, one pipeline'], size=18, color=WHITE)
    slide.notes_slide.notes_text_frame.text = (
        'About 20 seconds.\n'
        '- Name, student number, module.\n'
        '- One sentence on what the talk covers: how my portfolio evolved across Assessments 1 to 3.'
    )


def introduction(slide) -> None:
    frame(slide, 'Introduction', (
        'About 40 seconds. Rubric 1: objectives, scope, technologies, context.\n'
        '- Objective: show my engineering work with evidence a reader can check.\n'
        '- Scope: one portfolio, built in Phase 1, reviewed, then evolved in Phase 2.\n'
        '- Name the two stacks and why the stack changed (the Phase 2 brief asked for typed components, state, an API, GSAP).\n'
        '- Walk the timeline left to right; the rest of the talk follows it.'
    ))
    text(slide, LEFT, TOP, 6.2, 2.9, [
        [('Objective  ', True), ('A portfolio that proves my engineering work with evidence a visitor can check, not a list of claims.', False)],
        [('Scope  ', True), ('Home, About, Education, Professional knowledge, Pictures, Videos, Blog, live messaging, Readme.', False)],
        [('Context  ', True), ('One codebase taken through the software evolution cycle: build, review, evolve, evaluate.', False)],
    ], size=15)
    card(slide, 7.2, TOP, 2.6, 2.75, 'Phase 1 stack', ['Node 22 build script', 'HTML and CSS', 'Tawk.to chat', 'Appwrite Sites', 'No npm dependencies'])
    card(slide, 10.0, TOP, 2.6, 2.75, 'Phase 2 stack', ['React 19, TypeScript strict', 'Vite 8, React Router 7', 'GSAP 3', 'Appwrite database and realtime', 'GitHub Actions and Pages'], background=GREEN)
    steps = [
        ('Assessment 1 · 1 Oct', 'Phase 1 built and deployed; marked 12/15'),
        ('Assessment 2 · 18 Oct', 'Peer review of a classmate; mine reviewed in turn'),
        ('Assessment 3 · 10 Nov', 'Phase 2 evolved from both reviews; live on GitHub Pages'),
    ]
    width = 3.6
    for number, (heading, body) in enumerate(steps):
        x = LEFT + number * (width + 0.55)
        card(slide, x, 4.85, width, 1.25, heading, [body])
        if number < len(steps) - 1:
            arrow(slide, x + width + 0.07, 5.47, x + width + 0.48, 5.47)


def phase1_overview(slide) -> None:
    frame(slide, 'Phase 1 Development Process', (
        'About 40 seconds. What Phase 1 delivered.\n'
        '- A static site: a Node script renders every page from one shared layout; plain links route, so it works without JavaScript.\n'
        '- Real two-way messaging through Tawk.to, loaded only after the visitor clicks (privacy).\n'
        '- 26 automated tests on the build output, including contrast and link checks.\n'
        '- Deployed to Appwrite Sites; still live for comparison.'
    ))
    picture(slide, PHASE1 / 'evidence' / 'home-desktop.png', LEFT, TOP, 6.6, 4.1, 'Phase 1 home page, chirag-cs5709.appwrite.network')
    x = 7.75
    stat(slide, x, TOP, 2.3, '11', 'pages generated from one layout')
    stat(slide, x + 2.5, TOP, 2.3, '0', 'npm dependencies')
    stat(slide, x, TOP + 1.7, 2.3, '26', 'automated tests passing')
    stat(slide, x + 2.5, TOP + 1.7, 2.3, '2-way', 'live chat, owner reply verified')
    text(slide, x, TOP + 3.45, 4.8, 0.8, ['Built from my own site, chiragaggarwal.tech, as a separate, smaller static portfolio.'], size=13, color=MUTED)


def phase1_process(slide) -> None:
    frame(slide, 'Phase 1 Development Process', (
        'About 50 seconds. Rubric 2: Discovery, Design, two iterations, Evaluation.\n'
        '- Walk the five cards; mention the mark each step got, because the dropped marks set the Phase 2 agenda.\n'
        '- Discovery lost a mark: requirements came from me, not from personas and scenarios.\n'
        '- Iterations lost a mark each: code comments did not explain the structure.\n'
        '- Point at the three design diagrams underneath.'
    ))
    steps = [
        ('Discovery', '2/3', 'Features split into Phase 1 and 2; sitemap; Tawk.to chosen for real messaging'),
        ('Design', '3/3', 'Block, component and control-flow diagrams in Mermaid'),
        ('Iteration 1', '2/3', 'Home and seven pages from one layout; live two-way chat'),
        ('Iteration 2', '2/3', 'CSS for every page, 390 px phones, skill filter, deployment'),
        ('Evaluation', '3/3', '26 tests, keyboard and contrast checks, critique'),
    ]
    width = 2.2
    gap = (WIDTH - 5 * width) / 4
    for number, (heading, mark, body) in enumerate(steps):
        x = LEFT + number * (width + gap)
        card(slide, x, TOP, width, 2.0, f'{number + 1}. {heading}', [body, f'Lecturer mark {mark}'])
    diagrams = PHASE1 / 'report' / 'diagrams'
    picture(slide, diagrams / 'block.png', LEFT, 4.05, 2.4, 1.8, 'Block diagram')
    picture(slide, diagrams / 'component.png', 3.6, 4.05, 5.2, 1.8, 'Component diagram')
    picture(slide, diagrams / 'control-flow.png', 9.4, 4.05, 2.6, 1.8, 'Control flow: chat')


def peer_review(slide) -> None:
    frame(slide, 'Peer Review and Software Evolution Analysis', (
        'About 60 seconds. Rubric 3: reverse engineering, architecture recovery, code inspection, feedback, recommendations.\n'
        '- Middle column: the methods I applied when reviewing a classmate (Assessment 2).\n'
        '- Right column: what came back on my own portfolio, from the classmate and the lecturer.\n'
        '- Key moment: the reviewer tried to understand my code from the live site and failed at step one, because there was no Readme page.\n'
        '- Do not name the classmate on the recording.'
    ))
    table(slide, LEFT, TOP, WIDTH, [
        ['Activity', 'Applied to a classmate (Assessment 2)', 'Received on my portfolio'],
        ['Reverse engineering', 'Chikofsky and Cross taxonomy: build, strict type check, every file and the 20-commit history', 'Walkthrough failed at step 1: no Readme page on the live site'],
        ['Architecture recovery', 'Concept analysis, partitioning and reflexion model checked; tool-generated dependency graph advised', 'Recover a module view from the code and show the tests in it'],
        ['Code inspection', 'Fagan-style checklist on modularity, comments, formatting: 8 confirmed defects', '7 defects, D1 to D7, such as the chat module running on import'],
        ['Constructive feedback', 'Strengths first, then each gap with file:line evidence', 'Lecturer: personas and scenarios, comments that explain structure, a more structured evaluation'],
        ['Recommendations', '10, in priority order', '8 prioritised actions: 7 done in Phase 2, 1 not carried out'],
    ], widths=[2.3, 4.8, 4.8], size=13, height=0.72)


def phase2(slide) -> None:
    frame(slide, 'Phase 2 Improvements', (
        'About 60 seconds. Rubric 4: feedback incorporated, modularisation, documentation, CI/CD, deployment.\n'
        '- Read the table as before and after; every row answers a review comment.\n'
        '- Comments went from 2% to 12% of lines, and every file has an @file header explaining why it exists.\n'
        '- Pipeline: checks first, deploy only after they pass, read-only permissions except the deploy job.\n'
        '- About one minute from push to live.'
    ))
    table(slide, LEFT, TOP, 7.0, [
        ['', 'Phase 1', 'Phase 2'],
        ['Architecture', 'Static HTML from a Node script', 'React single-page app, strict TypeScript'],
        ['Pages', '11', '13, adding Repositories and Readme'],
        ['Content', 'HTML strings in JS modules', '7 JSON files, 2 article files'],
        ['Modules', '24 files', '38 files in 8 folders, one concern each'],
        ['Comments', '2% of lines', '12%; a header on every file'],
        ['Tests', '26, on the build script', '19 unit tests, 8 browser scenarios'],
        ['Deployment', 'Manual, Appwrite Sites', 'CI/CD to GitHub Pages'],
        ['Readme', 'Repository notes only', '/readme renders site/README.md'],
    ], widths=[1.55, 2.4, 3.05], size=12, height=0.48)
    picture(slide, PHASE2 / 'evidence' / 'pipeline-run.png', 8.0, TOP, 4.6, 2.9, '')
    text(slide, 8.0, 4.85, 4.6, 1.3, [
        [('Pipeline  ', True), ('lint, format check, 19 tests, type check and build, then deploy, only on main.', False)],
        'Run 5: green in 1 min 4 s from push to live.',
    ], size=13)


def innovation(slide) -> None:
    frame(slide, 'Innovation and Technical Achievement', (
        'About 50 seconds. Rubric 5: creativity, modern technology, sophistication.\n'
        '- Problem: GitHub Pages is static, with no server and no database, but a reader wants to react to an article.\n'
        '- Walk the diagram: the browser writes straight to Appwrite; table permissions allow create and read, never update or delete.\n'
        '- The row id is visitor, article hash and kind, so the database itself rejects a second reaction.\n'
        '- Realtime pushes the new count to every open copy without a reload.\n'
        '- One line on the supporting ideas: self-documenting Readme, executable walkthrough.'
    ))
    picture(slide, PHASE2 / 'evidence' / 'reactions-live.png', LEFT, TOP, 5.4, 3.4, 'Reactions under an article on the live site')
    x = 6.6
    boxes = [(x, 'Reader A'), (x + 2.15, 'Appwrite database'), (x + 4.3, 'Reader B')]
    for left, label in boxes:
        card(slide, left, TOP + 0.3, 1.7, 0.8, label, [], background=GREEN if 'Appwrite' in label else TINT, size=12)
    arrow(slide, x + 1.72, TOP + 0.7, x + 2.13, TOP + 0.7)
    arrow(slide, x + 3.87, TOP + 0.7, x + 4.28, TOP + 0.7)
    for centre, label in ((x + 1.925, 'create row'), (x + 4.075, 'live event')):
        text(slide, centre - 0.7, TOP + 1.18, 1.4, 0.3, [label], size=11, color=MUTED).text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
    text(slide, x, TOP + 1.65, 6.0, 3.0, [
        [('No server. ', True), ('Table permissions allow anyone to create and read rows and nobody to update or delete them.', False)],
        [('One reaction per reader, no accounts. ', True), ('Row id = visitor + article hash + kind, so the database rejects a repeat.', False)],
        [('Live. ', True), ('A websocket subscription raises the count in every open browser.', False)],
        [('Cheap. ', True), ('The 29 kB SDK loads only on article pages, after the text is on screen.', False)],
    ], size=14)
    text(slide, LEFT, 5.75, 11.5, 0.4, ['Also: the Readme page renders the repository README, and the eight persona scenarios run as a browser script.'], size=12, color=MUTED)


def evaluation(slide) -> None:
    frame(slide, 'Evaluation and Reflection', (
        'About 50 seconds. Rubric 6: lessons, challenges, strengths, limitations, future work.\n'
        '- Numbers first: inspection, walkthrough, tests, pipeline.\n'
        '- Lesson in my own words: reading the code missed defect I3 (a race between the click and the websocket); the two-browser scenario caught it.\n'
        '- Limitations from my critique: proto-personas, no real users, self-inspection, SPA costs.\n'
        '- Future: pre-render routes, think-aloud test with three people, bigger galleries.'
    ))
    stats = [
        ('12', 'defects in a Fagan-style inspection: 6 fixed, 3 accepted, 3 open'),
        ('8/8', 'persona scenarios pass on the live site, desktop and phone'),
        ('19/19', 'unit tests; 0 lint, type or format errors'),
        ('6/6', 'pipeline runs green, 33 s to 2 min 43 s'),
    ]
    width = 2.75
    gap = (WIDTH - 4 * width) / 3
    for number, (figure, label) in enumerate(stats):
        stat(slide, LEFT + number * (width + gap), TOP, width, figure, label)
    half = (WIDTH - 0.4) / 2
    card(slide, LEFT, 3.55, half, 2.1, 'What worked, what I learned', [
        'Reviews gave a concrete agenda: every recommendation traced to a change',
        'Inspection and testing find different defects: the race in I3 surfaced only in the two-browser scenario',
        'CI turned checking into a gate on every push',
    ])
    card(slide, LEFT + half + 0.4, 3.55, half, 2.1, 'Limitations and next steps', [
        'Personas are assumptions; no real users have tested the site',
        'I inspected my own code, without independent readers',
        'SPA cost: blank without JavaScript, 404 workaround on Pages',
        'Next: pre-render routes, think-aloud test with three people',
    ])


def documentation(slide) -> None:
    frame(slide, 'Technical Documentation Plan', (
        'About 30 seconds. Rubric 7: requirements, design, code, testing, deployment, maintenance.\n'
        '- Each row says what exists already and where; Assessment 5 assembles them into one report.\n'
        '- Stress traceability: requirements R1 to R11 point at source files, and scenarios S1 to S8 test them.'
    ))
    table(slide, LEFT, TOP, WIDTH, [
        ['Document', 'Contents', 'Lives in'],
        ['Requirements', 'Personas, 8 scenarios, requirements R1 to R11 (functional and non-functional), each traced to a file', 'Assessment 3 report §2.4'],
        ['Design', 'Block, component and control-flow diagrams; module view; reactions table and permission model', 'DESIGN.md, site/README.md'],
        ['Source code', '@file header on every file, JSDoc on exports, folder guide, Prettier and oxlint as the standard', 'site/src, site/README.md'],
        ['Testing', 'Test plan, 19 unit tests, 8 scenarios with screenshots, defect log I1 to I12', 'site/tests, evidence/'],
        ['Deployment', 'Pipeline jobs, permissions, base path, how to run locally', 'workflow file, README'],
        ['Maintenance', 'Known issues, open defects, change history in Git, review log', 'README, Git history'],
    ], widths=[2.0, 6.6, 3.3], size=13, height=0.6)


def conclusion(slide) -> None:
    frame(slide, 'Conclusion', (
        'About 20 seconds.\n'
        '- Three takeaways, one sentence each.\n'
        '- Point to the live site and the repository.\n'
        '- Thank the viewer.'
    ))
    takeaways = [
        ('Reviews drove evolution', 'Lecturer and peer feedback set the Phase 2 agenda, and each item is traceable to a change.'),
        ('Automation as a gate', 'Lint, format, tests and types run on every push; only passing commits go live.'),
        ('Evidence over claims', 'Scenarios replay on the live site, and the inspection log records what is still open.'),
    ]
    width = 3.75
    gap = (WIDTH - 3 * width) / 2
    for number, (heading, body) in enumerate(takeaways):
        card(slide, LEFT + number * (width + gap), TOP, width, 1.6, heading, [body], background=GREEN if number == 0 else TINT)
    text(slide, LEFT, 3.85, 11.5, 1.3, [
        [('Live site  ', True), ('chiragagg5k.github.io/ul-university-notes', False)],
        [('Phase 1  ', True), ('chirag-cs5709.appwrite.network', False)],
        [('Source  ', True), ('github.com/ChiragAgg5k/ul-university-notes', False)],
    ], size=14)
    text(slide, LEFT, 5.65, 11.5, 0.5, ['AI use: Claude Code assisted with building the site and drafting these slides, as declared in each report.'], size=11, color=MUTED)


def main() -> None:
    deck = Presentation(str(TEMPLATE))
    slides = list(deck.slides)
    builders = [title_slide, introduction, phase1_overview, phase1_process, peer_review, phase2, innovation, evaluation, conclusion, documentation]
    for slide, build in zip(slides, builders):
        build(slide)
    order = deck.slides._sldIdLst
    identifiers = list(order)
    order.remove(identifiers[9])
    order.insert(8, identifiers[9])
    OUTPUT.parent.mkdir(exist_ok=True)
    deck.save(str(OUTPUT))
    print(OUTPUT)


if __name__ == '__main__':
    main()
