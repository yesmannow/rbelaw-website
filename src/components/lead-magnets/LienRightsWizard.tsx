'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Download, CheckCircle2, FileText, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
import { Button } from '../ui/Button'
import { Progress } from '../ui/Progress'
import { useForm } from 'react-hook-form'
import { submitLead } from '../../services/marketingService'
import type { LeadData } from '../../lib/types'

// Step types
type ProjectType = 'residential' | 'commercial' | null
type Role = 'general-contractor' | 'subcontractor' | null

interface FormData {
  name: string
  email: string
}

interface TimelineInfo {
  title: string
  description: string
  details: string[]
  disclaimer: string
}

const timelineData: Record<string, TimelineInfo> = {
  'residential-general-contractor': {
    title: 'Residential General Contractor Timeline',
    description: 'As a general contractor on a residential project in Indiana, here are key lien rights timelines:',
    details: [
      'No Pre-Lien Notice required for general contractors on residential projects',
      'Mechanic\'s Lien must be filed within 60 days after the last furnishing of labor or materials',
      'Lien claim must be filed with the county recorder where the property is located',
      'Notice of Intent to Hold Lien should be sent to the property owner before filing',
    ],
    disclaimer: 'This is general educational information and does not constitute legal advice. Consult with an attorney for your specific situation.'
  },
  'residential-subcontractor': {
    title: 'Residential Subcontractor Timeline',
    description: 'As a subcontractor on a residential project in Indiana, here are key lien rights timelines:',
    details: [
      'Pre-Lien Notice (Notice of Intent to Hold Lien) required within 60 days of first furnishing labor or materials',
      'Pre-Lien Notice must be sent to the property owner and general contractor via certified mail',
      'Mechanic\'s Lien must be filed within 60 days after the last furnishing of labor or materials',
      'Lien foreclosure lawsuit must be filed within one year of filing the mechanic\'s lien',
    ],
    disclaimer: 'This is general educational information and does not constitute legal advice. Consult with an attorney for your specific situation.'
  },
  'commercial-general-contractor': {
    title: 'Commercial General Contractor Timeline',
    description: 'As a general contractor on a commercial project in Indiana, here are key lien rights timelines:',
    details: [
      'Notice requirements vary by tier and project type',
      'Mechanic\'s Lien must be filed within 60 days after the last furnishing of labor or materials',
      'For public projects, Payment Bond claims must be filed within specific timeframes',
      'Notice to Owner may be required depending on contract tier',
    ],
    disclaimer: 'This is general educational information and does not constitute legal advice. Commercial projects have complex requirements - consult with an attorney.'
  },
  'commercial-subcontractor': {
    title: 'Commercial Subcontractor Timeline',
    description: 'As a subcontractor on a commercial project in Indiana, here are key lien rights timelines:',
    details: [
      'Pre-Lien Notice typically required within 60 days of first furnishing labor or materials',
      'Notice requirements vary by tier (first-tier vs. lower-tier subcontractors)',
      'Mechanic\'s Lien must be filed within 60 days after the last furnishing of labor or materials',
      'For public projects, strict Payment Bond claim procedures apply (typically 90 days)',
      'Additional notices may be required for projects with general contractors',
    ],
    disclaimer: 'This is general educational information and does not constitute legal advice. Commercial projects have complex requirements - consult with an attorney.'
  }
}

