import { DocumentTextIcon } from '@sanity/icons';
import { defineType, defineField } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      title: 'Slug',
    }),
    {
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
      // title: 'Author',
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (rule) =>
            rule.custom((value, context) => {
              const parent = context?.parent as { asset?: { _ref?: string } };

              return !value && parent?.asset?._ref
                ? 'Alt text is required when an image is present'
                : true;
            }),
        },
      ],
    },
    {
      name: 'categories',
      // title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Date published',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Body',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
