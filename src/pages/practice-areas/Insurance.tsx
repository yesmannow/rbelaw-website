import { PracticeAreaTemplate } from './PracticeAreaTemplate'

export function Insurance() {
  return (
    <PracticeAreaTemplate
      slug="insurance"
      title="Insurance"
      intro="Coverage opinions, extra-contractual claims, and defense of insureds across a range of risks."
      sections={[
        {
          title: 'Coverage & Defense',
          bullets: [
            'Coverage analysis and opinions',
            'Bad faith and extra-contractual claims',
            'Defense of insureds',
          ],
        },
      ]}
    />
  )
}
