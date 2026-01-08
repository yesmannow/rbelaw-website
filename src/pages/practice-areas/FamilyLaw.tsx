import { PracticeAreaTemplate } from './PracticeAreaTemplate'

export function FamilyLaw() {
  return (
    <PracticeAreaTemplate
      slug="family-law"
      title="Family Law"
      intro="Guidance through complex family matters including divorce, custody, and support."
      sections={[
        {
          title: 'Focus Areas',
          bullets: [
            'Divorce and legal separation',
            'Child custody and parenting time',
            'Child and spousal support',
            'Pre- and post-nuptial agreements',
          ],
        },
      ]}
    />
  )
}
