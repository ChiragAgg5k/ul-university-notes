/**
 * @file One project as a case study: problem, contribution, design choice and evidence.
 */
import type projects from '../data/projects.json';

export function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="case-study">
      <p className="eyebrow">{project.category}</p>
      <h2>{project.title}</h2>
      <p className="skill-list">{project.tags.join(' · ')}</p>
      <dl>
        <dt>The problem</dt>
        <dd>{project.problem}</dd>
        <dt>Contribution</dt>
        <dd>{project.contribution}</dd>
        <dt>Design choice</dt>
        <dd>{project.decision}</dd>
        <dt>What to look at</dt>
        <dd>{project.evidence}</dd>
      </dl>
      <a href={project.url}>{project.label} →</a>
    </article>
  );
}
