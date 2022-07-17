import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';

export const Church = list({
  fields: {
    name: text({ validation: { isRequired: true } }),
    location: text({ validation: { isRequired: true } }),
    bio: text({ validation: { isRequired: true } }),
    patronSaint: relationship({ ref: 'Saint.Church', many: true }),
    relics: relationship({ ref: 'Saint.RelicsLocation', many: true }),
  },
});
