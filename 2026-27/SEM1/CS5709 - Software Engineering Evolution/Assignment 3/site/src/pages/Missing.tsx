/**
 * @file Shown for any address that matches no route or no article.
 */
import { Link } from 'react-router';
import { Page } from '../components/Page.tsx';

export default function Missing() {
  return (
    <Page title="Page not found">
      <p>This address does not match a page in the portfolio.</p>
      <Link to="/">Return home</Link>
    </Page>
  );
}
