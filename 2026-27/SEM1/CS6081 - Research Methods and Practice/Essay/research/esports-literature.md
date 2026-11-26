# Literature slice: AI/data-driven coaching tools for esports, and when feedback should arrive

Essay: "Real-Time or Post-Match? A Critical Review of Requirements Engineering for AI-Driven Esports Coaching Tools"

Compiled 2026-11-26. I checked every DOI below against `https://api.crossref.org/works/<doi>`, and each one resolved with a matching title. I took institutions and abstracts from Crossref/OpenAlex metadata (and PubMed for Sigrist et al. 2013a). Where an abstract wasn't available, the summary comes from the article's own record, and I've said so. I dropped anything I couldn't verify, including several arXiv preprints and vendor blogs.

Legend: **[REVIEW]** = review, survey or systematic/scoping review. Venue type: J = journal, C = conference proceedings (ACM PACM HCI counts as a journal but publishes CHI PLAY/CSCW papers), O = other.

---

## A. Review articles (where the essay starts)

### 1. Białecki, Michalak and Gajewski (2024) [REVIEW, scoping]
Białecki, A., Michalak, B. and Gajewski, J. (2024) 'Esports training, periodization, and software: a scoping review', *Applied Sciences*, 14(22), 10354. https://doi.org/10.3390/app142210354
- Venue: J (MDPI). Institutions: Warsaw University of Technology; Józef Piłsudski University of Physical Education in Warsaw.
- A scoping review across sport science (training, periodization, career stages) and software (training tools, **visualization, analytics and feedback systems**). It finds that research "has mainly focused on describing and modeling performance metrics" spread across fragmented areas, and that these "have not been assembled into a well-functioning theory of performance in esports".
- Relevance: this is the best **journal review to open the essay with**, because it is the only review that explicitly covers feedback and analytics software. It shows that tools exist without any training theory to say *when* they should be used.

### 2. Pedraza-Ramirez, Musculus, Raab and Laborde (2020) [REVIEW, systematic, PRISMA]
Pedraza-Ramirez, I., Musculus, L., Raab, M. and Laborde, S. (2020) 'Setting the scientific stage for esports psychology: a systematic review', *International Review of Sport and Exercise Psychology*, 13(1), pp. 319–352. https://doi.org/10.1080/1750984X.2020.1723122
- Venue: J. Institutions: German Sport University Cologne; London South Bank University; Université de Caen Normandie.
- A PRISMA review of empirical work (1994–2018) on the psychology of cognitive and game performance in esports. It finds that the field is "dense with positions and opinions but has few empirical investigations", and it argues for placing esports inside sport psychology.
- Relevance: it supplies the attention and cognition constructs (workload, decision-making) that a real-time tool would compete with. It also supports the "sport-science transfer" argument behind importing motor-learning feedback findings.

### 3. Reitman, Anderson-Coto, Wu, Lee and Steinkuehler (2020) [REVIEW, literature review]
Reitman, J.G., Anderson-Coto, M.J., Wu, M., Lee, J.S. and Steinkuehler, C. (2020) 'Esports research: a literature review', *Games and Culture*, 15(1), pp. 32–50. https://doi.org/10.1177/1555412019840892 (online first 2019)
- Venue: J. Institution: University of California, Irvine.
- Maps esports research from 2002 to March 2018 across seven disciplines (business, sports science, cognitive science, informatics, law, media studies, sociology) and identifies convergent questions.
- Relevance: the standard map of the field. Informatics and HCI work on player-facing tools is a small part of it, which supports a "requirements are under-studied" claim.

### 4. Mora-Cantallops and Sicilia (2018) [REVIEW, systematic literature review]
Mora-Cantallops, M. and Sicilia, M.-Á. (2018) 'MOBA games: a literature review', *Entertainment Computing*, 26, pp. 128–138. https://doi.org/10.1016/j.entcom.2018.02.005
- Venue: J. Institution: Universidad de Alcalá.
- A systematic review of MOBA research since 2011. League of Legends is the most-studied game, with player experience and toxic behaviour as the dominant topics, and the authors propose future research lines.
- Relevance: performance support and coaching barely appear in MOBA research before 2018, which sets a baseline for how recent the tool-requirements work is.

