import { SEOMeta } from '@/components/seo/SEOMeta'
import { AINewsDigest } from '@/components/news/AINewsDigest'

export function AINewsDigestPage() {
  return (
    <>
      <SEOMeta
        title="AI Legal News Digest | Riley Bennett Egloff LLP"
        description="AI-powered summaries of the latest legal developments. Stay informed with intelligent insights on legal news that matters to your business."
      />
      
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="section-container">
          <AINewsDigest />
        </div>
      </div>
    </>
  )
}
