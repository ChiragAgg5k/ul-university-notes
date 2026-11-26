# Requirements engineering slice: sources for "Real-Time or Post-Match?"

Every DOI below was resolved against `https://api.crossref.org/works/<doi>` on 2026-11-26, and titles, venues, volumes and pages come from that metadata. Abstract summaries come from the Crossref or arXiv abstract, or the publisher page, where one was available. Where neither was available (marked *[abstract not checked]*), the summary relies on the paper's known contribution and stays general. Check those before quoting specific numbers. Affiliations come from Crossref where it lists them. Otherwise they are the institution at the time of publication, as I know it (marked *[affil. not in Crossref]*).

**[R]** = review article (SLR, systematic mapping study or survey).

## 1. Anchor reviews: RE for AI/ML (RE4AI)

1. **[R]** Habiba, U., Haug, M., Bogner, J. and Wagner, S. (2024) 'How mature is requirements engineering for AI-based systems? A systematic mapping study on practices, challenges, and future research directions', *Requirements Engineering*, 29(4), pp. 567–600. doi:10.1007/s00766-024-00432-3.
   - Journal. University of Stuttgart; Bogner also at Vrije Universiteit Amsterdam *[affil. not in Crossref]*.
   - A mapping study of 126 primary studies, covering work up to July 2023. RE4AI research concentrates on elicitation and analysis. The most common challenges are requirements specification, explainability, and "the gap between machine learning engineers and end-users". The authors propose seven research directions.
   - Use for coaching tools: this is the most current anchor review. The engineer-to-end-user gap is exactly the gap between a model's output and what a player or coach needs to hear. Its categories give no place to when output is delivered, real time or after the match. That absence is the essay's gap.

2. **[R]** Ahmad, K., Abdelrazek, M., Arora, C., Bano, M. and Grundy, J. (2023) 'Requirements engineering for artificial intelligence systems: A systematic mapping study', *Information and Software Technology*, 158, 107176. doi:10.1016/j.infsof.2023.107176.
   - Journal. Deakin University and Monash University *[affil. not in Crossref]*.
   - A mapping study of 43 primary studies (arXiv 2212.10693). Most empirical RE4AI work focuses on autonomous vehicles and on managing data requirements. Ethics, trust and explainability "need further research".
   - Use: shows the RE4AI evidence base comes from safety-critical domains. Consumer and leisure systems such as game coaching are absent, so trust and explainability requirements for them lack an empirical base.

3. **[R]** Villamizar, H., Escovedo, T. and Kalinowski, M. (2021) 'Requirements engineering for machine learning: A systematic mapping study', in *2021 47th Euromicro Conference on Software Engineering and Advanced Applications (SEAA)*. IEEE, pp. 29–36. doi:10.1109/SEAA53835.2021.00013.
   - Conference. Pontifical Catholic University of Rio de Janeiro (PUC-Rio) *[affil. not in Crossref]*.
   - An early mapping study of RE for ML that classifies studies by RE activity and by the ML-specific concerns they address. *[abstract not checked]*
   - Use: a baseline that the 2023–24 reviews update. It helps show how the field has grown.

4. **[R]** Martínez-Fernández, S., Bogner, J., Franch, X., Oriol, M., Siebert, J., Trendowicz, A., Vollmer, A.M. and Wagner, S. (2022) 'Software engineering for AI-based systems: A survey', *ACM Transactions on Software Engineering and Methodology*, 31(2), pp. 1–59. doi:10.1145/3487043.
   - Journal. Universitat Politècnica de Catalunya; University of Stuttgart; Fraunhofer IESE.
   - A mapping study of 248 studies (2010 to March 2020). The most studied properties are dependability and safety. Data-related issues are the most frequent challenge. Testing and quality dominate, while other areas are neglected.
   - Use: sets RE inside wider SE4AI. Data issues being the top challenge supports a data-requirements discussion: replay and telemetry access, and labelled match data.

5. **[R]** Pei, Z., Liu, L., Wang, C. and Wang, J. (2022) 'Requirements engineering for machine learning: A review and reflection', in *2022 IEEE 30th International Requirements Engineering Conference Workshops (REW)*. IEEE, pp. 166–175. doi:10.1109/REW56159.2022.00039.
   - Workshop (conference). Tsinghua University.
   - A literature review that reflects on how RE activities change across the ML lifecycle. *[abstract not checked]*
   - Use: a second review perspective, from outside Europe, to set against the Stuttgart and Deakin mappings.

