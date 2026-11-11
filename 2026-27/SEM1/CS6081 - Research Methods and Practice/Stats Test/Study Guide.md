# Statistics test: study guide

Everything here comes from the Week 9 lecture ("Lecture 9 stats small refinements"), its speaker notes and the worked tables beside it on Brightspace, read on 11 November 2026. The numbers in the worked examples were recomputed and match the lecture.

Jim's own summary of what you need: "you only need know the decision tree for non-parametric techniques, how to determine if data is non-parametric, your design, the technique and the meaning of the results". SPSS does the arithmetic. So learn, in this order: the decision tree, the vocabulary, how to read a result, then the mechanics of each test at the level of "what gets ranked and which way is significant".

## 1. Why statistics at all

- Two experiments can have nearly the same means (6.5 against 4, and 6.4 against 3.6) and still differ: in the first every score in condition 1 beats condition 2, in the second the scores overlap a lot. **Means do not show variability.**
- A statistical test asks how probable it is that the difference came from variability in the sample (chance) and not from the thing being tested. The smaller that probability, the more confidence in the hypothesis.
- **Descriptive** statistics describe the data in hand (a mean, a batting average). **Inferential** statistics infer beyond it: is the difference between two groups dependable or chance? The module covers inferential, non-parametric tests only.
- **Levels of significance**: P = 0.05 is a 5% (1 in 20) probability that the result is due to chance; P = 0.01 is 1% (1 in 100). The acceptable level depends on context: a drug launch or a plane landing safely needs far more certainty than an educational aid.

## 2. Vocabulary of an experiment

| Term | Meaning |
| --- | --- |
| Hypothesis | A causes B |
| Independent variable | What the experimenter changes (A): the conditions |
| Dependent variable | What is measured (B), often through a proxy measure |
| Control | Making sure A, and only A, causes B: remove or hold constant other factors, use a control group, make participants or researchers "blind" |
| Within subjects (related, repeated measures) | The same participants do every condition |
| Between subjects (unrelated) | Different participants in each condition |
| One-tailed | The hypothesis predicts a direction |
| Two-tailed | The hypothesis predicts a difference without a direction |

### Within against between

| | Within subjects | Between subjects |
| --- | --- | --- |
| Strength | Individual differences cancel out, since each person is compared with themselves | No order effects: an earlier test cannot affect a later one, and people can be misled once |
| Weakness | Order effects: learning, fatigue, the old test affecting the new one; you cannot mislead someone twice | Individual differences between the groups; controlled by matching or random sampling |
| When forced | | When the condition is a fixed property of the person (gender, expert or novice) |

### One-tailed against two-tailed

- You might expect a one-tailed test to be harder to pass. It is not.
- Predicting a difference in one direction has a specific probability of happening by chance. Allowing either direction **doubles** that probability.
- So the **two-tailed test is harder to reach significance with**: the same result gets twice the P value, or put another way the 5% is split 2.5% in each tail.
- Use one-tailed only when the direction was predicted before the data was seen.

## 3. Parametric or non-parametric

A parametric test needs all three:

1. Scores on an **interval** scale (true numbers, not ranks or categories).
2. A **normal distribution** (roughly symmetric, peak in the middle).
3. **Homogeneity of variance**: the spread of scores is roughly the same in each condition.

If any one fails, use a non-parametric test. Checks that exist in SPSS: **Shapiro-Wilk** for normality, **Levene's test** for equality of variance.

Scales: **nominal** (categories), **ordinal** (ranks), **interval** (numeric).

Non-parametric tests work by **ranking**: they only ask whether scores are higher or lower, not by how much.

## 4. The decision tree

```
What is the aim?
├── A difference between conditions
│     ├── 2 conditions
│     │     ├── same subjects ........ Wilcoxon
│     │     └── different subjects ... Mann-Whitney
│     └── more than 2 conditions
│           ├── same subjects ........ Friedman        (predicted trend: Page's L)
│           └── different subjects ... Kruskal-Wallis  (predicted trend: Jonckheere)
├── A relationship between two variables ... Spearman's rho
└── Counting how many fall into categories . Chi-square
```

