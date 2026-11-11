# Statistics test: mock papers

Three practice papers in the shape of the lecturer's sample test: five questions, 4 marks each, 35 minutes. They were written from the Week 9 lecture and its worked examples; they are not the lecturer's questions, and the marking schemes are my reading of what earns the marks.

Sit each one on paper, closed book, with a timer. Mark it only after the 35 minutes are up.

## Mock paper A

Same shape as the sample paper. Five questions, 4 marks each, 35 minutes, closed book.

**Q1.** A paper reports that a Mann-Whitney analysis of two teaching methods gave P = 0.03. What does the choice of Mann-Whitney tell you about the design of the study, and what does the P value mean?

**Q2.** A study of 25 developers correlates years of experience with the number of defects in their code. It reports Spearman's rho = −0.82, P = 0.004. Explain both figures and the conclusions that can be drawn.

**Q3.** State the three conditions that data must meet for a parametric test to be used. What should a researcher do if one of them does not hold?

**Q4.** 160 software projects were counted by language and licence. Which statistical test fits? Explain its basis by working out the expected frequency of the Open / Java cell.

|  | Java | Python | Go | Total |
| --- | --- | --- | --- | --- |
| Open | 30 | 45 | 15 | 90 |
| Closed | 40 | 25 | 5 | 70 |
| Total | 70 | 70 | 20 | 160 |

**Q5.** Three separate groups of 8 programmers (novice, intermediate, expert) each debug the same program. The researcher predicts that the number of bugs found rises with expertise. The data are skewed. Which technique or techniques should be used, and why?

### Marking scheme for paper A

One mark per point.

**Q1**

- Two conditions were compared.
- Between subjects: different participants were in each condition.
- The data were treated as non-parametric: not interval, not normally distributed, or with unequal variance, so scores were ranked.
- P = 0.03 is a 3% probability that the difference is due to chance. It is below 0.05, so significant at the 5% level, but not at the 1% level.

**Q2**

- rho runs from −1 to +1. −0.82 is a strong correlation.
- It is negative: as experience rises, defects fall.
- P = 0.004 is a 0.4% probability of a correlation this strong arising by chance; significant at both the 5% and 1% levels.
- Conclusion: there is a reliable association, but a correlation does not show that experience causes fewer defects.

**Q3**

