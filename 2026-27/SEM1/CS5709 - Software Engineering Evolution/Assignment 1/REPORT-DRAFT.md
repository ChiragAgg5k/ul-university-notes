# Digital portfolio: Phase 1

**CS5709: Software Engineering Evolution · University of Limerick · 2026/27 Semester 1**

Student: Chirag Aggarwal  
Student ID: **[student to provide]**  
Submission date: **[confirm]**  
Live site: https://chirag-cs5709.appwrite.network  
Source: https://github.com/ChiragAgg5k/ul-university-notes

> Working report draft, not the final PDF. Outstanding functionality and unreviewed statements are identified explicitly. Page limits and contents pagination must be checked after PDF layout.

## Table of contents

1. Declaration and transparency
2. Abstract
3. Discovery, narrative, iterative plan and tools
4. Design
5. Code listing
6. Critique, innovation and reflection
7. References

## 1. Declaration and transparency (proposed wording for review)

This portfolio adapts biographical information, education, photographs and an article excerpt from my existing public portfolio. These materials predate this assessment and are not presented as newly created coursework. The original source and commit are recorded in the project README.

An AI coding assistant helped interpret the brief, generate implementation and documentation drafts, run tests and deploy the site. The new technical blog note is labelled AI-assisted. **Before submission, I must review the implementation, confirm the factual content, understand the code and ensure this assistance and reuse comply with module policy.** This draft is not a signed declaration of work already reviewed.

## 2. Abstract

The project is a digital portfolio presenting education, professional knowledge, photographs and writing. A Node build script generates separate HTML documents from shared layout and content modules; Appwrite Sites hosts the generated output. Plain CSS provides responsive presentation, while a small JavaScript enhancement lets visitors filter engineering examples by skill. Source and supporting documentation are stored together to make design decisions and testing traceable. At this draft stage, a relevant video remains incomplete. Hosted Tawk.to chat is integrated, with owner receipt and a two-way reply still awaiting confirmation. The final abstract must be revised to describe the submitted system rather than the intended system.

## 3. Discovery, narrative, iterative plan and tools

**Target length: at most one page combined, pending clarification of the brief.**

### Discovery and narrative

The intended users are the assessor and potential professional collaborators. They need clear evidence of education, experience and technical work, not only a list of technologies. Home introduces the author; About and Education provide background. Professional knowledge connects skills to concrete examples and evidence links. Pictures presents captioned event photographs. Blog provides an existing article excerpt and a complete technical development note. The video page discloses missing content. Contact provides email and a real hosted chat widget loaded only when the visitor chooses to open it.

| Feature group | Phase 1 | Proposed Phase 2 |
|---|---|---|
| Profile | Home, About, Education, shared navigation | Richer module/project evidence |
| Professional evidence | Three structured examples and skill filter | Search and additional case studies |
| Media/writing | Pictures, relevant video, readable blog | Media filtering, tags and CMS |
| Communication | Real instant messaging | History, moderation and notifications |
| Quality | Responsive CSS, keyboard usability, tests | Broader user evaluation |

### Lightweight iterative plan

Work proceeds in one continuous session rather than separate calendar days. The first milestone establishes the discovery checklist, diagrams, shared document layout, pages and deployment. It already contains styling; a separate historical unstyled milestone is not claimed. The next milestone improves project evidence, adds the filter and technical article, and verifies browser behaviour. Remaining work completes video and verifies two-way messaging, then revises diagrams and evaluation against the final implementation before PDF export.

### Tools and techniques

Node.js and its filesystem API generate static output. HTML supplies semantic documents and links; CSS supplies presentation and responsive layouts; browser JavaScript provides progressive enhancement. Node's test runner checks structural and filter behaviour. Playwright supports browser verification and screenshots. Git records milestones, GitHub hosts source, and the Appwrite CLI deploys to an isolated Singapore-region site. Mermaid notation documents architecture and flow. No framework or third-party JavaScript runtime dependency is required by the current implementation.

## 4. Design

**Target length: maximum two pages including three diagrams.**

Insert the rendered diagrams from `DESIGN.md`, updating them after messaging integration.

### Structure and responsibility

`build.mjs` owns document assembly and output generation. The shared layout supplies navigation, current-page state, main content and footer. `projects.mjs` contains structured project evidence and a pure matching function; `content.mjs` renders that evidence and the development article. `filter.mjs` handles project filtering. `navigation.mjs` supplies optional browser-native page preparation. `chat.mjs` loads the hosted widget on an explicit click and handles loading failures. `style.css` defines shared visual rules. Generated files are excluded from Git because they can be rebuilt.

