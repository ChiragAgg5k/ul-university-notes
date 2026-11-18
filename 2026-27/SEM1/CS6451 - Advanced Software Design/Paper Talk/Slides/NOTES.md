# Monolith to Microservices Talk: slide text and speaker notes

Exported from the deck for review. One heading per slide: visible text, then speaker notes.

## Slide 1: cover

**On the slide:** CS6451 Advanced Software Design · Paper talk · From Monolith to Microservices: A Dataflow-Driven Approach · R. Chen, S. Li and Z. Li · APSEC 2017 · Group 1 · [names]

**Speaker notes:**

[Speaker 1 · about 1 minute]

Good morning. We are Group 1, and we are presenting “From Monolith to Microservices: A Dataflow-Driven Approach” by Chen, Li and Li, published at APSEC, the Asia-Pacific Software Engineering Conference, in 2017.

In one sentence: the paper turns a data flow diagram of a system’s business logic into a list of candidate microservices, using a few rules and a simple algorithm.

The talk has four parts. First, the problem and the paper’s idea. Second, the method itself, step by step. Third, the two case studies the authors use. Fourth, how they evaluate it, our critique, and what this means for our own gym system in Assignment 2.

[Introduce who presents each part.]

## Slide 2: problem

**On the slide:** The problem · Splitting a monolith is still done by hand · Manual Experience and intuition Architects decide the service boundaries themselves, with little method behind it. · Inconsistent Different people, different cuts Two teams can split the same system in very different ways. · Heavy tooling Service Cutter Needs structured system models and uses 16 coupling criteria with configurable priorities. · Chen, Li and Li (2017); Gysel et al. (2016)

**Speaker notes:**

[Speaker 1 · about 1.5 minutes]

Moving from a monolith to microservices means answering one hard question: where do we cut? Which pieces of functionality become which services?

In practice, that decision is made by architects using experience and intuition. There is little method behind it, so the result depends on who is doing it. Two teams given the same system can come up with quite different service boundaries, and it is hard to argue which is right.

There is tool support. The best known at the time is Service Cutter, by Gysel and colleagues, from 2016. But Service Cutter needs structured models of the system before it gives an answer, such as an entity-relationship model and use cases. It derives coupling between parts of the system from a catalogue of 16 coupling criteria, and the user sets priorities for those criteria. Chen and colleagues argue that preparing all of this is complex and that the priorities are a subjective choice.

So the authors want something in between: more systematic than intuition, but much lighter than Service Cutter.

## Slide 3: idea

**On the slide:** The paper’s idea · Start from the business dataflow, not the code · One operation plus its output data = one microservice candidate · Step 1 · manual Purify the DFD Draw the business logic as a data flow diagram, keep only operations and data. · Step 2 · automatic Condense it Merge operations of the same kind that produce the same type of data. · Step 3 · automatic Read off services Each remaining operation and its output becomes one candidate. · Chen, Li and Li (2017)

**Speaker notes:**

[Speaker 1 · about 1 minute]

The key idea is to start from the business logic, not from the existing code. The method is top-down and semi-automatic.

If you remember one thing from this talk, it is the line at the top: one operation together with its output data becomes one microservice candidate.

There are three steps. Step 1 is manual: you work with the users, draw a data flow diagram of the business logic, and then “purify” it so that only operations and data remain. Step 2 is automatic: you condense the diagram by merging operations of the same kind that produce the same type of data. Step 3 is also automatic: every operation left, together with its output, is read off as a candidate service.

So the human does the analysis, and the algorithm does the grouping. [Hand over to Speaker 2 for the details of each step.]

## Slide 4: purify

**On the slide:** Step 1 · Purify the data flow diagram · Traditional DFD Processes, data stores, data flows and external entities. · Purified DFD Only operations and data. Data stores and external entities are removed. · Rule 1 Operations are fine-grained enough to show every data-processing activity. Data keeps its business granularity. · Rule 2 Operations are named with verbs, data with meaningful nouns from the business logic. · crawl webpage content extract partial webpage content · Chen, Li and Li (2017), section III

**Speaker notes:**

[Speaker 2 · about 1.5 minutes]

