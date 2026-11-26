# Essay sources: AI-driven esports coaching tools

Topic: "Real-Time or Post-Match? A Critical Review of Requirements Engineering for AI-Driven Esports Coaching Tools".

Researched 26 November 2026 with Crossref, OpenAlex, publisher pages and official policy pages. Every DOI below resolved on Crossref that day. The notes come from abstracts and metadata, not full reads: read each paper before citing it, and write every point in your own words. Full notes, with institutions and relevance, are in [research/](research/):

- [esports-literature.md](research/esports-literature.md): 29 sources on esports training and coaching, feedback timing, and fairness
- [requirements-literature.md](research/requirements-literature.md): 31 sources on requirements engineering for AI, explainability, app-review mining, and RE for games
- [tools-and-policies.md](research/tools-and-policies.md): 12 real tools by phase, publisher and tournament rules with quotes, and three pilot designs

Generating these notes used AI (Claude Code research agents). Record that in the AI declaration.

## The gap in one paragraph

AI coaching tools for esports split into live overlays and post-match analysis. Three bodies of work each see part of the problem. HCI and esports studies elicit what players and coaches want, but never write it down as requirements, and only one paper (Rijnders et al. 2022) says live tools "pose different requirements" from post-play ones. Motor-learning research says real-time feedback can raise performance while harming retained learning (the guidance hypothesis), but nobody has tested this in an esport. Requirements engineering for AI has mature journal reviews, but they cover safety-critical domains and treat timing only as system latency, not as when a person can take in advice. Meanwhile publishers already write the real-time versus post-match split into their rules (Riot: "go here now" is banned, learning "upon reflection … game over game" is allowed). No peer-reviewed paper applies requirements engineering to esports coaching or game-analytics tools.

## Core reading list (pick 15 to 20 for the essay)

At most 3 per institution or researcher. Watch two clusters: Kleinman, Lee and Yonsei appear on 5 candidate papers (use at most 3), and Ahmad, Grundy and the Deakin/Monash group on 3 (use 1).

### Theme 1: esports training and coaching practice

| Source | Type | Why |
| --- | --- | --- |
| **Białecki, Michalak & Gajewski 2024**, *Applied Sciences* 14(22) 10354, doi:10.3390/app142210354 | journal **review** (scoping) | **Start here.** The only review covering training software, analytics and feedback systems. Metrics everywhere, no theory of training |
| Reitman et al. 2020, *Games and Culture* 15(1) 32–50, doi:10.1177/1555412019840892 | journal review | map of esports research; tool work is a small slice |
| Pedraza-Ramirez et al. 2020, *Int. Review of Sport and Exercise Psychology* 13(1) 319–352, doi:10.1080/1750984X.2020.1723122 | journal review (PRISMA) | cognition and attention constructs a live tool competes with |
| Watson et al. 2022, *Sports Coaching Review* 14(2) 263–282, doi:10.1080/21640629.2022.2123960 | journal | 14 pro League of Legends coaches: practice runs on a review-plan-do cycle, i.e. post-match |
| Lee, Kleinman et al. 2025, CHI '25, doi:10.1145/3706598.3713141 | conference | 112 hours of observed coaching at an academy: the as-is process |
| Kleinman et al. 2026, CHI '26, doi:10.1145/3772318.3791065 | conference | 3-month deployment of a post-hoc tool at a pro academy; adoption problems are requirements problems (check the "negative reception" detail in the full text) |
| Nagorsky & Wiemeyer 2020, *PLOS ONE* 15(8) e0237584, doi:10.1371/journal.pone.0237584 | journal | 1,835 players: competence is game-specific, so requirements are too |

### Theme 2: what live and post-match tools are asked to do

| Source | Type | Why |
| --- | --- | --- |
| **Rijnders, Wallner & Bernhaupt 2022**, PACM HCI 6(CHI PLAY), doi:10.1145/3549506 | journal/conference | **The closest paper to the topic.** Live companions "pose different requirements which have been little explored"; survey of 175, evaluation with 13; no retention outcome |
| Jumisko-Pyykkö et al. 2025, OzCHI '25, pp. 469–482, doi:10.1145/3764687.3764702 | conference | coaches want both: reflection after, team monitoring during |
| Xenopoulos, Rulff & Silva 2022, PACM HCI 6(CHI PLAY), doi:10.1145/3549501 | journal/conference | "video-based game review is still the primary mode of game analysis" |
| Hodge et al. 2021, *IEEE Transactions on Games* 13(4) 368–379, doi:10.1109/TG.2019.2948469 | journal | live AI (win prediction) exists, but for spectators, not players |
| Wu, Lee & Steinkuehler 2021, CHI '21, doi:10.1145/3411764.3445143 | conference | tilt: in-game negative feedback is a risk, a tone requirement |

### Theme 3: when feedback should arrive (motor learning)

