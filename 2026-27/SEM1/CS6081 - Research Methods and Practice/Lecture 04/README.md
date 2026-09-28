# Lecture 04: Literature Review, Positioning, and Plagiarism
CS6081 — Research Methods and Practice (SESD) | 2026/7 SEM1 | Lecturer: Jim Buckley (T2-015)

- [Slides](Slides/Lecture%204%20SESD%202627.ppt)
- [Week 8 poster exercise: brief and tracker](../Poster/README.md) (set in this lecture)

## Honing in on a research question

- **Finding an idea:** your own strengths and interests, a preliminary literature review, management (if you're working), past project titles, a (potential) supervisor, a notebook of ideas, brainstorming with peers.
- **Delphi meetings:** state the area → others ask for clarification → each member proposes X ideas with justification → ideas are shared anonymously → repeat, with proposers revising their own ideas or backing others.
- **A good topic:** holds your interest, is within your capability (comfort zone, money, access to data), is big enough but scoped, has symmetric outcomes (any result is worth reporting), and fits your career goals.
- **A good research question:** passes the Goldilocks test on scope and produces new insight. It doesn't need new theory, but it must have at least a hypothesised *why*. Example: "LOC is a primary quality predictor *because*…"

## Positioning a question using the literature

Buckley's examples, each a different way to get from existing work to a new question:

| Approach | Example |
| --- | --- |
| Mapping study | Von Mayrhauser and Vans on software comprehension |
| Is **all** of it believable? | O'Brien and Buckley: Von Mayrhauser treated Soloway and Brooks as one model. They disagreed and showed empirically that the two are separate |
| Apply across domains | Bloom's taxonomy applied to programmers (Tara Kelly), with a better coding scheme than a verb table: reductionism, ambiguity, bucket phrases |
| Assess future work | Wilde suggested shared sets but didn't explore them. LeGear followed that up: shared code across features, reuse, component recovery |
| Talk to experts | Rosik: architecture consistency at IBM (as-designed vs as-implemented) |

"Research prompts research": in O'Brien's study, programmers switched to bottom-up in the last quarter of the session, which raises the question of whether comprehension is phased. Kelly's Bloom work found no synthesis-level activity. Each finding opens the next question.

Moving past positioning means gathering evidence: empirical studies (O'Brien, Kelly), or design research that builds an approach or tool and then evaluates it in vivo (LeGear, Rosik).

## Plagiarism and referencing

- Plagiarism means passing off someone else's work or ideas as your own. You can build on others' work if you **acknowledge** it and **own** it (understand it and paraphrase it).
- A citation has three parts: the **reference** (authors, year, title, DOI, plus venue details), the **in-text citation** (author-date or numeric), and the **text** itself (a direct quote or a paraphrase).
- UL uses Harvard: [Cite It Right](http://libguides.ul.ie/citeitright). Use "UL Harvard 2016" in EndNote ([EndNote guide](https://libguides.ul.ie/referencing-endnote/)).
- Short quotes (about 20 words or fewer) go in quotation marks. Longer quotes are indented. Paraphrasing is preferred because it shows you understood the source.
- AI: largely undetectable, but you have to defend your work in person (the poster, the dissertation viva). Use it transparently.

## Exercises in the lecture

- **Empirical design (SE):** evaluating how staff feel about, and work with, a new financial information system. Consider who takes part, sample size, piloting, timing, location, what data is captured and how, data quality, analysis, reporting, and ethics. Suggested answer: Delphi plus a survey for feelings, think-aloud and usage logs (back-outs) for difficulties.
- **Spreadsheet paper critique:** the examples are illustrative rather than representative, only open-source spreadsheets were used, and there is no error taxonomy. Issues in the paediatric-dose sheet: no data validation, a constant hard-coded in a formula, mg/µg confusion, no documented testing.