Step 1 starts from a normal data flow diagram. A traditional DFD has four kinds of element: processes, data stores, data flows, and external entities like a user or another system.

The purified DFD throws away the data stores and the external entities. What is left is only operations and data, linked by flows. Formally it is a directed graph whose nodes are either operations or data.

Two rules guide how you draw it. Rule 1: operations must be fine-grained enough to show every individual data-processing activity. So a coarse process like “handle order” is split into its separate steps. Data, on the other hand, keeps the granularity it has in the business; you don’t split it further. Rule 2 is about naming: operations get verbs or verb phrases, data gets meaningful nouns taken from the business domain.

The strip at the bottom is a small piece of the paper’s first case study. Orange pills are operations, blue boxes are data: a crawl operation produces webpage content, and an extract operation turns that into partial webpage content.

This step is entirely manual, and as we will see later, it is where most of the judgement happens.

## Slide 5: condense

**On the slide:** Step 2 · Condense into a decomposable DFD · Rule 3 One output per operation Two outputs: merge them if they are the same, otherwise split the operation in two. · Rule 4 One producer type per data Several operations of the same type may produce it. Different types of producer: split the data. · Rule 5 Merge the same work Same operation with the same type of output becomes one operation with one, more abstract, output. · Rules 3 and 4 tidy the diagram. Rule 5 does the actual merging. · Chen, Li and Li (2017), section III

**Speaker notes:**

[Speaker 2 · about 1.5 minutes]

Step 2 turns the purified DFD into what the authors call a decomposable DFD. Three more rules apply.

Rule 3: every operation has exactly one output. If an operation produces two outputs, you merge the outputs if they are really the same thing; otherwise you split the operation into two operations.

Rule 4 is the mirror image: every piece of data is produced by at most one type of operation. Note “type”: several operations of the same type may produce the same data. In case 1, for example, two extract operations both produce comment-list URLs, and that is allowed. But if operations of different types produce the same data, you split the data so each part has one type of producer.

Rules 3 and 4 are really a regularity check. They make the diagram clean enough for the algorithm to work on.

Rule 5 is the actual condensing step. Operations that are the same and produce the same type of output are combined into one operation with one output. That merged output gets a more abstract name. For example, several different “extract” steps that each produce part of a webpage become one extract operation producing “partial webpage content”. The merged operation is then connected to everything the originals used to feed.

[Walkthrough: point at rule 5 and say what happens to case 1 in advance. Three crawl operations each produce a page of content. They are the same operation with the same type of output, so rule 5 turns them into one crawl operation whose output is simply “webpage content”. We will see the full result in a few slides.]

## Slide 6: algorithm

**On the slide:** Step 3 · The algorithm: one service per operation · // GetDecomposableDFD · for each operation P: · group by operation name · union its inputs and outputs · // GetMicroservices · for each group: · service = (operation, output data) · Simple grouping One pass that groups operations by name. · “Same” means same name The merge test is a name comparison, so all the judgement sits in step 1. · Chen, Li and Li (2017), Algorithm 1

**Speaker notes:**

[Speaker 2 · about 1.5 minutes]

The paper gives this as Algorithm 1, with two functions. Here it is in plain words.

GetDecomposableDFD goes through every operation in the purified diagram. If it hasn’t seen that kind of operation before, it creates a new operation with a new combined output node. If it has, it adds this operation’s inputs and outputs to the existing one. So in effect: group by operation name, and union the inputs and outputs.

GetMicroservices then goes through the condensed diagram and creates one service per operation, containing that operation and its output data. It is a one-to-one mapping; it makes no decision of its own.

Two things to notice. First, it is a simple grouping algorithm: one pass over the operations. The paper doesn’t analyse its cost formally, but it is clearly cheap for diagrams of this size. Second, the test for “the same operation” is just a comparison of names. That means all of the real judgement, which operations are the same and what they are called, sits in step 1, which is done by hand.

A small detail if anyone reads the listing: the pseudo-code is a little loose, for example it uses an index that is never defined, but the intent is clear.

[Hand over to Speaker 3 for the case studies.]

## Slide 7: case1-figs

