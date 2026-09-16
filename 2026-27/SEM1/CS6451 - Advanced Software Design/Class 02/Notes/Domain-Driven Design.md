# Domain-Driven Design (DDD)
CS6451 — Advanced Software Design | 2026/7 SEM1 | Class 02

Organise code around the business domain rather than technical layers. The model in code mirrors how domain experts talk about the problem.

## Building blocks
- **Ubiquitous language** — one vocabulary shared by developers and domain experts, used in code, docs, and conversation. If the business says "membership", the class is `Membership`, not `UserTeamLink`.
- **Bounded context** — a boundary inside which a model has one precise meaning. "User" in Auth differs from "User" in Billing. Each context owns its model and talks to others through explicit contracts.
- **Entity** — an object with identity that persists over time (`Project`, `Deployment`).
- **Value object** — defined by its attributes, immutable, no identity (`Email`, `Money`, `Permission`). Readonly classes fit this perfectly.
- **Aggregate** — a cluster of entities and value objects with one root that enforces invariants. Outside code touches only the root. `Team` owns its `Membership` records, so you cannot add a member without going through `Team`.
- **Repository** — a collection-like interface for loading and saving aggregates, hiding the storage adapter. This is where Dependency Inversion lives.
- **Domain service** — logic that does not belong to a single entity, such as transferring a project between organisations.
- **Domain event** — a fact that happened, named in past tense (`DeploymentBuilt`, `MembershipAccepted`). Workers and queues consume these.

## Structural consequences
- Directory layout follows domains: `Functions/`, `Storage/`, `Messaging/` rather than `Controllers/`, `Models/`, `Helpers/`.
- No helper files or global functions. Every piece of logic has a domain home.
- Controllers are thin: parse input, call a domain service or aggregate method, return a response.
- Cross-context calls go through published interfaces or events, never by reaching into another context's tables.

## When it pays off
Complex business rules, multiple teams, long-lived systems.

## When it does not
CRUD apps with little logic, where the ceremony outweighs the benefit.

## Getting started
Pick one painful area, name its bounded context, extract value objects and one aggregate, and put a repository interface in front of the storage code.
