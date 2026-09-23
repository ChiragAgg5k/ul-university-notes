# Class Diagrams

Based on Lecture C, slides 3–20, 33 and 57–63, plus the Lecture B analysis method. Past midterm questions are marked **[23/24 Qn]** or **[24/25 Qn]**.

## 1. The class box

```
┌──────────────────────────────┐
│ Account                      │  name (italics or {abstract} if abstract)
├──────────────────────────────┤
│ - balance: double = 0        │  attributes
│ # owner: Customer [1]        │
├──────────────────────────────┤
│ + debit(amount: int): int    │  operations
│ ~ audit(): void              │
└──────────────────────────────┘
```

- **Attribute syntax:** `visibility name: type multiplicity = default {property}`, e.g. `- id: String [1] = "" {readOnly}`
- **Operation syntax:** `visibility name(parameter-list): return-type {property}`
- **Visibility:** `+` public, `#` protected, `-` private, `~` package

## 2. Relationships: notation cheat sheet

| Relationship | Line | Meaning | Code |
| --- | --- | --- | --- |
| Association | `A ───── B` | A structural link between objects. A **link** is an instance of an association | A field referring to B |
| Navigable association | `A ────► B` | A knows B, but B doesn't know A | Only A holds a reference |
| Aggregation | `Whole ◇──── Part` | Part-whole, **weak**. The part can exist alone and be shared | A reference to the part |
| Composition | `Whole ◆──── Part` | Part-whole, **strong ownership**. The part lives and dies with the whole | The whole creates and owns the part |
| Generalisation | `Sub ────▷ Super` | "is-a", taxonomic. The subclass is fully consistent with the superclass | `extends` |
| Realisation | `Impl - - -▷ «interface» I` | Implements an interface | `implements` |
| Dependency | `A - - - -> B` | A *uses* B temporarily (parameter, local variable, return type) | No field |

**Memory hook:** ◇ is hollow, so the part "can walk away". ◆ is solid, so the part is "welded on".

## 3. Aggregation vs composition vs association [23/24 Q6]

- **Association:** any meaningful relationship, e.g. `Student ── takes ── Module`.
- **Aggregation (◇):** a part-whole relationship. The part can belong to other associations, including other aggregations. It doesn't need a name. *Module is part of an Honours Course*, but the module still exists without the course.
- **Composition (◆):** the whole **strongly owns** its part.
  - Copying or deleting the whole copies or deletes its parts.
  - A part can belong to **only one** whole, so the multiplicity at the whole end must be **1 or 0..1**.
  - *Each Square is part of exactly one Board.*
  - In C++, a part held **by pointer or reference** means aggregation, and a part held **by value** means composition.

**Exam answer shape:** define each in one line, draw one example of each, and say what happens on delete and whether the part can be shared.

## 4. Multiplicity

| Notation | Meaning |
| --- | --- |
| `1` | exactly one |
| `0..1` | optional |
| `*` or `0..*` | zero or more |
| `1..*` | one or more |
| `6` | exactly six (*each Student takes 6 Modules*) |

Read it at the **far end**: in `Order 1 ◆──── 1..* OrderLine`, one Order has one or more OrderLines, and each OrderLine belongs to exactly one Order.

## 5. Navigability

- An arrow on one end gives the direction of knowledge: `Module ────► Student` means Module holds `students: StudentCollection`.
- **Only add navigability when it's needed.** If A knows B, you can't reuse A without B, which increases coupling.
- A sender must know the receiver's reference, either through a direct link (an association) or indirectly through another object.

## 6. Qualified association [24/25 Q3]

- This is UML's version of a **map, dictionary or hash table**. A qualifier (a small box on the source end) selects the target.
- **Board and Square:** the qualifier is `row, col`, so a Board has exactly one Square per (row, col).
- **Order and OrderLine** (the slide C-11 version, qualified by Product):

```
┌───────┬──────────┐ 1       0..1 ┌───────────┐ *      1 ┌─────────┐
│ Order │ :Product │◆────────────►│ OrderLine │─────────►│ Product │
└───────┴──────────┘              └───────────┘          └─────────┘
```

