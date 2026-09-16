# SOLID
CS6451 — Advanced Software Design | 2026/7 SEM1 | Class 02

Five principles for keeping object-oriented code easy to change.

| Letter | Principle | Rule | Example |
| --- | --- | --- | --- |
| S | Single Responsibility | A class has one reason to change | A `Deployment` model should not also send emails and write logs |
| O | Open/Closed | Open for extension, closed for modification | Add `Storage/Adapter/S3.php` instead of editing a `switch` in the caller |
| L | Liskov Substitution | A subtype must work wherever its parent is expected | A `ReadOnlyRepository` that throws on `save()` breaks the `Repository` promise; narrow the interface instead |
| I | Interface Segregation | Clients should not depend on methods they do not use | Prefer `Readable` + `Writable` over one wide `Storage` interface |
| D | Dependency Inversion | High- and low-level modules both depend on abstractions | Domain code takes a `Driver` interface; the DI container wires `Postgres` at the edge |

## How they interlock
- **S** keeps classes small enough to reason about.
- **O** and **D** let you add adapters without touching callers.
- **L** and **I** make those adapters safe to swap.

## Failure signs
- Class names ending in `Manager` or `Helper`.
- A growing `match`/`switch` over type strings.
- An interface with twenty methods.
- `instanceof` checks in domain code.
