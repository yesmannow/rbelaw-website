import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { attorneys } from '@/lib/data/attorney-helpers'
import { generateVCard } from '@/lib/utils/vcard'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { AttorneyCard } from '@/components/attorneys/AttorneyCard'

export function AttorneysPage() {
  const downloadAllVCards = () => {
    try {
      const vcards = attorneys
        .map((a) => generateVCard(a))
        .join('\r\n')
      const blob = new Blob([vcards], { type: 'text/vcard;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'RBE-Attorneys.vcf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error('Error generating bulk vCards', e)
    }
  }
  return (
    <>
      <SEOMeta
        title="Our Attorneys"
        description="Meet our team of experienced legal professionals committed to delivering exceptional results."
      />

      <div>
        {/* Hero Section - Improved Spacing */}
        <section className="bg-gradient-to-br from-primary-navy via-primary-navy to-primary-burgundy text-white pt-24 pb-20 lg:pt-32 lg:pb-24">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                Our Attorneys
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-100 mb-8 leading-relaxed">
                Meet our team of experienced legal professionals committed to delivering exceptional results.
              </p>
              <button
                onClick={downloadAllVCards}
                className="inline-flex items-center gap-3 rounded-lg bg-white text-primary-navy px-6 py-3 font-semibold hover:bg-neutral-100 transition-all shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Download All vCards
              </button>
            </motion.div>
          </div>
        </section>

        {/* Attorneys Grid */}
        <section className="py-16 lg:py-24 bg-neutral-50">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attorneys.map((attorney, index) => (
                <AttorneyCard
                  key={attorney.id}
                  attorney={attorney}
                  index={index}
                  showContact={true}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
