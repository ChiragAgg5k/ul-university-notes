# Assessment 3: working notes

Assessment material that is not technical documentation: what is left to do, the brief, the marks and the feedback being answered. The technical document is [site/README.md](site/README.md).

Deadline: **Tue 17 November 2026, 23:59** on Brightspace. [Assignment and rubric](https://learn.ul.ie/d2l/lms/dropbox/user/folder_submit_files.d2l?db=51833&grpid=0&isprv=0&bp=0&ou=91640), copied on 10 November 2026.

## Left to do before submitting

State on 10 November 2026: the site, the pipeline, the innovation, the evaluation evidence and the factual parts of the report are done. What remains is mine to write or decide.

1. **Write the four boxed sections of the report** in `report/report.md` (each is a `<div class="todo">` with the supporting facts listed): the summary (250 words), the note on the lecturer's portfolio (peer recommendation 3), the critique, and the reflection. Replace each box with prose, then run `node report/pdf.mjs`; it reports the summary word count and how many boxes are left.
2. **Lecturer's portfolio.** Open it on Brightspace and either analyse it in half a page or state that Phase 1 did not start from it.
3. **Read the report through** and check the things drafted with AI assistance: the three personas, the review of other people's portfolios, the references (APA), and the declaration.
4. **Check two content edits** made during the port: the third project card was reworded to describe Phase 1, and the photos were tagged "Hackathon" or "Conference".
5. **Reaction counts on the live site are test data** from the walkthrough runs (the logging article). Decide whether to clear the `reactions` table in the Appwrite console before submitting; the report's figures quote the current numbers.
6. **Hold one real chat conversation** on the live site and confirm it reaches the Tawk.to inbox. The walkthrough only confirms that the widget loads after consent.
7. **Submit** on Brightspace: the PDF from `report/dist/`, with the live URL and the repository link in the comment.

Optional, if time allows: more photos, a second video or a fourth case study (both reviews call the galleries thin); the three open minor defects I5 to I7 in the report's defect log.

## Decisions taken, to review

- Phase 2 is a fresh React application, not an evolution of the Phase 1 code or of the lecturer's portfolio.
- Innovation: article reactions in an Appwrite database (`cs5709-portfolio`, table `reactions`, in the project that hosts Phase 1) with live counts. A web platform for `chiragagg5k.github.io` was added to that project so the browser may call it.
- Unit tests were brought back (19, Node test runner) because the peer review asked for tests in the pipeline. The Phase 1 link checker and the speculation-rules prefetch were not carried over.
- Articles stay as HTML files, not Markdown.

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

The peer review of the Phase 1 report arrived on 10 November. Its PDF stays out of this repository, and the reviewer is named only in the built report (`report/private.json`, not committed). Every recommendation and its outcome is in section 2 of the report.

## Transparency

The site and the report's factual sections are AI-assisted, as in Phase 1, and the report's declaration says so. Content is reused from Phase 1, which adapted it from the original portfolio.
