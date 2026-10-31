# Poster Defence Prep (Mon 2 Nov)

Slides: [CK Metrics Defence Slides](https://claude.ai/artifact/PRUhuikZ5MqRcELxb5bm3w) (speaker notes on each slide). Rehearsal page: [CK Poster Defence](https://claude.ai/artifact/5f1NM4ZKod33Rndgs5x5Nd) (timer and question drill). Both are private until shared.

About 15 minutes per team. Plan on a 6-minute walkthrough and about 9 minutes of questions. Marks: research question 5, traceable summary 5, critical review 6, creativity 4. The questions will test traceability and critique, so most of the preparation goes there.

## Walkthrough (about 6 minutes)

Follow the poster: question → answer → evidence trail left to right → contradiction table → what's next. Each person presents the paper they read.

| # | Who | Time | Say |
| --- | --- | --- | --- |
| 1 | Opener | 0:45 | "C&K gave us six OO design metrics in 1994 but never tested them against faults. They call that the 'most obvious extension' themselves (§VI). We followed that thread, and it led to one question: **does coupling still predict faults once you control for class size?** It matters because a class tied to many others can break when any of them changes." |
| 2 | Chirag | 1:00 | **Basili 1996, YES.** Eight student teams built the same C++ video-rental system; 180 classes; faults found by an independent test team. Five of the six metrics are linked to faults. LCOM isn't, and NOC runs backwards. Strength: same requirements for everyone, so a fair comparison. Weakness: students, small systems, and class size never controlled. That gap leads to El Emam. |
| 3 | Jagruti | 1:00 | **El Emam 2001, NO.** 174 classes from a C++ telecom framework (Schmidt's framework, reused in Ericsson switching software); 70 classes had field faults. Without size in the model, WMC, CBO and RFC look significant. With LOC added, none of them survive. This is Fig. 1: size raises the metric *and* the faults, so the link between them can be spurious. |
| 4 | Dhruv | 1:00 | **Subramanyam & Krishnan 2003, PARTLY.** Industry e-commerce suite, 405 C++ and 301 Java classes, with size controlled. WMC and CBO still raise defects in C++ but not in Java. Deeper DIT means *fewer* defects. So El Emam's "none survive" doesn't hold everywhere, but the effect depends on the language. |
| 5 | Snehal | 1:00 | **Gyimóthy 2005, YES\*.** Mozilla 1.6, 3,192 classes, bugs from Bugzilla, three modelling techniques. CBO is the best single predictor, but lines of code comes close, and size was *not* controlled. Largest and most realistic data set, but it can't answer our question alone. |
| 6 | Opener | 1:00 | **The answer.** Point at the table: every "Yes" in the uncontrolled studies turns to "No" in El Emam's. Once size is controlled, CBO is the only metric with any support, and only in C++ in one company. **Our answer: unresolved, leaning yes for CBO.** The study that would settle it: a size-controlled replication of Gyimóthy's scale across more than one language. Scan the QR code for details. |

## Likely questions

**On the research question**

- *Why CBO and not all six?* Coupling has a clear causal story (a change ripples through dependencies), and it's the only metric with support in a size-controlled study (S&K) and the best predictor in the largest study (Gyimóthy). WMC also survives in S&K, but WMC counts methods, so it is close to a size measure already. CBO is the strongest *non-size* candidate.
- *Is it answerable?* Yes. It needs a multi-system, multi-language fault data set with LOC in the model. That's the "what's next" study.
- *Why does it matter?* If CBO is just a size proxy, teams could use LOC instead and drop the CK tools. If it isn't, coupling is a design lever you can reduce.

**On traceability**

- Every card claim comes from the paper it sits under. Know your card's page numbers (Basili: data set pp. 752–754, results pp. 757–758, limitations pp. 752 and 759).
- *El Emam's table shows NOC as "–". Why?* El Emam dropped NOC because fewer than six classes had a non-zero value; the hierarchy was flat (§4.1).
- *The poster says "Ericsson framework".* Be precise: it's Schmidt's C++ communication framework, and the classes studied were being reused in Ericsson's commercial switching software (§3.1).

**On the critique (6 marks, the most likely area for hard questions)**

- *Your headline says CBO is the only metric that survives, but your table shows WMC also "C++ only" in S&K.* Concede, then explain: WMC survives too, but it's a method count and largely a size measure, so CBO is the only *design* metric that survives. If you had more space you'd write it that way. Agree on this answer as a team before Monday because it is the most likely trap.
- *Is size a confounder or a mediator?* This is our strongest critique point. If high coupling *causes* classes to grow, then size is on the causal path, and controlling for it removes part of a real effect. El Emam treats size purely as a confounder, so "none survive" may overstate the case.
- *Does "not significant" mean "no effect"?* No. El Emam has 174 classes and 70 faulty, so adding LOC costs statistical power. Absence of significance is weak evidence of absence.
- *Why include Gyimóthy if it doesn't control size?* It's the biggest and most realistic data set and shows CBO ranks first. The fact that LOC comes close is itself consistent with El Emam's concern. We mark it YES\* to make the limitation visible.
- *The studies measure different outcomes.* Yes: testing faults (Basili), field failures (El Emam), acceptance and customer defects (S&K), Bugzilla bugs (Gyimóthy). That is a real reason the results may disagree, beyond size.
- *Different languages?* C++ in all four, plus Java in S&K. C&K's own data was C++ and Smalltalk. Language effects are the gap C&K flagged (§VI), and S&K is the only study that tests it.
- *NOC reversed and DIT reversed: what does that tell you?* C&K hypothesised that more inheritance means more complexity and more faults. Two studies found the opposite, which suggests that reused, well-tested base classes are more reliable. That undermines C&K's theory for the inheritance metrics.
- *What's wrong with C&K's validation?* They called it "the first empirically validated" suite (§VII), but they only showed the metrics can be collected and checked them against Weyuker's properties. Several fail Property 6. They never tested prediction.

**On method and choices**

- *Why these four papers?* Each answers a gap left by the one before: C&K never tested faults → Basili tests them → Basili ignores size → El Emam controls size → El Emam has one system and one language → S&K tests two languages → all are small or single-company → Gyimóthy uses large open source.
- *What would you change?* Add size control to Gyimóthy-scale data; separate mediation from confounding; test across Java, C++ and a dynamic language.
- *Any papers you rejected?* Churcher & Shepperd 1995 and Hitz & Montazeri 1996 (definitional critiques) and Li & Henry 1993 (maintainability, not faults). They were dropped to keep a single thread on fault prediction.

## Before Monday

- [ ] Everyone reads all five cards and can answer for any of them, since questions can go to anyone
- [ ] Agree on the WMC/headline answer and the "unresolved, leaning yes" verdict so nobody contradicts the others
- [ ] Check the QR code opens on a phone and the linked page loads without sign-in
- [ ] Rehearse once with a timer and keep the walkthrough under 7 minutes
- [ ] Confirm with Jim: printed or on screen, and the slot time
