import { config } from '@keystone-6/core';
import { Book } from './schemas/Book';
import { Church } from './schemas/Church';
import { Saint } from './schemas/Saint';
import { User } from './schemas/User';
import { Image } from './schemas/Image';

import 'dotenv/config';

export default config({
  db: {
    provider: 'postgresql',
    url: 'postgres://hitbkrkn:HWreGq238zEyJIFY9xsPlO328wv5GlIp@drona.db.elephantsql.com/hitbkrkn',
  },
  lists: {
    Book,
    Church,
    Saint,
    User,
    Image,
  },
});
