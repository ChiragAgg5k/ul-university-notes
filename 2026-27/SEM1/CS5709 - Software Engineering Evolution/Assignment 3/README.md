# Assessment 3: Digital portfolio (Phase 2)

CS5709: Software Engineering Evolution · deadline: **Tue 17 November 2026, 23:59** on Brightspace. Status: **scaffolded, not submitted**.

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

### Run locally

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
- [ ] Add the deploy job.

### Iteration 5: live site

- [ ] Deploy from GitHub Actions and record the URL here.
- [ ] Make deep links such as `/knowledge` work on the host (single-page fallback).

### Evaluation and report

- [ ] Record test commands, results and screenshots under `evidence/`.
- [ ] Report: reuse the `report/pdf.mjs` pipeline from Assignment 1.
- [ ] Summary, reflection and critique, written by Chirag.
- [ ] Evaluation: code inspection and walkthrough with a named method.

## Deployment

The brief asks for "a GitHub page", so the site goes to GitHub Pages from the Actions workflow. It will sit under `/ul-university-notes/`, so Vite's `base` and the router's `basename` must be set, and deep links need a `404.html` copy of `index.html`. A database or other backend, which the brief gives as an innovation example, can still live on Appwrite.

## Transparency

The scaffold is AI-assisted, as in Phase 1, and must be disclosed in the report declaration. Content is reused from Phase 1, which adapted it from the original portfolio.
