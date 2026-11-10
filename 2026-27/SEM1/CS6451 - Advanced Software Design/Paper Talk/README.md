# CS6451 paper talk: Chen, Li & Li (2017)

**Group 1, paper 2 on the reading list.** A 30-minute group talk in Week 10 or 11 (slot not confirmed), then Assignment 2 applies the paper's algorithm to our Part 1 monolith (the gym membership system) and evaluates it. No due date for Assignment 2 yet.

- Paper: [MSA-Dataflow_Chen-2017.pdf](Readings/MSA-Dataflow_Chen-2017.pdf)
- R. Chen, S. Li and Z. Li, "From Monolith to Microservices: A Dataflow-Driven Approach," *2017 24th Asia-Pacific Software Engineering Conference (APSEC)*, Nanjing, 2017, pp. 466–475. DOI 10.1109/APSEC.2017.53.

These are my own reading notes, prepared with AI assistance. Check anything that goes into the talk against the paper. Anything reused in the team's Assignment 2 has to be logged in the team's GenAI prompt log, and the report prose has to be written by us.

## The paper in one paragraph

Splitting a monolith into microservices is usually done by hand and by feel. The authors propose a top-down, semi-automatic method that starts from the business logic and not from the code. You draw a data flow diagram (DFD) of the business logic, strip it down to only operations and data (a "purified" DFD), merge operations of the same kind that produce the same type of data (a "decomposable" DFD), and then read off one microservice candidate per remaining operation together with its output data. They show it on two small scenarios from a movie-crawling project and argue that the result is more rational, objective and understandable than the output of an existing tool, Service Cutter.

## Vocabulary

| Term | Meaning |
| --- | --- |
| Traditional DFD | Four elements: process (operation), data store, data flow, external entity |
| Purified DFD | Only data nodes and operation nodes. Data stores and external entities are removed. Operations are as fine-grained as possible |
| Decomposable DFD | The purified DFD after operations of the same type with the same type of output are merged |
| Microservice candidate | One operation plus its output data, taken from the decomposable DFD |
| Formal model | A purified DFD is a directed graph G(V, E) with V = P ∪ D, where P are operation nodes and D are data nodes |

## The three steps

1. **Construct a purified DFD (manual).** Work with users to analyse the business logic, draw a normal DFD, then refine it: split coarse processes into individual operations and drop data stores and external entities.
2. **Condense it into a decomposable DFD (automatic).** Merge the same operations with the same type of output data into one operation with one combined output.
3. **Identify candidates (automatic).** Each operation with its output data becomes one candidate microservice.

## The five rules

| Rule | Applies to | What it says |
| --- | --- | --- |
| 1 | Purified DFD | Operations must be detailed enough to show every individual data-processing activity. Data keeps the granularity it has in the business logic; do not split it further |
| 2 | Purified DFD | Operations are named with normative verbs or verb phrases. Data is named with meaningful nouns from the business logic |
| 3 | Condensing | Every operation has exactly one output. If one operation emits two outputs, merge the outputs when they are the same, otherwise split the operation in two |
| 4 | Condensing | Every data node is produced by at most one type of operation. If two operations produce the same data, merge the operations when they are the same, otherwise split the data |
| 5 | Condensing | After rules 3 and 4, combine the same operations that have the same type of output into one operation with one output. Give the merged output a more abstract name, and re-point it at every operation the originals fed |

Rules 3 and 4 are a regularity check on the diagram. Rule 5 is the actual condensing step.

## Algorithm 1 in plain words

`GetDecomposableDFD(PDF)`:

- Keep a set of operations `PS` and a set of data `DS`, both empty at the start.
- For each operation `P` in the purified DFD:
  - If its type is not in `PS` yet, create a new operation with a new composed output node, give it `P`'s inputs, and add both to the sets.
  - If it is already there, take the existing operation, add `P`'s output to its composed output node, and add `P`'s inputs to its inputs.
- Return the new diagram made of `PS` and `DS`.

`GetMicroservices(DDF)`:

- For each operation in the decomposable DFD, create a service whose operation is that operation and whose data is its output.

The whole thing is "group operations by name, union their inputs and outputs, then one service per group". The time cost is linear in the number of operations.

Things worth pointing out in the talk:

- The "same operation" test is just a comparison of operation names. All the intelligence sits in step 1, which is manual.
- In the pseudo-code the branch for a new operation (lines 7–13) never copies `P`'s own output into the new composed node, and line 15 uses an index `i` that is not defined. The intent is clear, but the listing is loose.
- `GetMicroservices` is a one-to-one mapping; it makes no decision.

## The two case studies

