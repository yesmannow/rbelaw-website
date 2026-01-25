import { SEOMeta } from '@/components/seo/SEOMeta'
import { AINewsDigest } from '@/components/news/AINewsDigest'
import { PageHeader } from '@/components/layout/PageHeader'

export function AINewsDigestPage() {
  return (
    <>
      <SEOMeta
        title="AI Legal News Digest | Riley Bennett Egloff LLP"
        description="AI-powered summaries of the latest legal developments. Stay informed with intelligent insights on legal news that matters to your business."
      />
      
      <div className="min-h-screen bg-neutral-50">
        <PageHeader
          title="AI Legal News Digest"
          subtitle="AI-powered summaries of the latest legal developments—focused on what matters to your business."
          backgroundImage="/images/stock%20images/indianapolis-1888215_1280.jpg"
        />
        <div className="section-container py-12">
          <AINewsDigest />
        </div>
      </div>
    </>
  )
}
