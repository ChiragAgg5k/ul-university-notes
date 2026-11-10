/**
 * @file One video with captions and a written transcript, both built from the same step list.
 *
 * The captions file is generated in the browser from the JSON steps, so the transcript and the
 * captions cannot drift apart. The video downloads only its metadata until the visitor plays it.
 */
import { asset } from '../data/asset.ts';
import type videos from '../data/videos.json';

type Video = (typeof videos)[number];

function timestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${(seconds % 60).toFixed(3).padStart(6, '0')}`;
}

/**
 * Writes the steps as a WebVTT document. Each cue lasts until the next step starts.
 */
function captions(video: Video): string {
  const cues = video.steps.map((step, index) => {
    const end = video.steps[index + 1]?.start ?? video.duration;
    return `${index + 1}\n${timestamp(step.start)} --> ${timestamp(end)}\n${step.text}`;
  });
  return `WEBVTT\n\n${cues.join('\n\n')}\n`;
}

export function VideoPlayer({ video }: { video: Video }) {
  const path = asset(`assets/videos/${video.name}`);
  const track = `data:text/vtt;charset=utf-8,${encodeURIComponent(captions(video))}`;

  return (
    <figure className="video">
      <video
        controls
        preload="metadata"
        playsInline
        poster={`${path}.jpg`}
        width={video.width}
        height={video.height}
      >
        <source src={`${path}.mp4`} type="video/mp4" />
        <track kind="captions" src={track} srcLang="en" label="English" default />
        <a href={`${path}.mp4`}>Download the video</a>.
      </video>
      <figcaption>
        {video.title} · {video.duration} seconds · no audio
      </figcaption>
      <details>
        <summary>What the video shows</summary>
        <ol className="transcript">
          {video.steps.map(step => (
            <li key={step.start}>
              <span>{timestamp(step.start).slice(0, 5)}</span> {step.text}
            </li>
          ))}
        </ol>
      </details>
    </figure>
  );
}
