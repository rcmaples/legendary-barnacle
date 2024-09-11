// @ts-nocheck

import { notFound } from 'next/navigation';
import { Post } from '@/components/Post';
import { POST_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';

type PostIndexProps = { params: { slug: string } };

export default async function Page({ params }: PostIndexProps) {
  const initial = await sanityFetch({
    query: POST_QUERY,
    tags: ['post', 'author', 'category'],
  });

  if (!initial) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...initial} />
    </main>
  );
}
