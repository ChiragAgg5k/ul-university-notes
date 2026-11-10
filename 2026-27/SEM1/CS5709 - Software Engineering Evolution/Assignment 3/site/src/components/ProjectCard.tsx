/**
 * @file One project with its problem, contribution, decision and evidence.
 */
import type { Project } from '../types/Project.ts';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <p className="eyebrow">{project.category}</p>
      <h2>{project.title}</h2>
      <p>{project.problem}</p>
      <p>{project.contribution}</p>
      <p>{project.decision}</p>
      <p>{project.evidence}</p>
      <ul className="tags" aria-label="Skills">
        {project.skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <a href={project.url}>{project.label}</a>
    </article>
  );
}
