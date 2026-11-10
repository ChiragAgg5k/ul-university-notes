/**
 * @file Photo gallery with a tag filter and an enlarged view.
 *
 * Thumbnails load lazily as they scroll into view. Choosing one opens the full photograph in a
 * native `dialog`, which supplies focus trapping and Escape-to-close without extra code.
 */
import { useRef, useState } from 'react';
import { CollectionFilter } from '../components/CollectionFilter.tsx';
import { Page } from '../components/Page.tsx';
import { asset } from '../data/asset.ts';
import photos from '../data/photos.json';
import { useFilter } from '../hooks/useFilter.ts';
import { useReveal } from '../hooks/useReveal.ts';
import { distinctTags, matches } from '../state/matches.ts';

const tags = distinctTags(photos);

export default function Pictures() {
  const { filter } = useFilter('photos');
  const visible = photos.filter(photo =>
    matches([photo.event, photo.description], photo.tags, filter),
  );
  const [enlarged, setEnlarged] = useState(photos[0]);
  const dialog = useRef<HTMLDialogElement>(null);
  const gallery = useReveal<HTMLDivElement>(visible.length);

  function enlarge(photo: (typeof photos)[number]) {
    setEnlarged(photo);
    dialog.current?.showModal();
  }

  return (
    <Page title="Outside the editor">
      <p className="lead">Photos from hackathons and developer events.</p>
      <CollectionFilter
        collection="photos"
        legend="Find a photo"
        tags={tags}
        shown={visible.length}
        total={photos.length}
      />
      <div className="gallery" ref={gallery}>
        {visible.map(photo => (
          <figure key={photo.image}>
            <button className="thumbnail" type="button" onClick={() => enlarge(photo)}>
              <img
                src={asset(photo.image)}
                alt={photo.description}
                width="640"
                height="480"
                loading="lazy"
              />
            </button>
            <figcaption>{photo.event} · select the photo to enlarge it</figcaption>
          </figure>
        ))}
      </div>
      <dialog className="lightbox" ref={dialog} aria-label={enlarged.event}>
        <img src={asset(enlarged.image)} alt={enlarged.description} />
        <p>{enlarged.event}</p>
        <form method="dialog">
          <button className="button">Close</button>
        </form>
      </dialog>
    </Page>
  );
}
