import sharp from 'sharp';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { buildConfig } from 'payload';
import { editor } from './editor';
import { collections } from './collections';
import { plugins } from './plugins';
import { livePreview } from './livePreview';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  editor,
  collections,
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
  sharp,
});
