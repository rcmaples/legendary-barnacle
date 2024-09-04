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
      <article className="inline-block w-[200px] p-[7px_10px] m-[10px_5px_10px_0] border border-[#afafaf] text-left rounded-[3px]">
        <div className="flex items-center">
          {imageFile ? (
            <Image
              unoptimized={isGif > -1}
              src={urlFor(imageFile).width(32).height(32).url()}
              height={32}
              width={32}
              alt={`:${slug?.current}:`}
              className="flex-shrink-0"
            />
          ) : null}
          <span className="inline-block align-middle pl-[13px] truncate w-[160px]">
            {`:${title}:`}
          </span>
        </div>
      </article>
    </Link>
  );
}
