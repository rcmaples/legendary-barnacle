import { client, sanityFetch } from '../../../../sanity/lib/client';
import { POST_QUERY, POSTS_SLUGS_QUERY } from '../../../../sanity/lib/queries';
import { notFound } from 'next/navigation';
import { Post } from '../../../../components/Post';

type PostIndexProps = { params: { slug: string } };

const options = { next: { revalidate: 60 } };

export default async function Page({ params }: PostIndexProps) {
  const post = await sanityFetch({
    query: POST_QUERY,
    params,
    revalidate: 3600,
    tags: ['post', 'author', 'category'],
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch(POSTS_SLUGS_QUERY);

  return slugs;
}
