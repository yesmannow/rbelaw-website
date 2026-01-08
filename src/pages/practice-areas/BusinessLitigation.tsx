import { PracticeAreaTemplate } from './PracticeAreaTemplate'

export function BusinessLitigation() {
  return (
    <PracticeAreaTemplate
      slug="business-litigation"
      title="Business Litigation"
      intro="Disputes involving contracts, ownership, competition, trade secrets, and complex commercial issues."
      sections={[
        {
          title: 'Core Capabilities',
          bullets: [
            'Contract and partnership disputes',
            'Business torts and unfair competition',
            'Trade secret and non-compete enforcement',
            'Injunctions and emergency relief',
          ],
        },
      ]}
    />
  )
}
