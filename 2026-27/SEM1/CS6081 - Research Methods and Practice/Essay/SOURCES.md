# Essay sources and topic ideas

Researched 23 November 2026 with Crossref, OpenAlex, publisher pages, wave-flow.ie and the Cinco Cloud GitLab repo. Every DOI below resolved on Crossref that day. The notes come from titles, metadata and abstracts, not full reads: read each paper before citing it and write every point in your own words. Brainstorm page with scored ideas: <https://claude.ai/artifact/BtBNnizxKo4idZ5D7J8ZuJ> (private; share it from the page).

## The gap

Low-code research is about building apps: modelling, adoption, developer challenges. Almost nothing studies how to install, operate, isolate tenants of or scale the platform itself (Costa 2025 is the only direct paper). Prof. Margaria's group runs Wave on Cinco Cloud on Kubernetes (one Theia workspace per project, idle ones garbage-collected, per the repo docs) but has published nothing on operating it.

| Theme | State |
| --- | --- |
| Definitions, low-code vs model-driven engineering | crowded; background only |
| Literature reviews | crowded; 8+ since 2021 |
| Developer challenges mined from forums | crowded; deployment appears only from the app builder's side |
| Organisational adoption, citizen developers | crowded; mostly interviews |
| Testing, evolution, lock-in | thin |
| LLMs and low-code | thin, growing |
| Operating the platform: install, multi-tenancy, scaling | near empty |

## Candidate research questions

Scores 1–5: novelty, sources available, pilot in a week without ethics approval, fit with the Wave dissertation.

| | Question | Pilot | Scores |
| --- | --- | --- | --- |
| **A** (recommended) | What deployment and operations problems do people self-hosting open-source low-code platforms report? | Code about 200 GitHub issues (deploy, self-host, helm, k8s) from Budibase, Appsmith, ToolJet, NocoDB against the Gang-of-Eight and Haque categories | 5/5/5/5 |
| **B** (recommended, pairs with A) | How are open-source low-code platforms packaged for self-hosting, and what does that imply for Wave? | Analyse Compose files, Helm charts and install docs of 4–5 platforms plus Cinco Cloud | 5/4/5/5 |
| C | What does it cost one operator to get from a clean VM or k3s to a first working app? | Self-study installing four platforms, logging steps, failures, time | 4/3/5/4 |
| D | Does tenant isolation (shared vs per community) change resource use and latency under load? | k6 load tests on k3s; keep for the dissertation | 5/2/2/4 |
| E | Has model-driven DevOps research addressed operating the modelling platform itself? | Structured screen of 2020–26 MODELS, SoSyM, ICSA-C | 3/5/5/3 |
| F | How do practitioners weigh lock-in and maintainability in low-code vs LLM-assisted development? | Survey or interviews; needs consent, possibly ULREC | 4/4/2/2 |
| G | Do LLM assistants remove the reasons to choose low-code for CRUD work? | Build one feature both ways | 4/3/3/2 |

## References

### Margaria's group: Wave and Cinco Cloud

Teumert, Mitwalli and Krumrey are on most of these, so cite at most 3 (one-institution rule).

