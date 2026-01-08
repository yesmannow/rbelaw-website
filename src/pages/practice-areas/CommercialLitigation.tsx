import { PracticeAreaTemplate } from './PracticeAreaTemplate'

export function CommercialLitigation() {
  return (
    <PracticeAreaTemplate
      slug="commercial-litigation"
      title="Commercial Litigation"
      intro="High-stakes commercial disputes, injunctions, and trial practice in state and federal courts."
      sections={[
        {
          title: 'Representative Matters',
          bullets: [
            'Complex commercial disputes',
            'Temporary restraining orders and preliminary injunctions',
            'Appellate briefing and oral argument',
          ],
        },
      ]}
    />
  )
}
