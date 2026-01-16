import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { buildConfig } from 'payload';
import { collections } from './collections';
import { plugins } from './plugins';
import { livePreview } from './livePreview';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  editor: lexicalEditor(),
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
