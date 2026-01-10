export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gradient-to-b from-[#0A2540] to-[#134067] py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
            Disclaimer
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-[#0A2540] mb-4">Attorney Advertising</h2>
          <p className="mb-6 text-gray-700">
            This website is for informational purposes only and does not contain legal advice. The information
            presented at this site should not be construed to be formal legal advice nor the formation of an
            attorney/client relationship.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">No Attorney-Client Relationship</h2>
          <p className="mb-6 text-gray-700">
            The use of this website does not create an attorney-client relationship between you and Riley Bennett
            Egloff LLP. Do not send confidential information to the firm through this website. Any information sent
            through this website may not be protected by attorney-client privilege.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">No Legal Advice</h2>
          <p className="mb-6 text-gray-700">
            The content on this website is provided for general informational purposes only and is not intended to
            be legal advice. You should not act or refrain from acting based on any information on this website
            without seeking legal counsel. Laws change frequently and this information may not be current.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">Prior Results</h2>
          <p className="mb-6 text-gray-700">
            Prior results do not guarantee a similar outcome. Case results depend upon a variety of factors unique
            to each case. The outcome of a particular case cannot be predicated upon a lawyer's or law firm's past
            results.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">Jurisdiction</h2>
          <p className="mb-6 text-gray-700">
            Riley Bennett Egloff LLP is licensed to practice law in the State of Indiana. The information on this
            website may not be applicable in other jurisdictions.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">External Links</h2>
          <p className="mb-6 text-gray-700">
            This website may contain links to external websites. Riley Bennett Egloff LLP is not responsible for
            the content of external sites and does not endorse any content, products, or services provided by
            external websites.
          </p>

          <h2 className="text-2xl font-bold text-[#0A2540] mb-4 mt-8">Contact Us</h2>
          <p className="mb-6 text-gray-700">
            If you have questions about this disclaimer or wish to discuss a legal matter, please contact Riley
            Bennett Egloff LLP at (317) 636-8000 or{' '}
            <a href="mailto:info@rbelaw.com" className="text-[#B8860B] hover:underline">
              info@rbelaw.com
            </a>
            .
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Last Updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
