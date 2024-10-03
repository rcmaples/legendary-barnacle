// @ts-nocheck
'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Image } from 'next-sanity/image';
import imageUrlBuilder from '@sanity/image-url';

import { client, sanityFetch } from '@/sanity/lib/client';

import { EmojiCard } from '@/components/EmojiCard';
import { EmojiHeader } from '@/components/EmojiHeader';
import {
  INITIAL_EMOJIS_QUERY,
  LOAD_MORE_EMOJIS_QUERY,
  SEARCH_FOR_EMOJIS_QUERY,
} from '@/sanity/lib/queries';
import { EMOJIS_QUERYResult } from '@/sanity/types';
// import { set } from 'sanity';

const builder = imageUrlBuilder(client);

const chompy = 'image-ba886970910edcee930e4303aeef2371aa827dbe-50x50-gif';

const urlFor = (source) => {
  return builder.image(source);
};

export default function Page() {
  const { ref, inView } = useInView();
  const [emojiList, setEmojiList] = useState([]);
  const [isSearching, setiSSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const debounceTimeout = useRef(null);

  let lastSlug = '';

  const loadInitialEmojis = async () => {
    if (emojiList.length > 0) {
      setEmojiList([]);
    }

    const initialBatchResult = await sanityFetch({
      query: INITIAL_EMOJIS_QUERY,
      revalidate: 604800,
      tags: [],
    });

    setEmojiList((emojis) => [...emojis, ...initialBatchResult]);
  };

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
      revalidate: 604800,
      tags: [],
    });

    setEmojiList((emojis) => [...emojis, ...nextBatch]);
  };

  const searchForEmojis = async (search) => {
    setEmojiList([]);
    const searchResults = await sanityFetch({
      query: SEARCH_FOR_EMOJIS_QUERY,
      params: {
        search,
      },
    });

    setEmojiList([...searchResults]);
  };

  const handleSearchChange = (e) => {
    if (e.target.value == '') {
      setSearchTerm([]);
      loadInitialEmojis();
    } else {
      setSearchTerm(e.target.value);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (searchTerm != '') {
        searchForEmojis(searchTerm);
      }
    }, 300); // Adjust the delay as needed

    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (inView && searchTerm == '') {
      const nextBatch = loadMoreEmojis();
    }
  }, [inView]);

  useEffect(() => {
    loadInitialEmojis();
  }, []);

  return (
    <>
      <div className="p-6 sticky top-0 bg-white">
        <header className="bg-white flex-col sm:flex-row flex items-center justify-around sm:p-6 rounded-lg container mx-auto shadow-pink-50 flex-wrap">
          <span className="text-pink-600 mb-2 text-md md:text-xl font-bold tracking-tight flex flex-row-reverse items-center">
            Emoji Snack Pack
            <Image
              src={urlFor(chompy)}
              alt="a cute monster chewing something"
              width={50}
              height={50}
              className="p-1 mr-1.5 sm:block"
            />
          </span>
          <input
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search emojis..."
            className="border-b-pink-300 mx-2 px-2 border-b-2 fs-unmask"
            id="search-bar"
            type="text"
            name="search-bar"
          />
          <span className="text-pink-600 md:text-xl font-bold tracking-tight leading-10 ">
            Click an emoji to download it!
          </span>
        </header>
      </div>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {emojiList.map((emoji) => (
            <EmojiCard key={emoji._id} {...emoji} />
          ))}
          <div ref={ref}></div>
        </div>
      </main>
    </>
  );
}
