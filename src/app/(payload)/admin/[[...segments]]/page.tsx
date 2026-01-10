import config from '@payload-config'
import { RootPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const Page = async ({ params, searchParams }: Args) => {
  return <RootPage config={config} importMap={importMap} params={params} searchParams={searchParams} />
}

export default Page