### 5. Kulkarni and Kuber (2026) [REVIEW, systematic]
Kulkarni, A.R. and Kuber, P.M. (2026) 'Sensor-driven machine learning for cognitive state and performance risk assessment in eSports: a systematic review', *Electronics*, 15(7), 1465. https://doi.org/10.3390/electronics15071465
- Venue: J (MDPI). Institutions: University of Florida; Rochester Institute of Technology.
- Reviews 30 studies that use physiological sensors (HRV, eye-tracking, EDA, EEG) and ML to predict workload, stress, fatigue, expertise and tilt. It notes that "performance evaluation still emphasizes **post-match statistics** without considering players' cognitive states". Samples were small and gender-imbalanced, and cross-validation was often missing.
- Relevance: the closest review to the real-time question. Real-time *sensing* of cognitive state is feasible (roughly 82–92% accuracy reported), but nobody has evaluated real-time *feedback* built on it. It is also evidence that the field defaults to post-match evaluation.

### 6. Riedl and Verschuuren (2025) [REVIEW, systematic, PRISMA]
Riedl, E. and Verschuuren, P. (2025) 'A systematic literature review of esports integrity', *The International Sports Law Journal*, 25(2), pp. 99–118. https://doi.org/10.1007/s40318-025-00295-y
- Venue: J. Institutions: University of Lausanne; Université Rennes 2.
- A PRISMA review of 57 sources on esports integrity (eSAFE framework). The literature is "laconic and fragmented". The authors call for research on game-specific integrity risks, regulation and policy enforcement.
- Relevance: the anchor for the fairness strand. It establishes that integrity research focuses on match-fixing, doping and cheating, and does not address legitimate-seeming AI assistance during play.

### 7. Sigrist, Rauter, Riener and Wolf (2013a) [REVIEW, motor learning]
Sigrist, R., Rauter, G., Riener, R. and Wolf, P. (2013) 'Augmented visual, auditory, haptic, and multimodal feedback in motor learning: a review', *Psychonomic Bulletin & Review*, 20(1), pp. 21–53. https://doi.org/10.3758/s13423-012-0333-8
- Venue: J. Institutions: ETH Zurich; University Hospital Balgrist, Zurich.
- Reviews augmented feedback (from human experts or technical displays) within motor-learning theory and sets out design criteria for visual, auditory, haptic and multimodal feedback. It notes that the right way to deliver feedback "has been controversial", and that most findings come from simple, artificial tasks.
- Relevance: **the established basis for concurrent versus terminal feedback.** It gives design criteria by modality that map directly onto overlay, audio and haptic design choices in an esports tool.

### 8. Salmoni, Schmidt and Walter (1984) [REVIEW, classic]
Salmoni, A.W., Schmidt, R.A. and Walter, C.B. (1984) 'Knowledge of results and motor learning: a review and critical reappraisal', *Psychological Bulletin*, 95(3), pp. 355–386. https://doi.org/10.1037/0033-2909.95.3.355
- Venue: J. Institution per OpenAlex: Laurentian University (other author affiliations not listed in the metadata).
- The origin of the **guidance hypothesis**. Feedback (knowledge of results) improves performance while it is present but can degrade learning if given too often, because learners come to depend on it. Performance during practice and learning (retention) must be measured separately.
- Relevance: the central theoretical risk for real-time AI coaching. A tool that raises in-match performance may not improve, and may even harm, retained skill. It also tells requirements engineers that a "did it help?" acceptance criterion must test retention without the tool.

### 9. Wulf and Shea (2002) [REVIEW]
Wulf, G. and Shea, C.H. (2002) 'Principles derived from the study of simple skills do not generalize to complex skill learning', *Psychonomic Bulletin & Review*, 9(2), pp. 185–211. https://doi.org/10.3758/BF03196276
- Venue: J. Institutions: University of Nevada, Las Vegas; Texas A&M University.
- Argues that findings from simple lab tasks (including those on feedback frequency) do not straightforwardly carry over to complex skills, where more guidance and concurrent feedback can be beneficial.
- Relevance: an important counterweight. Esports skills are complex, so "terminal is always better" cannot simply be imported, and the essay should present the timing question as open.

