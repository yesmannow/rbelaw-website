import { PracticeAreaTemplate } from './PracticeAreaTemplate'

export function WillsTrustsEstates() {
  return (
    <PracticeAreaTemplate
      slug="wills-trusts-estates"
      title="Wills, Trusts & Estates"
      intro="Estate planning, trust administration, and wealth transfer strategies for individuals and families."
      sections={[
        {
          title: 'Planning & Administration',
          bullets: [
            'Wills, trusts, and powers of attorney',
            'Trust administration and fiduciary counsel',
            'Business succession and estate tax strategy',
          ],
        },
      ]}
    />
  )
}
