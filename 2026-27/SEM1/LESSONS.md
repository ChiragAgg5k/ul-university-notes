# Lessons from feedback

What markers and reviewers have said about my work this semester, turned into checks to run before the next submission. Add to this file every time feedback arrives.

## Before submitting any report

- [ ] **Show the method, not only the result.** Name the method, the alternatives considered, and why this one was chosen. If the method has a checklist, run it visibly in the report.
- [ ] **Tie every decision to evidence.** A design decision points to the code that implements it (file and line); a requirement points to a persona or scenario; a claim points to a measurement, a commit or a source.
- [ ] **Derive numbers from the thing itself.** Do the analysis the brief names, on the artefact the brief names, before reaching for a measurement that approximates it.
- [ ] **Explain structure in the code.** A header comment on every file saying why it exists, and comments that divide long files into sections.
- [ ] **Check the brief line by line.** Every deliverable named in the brief exists and can be found in one step (the Phase 1 portfolio had no Readme page).
- [ ] **Claim only what was checked.** No "none of them do X" from a quick read; a test that sets focus from script does not prove keyboard access; "fixed" means the failing input was tried again.
- [ ] **Write the evaluation academically.** Named method, entry and exit criteria, a log of findings, and stated limits.

## By module

### CS5741 Concurrency and Parallelism

Assignment 1, Parallel Numerical Integration: **23/30**, 11 November 2026, Faeq Alrimawi.

| Comment | What to do in Assignment 2 |
| --- | --- |
| "unclear what chunk sizes have been considered or if foster's checklist for this has been applied" | For each of Foster's four steps, list the options considered (for partitioning: the chunk sizes or granularities tried), then answer his checklist questions for that step one by one |
| "there should more explicit reference to the code that relates to the decisions made in the first part" | After each design decision, cite the method and line numbers that carry it out, or show the excerpt |
| "parallel part should be calculated based on the implementation/code" | Work out the serial and parallel fractions for Amdahl's law by reading the code: which statements run once and which run in the parallel region. Use measured timings only to compare against that prediction |

### CS5709 Software Engineering Evolution

Assessment 1, portfolio Phase 1: **12/15**, 14 October 2026, Salim Saay.

| Comment | Lesson |
| --- | --- |
| Requirements "determined solely by the developer" | Start from personas, scenarios and existing cases, and trace each requirement back to one |
| "a clear human-centred design approach is needed" | Name the design approach and show its steps |
| "The code structure should be explained in the code comments" (both iterations) | Header comments and section comments, written as the code is written |
| The review "can be more structured and academic" | Use a named evaluation method with recorded results |

Peer review of Phase 1, and the review of the first Assessment 3 submission, added:

- A deliverable in the brief was missing and nobody noticed until a reviewer walked a scenario. Walk the brief as a user before submitting.
- The report described the intended design, not one recovered from the code. Describe what the code is.
- Several claims in the first Assessment 3 report went beyond the evidence. Read each claim and ask what was actually run or read to support it.

### Pattern across both modules

Both lost marks in the same place: the work was sound, but the report did not show the reasoning or connect it to the artefact. Markers reward the visible chain from method to decision to code to result.