### 10. Hughes and Bartlett (2002) [REVIEW, sports performance analysis]
Hughes, M.D. and Bartlett, R.M. (2002) 'The use of performance indicators in performance analysis', *Journal of Sports Sciences*, 20(10), pp. 739–754. https://doi.org/10.1080/026404102320675602
- Venue: J. Institution per OpenAlex: Cardiff Metropolitan University.
- Classifies games (net/wall, invasion, striking/fielding) and performance indicators (match, tactical, technical, biomechanical). It argues that indicators are only interpretable through comparison and normalisation.
- Relevance: the traditional-sport basis for post-match performance analysis. It gives a vocabulary for which indicators an esports tool should compute, and it suggests that meaningful indicators need context that is often unavailable mid-match.

---

## B. Empirical work on what players and coaches need

### 11. Rijnders, Wallner and Bernhaupt (2022)
Rijnders, F., Wallner, G. and Bernhaupt, R. (2022) 'Live feedback for training through real-time data visualizations: a study with League of Legends', *Proceedings of the ACM on Human-Computer Interaction*, 6(CHI PLAY), pp. 1–23. https://doi.org/10.1145/3549506 *(Crossref doesn't list an article number. Take it from the ACM DL if your Harvard style needs one.)*
- Venue: J/C (PACM HCI, CHI PLAY track). Institutions: Eindhoven University of Technology; Johannes Kepler University Linz.
- Notes that feedback "is presented visually post-play but live companions that provide real-time analytics are gaining more and more attention", and that such systems "pose different requirements which have been little explored". The study designed physical and digital live visualisations from a community survey (N=175) and expert input, then ran a qualitative evaluation with 13 players. The resulting design considerations cover **information density, contextualisation, representation and diverse user needs**.
- Relevance: **the most directly on-topic paper.** It is explicitly a requirements study of *real-time* feedback, and it contrasts that with post-play. Its sample is small and its evaluation is short-term, with no learning or retention outcome.

