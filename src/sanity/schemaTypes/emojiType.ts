import { SparklesIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const emojiType = defineType({
  name: 'emoji',
  title: 'Emoji',
  type: 'document',
  icon: SparklesIcon,

  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
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
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
        {
          name: 'filename',
          type: 'string',
          title: 'filename',
        },
      ],
    },
  ],
});