Three questions, always in this order: what is the aim, how many conditions, same or different subjects. Then ask whether a direction or trend was predicted.

## 5. Ranking, the step every test shares

- Smallest score gets rank 1.
- **Tied scores share the average of the ranks they occupy.** Scores 4, 8, 3, 3, 1, 7, 4 rank as 4.5, 7, 2.5, 2.5, 1, 6, 4.5.
- **Between subjects**: the scores are unrelated, so rank all scores from all conditions together, then total the ranks per condition.
- **Within subjects, two conditions**: scores in a row belong to one person, so take the difference (condition 1 minus condition 2), rank the differences by size ignoring the sign, then put the sign back. **A difference of zero is dropped** and the number of subjects falls by one.
- **Within subjects, three or more conditions**: rank across each person's own row.

Always look at the means first, to see which direction the data goes.

## 6. Each test

For each: when to use it, what is done, the statistic, and which way is significant. The direction matters because it differs between tests.

| Test | Statistic | Table | Significant when the statistic is |
| --- | --- | --- | --- |
| Wilcoxon | W | A | **smaller** than or equal to the table value |
| Mann-Whitney | U | B1 to B4 | **smaller** than or equal to the table value |
| Friedman | χr² ("chi r squared") | C | **larger** than or equal to the table value |
| Page's L | L | D | **larger** |
| Kruskal-Wallis | H | E | **larger** |
| Jonckheere | S | G | **larger** |
| Spearman | rho | | further from 0, with enough subjects |
| Chi-square | χ² | | **larger** |

Memory hook: the two-condition tests (Wilcoxon, Mann-Whitney) take the **smaller** rank total, so small is significant. Everything else measures how big the differences are, so big is significant.

### Wilcoxon

- **When**: within subjects, 2 conditions.
- **How**: difference per subject, rank the differences ignoring sign, drop zeros, sum the positive ranks and the negative ranks separately. **W is the smaller sum.** Look up Table A with W and the number of subjects left.
- **Why smaller is better**: if nearly every difference goes the same way, one sum is tiny.
- **Lecture example**, bugs with 8 hours sleep (C1) and none (C2), 10 programmers:
  - Differences: −2, −1, +1, −4, +1, −3, −2, 0, −4, −2
  - Signed ranks: −5, −2, +2, −8.5, +2, −7, −5, (dropped), −8.5, −5
  - Positive sum 4, negative sum 41, so **W = 4** with **N = 9**.
  - One-tailed, Table A gives 6 at P = 0.025. 4 is below 6, so it is significant at P = 0.025, a 1 in 40 chance.

### Mann-Whitney

- **When**: between subjects, 2 conditions.
- **How**: rank all scores from both groups together, total the ranks per group (T1, T2).
  - U = n1·n2 + n1(n1 + 1)/2 − T1, then U′ = n1·n2 − U. **Take the smaller.**
- **Lecture example**, bugs by gender, n1 = 6 and n2 = 8:
  - T1 = 24.5, T2 = 80.5
  - U = 48 + 21 − 24.5 = 44.5; U′ = 48 − 44.5 = **3.5**
  - Tables B1 to B4 each hold one significance level. 3.5 is below 4, so it is significant at P = 0.005.

### Friedman

- **When**: within subjects, more than 2 conditions.
- **How**: rank across each person's row, total the ranks per condition. The more the totals differ, the less likely chance is.
  - χr² = [12 ÷ (N·C·(C + 1))] × (sum of each squared rank total) − 3·N·(C + 1), with N subjects and C conditions.
- **Lecture example**, bugs with 8, 4 and 6 hours sleep, 8 subjects: rank totals 11, 21, 16.
  - χr² = (12 ÷ 96) × (121 + 441 + 256) − 96 = 102.25 − 96 = **6.25**
- **Limit**: it has no direction. It says the conditions differ, not how.

### Page's L

- **When**: within subjects, more than 2 conditions, and a **predicted trend**.
- **How**: same ranking as Friedman. Put the columns in the predicted order, then weight them: L = (T1 × 1) + (T2 × 2) + (T3 × 3). Later columns count for more, so a rising trend gives a large L.
- **Lecture example**, ordered 8 hours, 6 hours, 4 hours: totals 11, 16, 21.
  - L = 11 + 32 + 63 = **106**. Against Table D this was not significant.

