# Assessment 1 — Digital portfolio (Phase 1)

CS5709 — Software Engineering Evolution · 15% · deadline: **6 October** (confirmed by Chirag). The 2026/27 module's Brightspace page still displays 2025 and 23:59; confirm the corrected year/time with the lecturer.

[Assignment and rubric](https://learn.ul.ie/d2l/lms/dropbox/user/folder_submit_files.d2l?db=51831&grpid=0&isprv=0&bp=0&ou=91640) · [Original portfolio](https://github.com/chiragagg5k/profile-website)

## Approach

A separate, small static portfolio, not a replacement for the production website. Node generates actual HTML pages from a shared layout; plain CSS handles presentation. No framework, runtime database or animation library is needed for the core portfolio. Standard links provide routing and work without JavaScript. Source, documentation and deployment configuration live here in the university repository.

Audience: prospective collaborators and the assessor. Purpose: show Chirag's education and engineering work with clear evidence. Visual direction: blue navigation rail, white content canvas, Georgia headings and system sans-serif body, with generous readable spacing. No decorative motion. Gallery photographs carry the personality.

## Links and deployment

- Original live portfolio: https://www.chiragaggarwal.tech
- Assignment live URL: https://6abcf8640007fde5290d.appwrite.network
- [Deployment console](https://cloud.appwrite.io/console/project-sgp-chirag-project-prod/sites/site-cs5709-portfolio-phase1)
- Status: working foundation, **not submission-ready** (video and messaging pending)
- Appwrite: Main Project (`chirag-project-prod`), Singapore (`sgp`)
- Assignment site ID: `cs5709-portfolio-phase1` (separate from production)
- Source repository: https://github.com/ChiragAgg5k/ul-university-notes (this directory; local changes need pushing)
- Never push project settings or unrelated resources. Deploy only the named site.

## Run locally

```sh
cd site
npm run build
npm test
python3 -m http.server 5709 --directory dist
```

Open http://localhost:5709. Requires Node 22+ and Python 3. No npm dependencies.

## Feature scheme

| Area | Phase 1 target | Phase 2 proposal |
|---|---|---|
| Home | Introduction and selected work | More detailed case studies |
| About | Background and professional links | Downloadable tailored CV |
| Education | UL, Bennett and school history | Module/project evidence |
| Professional knowledge | Skills linked to real work | Searchable skills-to-project filter |
| Pictures | Captioned existing portfolio photos | Filtering and enlarged view |
| Video | Playable relevant video with accessible description | Multiple videos and transcripts |
| Blog | Locally readable article content | Tags, search and content management |
| Messaging | Genuine visitor-to-owner instant messaging | History, notifications and moderation |
| Navigation/CSS | All pages linked, responsive, keyboard usable | Further usability refinements |

Phase 2 is a proposed enhancement list, not a reason to omit Phase 1 functionality. The brief names six pages plus blog and messaging despite the rubric's five-page minimum. Implement the fuller brief. A mail link/contact form is not instant messaging.

## Single-session checklist

### Discovery — 3 marks
- [x] Inspect authenticated assignment and expanded rubric.
- [x] Record requirements, phase split and repository location.
- [x] Select a simpler architecture and define sitemap.
- [ ] Confirm permission to adapt pre-existing work and applicable AI policy.
- [ ] Finalise video selection and messaging provider/approach.

### Design — 3 marks
- [x] Draft block, component and control-flow diagrams in `DESIGN.md`.
- [ ] Update diagrams to match the finished messaging integration.

### Development, iteration 1 — 3 marks
- [x] Build Home, About, Education, Professional knowledge, Pictures, Blog and article; scaffold Video and Contact with honest incomplete states.
- [x] Verify shared navigation and direct page URLs.
- [ ] Finish video gallery and real instant messaging.
- [x] Record initial foundation commit including current styling; no separate unstyled milestone is claimed.

### Development, iteration 2 — 3 marks
- [x] Style every page and check desktop/mobile layouts for horizontal overflow.
- [ ] Test keyboard navigation, focus, contrast and image descriptions.
- [ ] Verify media, blog navigation and messaging end to end.
- [x] Deploy isolated assignment site and record working live URL.
- [ ] Record tested styling/enhancement milestone.

### Evaluation — 3 marks
- [ ] Record actual test commands/results and meaningful app screenshots.
- [ ] Critique design/code with specific limitations and improvements.
- [ ] Write an honest personal reflection based on the development log.

### Report and hand-in
- [ ] Cover: title, name, student ID and module.
- [ ] Table of contents, declaration/transparency, abstract.
- [ ] Discovery, plan and tools (conservative interpretation: one page combined).
- [ ] Design with all three diagrams (two pages maximum).
- [ ] Full authored code listing plus GitHub link (exclude build output/dependencies).
- [ ] Innovation feature, critique (one page maximum), reflection, references.
- [ ] Export and inspect PDF, check links, pagination and readability.
- [ ] Student reviews factual details, declaration and final submission.

## Reuse and transparency

Content source: `chiragagg5k/profile-website` at commit `70f641f3ccbdfe146d2fbcc968437afac98464c8`. Existing biography, education, work descriptions and photographs are adapted, not claimed as newly created coursework. Blog excerpts link to their originals. Website implementation in this directory is new AI-assisted work; Chirag must review it, understand it and disclose assistance according to module policy. Do not invent a student ID, tests, reflection or development history.

## Report contents

1. Front cover
2. Table of contents
3. Declaration and transparency
4. Abstract
5. Discovery, feature narrative, iterative plan and tools
6. Design (block, component and control-flow diagrams)
7. Full code listing and source link
8. Critique, innovation and reflection
9. References

## Verification so far

- `cd site && npm run build && npm test`: **12 passing tests** (document structure, required files, internal link/asset existence, active navigation, image alt attributes and incomplete-feature disclosures).
- Live Playwright checks at 1440px and 390px: all nine content URLs returned HTTP 200, one active navigation item each, no horizontal overflow.
- Gallery images initially appeared unloaded in the automated scan because they are lazy-loaded. Scrolling each into view and awaiting `img.decode()` confirmed all three load successfully.
- Actual application screenshots: [desktop home](evidence/home-desktop.png), [mobile gallery](evidence/gallery-mobile.png).
- Keyboard smoke check: first Tab focuses “Skip to content”. Full accessibility audit and external-link testing not yet complete.
- Video playback and messaging: **not implemented or tested**. Report PDF: **not yet written/exported**.

## Development log

- Kickoff: checked live rubric; inspected existing portfolio; chose independent static implementation to reduce code-listing and deployment complexity. Existing production website remains untouched.
- Appwrite CLI project initialisation unexpectedly pulled unrelated functions/settings. Removed those local pulls from the assignment tree before staging; retained only project identity and isolated site configuration. No unrelated remote settings were pushed.
