/**
 * @file The fields this site reads from a GitHub repository response.
 */
export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
}
