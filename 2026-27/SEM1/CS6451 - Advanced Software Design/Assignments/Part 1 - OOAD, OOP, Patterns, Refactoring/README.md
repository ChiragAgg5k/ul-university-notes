# Assignment Part 1: OOAD + OOP + Patterns + Refactoring

CS6451 — Advanced Software Design | 2026/7 SEM1 | Lecturer: J.J. Collins

- [Specification v1.0](CS6451-AssignPart1-Spec-S1AY2627-v1.pdf) (issued Wed 23 Sep 2026, Week 3)
- [Marking scheme v1](CS6451-AssignPart1-MarkingScheme-S1AY2627-v1.pdf)

**Status: team formed (Brightspace Group 1, 23 Sep 2026).** Scenario and language not yet chosen.

## Key facts

| | |
| --- | --- |
| Weight | 25% of the module. An F or NG in the assignment means an F in the module |
| Deadline | **23:59 Sun 1 Nov 2026** (the spec calls this Week 9) on Brightspace. Late work is not accepted |
| Team | 3 or 4 people. **Done: Group 1 on Brightspace, 4 members** (see [Team](#team)), so no `CS6451 - team` email is needed |
| Walkthrough | May be required in weeks 10–15. Not attending means an F |
| Language / IDE | Your choice |
| Architecture | **Monolithic only**. Must include MVC plus one pattern you researched yourself. Not MVC, Broker or Scheduler, which were covered in lectures. Microservices belong to Part 2 |
| Scenario | Must have enough business rules to be compute-heavy, not a GUI over a database. Examples: traffic/airport simulation, document/games framework, car/DVD/hotel rental. Example rule set: different discount policies for different customer categories |
| Generative AI | Allowed for bootstrapping diagrams and code. **List every prompt** in the report. Do **not** use it to polish the writing: the report must be in the students' own voice |
| Tools | Use a UML workbench (not Word or PowerPoint) for the recovered blueprints (§10), and justify the choice. Analysis sketches may be drawn on paper and photographed |
| Reuse | Existing projects may be reused, but you must cite them, show you understand them, add value, and clearly separate sourced work from your own |
| Contribution | Everyone must contribute **equally to the code and to the report**. A non-contributor gets an F and the rest of the team is capped at C3. Report team problems to the lecturer early |

Sample projects go up on Brightspace on Mon 28 Sep (Week 4). The spec may receive minor amendments up to Week 8, so check for a newer version.

## Report checklist and marks

Sections must appear in this order. The marking scheme totals 26, but its item totals add up to 25. Ask the lecturer which item carries the extra mark.

| # | Section | Must contain | Marks | Done |
| --- | --- | --- | --- | --- |
| — | Presentation | Front cover (scenario title, names, IDs, module), **blank marking scheme**, table of contents, page numbers, spelling and grammar checked, diagrams with few line crossings | P/F | [ ] |
| 1 | Narrative | Business scenario, max 1 page | 1 | [ ] |
| 2 | Software lifecycle | Chosen lifecycle, justified, max 2 pages. Include a paragraph on balancing complexity management with agility | 1 | [ ] |
| 3 | Project plan | Iterative plan with deadlines, deliverables and roles. A short paragraph on each member's role and contribution. Industry-experience table (domains, languages, frameworks) | P/F | [ ] |
| 4 | Requirements | Use case diagram(s) · 2 structured use case descriptions (Week 2 template) · 2 quality attributes, one of which must be **extensibility**, with tactics (Bass et al. 2019, tactics chapter) · 2 GUI prototypes | 4 (1 each) | [ ] |
| 5 | Architecture | Max 2 pages. MVC plus one self-researched pattern, monolithic, at least one high-level package diagram. Describe the hosting stack: web server, application server, EIS/database, message bus | 1 | [ ] |
| 6 | Analysis sketches | Candidate objects and how they were found · class diagram (inheritance, aggregation, composition, associations, dependencies, visibility, multiplicity; no duplicated attributes or methods; interfaces with pre/postconditions) · sequence or communication diagram · **state chart** with annotated transition strings, for an object that appears in that sequence/communication diagram · ER diagram with cardinality (P/F) | 4 | [ ] |
| 7 | Transparency | Tables: packages with class counts and totals · classes per package with author and LOC · LOC per member · who did patterns, testing, CI/CD · weekly diary for Weeks 4–12 (contributions, issues, next week's plan per member) | P/F | [ ] |
| 8 | Code snippets | Compiles and runs (1) · commented, intent clear (1) · key use cases (1) · architectural patterns, MVC/REST plus the other one, focused on the business tier (2) · **4 design patterns** (2) · 2+ automated tests (1) · version control visualisations (P/F) | 8 | [ ] |
| 9 | Added value | **CI/CD** plus **software metrics leading to refactoring**. UI and ORM do not count | 2 | [ ] |
| 10 | Recovered blueprints | Drawn in a UML workbench from the implementation: design-time package diagram (1) · component and deployment diagrams (1) | 2 | [ ] |
| 11 | Critique / evaluation | Max 1 page: quality of the design and code, usefulness of the diagrams and UML, how to evaluate and document the architecture | 1 | [ ] |
| 12 | Reflection | Each member: what they learned, what worked and what didn't | 1 | [ ] |
| 13 | GenAI prompts | Every prompt used | P/F | [ ] |
| 14 | References | | P/F | [ ] |

The implementation is a lightweight proof of concept, not a full enterprise system. Put the effort into the business tier. The front end can be simulated with Postman, and the data layer with file I/O plus DTOs or a Repository. Keep the business classes separate from the UI. The spec rewards extra relevant artefacts, such as timing diagrams, and quality attributes like performance and extensibility.

## Plan

The suggested plan comes from the spec (Table 3). Dates assume Week 1 started Mon 7 Sep.

| Week (w/c) | Workflow | Done |
| --- | --- | --- |
| 3 (21 Sep) | ~~Form the team~~ (done: Group 1). Assign roles, agree the scenario, set up GitHub, look at existing projects, start requirements | [ ] |
| 4 (28 Sep) | Architecture and analysis. Team deadline Wed 30 Sep. Sample projects released Mon 28 Sep | [ ] |
| 5 (5 Oct) | Iteration 1: architecture, 2 key use cases, 2 test cases | [ ] |
| 6 (12 Oct) | Iteration 2: 2 more use cases, design pattern(s) | [ ] |
| 7 (19 Oct) | Iteration 3: design pattern(s), added value (CI/CD, metrics, refactoring) | [ ] |
| 8 (26 Oct) | Recover the architecture and design, then finish the report. **Due Sun 1 Nov 23:59** | [ ] |

Suggested roles (spec Table 2): Project Manager, Documentation Manager, Business Analyst / Requirements Engineer, Architect, Systems Analyst, Designer (design recovery), Technical Lead, Programmers (each member writes at least one package across all tiers), Tester, DevOps.

## Team

Brightspace **Group 1**.

| Member | ID | Roles | Industry experience |
| --- | --- | --- | --- |
| Chirag Aggarwal | 26253925 | | Platform Engineer at Appwrite (open-source backend platform): PHP 8 / Swoole, Kubernetes, KEDA, Grafana / OpenTelemetry. Complete this row |
| Bharat Doodi | | | |
| DineshReddy Mogili | | | |
| Dhruv Punj | | | |

## Decisions

- Scenario: _TBD_
- Language / stack: _TBD_
- Self-researched architectural pattern: _TBD_
- 4 design patterns: _TBD_
- Quality attributes: extensibility + _TBD_
- Lifecycle: _TBD_
- UML workbench: _TBD_

## Related notes

- [Class 03: Statecharts](../../Class%2003/Notes/Statecharts.md), for the state chart in §6
- [Class 01: Design by Contract](../../Class%2001/Homework/Design%20by%20Contract%20-%20Two%20Slides.md), for interface pre/postconditions in §6
- [Class 02: SOLID](../../Class%2002/Notes/SOLID.md) and [DDD](../../Class%2002/Notes/Domain-Driven%20Design.md)
