import { PresentationIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: PresentationIcon,
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      title: 'Emojis',
      name: 'emojis',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [{ type: 'reference', to: { type: 'emoji' } }],
    },
  ],
});
