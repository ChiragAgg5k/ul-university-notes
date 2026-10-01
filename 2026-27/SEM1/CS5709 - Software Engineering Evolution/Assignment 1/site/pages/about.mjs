import { original } from '../profile.mjs';

export default {
  file: 'about.html',
  label: 'About',
  title: 'A little about me',
  body: `
<p class="lead">I enjoy understanding how systems work and making them easier for other people to use.</p>
<p>My professional work spans backend development, developer tools and open-source infrastructure. I also work on the frontend when a project calls for it.</p>
<h2>Experience</h2>
<dl>
  <dt>Appwrite · Platform Engineer</dt>
  <dd>December 2024–present. Started as an intern, then moved into a full-time role in June 2025.</dd>
  <dt>Skillarena · Backend Developer</dt>
  <dd>July–September 2024. Maintained MERN backend systems and worked on real-time chat using WebSockets and FastAPI.</dd>
  <dt>Clearmind AI · Fullstack Developer</dt>
  <dd>October–December 2023. Worked on personalised recommendations and Stripe payment integration.</dd>
</dl>
<h2>Elsewhere</h2>
<p>
  <a href="https://github.com/ChiragAgg5k">GitHub</a> ·
  <a href="https://www.linkedin.com/in/chiragagg5k/">LinkedIn</a> ·
  <a href="${original}">Original portfolio</a>
</p>`,
};
