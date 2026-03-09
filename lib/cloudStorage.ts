import { s3Storage } from '@payloadcms/storage-s3';

export const cloudStorage = s3Storage({
  collections: {
    media: true,
  },
  bucket: process.env.S3_BUCKET!,
  config: {
    region: process.env.S3_REGION!,
    endpoint: process.env.S3_ENDPOINT!, // TODO: This cause error and should be fix in preview environment
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_KEY!,
    },
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
  },
});
