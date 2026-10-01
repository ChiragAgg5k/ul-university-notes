const posts = [
  {
    file: 'blog-logging.html',
    topic: 'Observability · April 2026',
    title: 'How we solved logging at Appwrite',
    summary: 'Replacing two logging libraries with structured, coroutine-safe spans.',
    action: 'Read the article',
  },
  {
    file: 'blog-mcp.html',
    topic: 'Developer tooling · August 2026',
    title: 'How I built the Appwrite MCP server',
    summary: 'Why exposing an API through a protocol was only the beginning of the work.',
    action: 'Read the article',
  },
];

export default {
  file: 'blog.html',
  label: 'Blog',
  title: 'Notes from building',
  body: `
<p class="lead">Writing about the decisions behind software.</p>
${posts
  .map(
    post => `<article>
  <p class="eyebrow">${post.topic}</p>
  <h2><a href="${post.file}">${post.title}</a></h2>
  <p>${post.summary}</p>
  <a href="${post.file}">${post.action} →</a>
</article>`,
  )
  .join('\n')}`,
};
