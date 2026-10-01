import { escape } from '../html.mjs';
import { projects, skills } from '../projects.mjs';

const body = `
<p class="lead">Projects, tools and technical decisions.</p>
<p>Choose a skill to explore my work at Appwrite and this coursework project.</p>
<fieldset class="filters" data-project-filter hidden>
  <legend>Filter projects by skill</legend>
  ${['All', ...skills].map(skill => `<button type="button" data-skill="${escape(skill)}" aria-pressed="${skill === 'All'}">${escape(skill)}</button>`).join('\n')}
</fieldset>
<p role="status" data-filter-status>3 of 3 projects shown.</p>
<div class="project-list">
${projects
  .map(
    project => `<article class="case-study" data-skills="${escape(JSON.stringify(project.skills))}">
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
</article>`,
  )
  .join('\n')}
</div>
<script type="module" src="filter.mjs"></script>`;

export default {
  file: 'knowledge.html',
  label: 'Professional knowledge',
  title: 'Engineering in practice',
  body,
};
