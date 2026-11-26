# Essay plan: real-time or post-match AI coaching in esports

Outline to agree with the teammate, 26 November 2026. This is not essay text: write every section in your own words, and log AI prompts for the AI declaration. Sources are in [SOURCES.md](SOURCES.md).

## How the plan meets Jim's brief

| Brief | How |
| --- | --- |
| At least 10 references, 8 peer-reviewed, at most 3 per institution or researcher | 15 to 20 peer-reviewed sources across five themes; publisher policies are extra grey literature; watch the Kleinman/Yonsei and Ahmad/Deakin clusters |
| Start from a journal review article | Białecki et al. 2024 (esports training and software) and Habiba et al. 2024 (requirements engineering for AI) as twin anchors; the gap sits between them |
| Summarise as a cohesive whole | five themes, each synthesising several papers; no paper-by-paper paragraphs |
| Find a gap, flaw or link between themes | the link between themes 2, 3 and 4: nobody connects feedback timing to requirements for AI coaching tools |
| Research plan, 5 paragraphs or fewer | below |
| Pilot study (top grade) | policy-to-feature tracing, public documents only |
| AI declaration | research agents found and checked sources; prompts logged |

## The argument

1. Esports coaching tools now use AI, and they deliver advice at two moments: during play (overlays) and after it (reports, replay review).
2. Esports research shows professional coaching is built around post-match review (Watson 2022; Lee 2025), and that tools fail to be adopted for reasons that are requirements problems (Kleinman 2026). Only Rijnders 2022 treats live tools as having different requirements.
3. Motor-learning research gives a reason the timing matters: feedback during practice can raise performance but create dependence and harm retention (Salmoni 1984; Sigrist 2013b; Walsh 2009), though complex skills may be an exception (Wulf & Shea 2002) and faded feedback may avoid the problem (Park 2000).
4. Requirements engineering for AI has mature reviews (Habiba 2024; Ahmad 2023), but they draw on safety-critical domains and treat timing as latency. Explainability work assumes spare attention (Chazette & Schneider 2020). Only HCI guidance names timing (Amershi 2019).
5. Meanwhile publishers already decide the question by rule: Riot bans "go here now" and allows learning "upon reflection … game over game"; tournaments restrict even human coaches to pauses (theme 5).
6. **Gap:** the requirements that separate real-time from post-match AI coaching are set by platform rules and vendor features, not by evidence on learning, and requirements engineering has not studied them.

## Research questions

- **RQ1:** Which coaching functions do platform rules and current tools place in real time, and which after the match, and on what grounds (information, decision, timing)?
- **RQ2:** What functional and non-functional requirements (learning retention, cognitive load, explainability, fairness) should decide whether an AI coaching function runs live or post-match?
- **RQ3 (full study only):** Does real-time AI feedback improve retained skill in an esport, or only in-session performance?

RQ1 is what the pilot answers. RQ2 and RQ3 need people, so they belong in the full study.

## Literature, by theme

| Theme | Claim to make | Core sources |
| --- | --- | --- |
| 1. Esports training and coaching | coaching is review-based; the field has metrics but no training theory | Białecki 2024; Reitman 2020; Pedraza-Ramirez 2020; Watson 2022; Lee 2025; Kleinman 2026; Nagorsky 2020 |
| 2. Live and post-match tools | stakeholders want both, for different purposes; live AI exists only for spectators | Rijnders 2022; Jumisko-Pyykkö 2025; Xenopoulos 2022; Hodge 2021; Wu 2021 |
| 3. Feedback timing | performance during feedback is not learning; timing is an open question for complex skills | Salmoni 1984; Sigrist 2013a and b; Wulf & Shea 2002; Walsh 2009; Park 2000 |
| 4. Requirements engineering for AI | mature, but timing is missing and leisure domains are absent | Habiba 2024; Ahmad 2023; Habibullah 2023; Chazette & Schneider 2020; Amershi 2019 |
| 5. Fairness and platform rules | the split is already imposed by rules; fairness is negotiated, not technical | Riedl & Verschuuren 2025; Irwin & Naweed 2020; Yan & Randell 2009; Riot, Overwolf, Valve, ESL policies |

## Preliminary research plan (5 paragraphs)

