# Assessment 3: Digital portfolio (Phase 2)

CS5709: Software Engineering Evolution · deadline: **Tue 17 November 2026, 23:59** on Brightspace. Status: **scaffolded and live, not submitted**.

Live site: https://chiragagg5k.github.io/ul-university-notes/

[Assignment and rubric](https://learn.ul.ie/d2l/lms/dropbox/user/folder_submit_files.d2l?db=51833&grpid=0&isprv=0&bp=0&ou=91640) · brief and rubric copied from Brightspace on 10 November 2026.

Phase 2 evolves the [Phase 1 static site](../Assignment%201/README.md) into a React application. Phase 1 stays as it is, at its own URL, so the report can compare the two.

## Pick up from here

State on 10 November 2026: the site is fully ported and live, CI/CD deploys it, and the brief is captured below. Nothing of the report exists yet. Seven days remain.

In order:

1. ~~Peer review of my Phase 1 report.~~ Received 10 November; its recommendations and their state are under "Peer review to address". Open items from it: a Readme page on the site, an analysis of the lecturer's portfolio, a recovered module view, and splitting this file into technical documentation and working notes.
2. **Discovery, to answer the Phase 1 feedback.** Write two or three personas (for example a recruiter, an open-source collaborator, the assessor), a scenario for each, and a short review of a few existing developer portfolios. Derive the Phase 2 requirements from them and map each to a feature that exists.
3. **Choose and build the innovation feature** (10 marks, the largest item). The brief's example is a database; "features beyond class coverage". Candidates to weigh: a guestbook or article reactions stored in an Appwrite database; a command palette for keyboard search across all content; a visitor-facing change log generated from the Git history.
4. **Click through the live site in a browser.** The 10 November check of the full port ran against a local build and plain HTTP requests to the live site; the browser tool dropped before the live pass. Also hold one real chat conversation and confirm it reaches the Tawk.to inbox.
5. **Decide what returns from Phase 1**: the automated tests, the external link checker, the speculation-rules prefetch. The tests feed the Evaluation section.
6. **Evaluation** (5 marks): a code inspection with a named method and checklist, and a recorded walkthrough. Save screenshots under `evidence/`.
7. **Report**: copy the `report/pdf.mjs` pipeline from Assignment 1 and set 12pt Times New Roman. Sections are listed under "Report structure". Factual tables and the code listing can be generated; the summary, critique and reflection are mine to write.
8. **Submit** on Brightspace with the live URL and repository link in the comment.

Checks to confirm before submitting: the third project card was reworded to describe Phase 1, and the photos were tagged "Hackathon" or "Conference"; both were drafted with AI assistance and need my review.

## Brief

"This is the continuation of your Phase 1 portfolio. The website should now be fully populated, hosted online, and accessible. Improvements from Phase 1 feedback provided must be integrated."

Deliverables:

- Enhanced portfolio website (live), with GitHub Actions deployment, auto CI/CD, readme, modular structure, and dynamic data management with JSON file, API connection, adding GSAP for better interactivity, PropTypes or TypeScript, JSDoc headers, use lazy loading, add search and filter functionality, and State Management.
- Implementation of modular, maintainable, and well-documented code.
- GitHub repository with CI/CD pipeline and action.
- Innovation features beyond class coverage.
- Updated technical report with critique and references.

### Weighting is inconsistent

The brief says 35% in one place and 30% in another. Its marks table totals 30. The Brightspace rubric adds a sixth criterion, Reflection (5), and totals 35, while the dropbox is scored out of 30. Write the reflection regardless.

### Marks

| Item | Description from the brief | Split | Marks |
| --- | --- | --- | --- |
| 1. Development (Iteration 3) | Enhancement of portfolio based on Phase 1 review. Compiled, modularised, separation of concerns, well-commented, with a detailed README file | 5, 5 | 10 |
| 2. Development (Iteration 4) | Connecting to GitHub and creating a CI/CD pipeline, description and technical documentation about the pipeline, with active action | 1, 1, 0.5 | 2.5 |
| 3. Development (Iteration 5) | Creating a GitHub page and making the site live: consider the comments and ensure all details are included, including an interactive page, the techniques and tools used to be interactive | 1, 1, 0.5 | 2.5 |
| 4. Innovation | Additional work adding value (e.g., new feature, advanced tool use) | 10 | 10 |
| 5. Evaluation | Code inspection and walkthrough | 5 | 5 |
| Reflection (rubric only) | No description given | 5 | 5 |

The rubric levels carry points only, no descriptors: Iteration 3 is 10/8/4/2, Iterations 4 and 5 are 2.5/2/1/0.5, Innovation is 10/8/6/4, Evaluation and Reflection are 5/4/2/1.

### Report structure

12pt Times New Roman. The template is mislabelled "Assessment 2" and keeps the peer-review header fields.

Header: module code, title, student name and ID, module instructor, author name, reviewer name, date.

1. Table of contents
2. **Summary**: 250 words.
3. **Enhanced based on peer review**: list the actionable recommendations from the review, and the recommendations that are not applicable.
4. **Development**: details of the new features and advancement in the second phase, under Iteration 3, Iteration 4 and Iteration 5.
5. **Innovation**: features "not in normal case of single GitHub pages", for example a database; features beyond class coverage.
6. **Evaluation**: code inspection and walkthrough, and any other method used.
7. **References** in APA style.

## Phase 1 feedback to address

Assessment 1 scored 12/15 (feedback released 14 October 2026).

| Area | Mark | Comment | Response in Phase 2 |
| --- | --- | --- | --- |
| Discovery | 2/3 | "The discovery process should be based on real-world cases, including scenarios, personas, and existing case reviews. Currently, the requirements are determined solely by the developer." | Write personas and scenarios, review existing portfolios, and derive the Phase 2 requirements from them |
| Design | 3/3 | "The structure is good. However, a clear human-centred design approach is needed." | Tie each design decision to a persona or scenario |
| Development, iterations 1 and 2 | 2/3 each | "The code structure should be explained in the code comments." | `@file` header on every file plus JSDoc on exported functions; explain structure, not syntax |
| Evaluation | 3/3 | "The review can be more structured and academic." | Use a named inspection method with a checklist and a recorded walkthrough |
| Overall | | "Requirements should be gathered based on scenarios and personas, and the code should include more comments and be divided into clear sections." | Folder-per-concern structure under `site/src/` |

## Peer review to address

A classmate's review of the Phase 1 report (dated 22 October 2026) arrived on 10 November. The PDF stays out of this repository. It feeds report section 3, "Enhanced based on peer review". Its recommendations, in the reviewer's priority order:

| # | Recommendation | State in Phase 2 |
| --- | --- | --- |
| 1 | Add a Readme page to the site that explains pages, build and folders; the brief asks for it and Phase 1 had none | to do: no such route yet |
| 2 | Add two personas and four scenarios, and trace every feature to one | to do; same point as the lecturer's Discovery comment. The reviewer's own walkthrough used a module assessor and a hiring manager |
| 3 | Analyse the lecturer's provided portfolio: what it has, what was kept or dropped, and why | to do, in the report |
| 4 | Add a module view recovered from the code (files and imports), and show tests in the block diagram | to do, in the report |
| 5 | Header comment in every module; fix the seven logged defects | header comments done. Defects: see below |
| 6 | Run the build and tests in GitHub Actions on every push | lint, format, type check and build run; no tests exist in Phase 2 yet |
| 7 | Move the articles out of code into Markdown; refactor the chat module | partly: articles are separate HTML files loaded on demand; chat is an external store with a typed status |
| 8 | Split the README into technical documentation and working notes | to do: this file still mixes both |
| | Thin galleries (three photos, one video, three projects): add case studies, photos and videos | to do; content is mine to supply |

The seven defects were logged against Phase 1 files that the React rewrite replaced:

| Defect | Phase 1 problem | Phase 2 |
| --- | --- | --- |
| D1 | Status text "3 of 3 projects shown." typed by hand | fixed: `CollectionFilter` computes the counts |
| D2, D3 | Skills parsed from `data-skills` on every click; missing null check | not applicable: data comes from JSON imports, no DOM contract |
| D4 | Chat states as free strings in mutable module state | partly: `ChatStatus` is a typed union; the store is still module state by design |
| D5 | Chat activates on import, so it cannot be tested without a page | fixed: importing `chat/loader.ts` does nothing; `useChat` calls `load` from an effect |
| D6 | Undocumented HTML contract; magic string "All" in four files | fixed: `everyTag` constant, no HTML contract |
| D7 | Browser scripts listed by hand in the build | not applicable: Vite bundles from imports |

Recommendations not applicable go in the same report section, with the reason.

## Requirements and where each one lives

| Requirement | Where | State |
| --- | --- | --- |
| Fully populated | All Phase 1 pages ported: Home, About, Education, Professional knowledge, Pictures, Video, Blog with both articles, Contact, plus a new Repositories page | done |
| Modular structure | `site/src/{api,chat,components,data,hooks,pages,state,types}`, one concern per folder | done |
| JSON-driven data | `site/src/data/*.json`: profile, education, projects, photos, videos, posts, navigation. Article text is HTML in `site/src/data/articles/` | done |
| API connection | `site/src/api/github.ts`, shown on the Repositories page, with loading and failure states | done |
| GSAP | `site/src/hooks/useReveal.ts`: staggered entrance on lists, skipped when the visitor prefers reduced motion | done; more to consider |
| PropTypes or TypeScript | TypeScript, strict | done |
| JSDoc headers | `@file` header on every source file, JSDoc on non-obvious functions | done; keep up |
| Lazy loading | One chunk per route (`React.lazy` in `site/src/App.tsx`), article text downloaded on demand, `loading="lazy"` on gallery images, video loads metadata only | done |
| Search and filter | `site/src/components/CollectionFilter.tsx` on projects, blog and pictures | done |
| State management | `useReducer` + context in `site/src/state/`: one filter per collection, kept across navigation. Chat status is an external store read with `useSyncExternalStore` | done |
| CI/CD | `.github/workflows/cs5709-portfolio.yml` at the repository root: lint, format check, type check, build, then deploy on `main` | done; pipeline documentation to write |
| Live site deployed by GitHub Actions | GitHub Pages, which the brief names for Iteration 5 | live since 10 November |
| README | this file | in progress |

## Source layout

```
site/
  public/assets/        images and the video, served as they are
  src/
    main.tsx            browser entry point
    App.tsx             route table; every page is a lazy chunk
    api/                calls to outside services (GitHub)
    chat/               Tawk.to loader: consent, loading states, failure
    components/         pieces shared by pages (Layout, Page, CollectionFilter, ...)
    data/               all content, as JSON and article HTML
    hooks/              React glue: useFilter, useChat, useReveal
    pages/              one file per route
    state/              filter state, reducer and matching rules
    types/              shapes of outside data
```

## Run locally

```sh
cd site
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build
npm run preview
```

Requires Node 22+. Stack: Vite 8, React 19, TypeScript 7, React Router 7, GSAP 3.

## Checklist

### Before building further

- [x] Copy the full brief, rubric and dropbox link into this file.
- [x] Host for the Actions deployment: GitHub Pages, named in the brief.
- [x] Get the peer review of the Phase 1 report and list its recommendations.
- [ ] Add a Readme page to the site (peer review item 1, and "readme" in the brief).
- [ ] Write personas and scenarios (Phase 1 lost a Discovery mark for lacking them).
- [ ] Decide the innovation feature (10 marks, the largest open item).

### Iteration 3: port and extend

- [x] Move the remaining Phase 1 pages to React: About, Education, Pictures, Video, Blog and both articles, Contact.
- [x] Move their content into JSON under `site/src/data/`.
- [x] Bring back the Tawk.to chat with its click-to-load notice (failure path checked with the provider blocked; a real conversation still to test on the live site).
- [x] Extend search and filter to the blog and the gallery; add an enlarged view for photos.
- [x] Lazy-load images and the video.
- [x] Port the Phase 1 stylesheet; all 12 routes checked at 390px and 1440px on 10 November: no horizontal overflow, no broken images, one active navigation item, no script errors.
- [ ] Phase 1 features not carried over: the 26 automated tests, the external link checker and the speculation-rules prefetch. Decide which to bring back.

### Iteration 4: CI/CD

- [x] Lint, type check and build on every push that touches this folder.
- [x] Deploy job: `main` pushes publish the build to GitHub Pages.
- [ ] Describe the pipeline for the report (1 of the 2.5 marks is for its documentation).

### Iteration 5: live site

- [x] Deploy from GitHub Actions and record the URL here.
- [x] Make deep links such as `/knowledge` work on the host: the build copies `index.html` to `404.html`. Verified live on 10 November; the page renders, but GitHub answers such addresses with HTTP status 404.

### Evaluation and report

- [ ] Record test commands, results and screenshots under `evidence/`.
- [ ] Report: reuse the `report/pdf.mjs` pipeline from Assignment 1.
- [ ] Summary, reflection and critique, written by Chirag.
- [ ] Evaluation: code inspection and walkthrough with a named method.

## Deployment

The brief asks for "a GitHub page", so the workflow publishes to GitHub Pages (source: GitHub Actions). On every push to `main` that touches `site/`, the `check` job lints, checks formatting, type checks and builds, then uploads `dist/`; the `deploy` job publishes it. Pull requests and other branches run the checks only.

Pages serves the repository under `/ul-university-notes/`. The workflow reads that path from the Pages configuration and passes it to Vite as `BASE_PATH`; the router takes the same value as its `basename`. Local builds use `/`.

A database or other backend, which the brief gives as an innovation example, can still live on Appwrite.

## Transparency

The scaffold is AI-assisted, as in Phase 1, and must be disclosed in the report declaration. Content is reused from Phase 1, which adapted it from the original portfolio.
