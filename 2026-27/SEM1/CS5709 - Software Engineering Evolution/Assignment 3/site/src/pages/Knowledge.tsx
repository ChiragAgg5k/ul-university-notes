/**
 * @file Project evidence from `data/projects.json`, searchable and filterable by skill.
 */
import { ProjectCard } from '../components/ProjectCard.tsx';
import { ProjectFilter } from '../components/ProjectFilter.tsx';
import projects from '../data/projects.json';
import { usePortfolio } from '../hooks/usePortfolio.ts';
import { useReveal } from '../hooks/useReveal.ts';
import { matches } from '../state/matches.ts';

const skills = [...new Set(projects.flatMap(project => project.skills))];

export default function Knowledge() {
  const { state } = usePortfolio();
  const visible = projects.filter(project => matches(project, state));
  const list = useReveal<HTMLDivElement>(visible.length);
  return (
    <>
      <h1>Professional knowledge</h1>
      <ProjectFilter skills={skills} />
      <p role="status">
        Showing {visible.length} of {projects.length} projects
      </p>
      <div className="cards" ref={list}>
        {visible.map(project => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </>
  );
}
