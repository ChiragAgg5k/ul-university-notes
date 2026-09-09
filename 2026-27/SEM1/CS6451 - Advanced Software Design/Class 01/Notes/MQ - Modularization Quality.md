# MQ — Modularization Quality
CS6451 — Advanced Software Design | 2026/7 SEM1 | Class 01

> Terminology: MQ is commonly called **Modularization Quality**, not “Modularization Quantity” as shown in the supplied search screenshot. Confirm the terminology and formula used in the lecture materials.

## Core idea
MQ evaluates a software system's decomposition into modules using their internal connections and external dependencies. It is used in software clustering and search-based approaches to finding better module boundaries.

- **Cohesion (within a module):** How closely related its components are. Internal connectivity is a structural proxy for cohesion; more connections do not necessarily mean a more meaningful responsibility.
- **Coupling (between modules):** How strongly modules depend on one another. Unnecessary cross-module dependencies make changes harder to isolate.
- **Goal:** Group related components together and reduce unnecessary dependencies between groups. A higher MQ generally indicates a better partition under the chosen MQ definition.

**Memory aid:** High cohesion inside; low coupling outside.

## Example
Keep pricing rules together in a pricing module rather than scattering them across statement formatting and customer-management code. Statement generation can request a price through a small interface instead of knowing every pricing rule.

## Connection to Fowler, Chapter 1
Moving charge calculations out of `Customer.statement()` and toward the objects responsible for rental and movie information illustrates better responsibility allocation. Separating pricing from presentation helps localize changes.

This is a conceptual connection—not a claim that Fowler calculates MQ or that every refactoring automatically increases it.

## Cautions
- MQ has multiple formulations. Use the lecturer's definition for calculations; there is no formula established by the supplied screenshot.
- Compare scores using the same dependency model and scoring definition.
- MQ is a structural indicator, not a complete measure of design quality. Clear responsibilities, behavior preservation, testability, and change requirements still matter.

## Source
Initial prompt: user-supplied Google AI Overview screenshot, saved as [MQ - Reference Screenshot.png](MQ%20-%20Reference%20Screenshot.png). The overview's cited sources have not been independently verified; these notes clarify its terminology and summarize the concept.
