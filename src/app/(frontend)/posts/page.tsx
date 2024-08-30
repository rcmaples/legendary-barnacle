import Link from 'next/link';

import { draftMode } from 'next/headers';

import { sanityFetch } from '../../../sanity/lib/client';
import { loadQuery } from '../../../sanity/lib/loader';
import { POSTS_QUERY } from '../../../sanity/lib/queries';
import { POSTS_QUERYResult } from '../../../sanity/types';

import { Title } from '../../../components/Title';
import { PostCard } from '../../../components/PostCard';
import { PostCardPreview } from '../../../components/PostCardPreview';

export default async function Page() {
  const initial = await loadQuery<POSTS_QUERYResult>(
    POSTS_QUERY,
    {},
    {
      next: { tags: ['post', 'author', 'category'] },
    }
  );
  // const posts = await sanityFetch({
  //   query: POSTS_QUERY,
  //   revalidate: 3600,
  //   tags: ['post', 'author', 'category'],
  // });

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Title>Post Index</Title>
      <div className="flex flex-col gap-24 py-12">
        {draftMode().isEnabled ? (
          <PostCardPreview initial={initial} />
        ) : (
          initial.data.map((post) => <PostCard key={post._id} {...post} />)
        )}
      </div>
    </main>
  );
}
