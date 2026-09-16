# Software Design Principles
CS6451 — Advanced Software Design | 2026/7 SEM1 | Class 02

Each principle with its concrete payoff.

## Dependency Inversion
High-level policy depends on abstractions, not on concrete implementations. Business logic talks to a `Driver` interface; the concrete adapter (`Engine/Driver/{Postgres,MySQL,Mongo}`) is injected at the edge.

**Payoff:** swap storage, queues, or caches without touching domain code. Tests run against a fake driver instead of a live database.

## Single Responsibility
A class changes for one reason only. Fat controllers violate this. Split into a route handler, a domain service, and a repository so a validation change never touches persistence code.

## Open/Closed
Extend behaviour by adding code, not editing existing code. Adapter directories like `Adapter/Redis.php` and `Adapter/Memcached.php` let you add a backend without modifying the callers.

## Interface Segregation
Many small interfaces beat one wide one. A `Readable` and a `Writable` contract let a read-replica adapter implement only what it supports.

## Composition over inheritance
Inject collaborators instead of subclassing. Deep inheritance trees couple children to parent internals; readonly constructor properties make composition cheap.

## Fail fast
Validate at the boundary and reject early. Typed config objects and full type hints move whole error classes from runtime to compile time.

## Make illegal states unrepresentable
Use enums and value objects so a `Status` can only be one of the known values, never a typo string.

## Law of Demeter
Talk to your immediate collaborators, not their internals. Chains like `$order->customer()->address()->country()` leak structure across three modules.

## Deep modules
A small interface hiding a lot of work. A connection pool with `get()` and `put()` that internally handles retries, health checks, and timeouts is worth far more than a thin wrapper.

## YAGNI
Build what is needed now. Arbitrary limits, speculative abstractions, and config flags with one caller add cost without benefit.

**Rule of thumb:** most codebase pain traces back to Single Responsibility or Dependency Inversion being skipped.
