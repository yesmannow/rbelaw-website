import { useState } from 'react'
import { CaseTimeline } from '../../components/interactive/CaseTimeline'
import { CaseAssessmentQuiz } from '../../components/interactive/CaseAssessmentQuiz'
import { StickyAuthorCTA } from '../../components/blog/StickyAuthorCTA'
import { Button } from '../../components/ui/Button'

/**
 * Demo Page for Interactive Conversion Components
 * 
 * This page showcases the new high-conversion interactive components:
 * 1. CaseTimeline - Interactive litigation process timeline
 * 2. CaseAssessmentQuiz - Multi-step case qualification form
 * 3. StickyAuthorCTA - Scroll-triggered author contact widget
 */
export function DemoPage() {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  const handleAuthorContact = () => {
    setShowContactModal(true)
    alert('Contact modal would open here with pre-filled context')
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold mb-4">
            Interactive Conversion Components Demo
          </h1>
          <p className="text-lg text-neutral-300">
            Showcasing high-conversion features for the RBE Law website
          </p>
        </div>
      </div>

      {/* Component Showcase */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* CaseTimeline Demo */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-2">
              1. Interactive Case Timeline
            </h2>
            <p className="text-neutral-600">
              Demystifies the litigation process with smooth animations and detailed stage information.
            </p>
          </div>
          <div className="bg-white rounded-sm shadow-sm p-8">
            <CaseTimeline />
          </div>
        </section>

        {/* CaseAssessmentQuiz Demo */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-2">
              2. Case Assessment Quiz
            </h2>
            <p className="text-neutral-600">
              Multi-step wizard that qualifies leads and captures contact information.
            </p>
          </div>
          <div className="bg-white rounded-sm shadow-sm p-8">
            {!showQuiz ? (
              <div className="text-center py-12">
                <p className="text-neutral-600 mb-6">
                  Click the button below to start the interactive quiz experience.
                </p>
                <Button onClick={() => setShowQuiz(true)}>
                  Start Case Assessment
                </Button>
              </div>
            ) : (
              <CaseAssessmentQuiz />
            )}
          </div>
        </section>

        {/* StickyAuthorCTA Demo */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-2">
              3. Sticky Author CTA
            </h2>
            <p className="text-neutral-600">
              Appears when reader scrolls 75% through a blog post. Scroll down to see it!
            </p>
          </div>
          <div className="bg-white rounded-sm shadow-sm p-8">
            {/* Mock Blog Content */}
            <article className="prose max-w-none">
              <h3 className="text-2xl font-serif font-bold mb-4">
                Understanding Insurance Dispute Resolution
              </h3>
              
              <p className="mb-4">
                Insurance disputes can arise from a variety of circumstances, including denied claims,
                delayed payments, or disagreements over coverage terms. When facing such challenges,
                understanding your rights and the resolution process is crucial.
              </p>

              <h4 className="text-xl font-semibold mt-8 mb-3">Common Types of Insurance Disputes</h4>
              <p className="mb-4">
                Property damage claims, personal injury coverage, business interruption insurance,
                and health insurance denials are among the most common disputes we handle. Each type
                requires specific legal expertise and strategic approach.
              </p>

              <h4 className="text-xl font-semibold mt-8 mb-3">The Resolution Process</h4>
              <p className="mb-4">
                Most insurance disputes begin with an internal review by the insurance company.
                If this doesn't resolve the issue, policyholders have several options including
                mediation, arbitration, or litigation. The best approach depends on the specific
                circumstances of your case.
              </p>

              <h4 className="text-xl font-semibold mt-8 mb-3">When to Seek Legal Counsel</h4>
              <p className="mb-4">
                If your claim has been denied, significantly delayed, or if you're being offered
                a settlement that seems inadequate, it's time to consult with an experienced
                insurance dispute attorney. Early legal intervention can significantly improve
                your chances of a favorable outcome.
              </p>

              <h4 className="text-xl font-semibold mt-8 mb-3">Documentation is Key</h4>
              <p className="mb-4">
                Maintaining thorough documentation throughout the claims process is essential.
                This includes all correspondence with your insurance company, photographs of
                damages, medical records, receipts, and any other relevant evidence. This
                documentation becomes crucial if the dispute escalates to litigation.
              </p>

              <h4 className="text-xl font-semibold mt-8 mb-3">Timelines and Deadlines</h4>
              <p className="mb-4">
                Insurance disputes are subject to various statutory deadlines and limitations
                periods. Missing these deadlines can forfeit your rights to pursue your claim.
                It's important to act promptly and consult with legal counsel to ensure all
                deadlines are met.
              </p>

              <h4 className="text-xl font-semibold mt-8 mb-3">Settlement vs. Trial</h4>
              <p className="mb-4">
                While many insurance disputes are resolved through settlement negotiations,
                some cases proceed to trial. Your attorney can help you evaluate settlement
                offers and determine whether accepting a settlement or proceeding to trial
                is in your best interest based on the strength of your case and potential
                outcomes.
              </p>

              {/* Add more content to make scrolling work */}
              <div className="h-96 flex items-center justify-center bg-neutral-50 rounded-sm my-8">
                <p className="text-center text-neutral-600">
                  Scroll down past 75% of this page to see the Sticky Author CTA appear!
                  <br />
                  <span className="text-sm">(The widget will appear in the bottom-right corner)</span>
                </p>
              </div>

              <h4 className="text-xl font-semibold mt-8 mb-3">Conclusion</h4>
              <p className="mb-4">
                Navigating insurance disputes requires patience, persistence, and often professional
                legal assistance. Understanding the process and your rights can help you achieve
                a fair resolution to your claim.
              </p>
            </article>
          </div>
        </section>

        {/* Marketing Service Info */}
        <section className="bg-accent-gold/10 rounded-sm p-8">
          <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-4">
            4. Marketing Service Layer
          </h2>
          <p className="text-neutral-600 mb-4">
            All forms integrate with <code className="bg-neutral-900 text-white px-2 py-1 rounded">
            src/services/marketingService.ts</code>, a centralized abstraction for Mailchimp and CRM integration.
          </p>
          <div className="bg-white rounded-sm p-6">
            <h3 className="font-semibold mb-3">Current Implementation:</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>✅ Mock implementation with console logging</li>
              <li>✅ Environment variable placeholders (VITE_MAILCHIMP_ENDPOINT, VITE_CRM_ENDPOINT)</li>
              <li>✅ Easy to swap with real API calls without changing components</li>
              <li>✅ Type-safe with TypeScript interfaces</li>
            </ul>
            <div className="mt-4 p-4 bg-neutral-50 rounded text-sm">
              <p className="font-semibold mb-2">To integrate real APIs later:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Add API keys to environment variables</li>
                <li>Uncomment API call code in marketingService.ts</li>
                <li>Test with real endpoints</li>
                <li>All forms automatically work with no component changes!</li>
              </ol>
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Author CTA - Active for demo */}
      <StickyAuthorCTA
        articleTitle="Understanding Insurance Dispute Resolution"
        authorName="Riley Bennett Egloff"
        authorEmail="contact@rbelaw.com"
        onContactClick={handleAuthorContact}
      />

      {/* Contact Modal Placeholder */}
      {showContactModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowContactModal(false)}
        >
          <div className="bg-white rounded-sm p-8 max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Contact Form</h3>
            <p className="text-neutral-600 mb-4">
              This would be a contact modal pre-filled with context from the article.
            </p>
            <Button onClick={() => setShowContactModal(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}
