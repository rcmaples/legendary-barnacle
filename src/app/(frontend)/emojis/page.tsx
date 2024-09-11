// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { loadQuery } from '@/sanity/lib/loader';
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
    const initialBatchResult = await loadQuery<EMOJIS_QUERYResult>(
      INITIAL_EMOJIS_QUERY,
      {},
      { next: {} }
    );

    console.log('initialBatchResult:');
    console.dir(initialBatchResult);
  };

  const loadMoreEmojis = async () => {
    const nextBatch = await loadQuery<EMOJIS_QUERYResult>(
      LOAD_MORE_EMOJIS_QUERY,
      {},
      { next: {} }
    );

    // const nextBatchData = nextBatch.data as EMOJIS_QUERYResult[];

    // setEmojiList([...emojiList, ...nextBatchData]);
  };

  useEffect(() => {
    loadInitialEmojis();
  }, []);

  return (
    <div>
      <EmojiHeader />
      <div ref={ref}>
        {emojiList.map((emoji) => (
          <EmojiCard key={emoji._id} emoji={emoji} />
        ))}
      </div>
    </div>
  );
}
