import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'

interface TimelineStage {
  id: string
  title: string
  description: string
  whatToExpect: string[]
  duration: string
}

const stages: TimelineStage[] = [
  {
    id: 'investigation',
    title: 'Investigation',
    description: 'Initial case review and evidence gathering',
    whatToExpect: [
      'Initial consultation with our legal team',
      'Review of all relevant documents and evidence',
      'Preliminary case assessment and strategy development',
      'Identification of key witnesses and experts'
    ],
    duration: '2-4 weeks'
  },
  {
    id: 'filing',
    title: 'Filing',
    description: 'Formal complaint filed with the court',
    whatToExpect: [
      'Preparation and filing of legal complaint',
      'Service of process to defendants',
      'Initial court scheduling and deadlines',
      'Response to any motions or counterclaims'
    ],
    duration: '1-2 weeks'
  },
  {
    id: 'discovery',
    title: 'Discovery',
    description: 'Exchange of information between parties',
    whatToExpect: [
      'Document requests and production',
      'Depositions of witnesses and parties',
      'Interrogatories and requests for admission',
      'Expert witness disclosures and reports'
    ],
    duration: '6-12 months'
  },
  {
    id: 'mediation',
    title: 'Mediation',
    description: 'Settlement negotiation with neutral mediator',
    whatToExpect: [
      'Selection of neutral mediator',
      'Pre-mediation briefs and preparation',
      'Full-day mediation session',
      'Follow-up negotiations if needed'
    ],
    duration: '1-2 months'
  },
  {
    id: 'trial',
    title: 'Trial',
    description: 'Court trial or arbitration hearing',
    whatToExpect: [
      'Pre-trial motions and hearings',
      'Jury selection (if applicable)',
      'Opening statements, witness testimony, closing arguments',
      'Verdict and judgment'
    ],
    duration: '1-3 weeks'
  },
  {
    id: 'resolution',
    title: 'Resolution',
    description: 'Final judgment and case closure',
    whatToExpect: [
      'Entry of final judgment',
      'Post-trial motions (if necessary)',
      'Appeals process (if applicable)',
      'Collection and enforcement of judgment'
    ],
    duration: 'Varies'
  }
]

export function CaseTimeline() {
  const [activeStage, setActiveStage] = useState<string | null>(stages[0]?.id || null)

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">
            Understanding the Litigation Process
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Navigate your case with confidence. Click each stage to learn what to expect.
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="relative mb-12 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-max px-4 md:px-0">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <motion.button
                  onClick={() => setActiveStage(stage.id)}
                  className="flex flex-col items-center group relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors ${
                      activeStage === stage.id
                        ? 'bg-accent-gold border-accent-gold text-neutral-900'
                        : 'bg-white border-neutral-300 text-neutral-600 group-hover:border-accent-gold/50'
                    }`}
                    animate={{
                      scale: activeStage === stage.id ? 1.1 : 1
                    }}
                  >
                    {index + 1}
                  </motion.div>
                  <span
                    className={`mt-3 text-sm font-medium text-center max-w-[100px] ${
                      activeStage === stage.id ? 'text-accent-gold' : 'text-neutral-600'
                    }`}
                  >
                    {stage.title}
                  </span>
                </motion.button>

                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <div
                    className={`h-0.5 w-16 md:w-24 lg:w-32 mx-2 transition-colors ${
                      activeStage === stage.id ||
                      (activeStage &&
                        stages.findIndex((s) => s.id === activeStage) > index)
                        ? 'bg-accent-gold'
                        : 'bg-neutral-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stage Details */}
        <AnimatePresence mode="wait">
          {activeStage && (
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {stages.find((s) => s.id === activeStage)?.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {stages.find((s) => s.id === activeStage)?.description}
                      </CardDescription>
                    </div>
                    <motion.div
                      className="px-4 py-2 bg-accent-gold/10 rounded-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-sm font-semibold text-neutral-900">
                        {stages.find((s) => s.id === activeStage)?.duration}
                      </p>
                    </motion.div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-neutral-900 mb-3">What to Expect:</h4>
                  <motion.ul
                    className="space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {stages
                      .find((s) => s.id === activeStage)
                      ?.whatToExpect.map((item, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start text-neutral-600"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                        >
                          <span className="text-accent-gold mr-2 mt-1">•</span>
                          {item}
                        </motion.li>
                      ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