| Source | Type | Why |
| --- | --- | --- |
| **Salmoni, Schmidt & Walter 1984**, *Psychological Bulletin* 95(3) 355–386, doi:10.1037/0033-2909.95.3.355 | journal review | the guidance hypothesis: feedback during practice can create dependence; measure learning separately from performance |
| **Sigrist et al. 2013a**, *Psychonomic Bulletin & Review* 20(1) 21–53, doi:10.3758/s13423-012-0333-8 | journal review | design criteria for visual, audio and haptic feedback |
| Sigrist et al. 2013b, *Journal of Motor Behavior* 45(6) 455–472, doi:10.1080/00222895.2013.826169 | journal | complex task: terminal beat concurrent; concurrent helped only while switched on |
| Wulf & Shea 2002, *Psychonomic Bulletin & Review* 9(2) 185–211, doi:10.3758/BF03196276 | journal review | counterweight: complex skills may benefit from concurrent guidance, so the question is open |
| Walsh et al. 2009, *Academic Medicine* 84(10 Suppl.) S54–S57, doi:10.1097/ACM.0b013e3181b38daf | journal | simulator task closest to a game: terminal feedback transferred better |
| Park, Shea & Wright 2000, *Journal of Motor Behavior* 32(3) 287–296, doi:10.1080/00222890009601379 | journal | faded or intermittent concurrent feedback reduces dependence: a design pattern, not a binary choice |

### Theme 4: requirements engineering for AI

| Source | Type | Why |
| --- | --- | --- |
| **Habiba, Haug, Bogner & Wagner 2024**, *Requirements Engineering* 29(4) 567–600, doi:10.1007/s00766-024-00432-3 | journal **review** (mapping, 126 studies) | **The second anchor.** Top challenges: specification, explainability, gap between ML engineers and end users. Check the full text for any treatment of timing |
| Ahmad et al. 2023, *Information and Software Technology* 158 107176, doi:10.1016/j.infsof.2023.107176 | journal review (mapping, 43 studies) | evidence base skewed to autonomous vehicles; trust and explainability need research |
| Habibullah, Gay & Horkoff 2023, *Requirements Engineering* 28(2) 283–316, doi:10.1007/s00766-022-00395-3 | journal | non-functional requirements for ML; latency appears only as a system property |
| Chazette & Schneider 2020, *Requirements Engineering* 25(4) 493–514, doi:10.1007/s00766-020-00333-1 | journal | explainability as a requirement; assumes the user has attention to spare |
| Amershi et al. 2019, CHI '19, doi:10.1145/3290605.3300233 | conference (HCI) | guideline "time services based on context": the only widely cited source naming timing of AI output as a requirement |
| Martínez-Fernández et al. 2022, *ACM TOSEM* 31(2) 1–59, doi:10.1145/3487043 | journal review (248 studies) | optional: data requirements are the top SE4AI challenge (same Stuttgart group as Habiba) |

### Theme 5: fairness, integrity and platform rules

| Source | Type | Why |
| --- | --- | --- |
| **Riedl & Verschuuren 2025**, *International Sports Law Journal* 25(2) 99–118, doi:10.1007/s40318-025-00295-y | journal review (PRISMA, 57 sources) | integrity research covers match-fixing and hacks, not legitimate-looking AI help |
| Irwin & Naweed 2020, *Games and Culture* 15(4) 411–433, doi:10.1177/1555412018804952 | journal | the line of acceptable play is socially negotiated, so requirements need community input |
| Yan & Randell 2009, *IEEE Security & Privacy* 7(3) 37–44, doi:10.1109/MSP.2009.60 | journal (magazine) | cheating taxonomy to classify AI assistance |
| Riot Games policies (stance Feb 2025; League and VALORANT API policies Mar 2025; memory-access notice 29 Sep 2026), Overwolf compliance pages, Steam CS2 Trusted Mode FAQ, ESL/IEM rulebook | grey literature (primary sources) | the real-time split written as rules; quotes and URLs in [tools-and-policies.md](research/tools-and-policies.md). Counts as a source but not toward the 8 peer-reviewed |

### Method sources for the plan and pilot

| Source | Type | Why |
| --- | --- | --- |
| Breaux & Antón 2008, *IEEE Transactions on Software Engineering* 34(1) 5–20, doi:10.1109/TSE.2007.70746 | journal | the established method for extracting requirements from regulatory rules: the pilot's method |
| Dąbrowski et al. 2022, *Empirical Software Engineering* 27(2) 43, doi:10.1007/s10664-021-10065-7 | journal review | app-review mining, for the full study's user-feedback strand |
| Lin et al. 2019, *Empirical Software Engineering* 24(1) 170–207, doi:10.1007/s10664-018-9627-4 | journal | game reviews differ from app reviews |

## Key primary-source quotes (check each page before quoting; accessed 26 Nov 2026)

- Riot, "Riot's Stance" (10 Feb 2025): bans tools "Drawing conclusions for you during gameplay (ie we want to see you play the game first, then analyze and reflect later!)".
- Riot, VALORANT API policy (7 Mar 2025): bans real-time data "that would improve a player's performance immediately by altering player behavior (i.e. 'go here now'), vs altering it upon reflection, learning and coaching the player game over game".
- Riot, League API policy (11 Mar 2025): "Apps that dictate player decisions" are not approved; "Products should not remove game decisions, but may highlight decisions that are important".
- Riot, memory access notice (29 Sep 2026): from 6 Oct 2026 unknown tools are blocked; approved tools move to the official API by April 2027.
- Overwolf, Riot compliance: power-spike notifications, enemy cooldown tracking and ultimate timers are "strictly prohibited".
- ESL/IEM Rio 2022: offline, the coach may talk to players only "during tactical pauses and half times". Check the current ESL rulebook.

## Still to check by hand

- Full texts of Habiba 2024 and Ahmad 2023: confirm neither treats the timing of AI output as a requirement before claiming it.
- Kleinman 2026 full text (reception of the tool); Sabtan et al. 2022 (abstract not available).
- SCOPE.GG official site, Valve Game State Integration page, current ESL rulebook, whether Mobalytics' spell timer tracks enemy spells.
