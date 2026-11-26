# Essay plan: operating self-hosted low-code platforms

**Superseded on 26 November 2026:** the essay topic is now requirements engineering for AI-driven esports coaching tools (see [README.md](../README.md)). Kept as a starting point for the Masters Project literature review.

Ideas A + B from [SOURCES.md](SOURCES.md), expanded 25 November 2026. This is an outline to agree with the teammate, not essay text: write every section in your own words, and log any AI prompts for the AI declaration.

## The argument in one line

Low-code research treats the platform as something that already exists and studies the people building apps on it, while operations research studies generic containerised software. Self-hosted low-code platforms sit between the two and are studied by neither, even though teams such as Prof. Margaria's run one (Wave on Cinco Cloud) for many communities.

## Research questions

- **RQ1:** What deployment and operations problems do people self-hosting open-source low-code platforms report?
- **RQ2:** Which of those problems fit existing taxonomies (Gang of Eight for infrastructure as code; Haque et al. for Docker), and which are specific to low-code (for example, the platform running apps that users built, per-tenant workspaces, or upgrades that break saved models)?
- **RQ3 (from idea B):** How are these platforms packaged for self-hosting (Compose, Helm, single image, operator), and how does the packaging relate to the problems found in RQ1?

RQ1 and RQ2 are the core. RQ3 can shrink to a paragraph if the word count is tight.

## Literature, grouped by theme (synthesise across papers, not one per paragraph)

| Theme | What it establishes | Sources |
| --- | --- | --- |
| 1. What low-code is | definitions; low-code as a form of model-driven engineering; "low-code is often high-code" | Bock & Frank 2021; Di Ruscio et al. 2022; Sahay et al. 2020; Lethbridge 2021 |
| 2. Challenges from the users' side | developer and adopter problems; deployment appears only as the app builder's concern | **Ajimati et al. 2025 (journal SLR, start here)**; Alamin et al. 2021; Luo et al. 2021; Käss et al. 2023; Rafi et al. 2022 |
| 3. Building and hosting the platform | the few papers on platform architecture: multi-tenancy, multi-cloud, moving to the cloud | Costa et al. 2025; Ul Haq et al. 2024; Alfonso et al. 2024; Bainczyk et al. 2022; Brandon et al. 2025; Margaria et al. 2026 (max 3 from the Margaria group) |
| 4. What operations research already knows | defect and misconfiguration taxonomies, Helm and Compose practice, installation problems | Rahman et al. 2020 and 2023; Haque et al. 2020; Zerouali et al. 2023; Eng et al. 2024; Gao et al. 2025; Chen et al. 2021 |
| 5. Bridge: DevOps for model-driven engineering | MDE meets DevOps, but for the models, not for running the modelling platform | Combemale et al. 2023; Berardinelli et al. 2026 |

The gap comes out of themes 3 to 5: theme 2 shows deployment pain exists, theme 4 has the tools to classify it, and theme 3 shows that almost nobody has applied them to the platform itself.

## Preliminary research plan (5 paragraphs or fewer)

1. **Design:** a mixed-methods repository-mining study, the same approach as Alamin et al. and Haque et al.
2. **Data:** issues and discussions from 6 to 8 open-source low-code platforms (Budibase, Appsmith, ToolJet, NocoDB, Joget, n8n or Node-RED as a contrast), selected by stars and self-hosting docs; the packaging files for RQ3.
3. **Analysis:** coding against the Gang of Eight and Haque categories first, then new codes for problems that don't fit; two coders, with agreement measured by Cohen's kappa.
4. **Validation:** short interviews with platform operators, starting with the Wave/Cinco Cloud team. This needs ethics approval, so it belongs in the full study, not the pilot.
5. **Threats:** issue trackers over-represent failures; platforms label issues differently; it is unclear whether the findings carry over to closed platforms (Power Apps, OutSystems).

## Pilot (for the 5 pilot marks)

| | |
| --- | --- |
| Sample | 4 platforms × 50 closed issues = 200, matched by keywords and labels: `self-host`, `docker`, `helm`, `kubernetes`, `deploy`, `upgrade`, `migration` |
| Inclusion | about operating the platform, not about building an app on it |
| Coding | each teammate codes 100; both code the same 40 to compute kappa |
| Report | the coding scheme, category counts per platform, kappa, 3 to 4 example issues, and what to change for the full study |
| Effort | about 6 to 8 hours each; GitHub API or `gh issue list --search` for collection |
| Ethics | public data, no people contacted. **Confirm with Jim before starting** |

## Word budget (3,000 ±10%)

| Part | Words |
| --- | --- |
| Introduction and motivation | 300 |
| Literature review (themes 1–5) | 1,300 |
| Gap and research questions | 350 |
| Research plan | 450 |
| Pilot study | 450 |
| AI use declaration | 150 |

If Jim confirms 2,500 with a pilot, cut the literature review to about 1,000 and the research plan to about 350.

## Timeline to Fri 4 Dec, 12:00

| When | What |
| --- | --- |
| Thu 26 – Fri 27 Nov | agree the topic with the teammate; email Jim the two questions; split the reading by theme |
| Sat 28 – Sun 29 Nov | read; collect and code the pilot issues |
| Mon 30 Nov – Wed 2 Dec | write; each writes their themes, then join them up |
| Thu 3 Dec | check references, word count, filename and the LESSONS.md checklist |
| Fri 4 Dec, by 10:00 | submit (leave a margin before 12:00) |

## Check before writing

- Read each paper; the notes in SOURCES.md come only from abstracts.
- At least 10 references, 8 of them peer-reviewed; at most 3 from one institution or researcher (Rahman appears twice, the Margaria group three times).
- Ask the teammate if they want an LLM angle; if so, Hagel et al. 2024 can go in theme 1.
