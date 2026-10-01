const photos = [
  [
    'hackcbs.jpeg',
    'HackCBS · November 2023',
    'Four students standing in front of the HackCBS sponsor backdrop, which advertises prizes worth $150,000 for the 4–5 November 2023 event.',
  ],
  [
    'github-constellation.jpeg',
    'GitHub Constellation',
    'Three attendees with event lanyards, arms around each other, standing inside a large pink and purple GitHub Octocat arch at the venue entrance.',
  ],
  [
    'hackaccino.jpeg',
    'Hackaccino',
    'Group photo of around thirty people in matching black event T-shirts and lanyards, giving thumbs up in front of a Bennett University School of Computer Science Engineering and Technology banner.',
  ],
];

export default {
  file: 'pictures.html',
  label: 'Pictures gallery',
  title: 'Outside the editor',
  body: `
<p class="lead">Photos from hackathons and developer events.</p>
<div class="gallery">
${photos
  .map(
    ([image, event, description]) => `  <figure>
    <a href="assets/${image}"><img src="assets/${image}" alt="${description}" width="640" height="480" loading="lazy"></a>
    <figcaption>${event} · open the full photograph</figcaption>
  </figure>`,
  )
  .join('\n')}
</div>`,
};
