/**
 * @file Landing page.
 */
import { Link } from 'react-router';

export default function Home() {
  return (
    <>
      <h1>Chirag Aggarwal</h1>
      <p>
        Platform engineer and MSc Software Engineering student at the University of Limerick. This
        is phase 2 of the CS5709 portfolio.
      </p>
      <p>
        <Link to="/knowledge">See the project evidence</Link>
      </p>
    </>
  );
}
