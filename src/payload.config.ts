import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { fileURLToPath } from 'url'
import process from 'process'
import { Team } from './collections/Team'
import { Industries } from './collections/Industries'
import { Testimonials } from './collections/Testimonials'

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

    // Team collection - All team members (attorneys, paralegals, staff)
    Team,

    // Industries collection - Marketing taxonomy for cross-linking
    Industries,

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
        defaultColumns: ['name', 'role', 'jobType', 'email'],
        group: 'Team',
      },
      labels: {
        singular: 'Team Member',
        plural: 'Team',
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
          name: 'jobType',
          type: 'select',
          required: true,
          defaultValue: 'attorney',
          options: [
            { label: 'Attorney', value: 'attorney' },
            { label: 'Paralegal', value: 'paralegal' },
            { label: 'Professional Staff', value: 'staff' },
          ],
          admin: {
            description: 'Type of team member',
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
          admin: {
            description: 'Attorney role (only applicable if jobType is Attorney)',
            condition: (data: any) => data.jobType === 'attorney',
          },
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
          name: 'practices',
          type: 'relationship',
          relationTo: 'practice-areas',
          hasMany: true,
          index: true,
          admin: {
            description: 'Practice areas this attorney specializes in',
          },
        },
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

    // Case Results collection
    {
      slug: 'case-results',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'settlementAmount', 'attorney'],
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Case title or description',
          },
        },
        {
          name: 'settlementAmount',
          type: 'number',
          required: true,
          admin: {
            description: 'Settlement or verdict amount in dollars',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Case details and outcome',
          },
        },
        {
          name: 'attorney',
          type: 'relationship',
          relationTo: 'attorneys',
          required: false,
          index: true,
          admin: {
            description: 'Attorney who handled this case',
          },
        },
      ],
    },

    // Testimonials collection
    Testimonials,

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

    // Contact Requests collection - Lead generation with Zapier integration
    {
      slug: 'contact-requests',
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'serviceInterest', 'createdAt'],
      },
      access: {
        read: () => true,
        create: () => true, // Allow public form submissions
      },
      hooks: {
        afterChange: [
          async ({ doc, operation }) => {
            if (operation === 'create') {
              if (!process.env.ZAPIER_WEBHOOK_URL) {
                console.warn('⚠️ ZAPIER_WEBHOOK_URL not set, skipping webhook.')
                return
              }

              // Use AbortController for timeout to prevent hanging requests
              const controller = new AbortController()
              const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

              try {
                console.log('📤 Sending contact request to Zapier:', doc.email)
                const response = await fetch(process.env.ZAPIER_WEBHOOK_URL, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(doc),
                  signal: controller.signal,
                })
                if (!response.ok) {
                  throw new Error(`Webhook failed with status: ${response.status}`)
                }
                console.log('✅ Contact request sent to Zapier successfully')
              } catch (err: any) {
                if (err.name === 'AbortError') {
                  console.error('❌ Zapier webhook timed out after 5 seconds')
                } else {
                  console.error('❌ Zapier webhook failed:', err.message)
                }
                // Don't throw - we still want the contact request saved
              } finally {
                clearTimeout(timeoutId)
              }
            }
          },
        ],
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Full name of the contact',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          admin: {
            description: 'Contact email address',
          },
        },
        {
          name: 'phone',
          type: 'text',
          admin: {
            description: 'Phone number (optional)',
          },
        },
        {
          name: 'serviceInterest',
          type: 'select',
          options: [
            { label: 'General Inquiry', value: 'general' },
            { label: 'Business & Corporate Law', value: 'business-law' },
            { label: 'Medical Malpractice Defense', value: 'medical-malpractice' },
            { label: 'Health Care', value: 'health-care' },
            { label: 'Commercial Litigation', value: 'commercial-litigation' },
            { label: 'Construction', value: 'construction' },
            { label: 'Family Law', value: 'family-law' },
            { label: 'Other', value: 'other' },
          ],
          admin: {
            description: 'Area of legal interest',
          },
        },
        {
          name: 'message',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Contact message or inquiry details',
          },
        },
        {
          name: 'source',
          type: 'text',
          admin: {
            description: 'Source of the contact (e.g., website, referral)',
            readOnly: true,
          },
          defaultValue: 'website',
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
      collections: ['attorneys', 'team', 'practice-areas', 'case-results', 'testimonials', 'blog', 'industries'],
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