6. Ahmad, K., Bano, M., Abdelrazek, M., Arora, C. and Grundy, J. (2021) 'What's up with requirements engineering for artificial intelligence systems?', in *2021 IEEE 29th International Requirements Engineering Conference (RE)*. IEEE, pp. 1–12. doi:10.1109/RE51729.2021.00008.
   - Conference. Deakin and Monash *[affil. not in Crossref]*.
   - The conference precursor to source 2. It reviews RE4AI literature and proposes human-centred RE for AI. *[abstract not checked]*
   - Use: cite with source 2 rather than on its own.

7. Ahmad, K., Abdelrazek, M., Arora, C., Bano, M. and Grundy, J. (2023) 'Requirements practices and gaps when engineering human-centered artificial intelligence systems', *Applied Soft Computing*, 143, 110421. doi:10.1016/j.asoc.2023.110421.
   - Journal. Deakin and Monash *[affil. not in Crossref]*.
   - A survey of 29 practitioners. Most agreed that the mapped human-centred aspects (users, explainability, trust and so on) should be handled in RE. Most used UML or Office tools, which "are not equipped to manage AI-based software".
   - Use: practitioner evidence that human-centred AI requirements are recognised but poorly supported. The pilot study could use this as a comparison.

8. Vogelsang, A. and Borg, M. (2019) 'Requirements engineering for machine learning: Perspectives from data scientists', in *2019 IEEE 27th International Requirements Engineering Conference Workshops (REW)*. IEEE, pp. 245–251. doi:10.1109/REW.2019.00050.
   - Workshop. TU Berlin; RISE Research Institutes of Sweden *[affil. not in Crossref]*.
   - An interview study with data scientists. It highlights data requirements, quantitative performance targets and explainability as ML-specific RE concerns. *[abstract not checked]*
   - Use: a commonly cited source for the claim that data requirements are a first-class requirement type for ML systems.

9. Heyn, H.-M., Knauss, E., Muhammad, A.P., Eriksson, O., Linder, J., Subbiah, P., Pradhan, S.K. and Tungal, S. (2021) 'Requirement engineering challenges for AI-intense systems development', in *2021 IEEE/ACM 1st Workshop on AI Engineering – Software Engineering for AI (WAIN)*. IEEE, pp. 89–96. doi:10.1109/WAIN52551.2021.00020.
   - Workshop position paper. Chalmers University of Technology / University of Gothenburg, with industry co-authors *[affil. not in Crossref]*.
   - Argues that the main challenges "relate to defining and ensuring behaviour and quality attributes" of AI-intense systems. It derives four challenge areas from industrial, transport and home-automation use cases and proposes a research roadmap (arXiv abstract).
   - Use: behaviour and quality attributes include response-time and context requirements. Those are the attributes that separate live coaching from post-match coaching.

## 2. Non-functional requirements: explainability, trust, human-AI interaction, data

10. Habibullah, K.M., Gay, G. and Horkoff, J. (2023) 'Non-functional requirements for machine learning: understanding current use and challenges among practitioners', *Requirements Engineering*, 28(2), pp. 283–316. doi:10.1007/s00766-022-00395-3.
    - Journal. Chalmers University of Technology / University of Gothenburg *[affil. not in Crossref]*.
    - An interview and survey study. It finds that NFRs for ML differ in definition, measurement, scope and relative importance. It examines how NFRs are defined across model, data and whole system, and lists the challenges in defining and measuring them.
    - Use: the closest journal source for framing latency and explainability as competing NFRs. It does not treat the timing of feedback to a human as its own NFR.

11. Horkoff, J. (2019) 'Non-functional requirements for machine learning: Challenges and new directions', in *2019 IEEE 27th International Requirements Engineering Conference (RE)*. IEEE, pp. 386–391. doi:10.1109/RE.2019.00050.
    - Conference (perspectives paper). Chalmers / University of Gothenburg *[affil. not in Crossref]*.
    - Sets out the research agenda that source 10 later follows up empirically. *[abstract not checked]*

12. Chazette, L. and Schneider, K. (2020) 'Explainability as a non-functional requirement: challenges and recommendations', *Requirements Engineering*, 25(4), pp. 493–514. doi:10.1007/s00766-020-00333-1.
    - Journal. Leibniz Universität Hannover *[affil. not in Crossref]*.
    - A survey of 107 end users on transparency and embedded explanations. It weighs the advantages and disadvantages of explanations, links explanation to transparency and analyses the effect on software quality. Users do not uniformly want built-in explanations.
    - Use: grounds the trade-off between explaining coaching advice and interrupting play. During a live match an explanation may cost the player attention, while after the match it is cheap.

