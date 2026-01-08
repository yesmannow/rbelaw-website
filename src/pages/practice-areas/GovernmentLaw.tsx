import { PracticeAreaTemplate } from './PracticeAreaTemplate'

export function GovernmentLaw() {
  return (
    <PracticeAreaTemplate
      slug="government-law"
      title="Government Law"
      intro="Representation for governmental entities and regulated businesses on compliance and public matters."
      sections={[
        {
          title: 'Capabilities',
          bullets: [
            'Open records and meeting laws',
            'Ordinances, resolutions, and policy drafting',
            'Procurement and public contracts',
            'Administrative appeals and compliance',
          ],
        },
      ]}
    />
  )
}
