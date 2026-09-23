# Midterm: Study Plan

CS6451 — Advanced Software Design | 2026/7 SEM1 | Lecturer: J.J. Collins

**Status: study order drafted 23 Sep 2026, studying not started.**

## Format

| | |
| --- | --- |
| When | **Week 5.** Lecture A, slide 6. Assumed to be the Wednesday lecture on 7 Oct 2026; confirm the exact date and room in class or on Brightspace |
| Weight | 20% of the module, pen-and-paper exam |
| Past format | 1 hour, **10 questions × 2 marks**, answer all. That is about 5 minutes per question: a short answer plus a small diagram or code fragment |
| Scope | Lectures A, B and C, the Meyer and Fowler readings, and probably Observer and MVC (the 24/25 paper had them, and GoF Observer is the Week 4 reading) |

The past papers are on Brightspace under **Content → Past Exam Papers** (CS5721 is the module's old code). They are not copied here because this repo is public.

## What the past midterms asked

Two past midterms, 20 questions in total:

| Topic | Asked | Past questions |
| --- | --- | --- |
| Design by Contract, "demand no more, promise no less", behavioural subtyping / LSP | 3× | 23/24 Q1, Q3 · 24/25 Q4 |
| Class diagram associations: aggregation vs association, Order–OrderLine–Product, qualified association plus method signatures | 3× | 23/24 Q2, Q6 · 24/25 Q3 |
| Use cases: `<<include>>` vs `<<extend>>` with a diagram, steps to build a use case class diagram | 2× | 24/25 Q1, Q2 |
| Fowler's movie rental: critique the code, then draw the refactored design | 2× | 23/24 Q9, Q10 |
| Observer: two applicability points, structure diagram, one consequence | 2× | 24/25 Q8, Q9 |
| Polymorphism missing → RTTI / type-switch code smell (write the code) | 1× | 23/24 Q5 |
| Implement an association in code ("a CD Player has a Play Button") | 1× | 23/24 Q8 |
| UML critique: the impact of poorly defined semantics | 1× | 23/24 Q4 |
| Three Amigos | 1× | 23/24 Q7 |
| Sequence diagrams: 4 interaction operators | 1× | 24/25 Q5 |
| State chart: its purpose, plus implementing `authorised(authorisationCode)` for the Agate `Campaign` | 1× | 24/25 Q6 |
| Design principles: an example of "find what varies and encapsulate it", plus name another | 1× | 24/25 Q7 |
| MVC: initialisation sequence diagram, and why Views own their Controllers | 1× | 24/25 Q10 |

Pattern: every question is either **define + draw** or **write a short piece of code**. Practise drawing and coding by hand, not just reading.

## Topic checklist

### Lecture A: Good software and the OO paradigm
- [ ] Characteristics of good software: usable, reliable, affordable, flexible, available. Modules, coupling, cohesion, interfaces, encapsulation, abstraction
- [ ] Parnas and modular decomposition. Context dependencies
- [ ] Interfaces with pre/postconditions (the `debit` example)
- [ ] Polymorphism vs no polymorphism: write the `Shape`/`IDraw` example **and** the type-switch / RTTI version, then say why the second is bad (duplicated logic, and every client changes when a new shape is added)
- [ ] Dynamic (late) binding
- [ ] Benefits and liabilities of a design notation. Three Amigos: **Booch, Rumbaugh, Jacobson**

### Readings
- [ ] Meyer, *Applying Design by Contract*: preconditions, postconditions, class invariants, the contract as mutual obligations and benefits, no defensive programming, subcontracting ("demand no more, promise no less": a subclass may weaken preconditions and strengthen postconditions). See [the DbC slides](../Class%2001/Homework/Design%20by%20Contract%20-%20Two%20Slides.md)
- [ ] Fowler, *Refactoring*, ch. 1: critique `Customer.statement()` (long method; switch on a type code; logic that belongs in `Movie`/`Rental`, i.e. feature envy; temporary variables; no reuse for an HTML statement). Draw the refactored design: `getCharge()` / `getFrequentRenterPoints()` moved to `Rental` and then `Movie`, with `Price` subclasses (State/Strategy) replacing the switch. See [findings outline](../Class%2001/Homework/Chapter%2001%20-%20Three%20Findings.md)

### Lecture B: Requirements and analysis
- [ ] Software lifecycles: waterfall, RUP (use-case driven, architecture-centric, iterative and incremental), Agile Manifesto, and the tension between up-front design and agility
- [ ] Functional vs non-functional requirements
- [ ] Use cases, actors, generalisation. **`<<include>>` (shared behaviour, always runs) vs `<<extend>>` (optional or exceptional behaviour at an extension point, under a condition)**, with a diagram
- [ ] The use case description template (Week 2 PDF)
- [ ] 4 criticisms of use cases, with a fix for each
- [ ] **The method from requirements to a conceptual class diagram**: noun identification → discard poor candidates → use case realisation (communication diagram, boundary/control/entity, CRC cards) → use case class diagram → repeat for each use case → merge into a first-cut class diagram → second cut with generalisations
- [ ] Data-driven vs responsibility-driven design. How many diagrams are in UML, and 4 criticisms of UML
- [ ] Slide B-57 review questions

### Lecture C: More analysis diagrams
- [ ] [Class diagram notes](../Class%2003/Notes/Class%20Diagrams.md). Association vs aggregation vs composition: notation, lifetime, multiplicity at the whole end
- [ ] Roles, multiplicity, navigability, **qualified associations** (slide C-11: Order qualified by Product → OrderLine: `OrderLine getLineItem(Product aProduct)`, `void addLineItem(Number amount, Product forProduct)`), derived associations, constraints/OCL, association classes
- [ ] Abstract classes, templates, attribute and operation syntax (`visibility name: type [multiplicity] = default {property}`)
- [ ] Sequence diagrams, UML 2 frames: **loop, alt, opt, par, region/critical, neg, ref, sd**
- [ ] Communication diagrams: nested sequence numbers, message types
- [ ] **State charts**: purpose (to model *state-dependent* variation in behaviour; slide C-37 and [note](../Class%2003/Notes/Statecharts.md)); triggers (change `when`, call, signal, time `after`); guards; composite, concurrent and history states. Implement a transition method with a switch on state (and know the State pattern version)
- [ ] Program to interfaces (`List` vs `ArrayList` in `Order`), separated interfaces, UML interface notation
- [ ] LSP vs behavioural subtyping vs "demand no more, promise no less" (slide C-62: related but subtly different)
- [ ] Design principles (C-65): OCP, program to interfaces, **find what varies and encapsulate it**, favour composition over inheritance, SOLID, KISS, YAGNI, DRY. Have one example of each
- [ ] UML critique (C-64): weak extensibility, bloat, linguistic incoherence, poorly defined semantics

### Week 4 (check the lecture)
- [ ] GoF Observer: intent, **2 applicability points**, structure (Subject, Observer, ConcreteSubject, ConcreteObserver; `attach`/`detach`/`notify`/`update`), consequences (loose coupling, broadcast, unexpected cascading updates)
- [ ] MVC: roles, initialisation sequence (Model created → View registers as an observer of the Model → View creates its Controller), why Views own their Controllers (a controller is specific to a view's widgets and interaction style, and a view can swap controllers — Strategy)

## Study order

Each step builds on the one before it. You set the pace.

1. **Baseline.** Try both past midterms without notes and mark which questions you can't answer yet. This tells you where to spend the most effort.
2. **Lecture A: good software and OO.** Everything later assumes it: interfaces, coupling and cohesion, polymorphism vs RTTI.
3. **Meyer's Design by Contract → LSP / behavioural subtyping.** The most-examined topic. Pre/postconditions lead into "demand no more, promise no less".
4. **Fowler, ch. 1.** Uses polymorphism from step 2. Practise the critique plus the refactored diagram together, since past papers pair them.
5. **Lecture B: lifecycles and use cases.** Include/extend, descriptions, criticisms.
6. **Lecture B: requirements → conceptual class diagram method.** Needs step 5. Covers noun identification, BCE, CRC and the use case class diagram.
7. **Lecture C: associations.** Aggregation/composition, qualified associations, association classes. Code them too: Order–OrderLine–Product, CD Player–Play Button.
8. **Lecture C: sequence and communication diagrams.** The interaction operators.
9. **Lecture C: state charts.** Needs step 8's dynamic modelling. Implement Campaign `authorised()`.
10. **Lecture C: interfaces, design principles, UML critique.** Pulls steps 2–4 together.
11. **Observer, then MVC.** MVC is built on Observer.
12. **Timed mocks.** Both past midterms at 60 minutes, closed book, then the slide B-57 questions. Revisit the steps behind any misses.
13. **Diagram drill from memory.** Include/extend, qualified association, composition, Campaign state chart, Observer structure, MVC sequence, LSP example.

**Priority if time is short:** steps 3, 7, 5–6, 4, 11. These cover about two thirds of past marks.

## Open questions

- [ ] Confirm the exact date, time and room
- [ ] Confirm whether Week 4 content (Observer, MVC, design patterns) is on the paper