1. **Design:** a multi-phase mixed-methods study. Phase 1 analyses documents (rules and tools), phase 2 elicits requirements from people, phase 3 tests the key timing question by experiment.
2. **Phase 1, rules and tools:** extract every normative statement from publisher, platform and tournament rules using Breaux & Antón's (2008) method for regulatory requirements, then trace each one to the advertised features of 12 to 20 tools across three genres (MOBA, tactical shooter, other). This scales up the pilot.
3. **Phase 2, stakeholders:** survey ranked players and interview coaches and tournament organisers about which functions they would accept live, which post-match, and why. Mine Steam and store reviews as a secondary source (Dąbrowski 2022; Lin 2019). Needs ethics approval.
4. **Phase 3, timing experiment:** players practise one skill in an aim trainer or custom game with real-time, post-match or faded feedback, then a retention test without the tool a few days later. This directly tests the guidance hypothesis in an esport. Needs ethics approval.
5. **Threats:** advertised features differ from what tools actually do; policies change fast (Riot's memory-access change is two months old); most evidence is League of Legends; lab tasks may not transfer to full matches.

## Pilot (for the 5 pilot marks)

| | |
| --- | --- |
| Question | RQ1: where do rules and tools draw the line between live and post-match? |
| Data | about 10 policy documents (Riot stance, League and VALORANT API policies, memory-access notice, Overwolf general and Riot pages, Steam Trusted Mode, FACEIT, ESL/IEM, Blizzard) and the feature pages of 12 tools (Mobalytics, Blitz, Porofessor, U.GG, iTero, MetaBot, Omnic.AI, Insights.gg, Leetify, Aimlabs, KovaaK's, SCOPE.GG) |
| Step 1 | extract each normative statement as a requirement (about 60 to 100); code it by boundary (information, decision, timing, technical) and phase |
| Step 2 | list each advertised feature (about 100 to 180 rows); code phase (pre, live, post, training), kind (display, recommendation, decision prompt, review, training), data source, and whether it claims AI |
| Step 3 | trace features to rules: permitted, forbidden, or unclear |
| Agreement | both code all rows independently; report Cohen's kappa, then reconcile |
| Report | counts by phase and boundary, kappa, 2 to 3 cases (Blitz's teammate-only ultimate timers; the Mobalytics listing advertising power-spike alerts that Overwolf prohibits; CS2 tools being post-match only because of Trusted Mode), and what to change for the full study |
| Effort | about 8 hours each (4 on rules, 4 on features); manual collection, save a dated PDF of every page |
| Ethics | public documents, no people. Overwolf forbids scraping, so read its pages by hand |

## Word budget (3,500 ±10%, so 3,150 to 3,850)

Decided 26 Nov: assume 3,500 with the pilot (the spec's "2,500 with a pilot" note reads like a typo for 3,500).

| Part | Words |
| --- | --- |
| Introduction and motivation | 300 |
| Literature review (themes 1–5) | 1,500 |
| Gap and research questions | 400 |
| Research plan | 500 |
| Pilot study | 600 |
| AI use declaration | 200 |

## Suggested split with the teammate

| Person | Themes | Pilot |
| --- | --- | --- |
| A | 1 and 2 (esports) | feature list for the 12 tools |
| B | 3, 4 and 5 (timing, requirements, rules) | rule extraction from the policies |
| Both | gap, research questions, plan | code everything twice for kappa, then the trace |

## Timeline to Fri 4 Dec, 12:00

| When | What |
| --- | --- |
| Thu 26 – Fri 27 Nov | agree the split with Dhruv; start reading |
| Sat 28 – Sun 29 Nov | read the core papers; collect and save the policy and feature pages; code |
| Mon 30 Nov | reconcile codes, compute kappa, trace |
| Mon 30 Nov – Wed 2 Dec | write own themes, then join |
| Thu 3 Dec | references, word count, filename, LESSONS.md checklist |
| Fri 4 Dec, by 10:00 | submit |

## Check before writing

- Read the full texts of the anchor reviews; the gap claim about timing rests on abstracts so far.
- Re-open every policy page on the day you quote it; these change.
- The AI declaration must say that AI agents searched for and checked sources, and list the prompts.
