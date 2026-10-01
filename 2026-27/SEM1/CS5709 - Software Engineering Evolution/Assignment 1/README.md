# Assessment 1: Digital portfolio (Phase 1)

CS5709: Software Engineering Evolution · 15% · deadline: **6 October** (confirmed by Chirag). The 2026/27 module's Brightspace page still displays 2025 and 23:59; confirm the corrected year/time with the lecturer.

[Assignment and rubric](https://learn.ul.ie/d2l/lms/dropbox/user/folder_submit_files.d2l?db=51831&grpid=0&isprv=0&bp=0&ou=91640) · [Original portfolio](https://github.com/chiragagg5k/profile-website)

## Approach

A separate, small static portfolio, not a replacement for the production website. Node generates actual HTML pages from a shared layout; plain CSS handles presentation. No framework, runtime database or animation library is needed for the core portfolio. Standard links provide routing and work without JavaScript. Source, documentation and deployment configuration live here in the university repository.

Audience: prospective collaborators and the assessor. Purpose: show Chirag's education and engineering work with clear evidence. Visual direction: blue navigation rail, white content canvas, Georgia headings and system sans-serif body, with generous readable spacing. No decorative motion. Gallery photographs carry the personality.

## Links and deployment

- Original live portfolio: https://www.chiragaggarwal.tech
- Assignment live URL: https://chirag-cs5709.appwrite.network
- Original generated URL (still available): https://6abcf8640007fde5290d.appwrite.network
- Domain proxy rule: `45595318d1d7cc10d91686583a8ac5fc` (verified; linked to assignment site). Created with `appwrite proxy create-site-rule --domain chirag-cs5709.appwrite.network --site-id cs5709-portfolio-phase1`; HTTPS opening verified with Playwright.
- [Deployment console](https://cloud.appwrite.io/console/project-sgp-chirag-project-prod/sites/site-cs5709-portfolio-phase1)
- Status: site deployed and verified on 1 October; report PDF generated. **Not submission-ready**: policy review of the declaration pending (see the yellow to-do boxes in the PDF).
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

| Area                   | Phase 1 target                                      | Phase 2 proposal                       |
| ---------------------- | --------------------------------------------------- | -------------------------------------- |
| Home                   | Introduction and selected work                      | More detailed case studies             |
| About                  | Background and professional links                   | Downloadable tailored CV               |
| Education              | UL, Bennett and school history                      | Module/project evidence                |
| Professional knowledge | Three structured examples with working skill filter | Free-text search and more case studies |
| Pictures               | Captioned existing portfolio photos                 | Filtering and enlarged view            |
| Video                  | Captioned animated explainer of the MCP article     | Narrated project demos                 |
| Blog                   | Locally readable article content                    | Tags, search and content management    |
| Messaging              | Genuine visitor-to-owner instant messaging          | History, notifications and moderation  |
| Navigation/CSS         | All pages linked, responsive, keyboard usable       | Further usability refinements          |

Phase 2 is a proposed enhancement list, not a reason to omit Phase 1 functionality. The brief names six pages plus blog and messaging despite the rubric's five-page minimum. Implement the fuller brief. A mail link/contact form is not instant messaging.

## Single-session checklist

### Discovery (3 marks)

- [x] Inspect authenticated assignment and expanded rubric.
- [x] Record requirements, phase split and repository location.
- [x] Select a simpler architecture and define sitemap.
- [ ] Confirm permission to adapt pre-existing work and applicable AI policy.
- [x] Choose Tawk.to and integrate the owner-provided public widget.
- [x] Video: the brief lists a video gallery, so a one-minute animated explainer of the MCP article was built (`video/mcp-explainer.html`) and recorded with Playwright, with captions and a transcript.

### Design (3 marks)

- [x] Draft block, component and control-flow diagrams in `DESIGN.md`.
- [x] Update diagrams to document the Tawk.to messaging integration.

### Development, iteration 1 (3 marks)

- [x] Build Home, About, Education, Professional knowledge, Pictures, Blog and article and Contact.
- [x] Verify shared navigation and direct page URLs.
- [x] Integrate real hosted messaging with click-to-load privacy notice, error handling and email fallback.
- [x] Confirm visitor messages reached the owner inbox and send a labelled owner-side reply.
- [x] Confirm the reply appears in the visitor widget (1 October: "reply received" sent from the dashboard appeared in the live visitor widget; see `evidence/chat-reply-*.png`).
- [x] Record initial foundation commit including current styling; no separate unstyled milestone is claimed.

### Development, iteration 2 (3 marks)

- [x] Style every page and check desktop/mobile layouts for horizontal overflow.
- [x] Test keyboard navigation, focus and contrast and image descriptions (photo alt text rewritten from the photographs on 1 October).
- [x] Verify media, blog navigation and messaging end to end.
- [x] Deploy isolated assignment site and record working live URL.
- [x] Add progressively enhanced skill filtering, structured evidence and a complete technical article; verify interactions.

### Evaluation (3 marks)

- [x] Record actual test commands/results and meaningful app screenshots.
- [x] Draft critique with specific limitations and improvements in the report (student review outstanding).
- [ ] Write an honest personal reflection based on the development log.

### Report and hand-in

- [x] Cover: title, name, student ID and module.
- [x] Table of contents, declaration/transparency, abstract.
- [x] Discovery, plan and tools (conservative interpretation: one page combined).
- [x] Design with all three diagrams (two pages maximum).
- [x] Full authored code listing plus GitHub link (exclude build output/dependencies).
- [ ] Innovation feature, critique (one page maximum), reflection, references.
- [x] Export and inspect PDF, check links, pagination and readability.
- [ ] Student reviews factual details, declaration and final submission.

## Reuse and transparency

Content source: `chiragagg5k/profile-website` at commit `70f641f3ccbdfe146d2fbcc968437afac98464c8`. Existing biography, education, work descriptions and photographs are adapted, not claimed as newly created coursework. Both blog articles are republished in full from the original portfolio and link to their originals; the MCP article's two diagrams were captured from its rendered Mermaid figures, its bar chart is shown as its data table, and its two screenshots are copied from the original. Website implementation in this directory is new AI-assisted work; Chirag must review it, understand it and disclose assistance according to module policy. Do not invent a student ID, tests, reflection or development history.

## Report

The report source is [`report/source.html`](report/source.html) with print styles in `report/report.css`. Diagrams in `report/diagrams/` are rendered from the Mermaid blocks in `DESIGN.md` (Mermaid 11.17.2, neutral theme, 2x scale); re-render them after changing a diagram.

```sh
node report/pdf.mjs
```

This inserts the full code listing from the authored source files, prints `report/dist/report.pdf` with headless Chrome, finds each section's page with `pdftotext` and prints again with numbered contents. Requires Google Chrome (or set `CHROME`) and Poppler (`brew install poppler`). The build reports how many yellow to-do markers remain; submit only when it reports 0.

Contents: cover; contents; 1 declaration and transparency; 2 abstract; 3 discovery, feature narrative, iterative plan and tools (one page); 4 design with block, component and control-flow diagrams (two pages); 5 full code listing; 6 evaluation, innovation, critique (one page) and reflection; 7 references.

## Verification so far

- `cd site && npm run build && npm test`: **26 passing tests** (document structure, required files, internal links/assets, active navigation, image alt attributes, exact skill matching, progressive enhancement, click-to-load chat disclosure, video captions and posters, 404 links resolving from the site root, and WCAG AA contrast of every text colour pair in the stylesheet).
- Bug found 1 October: the host serves `404.html` at any missing path (with HTTP 200), so on `/blog/nested/missing` its relative stylesheet and navigation links resolved under `/blog/nested/` and every link led to another 404. Fixed with `<base href="/">` on the 404 document only; the regression test fails without it. Simulated nested-path check confirmed styles and links load from the root.
- Keyboard pass 1 October: tab order is skip link, identity, eight navigation links, then page content; every focused element shows a solid outline. All ten pages at 390px: no horizontal overflow, one active navigation item, no script errors.
- Initial live Playwright checks at 1440px and 390px: all nine original content URLs returned HTTP 200, one active navigation item each, no horizontal overflow.
- Evidence iteration: local browser checks verified Go → 1 result, APIs → 2, All → 3; keyboard Space activation; mobile overflow; blog-to-article navigation; and three readable projects with JavaScript disabled. Rechecked live filtering, keyboard, reset, mobile layout and new article after deployment; no page errors observed.
- `site/browser-check.mjs` exports reusable `checkPortfolio(page, baseURL)` for a caller-supplied Playwright Page. Browser tests are separate from `npm test`.
- Gallery images initially appeared unloaded in the automated scan because they are lazy-loaded. Scrolling each into view and awaiting `img.decode()` confirmed all three load successfully.
- Actual application screenshots: [desktop home](evidence/home-desktop.png), [mobile gallery](evidence/gallery-mobile.png), [desktop skill filter](evidence/skill-filter-desktop.png), [mobile skill filter](evidence/skill-filter-mobile.png).
- Keyboard smoke check: first Tab focuses “Skip to content”. Full accessibility audit and external-link testing not yet complete.
- Chat integration: local mocked-provider browser checks passed for no request before clicking, load/reopen with one script, and blocked-provider failure handling. On the real live site, the widget loaded and a labelled integration-test message appeared in the visitor conversation. **Owner inbox receipt is now confirmed.** On 1 October a dashboard reply ("reply received") appeared in the live visitor widget, so two-way messaging is verified ([visitor](evidence/chat-reply-visitor.png), [dashboard](evidence/chat-reply-dashboard.png)). See [desktop chat](evidence/chat-desktop.png) and [mobile chat](evidence/chat-mobile.png). Mobile viewport check at 390px showed no document overflow and an open widget.
- Video: `video/mcp-explainer.html` (facts from the MCP article) recorded at 1280x720 with Playwright and converted to H.264 MP4 with ffmpeg; captions and on-page transcript come from the step list in `site/pages/videos.mjs`. Verified playback and captions in a browser.

## Navigation enhancement

`site/navigation.mjs` supplies browser-native speculation rules: prefetch linked local HTML documents and request prerendering on navigation intent. Unsupported browsers and data-saving connections keep ordinary links. No custom router or animation delays are introduced. Actual preparation depends on browser policy; the local automated browser did not report prerender activation, so a guaranteed speedup is not claimed. External links, media, query strings and fragments are excluded from prefetch candidates.

Messaging: Tawk.to widget `6abd0adffd2d7034457f30d7/1k3p74upi`, supplied by Chirag. `chat.mjs` waits for the first click, then remembers that choice in `sessionStorage` for the tab. Subsequent active pages load chat in the background without requesting that the window open. Prerendered documents defer loading until activation. Blocked storage falls back to click-to-load. The footer explains third-party processing and links to the provider privacy policy. Without JavaScript or if the provider is blocked, email remains available. The provider manages conversation continuity. After opting in, visitors can open an already-loaded widget instead of starting a new download at every click. Close the tab to end automatic loading. No account passwords or secret API keys are in the repository.

## Chat loading verification

- Observed original click-to-ready time: approximately 1.4 seconds in one browser session, including about 667 ms for the provider's session request. This is a single measurement, not a performance guarantee.
- Seven additional unit tests cover first-visit opt-in, background loading after opt-in, click during loading, prerender deferral, blocked storage, timeout/late readiness and script errors.
- Live verification encountered a Tawk.to `session/start` HTTP 500. The page showed its fallback rather than claiming success. A reload succeeded; once background loading completed, click-to-open measured approximately 154 ms.
- Provider-side availability is outside this site's control. First-use startup still waits for the third party. The implementation does not promise instant initialization or guaranteed delivery.

## Copy review

[COPY-AUDIT.md](COPY-AUDIT.md) records the visitor-facing copy edits, preserved facts and disclosures, and validation. Removed repeated coursework commentary, shortened labels and chat guidance, and kept the original article quotation intact.

## Development log

- Evidence iteration: added three structured project examples, accessible skill filtering and a full technical article labelled AI-assisted (replaced on 1 October by the full text of my own April 2026 post, “How we solved logging at Appwrite”, so the blog contains no AI-written articles). Updated diagrams and wrote a report draft without inventing personal reflection. Screenshot inspection exposed an offscreen skip-link capture artefact; changed its hiding method to clipping while preserving keyboard focus.
- Kickoff: checked live rubric; inspected existing portfolio; chose independent static implementation to reduce code-listing and deployment complexity. Existing production website remains untouched.
- Appwrite CLI project initialisation unexpectedly pulled unrelated functions/settings. Removed those local pulls from the assignment tree before staging; retained only project identity and isolated site configuration. No unrelated remote settings were pushed.
