# Review brief: CS6451 paper talk slides

Hand this file to a reviewer. Everything it needs is in this folder and the one above it.

## Context

- Module: CS6451 Advanced Software Design, University of Limerick.
- Task: a 30-minute group talk (Group 1, four speakers assumed) presenting one paper, given on Wed 18 November 2026. About 20 minutes of talk by word count, including the figure walkthroughs; the rest is questions.
- Paper: R. Chen, S. Li and Z. Li, "From Monolith to Microservices: A Dataflow-Driven Approach", APSEC 2017, pp. 466–475, DOI 10.1109/APSEC.2017.53.
- The deck was drafted with AI assistance from the team's reading notes. It has been through two review passes; slides 7 and 9 (the paper’s figures) are new since then.

## Files

| File | What it is |
| --- | --- |
| `slides.pdf` | The 14 slides, 1920×1080, as exported, including two slides of the paper’s own figures (Figs. 8–9 and 12) |
| `NOTES.md` | Each slide's visible text and its full speaker notes, with speaker tags and timings |
| `../Readings/MSA-Dataflow_Chen-2017.pdf` | The paper: the source of truth |
| `../README.md` | The team's reading notes, critique and talk plan the deck was built from |

## What to check, in order

1. **Accuracy against the paper.** Every factual claim on the slides and in the notes. Pay most attention to:
   - slide 8: the counts of 3 crawl, 6 extract and 2 parse operations, and the three service names (Figs. 8–9);
   - slide 10: the four case 2 candidates and the claim that Text Extraction is reused;
   - slides 4–5: the wording of rules 1–5;
   - slide 6: the summary of Algorithm 1;
   - slide 11: the four claims against Service Cutter and the limitations the authors admit;
   - section numbers cited in the slide footers.
2. **References.** Slide 14. Confirm the Gysel et al. (2016) Service Cutter entry and the Li et al. (2019) Journal of Systems and Software follow-up (DOI 10.1016/j.jss.2019.07.008), including what slide 13 says the follow-up does.
3. **Critique (slide 12).** Is each point fair to the paper? Is anything the paper already answers presented as a weakness?
4. **Timing.** Speaker notes are written to be read aloud. Do the timings add up to about 26 minutes, and does any slide's script run long?
5. **Clarity.** Would a classmate who hasn't read the paper follow the method from slides 3–10 alone?
6. **Slide design.** Text density, anything hard to read from the back of a room, anything that looks clipped.

## How to report

A list of findings, each with: slide number, the problem, what the paper actually says (with page or figure), and a suggested fix. Separate factual errors from suggestions. Don't rewrite the deck; flag what to change.

## Known gaps

- Group member names and the speaker split are placeholders (`[names]`, `[Speaker N]`).
- The PDF is a local render of the deck; the live version may differ slightly in spacing.
- The pseudo-code on slide 6 loses its indentation in this render.
