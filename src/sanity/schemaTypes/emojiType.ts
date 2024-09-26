// @ts-nocheck
import { SparklesIcon } from '@sanity/icons';
import { defineType } from 'sanity';

import { client } from '@/sanity/lib/client';
import { CustomStringInput } from '../CustomStringInput';

export const emojiType = defineType({
  name: 'emoji',
  title: 'Emoji',
  type: 'document',
  icon: SparklesIcon,

  fields: [
    {
      name: 'title',
      type: 'string',
      components: {
        input: CustomStringInput,
      },
      // hidden: ({ document }) => !document?.slug,
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: async (document, options) => {
          const slugQuery = '*[_type=="sanity.imageAsset" && _id == $ref]{...}';
          const params = { ref: document.imageFile.asset._ref };
          const filename = await client
            .fetch(slugQuery, params)
            .then((data) => {
              let asset = data[0];
              return asset.originalFilename.split('.')[0];
            });
          return filename;
        },
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'imageFile',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*',
        storeOriginalFilename: true,
      },
      fields: [
        {
          name: 'downloads',
          type: 'number',
          title: '# of Downloads',
          readOnly: true,
          initialValue: 0,
        },
      ],
    },
  ],
  // preview: {
  // select: {
  //   // title: 'title',
  // },
  // prepare(selection) {
  //   const { author } = selection;
  //   return { ...selection, subtitle: author && `by ${author}` };
  // },
  // },
});
