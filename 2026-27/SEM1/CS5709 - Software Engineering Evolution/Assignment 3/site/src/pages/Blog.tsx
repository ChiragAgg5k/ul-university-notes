/**
 * @file Blog index from `data/posts.json`, searchable and filterable by topic.
 */
import { Link } from 'react-router';
import { CollectionFilter } from '../components/CollectionFilter.tsx';
import { Page } from '../components/Page.tsx';
import posts from '../data/posts.json';
import { useFilter } from '../hooks/useFilter.ts';
import { useReveal } from '../hooks/useReveal.ts';
import { distinctTags, matches } from '../state/matches.ts';

const topics = distinctTags(posts);

export default function Blog() {
  const { filter } = useFilter('posts');
  const visible = posts.filter(post => matches([post.title, post.summary], post.tags, filter));
  const list = useReveal<HTMLDivElement>(visible.length);
  return (
    <Page title="Notes from building">
      <p className="lead">Writing about the decisions behind software.</p>
      <CollectionFilter
        collection="posts"
        legend="Find an article"
        tags={topics}
        shown={visible.length}
        total={posts.length}
      />
      <div ref={list}>
        {visible.map(post => (
          <article key={post.slug}>
            <p className="eyebrow">
              {post.tags.join(' · ')} · {post.date}
            </p>
            <h2>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.summary}</p>
            <Link to={`/blog/${post.slug}`}>Read the article →</Link>
          </article>
        ))}
      </div>
    </Page>
  );
}
