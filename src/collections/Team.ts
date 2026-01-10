import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
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
        description: 'URL-friendly identifier (e.g., john-doe)',
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Attorney', value: 'attorney' },
        { label: 'Paralegal', value: 'paralegal' },
        { label: 'Professional Staff', value: 'staff' },
      ],
      admin: {
        description: 'Team member role/position',
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
      admin: {
        description: 'Professional headshot photo',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
      admin: {
        description: 'Professional biography',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Job title (e.g., Senior Paralegal, Office Manager)',
      },
    },
    {
      name: 'linkedIn',
      type: 'text',
      admin: {
        description: 'LinkedIn profile URL',
      },
    },
  ],
}
