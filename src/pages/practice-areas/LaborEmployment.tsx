import { PracticeAreaTemplate } from './PracticeAreaTemplate'

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
    />
  )
}
