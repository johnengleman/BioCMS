import { list } from '@keystone-6/core';
import { relationship, timestamp, text, select } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

export const Saint = list({
  fields: {
    name: text(),
    book: relationship({
      ref: 'Book.saints',
      many: true,
    }),
    Church: relationship({
      ref: 'Church.patronSaint',
      many: true,
    }),
    RelicsLocation: relationship({
      ref: 'Church.relics',
      many: true,
    }),
    RelicHistory: document({
      formatting: true,
    }),
    Troparion: document({
      formatting: true,
    }),
    Kontakion: document({
      formatting: true,
    }),
    Bio: document({
      formatting: true,
    }),
    patronOf: text(),
    publishedAt: timestamp(),
    author: relationship({
      ref: 'User.saints',
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineCreate: { fields: ['name', 'email'] },
      },
    }),
    status: select({
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      defaultValue: 'draft',
      ui: { displayMode: 'segmented-control' },
    }),
  },
});
