# Assessment 3: Digital portfolio (Phase 2)

CS5709: Software Engineering Evolution · deadline: **Tue 17 November 2026, 23:59** on Brightspace. Status: **scaffolded and live, not submitted**.

Live site: https://chiragagg5k.github.io/ul-university-notes/

[Assignment and rubric](https://learn.ul.ie/d2l/lms/dropbox/user/folder_submit_files.d2l?db=51833&grpid=0&isprv=0&bp=0&ou=91640) · brief and rubric copied from Brightspace on 10 November 2026.

Phase 2 evolves the [Phase 1 static site](../Assignment%201/README.md) into a React application. Phase 1 stays as it is, at its own URL, so the report can compare the two.

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

The peer review a classmate wrote of the Phase 1 report is also needed for section 3; it is not in this repository yet.

## Requirements and where each one lives

| Requirement | Where | State |
| --- | --- | --- |
| Modular structure | `site/src/{api,components,data,hooks,pages,state,types}` | scaffolded |
| JSON-driven data | `site/src/data/projects.json` (converted from Phase 1 `projects.mjs`) | projects only; education, blog, pictures and videos to move |
| API connection | `site/src/api/github.ts`, shown on the Repositories page | working; choice of API to confirm |
| GSAP | `site/src/hooks/useReveal.ts` (respects reduced motion) | one entrance animation |
| PropTypes or TypeScript | TypeScript, strict | done |
| JSDoc headers | `@file` header on every source file | keep up as files are added |
| Lazy loading | `React.lazy` per route in `site/src/App.tsx`; one chunk per page | done for routes; images to follow |
| Search and filter | `site/src/components/ProjectFilter.tsx`, `site/src/state/matches.ts` | working on projects |
| State management | `useReducer` + context in `site/src/state/`; the filter survives navigation | done |
| CI/CD | `.github/workflows/cs5709-portfolio.yml` at the repository root: lint, format check, type check, build, then deploy on `main` | done; pipeline documentation to write |
| Live site deployed by GitHub Actions | GitHub Pages, which the brief names for Iteration 5 | live since 10 November |
| README | this file | in progress |

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
- [ ] Get the peer review of the Phase 1 report and list its recommendations.
- [ ] Write personas and scenarios (Phase 1 lost a Discovery mark for lacking them).
- [ ] Decide the innovation feature (10 marks, the largest open item).

### Iteration 3: port and extend

- [ ] Move the remaining Phase 1 pages to React: About, Education, Pictures, Video, Blog and both articles, Contact.
- [ ] Move their content into JSON under `site/src/data/`.
- [ ] Bring back the Tawk.to chat with its click-to-load notice.
- [ ] Extend search and filter to the blog and the gallery.
- [ ] Lazy-load images and the video.
- [ ] Port the rest of the Phase 1 stylesheet; check 390px and 1440px.

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
