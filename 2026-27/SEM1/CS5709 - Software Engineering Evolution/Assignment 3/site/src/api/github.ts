/**
 * @file Reads public repositories from the GitHub REST API. No token is used.
 */
import type { Repository } from '../types/Repository.ts';

const endpoint = 'https://api.github.com/users/ChiragAgg5k/repos?sort=updated&per_page=6';

export async function fetchRepositories(signal: AbortSignal): Promise<Repository[]> {
  const response = await fetch(endpoint, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!response.ok) {
    throw new Error(`GitHub answered ${response.status}`);
  }
  return response.json();
}
