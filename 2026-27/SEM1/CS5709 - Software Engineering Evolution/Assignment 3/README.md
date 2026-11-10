# Assessment 3: Digital portfolio (Phase 2)

CS5709: Software Engineering Evolution · 30% (the brief also says 35% once) · deadline: **Tue 17 November 2026, 23:59** on Brightspace. Status: **scaffolded, not submitted**.

Phase 2 evolves the [Phase 1 static site](../Assignment%201/README.md) into a React application. Phase 1 stays as it is, at its own URL, so the report can compare the two.

> The requirements below come from my notes of the brief taken on 9 November. The full brief and rubric still need copying in from the Brightspace dropbox; check them before building further.

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
| CI/CD | `.github/workflows/cs5709-portfolio.yml` at the repository root: lint, type check, build | CI only; deploy job to add |
| Live site deployed by GitHub Actions | not chosen yet | to do |
| README | this file | in progress |

## Marks

| Item | Marks |
| --- | --- |
| Iteration 3 | 10 |
| Iteration 4: CI/CD | 2.5 |
| Iteration 5: live site | 2.5 |
| Innovation | 10 |
| Evaluation | 5 |

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

- [ ] Copy the full brief, rubric and dropbox link into this file.
- [ ] Decide the host for the Actions deployment (see below).
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
- [ ] Reflection and critique, written by Chirag.

## Deployment options

- **Appwrite Sites, new site `cs5709-portfolio-phase2`**: same host as Phase 1 and supports a single-page fallback. Needs an API key stored as a GitHub Actions secret.
- **GitHub Pages**: no secret needed, but the site sits under `/ul-university-notes/`, so Vite's `base` and the router's `basename` must be set and deep links need a `404.html` copy.

## Transparency

The scaffold is AI-assisted, as in Phase 1, and must be disclosed in the report declaration. Content is reused from Phase 1, which adapted it from the original portfolio.
