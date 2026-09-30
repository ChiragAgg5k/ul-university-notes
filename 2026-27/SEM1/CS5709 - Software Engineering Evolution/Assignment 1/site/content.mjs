import { projects, skills } from './projects.mjs';

const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
export const knowledge = `
<p class="lead">Projects, tools and technical decisions.</p>
<p>Choose a skill to explore my work at Appwrite and this coursework project.</p>
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
    <dt>Design choice</dt><dd>${escape(project.decision)}</dd>
    <dt>What to look at</dt><dd>${escape(project.evidence)}</dd>
  </dl>
  <a href="${escape(project.url)}">${escape(project.label)} →</a>
</article>`).join('\n')}
</div>
<script type="module" src="filter.mjs"></script>`;

export const staticArticle = `
<p class="eyebrow">Development note · AI-assisted draft for student review</p>
<p class="lead">This portfolio uses a small Node build script, shared CSS and ordinary links.</p>
<p>It’s a separate coursework project, not a replacement for my production site. The small codebase keeps the required pages and design decisions easy to inspect.</p>
<h2>What happens at build time?</h2>
<p>The build script combines each page’s content with a shared document layout. That layout supplies the page title, navigation, skip link and footer. The script writes complete HTML files into <code>dist</code> and copies the stylesheet, images and optional browser modules alongside them.</p>
<p>Appwrite Sites serves the generated files without a Node process for each request. Content changes still need a rebuild and deployment.</p>
<h2>Why use separate documents?</h2>
<p>Each page has its own address. A visitor can open the education page directly, refresh it or use the browser’s Back button without a client-side router. The cost is a full document navigation between pages. For a small, mostly textual portfolio, that is a reasonable trade-off.</p>
<h2>The skill filter</h2>
<p>The professional knowledge page has a skill filter. All projects are present in the initial HTML. Once JavaScript loads, filter buttons become available and hide projects that do not match the selected skill. The control uses ordinary buttons, exposes its pressed state and updates a live result count.</p>
<p>If scripts fail or are disabled, all projects remain readable.</p>
<h2>Testing and unfinished work</h2>
<p>The automated checks verify required documents, local links and assets, heading structure and active navigation. Unit tests cover filter matching. Browser checks are still needed to establish that keyboard controls, responsive layouts and real interactions work after deployment.</p>
<p>The video gallery is unfinished. Tawk.to chat messages reached the owner inbox, but intermittent session failures still block reliable testing of replies. The tests are not a full accessibility audit.</p>
<h2>How the design could evolve</h2>
<p>A CMS could simplify frequent updates, at the cost of managing authentication and storage. Chat already depends on an external service: Tawk.to. Visitors choose when to start it; later pages in the same tab load it in the background. Replies depend on owner availability, and messages are handled by the provider.</p>
<h2>References</h2>
<ul><li><a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview">MDN: client-server overview</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement">MDN: progressive enhancement</a></li><li><a href="https://www.w3.org/WAI/ARIA/apg/patterns/button/">WAI-ARIA: button pattern</a></li><li><a href="https://appwrite.io/docs/products/sites">Appwrite Sites documentation</a></li></ul>
<p><a href="blog.html">← All writing</a></p>`;
