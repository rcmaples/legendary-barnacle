'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { sanityComputedField } from 'sanity-plugin-computed-field';
import { RocketIcon } from '@sanity/icons';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schemaTypes';
// import { structure } from './src/sanity/structure';
// import { resolve } from './src/sanity/presentation/resolve';

export default defineConfig({
  name: 'emojipalooza',
  title: 'Emojipalooza',
  icon: RocketIcon,
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    // structureTool({ structure }),
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
    sanityComputedField(),
  ],
});
