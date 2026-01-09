/* THIS IS A GENERATED FILE - DO NOT EDIT */
/* Import this file in your Next.js app for Payload Admin UI access */
import config from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap.js'

import React from 'react'

import './custom.scss'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap}>{children}</RootLayout>
)

export default Layout
