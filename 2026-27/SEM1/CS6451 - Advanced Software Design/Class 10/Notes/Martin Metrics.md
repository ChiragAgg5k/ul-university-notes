# Martin's metrics: stability, abstractness and the main sequence
CS6451 — Advanced Software Design | 2026/7 SEM1 | Class 10

Source: Lecture L slides, based on Robert C. Martin, *Agile Software Development: Principles, Patterns, and Practices* (2002). The lecture's thesis: OO is a set of tools for **dependency management**, and SOLID manages dependencies so that volatility stays contained.

## Part 1: SOLID, the lecture's examples

| Principle | Slide example | Point to remember |
| --- | --- | --- |
| Seven design smells | Rigidity, fragility, immobility, viscosity, needless complexity, opacity (the slide says 7, lists 6; Martin's book adds needless repetition) | These are what SOLID prevents |
| SRP | "One reason to change" = changes come from one person or one narrow business group | Reason to change is about *who* asks for changes |
| OCP (Meyer) | `DrawAllShapes` with a `switch` on `itsType` vs a virtual `Draw()` | Closure is **strategic**: no program is 100% closed (e.g. "draw circles first" reopens it). Push `new` into factories (dependency firewall) |
| LSP | `Square` derived from `Rectangle` breaks a `unitTest` that sets width and height independently | Design by contract: a subtype may not **strengthen preconditions** or **weaken postconditions**. Fixing with `typeid` checks violates OCP |
| DIP | `copy()` from keyboard to printer grows `tapeReader`/`tapePunch` flags; fix with `Reader`/`Writer` interfaces | "If OCP states the goal of architecture, DIP states the primary mechanism." Allowed exceptions: object creation (use factories) and stable classes like `string` |
| ISP | One fat server interface serving several clients | Segregate interfaces per client so a change for one client does not recompile the others |

## Part 2: package principles and metrics

### Principles
- **ADP, Acyclic Dependencies**: the module dependency graph must be a DAG. Cycles make modules immobile (none can be reused alone). Tool: JDepend.
- **CCP, Common Closure**: code with different volatility goes in different modules, and a module depends only on modules *less* volatile than itself. (Usually taught with REP, Release-Reuse Equivalency, and CRP, Common Reuse.)
- **SDP, Stable Dependencies**: depend in the direction of stability.
- **SAP, Stable Abstractions**: the more stable a module, the more abstract it should be.

### Formulas

| Metric | Formula | Range | Meaning |
| --- | --- | --- | --- |
| Ca, afferent coupling (fan-in) | modules that depend on this one | count | Responsibility: many dependants make it hard to change |
| Ce, efferent coupling (fan-out) | modules this one depends on | count | Many reasons to change |
| I, instability | Ce / (Ca + Ce) | 0 = stable, 1 = instable | |
| A, abstractness | Na / Nc (abstract classes and interfaces / all classes) | 0 = concrete, 1 = abstract | |
| D, distance from main sequence | \|A + I − 1\| | 0 = on the line A + I = 1 | Slides suggest D < ~0.05 is "close" |

The three rules (slide 55): no cycles (ADP); every dependency points to a module with I ≤ the depender's I (SDP); every dependency points to a module with A ≥ the depender's A (SAP).

The slides stress these are **crude indicators, not laws**; informed interpretation is essential.

### Worked example: the Saver design (slides 37–39)
Modules: `DocumentProcessor` uses `Saver` (holds `ISaver`); `DatabaseSaver` and `FileSystemSaver` implement it.

| Module | Ca | Ce | I | A | D |
| --- | --- | --- | --- | --- | --- |
| Saver (only `ISaver`) | 3 | 0 | 0 | 1 | 0 |
| DocumentProcessor | 0 | 1 | 1 | 0 | 0 |
| DatabaseSaver | 0 | 1 | 1 | 0 | 0 |
| FileSystemSaver | 0 | 1 | 1 | 0 | 0 |

Every module is on the main sequence. In the earlier design, where `DocumentProcessor` depends directly on both savers and picks one with an `if`, the savers have Ca = 1, Ce = 0, so I = 0 while A = 0, giving D = 1: concrete and stable, hard to change.

The two bad corners (Martin's names, not on the slides): **(0,0) zone of pain**, concrete and stable, e.g. a concrete DB schema everyone uses; **(1,1) zone of uselessness**, abstract and nobody depends on it.

### The X / Y dilemma (slides 42–50)
X is stable (many dependants), Y is instable (depends on many). If X names a class in Y, Y becomes stable while still holding volatile code: an SDP violation. Fix with DIP: new module I with abstract class AC; X uses AC, Y implements it. Both now depend toward the more stable, more abstract I.

## Links to other work
- **Assignment Part 2** evaluates the microservices split "with software metrics" (MicroValid). Ca, Ce, I, A and D per service are a natural set to report alongside it.
- The last slide says to look up the **C&K metrics** (Chidamber & Kemerer 1994): this is the same suite as the CS6081 poster.
- Exam (15 Dec): expect to compute I, A and D for a small package diagram and to explain LSP with Square/Rectangle and DbC.
