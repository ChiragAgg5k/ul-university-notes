/**
 * @file Shown for any address that matches no route.
 */
import { Link } from 'react-router';

export default function Missing() {
  return (
    <>
      <h1>Page not found</h1>
      <p>
        <Link to="/">Back to the home page</Link>
      </p>
    </>
  );
}
