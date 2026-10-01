import { email, original } from './profile.mjs';

// Articles have no navigation entry of their own, so they highlight Blog.
function isCurrent(link, page) {
  return link.file === page.file || (link.file === 'blog.html' && page.file.startsWith('blog-'));
}

function navigation(links, page) {
  return links
    .map(
      link =>
        `<a href="${link.file}"${isCurrent(link, page) ? ' aria-current="page"' : ''}>${link.label}</a>`,
    )
    .join('\n      ');
}

export function layout(page, links) {
  // The host serves 404.html at any missing path, such as /blog/a/b, so its
  // relative links must resolve from the site root rather than that path.
  const base = page.file === '404.html' ? '\n  <base href="/">' : '';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">${base}
  <meta name="description" content="Chirag Aggarwal’s education, platform engineering work and writing.">
  <title>${page.title} | Chirag Aggarwal</title>
  <link rel="stylesheet" href="style.css">
  <script type="module" src="navigation.mjs"></script>
  <script type="module" src="chat.mjs"></script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header>
    <a class="identity" href="index.html">Chirag <br>Aggarwal<span>Engineering portfolio</span></a>
    <nav aria-label="Main navigation">
      ${navigation(links, page)}
    </nav>
    <p class="module">CS5709<br>Software Engineering Evolution</p>
  </header>
  <div class="page">
    <main id="main" tabindex="-1">
      <p class="eyebrow">Software / systems / learning</p>
      <h1>${page.title}</h1>
      ${page.body.trim()}
    </main>
    <footer>
      <section aria-label="Live chat">
        <button class="button" type="button" data-open-chat aria-describedby="chat-privacy" hidden>Chat with me</button>
        <p id="chat-privacy">Chat uses Tawk.to, which processes messages and connection data and may use cookies. After your first click, it loads on other pages in this tab. Close the tab to stop automatic loading. Don’t share sensitive information. <a href="https://www.tawk.to/privacy-policy/">Tawk.to privacy policy</a>.</p>
        <p role="status" data-chat-status></p>
        <noscript><p>Chat requires JavaScript.</p></noscript>
        <p>Prefer email? <a href="mailto:${email}">Email Chirag</a>.</p>
      </section>
      <p>Chirag Aggarwal · CS5709 digital portfolio</p>
      <p>Content adapted from <a href="${original}">my original portfolio</a>.</p>
    </footer>
  </div>
</body>
</html>
`;
}
