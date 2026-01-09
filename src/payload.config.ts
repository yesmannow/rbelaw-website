import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Admin configuration with Riley Bennett Egloff branding
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Riley Bennett Egloff LLP',
      defaultOGImageType: 'static',
    },
  },
  
  // Collections
  collections: [
    // Users collection for admin access
    {
      slug: 'users',
      auth: true,
      access: {
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
    
    // Media collection for headshots and images
    {
      slug: 'media',
      upload: {
        staticDir: 'media',
        mimeTypes: ['image/*'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },
    
    // Industries collection - Marketing taxonomy for cross-linking
    {
      slug: 'industries',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: {
            description: 'URL-friendly identifier (e.g., healthcare, construction)',
          },
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name (e.g., Building2, Landmark)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    
    // Tags collection - Marketing taxonomy for blog posts and content
    {
      slug: 'tags',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'slug'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: {
            description: 'URL-friendly identifier',
          },
        },
      ],
    },
    
    // Attorneys collection
    {
      slug: 'attorneys',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'role', 'email'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: {
            description: 'URL-friendly identifier (e.g., laura-k-binford)',
          },
        },
        {
          name: 'role',
          type: 'select',
          required: true,
          options: [
            { label: 'Partner', value: 'partner' },
            { label: 'Associate', value: 'associate' },
            { label: 'Of Counsel', value: 'of-counsel' },
          ],
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'headshot',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'education',
          type: 'array',
          fields: [
            {
              name: 'institution',
              type: 'text',
              required: true,
            },
            {
              name: 'degree',
              type: 'text',
              required: true,
            },
            {
              name: 'year',
              type: 'text',
            },
          ],
        },
        {
          name: 'bio',
          type: 'richText',
          editor: lexicalEditor({}),
          required: true,
        },
        // Quick Facts sidebar group
        {
          type: 'group',
          name: 'quickFacts',
          label: 'Quick Facts',
          fields: [
            {
              name: 'barAdmissions',
              type: 'array',
              fields: [
                {
                  name: 'admission',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'languages',
              type: 'array',
              fields: [
                {
                  name: 'language',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'awards',
          type: 'array',
          fields: [
            {
              name: 'award',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'representativeMatters',
          type: 'array',
          fields: [
            {
              name: 'matter',
              type: 'richText',
              editor: lexicalEditor({}),
            },
          ],
        },
        {
          name: 'publications',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
            },
            {
              name: 'date',
              type: 'date',
            },
          ],
        },
        {
          name: 'videos',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
            {
              name: 'date',
              type: 'date',
            },
          ],
        },
        {
          name: 'linkedIn',
          type: 'text',
        },
        {
          name: 'vCardUrl',
          type: 'text',
        },
        {
          name: 'beyondOffice',
          type: 'textarea',
        },
        // Relational taxonomies
        {
          name: 'industries',
          type: 'relationship',
          relationTo: 'industries',
          hasMany: true,
          index: true,
          admin: {
            description: 'Industries this attorney serves',
          },
        },
        {
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          index: true,
          admin: {
            description: 'Tags for content organization and filtering',
          },
        },
      ],
    },
    
    // Practice Areas collection
    {
      slug: 'practice-areas',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: {
            description: 'URL-friendly identifier (e.g., business-law)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({}),
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name (e.g., Building2, Scale)',
          },
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'featuredAttorneys',
          type: 'relationship',
          relationTo: 'attorneys',
          hasMany: true,
          index: true,
          admin: {
            description: 'Attorneys who specialize in this practice area',
          },
        },
        {
          name: 'subAreas',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'caseStudies',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'outcome',
              type: 'textarea',
            },
            {
              name: 'year',
              type: 'text',
            },
          ],
        },
        // Relational taxonomies
        {
          name: 'industries',
          type: 'relationship',
          relationTo: 'industries',
          hasMany: true,
          index: true,
          admin: {
            description: 'Industries this practice area serves',
          },
        },
        {
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          index: true,
          admin: {
            description: 'Tags for content organization and filtering',
          },
        },
      ],
    },
    
    // Blog collection
    {
      slug: 'blog',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'publishedDate', 'status'],
      },
      access: {
        read: () => true,
      },
      versions: {
        drafts: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: {
            description: 'URL-friendly identifier',
          },
        },
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'attorneys',
          required: true,
          index: true,
          admin: {
            description: 'Attorney author - dynamically renders headshot and bio',
          },
        },
        {
          name: 'excerpt',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Short summary for listings and SEO',
          },
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({}),
          required: true,
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'publishedDate',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Archived', value: 'archived' },
          ],
        },
        {
          name: 'categories',
          type: 'array',
          fields: [
            {
              name: 'category',
              type: 'text',
            },
          ],
        },
        {
          name: 'relatedPracticeAreas',
          type: 'relationship',
          relationTo: 'practice-areas',
          hasMany: true,
          index: true,
        },
        // Relational taxonomies
        {
          name: 'industries',
          type: 'relationship',
          relationTo: 'industries',
          hasMany: true,
          index: true,
          admin: {
            description: 'Industries relevant to this blog post',
          },
        },
        {
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          index: true,
          admin: {
            description: 'Tags for content organization and filtering',
          },
        },
      ],
    },
  ],
  
  // Configure the database - uses DATABASE_URI from Vercel environment variables
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
      collections: ['attorneys', 'practice-areas', 'blog', 'industries'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }: any) => `RBE Law — ${doc?.title?.value || doc?.title || doc?.name || ''}`,
      generateDescription: ({ doc }: any) => doc?.excerpt || doc?.description || '',
    }),
  ],
  
  // Secret for JWT encryption
  secret: process.env.PAYLOAD_SECRET || 'your-secret-here',
  
  // TypeScript configuration
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

