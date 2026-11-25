# Assessment 5: Technical report

SE Evolution. The final technical documentation of the digital portfolio, covering both phases. Earlier work: [Phase 1](../Assignment%201/README.md), [peer review](../Assignment%202/), [Phase 2](../Assignment%203/README.md), [presentation](../Assignment%204/README.md).

Deadline: **Fri 4 December 2026, 12:00 (noon)** on Brightspace, dropbox "Final Assignment: Technical documentation" (ID 51835). The brief below was copied from the dropbox on 25 November 2026.

## Brief

Format: 12pt Times New Roman, APA citations and references. The header repeats the peer-review template's fields (student name and ID, module instructor, author, reviewer, date), and the abstract line still reads "summary of your review and feedback".

1. Abstract, 250 words
2. Introduction
3. Requirements specification
4. Design description
5. Source code documentation
6. Test documentation
7. Review documentation
8. Innovations documentation
9. Conclusion
10. References, APA

The brief numbers its sections 1, 2, 3, 3, 4, 5, 7, 8, 9. The list above is the order it gives.

### Marking scheme (from the brief, out of 20)

| Section | What the marker looks for | Marks |
| --- | --- | --- |
| Introduction | Project overview, objectives, scope, background; professional writing and academic formatting | 2 |
| Requirements specification | Functional and non-functional requirements, organised, complete, traceable to the project objectives | 3 |
| Design description | Architecture, UML diagrams, database design, technology stack, component interactions, design decisions | 3 |
| Source code documentation | Code structure, modules, classes, functions, comments, coding standards, repository organisation, deployment instructions | 3 |
| Test documentation | Test plan, test cases, testing method, test results, screenshots or other evidence, defect reporting | 3 |
| Review documentation | Reviews, feedback received, evaluation results, lessons learned, improvements made after review | 2 |
| Innovation documentation | Novel features, emerging technologies (AI, blockchain, cloud, containers), originality, justified | 2 |
| Conclusion | Achievements, outcomes, limitations, future work | 1 |
| References | APA in-text citations and reference list; quality and relevance of sources | 1 |

### The Brightspace rubric is different

The rubric attached to the dropbox has no points and three criteria. Write to satisfy both.

| Criterion | Top level |
| --- | --- |
| Independent research | Depth and relevance of a literature review on software evolution topics, with actionable points, clear motivation, a stated research method and reliable references |
| Application of research findings | How the findings were applied to the portfolio and its documents is clearly outlined, with substantial improvement shown |
| Document presentation and referencing | Correct citation style and bibliography, font, format and clear writing throughout |

So the report needs research in it, not only a description of the system: each section should cite the standard or study it follows (for example ISO/IEC/IEEE 29148 for requirements, IEEE 1016 for design descriptions, ISO/IEC/IEEE 29119-3 for test documentation, Fagan for inspection, Lehman's laws for evolution), and say what that source changed in the portfolio or its documents.

### Inconsistencies to settle

- **Weight**: the brief says 30%, its table totals 20, and the module overview (tracker) says 20%. Not asking; treat it as the larger share and write to both schemes.
- **Which portfolio**: the brief doesn't say, but "Technical documentation" of "the digital portfolio project" (rubric) means the Phase 2 site as it stands, with Phase 1 as its history.
- **Reviewer name field**: carried over from the peer-review template. Keep the Assessment 2 classmate out of the repository as before (`private.json` tokens).

## Lecture 12, Software documentation (24 Nov)

What the marker will expect, from his slides:

- Process documentation (plans, schedules, standards) versus product documentation; product splits into **system** documentation (requirements, architecture, detailed design, commented code and generated docs such as JSDoc, test plans and cases, V&V results, known bugs) and **user** documentation (functional description, installation, introductory manual, reference manual, administrator's guide).
- Document best practice: cover page, chapters with sections and subsections, an index where there is a lot of reference material, a glossary for ambiguous terms.
- Standards: process, product (identification, structure, presentation, update) and interchange. IEEE standard for user documentation.
- Documentation quality: cites an IEEE paper on measuring documentation quality (IEEE Xplore document 10173973). Worth reading and citing for the review section.

## Plan: where each section's material already exists

| Section | Existing material | What is new |
| --- | --- | --- |
| Introduction | A3 summary and README overview; A4 slides 1–2 | Objectives and scope stated as a list the requirements trace back to; background on software evolution with citations |
| Requirements | A3 §2.4: four portfolios reviewed, 3 personas, 8 scenarios, 11 requirements traced to files | Formal FR and NFR tables with IDs, priority, source (objective, persona or scenario) and verifying test, following 29148 |
| Design | A3 §3.1 module view, `site/README.md` §2; A1 block, control-flow and component diagrams | UML: component, sequence for a reaction (browser → Appwrite → realtime), deployment (GitHub Actions → Pages, Appwrite sgp); the `reactions` table schema and permissions; design decisions with alternatives considered |
| Source code | `@file` headers and JSDoc on all 38 files; Prettier and oxlint config; pipeline | Folder tree with one line per folder, coding standards, a generated JSDoc reference (TypeDoc), deployment and run instructions |
| Test | 19 unit tests, Playwright walkthrough of 8 scenarios with screenshots, 12-defect log | Test plan in 29119-3 shape: scope, approach, entry and exit criteria; test-case table; fresh run of everything on the current site; defect reports |
| Review | Lecturer feedback A1 (12/15), peer review (A2), self-inspection (A3 §5), A4 presentation; LESSONS.md | Table of every review: feedback, change made, commit; lessons learned. Add A3 marks if they arrive before 4 Dec |
| Innovation | Appwrite reactions with realtime, GitHub REST repositories page, CI/CD | Justify against emerging-technology literature (cloud BaaS, serverless); possibly one small new feature if time allows |
| Conclusion | A3 §5.5 critique, A4 closing slide | Achievements, limits (proto-personas, no real-user tests), future work |

## Writing rule

Same as Assessments 3 and 4: the abstract, the critique, the lessons learned and the conclusion are Chirag's own writing. Tables, diagrams, code facts and the reference list can be prepared, and AI help is declared in the report.

## Before submitting

Walk the report against the checklist in [LESSONS.md](../../LESSONS.md). For this module in particular: the method named for every section, each claim tied to a file, commit or measurement, a paper-style title without the module name, author–year APA citations, and a structured, academic evaluation.

## Report

`report/report.md` is the source; `node report/pdf.mjs` renders the PlantUML diagrams in `report/diagrams/` and writes `report/dist/ID26253925_CS5709_Assessment5_Technical_Report.pdf` (gitignored, with `private.json`). Sections Chirag writes are `<div class="todo">` boxes; the script prints how many remain and the abstract word count.

## Next steps

1. Read the sources in the References list; find the Lecture 12 documentation-quality paper and two or three studies on documentation in software evolution; fill the method table in §1.4.
2. Re-run the walkthrough on the live site (`SITE=… npm run walkthrough` in `Assignment 3/site/`; S5 writes a real reaction) and point §5.3 at the fresh results.
3. Decide on defects I5–I7: fix them in `Assignment 3/site/` or keep them open.
4. Check design decisions D1–D7 and objectives O1–O4.
5. Write the boxed sections: abstract, background, method, lessons learned, innovation paragraph, conclusion.
6. Walk the PDF against LESSONS.md; target a full draft by Wed 2 December.
