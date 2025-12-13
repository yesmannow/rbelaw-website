import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AlertTriangle, Scale } from 'lucide-react'

export function Disclaimer() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-burgundy text-white py-16 lg:py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Scale className="h-10 w-10 text-accent-gold" />
              <h1 className="heading-primary text-white">
                Disclaimer
              </h1>
            </div>
            <p className="text-xl text-neutral-200 max-w-3xl">
              Important legal information regarding your use of this website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="section-container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-slate prose-lg max-w-none"
          >
            {/* Warning Box */}
            <div className="not-prose bg-amber-50 border-2 border-amber-400 rounded-lg p-6 mb-8">
              <div className="flex gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-serif font-bold text-neutral-900 mb-3">
                    No Attorney-Client Relationship
                  </h2>
                  <p className="text-neutral-700 mb-2">
                    The information provided on this website does not, and is not intended to, constitute 
                    legal advice. All information, content, and materials available on this site are for 
                    general informational purposes only.
                  </p>
                  <p className="text-neutral-700 mb-2">
                    Communication with Riley Bennett Egloff LLP through this website, including through 
                    contact forms or email, does not establish an attorney-client relationship. An 
                    attorney-client relationship is only formed after we have expressly agreed to represent 
                    you and you have signed an engagement letter.
                  </p>
                  <p className="text-neutral-700 mb-0">
                    <strong>Do not send us confidential information</strong> until you speak with one of 
                    our attorneys and receive authorization to send that information.
                  </p>
                </div>
              </div>
            </div>

            <h2>General Information Only</h2>
            <p>
              The content on this website is provided for general informational purposes only and should 
              not be relied upon as legal advice for any specific situation. The law is constantly changing, 
              and the information on this website may not be current or applicable to your particular 
              circumstances.
            </p>
            <p>
              Every legal matter is unique and requires individualized analysis. You should not act or 
              refrain from acting on the basis of any content included on this website without seeking 
              appropriate legal counsel for your specific situation.
            </p>

            <h2>Practice Jurisdictions</h2>
            <p>
              Riley Bennett Egloff LLP is licensed to practice law in the State of Indiana. Our attorneys 
              are not licensed to practice law in any other jurisdiction unless specifically stated otherwise. 
              Nothing on this website should be construed as an offer to provide legal services in any 
              jurisdiction where such an offer would be prohibited by law.
            </p>
            <p>
              If you reside outside of Indiana or if your legal matter involves issues in another 
              jurisdiction, please consult with an attorney licensed to practice in that jurisdiction.
            </p>

            <h2>No Guarantee of Results</h2>
            <p>
              Any case results or testimonials presented on this website do not constitute a guarantee, 
              warranty, or prediction regarding the outcome of your legal matter. Every case is different, 
              and past results do not guarantee future outcomes.
            </p>
            <p>
              The success of any legal matter depends on a variety of factors unique to each case. We 
              cannot guarantee that we will achieve the same or similar results in every case.
            </p>

            <h2>Links to Other Websites</h2>
            <p>
              This website may contain links to third-party websites for your convenience and information. 
              Riley Bennett Egloff LLP does not endorse, control, or assume responsibility for the content, 
              privacy policies, or practices of any third-party websites.
            </p>
            <p>
              We encourage you to review the terms of use and privacy policies of any third-party websites 
              you visit. Your use of third-party websites is at your own risk.
            </p>

            <h2>Website Modifications</h2>
            <p>
              Riley Bennett Egloff LLP reserves the right to modify, update, or discontinue any aspect of 
              this website at any time without notice. We make no commitment to update the information on 
              this website and assume no liability for any outdated or inaccurate information.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Riley Bennett Egloff LLP and its attorneys disclaim 
              all liability for any damages arising from your use of this website or reliance on any 
              information provided herein.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this disclaimer or would like to discuss a potential legal matter, 
              please <Link to="/contact" className="text-accent-gold hover:underline font-semibold">contact us</Link> to 
              schedule a consultation. We will be happy to discuss whether we can assist you with your legal needs.
            </p>

            <div className="not-prose bg-neutral-50 border border-neutral-200 rounded-lg p-6 my-6">
              <p className="text-neutral-900 mb-2">
                <strong>Riley Bennett Egloff LLP</strong>
              </p>
              <p className="text-neutral-700 mb-1">500 N. Meridian Street, Suite 550</p>
              <p className="text-neutral-700 mb-1">Indianapolis, IN 46204</p>
              <p className="text-neutral-700 mb-1">Phone: <a href="tel:+13176368000" className="text-accent-gold hover:underline">317.636.8000</a></p>
              <p className="text-neutral-700">Email: <a href="mailto:info@rbelaw.com" className="text-accent-gold hover:underline">info@rbelaw.com</a></p>
            </div>

            <p className="text-sm text-neutral-600 mt-8">
              <em>Last Updated: December 2024</em>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
