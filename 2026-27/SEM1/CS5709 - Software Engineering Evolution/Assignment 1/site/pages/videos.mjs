import { escape } from '../html.mjs';

// Each video's steps are seconds from its start and drive both the captions
// file and the on-page transcript. The explainer's source is video/mcp-explainer.html.
export const videos = [
  {
    name: 'mcp-explainer',
    title: 'How I built the Appwrite MCP server, in one minute',
    width: 1280,
    height: 720,
    duration: 66,
    steps: [
      [0, 'How I built the Appwrite MCP server, and decided to hide most of its capabilities'],
      [
        6,
        'Sixteen months from the protocol launch in November 2024 to the hosted server in July 2026',
      ],
      [
        15,
        'The first version ran locally on a project API key, so it could only reach one project',
      ],
      [
        25,
        'The hosted version uses an OAuth token that belongs to the user, which took most of the time',
      ],
      [
        37,
        'Other servers expose 9 to 90 tools; clients such as Cursor and Windsurf cap how many they accept',
      ],
      [49, 'Appwrite shows four tools and searches its catalog of 981 methods on request'],
      [59, 'Today it is one command with one URL: no API key and no project ID'],
    ],
  },
];

function timestamp(seconds) {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${(seconds % 60).toFixed(3).padStart(6, '0')}`;
}

export function captions(video) {
  const cues = video.steps.map(([start, text], index) => {
    const end = video.steps[index + 1]?.[0] ?? video.duration;
    return `${index + 1}\n${timestamp(start)} --> ${timestamp(end)}\n${text}`;
  });
  return `WEBVTT\n\n${cues.join('\n\n')}\n`;
}

function player(video) {
  const path = `assets/videos/${video.name}`;
  return `<figure class="video">
  <video controls preload="metadata" playsinline poster="${path}.jpg" width="${video.width}" height="${video.height}">
    <source src="${path}.mp4" type="video/mp4">
    <track kind="captions" src="${path}.vtt" srclang="en" label="English" default>
    <a href="${path}.mp4">Download the video</a>.
  </video>
  <figcaption>${escape(video.title)} · ${Math.round(video.duration)} seconds · no audio</figcaption>
  <details>
    <summary>What the video shows</summary>
    <ol class="transcript">
${video.steps.map(([start, text]) => `      <li><span>${timestamp(start).slice(0, 5)}</span> ${escape(text)}</li>`).join('\n')}
    </ol>
  </details>
</figure>`;
}

export default {
  file: 'videos.html',
  label: 'Video gallery',
  title: 'Work in motion',
  body: `
<p class="lead">Short explainers of projects I have built.</p>
<p>This animated explainer summarises my article on the Appwrite MCP server. It has captions and a written list of what each part shows. <a href="blog-mcp.html">Read the full article</a>.</p>
${videos.map(player).join('\n')}`,
};
