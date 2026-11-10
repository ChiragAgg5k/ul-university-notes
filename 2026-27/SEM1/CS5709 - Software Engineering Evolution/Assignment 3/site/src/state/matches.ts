/**
 * @file Decides whether a project passes the current search text and skill.
 */
import type { Project } from '../types/Project.ts';
import { everySkill } from './PortfolioContext.ts';
import type { PortfolioState } from './PortfolioContext.ts';

export function matches(project: Project, { query, skill }: PortfolioState): boolean {
  const hasSkill = skill === everySkill || project.skills.includes(skill);
  const text = [project.title, project.category, project.problem, ...project.skills]
    .join(' ')
    .toLowerCase();
  return hasSkill && text.includes(query.trim().toLowerCase());
}
