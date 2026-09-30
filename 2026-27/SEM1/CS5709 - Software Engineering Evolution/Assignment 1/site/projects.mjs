// Summaries of existing public work, not claims of new coursework.
export const projects = [
  {
    title: 'Appwrite CLI', category: 'Developer tooling', skills: ['Go', 'APIs'],
    problem: 'Developers need a repeatable way to manage Appwrite resources and deployments from their terminal.',
    contribution: 'My published portfolio records rewriting the Appwrite CLI in Go and maintaining SDKs across multiple languages.',
    decision: 'A command-line interface makes operations scriptable. The trade-off is that validation, error messages and documentation must work without a visual interface.',
    evidence: 'The public repository provides the implementation and change history. No performance improvement is claimed here without measurements.',
    url: 'https://github.com/appwrite/cli', label: 'Inspect the CLI repository',
  },
  {
    title: 'Hosted Appwrite MCP server', category: 'Protocol integration', skills: ['APIs', 'Authorization'],
    problem: 'AI clients need controlled access to Appwrite capabilities without manually wiring every API endpoint.',
    contribution: 'My published article describes building the resource server and the Cloud integration, alongside the authorization server built by a colleague.',
    decision: 'The hosted transport uses a user-linked authorization model rather than a single-project API key. That changes the permission boundary, not just the transport.',
    evidence: 'The original article explains the implementation and team responsibilities. This summary does not claim sole authorship of the complete authorization system.',
    url: 'https://www.chiragaggarwal.tech/blog/how-i-built-the-appwrite-mcp-server', label: 'Read the engineering account',
  },
  {
    title: 'This digital portfolio', category: 'Software evolution', skills: ['HTML', 'CSS', 'JavaScript'],
    problem: 'An assessed portfolio needs separate pages, traceable design decisions and a source listing small enough to explain.',
    contribution: 'This assignment version is an AI-assisted implementation using existing portfolio material. It is separate from the production website.',
    decision: 'Generate HTML at build time and enhance only the project filter with JavaScript. All project evidence remains readable when scripts are unavailable.',
    evidence: 'The source, tests and design documentation are stored together. Tawk.to provides chat through a click-to-load integration. Video and the final report are still unfinished; the site is not yet submission-ready.',
    url: 'https://github.com/ChiragAgg5k/ul-university-notes', label: 'Inspect the coursework repository',
  },
];

export const skills = [...new Set(projects.flatMap(project => project.skills))];
export function matchesSkill(projectSkills, selected) {
  return selected === 'All' || projectSkills.includes(selected);
}