- Margaria, T., O'Brien, S., Krumrey, M., Mitwalli, D.S., Saay, S. and Teumert, S. (2026) 'The Wave platform: a LCNC platform for communities of research', COMPSAC 2026, pp. 1689–1692. doi:10.1109/compsac69091.2026.00224.
- Teumert, S. and Mitwalli, D.S. (2026) 'Unifying executable (process-) models inside the WAVE platform', 2nd Workshop on Low-Code Development and Software Architecture. doi:10.1145/3786179.3788322.
- Brandon, C., Mitwalli, D.S., Krumrey, M. and Teumert, S. (2025) 'Bringing Cinco de Bio to the cloud', ICSA-C 2025, pp. 340–349. doi:10.1109/icsa-c65153.2025.00055.
- Mitwalli, D.S., Krumrey, M. and Teumert, S. (2025) 'Streamlining the engineering and distribution of graphical DSLs based on recurring patterns', ICSA-C 2025. doi:10.1109/icsa-c65153.2025.00056.
- Bainczyk, A. et al. (2022) 'Cinco Cloud: a holistic approach for web-based language-driven engineering', ISoLA 2022, LNCS. doi:10.1007/978-3-031-19756-7_23. (Steffen's group; Margaria not an author.)
- Steffen, B., Gossen, F., Naujokat, S. and Margaria, T. (2019) 'Language-driven engineering: from general-purpose to purpose-specific languages', LNCS 10000. doi:10.1007/978-3-319-91908-9_17.
- Brandon, C. et al. (2024) 'Cinco de Bio: a low-code platform for domain-specific workflows for biomedical imaging research', *BioMedInformatics*, 4(3). doi:10.3390/biomedinformatics4030102.

### Low-code: background and challenges

- Sahay, A., Indamutsa, A., Di Ruscio, D. and Pierantonio, A. (2020) 'Supporting the understanding and comparison of low-code development platforms', SEAA 2020. doi:10.1109/seaa51224.2020.00036.
- Di Ruscio, D. et al. (2022) 'Low-code development and model-driven engineering: two sides of the same coin?', *Software and Systems Modeling*, 21(2). doi:10.1007/s10270-021-00970-2.
- Bock, A.C. and Frank, U. (2021) 'Low-code platform', *Business & Information Systems Engineering*, 63(6). doi:10.1007/s12599-021-00726-8.
- Lethbridge, T.C. (2021) 'Low-code is often high-code, so we must design low-code platforms to enable proper software engineering', ISoLA 2021, LNCS. doi:10.1007/978-3-030-89159-6_14. (Lethbridge alone, not Margaria.)
- Alamin, M.A.A. et al. (2021) 'An empirical study of developer discussions on low-code software development challenges', MSR 2021. doi:10.1109/msr52588.2021.00018.
- Luo, Y., Liang, P., Wang, C., Shahin, M. and Zhan, J. (2021) 'Characteristics and challenges of low-code development: the practitioners' perspective', ESEM 2021. doi:10.1145/3475716.3475782.
- Ajimati, M.O., Carroll, N. and Maher, M. (2025) 'Adoption of low-code and no-code development: a systematic literature review and future research agenda', *Journal of Systems and Software*, 222. doi:10.1016/j.jss.2024.112300.
- Käss, S., Strahringer, S. and Westner, M. (2023) 'Practitioners' perceptions on the adoption of low code development platforms', *IEEE Access*, 11. doi:10.1109/access.2023.3258539.
- Khorram, F., Mottu, J.-M. and Sunyé, G. (2020) 'Challenges & opportunities in low-code testing', MODELS-C 2020. doi:10.1145/3417990.3420204.
- Hagel, N., Hili, N. and Schwab, D. (2024) 'Turning low-code development platforms into true no-code with LLMs', MODELS 2024 companion. doi:10.1145/3652620.3688334.

### Operating low-code and DevOps for model-driven engineering

- Costa, Gonçalves and Xavier-de-Souza (2025) 'Multitenancy in single instance of data persistence service for supporting low-code platforms', *IEEE Access*. doi:10.1109/access.2025.3525639.
- Ul Haq, Alfonso, Sulejmani and Cabot (2024) 'Extending a low-code tool with multi-cloud deployment capabilities', LNCS. doi:10.1007/978-3-031-71246-3_5.
- Alfonso, I. et al. (2024) 'Building BESSER: an open-source low-code platform', LNBIP. doi:10.1007/978-3-031-61007-3_16.
- Rafi, S., Akbar, M.A., Sánchez-Gordón, M. and Colomo-Palacios, R. (2022) 'DevOps practitioners' perceptions of the low-code trend', ESEM 2022. doi:10.1145/3544902.3546635.
- Combemale, B., Jézéquel, J.-M., Perez, Q. and Vojtisek, D. (2023) 'Model-based DevOps: foundations and challenges', MODELS-C 2023. doi:10.1109/models-c59198.2023.00076.
- Berardinelli, L. et al. (2026) 'MDE, AI and DevOps: a systematic mapping', *ACM TOSEM*. doi:10.1145/3759454.

### Methods to borrow: containers, infrastructure as code, installation

- Rahman, A., Farhana, E., Parnin, C. and Williams, L. (2020) 'Gang of eight: a defect taxonomy for infrastructure as code scripts', ICSE 2020. doi:10.1145/3377811.3380409.
- Rahman, A. et al. (2023) 'Security misconfigurations in open source Kubernetes manifests', *ACM TOSEM*. doi:10.1145/3579639.
- Zerouali, A., Opdebeeck, R. and De Roover, C. (2023) 'Helm charts for Kubernetes applications: evolution, outdatedness and security risks', MSR 2023. doi:10.1109/msr59073.2023.00078.
- Haque, M.U., Iwaya, L.H. and Babar, M.A. (2020) 'Challenges in Docker development: a large-scale study using Stack Overflow', ESEM 2020. doi:10.1145/3382494.3410693.
- Eng, K., Hindle, A. and Stroulia, E. (2024) 'Patterns of multi-container composition for service orchestration with Docker Compose', *Empirical Software Engineering*. doi:10.1007/s10664-024-10462-8.
- Gao, H., Treude, C. and Zahedi, M. (2025) 'Adapting installation instructions in rapidly evolving software ecosystems', *IEEE TSE*. doi:10.1109/tse.2025.3552614.
- Chen, Z. et al. (2021) 'An empirical study on deployment faults of deep learning based mobile applications', ICSE 2021. doi:10.1109/icse43902.2021.00068.

Author initials marked "et al." or missing were not checked; take them from the paper when writing the reference list.

## Avoid

- "Scalability of low-code" papers in IJETCSIT, IJSR, IJRASET, IJFMR: they look predatory.
- arXiv preprints (low-code DevOps paradox, model-driven DevOps SLR): they don't count toward the 8 peer-reviewed sources.
- Budibase, Appsmith, ToolJet, NocoDB: no peer-reviewed study found. Cite their docs and repos as data, not literature.

## To confirm

- Jim: is mining public GitHub issues an acceptable pilot with no ethics form? Is the limit 2,500 or 3,000 words with a pilot?
- Margaria (week of 7 Dec): can the essay's findings feed the Project Details Form?
