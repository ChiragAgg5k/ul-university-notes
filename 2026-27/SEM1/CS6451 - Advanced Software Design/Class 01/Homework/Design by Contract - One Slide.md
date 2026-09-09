# Applying Design by Contract — One-slide draft
CS6451 — Advanced Software Design | Assigned in Class 01 | Due next week (exact date not specified)

**Task:** Explain Bertrand Meyer's paper in one slide.
**Status:** Slide content drafted in Markdown; presentation deck not yet created. Submission status not recorded.

## Slide content

### Design by Contract: clear obligations, reliable components
**Core idea:** A caller and a routine make an explicit agreement: meet the requirements, receive the promised result.

| Contract element | Responsibility | Example: `put_child(new)` |
| --- | --- | --- |
| **Precondition** | Caller ensures valid use before the call. | `new` refers to an existing node. |
| **Postcondition** | Routine guarantees the result on successful return, given valid entry conditions. | `new.parent = current`; child count increases by 1. |
| **Class invariant** | Class maintains consistency after creation and at public operation boundaries. | Each existing child's parent points back to its node. |

- **Find bugs:** A broken precondition indicates a caller bug; a broken postcondition indicates a routine bug. Assertions support documentation and runtime checking.
- **Preserve contracts in subclasses:** Never strengthen preconditions or weaken postconditions; retain inherited invariants.
- **Handle failure honestly:** Restore consistency, then retry if feasible or report failure—do not silently claim success.

**Takeaway:** Explicit responsibilities reduce redundant defensive checks and make reusable components easier to trust—not automatically bug-free.

*Source: Bertrand Meyer, “Applying ‘Design by Contract’,” Computer, October 1992, pp. 40–51.*

## Preparation references (not part of the slide)
- [Paper on Brightspace](https://learn.ul.ie/d2l/le/lessons/91675/topics/1401836) — verified under Week 1.
- [Local paper](../Readings/Meyer%20-%20Applying%20Design%20by%20Contract.pdf)
- Printed pp. 42–44: routine contracts, node example, and responsibility for violations.
- Printed p. 45: invariants hold in observable states, not necessarily during every internal step.
- Printed pp. 46–48: documentation, assertion monitoring, and inheritance rules.
- Printed pp. 49–51: exception handling and restoring consistency.

Speaker clarification: Meyer's objection is to redundant checking with unclear responsibilities, not to removing input validation at external boundaries. Runtime assertion checking helps detect violations; it does not prove the whole program correct.
