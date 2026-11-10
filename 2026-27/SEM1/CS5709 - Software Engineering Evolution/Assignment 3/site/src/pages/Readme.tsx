/**
 * @file The project's README shown as a page, so the site documents itself.
 *
 * The text is the `README.md` beside the source, imported as it is. Both it and the Markdown
 * renderer are downloaded only when this page is opened. The file is part of this repository,
 * so inserting the rendered HTML directly is safe: no visitor input reaches it.
 */
import { useEffect, useState } from 'react';
import { Page } from '../components/Page.tsx';

async function render(): Promise<string> {
  const [{ marked }, { default: text }] = await Promise.all([
    import('marked'),
    import('../../README.md?raw'),
  ]);
  const withoutTitle = text.replace(/^# .*\n/, '');
  return marked.parse(withoutTitle, { async: false });
}

export default function Readme() {
  const [html, setHtml] = useState<string>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let current = true;
    render()
      .then(rendered => current && setHtml(rendered))
      .catch(() => current && setFailed(true));
    return () => {
      current = false;
    };
  }, []);

  return (
    <Page title="Readme">
      <p className="lead">How this site is built, tested and deployed.</p>
      {failed ? (
        <p role="status">The document couldn’t be loaded. Reload to try again.</p>
      ) : html === undefined ? (
        <p role="status">Loading the document…</p>
      ) : (
        <div className="document" dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </Page>
  );
}
