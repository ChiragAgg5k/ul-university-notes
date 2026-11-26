# Final report plan: how open-source projects make money

Outline, 26 November 2026. This is not report text. Reports written by generative AI are marked zero, so write every sentence yourself; this file only fixes the structure, the argument to test and the sources for each part. Sources: [SOURCES.md](SOURCES.md).

Due **Fri 4 December 2026, 23:59**, PDF, "Final Report" dropbox, in the official [report_template.docx](Brief/report_template.docx), downloaded from the "writing" lecture topic on 26 Nov 2026 with its [lecture notes](Brief/writing-lecture-slides-notes.pdf). Set the heading (title, name as on Brightspace, date) and the file's Author property, which still says "group member names". The template calls the section "Method" where the dropbox says "Approach", and asks for three to five Discussion themes; three meets both.

## What Prof. Noll asked for

| Ask | Where the plan covers it |
| --- | --- |
| A wider range of revenue models, not only licensing and subscription | Results: five groups, about 15 named models |
| Grounded in the research literature (20 years of studies), not my own work | Approach: a stated search method; every case comes from a published study |
| How the mix of models has changed over time | Results: a timeline by period; Discussion theme 2 |
| Several cases from published studies | one case per group, each from a paper (below) |
| Effect on contributors and governance | Discussion theme 3 |
| Conclusion in three themes, with my own view | Discussion and Conclusion |
| 15–20 references, Harvard, every claim cited | 25 candidates; keep the ones you read |

## Title

A topic title, no module code or assignment name. Something like "Revenue models in open-source software: a review of the literature from 1999 to 2026", in your words.

## Research questions

- **RQ1:** What revenue models do open-source projects and the firms behind them use?
- **RQ2:** How has the mix of these models changed since the late 1990s?
- **RQ3:** What does each model cost the project's community?

## Page budget (8 pages, references extra)

| Section | Pages | Contents | Main sources |
| --- | --- | --- | --- |
| Abstract | 0.25 | question, method, the three findings, answer; no citations | none |
| Introduction | 0.75 | why the question matters (open source is free, yet firms invest heavily); the three RQs; one line saying the presentation's single example motivated a wider review | Hoffmann et al. 2024; Lerner and Tirole 2002 |
| Background | 1 | what makes open source different; licences (permissive vs. copyleft) since several models depend on them; from volunteers to commercial "OSS 2.0" | Fitzgerald 2006; Lerner and Tirole 2005; Bonaccorsi and Rossi 2003 |
| Approach | 0.75 | how sources were found and classified (below) | none needed beyond the databases named |
| Results | 2.5 | the classification table; one paragraph per group with a published case; the timeline | all groups in SOURCES.md |
| Discussion | 2 | three themes; agreements and disagreements between sources; limits of this review | see themes |
| Conclusion | 0.75 | answer each RQ, then your position | sources from the themes |

## Approach (show the method: lesson from every module)

A narrative literature review, not a systematic one (the presentation brief said not to do a systematic review). Write down what you actually did:

1. **Seed papers:** Riehle 2012 and Watson et al. 2008, chosen because each classifies business models.
2. **Search:** databases (Scopus or Google Scholar via the UL library, Crossref), the search strings, the date range 1999–2026.
3. **Snowballing:** backwards from the seed papers' reference lists, forwards via "cited by".
4. **Inclusion:** peer-reviewed journal or conference papers about how OSS is funded or commercialised; working papers only where no peer-reviewed source exists, and marked as such.
5. **Coding:** for each paper, record the models it describes, the period its data covers and any effect on contributors. That coding table is the Results.

Name the alternatives (systematic review; interviews with firms) and say why a narrative review fits an 8-page report in one week.

## Results: the classification

Build one table: rows are the models, columns are group, earliest source, period of evidence, published case, community effect. Then one paragraph per group.

