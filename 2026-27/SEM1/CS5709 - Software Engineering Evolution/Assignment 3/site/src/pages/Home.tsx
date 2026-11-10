/**
 * @file Landing page: introduction, portrait and two routes into the rest of the site.
 */
import { Link } from 'react-router';
import { Page } from '../components/Page.tsx';
import { asset } from '../data/asset.ts';
import profile from '../data/profile.json';
import { useReveal } from '../hooks/useReveal.ts';

export default function Home() {
  const highlights = useReveal<HTMLDivElement>();
  return (
    <Page title={profile.name}>
      <div className="intro">
        <div>
          <p className="lead">{profile.lead}</p>
          {profile.introduction.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link className="button" to="/knowledge">
            Explore my work
          </Link>
        </div>
        <img
          className="portrait"
          src={asset(profile.portrait)}
          alt={profile.name}
          width="280"
          height="280"
        />
      </div>
      <section>
        <h2>Building tools for developers</h2>
        <div className="columns" ref={highlights}>
          {profile.highlights.map(highlight => (
            <article key={highlight.to}>
              <h3>{highlight.title}</h3>
              <p>{highlight.text}</p>
              <Link to={highlight.to}>{highlight.label} →</Link>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}
