# Applying Design by Contract — Two slides
CS6451 — Advanced Software Design | Assigned in Class 01 | Present in Week 2 tutorial

**Task:** Read Bertrand Meyer's paper and summarise key findings in **2 slides**, as specified on lecture slides 15 and 64. The student confirmed that the previous one-slide instruction was mistaken.

**Status:** [Two-slide PowerPoint with speaker notes](Design%20by%20Contract%20-%20Two%20Slides.pptx) and [PDF version](Design%20by%20Contract%20-%20Two%20Slides.pdf) created. Submission status not recorded.

## Slide 1 — Design by Contract
**Core idea:** If the caller meets the requirements, the routine must deliver its promises.

- **Precondition:** Caller must satisfy it before the call. In the paper's `put_child(new)` example, `new` refers to an existing node.
- **Postcondition:** Given valid entry conditions, the routine guarantees the result on successful return: `new.parent = current` and the child count increases by one.
- **Class invariant:** The class preserves consistency after creation and at public operation boundaries. Example: each existing child points back to its parent node. The invariant need not hold at every internal step.

**Takeaway:** A contract specifies responsibilities, not implementation details.

## Slide 2 — What contracts change
- **Locate the bug:** A broken precondition indicates a caller bug; a broken postcondition indicates a supplier bug. Assertions document the agreement and can check it at runtime.
- **Preserve promises:** Subclasses must not strengthen preconditions or weaken postconditions. Inherited invariants still apply: demand no more, promise no less.
- **Fail honestly:** Restore consistency, then retry if a viable strategy exists or report failure. Never silently claim success.

**Main finding:** Replace redundant defensive checks with clear obligations. Contracts support reliability, but runtime checks alone do not prove correctness.

## Preparation references
- [Paper on Brightspace](https://learn.ul.ie/d2l/le/lessons/91675/topics/1401836) — verified under Week 1.
- [Local paper](../Readings/Meyer%20-%20Applying%20Design%20by%20Contract.pdf)
- Bertrand Meyer, “Applying ‘Design by Contract’,” *Computer*, October 1992, pp. 40–51.
- Printed pp. 42–44: routine contracts, node example, and responsibility for violations.
- Printed p. 45: invariants in observable states.
- Printed pp. 46–48: documentation, assertion monitoring, and inheritance rules.
- Printed pp. 49–51: exception handling and restoring consistency, including rare false alarms from operating-system or hardware signals.

Speaker clarification: Meyer's objection is to redundant checking with unclear responsibilities, not to removing validation at external trust boundaries.
