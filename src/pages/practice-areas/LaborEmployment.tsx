import { PracticeAreaTemplate } from './PracticeAreaTemplate'
import { FLSAWizard, KnowYourRightsQuiz } from '@/components/tools'

export function LaborEmployment() {
  return (
    <PracticeAreaTemplate
      slug="labor-employment"
      title="Labor & Employment"
      intro="Employment counseling, policy development, investigations, and defense of claims and agency charges."
      sections={[
        {
          title: 'Employer Counsel',
          bullets: [
            'Handbooks, policies, and training',
            'EEOC, DOL, and state agency charges',
            'Discrimination, harassment, and retaliation claims',
            'Non-compete and restrictive covenants',
          ],
        },
      ]}
    >
      {/* Tools: FLSA Wizard and Employment Law Quiz */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="section-container">
          <FLSAWizard />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="section-container">
          <KnowYourRightsQuiz />
        </div>
      </section>
    </PracticeAreaTemplate>
  )
}
