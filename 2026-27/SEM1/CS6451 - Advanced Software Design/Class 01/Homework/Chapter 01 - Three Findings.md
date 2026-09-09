# Class 01 — Fowler: Refactoring, Chapter 1
CS6451 — Advanced Software Design | 2026/7 SEM1

## Slide 1 — Refactoring Improves Design Without Changing Behavior
**Finding:** Working code can still be difficult to maintain.

- The video-store example begins with a long `Customer.statement()` method that mixes calculations and output formatting.
- Refactoring reorganizes code while preserving its observable behavior.
- Automated tests and small, incremental changes help catch mistakes early.

**Takeaway:** Improve the structure without changing what the program does.

---

## Slide 2 — Put Behavior Beside the Data It Uses
**Finding:** A method’s location matters as much as its size.

- Extracting charge calculations makes the statement method easier to understand.
- Moving calculations into `Rental` and `Movie` places responsibilities closer to the relevant data.
- Separating calculations from presentation allows text and HTML statements to share the same logic.

**Takeaway:** Give each class responsibility for the information it understands.

---

## Slide 3 — Replace Repeated Conditionals With Polymorphism
**Finding:** Repeated price-category checks make new pricing rules harder to introduce.

- The original code uses a `switch` to calculate charges for different movie categories.
- Fowler introduces price objects that provide category-specific behavior.
- Delegating to these objects reduces branching and isolates pricing changes.

**Takeaway:** Design around likely changes—in this example, movie pricing rules.
