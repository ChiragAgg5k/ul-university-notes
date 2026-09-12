# Applying Design by Contract — Two slides
CS6451 — Advanced Software Design | Assigned in Class 01 | Present in Week 2 tutorial

**Task:** Read Bertrand Meyer's paper and summarise key findings in **2 slides**, as specified on lecture slides 15 and 64.

**Status:** [Two-slide PowerPoint](Design%20by%20Contract%20-%20Two%20Slides.pptx) created, with both figures embedded. Submission status not recorded.

## Slide 1 — What is a contract?
**Line:** A contract is a set of obligations a client and a supplier agree on, both benefiting each other.

Using `put_child (new: NODE)` from the paper (Figure 2, p. 42):

- **Precondition** — `new /= Void`
  - Client's obligation: `new` is always a non-null value.
  - Supplier's benefit: it does not need to do a null check.
- **Postcondition** — `new.parent = Current`; `child_count = old child_count + 1`
  - Client's benefit: the parent is set and the child count increments.
  - Supplier's obligation: perform that modification.
- **Class invariant** — must stay true for all routines of a class, checked on entry/exit of a routine, not during one. Binary tree example (Figure 4, p. 44): if either the left or right node is non-null, that node's parent is the current node.

## Slide 2 — Why a contract matters
**Line:** It ensures reliability by making responsibilities explicit and clear.

1. **Avoid defensive programming.** If both client and supplier uphold their own side of the contract, unnecessary checks disappear. The counter-example figure shows `put_child` re-checking `new = Void` in the body when the precondition already assigns that condition to the client.
2. **Pinpoint issues better.** A precondition violation is a bug in the client; a postcondition violation is a bug in the supplier.
3. **Inheritance becomes subcontracting.** `VEHICLE.park` requires a bay at least 3.0 wide and ensures `is_parked`. `CAR` may weaken the precondition (fits a 2.0 bay) and strengthen the postcondition (`is_parked and engine_off`) — demand no more, promise no less.

**Main finding:** Meyer emphasises the specification, not redundant checks, as the route to reliable software.

## Figures used
- [`put_child` with a redundant null check](Figures/put_child%20-%20defensive.png) — the defensive-programming counter-example (p. 44).
- [Subcontracting: VEHICLE and CAR](Figures/subcontracting%20-%20vehicle%20car.png) — `require else` / `ensure then`.
- Scans of the paper's Figures 2 and 4 are used directly on slide 1.

## Preparation references
- Bertrand Meyer, "Applying 'Design by Contract'," *Computer*, Vol. 25, No. 10, October 1992, pp. 40–51. Refereed IEEE magazine article, adapted from a 1991 book chapter.
- [Paper on Brightspace](https://learn.ul.ie/d2l/le/lessons/91675/topics/1401836) — verified under Week 1.
- [Local paper](../Readings/Meyer%20-%20Applying%20Design%20by%20Contract.pdf)
- pp. 41–42: the courier contract, No Hidden Clauses, routine assertions.
- p. 43: precondition violation = caller bug; postcondition violation = supplier bug.
- p. 44: rejection of defensive programming; the either/or rule; demanding vs tolerant routines.
- p. 45: invariants hold in observable states only.
- pp. 47–49: inheritance as subcontracting, `require else` / `ensure then`, inherited invariants, why static binding fails.
- pp. 49–51: resumption, organized panic, false alarm; `rescue` restores the invariant, not the postcondition.

Speaker clarification: Meyer's objection is to redundant checking with unclear responsibilities, not to validation at external trust boundaries — that is a tolerant contract, not a missing one.
