import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export const Book = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    author: text({ validation: { isRequired: true } }),
    link: text({ validation: { isRequired: true } }),
    saints: relationship({ ref: 'Saint.book', many: true }),
  },
});
