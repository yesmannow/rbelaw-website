import { PracticeAreaTemplate } from './PracticeAreaTemplate'

export function RealEstate() {
  return (
    <PracticeAreaTemplate
      slug="real-estate"
      title="Real Estate"
      intro="Acquisitions, leasing, finance, development, and dispute resolution for real property matters."
      sections={[
        {
          title: 'Services',
          bullets: [
            'Commercial and industrial acquisitions',
            'Leasing and property management',
            'Development and land use',
            'Real estate finance and workouts',
          ],
        },
      ]}
    />
  )
}