| | Case 1: crawl movies and comments | Case 2: compare ticket prices |
| --- | --- | --- |
| Purified DFD | 3 crawls, 6 extracts, 2 parses, with loops for "next page" | extract, compose (3 inputs), query (2 inputs), integrate |
| Merging | Crawl → "webpage content", Extract → "partial webpage content", Parse → "structured content" | Nothing merges; every operation is already unique |
| Candidates | Webpage Crawling, Text Extraction, Text Structuring | Text Extraction, Structure Composition, Database Query, Text Integration |
| Point made | Merging raises reuse | Text Extraction is reused from case 1; Compose and Integrate stay separate because their responsibilities differ |

## How the authors evaluate it

Against design-time microservice principles:

- **Fine grain and focus:** candidates are the smallest data operations, so nothing needs splitting further.
- **High cohesion, loose coupling:** a candidate only knows its own operation and output, not what comes before or after.
- **Technology neutral:** candidates are linked only by data.

Against Service Cutter (Gysel et al., 2016) on the same two cases:

| Claim | Their argument |
| --- | --- |
| More rational | Service Cutter gives one service for case 1 (too coarse) and over-cuts case 2, splitting the Time entity |
| More objective | Service Cutter needs subjective criteria and edge weights; a DFD describes the real business logic |
| Easier to operate | A DFD is easier to build than an entity-relationship model plus 16 coupling criteria |
| Easier to understand | "Operation + output data" reads directly as a service |

Limitations the authors admit:

1. Spotting "the same operation" needs expertise and depends on naming conventions. They suggest a standard verb set, like CRUD.
2. The candidates are the finest grain and may need an expert to merge them back into coarser services.
3. Not tried on a large project, the comparison is their own judgement, and there is no evaluation of run-time qualities.

## Our critique

These are the points I would raise; the group should agree which to keep.

- **No measurement.** "Rational, objective, understandable" are asserted by the authors about their own method. There are no coupling or cohesion numbers and no independent judges.
- **Tiny, friendly examples.** Both cases are linear pipelines from one project. Neither has shared state, transactions or competing updates, which is where decomposition is hard.
- **Data stores are thrown away.** The purified DFD drops them, so the method says nothing about who owns which data. Two candidates can end up needing the same table, which is the classic shared-database problem.
- **Services come out as technical functions, not business capabilities.** "Text Extraction" and "Database Query" are utilities. That fits "decompose by verb" but conflicts with domain-driven design, where a service follows a bounded context such as Billing or Booking.
- **Risk of nano-services.** One service per operation maximises the number of network calls. The paper pushes the regrouping into a later, undefined step.
- **Objectivity is moved, not gained.** Naming operations and deciding what counts as "the same type of output" are subjective choices made in step 1. Rename two verbs and the services change.
- **Rule 5 loses meaning.** Merged outputs get abstract names such as "partial webpage content", so the service contract becomes vague.
- **It is forward engineering.** The method starts from requirements, not from existing code, so it gives no help with the actual migration (strangling, data migration, keeping the monolith running).
- **The automatic part is trivial.** Grouping by name could be done by hand in minutes; the claim of semi-automation is modest.

Strengths to be fair about: it is simple enough to apply in an afternoon, traceable from requirement to service, cheap compared with Service Cutter's inputs, and good at exposing reusable operations.

Follow-up work to cite: the same group extended the method in S. Li et al., "A dataflow-driven approach to identifying microservices from monolithic applications," *Journal of Systems and Software*, vol. 157, 2019 (DOI 10.1016/j.jss.2019.07.008). That version brings data stores back (process–datastore dependencies), clusters processes around them, and reports coupling and cohesion metrics against Service Cutter and API analysis on a cargo tracking system. It answers several of the weaknesses above, so it is useful both for the talk's "what happened next" slide and as a source of metrics for Assignment 2. The 2017 paper also appears in the APSEC 2023 programme under a 30th-anniversary most-influential-papers session; confirm that before saying it in the talk.

## Talk outline (30 minutes)

A suggestion for four speakers, about 6 minutes each, leaving 5 for questions.