- Scores are on an interval scale.
- The scores have a normal distribution.
- Homogeneity of variance: the variability of scores is roughly the same in each condition.
- If any one fails, use a non-parametric test, which works on ranks. (Shapiro-Wilk checks normality, Levene's test checks variance.)

**Q4**

- Chi-square: projects are allocated to categories, so the data are frequencies, not scores.
- It compares the observed frequencies with those expected if language and licence were unrelated.
- Expected = (row total × column total) ÷ grand total = (90 × 70) ÷ 160 = 39.4, against 30 observed.
- The statistic sums (O − E)² ÷ E over all cells; the larger it is, the less likely the pattern is chance. (Here it is 9.80 with 2 degrees of freedom, above the 5% critical value of 5.99, so significant.)

**Q5**

- Different participants in each group: a between-subjects design.
- More than two conditions, and non-parametric data.
- Kruskal-Wallis tests whether the three groups differ at all, but gives no direction.
- Because an order is predicted, Jonckheere's trend test is the better choice; it is allowed here because the groups are of equal size.

## Mock paper B

Adds the ranking mechanics from the lecture. Five questions, 4 marks each, 35 minutes, closed book.

**Q1.** A paper states: "A Friedman test showed a difference between the interfaces (χr² = 9.5, P = 0.009)." What does the choice of Friedman imply about the design, and what can and cannot be concluded?

**Q2.** Eight participants were timed under condition 1 and condition 2. The differences (condition 1 minus condition 2) were: −3, −1, +2, −4, 0, −2, −5, +1. Name the test, calculate its statistic, and say whether it is significant one-tailed at P = 0.05 if the table value for this number of subjects is 3.

**Q3.** Compare within-subjects and between-subjects designs. Give one advantage and one disadvantage of each.

**Q4.** Twelve nurses each enter patient records using a paper form, a tablet and a voice system. Entry times are skewed. (a) Which test checks whether the systems differ? (b) How does the answer change if the researcher predicted that times fall from paper to tablet to voice?

**Q5.** What do the significance levels P = 0.05 and P = 0.01 mean? Why might a researcher insist on one and not the other?

### Marking scheme for paper B

One mark per point.

**Q1**

- Within subjects: the same participants used every interface.
- There were more than two conditions, and the data were non-parametric.
- P = 0.009 is a 0.9% probability that the differences are due to chance; significant at the 1% level.
- Friedman has no direction: it shows the interfaces differ, not which is better or in what order. A trend test (Page's L) or pairwise comparisons would be needed.

**Q2**

- Wilcoxon: two conditions, same participants. The zero difference is dropped, leaving N = 7.
- Ranks by size, ignoring sign, ties sharing the average: the two 1s get 1.5, the two 2s get 3.5, then 3 → 5, 4 → 6, 5 → 7.
- Positive ranks sum to 3.5 + 1.5 = 5; negative ranks sum to 23. W is the smaller: 5.
- W must be less than or equal to the table value. 5 is greater than 3, so the result is not significant.

**Q3**

- Within subjects: the same participants do every condition. Advantage: individual differences cancel out.
- Within disadvantage: order effects such as learning or fatigue, where the earlier condition affects the later one.
- Between subjects: different participants per condition. Advantage: no order effects, each person meets the task fresh.
- Between disadvantage: individual differences between the groups may explain the result; controlled by matching or random allocation.

**Q4**

- The same nurses use all three systems: within subjects, more than two conditions.
- Skewed data are non-parametric, so (a) is Friedman.
- (b) With a predicted order, use Page's L trend test.
- Page's L uses the same within-row ranking but weights the columns in the predicted order, so a rising trend gives a large L; larger is more significant.

**Q5**

- P is the probability that the result is due to chance (variability in the sample) and not the effect being tested.
- P = 0.05 is a 5%, or 1 in 20, probability; P = 0.01 is 1%, or 1 in 100.
- The smaller the P, the more confidence that the effect is real; 0.01 is the stricter level.
- The acceptable level depends on what is at stake: a new drug or aircraft safety needs the stricter level, an educational aid can accept 0.05.

## Mock paper C

Harder readings and a between-subjects calculation. Five questions, 4 marks each, 35 minutes, closed book.

**Q1.** A study reports a Kruskal-Wallis result of H = 7.21, P = 0.027. Describe the design this implies and interpret the result.

**Q2.** Two different groups of four students scored as follows. Group 1: 12, 15, 9, 15. Group 2: 9, 20, 15, 7. Name the test, rank the scores, and give the rank total of each group. What do the totals suggest?

**Q3.** Two experiments each compare the same two conditions and obtain almost identical means. Explain why a researcher still cannot say that both show the same effect, and what an inferential statistical test adds.

**Q4.** A survey of 400 students reports a correlation between hours of social media use and exam anxiety of rho = 0.31, P = 0.002. A newspaper headline says "Social media strongly causes exam anxiety". Comment.

**Q5.** Name the appropriate test for each study and give the reason. (a) 40 patients are classified by treatment (A or B) and by outcome (improved or not improved). (b) The same 15 students sit an ordinal-scored test before and after a course.

### Marking scheme for paper C

One mark per point.

**Q1**

- Between subjects: different participants in each condition.
- More than two conditions, with non-parametric data; all scores were ranked together and the rank totals compared.
- P = 0.027 is a 2.7% probability that the differences are due to chance: significant at the 5% level, not at the 1% level.
- It shows a difference, not a direction: it does not say which groups differ or in what order.

**Q2**

- Mann-Whitney: two conditions, different subjects, so all eight scores are ranked together.
- Ranks: 7 → 1; the two 9s → 2.5 each; 12 → 4; the three 15s → 6 each; 20 → 8.
- Group 1 total: 4 + 6 + 2.5 + 6 = 18.5. Group 2 total: 2.5 + 8 + 6 + 1 = 17.5.
- The totals are almost equal, so there is little sign of a difference. (U = 16 + 10 − 18.5 = 7.5, U′ = 8.5; the smaller, 7.5, is far too large to be significant.)

**Q3**

- Means hide variability: in one experiment the scores may barely overlap, in the other they may overlap heavily.
- With high variability, a difference in means could easily arise by chance.
- Descriptive statistics only describe the data collected; inferential statistics judge whether the difference is dependable beyond this sample.
- The test gives the probability that the result is due to chance; the smaller it is, the more confidence in the hypothesis.

**Q4**

- rho = 0.31 is a weak positive correlation: more use goes with somewhat more anxiety.
- P = 0.002 means it is very unlikely to be chance; it is statistically significant.
- Significance is not strength: a large sample can make a weak correlation significant, so "strongly" is wrong.
- Correlation is an association, not cause and effect, so "causes" is wrong too.

**Q5**

- (a) Chi-square.
- Because each patient is allocated to one category and the data are counts; it needs more than 20 subjects and at least 5 expected in each cell.
- (b) Wilcoxon.
- Because there are two conditions, the same students do both, and ordinal scores are non-parametric.

## Drill: name the test

Cover the last two columns.

| Study | Test | Why |
| --- | --- | --- |
| The same 15 developers fix bugs once with an AI assistant and once without. Times are heavily skewed. | Wilcoxon | Two conditions, same subjects, non-normal data. |
| Bugs found per hour by a team in Limerick and a different team in Cork. Small groups, ordinal ratings. | Mann-Whitney | Two conditions, different subjects. |
| Each of 10 testers rates four interface designs on a 1 to 7 scale. No order is predicted. | Friedman | More than two conditions, same subjects, no predicted trend. |
| The same radiologists read scans after 0, 1 and 2 nights without sleep. Errors are predicted to rise with each night. | Page's L | More than two conditions, same subjects, and a predicted order. |
| Three separate classes are taught by lecture, video or lab. Exam ranks are compared with no prediction about which is best. | Kruskal-Wallis | More than two conditions, different subjects, no predicted trend. |
| Three separate groups of 8 get 0, 2 or 4 hours of training. Scores are predicted to rise with training. | Jonckheere | More than two conditions, different subjects, a predicted order, and equal group sizes. |
| Is there a relationship between years of experience and code-review score across 20 engineers? | Spearman's rho | An association between two variables, not a difference between conditions. |
| 120 projects are counted by language (Java, Python, Go) and by licence (open, closed). | Chi-square | Counts of subjects falling into categories, not scores. |
| Patients' pain ratings before and after physiotherapy. | Wilcoxon | Before and after on the same people is two related conditions. |
| Recall scores of people who were given a title before reading a text, against other people who were not. | Mann-Whitney | Two conditions, different people in each. |
| Do novices, intermediates and experts differ in the number of defects they find? Groups have 4, 3 and 4 people. | Kruskal-Wallis | Three unrelated groups. Unequal sizes rule out Jonckheere even if a trend were predicted. |
| Eight programmers are measured with 8, 6 and 4 hours of sleep. The researcher only asks whether sleep makes any difference. | Friedman | Same subjects, three conditions, no direction asked for. |
| GPs are ranked on diagnosis speed and on crossword speed. Do the rankings agree? | Spearman's rho | Two rankings of the same people: a correlation. |
| Experts and novices are each classified as using a bottom-up, top-down or mixed comprehension strategy. | Chi-square | Each person is allocated to one category; the data are frequencies. |
| The same nurses enter records on a paper form, a tablet and a voice system. Entry time is predicted to fall in that order. | Page's L | Same subjects, three conditions, predicted trend. |
| Male and female students' satisfaction ratings (1 to 5) for one module. | Mann-Whitney | Gender is a fixed property, so the design must be between subjects; two conditions. |
| Four separate groups of 6 patients receive 0, 5, 10 or 20 mg of a drug. Symptom scores are predicted to fall as the dose rises. | Jonckheere | Different subjects, more than two conditions, predicted order, equal groups. |
| Does time spent in the lab go with final grade? Both are available for 30 students, and grades are ordinal. | Spearman's rho | A relationship between two variables measured on the same students. |
| Each of 12 users tries two login screens. Their error counts are not normally distributed. | Wilcoxon | Two conditions, same users. |
| Hospital wards are counted by size (small, medium, large) and by whether they adopted the new system (yes, no). | Chi-square | A contingency table of counts. |
| Six reviewers each score five grant proposals. Do the proposals differ? | Friedman | Each reviewer scores every proposal: same subjects, five conditions. |
| Readers from three different schools rate one textbook. No school is predicted to rate it higher. | Kruskal-Wallis | Three unrelated groups, no predicted order. |
