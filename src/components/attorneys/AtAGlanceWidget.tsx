import { motion } from 'framer-motion'
import { Clock, Briefcase, Building2, Globe } from 'lucide-react'

interface AtAGlanceData {
  yearsExperience?: number
  casesHandled?: number
  industriesServed?: string[]
  languages?: string[]
}

interface AtAGlanceWidgetProps {
  data: AtAGlanceData
}

export function AtAGlanceWidget({ data }: AtAGlanceWidgetProps) {
  const stats = [
    {
      icon: Clock,
      label: 'Years of Experience',
      value: data.yearsExperience ? `${data.yearsExperience}+` : 'N/A',
      show: !!data.yearsExperience
    },
    {
      icon: Briefcase,
      label: 'Cases Handled',
      value: data.casesHandled ? `${data.casesHandled}+` : 'N/A',
      show: !!data.casesHandled
    },
    {
      icon: Building2,
      label: 'Industries Served',
      value: data.industriesServed?.length || 0,
      show: !!data.industriesServed?.length
    },
    {
      icon: Globe,
      label: 'Languages',
      value: data.languages?.join(', ') || 'English',
      show: true
    }
  ].filter(stat => stat.show)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl border-2 border-neutral-200 p-6"
    >
      <h3 className="text-lg font-bold text-primary-navy mb-4">At a Glance</h3>
      
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-2 bg-accent-gold/10 rounded-lg text-accent-gold flex-shrink-0">
              <stat.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-neutral-500 font-medium mb-0.5">
                {stat.label}
              </div>
              <div className="text-sm font-bold text-primary-navy">
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {data.industriesServed && data.industriesServed.length > 0 && (
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <h4 className="text-sm font-bold text-primary-navy mb-3">Industry Focus</h4>
          <div className="flex flex-wrap gap-2">
            {data.industriesServed.map((industry, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-full"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