### 12. Kleinman, Kim, Kim, Lee, Kim, Kang, Park, Harteveld and Lee (2026)
Kleinman, E., Kim, S., Kim, S., Lee, H., Kim, J., Kang, D., Park, S., Harteveld, C. and Lee, B. (2026) '"Do I really need this?": illuminating challenges in integrating computational training tools in esports coaching', in *Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems (CHI '26)*. New York: ACM, pp. 1–18. https://doi.org/10.1145/3772318.3791065
- Venue: C. Institutions: Northeastern University; Yonsei University; T1 Lab (Seoul).
- Built a bespoke post-hoc training tool for League of Legends (MySkills), deployed it at a professional academy for three months, and ran two rounds of stakeholder interviews. The paper reports research tools are "rarely used outside of a lab" and documents integration challenges framed as translational HCI. Search-engine summaries of the paper describe largely negative perceptions and coaches as less receptive than players; I did not check this against the full text.
- Relevance: real-world adoption evidence. Requirements failures (fit with the coaching workflow, trust, interpretability) matter more than algorithm quality. It is the strongest support for a stakeholder-centred RE argument.

### 13. Lee, Kleinman, Kim, Park, Harteveld and Lee (2025)
Lee, H., Kleinman, E., Kim, N., Park, S., Harteveld, C. and Lee, B. (2025) 'Crafting champions: an observation study of esports coaching processes', in *Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems (CHI '25)*. New York: ACM, pp. 1–20. https://doi.org/10.1145/3706598.3713141
- Venue: C. Institutions: Yonsei University; Northeastern University.
- An observation study of 112 hours of coaching-session dialogue and footage at an elite LoL academy. It identifies the activities and events in the coaching process and how HCI could support them.
- Relevance: the most granular account of *current practice*, which is the as-is process model an RE study needs. Coaching here happens around play (sessions, reviews) rather than during competitive play.

### 14. Watson, Smith, Fenton, Pedraza-Ramirez, Laborde and Cronin (2022)
Watson, M., Smith, D., Fenton, J., Pedraza-Ramirez, I., Laborde, S. and Cronin, C. (2022) 'Introducing esports coaching to sport coaching (not as sport coaching)', *Sports Coaching Review*, 14(2), pp. 263–282. https://doi.org/10.1080/21640629.2022.2123960 (online 2022; issue dated 2025 in Crossref)
- Venue: J. Institutions: German Sport University Cologne; University of Warwick; Liverpool John Moores University.
- Interviews with 14 professional LoL head coaches. Coaches practise through a **"review-plan-do cycle"** under pressure to win, in a "complex, technological and global environment", with uncodified career pathways.
- Relevance: direct evidence that professional coaching is organised around *post-match review*. A real-time tool would have to fit into, or change, that cycle.

### 15. Sabtan, Cao and Paul (2022)
Sabtan, B., Cao, S. and Paul, N. (2022) 'Current practice and challenges in coaching esports players: an interview study with League of Legends professional team coaches', *Entertainment Computing*, 42, 100481. https://doi.org/10.1016/j.entcom.2022.100481
- Venue: J. Institution: University of Waterloo (Systems Design Engineering).
- An interview study with professional LoL coaches. The abstract wasn't available through the APIs, and ScienceDirect blocked access. Per the University of Waterloo's release about the paper, the authors found little standardisation in coaching methods and practices without a scientific evidence base, and argued that cognitive psychology and human factors should inform esports coaching.
- Relevance: an early human-factors account of coaches' needs, with an explicit call for evidence-based tools. Read the full text before quoting specifics.

### 16. Lee, Lee, Nallapati, Uh and Lee (2024)
Lee, H., Lee, S., Nallapati, R., Uh, Y. and Lee, B. (2024) 'Characterizing and quantifying expert input behavior in League of Legends', in *Proceedings of the 2024 CHI Conference on Human Factors in Computing Systems (CHI '24)*. New York: ACM, pp. 1–21. https://doi.org/10.1145/3613904.3642588
- Venue: C. Institutions: Yonsei University; Samsung Electronics; UC San Diego.
- Interviews with five top professionals plus input logs from 4,835 home matches (193 players). Higher-ranked players execute eight input skills with higher quality. In a three-week follow-up, a training aid that **visualises input-skill levels after play** gave players "actionable lessons".
- Relevance: a worked example of an *offline* AI/analytics feedback loop with a (short) longitudinal evaluation. It shows that post-hoc feedback on low-level skills can change behaviour.

### 17. Kleinman, Gayle and Seif El-Nasr (2021)
Kleinman, E., Gayle, C. and Seif El-Nasr, M. (2021) '"Because I'm bad at the game!" A microanalytic study of self regulated learning in League of Legends', *Frontiers in Psychology*, 12, 780234. https://doi.org/10.3389/fpsyg.2021.780234
- Venue: J. Institution: University of California, Santa Cruz.
- Replicates Kitsantas and Zimmerman's volleyball self-regulated learning (SRL) study in LoL. Expert, non-expert and novice players differ significantly in **forethought-phase** processes, and the authors point to computational support for SRL.
- Relevance: SRL's forethought, performance and self-reflection phases give a theoretical frame for *when* support belongs. Reflection is post-match, which argues for tools that scaffold forethought and reflection rather than in-play control.

### 18. Kleinman, Ahmad, Teng, Bryant, Nguyen, Harteveld and Seif El-Nasr (2020)
Kleinman, E., Ahmad, S.U., Teng, Z., Bryant, A., Nguyen, T.-H.D., Harteveld, C. and Seif El-Nasr, M. (2020) '"And then they died": using action sequences for data driven, context aware gameplay analysis', in *Proceedings of the 15th International Conference on the Foundations of Digital Games (FDG '20)*. New York: ACM, pp. 1–12. https://doi.org/10.1145/3402942.3402962
- Venue: C. Institutions: Northeastern University; Google.
- A human-in-the-loop mixed-methods method (interactive behaviour analytics plus sequence analysis) that keeps the *context* of actions lost in aggregate ML, demonstrated on Dota 2 teamwork.
- Relevance: context-aware analysis is retrospective by nature and analyst-driven, which is evidence that interpretable insight currently depends on post-match human review.

### 19. Xenopoulos, Rulff and Silva (2022)
Xenopoulos, P., Rulff, J. and Silva, C.T. (2022) 'ggViz: accelerating large-scale esports game analysis', *Proceedings of the ACM on Human-Computer Interaction*, 6(CHI PLAY), pp. 1–22. https://doi.org/10.1145/3549501
- Venue: J/C (PACM HCI, CHI PLAY). Institution: New York University.
- Notes that "video-based game review is still the primary mode of game analysis". It builds a sketch-based visual analytics system for CS:GO tracking data, motivated by expert interviews and evaluated with professional coaches, managers and analysts.
- Relevance: requirements elicited from coaches and analysts centre on *game review*, the post-match workflow. A good contrast with Rijnders et al.'s player-facing live tools.

### 20. Jumisko-Pyykkö, Toivonen, Salomaa, Leppä, Kerkola and Rintala (2025)
Jumisko-Pyykkö, S., Toivonen, E., Salomaa, H., Leppä, P., Kerkola, H. and Rintala, H. (2025) 'Systems intelligence design opportunities for esports teams', in *Proceedings of the 37th Australian Conference on Human-Computer Interaction (OzCHI '25)*. New York: ACM, pp. 469–482. https://doi.org/10.1145/3764687.3764702
- Venue: C. Institutions: Häme University of Applied Sciences; University of Jyväskylä; JAMK University of Applied Sciences.
- Three rounds of interviews with 12 semi-pro and pro players and 6 pro coaches. The design opportunities it identifies include **reflection** ("feedback tools to enhance understanding and growth") *and* **effective responsiveness** ("support real-time team monitoring and adjustment").
- Relevance: one of the few elicitation studies whose stakeholders ask for *both* timings, split by purpose: learning post-match, adjustment live. That split is useful for the essay's framing.

### 21. Nagorsky and Wiemeyer (2020)
Nagorsky, E. and Wiemeyer, J. (2020) 'The structure of performance and training in esports', *PLOS ONE*, 15(8), e0237584. https://doi.org/10.1371/journal.pone.0237584
- Venue: J. Institution: Technische Universität Darmstadt.
- Builds an esports performance model and surveys 1,835 players across five games. Training averaged about 39% of playing time, and competence and training structures are game-specific.
- Relevance: requirements are game-specific. A generic "AI coach" faces different competence profiles (for example StarCraft II against FIFA), so timing needs probably differ by genre.

### 22. Hodge, Devlin, Sephton, Block, Cowling and Drachen (2021)
Hodge, V.J., Devlin, S., Sephton, N., Block, F., Cowling, P.I. and Drachen, A. (2021) 'Win prediction in multiplayer esports: live professional match prediction', *IEEE Transactions on Games*, 13(4), pp. 368–379. https://doi.org/10.1109/TG.2019.2948469
- Venue: J. Institution: University of York.
- The first comprehensive study of *live* win prediction in professional Dota 2, up to 85% accurate after 5 minutes, trialled at a major tournament. It targets **audiences** and commercial use rather than players.
- Relevance: shows that real-time esports AI exists technically, but it has been built for spectators. The step from real-time prediction to real-time player advice is absent from the literature, and it raises fairness questions.

### 23. Kou and Gui (2020)
Kou, Y. and Gui, X. (2020) 'Emotion regulation in eSports gaming: a qualitative study of League of Legends', *Proceedings of the ACM on Human-Computer Interaction*, 4(CSCW2), pp. 1–25. https://doi.org/10.1145/3415229
- Venue: J/C (PACM HCI, CSCW). Institution: Pennsylvania State University.
- Identifies four emotive factors and the emotion-regulation strategies players use for themselves, teammates and opponents, and derives implications for emotion-regulation technologies.
- Relevance: in-match affect is already a heavy load. Any real-time intervention adds to it, and the paper supplies requirements for affect-aware timing.

### 24. Wu, Lee and Steinkuehler (2021)
Wu, M., Lee, J.S. and Steinkuehler, C. (2021) 'Understanding tilt in esports: a study on young League of Legends players', in *Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems (CHI '21)*. New York: ACM, pp. 1–9. https://doi.org/10.1145/3411764.3445143
- Venue: C. Institution: University of California, Irvine.
- A survey of 95 high-school league players. Tilt is triggered mostly by teammates, and believing tilt is malleable predicts more positive responses.
- Relevance: in-game negative feedback, including from an AI, could become a tilt trigger. This is a non-functional requirement (tone and framing) for real-time feedback.

---

## C. Feedback timing: concurrent (real-time) versus terminal (post-trial/post-match)

(See also reviews 7, 8 and 9 above.)

### 25. Sigrist, Rauter, Riener and Wolf (2013b)
Sigrist, R., Rauter, G., Riener, R. and Wolf, P. (2013) 'Terminal feedback outperforms concurrent visual, auditory, and haptic feedback in learning a complex rowing-type task', *Journal of Motor Behavior*, 45(6), pp. 455–472. https://doi.org/10.1080/00222895.2013.826169
- Venue: J. Institutions: ETH Zurich; University Hospital Balgrist.
- In a *complex* 3D task, self-controlled **terminal** visual feedback was most effective because it "emphasized the internalization of task-relevant aspects", while **concurrent** feedback "fostered the correction of task-irrelevant errors, which hindered learning". Concurrent groups performed well with feedback but worse without it. The authors suggest that concurrent plus terminal feedback, adapted to the individual, may be best.
- Relevance: **the key empirical anchor.** Even for complex skills, real-time feedback can boost in-session performance while harming learning. Note the tension with Wulf and Shea (2002).

### 26. Walsh, Ling, Wang and Carnahan (2009)
Walsh, C.M., Ling, S.C., Wang, C.S. and Carnahan, H. (2009) 'Concurrent versus terminal feedback: it may be better to wait', *Academic Medicine*, 84(10 Suppl.), pp. S54–S57. https://doi.org/10.1097/ACM.0b013e3181b38daf
- Venue: J. Institution: The Wilson Centre (University Health Network / University of Toronto).
- Thirty novice endoscopists on a simulator. Groups were equal at post-test and retention, but on **transfer** the terminal-feedback group performed significantly better, and the concurrent group's performance dropped.
- Relevance: a simulation-based, cognitively demanding task that is closer to a video game than rowing. It suggests that real-time coaching may hurt transfer to new situations (new patches, new opponents).

### 27. Park, Shea and Wright (2000)
Park, J.-H., Shea, C.H. and Wright, D.L. (2000) 'Reduced-frequency concurrent and terminal feedback: a test of the guidance hypothesis', *Journal of Motor Behavior*, 32(3), pp. 287–296. https://doi.org/10.1080/00222890009601379
- Venue: J. Institution: Texas A&M University.
- Concurrent feedback produced strong guidance effects and dependence, with very poor retention once it was withdrawn. **Reducing its frequency** cut dependence, and alternating concurrent+terminal trials with no-feedback trials improved learning.
- Relevance: gives a design pattern rather than a binary choice (faded or intermittent real-time feedback). This can be turned into concrete, testable requirements such as adaptive frequency and "training mode off" retention checks.

---

## D. Fairness and integrity: real-time assistance as cheating

(See also review 6, Riedl and Verschuuren 2025.)

### 28. Yan and Randell (2009)
Yan, J. and Randell, B. (2009) 'An investigation of cheating in online games', *IEEE Security & Privacy*, 7(3), pp. 37–44. https://doi.org/10.1109/MSP.2009.60
- Venue: J (magazine). Institution: Newcastle University.
- Summarises known cheating methods and defines a taxonomy of online-game cheating. It builds on the authors' earlier "systematic classification of cheating in online games" (NetGames 2005, https://doi.org/10.1145/1103599.1103606, also verified).
- Relevance: gives the essay a principled way to classify AI assistance. Information-exposure and decision-assistance categories map onto "AI coach overlays".

### 29. Irwin and Naweed (2020)
Irwin, S.V. and Naweed, A. (2020) 'BM'ing, throwing, bug exploiting, and other forms of (un)sportsmanlike behavior in CS:GO esports', *Games and Culture*, 15(4), pp. 411–433. https://doi.org/10.1177/1555412018804952 (online first 2018)
- Venue: J. Institution: Central Queensland University.
- Uses boundary-work theory on 50 hours of observation plus spectator interviews to show that the line of acceptability around unsportsmanlike behaviours is "protean" and contested, beyond formal anti-hacking rules.
- Relevance: whether real-time AI advice counts as fair play is a *socially negotiated* boundary, not just a technical one. Requirements therefore need stakeholder (community and organiser) input, not just policy compliance.

### 30. Grey literature: publisher policy (not peer-reviewed; cite as a primary source)
Riot Games (2025) *Policies — Riot Developer Portal*. Last updated 29 May 2025. Available at: https://developer.riotgames.com/policies/general (accessed 26 November 2026).
- The policy says: "Products cannot create an unfair advantage for players, like a cheating program" and "Products should not remove game decisions, but may highlight decisions that are important". It has no explicit clause on live overlays. Game-specific pages I tried returned 404.
- Relevance: the actual governing constraint for third-party LoL/VALORANT tools. It draws the line at *removing decisions* and *unfair advantage* rather than at timing. That ambiguity is a requirements problem worth highlighting.

### Excluded or partially verified
- Johnson, M.R. and Abarbanel, B. (2020) 'Esports viewer perspectives on cheating in competition', DiGRA 2020, https://doi.org/10.26503/dl.v2020i1.1182. The DOI resolves (University of Sydney; UNLV), but I couldn't get the abstract, so it isn't summarised. Worth reading.
- Arxiv-only preprints found but not peer-reviewed: Lee and Savage on gig-platform game coaching (2026); the "Esports Performance Screening (EPS) framework" (2026); the ESPORT dataset (2023). All excluded.
- Book chapters (e.g., Watson and Bubna, 'Esports coaching and support', in *The Science of Esports*, Routledge 2023; Yalçıner, 'Cognitive load and attention in esports', Springer 2026) exist in Crossref but aren't journal reviews. Optional.
- Vendor material (Razer Game Co-AI, Omnic.AI, Mobalytics-style "AI coaches") is not citable as evidence, though it could illustrate the market.

---

## Gaps (what nobody has studied)

1. **No esports study compares real-time and post-match feedback head-to-head on learning.** The concurrent-versus-terminal evidence (Salmoni et al. 1984; Park et al. 2000; Walsh et al. 2009; Sigrist et al. 2013b) comes from rowing, force-tracking and endoscopy simulators. Rijnders et al. (2022) evaluated live feedback qualitatively and short-term. Lee et al. (2024) evaluated post-hoc feedback over three weeks. Nobody has run a retention or transfer test of a live AI coach in an esport.
2. **Performance is conflated with learning.** Esports tool evaluations measure usability or in-session improvement, not retention without the tool. The guidance hypothesis predicts these will diverge, and no esports paper tests that.
3. **Requirements engineering as such is missing.** The papers elicit needs (surveys, interviews, observation), but none produces a structured requirements specification, prioritisation or traceability, or separates functional from non-functional requirements (latency, cognitive load, trust, explainability, fairness). Kleinman et al. (2026) shows that the *adoption* failures are requirements failures.
4. **Stakeholders are under-represented.** Most samples are League of Legends academies or pros (Watson et al. 2022; Sabtan et al. 2022; Lee et al. 2025; Kleinman et al. 2026). Casual and ranked players (the market for commercial AI coaches), tournament organisers, publishers and opponents (fairness) are barely studied. Genre coverage is narrow (MOBA and CS), despite Nagorsky and Wiemeyer showing that competence profiles are game-specific.
5. **Cognitive load of real-time feedback in esports has not been measured.** Sensor work can *detect* workload and tilt (Kulkarni and Kuber 2026 review), but no study measures the added load or distraction of an AI overlay during competitive play. Its interaction with tilt and emotion regulation (Wu et al. 2021; Kou and Gui 2020) is also unexplored.
6. **Fairness of legitimate AI assistance is unexamined.** Integrity research (Riedl and Verschuuren 2025) covers match-fixing, doping and hacks. Nobody has studied empirically where players, organisers and publishers draw the line for AI advice that uses only legally accessible information. Riot's policy ("should not remove game decisions") leaves timing undefined.
7. **The real-time AI that exists faces audiences, not players.** Live win prediction (Hodge et al. 2021) was built for spectators and broadcasters. How predictive models would translate into player-facing advice, and whether that would count as an unfair advantage, hasn't been studied.
8. **There are no longitudinal, in-the-wild evaluations beyond one academy deployment** (Kleinman et al. 2026, three months, post-hoc tool). Nothing comparable exists for a real-time tool.
9. **Team-level timing is unstudied.** Jumisko-Pyykkö et al. (2025) find coaches want both post-match reflection and real-time team monitoring. Nobody has investigated how real-time feedback should be shared across five players without fragmenting team communication.
