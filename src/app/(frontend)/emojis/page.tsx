import { loadQuery } from '@/sanity/lib/loader';
import { EmojiCard } from '@/components/EmojiCard';
import { EmojiHeader } from '@/components/EmojiHeader';
import { EMOJIS_QUERY } from '@/sanity/lib/queries';
import { EMOJIS_QUERYResult } from '@/sanity/types';

export default async function Page() {
  const initial = await loadQuery<EMOJIS_QUERYResult>(
    EMOJIS_QUERY,
    {},
    { next: {} }
  );

  return (
    <>
      <EmojiHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {initial.data.map((emoji) => (
            <EmojiCard key={emoji._id} {...emoji} />
          ))}
        </div>
      </main>
    </>
  );
}
