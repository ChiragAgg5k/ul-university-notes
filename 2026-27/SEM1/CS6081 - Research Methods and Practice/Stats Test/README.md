# CS6081 statistics test

**10% of the module, individual, Week 11.** The sample paper says the test starts at 13:10 sharp and ends at 13:45, with class resuming at 13:50. That fits the Monday lecture slot, so the likely date is Mon 16 November 2026; confirm it with Jim Buckley. Five questions, 4 marks each, 20 marks in total, about 7 minutes per question.

- [Sample test](Sample%20test.png), handed out in Week 10 as "Sample test for next week's Stats test"
- Source material: the Week 9 lecture ("Lecture 9 stats small refinements") and the worked tables beside it on Brightspace (Wilcoxon, Mann-Whitney, Friedman, Page's L, Kruskal-Wallis, Jonckheere and Spearman)

The answers below are my own working, not the lecturer's marking scheme. Check them against the Week 9 slides.

## What the test asks for

Every sample question is one of three kinds:

1. **Pick the test** for a described study, and justify it from the design (Q4, Q5).
2. **Read a result**: what the choice of test says about the design, and what the P value means (Q1, Q2).
3. **Explain a concept** in a few lines (Q3).

There is almost no arithmetic. The only calculation is one expected frequency for the chi-square bonus.

## Choosing the test

Ask three questions, in this order: what kind of data, how many conditions, and are the same participants in every condition?

| Data and aim | Same participants in each condition (related) | Different participants (unrelated) |
| --- | --- | --- |
| Two conditions, looking for a difference | Wilcoxon signed-rank | Mann-Whitney U |
| Three or more conditions, any difference | Friedman | Kruskal-Wallis |
| Three or more conditions, predicted order (a trend) | Page's L | Jonckheere |
| Two variables, looking for a relationship | Spearman's rho | Spearman's rho |
| Counts in categories (a frequency table) | — | Chi-square |

All of these are non-parametric: they work on ranks or counts, so they suit ordinal data and non-normal distributions. Their parametric cousins (t-tests, ANOVA, Pearson's r) need interval data and roughly normal distributions.

## Reading a result

- **P value**: the probability of getting a result at least this extreme if the null hypothesis (no difference, no relationship) were true. It is not the probability that the null hypothesis is true.
- **Significance**: compare P with the chosen level, usually 0.05. If P < 0.05, reject the null hypothesis; the result is statistically significant at the 5% level. If P < 0.01 it is also significant at the 1% level.
- **Not significant is not "no effect"**: it means the evidence is too weak to rule out chance, which is common with small samples.
- **Effect size and significance are separate**: a correlation coefficient says how strong a relationship is, the P value says how confident we can be that it is not chance.
- **Correlation is not causation.**

## Sample test with model answers

### Q1. A paper's Wilcoxon analysis obtains P = 0.015. What does the choice of Wilcoxon imply about the design, and what does P mean?

- Wilcoxon (signed-rank) compares **two conditions** in a **related design**: the same participants measured twice, or matched pairs.
- It is non-parametric, so the authors had ordinal data or data that was not normally distributed, or a small sample.
- P = 0.015 means there is a 1.5% probability of seeing a difference this large if there were truly no difference between the conditions.
- 0.015 < 0.05, so the difference is statistically significant at the 5% level and the null hypothesis is rejected. It is not significant at the stricter 1% level (0.015 > 0.01).

### Q2. GPs' diagnosis speed and crossword speed: Spearman rho = 0.95, P = 0.13. Explain both and the conclusions.

- rho = 0.95 is a very strong positive correlation between the two rankings: GPs who rank fast at diagnosing also rank fast at the crossword. rho runs from −1 to +1, with 0 meaning no relationship.
- P = 0.13 is greater than 0.05, so the correlation is **not statistically significant**. There is a 13% probability of seeing a correlation this strong by chance when no real relationship exists.
- A coefficient this high with a P value this weak points to a very small sample.
- Conclusion: we cannot reject the null hypothesis, so we cannot claim a relationship. The result is suggestive at best and the study should be repeated with more GPs. Even a significant result would not show that one skill causes the other.

### Q3. One-tailed and two-tailed tests: what they are, when to use them, which is harder to reach significance with and why.

- A **one-tailed** test goes with a directional hypothesis: it predicts which way the difference goes ("A is faster than B"). Use it only when theory or earlier evidence justifies the direction before the data is collected.
- A **two-tailed** test goes with a non-directional hypothesis: it predicts a difference without saying which way ("A and B differ"). Use it when there is no firm basis for a direction; it is the safer default.
- The **two-tailed** test is harder to reach significance with. The 5% significance level is split across both ends of the distribution, 2.5% in each tail, so the result has to be more extreme to fall in the rejection region. In a one-tailed test the whole 5% sits in one tail.

### Q4. Three tool types by three cancer categories, counts in each cell. Which test? Bonus: explain the basis using one cell.

| | Tool type 1 | Tool type 2 | Tool type 3 | Total |
| --- | --- | --- | --- | --- |
| LNC | 25 | 27 | 20 | 72 |
| BC | 6 | 22 | 25 | 53 |
| PC | 5 | 8 | 6 | 19 |
| Total | 36 | 57 | 51 | 144 |

- The test is **chi-square** (the chi-square test of association). The data are **frequencies**: counts of tools falling into categories on two nominal variables, with each tool counted once.
- Basis: compare each **observed** count with the count **expected** if tool type and cancer category were unrelated.
  - Expected = (row total × column total) ÷ grand total.
  - For the LNC / Tool type 1 cell: (72 × 36) ÷ 144 = **18** expected, against 25 observed.
  - That cell contributes (observed − expected)² ÷ expected = (25 − 18)² ÷ 18 = 49 ÷ 18 ≈ 2.72.
- Add the contributions of all nine cells to get the chi-square statistic. The bigger the gaps between observed and expected, the bigger the statistic.
- Degrees of freedom = (rows − 1) × (columns − 1) = 2 × 2 = 4. The critical value at the 5% level is 9.49.
- Not asked for in the test, but worked out here: the full statistic is about 10.19, which exceeds 9.49, so the tool types do differ significantly in the cancers they focus on (it does not reach the 1% critical value of 13.28). The two cells driving it are BC / Type 1 (6 against 13.25 expected) and LNC / Type 1.

### Q5. One group of radiologists under three conditions (slept, one night deprived, two nights deprived), errors counted, non-normal data. Which technique(s)?

- One group does all three conditions, so the design is **related** (repeated measures).
- There are **three conditions**, so a two-condition test such as Wilcoxon is not enough by itself.
- The data are non-normal, so a **non-parametric** test is needed.
- That gives **Friedman**, which tests whether there is any difference among the three conditions.
- The conditions are also ordered (none, one night, two nights) and the natural prediction is that errors rise with deprivation. **Page's L** tests for that predicted trend in a related design, so it is the stronger choice if the hypothesis states the order.
- If Friedman is significant, pairwise Wilcoxon tests can locate which conditions differ.

## Preparation plan

About three hours in total.

| When | What | Time |
| --- | --- | --- |
| Wed 11 or Thu 12 Nov | Re-read the Week 9 lecture. Rebuild the test-choice table above from memory until it comes out right twice. | 60 min |
| Fri 13 or Sat 14 Nov | Go through each worked example on Brightspace (Wilcoxon, Mann-Whitney, Friedman, Page's L, Kruskal-Wallis, Jonckheere, Spearman). For each, say aloud why that test fits the design. | 60 min |
| Sun 15 Nov | Do the sample test closed-book in 35 minutes, on paper. Mark it against the answers here and the slides. | 45 min |
| Before the test | Reread the "Reading a result" list and the chi-square expected-frequency formula. | 15 min |

Week 11 also covers confidence intervals, sampling and ethics. If those are taught before the test starts, expect one short question on them.

### Practice scenarios

Cover the answers and name the test.

| Scenario | Test |
| --- | --- |
| Two different teams of developers, bugs found per hour, skewed data | Mann-Whitney U |
| The same developers timed with tool A and then tool B | Wilcoxon signed-rank |
| Three separate classes taught by three methods, exam ranks compared | Kruskal-Wallis |
| Three separate groups given 0, 1 and 2 hours of training, predicted to improve in that order | Jonckheere |
| The same testers rate four interfaces, no predicted order | Friedman |
| The same testers use an interface in weeks 1, 2 and 3, predicted to get faster | Page's L |
| Years of experience against code-review score | Spearman's rho |
| Number of projects using each of three languages, split by open or closed source | Chi-square |

### Common slips

- Calling a P value "the probability the null hypothesis is true".
- Treating a high correlation as significant without looking at P, or the reverse.
- Choosing a two-condition test when there are three conditions.
- Missing that "one group" or "the same participants" means a related design.
- Saying the one-tailed test is harder to pass. It is the two-tailed test.