13. Chazette, L., Brunotte, W. and Speith, T. (2022) 'Explainable software systems: from requirements analysis to system evaluation', *Requirements Engineering*, 27(4), pp. 457–487. doi:10.1007/s00766-022-00393-5.
    - Journal. Leibniz Universität Hannover; Saarland University *[affil. not in Crossref]*.
    - Builds on their RE'21 definition, model and knowledge catalogue (Chazette, Brunotte and Speith, 2021, doi:10.1109/RE51729.2021.00025, verified) to support explainability from requirements analysis through to evaluation. *[abstract not checked]*
    - Use: a ready-made catalogue to apply to a coaching tool's explanation requirements.

14. Köhl, M.A., Baum, K., Langer, M., Oster, D., Speith, T. and Bohlender, D. (2019) 'Explainability as a non-functional requirement', in *2019 IEEE 27th International Requirements Engineering Conference (RE)*. IEEE, pp. 363–368. doi:10.1109/RE.2019.00046.
    - Conference. Saarland University *[affil. not in Crossref]*.
    - The founding paper on treating explainability as an NFR. *[abstract not checked]*

15. Amershi, S., Weld, D., Vorvoreanu, M., Fourney, A., Nushi, B., Collisson, P., Suh, J., Iqbal, S., Bennett, P.N., Inkpen, K., Teevan, J., Kikin-Gil, R. and Horvitz, E. (2019) 'Guidelines for human-AI interaction', in *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems*. ACM, pp. 1–13. doi:10.1145/3290605.3300233.
    - Conference (HCI). Microsoft and the University of Washington (Crossref).
    - Eighteen design guidelines for AI-infused systems, validated over several rounds. They include "time services based on context" and "show contextually relevant information". *[abstract not checked; guideline names from the paper]*
    - Use: the only widely cited source that names timing as a design requirement for AI output. It can serve as the yardstick against which RE4AI reviews come up short.

16. Liao, Q.V., Gruen, D. and Miller, S. (2020) 'Questioning the AI: Informing design practices for explainable AI user experiences', in *Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems*. ACM, pp. 1–15. doi:10.1145/3313831.3376590.
    - Conference (HCI). IBM Research (Crossref).
    - An XAI question bank built from interviews with designers. It frames explanation needs as the questions users ask (why, why not, what if). *[abstract not checked]*
    - Use: a method for eliciting explanation requirements from players and coaches.

17. Peng, Y., Saeeda, H., Heyn, H.-M. and Horkoff, J. (2025) 'Data annotation: A requirements engineering for machine learning systems perspective', in *2025 IEEE 33rd International Requirements Engineering Conference (RE)*. IEEE, pp. 572–575. doi:10.1109/RE63999.2025.00053.
    - Conference (short paper). University of Gothenburg and Chalmers (Crossref).
    - Treats data annotation as an RE concern for ML systems. *[abstract not checked]*
    - Use: recent evidence for data and labelling requirements. Labelled esports match data is a real constraint for coaching models.

## 3. Crowd-based RE and app-review mining

18. **[R]** Dąbrowski, J., Letier, E., Perini, A. and Susi, A. (2022) 'Analysing app reviews for software engineering: a systematic literature review', *Empirical Software Engineering*, 27(2), 43. doi:10.1007/s10664-021-10065-7.
    - Journal. University College London; Fondazione Bruno Kessler, Trento *[affil. not in Crossref]*.
    - An SLR of 182 papers (2012–2020). It classifies app-review analysis by the information mined, the mining technique and the SE activity supported. It also assesses the quality of empirical evaluations and identifies gaps.
    - Use: the method anchor for the pilot's review mining (classification schemes, validity threats).

19. **[R]** Martin, W., Sarro, F., Jia, Y., Zhang, Y. and Harman, M. (2017) 'A survey of app store analysis for software engineering', *IEEE Transactions on Software Engineering*, 43(9), pp. 817–847. doi:10.1109/TSE.2016.2630689.
    - Journal. University College London *[affil. not in Crossref]*.
    - A broad survey of app store analysis for SE, including requirements extraction from reviews. *[abstract not checked]*

20. **[R]** Groen, E.C., Seyff, N., Ali, R., Dalpiaz, F., Doerr, J., Guzman, E., Hosseini, M., Marco, J., Oriol, M., Perini, A. and Stade, M. (2017) 'The crowd in requirements engineering: The landscape and challenges', *IEEE Software*, 34(2), pp. 44–52. doi:10.1109/MS.2017.33.
    - Magazine/journal. Fraunhofer IESE; FHNW; Bournemouth University; Utrecht University; University of Zurich; UPC; FBK (Crossref).
    - Defines crowd-based RE (CrowdRE) and its challenges. *[abstract not checked]*
    - Use: justifies treating esports players on forums, Reddit and app stores as a requirements crowd.