### Kruskal-Wallis

- **When**: between subjects, more than 2 conditions.
- **How**: rank all scores together, total per condition. Groups may be different sizes, and the formula allows for that.
  - H = [12 ÷ (N(N + 1))] × sum of (each rank total squared ÷ its group size) − 3(N + 1)
- **Lecture example**, three groups of 4, 3 and 4: rank totals 38, 14, 14.
  - H = (12 ÷ 132) × (361 + 65.33 + 49) − 36 = **7.21**
- **Limit**: a difference, not a direction.

### Jonckheere

- **When**: between subjects, more than 2 conditions, and a **predicted trend**.
- **How**: no ranking. Order the columns as predicted. For each score, count how many scores in the columns to its right are larger. S comes from those counts.
- **Needs equal numbers of subjects in every condition.**

### Spearman's rho

- **When**: looking for an association between two variables, not cause and effect.
- **Two separate results**: the coefficient (−1 through 0 to +1: direction and strength) and its statistical significance.
- **How**: rank each variable separately, take the rank difference d for each subject, square it.
  - rho = 1 − (6 × sum of d²) ÷ (N(N² − 1))
- **Lecture example**, maths against reading, 12 pupils: sum of d² = 61.
  - rho = 1 − 366 ÷ 1716 = **0.79**, a strong positive correlation.
- A small sum of d² means the two rankings agree.

### Chi-square

- **When**: only when subjects are allocated to **categories**, not given scores. Each subject is in exactly one cell.
- **Conditions**: the experimenter cannot decide in advance how many land in each category, it is a result. Usually more than 20 subjects, and at least 5 in each category before it can be trusted.
- **How**: compare observed with expected frequencies.
  - Expected for a cell = (row total × column total) ÷ grand total
  - χ² = sum of (O − E)² ÷ E
  - Degrees of freedom = (rows − 1) × (columns − 1)
- **Lecture example**, comprehension pattern by expert or novice:

  | | Bottom-up | Top-down | Mixed | Total |
  | --- | --- | --- | --- | --- |
  | Experts | 6 | 15 | 23 | 44 |
  | Novices | 10 | 8 | 24 | 42 |
  | Total | 16 | 23 | 47 | 86 |

  - Expected for experts, bottom-up: 16 × (44 ÷ 86) = 8.19, against 6 observed.
  - Full statistic: 3.11 with 2 degrees of freedom. The 5% critical value is 5.99, so this is **not significant**.

## 7. Reading a result

A complete answer has four parts:

1. **What the test tells you about the design**: number of conditions, same or different subjects, non-parametric data, trend or not.
2. **What the statistic means**, for a correlation: direction and strength.
3. **What P means**: the probability that a result this large is due to chance.
4. **The conclusion**: compare P with 0.05 and 0.01, say whether the hypothesis is supported, and add any caution (small sample, correlation is not causation, a significant difference does not say which condition).

Traps:

- A strong correlation with a high P is not significant: usually too few subjects.
- A weak correlation with a low P is significant but still weak: usually many subjects.
- Friedman and Kruskal-Wallis being significant does not tell you which conditions differ or in what order.
- "Not significant" means chance cannot be ruled out, not that there is no effect.

## 8. One-page recall sheet

Write this from memory until it comes out right twice.

- Parametric needs: interval, normal, equal variance. Checks: Shapiro-Wilk, Levene.
- Tree: 2 same = Wilcoxon; 2 different = Mann-Whitney; 3+ same = Friedman (trend Page's L); 3+ different = Kruskal-Wallis (trend Jonckheere); relationship = Spearman; categories = chi-square.
- Ranks: ties share the average; zero differences dropped in Wilcoxon.
- Small is significant: W, U. Large is significant: χr², L, H, S, χ².
- Two-tailed is harder: probability doubles.
- P = probability the result is due to chance. 0.05 = 1 in 20, 0.01 = 1 in 100.
- Chi-square: expected = row × column ÷ total; at least 5 per cell; more than 20 subjects; df = (r − 1)(c − 1).
- Jonckheere needs equal group sizes.