**On the slide:** Case 1: eleven operations condense to three · Fig. 8 · purified DFD · Fig. 9 · decomposable DFD · Red: crawl → webpage content · Yellow: extract → partial webpage content · Blue: parse → structured content · Chen, Li and Li (2017), Figs. 8–9

**Speaker notes:**

[Speaker 3 · about 2 minutes: walkthrough]

The authors demonstrate the method on two scenarios from a project that crawls movie information from the web. These are the paper’s own diagrams for the first one. On the left is Fig. 8, the purified DFD for crawling movies and comments.

Start at the top: a crawl takes the movie list URL and produces the movie list. An extract pulls out the next-page link, which loops back up, and another extract pulls out the movie URLs. Those are crawled to get each movie page. From the movie page, one branch extracts the movie details and parses them. The other branch extracts the comment-list URL, crawls the comment list, follows its own next-page loop, and extracts and parses the comment details.

So it is not a straight line: there are branches and loops. Count the operations of each type: three crawls, six extracts and two parses. Note that two extracts both produce comment-list URLs. Rule 4 allows that, because they are operations of the same type.

Now the right, Fig. 9, the decomposable DFD. Each group has collapsed into a single operation: one crawl producing webpage content in the red box, one extract producing partial webpage content in the yellow box, and one parse producing structured content in the blue box. The next-page loop is still there, as a flow from partial webpage content back to crawl.

Each dashed box is one candidate microservice, which is the next slide.

## Slide 8: case1

**On the slide:** Case study 1 · Crawling movies and comments · crawl × 3 webpage content Webpage Crawling · extract × 6 partial webpage content Text Extraction · parse × 2 structured content Text Structuring · 11 operations in the purified DFD become 3 candidate services . Merging raises reuse. · Chen, Li and Li (2017), Figs. 8–9

**Speaker notes:**

[Speaker 3 · about 1.5 minutes]

To sum up the first scenario, crawling movies and their comments. When they draw the purified DFD, they get three crawl operations, six extract operations and two parse operations, with branches and loops for following the “next page” link. So it is not a straight line: the same kinds of operation appear in several places.

Now apply rule 5. All three crawls are the same kind of operation and all produce webpage content, so they merge into one operation. The six extracts all produce part of a webpage, so they merge into one extract with the abstract output “partial webpage content”. The two parses both produce structured content, so they merge too.

The algorithm then reads off one service per merged operation: Webpage Crawling, Text Extraction and Text Structuring. So 11 operations in the diagram become three candidate services.

The point the authors make here is reuse: instead of eleven pieces of logic, you have three services, each called several times.

## Slide 9: case2-figs

**On the slide:** Case 2: operations with several inputs · Fig. 12 · decomposable DFD (nothing merged, so it matches Fig. 11) · compose · 3 inputs cinema name, movie name, time · query · 2 inputs structured screening info, online box office list · integrate · 2 inputs different ticket prices, movie detail · Chen, Li and Li (2017), Figs. 11–12

**Speaker notes:**

[Speaker 3 · about 1.5 minutes: walkthrough]

This is Fig. 12 from the paper. Because nothing merges in this case, it has the same shape as the purified DFD in Fig. 11; the dashed boxes just mark the four candidates.

Follow the flow. Extract takes the cinema list and produces a cinema name. Compose then takes three inputs: that cinema name, a movie name and a time, and produces structured screening information. Query takes two inputs: the screening information and the online box office list, and produces the different ticket prices. Finally, integrate takes two inputs: the ticket prices and the movie detail, and produces the movie price comparison summary.

The point of this case is the multiple inputs. Even so, each operation still has exactly one output, so rules 3 and 4 are satisfied, and no two operations are of the same type, so rule 5 merges nothing.

## Slide 10: case2

**On the slide:** Case study 2 · Comparing ticket prices · extract compose 3 inputs query 2 inputs integrate 2 inputs · Several operations take more than one input, but every operation is unique, so nothing merges: four candidates. · Reused Text Extraction The same service as in case 1. · New Structure Composition · New Database Query · New Text Integration · Chen, Li and Li (2017), section IV

