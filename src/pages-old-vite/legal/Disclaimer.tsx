import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { SEOMeta } from '@/components/seo/SEOMeta'

export function Disclaimer() {
  return (
    <>
      <SEOMeta
        title="Disclaimer | Riley Bennett Egloff LLP"
        description="Important legal information regarding the use of this website and attorney-client relationships."
      />

      <div className="bg-gradient-to-br from-primary-navy to-primary-slate py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Disclaimer
            </h1>
            <p className="text-xl text-white/90">
              Important legal information and notices
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="section-container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="prose prose-lg prose-slate max-w-none"
          >
            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-6 mb-12">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-serif font-bold text-primary-navy mt-0 mb-3">
                    No Attorney-Client Relationship
                  </h2>
                  <p className="text-neutral-800 leading-relaxed mb-0">
                    The use of this website and/or any information contained herein does not create any attorney-client 
                    relationship between you and Riley Bennett Egloff, LLP (the "Firm"), or any of its attorneys. An 
                    attorney-client relationship will not be created until we have determined that our representation of 
                    you will not create a professional conflict of interest, and until we confirm in writing to you that 
                    an attorney-client relationship has been established.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-neutral-700 leading-relaxed mb-8">
              Prior to acting on any information or other material contained on this website, you should seek and retain 
              professional counsel in your state or other jurisdiction, as applicable. You may not rely upon or act on any 
              information contained on this website without seeking and engaging a competent attorney licensed to practice 
              law in the appropriate jurisdiction.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-semibold text-red-900 mb-3">
                Important: Confidential Information
              </h3>
              <p className="text-neutral-800 leading-relaxed mb-0">
                When making any inquiries through this website, or information contained herein, please do not transmit or 
                send confidential or privileged information before speaking with an attorney. While we attempt to maintain a 
                secure e-mail server, we cannot guarantee the security or receipt of any transmission by you utilizing the 
                Internet, or any link provided by this website.
              </p>
            </div>

            <h2 className="text-3xl font-serif font-bold text-primary-navy mt-12 mb-6">
              Practice Jurisdictions
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-8">
              Riley Bennett Egloff, LLP is an Indiana law firm. However, some of the Firm's lawyers are also admitted to 
              practice in other states. Always directly confirm with the individual attorney whom you contact whether he or 
              she practices the type of law with which you need assistance in your jurisdiction.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary-navy mt-12 mb-6">
              Links to Other Websites
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-8">
              If this site contains links to other websites, please be advised that the Firm does not warrant or otherwise 
              represent the accuracy of and/or the source of information contained on any such website that you may access 
              from this site, or from a site that provides links to this website. The Firm disclaims any and all liability 
              for the content of such other sites.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary-navy mt-12 mb-6">
              No Guarantee of Results
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-8">
              The information provided on this website is for general informational purposes only. Case results and client 
              testimonials do not guarantee or predict a similar outcome in any future case, as each legal matter is unique 
              and dependent on its specific facts and circumstances.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary-navy mt-12 mb-6">
              Attorney Advertising
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-8">
              This website may constitute attorney advertising in some jurisdictions. Prior results do not guarantee a 
              similar outcome. The choice of a lawyer is an important decision and should not be based solely upon 
              advertisements.
            </p>

            <div className="bg-neutral-50 rounded-lg p-6 mt-12">
              <h3 className="text-xl font-semibold text-primary-navy mb-3">Questions?</h3>
              <p className="text-neutral-700 mb-0">
                If you have questions about this disclaimer or our legal services, please contact us at{' '}
                <a href="mailto:info@rbelaw.com" className="text-accent-gold hover:underline font-semibold">
                  info@rbelaw.com
                </a>{' '}
                or call{' '}
                <a href="tel:+13176368000" className="text-accent-gold hover:underline font-semibold">
                  317.636.8000
                </a>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
