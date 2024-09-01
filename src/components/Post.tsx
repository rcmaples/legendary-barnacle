import Image from 'next/image';

import { Author } from './Author';
import { Categories } from './Categories';
import { components } from '@/sanity/portableTextComponents';
import { PortableText } from 'next-sanity';
import { POST_QUERYResult } from '@/sanity/types';
import { PublishedAt } from './PublishedAt';
import { Title } from './Title';
import { urlFor } from '@/sanity/lib/image';

export function Post(props: NonNullable<POST_QUERYResult>) {
  const { title, author, mainImage, body, publishedAt, categories } = props;

  return (
    <article className="md:grid md:grid-cols-12 gap-y-12">
      <header className="md:col-span-12 flex flex-col gap-4 items-start">
        <div className="flex gap-4 items-center">
          <Categories categories={categories} />
          <PublishedAt publishedAt={publishedAt} />
        </div>
        <Title>{title}</Title>
        <Author author={author} />
      </header>
      {mainImage ? (
        <figure className="md:col-span-4 flex flex-col gap-2 items-start">
          <Image
            src={urlFor(mainImage).width(400).height(400).url()}
            width={400}
            height={400}
            alt=""
          />
        </figure>
      ) : null}
      {body ? (
        <div className="md:col-span-7 md:col-start-6 prose md:prose-lg">
          <PortableText value={body} components={components} />
        </div>
      ) : null}
    </article>
  );
}
