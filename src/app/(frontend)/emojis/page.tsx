// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { sanityFetch } from '@/sanity/lib/client';

import { EmojiCard } from '@/components/EmojiCard';
import { EmojiHeader } from '@/components/EmojiHeader';
import {
  INITIAL_EMOJIS_QUERY,
  LOAD_MORE_EMOJIS_QUERY,
} from '@/sanity/lib/queries';
import { EMOJIS_QUERYResult } from '@/sanity/types';

export default function Page() {
  const { ref, inView } = useInView();
  const [emojiList, setEmojiList] = useState([]);

  const loadInitialEmojis = async () => {
    const initialBatchResult = await sanityFetch({
      query: INITIAL_EMOJIS_QUERY,
      revalidate: 604800,
      tags: [],
    });

    setEmojiList((emojis) => [...emojis, ...initialBatchResult]);
  };

  let lastSlug = '';

  const loadMoreEmojis = async () => {
    if (lastSlug === null || emojiList.length < 1) {
      return;
    }

    lastSlug = emojiList[emojiList.length - 1].slug.current;

    const nextBatch = await sanityFetch({
      query: LOAD_MORE_EMOJIS_QUERY,
      params: {
        lastSlug,
      },
      revalidate: 3600,
      tags: [],
    });

    setEmojiList((emojis) => [...emojis, ...nextBatch]);
  };

  useEffect(() => {
    if (inView) {
      const nextBatch = loadMoreEmojis();
    }
  }, [inView]);

  useEffect(() => {
    loadInitialEmojis();
  }, []);

  return (
    <>
      <EmojiHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {emojiList.map((emoji) => (
            <EmojiCard key={emoji._id} {...emoji} />
          ))}
          <div ref={ref}>Loading ...</div>
        </div>
      </main>
    </>
  );
}
