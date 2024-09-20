// @ts-nocheck
'use client';

import Image from 'next/image';
import Link from 'next/link';

import { INITIAL_EMOJIS_QUERYResult } from '../sanity/types';
import { urlFor } from '@/sanity/lib/image';

import * as FullStory from '@fullstory/browser';
import { useEffect } from 'react';

export function EmojiCard(props: INITIAL_EMOJIS_QUERYResult[0]) {
  let title, slug, imageFile;
  if (!props['emoji']) {
    ({ title, slug, imageFile } = props);
  } else {
    ({ title, slug, imageFile } = props['emoji']);
  }

  const isGif = imageFile.filename.indexOf('.gif');
  const downloadURL = urlFor(imageFile).forceDownload(imageFile.filename).url();

  const handleDownloadClick = (e) => {
    // console.log(FullStory('getSession', { format: 'url' }));
    console.log(FullStory('getSession', { format: 'url.now' }));
    const emojiEl = e.target.textContent;
    const emoji = emojiEl.replace(/:/g, '');

    //   FS('trackEvent', {
    //     name: 'emoji downloaded',
    //     properties: {
    //       name: emoji,
    //     },
    //   });
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
