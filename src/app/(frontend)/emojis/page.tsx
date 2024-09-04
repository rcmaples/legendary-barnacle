import { loadQuery } from '@/sanity/lib/loader';
import { EmojiCard } from '@/components/EmojiCard';
import { EMOJIS_QUERY } from '@/sanity/lib/queries';
import { EMOJIS_QUERYResult } from '@/sanity/types';

export default async function Page() {
  const initial = await loadQuery<EMOJIS_QUERYResult>(
    EMOJIS_QUERY,
    {},
    { next: {} }
  );

  return (
    <main>
      <div>
        {initial.data.map((emoji) => (
          <EmojiCard key={emoji._id} {...emoji} />
        ))}
      </div>
    </main>
  );
}
