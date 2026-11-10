/**
 * @file One blog article, followed by reader reactions. Its text is an HTML file in
 * `data/articles/`, downloaded on demand.
 *
 * The articles are my own writing, republished from the original portfolio and stored in this
 * repository, so inserting their HTML directly is safe: no visitor input reaches it.
 */
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Page } from '../components/Page.tsx';
import { Reactions } from '../components/Reactions.tsx';
import { asset } from '../data/asset.ts';
import posts from '../data/posts.json';
import Missing from './Missing.tsx';

const articles = import.meta.glob<string>('../data/articles/*.html', {
  query: '?raw',
  import: 'default',
});

const imagePath = /src="assets\//g;

export default function Article() {
  const { slug } = useParams();
  const post = posts.find(candidate => candidate.slug === slug);
  const [loaded, setLoaded] = useState<{ slug: string; html: string }>();
  const [failed, setFailed] = useState<string>();
  const body = loaded && loaded.slug === slug ? loaded.html : undefined;

  useEffect(() => {
    let current = true;
    articles[`../data/articles/${slug}.html`]?.()
      .then(html => {
        if (current && slug) {
          setLoaded({ slug, html: html.replace(imagePath, `src="${asset('assets/')}`) });
        }
      })
      .catch(() => current && setFailed(slug));
    return () => {
      current = false;
    };
  }, [slug]);

  if (!post) {
    return <Missing />;
  }
  return (
    <Page title={post.title}>
      {failed === slug ? (
        <p role="alert">The article couldn’t be loaded. Reload to try again.</p>
      ) : body === undefined ? (
        <p role="status">Loading the article…</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: body }} />
      )}
      <Reactions article={post.slug} />
      <p>
        <Link to="/blog">← All writing</Link>
      </p>
    </Page>
  );
}
