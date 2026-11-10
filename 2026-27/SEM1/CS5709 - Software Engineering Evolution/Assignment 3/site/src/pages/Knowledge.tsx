/**
 * @file Project case studies from `data/projects.json`, searchable and filterable by skill.
 */
import { CollectionFilter } from '../components/CollectionFilter.tsx';
import { Page } from '../components/Page.tsx';
import { ProjectCard } from '../components/ProjectCard.tsx';
import projects from '../data/projects.json';
import { useFilter } from '../hooks/useFilter.ts';
import { useReveal } from '../hooks/useReveal.ts';
import { distinctTags, matches } from '../state/matches.ts';

const skills = distinctTags(projects);

export default function Knowledge() {
  const { filter } = useFilter('projects');
  const visible = projects.filter(project =>
    matches([project.title, project.category, project.problem], project.tags, filter),
  );
  const list = useReveal<HTMLDivElement>(visible.length);
  return (
    <Page title="Engineering in practice">
      <p className="lead">Projects, tools and technical decisions.</p>
      <p>Search or choose a skill to explore my work at Appwrite and this coursework project.</p>
      <CollectionFilter
        collection="projects"
        legend="Find a project"
        tags={skills}
        shown={visible.length}
        total={projects.length}
      />
      <div ref={list}>
        {visible.map(project => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Page>
  );
}