**Speaker notes:**

[Speaker 3 · about 1 minute]

The second scenario compares ticket prices. Its purified DFD is short, but the authors chose it to show operations with several inputs: a compose operation that takes three inputs, a query that takes two, and an integrate step that combines results at the end.

This time nothing merges. Every operation is already unique, so rule 5 has nothing to do, and the algorithm gives four candidates: Text Extraction, Structure Composition, Database Query and Text Integration.

Two points the authors make. First, Text Extraction is the same service that came out of case 1. So across the two scenarios, the method finds a service that can be shared, which is exactly what you want from microservices.

Second, compose and integrate might look similar, both combine data, but they stay separate because their responsibilities differ. The method keeps them apart because they have different names and different outputs.

[Hand over to Speaker 4 for the evaluation.]

## Slide 11: evaluation

**On the slide:** The authors’ evaluation · Compared with Service Cutter · Claim Their argument · More rational Service Cutter gives one service for case 1 and over-cuts case 2 · More objective No subjective weights; the DFD reflects the real business logic · Easier to operate In the authors’ view, a DFD is simpler to prepare than Service Cutter’s system models · Easier to understand “Operation + output data” reads directly as a service · Limits they admit: spotting “the same operation” needs expertise · candidates are very fine-grained · tested on two small cases only · Chen, Li and Li (2017), section V; Gysel et al. (2016)

**Speaker notes:**

[Speaker 4 · about 2 minutes]

How do the authors show the method works? Two ways.

First, they check the candidates against design principles for microservices. Fine grain and focus: each candidate is the smallest data operation, so nothing needs splitting further. High cohesion and loose coupling: a candidate only knows its own operation and output, not what comes before or after it. Technology neutrality: candidates are linked only by data, so each could be built with a different technology.

Second, they run Service Cutter on the same two cases and compare. They make four claims, shown in the table. More rational: Service Cutter puts all of case 1 into a single service, which is too coarse, and over-cuts case 2. More objective: their method needs no subjective weights, because the DFD reflects the real business logic. Easier to operate: in their view, drawing a DFD is simpler than preparing the system models Service Cutter needs and setting priorities for its coupling criteria. That is the authors’ judgement, not a measured result. Easier to understand: “operation plus output data” reads directly as a service.

To their credit, they also admit limits in section V-C. Spotting “the same operation” needs expertise and depends on naming conventions; they suggest a standard verb set like CRUD. The candidates are very fine-grained and may need an expert to merge them back. It has only been tried on small cases, and run-time qualities were not evaluated.

Note that all four claims are the authors’ own judgement, which leads into our critique.

## Slide 12: critique

**On the slide:** Our critique · Where the method falls short · No measurement “Rational” and “objective” are asserted, with no coupling or cohesion numbers. · Small scenarios Two scenarios from one project; no test of transactions or concurrent updates. · Data ownership open Persistent datastore ownership and transaction boundaries are unspecified. · Not business-aligned Nothing ensures services match business capabilities or bounded contexts. · Runtime cost unknown Deploying every candidate separately could add remote calls; not evaluated. · No fix for naming The authors admit naming drives the result, but give no method to control it.

**Speaker notes:**

[Speaker 4 · about 2.5 minutes]

The authors already admit some limits, as we just saw. Our point is that the paper gives no way to resolve them, and that some problems go further.

No measurement. “Rational”, “objective” and “understandable” are claimed by the authors about their own method. There are no coupling or cohesion numbers and no independent judges.

Small scenarios. Both cases come from one small project. Case 1 does have branches and loops, and case 2 has operations with several inputs, but neither tests transaction boundaries or concurrent updates, which is where decomposition gets hard in real systems.

Data ownership open. Each candidate owns its output data, but the purified DFD removes data stores, so the method doesn’t say which service owns which persistent store, or where transaction boundaries go. Two candidates can end up needing the same table.

Not business-aligned. The services that come out, like Text Extraction or Database Query, are technical utilities. That isn’t wrong in itself, but nothing in the method ensures the services line up with business capabilities or bounded contexts, as domain-driven design would want.

