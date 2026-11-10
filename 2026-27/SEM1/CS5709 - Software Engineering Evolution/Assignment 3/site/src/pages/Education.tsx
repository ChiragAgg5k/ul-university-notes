/**
 * @file Education history, newest first, from `data/education.json`.
 */
import { Fragment } from 'react';
import { Page } from '../components/Page.tsx';
import education from '../data/education.json';

export default function Education() {
  return (
    <Page title="Education">
      <p className="lead">I’m studying Software Engineering at the University of Limerick.</p>
      <dl>
        {education.map(entry => (
          <Fragment key={entry.institution}>
            <dt>{entry.institution}</dt>
            <dd>
              <strong>{entry.award}</strong>
              <br />
              {entry.period}
              {entry.detail && (
                <>
                  <br />
                  {entry.detail}
                </>
              )}
            </dd>
          </Fragment>
        ))}
      </dl>
    </Page>
  );
}
