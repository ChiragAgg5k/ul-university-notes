import { projects, skills } from './projects.mjs';

const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
export const knowledge = `
<p class="lead">From a skill to the work behind it.</p>
<p>Choose a skill to see concrete examples, engineering decisions and links to the original work. These summaries distinguish existing professional work from this assignment.</p>
<fieldset class="filters" data-project-filter hidden>
  <legend>Filter projects by skill</legend>
  ${['All', ...skills].map(skill => `<button type="button" data-skill="${escape(skill)}" aria-pressed="${skill === 'All'}">${escape(skill)}</button>`).join('\n')}
</fieldset>
<p role="status" data-filter-status>3 of 3 projects shown.</p>
<div class="project-list">
${projects.map(project => `<article class="case-study" data-skills="${escape(JSON.stringify(project.skills))}">
  <p class="eyebrow">${escape(project.category)}</p>
  <h2>${escape(project.title)}</h2>
  <p class="skill-list">${project.skills.map(escape).join(' · ')}</p>
  <dl>
    <dt>The problem</dt><dd>${escape(project.problem)}</dd>
    <dt>Contribution</dt><dd>${escape(project.contribution)}</dd>
    <dt>Technical decision and trade-off</dt><dd>${escape(project.decision)}</dd>
    <dt>Evidence and limitations</dt><dd>${escape(project.evidence)}</dd>
  </dl>
  <a href="${escape(project.url)}">${escape(project.label)} →</a>
</article>`).join('\n')}
</div>
<script type="module" src="filter.mjs"></script>`;

export const staticArticle = `
<p class="eyebrow">Development note · AI-assisted draft for student review</p>
<p class="lead">A portfolio can be simple to run without being a single page or a pile of duplicated HTML.</p>
<p>This assignment version uses a small Node build script, shared CSS and standard document links. It is not a migration of the production portfolio. It is a separate implementation with a narrower purpose: make the required pages and design decisions easy to inspect.</p>
<h2>What happens at build time?</h2>
<p>The build script combines each page’s content with a shared document layout. That layout supplies the page title, navigation, skip link and footer. The script writes complete HTML files into <code>dist</code> and copies the stylesheet, images and optional browser modules alongside them.</p>
<p>The deployed site therefore does not need a Node process to render each request. Appwrite Sites serves the generated files. Changing content still requires a rebuild and a deployment; static does not mean maintenance-free.</p>
<h2>Why use separate documents?</h2>
<p>Each page has its own address. A visitor can open the education page directly, refresh it or use the browser’s Back button without a client-side router. The cost is a full document navigation between pages. For a small, mostly textual portfolio, that is a reasonable trade-off.</p>
<h2>Where JavaScript earns its place</h2>
<p>The professional knowledge page has a skill filter. All projects are present in the initial HTML. Once JavaScript loads, filter buttons become available and hide projects that do not match the selected skill. The control uses ordinary buttons, exposes its pressed state and updates a live result count.</p>
<p>If scripts fail or are disabled, the visitor still gets the complete evidence list. The filter is an enhancement rather than a prerequisite for reading the portfolio.</p>
<h2>What the tests establish and what they do not</h2>
<p>The automated checks verify required documents, local links and assets, heading structure and active navigation. Unit tests cover filter matching. Browser checks are still needed to establish that keyboard controls, responsive layouts and real interactions work after deployment.</p>
<p>A passing test suite cannot supply missing content. Video playback remains outstanding. Chat now uses a hosted Tawk.to widget; a two-way exchange with the owner still needs verification. Nor does testing a filter prove the site meets every accessibility criterion.</p>
<h2>How the design could evolve</h2>
<p>A content management system could make frequent updates easier, but would add authentication, storage and operational responsibilities. Messaging uses Tawk.to, a service beyond the static documents. The widget loads only when a visitor opens chat, after a short privacy notice. Delivery, owner availability and the provider’s data handling remain concerns beyond simply embedding a script.</p>
<p>The principle is to add complexity for an identified requirement, not to make the technology list longer.</p>
<h2>References</h2>
<ul><li><a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview">MDN: client-server overview</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement">MDN: progressive enhancement</a></li><li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">WAI-ARIA: button pattern</a></li><li><a href="https://appwrite.io/docs/products/sites">Appwrite Sites documentation</a></li></ul>
<p><a href="blog.html">← All writing</a></p>`;
