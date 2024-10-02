import { defineQuery } from 'next-sanity';

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`);

export const POSTS_SLUGS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`);

export const INITIAL_EMOJIS_QUERY =
  defineQuery(`*[_type == "emoji" && defined(slug.current)]|order(slug.current asc)[0...100]{
  _id,
  title,
  slug,
  imageFile{ asset-> },
  publishedAt
}`);

export const LOAD_MORE_EMOJIS_QUERY =
  defineQuery(`*[_type == "emoji" && defined(slug.current) && slug.current > $lastSlug] | order(slug.current asc)[0...100]{
    _id,
    title,
    slug,
    imageFile{ asset-> },
    publishedAt
}`);

export const SEARCH_FOR_EMOJIS_QUERY =
  defineQuery(`*[_type == "emoji" && title match "*" + $search + "*"] | order(slug.current asc){
    _id,
    title,
    slug,
    imageFile{ asset-> },
    publishedAt
}`);

// export const INCREMENT_EMOJI_DOWNLOAD_QUERY = defineQuery(``);
