# Class 12: Lecture M, coupling and cohesion, component and deployment diagrams, exam and summary

CS6451 Advanced Software Design | 2026/7 SEM1 | J.J. Collins | 25 Nov 2026. Slides: [CS6451-M-Msc_Final.pptx](Slides/CS6451-M-Msc_Final.pptx), Brightspace Week 12.

## Part 1: coupling and cohesion (slides 3–10)

- Yourdon and Constantine (1979): coupling and cohesion as criteria for splitting a system into modules. Poor kinds of cohesion: coincidental, logical, temporal, sequential.
- Coad and Yourdon (1991):
  - **Interaction coupling**: messages an object sends and the parameters in each. Minimise it.
  - **Inheritance coupling**: how much a subclass really needs what it inherits. High is good.
  - **Operation cohesion**: an operation serves one functional requirement (e.g. `calculateRoomSpace()`).
  - **Class cohesion**: a class serves one requirement (the slide's `Lecture` class is low).
  - **Specialisation cohesion**: whether the hierarchy is a true "is a kind of". `Person` and `Company` deriving from `Address` has high inheritance coupling but low specialisation cohesion; use an association instead.
- LSP normally gives maximal inheritance coupling.
- Detailed design of operations: OCL pre and post conditions, decision tables, activity diagrams, pseudocode. Reading: Bennett et al. 4th ed., chapter 14.

## Part 2: package, component and deployment diagrams (slides 11–22)

- **Packages** give namespace control (`P::A`, `P::R::C`). An element sees its own and enclosing packages; to use another package's class, add a dependency with `<<import>>` or `<<access>>`. A plain package is not a classifier, so it cannot take part in an interaction.
- **Component model**: dependencies between parts of the code; the development (code) view. Components realise interfaces (lollipop circle) and depend on other components' interfaces, not their internals. Shows component *types*.
- **Deployment model**: the runtime structure; the physical and process views. **Nodes** (devices or execution environments) joined by solid lines for physical links, which can carry stereotypes. Component *instances* on nodes are **artefacts**; runtime dependencies between them are drawn too.

## Part 3: final exam (slide 25)

- **2 hours, pen and paper.** Five questions: answer **Q1 and any two others**.
- Q1 is worth 12 marks; Q2–Q5 are 14 each; total out of 40.
- **One question is likely to be on the Interceptor architectural pattern.**
- Work through past papers in groups.
- A **paper dictionary** is allowed (said in class, 25 Nov).

## Module summary (slides 26–28)

Qualities of good software; the OO paradigm and lifecycles; interfaces with pre and post conditions; OOAD with UML (use case, collaboration, communication, sequence, state, activity, package, component, deployment); requirements and NFRs; analysis by use case realisation; SOLID; architecture (open vs closed, MVC, Broker, Interceptor, Microservices); patterns (Observer, Decorator, Factory Method, Singleton, Composite, State, Strategy, Command, Adapter); four design principles (program to interfaces, OCP, encapsulate what varies, favour composition over inheritance); refactorings (Replace Conditional Dispatcher with Command, Replace Constructors with Creation Methods, Replace switch with polymorphism); metrics: the main sequence. The theme throughout is better dependency management.

**Examinable reading** (slide 29): Bennett, McRobb and Farmer chapters 1–15 and 19.1–19.4 plus the Agate case study A1–A4, except 8.5.3, 9.5, 9.6, chapter 10 and 11.4.4; Stephens and Pooley chapters 1–14 and the case studies in 15–17; Gamma et al.; Head First Design Patterns; POSA volumes 1 and 2; Kerievsky, *Refactoring to Patterns*; Fowler, *Refactoring*.

## Project interviews (slide 30, provisional)

| Group | When |
| --- | --- |
| **Group 1 (us)** | **Fri 11 Dec, 09:30** |
| Group 2 | Fri 11 Dec, 11:00 |
| Group 3 | Fri 11 Dec, 14:00 |
| Group 4 | Mon 14 Dec, 09:30 |
| Group 5 | Mon 14 Dec, 11:00 |

**Be ready to run both the monolith and the microservices version at the start of the interview.**