Runtime cost unknown. The paper produces candidates and says they may be consolidated later. If every candidate were deployed separately, that could add many remote calls, but the paper has no run-time evaluation, so we can’t tell.

No fix for naming. The authors themselves say that deciding which operations are “the same” depends on expertise and naming conventions. Rename two verbs and you get different services, and the paper offers only a suggestion of a standard verb set, not a method.

To be fair, there are real strengths. We expect it is quick to apply to a small system, every service traces back to a requirement, it needs less preparation than Service Cutter, and it is good at finding reusable operations.

## Slide 13: next

**On the slide:** What came next · The follow-up, and what it means for us · Li et al. (2019), JSS Datastore-aware grouping Extends the 2017 method: clusters processes with the datastores they use, and compares coupling and cohesion metrics on a Cargo Tracking system. It addresses two of our critiques: data ownership and measurement. · Our gym system · Assignment 2 Four Billing candidates? Our preliminary model suggests Charge Calculation, Invoicing, Payment Collection and Charge Recording, pending an agreed DFD. Notification looks like our “Text Extraction”, and shared invoice data would test the data-ownership question. · Li et al. (2019); Chen, Li and Li (2017)

**Speaker notes:**

[Speaker 4, or all · about 1.5 minutes]

Two things to close.

First, what happened next. The same research group extended the method in the Journal of Systems and Software in 2019. That version brings data stores into the analysis: it looks at which processes use which datastores and clusters them together. It also compares coupling and cohesion metrics against other approaches on a Cargo Tracking system. So it addresses datastore-aware grouping and adds a quantitative evaluation, two of our main critiques, although its own discussion still notes limits around run-time behaviour and evaluation.

Second, what this means for us. In Assignment 2 we apply the method to our Part 1 monolith, the gym membership system. We haven’t agreed the full DFD yet, but our preliminary model suggests it would cut across the packages we designed. Our Billing context looks likely to split into four candidates: Charge Calculation, Invoicing, Payment Collection and Charge Recording. Notification, which almost every flow uses, looks like our equivalent of Text Extraction: the reusable service the method is good at finding. And because several of those candidates need the same invoice and charge data, it should show the data-ownership question directly.

Comparing the algorithm’s output with our own design by bounded context will be the core of our evaluation.

## Slide 14: questions

**On the slide:** Thank you · Questions? · Chen, R., Li, S. and Li, Z. (2017) ‘From monolith to microservices: a dataflow-driven approach’, 24th Asia-Pacific Software Engineering Conference (APSEC) , pp. 466–475. doi:10.1109/APSEC.2017.53 · Gysel, M., Kölbener, L., Giersche, W. and Zimmermann, O. (2016) ‘Service Cutter: a systematic approach to service decomposition’, European Conference on Service-Oriented and Cloud Computing (ESOCC) , pp. 185–200. doi:10.1007/978-3-319-44482-6_12 · Li, S. et al. (2019) ‘A dataflow-driven approach to identifying microservices from monolithic applications’, Journal of Systems and Software , 157, 110380. doi:10.1016/j.jss.2019.07.008

**Speaker notes:**

[All · remaining time]

Thank you. We’re happy to take questions.

Likely questions and short answers:

Who decides two operations are the same? The analyst, in step 1, by naming. The algorithm only compares names. That is the method’s main weakness.

What happens to the database? Each candidate owns its output data, but the 2017 method doesn’t say who owns the persistent stores: they are removed from the diagram. The 2019 follow-up brings them into the grouping.

Would you really deploy Text Extraction as its own service? Probably not on its own. It is a technical utility, and you would likely merge it into a coarser business service. The authors admit candidates may need regrouping.

How would you measure whether the result is good? Coupling and cohesion metrics, number of calls between services per use case, and shared data stores per pair of services. That is what we plan for Assignment 2.

Does it work on existing code? It does not analyse or transform source code directly. You must first model the existing system’s business logic as a DFD, and it can then inform how to redesign it. Implementing the migration, such as moving data or keeping the monolith running, is outside its scope.

How is it different from decomposing by verb or use case? It is close to decomposing by verb, with rules for merging. Domain-driven design would instead decompose by business capability.
