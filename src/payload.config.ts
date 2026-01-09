import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Your admin user collection
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  
  // Collections will be added in Phase 2
  collections: [
    // Users collection for admin access
    {
      slug: 'users',
      auth: true,
      access: {
        // Only admins can create/read/update/delete users
        create: () => true,
        read: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  
  // Configure the database
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  
  // Configure the rich text editor
  editor: lexicalEditor({}),
  
  // Configure plugins
  plugins: [
    seoPlugin({
      collections: [],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `RBE Law — ${doc?.title?.value || doc?.title || ''}`,
      generateDescription: ({ doc }: any) => doc?.excerpt || doc?.description,
    }),
  ],
  
  // Secret for JWT encryption
  secret: process.env.PAYLOAD_SECRET || 'your-secret-here',
  
  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

