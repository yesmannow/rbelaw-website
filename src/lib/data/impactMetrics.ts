/**
 * Impact Metrics Data
 * Success statistics for the RBE Insight Center
 */

export interface ImpactMetric {
  id: string
  value: number
  label: string
  suffix?: string
  prefix?: string
}

export const impactMetrics: ImpactMetric[] = [
  {
    id: 'cases-resolved',
    value: 1200,
    label: 'Cases Resolved',
    suffix: '+'
  },
  {
    id: 'years-experience',
    value: 50,
    label: 'Years of Corporate Excellence',
    suffix: '+'
  },
  {
    id: 'client-satisfaction',
    value: 98,
    label: 'Client Satisfaction',
    suffix: '%'
  },
  {
    id: 'attorneys',
    value: 20,
    label: 'Expert Attorneys',
    suffix: '+'
  }
]
