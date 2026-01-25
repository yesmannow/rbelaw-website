import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Award, TrendingUp } from 'lucide-react'
import type { Education } from '@/lib/types'

interface TimelineEvent {
  year: string
  title: string
  description: string
  type: 'education' | 'career' | 'award' | 'milestone'
  icon?: React.ReactNode
}

interface TimelineVisualizationProps {
  education?: Education[]
  careerMilestones?: TimelineEvent[]
  awards?: TimelineEvent[]
}

export function TimelineVisualization({ 
  education = [], 
  careerMilestones = [],
  awards = []
}: TimelineVisualizationProps) {
  // Combine and sort all events by year
  const allEvents: TimelineEvent[] = [
    ...education.map(edu => ({
      year: edu.year,
      title: edu.degree,
      description: edu.institution,
      type: 'education' as const,
      icon: <GraduationCap className="h-5 w-5" />
    })),
    ...careerMilestones,
    ...awards
  ].sort((a, b) => parseInt(b.year) - parseInt(a.year))

  const getEventColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'bg-blue-500'
      case 'career':
        return 'bg-accent-gold'
      case 'award':
        return 'bg-green-500'
      case 'milestone':
        return 'bg-purple-500'
      default:
        return 'bg-neutral-500'
    }
  }

  const getEventIcon = (event: TimelineEvent) => {
    if (event.icon) return event.icon
    
    switch (event.type) {
      case 'education':
        return <GraduationCap className="h-5 w-5" />
      case 'career':
        return <Briefcase className="h-5 w-5" />
      case 'award':
        return <Award className="h-5 w-5" />
      case 'milestone':
        return <TrendingUp className="h-5 w-5" />
      default:
        return null
    }
  }

  if (allEvents.length === 0) return null

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-200" />

      {/* Events */}
      <div className="space-y-8">
        {allEvents.map((event, index) => (
          <motion.div
            key={`${event.year}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-20"
          >
            {/* Timeline dot */}
            <div className={`absolute left-6 top-2 w-5 h-5 rounded-full ${getEventColor(event.type)} border-4 border-white shadow-lg z-10`} />
            
            {/* Year badge */}
            <div className="absolute left-0 top-0 w-12 text-center">
              <span className="inline-block px-2 py-1 bg-primary-navy text-white text-xs font-bold rounded">
                {event.year}
              </span>
            </div>

            {/* Event card */}
            <div className="bg-white rounded-lg border-2 border-neutral-200 p-6 hover:border-accent-gold/30 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getEventColor(event.type)} bg-opacity-10 text-${event.type === 'education' ? 'blue' : event.type === 'award' ? 'green' : 'accent-gold'}-600 group-hover:scale-110 transition-transform`}>
                  {getEventIcon(event)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-primary-navy mb-1 group-hover:text-accent-gold transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-neutral-600">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
