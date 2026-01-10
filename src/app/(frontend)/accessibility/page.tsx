export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-[#0A2540] to-[#134067] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
            Accessibility Statement
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-[#0A2540] mb-4">Our Commitment to Accessibility</h2>
          <p className="mb-6 text-gray-700">
            Riley Bennett Egloff LLP is committed to ensuring digital accessibility for people with disabilities.
            We are continually improving the user experience for everyone and applying the relevant accessibility
            standards.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">Conformance Status</h2>
          <p className="mb-6 text-gray-700">
            We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These
            guidelines explain how to make web content more accessible for people with disabilities and user-friendly
            for everyone.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">Accessibility Features</h2>
          <p className="mb-4 text-gray-700">This website includes the following accessibility features:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Keyboard navigation support</li>
            <li>Screen reader compatibility</li>
            <li>Semantic HTML structure</li>
            <li>Alternative text for images</li>
            <li>Sufficient color contrast ratios</li>
            <li>Responsive design for various screen sizes</li>
            <li>Clear and consistent navigation</li>
            <li>Readable fonts and text sizes</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">Known Limitations</h2>
          <p className="mb-6 text-gray-700">
            Despite our best efforts to ensure accessibility, there may be some limitations. We are actively working
            to identify and remediate any accessibility barriers. If you encounter any accessibility issues, please
            let us know.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">Third-Party Content</h2>
          <p className="mb-6 text-gray-700">
            Some content on this website may be provided by third parties. We cannot guarantee the accessibility of
            third-party content but will make reasonable efforts to ensure such content meets accessibility standards.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">Feedback and Contact Information</h2>
          <p className="mb-4 text-gray-700">
            We welcome your feedback on the accessibility of this website. If you encounter accessibility barriers
            or have suggestions for improvement, please contact us:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="mb-2 text-gray-700">
              <strong>Phone:</strong>{' '}
              <a href="tel:3176368000" className="text-[#B8860B] hover:underline">
                (317) 636-8000
              </a>
            </p>
            <p className="mb-2 text-gray-700">
              <strong>Email:</strong>{' '}
              <a href="mailto:info@rbelaw.com" className="text-[#B8860B] hover:underline">
                info@rbelaw.com
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> 500 N. Meridian Street, Suite 550, Indianapolis, IN 46204
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">Assessment and Testing</h2>
          <p className="mb-6 text-gray-700">
            Riley Bennett Egloff LLP regularly assesses the accessibility of this website using automated tools,
            manual testing, and user feedback. We are committed to ongoing accessibility improvements.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">Formal Complaints</h2>
          <p className="mb-6 text-gray-700">
            If you are not satisfied with our response to your accessibility concern, you may file a formal complaint.
            We aim to respond to all accessibility feedback within 5 business days.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              This accessibility statement was last reviewed and updated in January 2026.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
