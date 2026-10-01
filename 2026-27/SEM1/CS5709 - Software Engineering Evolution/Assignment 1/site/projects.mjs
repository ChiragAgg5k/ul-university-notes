// Summaries of existing public work, not claims of new coursework.
export const projects = [
  {
    title: 'Appwrite CLI',
    category: 'Developer tooling',
    skills: ['Go', 'APIs'],
    problem:
      'Developers need a repeatable way to manage Appwrite resources and deployments from their terminal.',
    contribution:
      'As described in my original portfolio, I rewrote the CLI in Go and maintain SDKs across multiple languages.',
    decision:
      'A command-line interface makes operations scriptable. The trade-off is that validation, error messages and documentation must work without a visual interface.',
    evidence:
      'The code and change history are in the public repository. Performance hasn’t been measured here.',
    url: 'https://github.com/appwrite/sdk-for-cli',
    label: 'View the CLI source',
  },
  {
    title: 'Hosted Appwrite MCP server',
    category: 'Protocol integration',
    skills: ['APIs', 'Authorization'],
    problem:
      'AI clients need controlled access to Appwrite capabilities without manually wiring every API endpoint.',
    contribution:
      'My article covers the resource server and Cloud integration I built. A colleague built the authorization server.',
    decision:
      'The hosted transport uses a user-linked authorization model rather than a single-project API key. That changes the permission boundary, not just the transport.',
    evidence: 'The article explains how the system works and who built each part.',
    url: 'https://www.chiragaggarwal.tech/blog/how-i-built-the-appwrite-mcp-server',
    label: 'Read the article',
  },
  {
    title: 'This digital portfolio',
    category: 'Software evolution',
    skills: ['HTML', 'CSS', 'JavaScript'],
    problem:
      'The assignment requires separate pages, documented design decisions and a full code listing.',
    contribution:
      'This assignment version is an AI-assisted implementation using existing portfolio material. It is separate from the production website.',
    decision:
      'Generate HTML at build time, then use JavaScript for filtering and chat. Project content stays readable without scripts.',
    evidence: 'The repository contains the code, tests and design notes. Chat uses Tawk.to.',
    url: 'https://github.com/ChiragAgg5k/ul-university-notes',
    label: 'View the coursework source',
  },
];

export const skills = [...new Set(projects.flatMap(project => project.skills))];
export function matchesSkill(projectSkills, selected) {
  return selected === 'All' || projectSkills.includes(selected);
}
