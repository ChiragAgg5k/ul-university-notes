/**
 * @file Background, work experience and links to other profiles.
 */
import { Fragment } from 'react';
import { Page } from '../components/Page.tsx';
import profile from '../data/profile.json';

export default function About() {
  return (
    <Page title="A little about me">
      <p className="lead">{profile.aboutLead}</p>
      {profile.about.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <h2>Experience</h2>
      <dl>
        {profile.experience.map(position => (
          <Fragment key={position.role}>
            <dt>{position.role}</dt>
            <dd>{position.detail}</dd>
          </Fragment>
        ))}
      </dl>
      <h2>Elsewhere</h2>
      <p className="inline-links">
        {profile.links.map(link => (
          <a key={link.url} href={link.url}>
            {link.label}
          </a>
        ))}
      </p>
    </Page>
  );
}
