/**
 * @file Shape of one project entry in `data/projects.json`.
 */
export interface Project {
  title: string;
  category: string;
  skills: string[];
  problem: string;
  contribution: string;
  decision: string;
  evidence: string;
  url: string;
  label: string;
}
