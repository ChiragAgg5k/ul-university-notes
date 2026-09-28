# Week 8 Poster: Moving Out from Chidamber & Kemerer
CS6081 — Research Methods and Practice (SESD) | 2026/7 SEM1 | Lecturer: Jim Buckley

Introduced in Lecture 2 and fully briefed in [Lecture 04](../Lecture%2004/README.md). No Brightspace assignment folder or group category exists for it yet (checked 28 Sep 2026).

**Status: not started.** The team should have formed in Week 2 (Lecture 2: "Form teams of 4. Read and agree on 4 other articles/theme of your review"), so this is already late.

## Brief

Make an academic poster that gives a **cohesive** summary and critique of the seed paper plus follow-up papers, and ends with the research question they lead to. Work in a team of 4. Enquiry should drive which papers you choose: what the seed paper doesn't expand on, what you think should be there, or claims it gives too little evidence for. Each new paper should build on the first. Aim for a cohesive whole, not a paper-by-paper list (Lecture 2).

| | |
| --- | --- |
| Seed paper (SE stream) | [Chidamber, S.R. and Kemerer, C.F. (1994) 'A metrics suite for object oriented design', *IEEE Transactions on Software Engineering*, 20(6), 476–493. doi: 10.1109/32.295895](Chidamber%20and%20Kemerer%201994%20-%20A%20Metrics%20Suite%20for%20Object%20Oriented%20Design.pdf) (the Week 2 Brightspace copy) |
| Weight | **20%** of the module |
| Team | 4 people |
| Format | Poster **presentation and defence**. Each team has a slot of about **15 minutes** (Lecture 1) |
| When | Week 8 (w/c Mon 26 Oct 2026). Lectures are on Mondays, and 26 Oct is the October bank holiday, so confirm the date |

**Paper count, to confirm with Jim:** Lectures 1 and 2 say to find **4 more** papers (5 in total). Lecture 4 says **4 articles in total** (the seed plus 3). Ask which one applies. Until he answers, aim for 4 follow-ups: dropping one later is easier than adding one.

SD students (CS5731) use O'Donnell and Buckley's pair programming pedagogy paper instead.

## Marking (20)

From the Lecture 4 "Marking" slide.