| Min | Speaker | Content |
| --- | --- | --- |
| 0–6 | 1 | The problem: why decomposition is hard and done by hand. Related work in one slide (Richardson's four strategies, Service Cutter). The paper's claim |
| 6–13 | 2 | DFD refresher, purified DFD, rules 1–2, with the air-ticket example (Figs. 1–2). Then rules 3–5 with the small diagrams (Figs. 4–6) |
| 13–19 | 3 | Algorithm 1 walked through on case 1, from Fig. 8 to Fig. 9 to three services. Case 2 in one slide |
| 19–25 | 4 | Evaluation and the Service Cutter comparison, the authors' limitations, our critique, and the 2019 follow-up |
| 25–30 | all | How we expect it to behave on the gym system (one teaser slide), then questions |

Slide tips: redraw the figures instead of pasting screenshots, animate the merge from Fig. 8 to Fig. 9, and keep one slide that states the algorithm in three lines.

Questions to expect:

- How is this different from decomposing by verb or use case?
- What happens to the database?
- Who decides two operations are "the same"?
- Would you really deploy "Text Extraction" as a service?
- How would you measure whether the result is good?
- Does it work on an existing code base or only on requirements?

## First pass on the gym monolith

A starting point for Assignment 2, taken from the use-case ports in `gym.port.in` on `main`. Draft only: the team has to draw the real purified DFD and agree the verbs.

### Operations and their outputs

| Use case | Fine-grained operations (verb → output data) |
| --- | --- |
| Sign up | validate → applicant details; create → member; create → membership; calculate → first-month charge; generate → invoice; calculate → referral credit; send → notification |
| Run monthly billing | calculate → monthly charge; calculate → discount; generate → invoice; collect → payment; send → notification |
| Record charge, penalties | record → charge |
| Pay arrears | collect → payment; change → membership status |
| Freeze, unfreeze, cancel, daily checks | change → membership status; calculate → final charge; generate → invoice; send → notification |
| Add class, view schedule | create → class; query → schedule |
| Book a class | validate → eligibility; create → booking; add → waitlist entry; send → notification |
| Cancel or undo a booking | change → booking status; promote → waitlist entry; calculate → late-cancel charge; send → notification |
| Check in, attendance | record → check-in; change → booking status; calculate → no-show charge |
| View member, membership, invoices | query → member; query → membership; query → invoices |

### What the algorithm would probably give

Merging the same verb with the same type of output (rule 5):

| Candidate | Merged from |
| --- | --- |
| Charge Calculation (calculate → amount) | first-month, monthly, final, discount, referral credit, late-cancel and no-show charges |
| Invoicing (generate → invoice) | sign-up, monthly run, final bill |
| Payment Collection (collect → payment) | monthly run, arrears |
| Charge Recording (record → charge) | penalties, add-ons |
| Membership Lifecycle (change → membership status) | freeze, unfreeze, cancel, lapse, restore |
| Member Registration (create → member, create → membership) | sign-up; rule 3 forces these apart unless treated as one output |
| Booking (create → booking, change → booking status) | book, cancel, undo, attendance |
| Waitlist (add and promote → waitlist entry) | book, cancel |
| Class Schedule (create → class, query → schedule) | schedule management |
| Check-in (record → check-in) | check-in |
| Notification (send → notification) | every flow that tells the member something |
| Validation and queries | eligibility checks, read-only views |

### What to look for

- **It cuts across our packages.** Part 1 is owned by context (Member, Membership, Booking, Billing). The algorithm splits Billing into calculation, invoicing, payment and recording, and pulls Notification out of every context. That contrast is the core of the evaluation.
- **Notification is our "Text Extraction".** It is the reusable candidate the method is good at finding, and we already have it as an out-bound port (`NotificationSender`).
- **Shared data shows the weakness.** Charge Calculation, Invoicing and Payment Collection all need the invoice and charge stores; Booking and Waitlist both need the class. The paper has no answer, which is a concrete finding.
- **Naming changes the answer.** Whether "calculate → discount" and "calculate → no-show charge" are the same type of output is our call. Try both and report how the service count moves.
- **Read-only operations.** The paper's cases have no queries. We have to decide whether "query" is one service, belongs to each owner, or is left out.

### Ideas for the evaluation

- Compare three decompositions: the algorithm's output, our Part 1 package split by bounded context, and (if time allows) Service Cutter on the same entities.
- Use numbers the paper lacks: count of services, calls between services per use case, shared data stores per pair of services, and the coupling and cohesion measures from the 2019 follow-up.
- Check each candidate against the principles the paper uses, then against ones it skips: data ownership, transaction boundaries and independent deployability.
- Use the hexagonal ports as evidence: every `port.out` a candidate needs is a dependency it would carry as a service.

## Next steps

1. Everyone reads sections III and IV of the paper (pages 467–473); they are the whole method.
2. Agree the speaker split and who redraws which figure.
3. Fix the verb list for our operations, then draw the purified DFD for two or three use cases first (sign up, book a class, monthly billing).
4. Ask J.J. Collins for the talk slot and whether the Assignment 2 brief sets required evaluation criteria.
