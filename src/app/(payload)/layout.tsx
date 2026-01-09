/* THIS IS A GENERATED FILE - DO NOT EDIT */
/* Import this file in your Next.js app for Payload Admin UI access */
import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from './admin/importMap.js'
import type { ServerFunctionClient } from 'payload'

import React from 'react'

import './custom.scss'

type Args = {
  children: React.ReactNode
}

// Create a serverFunction that binds config and importMap to handleServerFunctions
const serverFunction: ServerFunctionClient = async (args) => {
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