Every main section has a real HTML URL. This avoids a client-side router and preserves normal refresh, link and Back behaviour. The trade-off is a complete document navigation between pages. A shared build-time layout reduces repetition but a defect in it can affect every page, motivating per-document tests.

### Innovation: skills linked to evidence

Rather than present an isolated list of skills, the knowledge page links each skill to project examples with problem, contribution, decision and evidence sections. Selecting a skill filters this evidence list. Ordinary buttons expose their selected state using `aria-pressed`; a status region announces the result count. The filter is deliberately a small portfolio-specific enhancement, not a claim of a novel algorithm.

All evidence is rendered before scripts run. The filter controls are initially hidden and are exposed only when the enhancement loads. If JavaScript is unavailable, the visitor still sees all examples. User-provided HTML is not accepted, and dynamic status text uses `textContent`.

### Deployment and boundaries

The assignment site has its own Appwrite site ID and domain. It does not replace the production portfolio. Static output contains no API keys. External links and mail links leave the application; email is explicitly not described as instant messaging. Tawk.to provides messaging and the owner inbox. Its script is not requested until the visitor first opens chat, after a privacy notice. That choice is remembered in sessionStorage so subsequent active pages can load the widget in the background. Prerendered pages wait for activation, and blocked storage preserves the click-to-load fallback. A 20-second timeout and script-error handler provide an email fallback. Public widget IDs are stored in source, not secret credentials. Conversation access, retention, moderation and owner availability depend on provider configuration and require owner review.

## 5. Code listing

The complete listing of authored source will be generated after final implementation. Include `build.mjs`, `content.mjs`, `projects.mjs`, `filter.mjs`, `navigation.mjs`, `chat.mjs`, `style.css`, tests, package configuration and deployment configuration. Do not print generated `dist` copies, binary photographs or dependency directories as source code. Keep the repository link alongside the listing, not as a substitute for the full listing requested by the brief.

## 6. Critique, innovation and reflection

**Critique target: maximum one page. Personal reflection is not yet written.**

### Strengths

Separate HTML documents make routes transparent and keep core content independent of browser scripting. Shared layout and styles give the pages consistent navigation and presentation without a framework dependency tree. Structured evidence is more informative than a technology inventory. Tests and live-browser checks are recorded separately so structural checks are not mistaken for full end-to-end verification.

### Limitations and improvements

The current implementation lacks the required video. Messaging is integrated, but a visitor-side test is not proof of owner receipt or a successful two-way conversation. The blog includes a reused excerpt and an AI-assisted draft, so student review and accurate attribution remain important. Some content is embedded as HTML strings in the build script; this keeps the toolchain small but becomes harder to edit as pages grow. A future content layer could improve maintainability, although adopting a CMS would add authentication and operational responsibilities.

The current tests do not establish WCAG conformance, real-user usability or messaging reliability. Browser testing observed a provider session request fail with HTTP 500 before a reload succeeded. Background loading reduces repeated click latency but cannot resolve provider outages. A manual keyboard pass, contrast checks and representative browser flows should complement them. The filter relies on JavaScript, but its no-script fallback intentionally preserves all content. Deployments are manual; a narrowly scoped CI build/test/deploy pipeline could reduce release mistakes. Media permission and factual accuracy should be reviewed by the student before submission.

### Personal reflection (student to complete)

Use actual experience rather than invented feelings or learning claims:

- Which design decision can you explain and defend personally?
- Which code or generated content did you correct after reviewing it?
- What did the tests miss, and what did browser verification reveal?
- How did adapting an existing portfolio differ from presenting it unchanged?
- What would you change next, and why?

## 7. References

- CS5709 Assessment 1 instructions and expanded rubric, University of Limerick Brightspace, accessed during this project. Authenticated link in README.
- Aggarwal, C., existing portfolio repository, https://github.com/chiragagg5k/profile-website, baseline commit `70f641f3ccbdfe146d2fbcc968437afac98464c8`.
- Aggarwal, C., “How I built the Appwrite MCP server”, https://www.chiragaggarwal.tech/blog/how-i-built-the-appwrite-mcp-server.
- Appwrite CLI repository, https://github.com/appwrite/cli.
- MDN Web Docs, “Progressive enhancement”, https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement.
- W3C WAI-ARIA Authoring Practices, “Button pattern”, https://www.w3.org/WAI/ARIA/apg/patterns/button/.
- Node.js documentation, “Test runner”, https://nodejs.org/api/test.html.
- Appwrite documentation, “Sites”, https://appwrite.io/docs/products/sites.
- Tawk.to, JavaScript API documentation, https://developer.tawk.to/jsapi/.
- Tawk.to, privacy policy, https://www.tawk.to/privacy-policy/.

Verify reference format and access dates against the module's required style before final export.
