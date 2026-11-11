# Assignment Part 2: Microservices architecture

CS6451 Advanced Software Design · team assignment, same team as Part 1 · **15% of the module** · due **Thu 10 December 2026, 23:59** on Brightspace (Week 14). No late submissions. An F or NG here is an F for the module.

Spec: [CS6451-AssignPart2-Spec-S1AY2627.docx](CS6451-AssignPart2-Spec-S1AY2627.docx), version 1.0, read on 11 November 2026. The lecturer may still make minor amendments.

## Task

Refactor the Part 1 monolith (the gym membership system) into a microservices architecture using a published approach, measure the quality of the result with software metrics, and judge how well the approach worked. Our group's approach is Chen, Li & Li (2017), the dataflow-driven one presented in the [paper talk](../../Paper%20Talk/README.md).

## Report, in this order

| Section | Limit | Marks |
| --- | --- | --- |
| Front cover: scenario title, names and IDs, module details | | |
| Table of contents | | |
| Narrative description of the Part 1 monolith, with an architecture diagram and a class diagram | 2 (the spec says "a two (maximum)", presumably pages) | 1 |
| Description of the porting approach, including a section on the key properties of microservices, illustrated with examples from our own monolith | 5 pages | 4 |
| Architecture diagram of the microservices architecture | | 2 |
| Implementation excerpts that illustrate the microservices | | 3 |
| Evaluation of the quality of the result, including software metrics | | 3 |
| Evaluation of the approach selected | | 2 |
| One paragraph per team member on their contribution to Part 2 | | pass/fail |
| "Reflection": each member on what they learned, what worked and what did not, and the value of the project | | pass/fail |
| List of prompts used with generative AI | | pass/fail |
| References | | pass/fail |
| Appendix: the slides of the team's guest lecture on its approach | | |

Marks total 15. All members must contribute equally to both the implementation and the writing.

## Evaluation tool

MicroValid: Cojocaru, Uta & Oprescu (2019), "MicroValid: A Validation Framework for Automatically Decomposed Microservices", CloudCom 2019, doi:10.1109/CloudCom.2019.00023. Other approaches and metrics can be proposed by email.

## Rules that affect how we work

- Generative AI may be used to bootstrap artefacts such as diagrams and code. It must not be used to improve the quality of the writing: "student voice must be clearly audible at all times". Every prompt goes in the report.
- Language and environment are our choice. Reused material must be understood, cited, extended, and clearly separated from what we added.
- Teams present their work in tutorials for feedback.
- Hand-drawn diagrams, photographed, are acceptable.

## Open questions

- The list of approaches chosen by each of the five groups is a SharePoint spreadsheet linked from the 10 November announcement; it needs a UL Microsoft sign-in and has not been read.
- The deadline falls on the day of the CS5741 exam (12:30) and the day after the CS5707 exam, so the report should be finished before exam week.
