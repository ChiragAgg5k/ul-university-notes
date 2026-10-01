import { email } from '../profile.mjs';

export default {
  file: 'contact.html',
  label: 'Contact',
  title: 'Get in touch',
  body: `
<p class="lead">Interested in open-source tools or platform engineering?</p>
<p><a class="button" href="mailto:${email}">Email Chirag</a></p>
<section>
  <h2>Chat directly</h2>
  <p>Click “Chat with me” below. If I’m online, I can reply here. Otherwise, leave a message and I’ll follow up when available.</p>
  <p>Chat uses Tawk.to and may take a moment to connect. You can also email me without opening chat.</p>
</section>`,
};