21. Maalej, W., Kurtanović, Z., Nabil, H. and Stanik, C. (2016) 'On the automatic classification of app reviews', *Requirements Engineering*, 21(3), pp. 311–331. doi:10.1007/s00766-016-0251-9.
    - Journal. University of Hamburg *[affil. not in Crossref]*.
    - Classifies reviews automatically into bug reports, feature requests, user experiences and ratings. *[abstract not checked]*
    - Use: a ready-made coding scheme for the pilot.

22. Guzman, E. and Maalej, W. (2014) 'How do users like this feature? A fine grained sentiment analysis of app reviews', in *2014 IEEE 22nd International Requirements Engineering Conference (RE)*. IEEE, pp. 153–162. doi:10.1109/RE.2014.6912257.
    - Conference. Technische Universität München *[affil. not in Crossref]*.
    - Feature-level sentiment extraction from reviews. *[abstract not checked]*
    - Use: could separate sentiment about live-overlay features from sentiment about post-match report features.

23. Pagano, D. and Maalej, W. (2013) 'User feedback in the AppStore: An empirical study', in *2013 21st IEEE International Requirements Engineering Conference (RE)*. IEEE, pp. 125–134. doi:10.1109/RE.2013.6636712.
    - Conference. TU München *[affil. not in Crossref]*.
    - The foundational empirical study of app store feedback as requirements input. *[abstract not checked]*

24. Maalej, W., Nayebi, M., Johann, T. and Ruhe, G. (2016) 'Toward data-driven requirements engineering', *IEEE Software*, 33(1), pp. 48–54. doi:10.1109/MS.2015.153.
    - Magazine/journal. University of Hamburg; University of Calgary *[affil. not in Crossref]*.
    - Argues that usage data and user feedback should drive requirements decisions. *[abstract not checked]*
    - Use: esports clients already produce rich telemetry, which makes data-driven RE especially feasible here.

## 4. RE for games, sports coaching and personal informatics

25. **[R]** Ampatzoglou, A. and Stamelos, I. (2010) 'Software engineering research for computer games: A systematic review', *Information and Software Technology*, 52(9), pp. 888–901. doi:10.1016/j.infsof.2010.05.004.
    - Journal. Aristotle University of Thessaloniki *[affil. not in Crossref]*.
    - A systematic review of SE research on games across lifecycle activities. *[abstract not checked]*
    - Use: shows that games SE research centres on building games, not tools around them. It is also old (2010).

