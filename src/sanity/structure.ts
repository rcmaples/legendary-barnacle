import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) => {
  return S.list()
    .title('Legendary Barnacle')
    .items([
      S.documentTypeListItem('emoji').title('Emojis'),
      // S.divider(),
      // S.documentTypeListItem('post').title('Posts'),
      // S.documentTypeListItem('category').title('Categories'),
      // S.documentTypeListItem('author').title('Authors'),
    ]);
};