| Criterion | Marks | What it means for us | Done |
| --- | --- | --- | --- |
| Research question chosen | 5 | One explicit question that the papers leave open, stated on the poster. It must have a *why* (Lecture 3/4: "must generate/assess new insight") | [ ] |
| Traceable summary | 5 | Every claim is cited to one of our papers. Harvard style, full reference list | [ ] |
| Critical review | 6 | Strengths, weaknesses, agreements and contradictions **across these papers only**. No outside sources in the critique | [ ] |
| Creativity | 4 | Layout and visual design (see [Poster design](#poster-design)) | [ ] |

## Checklist

- [ ] Form the team of 4 and record the names below. Nobody has created a Brightspace group, so do this in class or by email
- [ ] Ask Jim: total of 4 papers or 5? Exact Week 8 slot, given the bank holiday? Printed A0 or on screen?
- [ ] Everyone reads the seed paper, especially §VI "Future Directions" and §VII "Concluding Remarks" (quoted below)
- [ ] Hold a Delphi-style session: each person proposes 2–3 lines of enquiry with a justification, then vote
- [ ] Choose one research question that ties the follow-up papers together
- [ ] Choose the follow-up papers, one reader each, with the seed paper and the synthesis shared
- [ ] One-paragraph summary per paper, with page-cited claims
- [ ] Comparison table: method, data set, languages/systems, findings, limitations
- [ ] Critique: where the papers agree, contradict, or leave gaps. Answer the research question from this evidence
- [ ] Draft the poster layout (headline finding, ammo bar, silent presenter bar)
- [ ] Reference list in UL Harvard, managed in EndNote
- [ ] Add a QR code linking to the full references or notes
- [ ] Rehearse the walkthrough and the defence. Everyone must be able to answer questions on any part of it
- [ ] Put the final poster and the paper PDFs in this folder

## What the seed paper itself leaves open

C&K propose six metrics (WMC, DIT, NOC, CBO, RFC, LCOM), check them against Weyuker's properties, and collect data from two sites: Site A (C++, 634 classes) and Site B (Smalltalk, 1459 classes). They show that collecting the data is *feasible*, but they don't link the metrics to any outcome. In their own words:

- *"The most obvious extension of this research is to analyze the degree to which these metrics correlate with managerial performance indicators, such as design, test and maintenance effort, quality and system performance."* (§VI Future Directions)
- *"Only two sites were used in this study, and therefore no claims are offered as to any systematic differences between the C++ and Smalltalk environments."* (§VI)
- *"Another interesting study would be to follow a commercial application from conception to deployment and gather metrics at various intermediate stages."* (§VI)
- *"The LCOM metric might warrant alternative interpretations since it is currently based on a data-centered view of cohesion."* (§VII)
- *"There is no reason to believe that the proposed metrics will be found to be comprehensive."* (§VII)

They also claim the suite is *"the first empirically validated proposal for formal metrics for OOD"* (§VII). But their "validation" is feasibility data, not prediction, and that gap is a strong target for critique.

## Candidate follow-up papers

Grouped by line of enquiry. All citations were checked on Crossref.

**1. Do the metrics predict quality? (C&K's "most obvious extension")**
- Li, W. and Henry, S. (1993) 'Object-oriented metrics that predict maintainability', *Journal of Systems and Software*, 23(2), 111–122. doi: 10.1016/0164-1212(93)90077-B. C&K cite it themselves as early support
- Basili, V.R., Briand, L.C. and Melo, W.L. (1996) 'A validation of object-oriented design metrics as quality indicators', *IEEE TSE*, 22(10), 751–761. doi: 10.1109/32.544352
- Subramanyam, R. and Krishnan, M.S. (2003) 'Empirical analysis of CK metrics for object-oriented design complexity: implications for software defects', *IEEE TSE*, 29(4), 297–310. doi: 10.1109/TSE.2003.1191795. Also tests C++ vs Java, which picks up the two-language gap
- Gyimóthy, T., Ferenc, R. and Siket, I. (2005) 'Empirical validation of object-oriented metrics on open source software for fault prediction', *IEEE TSE*, 31(10), 897–910. doi: 10.1109/TSE.2005.112

**2. Are the metrics well defined? (the LCOM and definition gap)**
- Churcher, N.I. and Shepperd, M.J. (1995) 'Comments on "A metrics suite for object oriented design"', *IEEE TSE*, 21(3), 263–265. doi: 10.1109/32.372153 (includes C&K's reply)
- Hitz, M. and Montazeri, B. (1996) 'Chidamber and Kemerer's metrics suite: a measurement theory perspective', *IEEE TSE*, 22(4), 267–271. doi: 10.1109/32.491650
- Kitchenham, B., Pfleeger, S.L. and Fenton, N. (1995) 'Towards a framework for software measurement validation', *IEEE TSE*, 21(12), 929–944. doi: 10.1109/32.489070

**3. Is it just measuring size?**
- El Emam, K., Benlarbi, S., Goel, N. and Rai, S.N. (2001) 'The confounding effect of class size on the validity of object-oriented metrics', *IEEE TSE*, 27(7), 630–650. doi: 10.1109/32.935855

**4. Where did the field end up?**
- Radjenović, D., Heričko, M., Torkar, R. and Živkovič, A. (2013) 'Software fault prediction metrics: a systematic literature review', *Information and Software Technology*, 55(8), 1397–1418. doi: 10.1016/j.infsof.2013.02.009

**Strongest single-thread option:** *"Do the C&K metrics predict fault-proneness once class size is controlled for?"* It follows C&K's own "most obvious extension" and uses:
- Basili et al. (1996) for early validation
- Gyimóthy et al. (2005) for open-source replication
- El Emam et al. (2001) for the size challenge
- Subramanyam and Krishnan (2003) as a fourth paper if 5 in total are needed

The papers partly contradict each other, which gives the critique something real to work with.

## Poster design

From the lecture and the linked [#betterposter talk](https://www.youtube.com/watch?v=1RwJbhkCA58) (design 13:00–16:15, user goals 16:16–19:31):

- Readers are experts who stop for about 5 minutes. Get their attention, make the main point, and keep the detail for conversation.
- **Centre:** the main finding in plain language, large, with a QR code.
- **Ammo bar:** the supporting detail (methods, the comparison table, figures).
- **Silent presenter bar:** what someone reading on their own needs (question, papers, references).
- The talk's goals aren't exactly ours. This poster is marked on the research question, traceability, and critique, so those must be easy to see. It is also *defended*, so the ammo bar should hold the evidence we'll be asked about.

## Team

| Member | Paper owned | Done |
| --- | --- | --- |
| Chirag Aggarwal | | [ ] |
| | | [ ] |
| | | [ ] |
| | | [ ] |