26. Callele, D., Neufeld, E. and Schneider, K. (2005) 'Requirements engineering and the creative process in the video game industry', in *13th IEEE International Conference on Requirements Engineering (RE'05)*. IEEE, pp. 240–250. doi:10.1109/RE.2005.58.
    - Conference. University of Saskatchewan *[affil. not in Crossref]*.
    - Studies game postmortems. It argues that RE must be adapted to the creative, experiential requirements of games. *[abstract not checked]*
    - Use: the classic RE-for-games paper. Its stress on experiential requirements carries over to a coaching tool, which must not degrade the play experience.

27. Politowski, C., Petrillo, F., Ullmann, G.C. and Guéhéneuc, Y.-G. (2021) 'Game industry problems: An extensive analysis of the gray literature', *Information and Software Technology*, 134, 106538. doi:10.1016/j.infsof.2021.106538.
    - Journal. Concordia University *[affil. not in Crossref]*.
    - Analyses 200 postmortems (1997–2019), which yield 927 problems in 20 types. Most root causes "are related to people, not technologies" (arXiv abstract).
    - Use: current evidence on game-industry SE, still with nothing about analytics or coaching tools.

28. Lin, D., Bezemer, C.-P., Zou, Y. and Hassan, A.E. (2019) 'An empirical study of game reviews on the Steam platform', *Empirical Software Engineering*, 24(1), pp. 170–207. doi:10.1007/s10664-018-9627-4.
    - Journal. Queen's University, Canada *[affil. not in Crossref]*.
    - A large-scale study of Steam game reviews. It shows they differ from mobile app reviews and that context such as reviewer playtime matters. *[abstract not checked]*
    - Use: the direct precedent for mining gamer reviews. It warns against transferring app-review classifiers unchanged to gaming communities.

29. Goudsmit, J., Otter, R.T.A., Stoter, I., van Holland, B., van der Zwaard, S., de Jong, J. and Vos, S. (2022) 'Co-operative design of a coach dashboard for training monitoring and feedback', *Sensors*, 22(23), 9073. doi:10.3390/s22239073.
    - Journal (open access). Eindhoven University of Technology; Hanze University of Applied Sciences; Innovationlab Thialf; Leiden University (Crossref).
    - Elicits coaches' requirements through a survey (n = 38), interviews (n = 8) and focus groups (n = 4) within a design-thinking process. The output is a dashboard for data-informed training decisions in cyclic sports.
    - Use: the closest traditional-sports analogue to esports coaching RE. Note that its feedback is post-session, a dashboard, not live.

30. Li, I., Dey, A. and Forlizzi, J. (2010) 'A stage-based model of personal informatics systems', in *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems*. ACM, pp. 557–566. doi:10.1145/1753326.1753409.
    - Conference (HCI). Carnegie Mellon University (Crossref).
    - Models personal informatics as preparation, collection, integration, reflection and action. *[abstract not checked]*
    - Use: a theoretical lens for the essay. Live coaching collapses collection and action, while post-match coaching gives room for reflection.

31. Epstein, D.A., Ping, A., Fogarty, J. and Munson, S.A. (2015) 'A lived informatics model of personal informatics', in *Proceedings of the 2015 ACM International Joint Conference on Pervasive and Ubiquitous Computing (UbiComp)*. ACM, pp. 731–742. doi:10.1145/2750858.2804250.
    - Conference (HCI). University of Washington (Crossref).
    - Extends Li et al. to cover deciding, selecting tools, lapsing and resuming. *[abstract not checked]*
    - Use: explains why players abandon coaching tools, which bears on long-term adoption requirements.

## 5. RE for real-time systems (searched; weak fit)

- Zhou, J. (2014) 'Requirements development and management of embedded real-time systems', in *2014 IEEE 22nd International Requirements Engineering Conference (RE)*. IEEE, pp. 479–484. doi:10.1109/RE.2014.6912302. This is a doctoral-symposium-length paper on embedded systems. Include it only to show that real-time RE literature deals with hard machine deadlines, not with when a human can take in feedback. Optional.

## 6. RE applied to esports or game-analytics tools

**None found.** Searches on Crossref ("esports requirements") and the web (esports or game-analytics combined with requirements engineering or elicitation) returned esports business, governance and fan-behaviour chapters. They also returned games *used for* RE elicitation (serious games, gamification) and RE for building games. None was an RE study of esports coaching or analytics tools. State this as a finding: as far as these searches show, no peer-reviewed paper applies RE explicitly to esports coaching or game-analytics tools.

## Gaps to argue in the essay

1. **No timing dimension in RE4AI.** Judging from their abstracts and reported categories, neither the Habiba et al. (2024) nor the Ahmad et al. (2023) mapping categorises requirements by *when* AI output reaches a human (check the full texts before stating this flatly). Latency appears only as a system performance NFR (Habibullah et al., 2023). The cognitive-timing question (live vs. post-match) is raised only in HCI (Amershi et al.'s "time services based on context"), not in RE.
2. **Domain skew.** The RE4AI evidence base is dominated by autonomous vehicles and safety-critical systems (Ahmad et al., 2023; Martínez-Fernández et al., 2022). Leisure, sports and games are absent.
3. **Explainability under time pressure.** The explainability-as-NFR work (Köhl et al., 2019; Chazette and Schneider, 2020; Chazette et al., 2022) assumes the user has attention to spare for an explanation. No RE study looks at explanations during a high-tempo task.
4. **Games RE is about making games.** RE for games (Callele et al., 2005; Ampatzoglou and Stamelos, 2010; Politowski et al., 2021) covers game production, not third-party tools that sit alongside play.
5. **Crowd RE has not been applied to gamer coaching tools.** App-review mining is mature (Dąbrowski et al., 2022; Maalej et al., 2016). Lin et al. (2019) show that game reviews behave differently, but no study mines reviews of esports coaching or overlay apps. This is the pilot's opening.
6. **Sports coaching RE is post-session and traditional.** Goudsmit et al. (2022) elicit coach requirements for a dashboard, but not for in-play AI feedback and not for esports.
7. **Recency.** The newest RE4AI review covers literature only to July 2023. Work from 2024–26 on LLM-based assistants is not yet synthesised in a journal review. Crossref shows an SSRN preprint titled 'Requirements Engineering Practices for AI/ML-based Systems: A Systematic Literature Review' (2025, doi:10.2139/ssrn.5563700). It is unreviewed, so leave it out unless it is published.
