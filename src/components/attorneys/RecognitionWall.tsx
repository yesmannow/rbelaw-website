import { motion } from 'framer-motion'
import { Award, Star, Trophy, Medal } from 'lucide-react'

interface Recognition {
  id: string
  title: string
  organization: string
  year: string
  description?: string
  logo?: string
}

interface RecognitionWallProps {
  awards?: string[]
  recognitions?: Recognition[]
}

export function RecognitionWall({ awards = [], recognitions = [] }: RecognitionWallProps) {
  // Convert simple awards array to Recognition objects
  const allRecognitions: Recognition[] = [
    ...awards.map((award, index) => ({
      id: `award-${index}`,
      title: award,
      organization: 'Professional Recognition',
      year: new Date().getFullYear().toString()
    })),
    ...recognitions
  ]

  if (allRecognitions.length === 0) return null

  const getIcon = (index: number) => {
    const icons = [Award, Star, Trophy, Medal]
    const Icon = icons[index % icons.length]
    return <Icon className="h-6 w-6" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {allRecognitions.map((recognition, index) => (
        <motion.div
          key={recognition.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group"
        >
          <div className="bg-gradient-to-br from-white to-neutral-50 rounded-xl p-6 border-2 border-neutral-200 hover:border-accent-gold hover:shadow-xl transition-all duration-300 h-full">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="p-3 bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 rounded-lg text-accent-gold group-hover:scale-110 transition-transform">
                {getIcon(index)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-bold text-primary-navy group-hover:text-accent-gold transition-colors leading-tight">
                    {recognition.title}
                  </h3>
                  <span className="px-2 py-1 bg-accent-gold/10 text-accent-gold text-xs font-bold rounded ml-2 flex-shrink-0">
                    {recognition.year}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 font-medium mb-1">
                  {recognition.organization}
                </p>
                {recognition.description && (
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {recognition.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
