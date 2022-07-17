import { list } from '@keystone-6/core';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { text } from '@keystone-6/core/fields';
import dotenv from 'dotenv';

dotenv.config();

export const Image = list({
  fields: {
    image: cloudinaryImage({
      cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
        apiKey: process.env.CLOUDINARY_API_KEY!,
        apiSecret: process.env.CLOUDINARY_API_SECRET!,
        folder: process.env.CLOUDINARY_API_FOLDER!,
      },
      label: 'Source',
    }),
    altText: text(),
  },
});
