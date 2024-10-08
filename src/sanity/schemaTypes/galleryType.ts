import { PresentationIcon } from '@sanity/icons';
import { defineType, defineField } from 'sanity';

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: PresentationIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    {
      // title: 'Emojis',
      name: 'emojis',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [{ type: 'reference', to: { type: 'emoji' } }],
    },
  ],
});
