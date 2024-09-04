import Image from 'next/image';
import Link from 'next/link';

import { EMOJIS_QUERYResult } from '../sanity/types';
import { urlFor } from '@/sanity/lib/image';

export function EmojiCard(props: EMOJIS_QUERYResult[0]) {
  const { title, slug, imageFile } = props;

  // @ts-ignore
  const isGif = imageFile.filename.indexOf('.gif');
  // @ts-ignore
  const downloadURL = urlFor(imageFile).forceDownload(imageFile.filename).url();

  return (
    <Link href={downloadURL}>
      <article className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="flex items-center">
          {imageFile ? (
            <Image
              unoptimized={isGif > -1}
              src={urlFor(imageFile).width(32).height(32).url()}
              height={32}
              width={32}
              alt={`:${slug?.current}:`}
              // className="flex-shrink-0"
              className="text-4xl mb-2"
            />
          ) : null}
          {/* <span className="inline-block align-middle pl-[13px] truncate w-[160px]"> */}
          <span className="text-center truncate pl-2">{`:${title}:`}</span>
        </div>
      </article>
    </Link>
  );
}