```java
class Order {
    private Map<Product, OrderLine> lineItems = new HashMap<>();
    public OrderLine getLineItem(Product product) { return lineItems.get(product); }
    public void addLineItem(Number amount, Product forProduct) { lineItems.put(forProduct, new OrderLine(amount, forProduct)); }
}
```

The multiplicity at the target becomes **0..1**: for a given Product, there is at most one line.

**Why not `1..*`?** A qualifier changes what the multiplicity counts. Without a qualifier, `Order ◆── 1..* OrderLine` counts *all* of an Order's lines. With a qualifier, it counts lines **per (Order, key) pair**, like `map.get(key)`: none if that Product isn't ordered, one if it is. The Order still has many lines overall, one per distinct Product. Use `*` after a qualifier only when a key can give several targets (a multimap), e.g. `Library [:isbn] ── * Copy`.

## 7. The rest of the notation

- **Roles:** name the part each class plays at each end (e.g. `employer` / `employee`).
- **Derived association:** written as `/teaches`. It follows from other associations (Student → Module → Lecturer), so it exists once the base ones are implemented.
- **Constraints:** conditions in `{braces}`, often written in **OCL** as class invariants, e.g. `{self.noOfStudents > 50 implies not (self.room = S205)}`. Use `{xor}` when an object takes part in **exactly one** of two associations. OCL also expresses **pre/postconditions** on interface operations, which links to Design by Contract.
- **Association class:** attributes that belong to the *link*, not to either end. `Mark` between Student and Module is drawn as a class joined by a dashed line to the association. The alternative is a separate `Mark` class associated with both.
- **Abstract class:** `{abstract}` or an italic name. At least one operation has no implementation, and it can't be instantiated. If *no* operation has an implementation, it is effectively an interface.
- **Interface:** `«interface»` box, or lollipop notation in UML 2. It shows only the operations clients need, and one class can have many interfaces. Add pre/postconditions and apply "demand no more, promise no less": preconditions can't be stronger and postconditions can't be weaker in a subclass.
- **Parameterised class (template):** `List<T>` with a dashed box for `T`. `List<Student>` is bound to it by a dependency. Use templates where possible.
- **Stereotype:** `«persistent»`, `«boundary»`, `«control»`, `«entity»`. This is UML's extension mechanism.
- **Dependency:** between an interface and its implementation, a superclass and its subclass, or a class and its template. Prefer to show it explicitly.

## 8. From requirements to a class diagram (Lecture B method) [24/25 Q2]

1. **Identify candidate classes** from use case descriptions (noun identification: nouns become classes or attributes, verbs become operations or associations).
2. **Discard poor candidates.** Keep those with state, behaviour and identity. Drop ones that are too vague, too specific, redundant, an attribute, or an operation.
3. **Realise each use case:** draw a communication diagram with boundary, control and entity classes, and use CRC cards to assign responsibilities.
4. **Draw the use case class diagram** for that realisation.
5. **Repeat steps 3–4** for every use case.
6. **Merge** into a first-cut analysis class diagram.
7. **Second cut:** add generalisations (top-down or bottom-up), multiplicities, aggregation and composition.

## 9. Common mistakes

- Using composition where the part is shared (e.g. Product in an order: it's an **association**, since products outlive orders).
- A multiplicity greater than 1 at the whole end of a composition.
- Arrows on every association (unneeded navigability means extra coupling).
- Inheritance used for "has-a". Favour composition or delegation over inheritance.
- Putting a line's price in Product, or repeating attributes in subclasses. Each attribute or method appears once; the assignment §6 requires this too.

## Practice

1. [23/24 Q2] Draw Order ◆ OrderLine → Product with multiplicities. Say why each end is composition or association.
2. [24/25 Q3] Draw the qualified version and write `getLineItem` and `addLineItem`.
3. [23/24 Q6] Contrast aggregation and association with a diagram.
4. [23/24 Q8] Implement "a CD Player has a Play Button" (composition: `private final Button play = new Button(this);`).
5. Draw Student–Module with a `Mark` association class, then as a separate `Mark` class.
6. Gym assignment: sketch Member, Membership, Plan, ClassSession and Booking with multiplicities, one composition, one association class, and one interface with pre/postconditions.
