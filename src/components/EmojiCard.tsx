// @ts-nocheck
'use client';

import Image from 'next/image';
import Link from 'next/link';

import { INITIAL_EMOJIS_QUERYResult } from '../sanity/types';
import { urlFor } from '@/sanity/lib/image';

// import * as FullStory from '@fullstory/browser';
import { FullStory as FS } from '@fullstory/browser';
import { useEffect } from 'react';
import { client } from '@/sanity/lib/client';

export function EmojiCard(props: INITIAL_EMOJIS_QUERYResult[0]) {
  let title, slug, imageFile, _id;
  // console.log(props);
  if (!props['emoji']) {
    ({ _id, title, slug, imageFile } = props);
  } else {
    ({ _id, title, slug, imageFile } = props['emoji']); // this feels hacky and I don't like it.
  }

  const emojiDocId = _id;

  const filename = imageFile.asset.originalFilename;
  const isGif = filename.indexOf('.gif');

  const downloadURL = urlFor(imageFile).forceDownload(filename).url();

  const handleDownloadClick = (e) => {
    // e.preventDefault();

    const emojiEl = e.target.textContent;
    const emoji = emojiEl.replace(/:/g, '');

    client
      .patch(emojiDocId)
      .setIfMissing({ downloads: 0 })
      .inc({ downloads: 1 })
      .commit()
      .then((updatededEmoji) => {
        console.log(updatededEmoji);
      })
      .catch((err) => {
        console.error(err);
      });

    FS('trackEvent', {
      name: 'emoji downloaded',
      properties: {
        name: emoji,
      },
    });
  };

  return (
    <Link href={downloadURL} onClick={handleDownloadClick}>
      <article className="flex flex-col items-left p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="flex items-center">
          {imageFile ? (
            <Image
              unoptimized={isGif > -1}
              src={urlFor(imageFile).width(32).height(32).url()}
              height={32}
              width={32}
              alt={`:${slug?.current}:`}
              // className="flex-shrink-0"
              className="text-3xl"
            />
          ) : null}
          {/* <span className="inline-block align-middle pl-[13px] truncate w-[160px]"> */}
          <span className="text-center truncate pl-2">{`:${title}:`}</span>
        </div>
      </article>
    </Link>
  );
}
