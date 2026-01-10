import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'attorney', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Client testimonial quote',
      },
    },
    {
      name: 'clientName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the client (or "Anonymous" if preferred)',
      },
    },
    {
      name: 'attorney',
      type: 'relationship',
      relationTo: 'attorneys',
      required: false,
      hasMany: true,
      index: true,
      admin: {
        description: 'Attorney(s) this testimonial is about',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display this testimonial prominently',
      },
    },
  ],
}
