import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export function Accessibility() {
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
              <Shield className="h-10 w-10 text-accent-gold" />
              <h1 className="heading-primary text-white">
                Website Accessibility Statement
              </h1>
            </div>
            <p className="text-xl text-neutral-200 max-w-3xl">
              Riley Bennett Egloff LLP is committed to ensuring digital accessibility for all users.
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
            <h2>Our Commitment</h2>
            <p>
              Riley Bennett Egloff LLP recognizes the importance of providing a website that is accessible 
              to all user groups and takes seriously its responsibility to make web content accessible and 
              user-friendly to everyone. This website is designed to conform to level AA of the World Wide 
              Web Consortium (W3C) Web Content Accessibility Guidelines 2.1 (WCAG 2.1).
            </p>

            <h2>Accessibility Features</h2>
            <p>
              Our website includes the following accessibility features:
            </p>
            <ul>
              <li>Semantic HTML markup for proper structure and navigation</li>
              <li>Alternative text for images and graphics</li>
              <li>Keyboard navigation support throughout the site</li>
              <li>Color contrast ratios that meet WCAG AA standards</li>
              <li>Readable and scalable text</li>
              <li>Clear and consistent navigation</li>
              <li>Skip navigation links for screen reader users</li>
            </ul>

            <h2>Access Keys</h2>
            <p>
              This website supports the following access keys for enhanced keyboard navigation:
            </p>
            
            <div className="not-prose my-8">
              <table className="min-w-full border border-neutral-300">
                <thead className="bg-neutral-100">
                  <tr>
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-900">
                      Access Key
                    </th>
                    <th className="border border-neutral-300 px-4 py-3 text-left font-semibold text-neutral-900">
                      Destination
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr>
                    <td className="border border-neutral-300 px-4 py-3 font-mono text-sm">Alt + H</td>
                    <td className="border border-neutral-300 px-4 py-3">Homepage</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-300 px-4 py-3 font-mono text-sm">Alt + A</td>
                    <td className="border border-neutral-300 px-4 py-3">About</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-3 font-mono text-sm">Alt + P</td>
                    <td className="border border-neutral-300 px-4 py-3">Practice Areas</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-300 px-4 py-3 font-mono text-sm">Alt + T</td>
                    <td className="border border-neutral-300 px-4 py-3">Team</td>
                  </tr>
                  <tr>
                    <td className="border border-neutral-300 px-4 py-3 font-mono text-sm">Alt + C</td>
                    <td className="border border-neutral-300 px-4 py-3">Contact</td>
                  </tr>
                  <tr className="bg-neutral-50">
                    <td className="border border-neutral-300 px-4 py-3 font-mono text-sm">Alt + N</td>
                    <td className="border border-neutral-300 px-4 py-3">Newsroom</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Browser Shortcuts</h3>
            <p>
              How to use access keys varies depending on your browser and operating system:
            </p>
            <ul>
              <li><strong>Windows:</strong> Alt + Access Key</li>
              <li><strong>Mac:</strong> Control + Option + Access Key</li>
              <li><strong>Chrome/Edge:</strong> Alt + Access Key (Windows) or Control + Option + Access Key (Mac)</li>
              <li><strong>Firefox:</strong> Alt + Shift + Access Key (Windows) or Control + Option + Access Key (Mac)</li>
              <li><strong>Safari:</strong> Control + Option + Access Key</li>
            </ul>

            <h2>Standards Compliance</h2>
            <p>
              This website strives to conform to the following standards:
            </p>
            <ul>
              <li>WCAG 2.1 Level AA compliance</li>
              <li>Section 508 of the Rehabilitation Act</li>
              <li>Americans with Disabilities Act (ADA) requirements for web accessibility</li>
            </ul>

            <h2>Ongoing Efforts</h2>
            <p>
              We are continuously working to improve the accessibility of our website. We regularly test 
              our site using assistive technologies and welcome feedback from our users to help us identify 
              areas for improvement.
            </p>

            <h2>Feedback and Contact</h2>
            <p>
              If you experience any difficulty accessing any part of this website or have suggestions for 
              improvement, please contact us:
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
