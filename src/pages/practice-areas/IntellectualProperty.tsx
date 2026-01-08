import { PracticeAreaTemplate } from './PracticeAreaTemplate'

export function IntellectualProperty() {
  return (
    <PracticeAreaTemplate
      slug="intellectual-property"
      title="Intellectual Property"
      intro="Brand protection, licensing, and enforcement of trade secrets, trademarks, and copyrights."
      sections={[
        {
          title: 'Capabilities',
          bullets: [
            'Trademark clearance and registration',
            'Licensing and IP transactions',
            'Trade secret strategy and enforcement',
          ],
        },
      ]}
    />
  )
}
