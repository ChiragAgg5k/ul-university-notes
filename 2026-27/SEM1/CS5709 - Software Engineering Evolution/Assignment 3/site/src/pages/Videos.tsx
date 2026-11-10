/**
 * @file Video gallery from `data/videos.json`.
 */
import { Link } from 'react-router';
import { Page } from '../components/Page.tsx';
import { VideoPlayer } from '../components/VideoPlayer.tsx';
import videos from '../data/videos.json';

export default function Videos() {
  return (
    <Page title="Work in motion">
      <p className="lead">Short explainers of projects I have built.</p>
      <p>
        This animated explainer summarises my article on the Appwrite MCP server. It has captions
        and a written list of what each part shows.{' '}
        <Link to={`/blog/${videos[0].article}`}>Read the full article</Link>.
      </p>
      {videos.map(video => (
        <VideoPlayer key={video.name} video={video} />
      ))}
    </Page>
  );
}
