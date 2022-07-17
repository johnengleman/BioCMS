import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export const User = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
    saints: relationship({ ref: 'Saint.author', many: true }),
  },
});