export function LienRightsWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectType, setProjectType] = useState<ProjectType>(null)
  const [role, setRole] = useState<Role>(null)
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleProjectTypeSelect = (type: ProjectType) => {
    setProjectType(type)
    handleNext()
  }

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole)
    handleNext()
  }

  const handleDownloadClick = () => {
    setShowDownloadModal(true)
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    const leadData: LeadData = {
      email: data.email,
      name: data.name,
      source: 'lien_wizard',
      metadata: {
        projectType,
        role,
        timestamp: new Date().toISOString()
      }
    }

    const success = await submitLead(leadData)
    
    setIsSubmitting(false)
    if (success) {
      setIsSuccess(true)
      setTimeout(() => {
        setShowDownloadModal(false)
        setIsSuccess(false)
        reset()
      }, 2000)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setProjectType(null)
    setRole(null)
    setShowDownloadModal(false)
    setIsSuccess(false)
    reset()
  }

  const getTimelineKey = (): string => {
    if (!projectType || !role) return ''
    return `${projectType}-${role}`
  }

  const currentTimeline = timelineData[getTimelineKey()]

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  const [direction, setDirection] = useState(0)

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-primary-navy/20 shadow-corporate">
        <CardHeader className="bg-gradient-to-br from-primary-navy to-primary-slate text-white">
          <CardTitle className="text-white text-2xl">Indiana Lien Rights Wizard</CardTitle>
          <CardDescription className="text-white/90">
            Understand your construction lien deadlines and requirements
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="h-2 bg-white/20" />
            <p className="text-xs text-white/70 mt-2">Step {currentStep} of {totalSteps}</p>
          </div>
        </CardHeader>

        <CardContent className="min-h-[400px] pt-8">
          <AnimatePresence mode="wait" custom={direction}>
            {/* Step 1: Project Type */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-semibold text-primary-navy mb-2">
                    What type of project are you working on?
                  </h3>
                  <p className="text-neutral-600">
                    Select the project type to get relevant timeline information
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      handleProjectTypeSelect('residential')
                      paginate(1)
                    }}
                    className="group relative p-8 border-2 border-neutral-200 rounded-lg hover:border-primary-navy hover:bg-primary-navy/5 transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-accent-tan/20 rounded-full flex items-center justify-center group-hover:bg-primary-navy/10 transition-colors">
                        <svg className="w-8 h-8 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-primary-navy mb-2">Residential</h4>
                      <p className="text-sm text-neutral-600">
                        Single-family homes, condos, or residential developments
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleProjectTypeSelect('commercial')
                      paginate(1)
                    }}
                    className="group relative p-8 border-2 border-neutral-200 rounded-lg hover:border-primary-navy hover:bg-primary-navy/5 transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-accent-tan/20 rounded-full flex items-center justify-center group-hover:bg-primary-navy/10 transition-colors">
                        <svg className="w-8 h-8 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-primary-navy mb-2">Commercial</h4>
                      <p className="text-sm text-neutral-600">
                        Office buildings, retail, industrial, or public projects
                      </p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Role */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-semibold text-primary-navy mb-2">
                    What is your role on the project?
                  </h3>
                  <p className="text-neutral-600">
                    Your role determines specific notice requirements
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      handleRoleSelect('general-contractor')
                      paginate(1)
                    }}
                    className="group relative p-8 border-2 border-neutral-200 rounded-lg hover:border-primary-navy hover:bg-primary-navy/5 transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-accent-tan/20 rounded-full flex items-center justify-center group-hover:bg-primary-navy/10 transition-colors">
                        <svg className="w-8 h-8 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-primary-navy mb-2">General Contractor</h4>
                      <p className="text-sm text-neutral-600">
                        Direct contract with property owner
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handleRoleSelect('subcontractor')
                      paginate(1)
                    }}
                    className="group relative p-8 border-2 border-neutral-200 rounded-lg hover:border-primary-navy hover:bg-primary-navy/5 transition-all duration-300"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-accent-tan/20 rounded-full flex items-center justify-center group-hover:bg-primary-navy/10 transition-colors">
                        <svg className="w-8 h-8 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-primary-navy mb-2">Subcontractor</h4>
                      <p className="text-sm text-neutral-600">
                        Contract with general contractor or another subcontractor
                      </p>
                    </div>
                  </button>
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleBack()
                      paginate(-1)
                    }}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && currentTimeline && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-primary-navy mb-2">
                    {currentTimeline.title}
                  </h3>
                  <p className="text-neutral-600">
                    {currentTimeline.description}
                  </p>
                </div>

                <div className="bg-accent-tan/10 border-l-4 border-primary-navy p-6 rounded-r-lg">
                  <h4 className="font-semibold text-primary-navy mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Key Timeline Requirements:
                  </h4>
                  <ul className="space-y-3">
                    {currentTimeline.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-primary-navy">{index + 1}</span>
                        </div>
                        <span className="text-sm text-neutral-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Important:</strong> {currentTimeline.disclaimer}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4 mt-8">
                  <Button
                    onClick={handleDownloadClick}
                    className="bg-primary-navy hover:bg-primary-slate text-white px-8 py-3 flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Compliance Checklist
                  </Button>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleBack()
                        paginate(-1)
                      }}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleReset}
                      className="text-primary-navy"
                    >
                      Start Over
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Download Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md"
            >
              <Card>
                <CardHeader className="relative">
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="absolute right-4 top-4 p-1 rounded-full hover:bg-neutral-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <CardTitle>Download Your Compliance Checklist</CardTitle>
                  <CardDescription>
                    Enter your email to receive the customized Indiana Lien Rights Compliance Checklist
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">Success!</h3>
                      <p className="text-sm text-neutral-600">
                        We'll email you the compliance checklist shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          {...register('name', { required: 'Name is required' })}
                          placeholder="John Doe"
                          className="w-full px-4 py-2 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                        />
                        {errors.name && (
                          <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          placeholder="john@company.com"
                          className="w-full px-4 py-2 border border-neutral-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary-navy hover:bg-primary-slate text-white"
                      >
                        {isSubmitting ? 'Sending...' : 'Get Checklist'}
                      </Button>

                      <p className="text-xs text-neutral-500 text-center">
                        By submitting, you agree to receive email communication from Riley Bennett Egloff LLP.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
