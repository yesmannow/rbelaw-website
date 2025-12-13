import { motion } from 'framer-motion'
import { SEOMeta } from '@/components/seo/SEOMeta'

export function AccessibilityStatement() {
  return (
    <>
      <SEOMeta
        title="Website Accessibility Statement | Riley Bennett Egloff LLP"
        description="Riley Bennett Egloff LLP is committed to providing a website that is accessible to all user groups."
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
              Website Accessibility Statement
            </h1>
            <p className="text-xl text-white/90">
              Our commitment to digital accessibility
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
            <p className="text-lg text-neutral-700 leading-relaxed mb-8">
              Riley Bennett Egloff LLP recognizes the importance of providing a website that is accessible to all user groups. 
              Please contact us if you have any questions or feedback regarding the accessibility of this site, or if you 
              experience any difficulty using it.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary-navy mt-12 mb-6">
              Accessibility Features
            </h2>
            <ul className="space-y-3 text-neutral-700">
              <li>All text uses relative font sizes so text can be enlarged or reduced using the text size options available in visual browsers.</li>
              <li>The site can be navigated without the use of a mouse through the use of access keys (see below).</li>
              <li>All pages are designed with separate cascading style sheets which can be replaced by user-defined style sheets.</li>
              <li>Semantic HTML and ARIA labels ensure compatibility with screen readers and assistive technologies.</li>
            </ul>

            <h2 className="text-3xl font-serif font-bold text-primary-navy mt-12 mb-6">
              Standards Compliance
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              The World Wide Web Consortium (W3C), along with other groups and standards bodies, has established technologies 
              for creating and interpreting web-based content. These technologies, which are referred to as web standards, are 
              carefully designed to deliver the greatest benefits to the greatest number of web users while ensuring the 
              long-term viability of any document published on the web.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-6">
              By designing and developing this website with these standards, we simplify and lower the cost of production and 
              maintenance and are able to deliver content that is accessible to more people and more types of Internet devices. 
              Websites developed along these lines will continue to function correctly as traditional desktop browsers evolve, 
              and as new Internet devices come to market.
            </p>

            <h2 className="text-3xl font-serif font-bold text-primary-navy mt-12 mb-6">
              Access Keys
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              Access keys have been implemented throughout the site. Access keys allow users to directly activate a link using 
              only their keyboard. A full list of the access keys used on this site is provided below.
            </p>

            <div className="bg-neutral-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-primary-navy mb-4">Access Key Functions</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 pr-4 font-semibold text-primary-navy">Access Key</th>
                    <th className="text-left py-3 font-semibold text-primary-navy">Function</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700">
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4 font-mono font-semibold">0</td>
                    <td className="py-3">Accessibility statement</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4 font-mono font-semibold">1</td>
                    <td className="py-3">Home page</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4 font-mono font-semibold">5</td>
                    <td className="py-3">About us</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4 font-mono font-semibold">9</td>
                    <td className="py-3">Contact us</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4 font-mono font-semibold">s</td>
                    <td className="py-3">Skip navigation</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono font-semibold">t</td>
                    <td className="py-3">Jump to top of page</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-serif font-bold text-primary-navy mt-8 mb-4">
              Browser-Specific Instructions
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-6">
              The procedure for access keys varies depending on which web browser you view the site with. The following table 
              shows the access key combinations for a range of popular web browsers:
            </p>

            <div className="bg-neutral-50 rounded-lg p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 pr-4 font-semibold text-primary-navy">OS</th>
                    <th className="text-left py-3 pr-4 font-semibold text-primary-navy">Browser</th>
                    <th className="text-left py-3 font-semibold text-primary-navy">Accesskey Combination</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700">
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Windows</td>
                    <td className="py-3 pr-4">Firefox</td>
                    <td className="py-3 font-mono text-sm">SHIFT + ALT + Accesskey</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Windows</td>
                    <td className="py-3 pr-4">Internet Explorer</td>
                    <td className="py-3 font-mono text-sm">ALT + Accesskey (to focus) + ENTER</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Windows</td>
                    <td className="py-3 pr-4">Chrome</td>
                    <td className="py-3 font-mono text-sm">ALT + Accesskey</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Mac</td>
                    <td className="py-3 pr-4">Firefox</td>
                    <td className="py-3 font-mono text-sm">SHIFT + CONTROL + Accesskey</td>
                  </tr>
                  <tr className="border-b border-neutral-100">
                    <td className="py-3 pr-4">Mac</td>
                    <td className="py-3 pr-4">Safari</td>
                    <td className="py-3 font-mono text-sm">CONTROL + Accesskey</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Mac</td>
                    <td className="py-3 pr-4">Chrome</td>
                    <td className="py-3 font-mono text-sm">CONTROL + OPTION + Accesskey</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-accent-gold/10 border-l-4 border-accent-gold rounded-r-lg p-6 mt-12">
              <h3 className="text-xl font-semibold text-primary-navy mb-3">Need Assistance?</h3>
              <p className="text-neutral-700">
                If you experience any difficulty accessing our website or have suggestions for improvement, 
                please contact us at{' '}
                <a href="mailto:info@rbelaw.com" className="text-accent-gold hover:underline font-semibold">
                  info@rbelaw.com
                </a>{' '}
                or call us at{' '}
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
