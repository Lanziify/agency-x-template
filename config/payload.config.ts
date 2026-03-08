import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';

import email from '@lib/email';

import { collections } from './collections';
import { editor } from './editor';
import { livePreview } from './livePreview';
import { plugins } from './plugins';

import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  editor,
  collections,
  email,
  plugins,
  secret: process.env.PAYLOAD_SECRET || '',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  admin: { livePreview },
  typescript: {
    outputFile: path.resolve(__dirname, './payload.types.ts'),
  },
  cors: '*',
  sharp,
});
