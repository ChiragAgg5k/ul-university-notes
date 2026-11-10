/**
 * @file Recently updated public repositories, read live from the GitHub API.
 */
import { useEffect, useState } from 'react';
import { fetchRepositories } from '../api/github.ts';
import type { Repository } from '../types/Repository.ts';

export default function Repositories() {
  const [repositories, setRepositories] = useState<Repository[] | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

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
    <>
      <h1>Repositories</h1>
      {failure && <p role="alert">Could not load repositories: {failure}.</p>}
      {!failure && !repositories && <p role="status">Loading repositories…</p>}
      <div className="cards">
        {repositories?.map(repository => (
          <article className="card" key={repository.id}>
            <p className="eyebrow">{repository.language ?? 'Other'}</p>
            <h2>
              <a href={repository.html_url}>{repository.name}</a>
            </h2>
            <p>{repository.description}</p>
          </article>
        ))}
      </div>
    </>
  );
}
