// @ts-nocheck

import { PostCard } from '@/components/PostCard';
// import { PostCardPreview } from '@/components/PostCardPreview';
import { POSTS_QUERY } from '@/sanity/lib/queries';
// import { POSTS_QUERYResult } from '@/sanity/types';
import { Title } from '@/components/Title';
import { Header } from '@/components/Header';
import { sanityFetch } from '@/sanity/lib/client';

export default async function Page() {
  const initial = await sanityFetch({
    query: POSTS_QUERY,
    tags: ['post', 'author', 'category'],
  });

  return (
    <>
      <Header />
      <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
        <Title>Post Index</Title>
        <div className="flex flex-col gap-24 py-12">
          {initial.map((post) => (
            <PostCard key={post._id} {...post} />
          ))}
        </div>
      </main>
    </>
  );
}
