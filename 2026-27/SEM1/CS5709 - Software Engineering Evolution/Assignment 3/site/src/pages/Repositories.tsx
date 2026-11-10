/**
 * @file Recently updated public repositories, read live from the GitHub API.
 *
 * The request is cancelled if the visitor leaves before it finishes, and a failure (offline, or
 * GitHub's rate limit) is reported in place of the list instead of leaving the page empty.
 */
import { useEffect, useState } from 'react';
import { fetchRepositories } from '../api/github.ts';
import { Page } from '../components/Page.tsx';
import type { Repository } from '../types/Repository.ts';

const profile = 'https://github.com/ChiragAgg5k?tab=repositories';

export default function Repositories() {
  const [repositories, setRepositories] = useState<Repository[]>();
  const [failure, setFailure] = useState<string>();

  useEffect(() => {
    const controller = new AbortController();
    fetchRepositories(controller.signal)
      .then(setRepositories)
      .catch((error: Error) => {
        if (error.name !== 'AbortError') {
          setFailure(error.message);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <Page title="Recent repositories">
      <p className="lead">What I have been working on lately, straight from GitHub.</p>
      {failure && (
        <p role="alert">
          Could not load repositories: {failure}. <a href={profile}>See them on GitHub</a>.
        </p>
      )}
      {!failure && !repositories && <p role="status">Loading repositories…</p>}
      {repositories?.map(repository => (
        <article className="case-study" key={repository.id}>
          <p className="eyebrow">{repository.language ?? 'Other'}</p>
          <h2>
            <a href={repository.html_url}>{repository.name}</a>
          </h2>
          <p>{repository.description}</p>
        </article>
      ))}
    </Page>
  );
}