| Group | Models | Published case to use |
| --- | --- | --- |
| 1. Services around free code | support, training, consulting, certified distribution | corporate distribution (Red Hat-style) as described by Watson et al. 2008 and Fitzgerald 2006 |
| 2. Rights to the code | dual licensing, open core, proprietary add-ons, hybrid | single-vendor firms in Riehle 2012; 146 hybrid firms in Bonaccorsi et al. 2006 |
| 3. Code as a running service | hosted/SaaS; relicensing against cloud resale | Redis licence change in Han et al. 2026 |
| 4. Complements | hardware, platforms, IP and trademarks, pooled R&D | Apple, IBM and Sun in West 2003; IP-holding firms in Fosfuri et al. 2008 |
| 5. Funding without a sale | donations, sponsorship, foundations, paid developers | donations in Overney et al. 2020; GitHub Sponsors in Shimada et al. 2022; foundations in O'Mahony and Bechky 2008 |

Check the grouping against the papers as you read; if Watson et al. or Hecker group things differently, say so and justify your choice. That comparison is synthesis, which Noll asked for.

**Timeline figure:** one diagram with the four periods (1999–2003, 2005–2008, 2010–2016, 2019–2026) and which groups the literature of each period focuses on. Derive it from your coding table, not from memory, and say that it shows where research attention went, which is not the same as market share.

## Discussion: three candidate themes

These are hypotheses to test while reading, not conclusions. Keep, change or replace each one according to what the papers say. Each theme gets one paragraph: the theme, the evidence, what you conclude.

1. **The money comes from something next to the code, not the code.** Every group sells a complement: service, rights, hosting, hardware, reputation. Test against Hecker 1999, West and Gallagher 2006, Fosfuri et al. 2008, Riehle 2007.
2. **The mix moves to wherever the vendor can still control access.** Support (1999) to dual licences and open core (2005–2012) to hosted services and relicensing (2019–2026), each shift a response to someone else capturing the value (latest: cloud providers). Test against Watson et al. 2008, Bonaccorsi et al. 2006 (are hybrids stable?), Riehle 2012, Han et al. 2026. Note where sources disagree.
3. **Every model trades revenue against community.** More company control, fewer outside newcomers (Zhou et al. 2016); parasitic vs. symbiotic firms (Dahlander and Magnusson 2005); governance modes (Schaarschmidt et al. 2015); forks after relicensing (Han et al. 2026); and the model with no control at all, donations, raises little (Overney et al. 2020).

**Disagreements to look for:** whether hybrid models are stable (Bonaccorsi et al. 2006) or a phase; whether firm involvement helps projects (Medappa and Srivastava 2019) or crowds out volunteers (Zhou et al. 2016).

**Limits:** narrative review; research attention is not market share; most studies are of single firms or projects; one week of reading.

## Conclusion

Answer RQ1–RQ3 in turn, then the overall question in two or three sentences. Your opinion goes here, clearly marked as yours ("In my view…") and argued from the three themes. This and the abstract are the only uncited sentences.

## Schedule (shared with the Research Methods essay, also due Fri 4 Dec)

| Day | Work |
| --- | --- |
| Thu 26 – Fri 27 Nov | Download template. Read the two seed papers and group 2 and 3 sources; start the coding table |
| Sat 28 – Sun 29 Nov | Read groups 1, 4, 5 and the community papers; finish the coding table and timeline; write Background and Approach |
| Mon 30 Nov – Tue 1 Dec | Write Results and Discussion |
| Wed 2 Dec | Introduction, Conclusion, Abstract; full draft done |
| Thu 3 Dec | Citation pass (every factual sentence cited), LESSONS.md checks, Grammarly, proofread |
| Fri 4 Dec | Convert to PDF, check page count, submit before 23:59 |

## Before submitting

- [ ] In `report_template.docx`, 8 pages or fewer before the references
- [ ] Sections: Abstract, Introduction, Background, Approach, Results, Discussion, Conclusion, References
- [ ] Title is the topic only
- [ ] 15–20 references, all read, all cited in the text, all in the list; Harvard author-date, never "[5]"
- [ ] Read every paragraph and mark any sentence with a fact or claim and no citation
- [ ] Quotes in quotation marks with page numbers; paraphrases cited
- [ ] Several models and several published cases; my own work at most a single motivating line
- [ ] Synthesis, not "X said, Y said"; three themes in the Discussion; my view in the Conclusion
- [ ] All [LESSONS.md](../../LESSONS.md) checks
- [ ] Grammarly, proofread, exported to PDF, PDF opened and checked
