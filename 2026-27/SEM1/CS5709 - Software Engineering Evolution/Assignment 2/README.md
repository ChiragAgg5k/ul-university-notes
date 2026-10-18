# CS5709 Assessment 2: Project Peer Review

Weighting 15%. Due Fri 23 October 2026, 23:59, on Brightspace. Late work is accepted for one day only, with a 10% penalty. Learning outcome: evaluate program comprehension strategies and techniques for change impact analysis.

## Task

Critically evaluate a peer's Phase 1 portfolio and give constructive feedback on its architecture recovery, code inspection, technical report (the README page) and directions for further improvement. The deliverable is one peer review report.

## Report structure (from the brief)

Header: module code, title, student name and ID, module instructor, author name (whose portfolio is reviewed), reviewer name, date.

1. Table of contents
2. **Summary**: a 250-word summary of the review and feedback.
3. **Detailed feedback**
   1. **Reverse engineering** (max 2 pages, 12pt Times New Roman): the reverse engineering method used, analysis of the current state, comments and recommendations.
   2. **Architecture recovery and code inspection** (max 2 pages): the code inspection method used. Evaluate coding structure, modularity, comments and formatting with objective, evidence-based observations. Give specific, actionable recommendations, for example refactoring large functions into smaller modules.
   3. **Feedback** (2 pages): overall constructive feedback on the whole portfolio, with specific, actionable recommendations.
   4. **Reflection on review** (max 1 page): what you learned from researching, reviewing and recommending.
4. **References** in APA style.

## Rubric (15 marks)

| Item | What is checked | Marks |
|---|---|---|
| 1. Reverse engineering | Research on reverse engineering; analysis of the peer's design and architecture recovery; whether requirements discovery used a scientific method (personas, scenarios); features listed and grouped into Phase 1 and Phase 2; scheme and table of contents; clear, professional recommendations | 1,1,1,1,1 = 5 |
| 2. Architecture recovery and code inspection | Whether architecture recovery (concept analysis, partitioning, interactive analysis) was applied, with block/control-flow and component diagrams; research on code inspection following the Source-Code Analysis for Recovery Architecture method; modular structure, comments, formatting; recommendations | 1,1,1,1,1 = 5 |
| 3. Feedback | Overall constructive review with actionable recommendations on requirements discovery and tools, the architecture recovery method, and code inspection | 1,1,1,1,1 = 5 |

## Relevant lectures

- Lec3: Software Maintenance and Architecture Conformance
- W4: Discovering Requirements (personas, scenarios)
- Lec5: Reverse Engineering
- Weeks 5 and 6: software inspection and change impact analysis (practised in class)

## Notes

- AI policy: open book, but material must not be copied directly from AI. The review text must be your own.

## Progress

- [x] Brief and rubric captured (this file)
- [x] Peer allocated (their A1 PDF stays out of the repo)
- [x] Evidence gathered: `FINDINGS.md` (gitignored, since it names the peer)
- [x] Report pipeline: `node report/pdf.mjs` builds the PDF (12pt Times New Roman, red to-write boxes, checks page limits and summary word count)
- [x] Summary and sections 1–4 written; handwritten notes for the summary and sections 1–2
- [x] Submitted `report/dist/ID26253925_CS5709_Assessment2_Peer_Review.pdf` on 18 October 2026 (Brightspace submission ID 1024621)
