import { PracticeAreaTemplate } from './PracticeAreaTemplate'
import { OSHACalculator } from '@/components/tools/OSHACalculator'
import { LienCalculator } from '@/components/tools/LienCalculator'

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
    >
      {/* Tools: OSHA and Lien Calculators */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="section-container">
          <OSHACalculator />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="section-container">
          <LienCalculator />
        </div>
      </section>
    </PracticeAreaTemplate>
  )
}
