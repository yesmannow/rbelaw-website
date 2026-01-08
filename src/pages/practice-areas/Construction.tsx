import { PracticeAreaTemplate } from './PracticeAreaTemplate'

export function Construction() {
  return (
    <PracticeAreaTemplate
      slug="construction"
      title="Construction"
      intro="Contracts, risk management, claims, lien rights, and dispute resolution for owners and contractors."
      sections={[
        {
          title: 'Services',
          bullets: [
            'Contract drafting and negotiation',
            'Mechanic’s liens and bond claims',
            'Change orders and delay claims',
            'Mediation, arbitration, and litigation',
          ],
        },
      ]}
    />
  )
}
