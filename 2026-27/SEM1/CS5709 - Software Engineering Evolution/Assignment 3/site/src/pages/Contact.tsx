/**
 * @file Contact options: email, and the live chat offered in the footer.
 */
import { Page } from '../components/Page.tsx';
import profile from '../data/profile.json';

export default function Contact() {
  return (
    <Page title="Get in touch">
      <p className="lead">Interested in open-source tools or platform engineering?</p>
      <p>
        <a className="button" href={`mailto:${profile.email}`}>
          Email Chirag
        </a>
      </p>
      <section>
        <h2>Chat directly</h2>
        <p>
          Select “Chat with me” below. If I’m online, I can reply here. Otherwise, leave a message
          and I’ll follow up when available.
        </p>
        <p>
          Chat uses Tawk.to and may take a moment to connect. You can also email me without opening
          chat.
        </p>
      </section>
    </Page>
  );
}
