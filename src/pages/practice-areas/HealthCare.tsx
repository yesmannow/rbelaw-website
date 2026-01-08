import { PracticeAreaTemplate } from './PracticeAreaTemplate'

export function HealthCare() {
  return (
    <PracticeAreaTemplate
      slug="health-care"
      title="Health Care"
      intro="Regulatory counsel, compliance, payer relations, and dispute resolution for health providers."
      sections={[
        {
          title: 'Services',
          bullets: [
            'Licensure and regulatory compliance',
            'Payer contracts and reimbursement disputes',
            'HIPAA and privacy compliance',
            'Peer review, privileging, and credentialing',
          ],
        },
      ]}
    />
  )
}
