import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Button } from '../ui/Button'
import { submitLead } from '../../services/marketingService'
import type { CaseAssessmentData } from '../../lib/types'

interface QuizFormData {
  incidentType: string
  incidentDate: string
  hasContract: string
  name: string
  email: string
  phone: string
}

const incidentTypes = [
  'Personal Injury',
  'Insurance Dispute',
  'Contract Dispute',
  'Employment Issue',
  'Other'
]

export function CaseAssessmentQuiz() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<QuizFormData>()

  const totalSteps = 4
  const formData = watch()

  const onSubmit = async (data: QuizFormData) => {
    setIsSubmitting(true)
    
    const assessmentData: CaseAssessmentData = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      source: 'quiz',
      incidentType: data.incidentType,
      incidentDate: data.incidentDate,
      hasContract: data.hasContract,
      metadata: {
        answers: [
          { question: 'Type of Incident', answer: data.incidentType },
          { question: 'Date of Incident', answer: data.incidentDate },
          { question: 'Was there a contract?', answer: data.hasContract }
        ]
      }
    }

    const success = await submitLead(assessmentData)
    
    setIsSubmitting(false)
    if (success) {
      setIsComplete(true)
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.incidentType
      case 2:
        return formData.incidentDate
      case 3:
        return formData.hasContract
      default:
        return true
    }
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-12 px-4"
      >
        <Card className="text-center">
          <CardHeader>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                className="w-10 h-10 text-neutral-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <CardTitle className="text-2xl">Thank You for Your Submission!</CardTitle>
            <CardDescription className="text-base mt-2">
              Based on your answers, we recommend scheduling a consultation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-6">
              Our team will review your case details and reach out to you within 24 hours to
              discuss your legal options and next steps.
            </p>
            <div className="bg-neutral-50 p-6 rounded-sm text-left">
              <h4 className="font-semibold text-neutral-900 mb-3">What happens next:</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">1.</span>
                  We'll review your case assessment
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">2.</span>
                  A member of our team will contact you
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">3.</span>
                  We'll schedule your free consultation
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-2">
          Do I Have a Case?
        </h2>
        <p className="text-neutral-600">
          Answer a few quick questions to help us assess your situation.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-neutral-600 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent-gold"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <Label htmlFor="incidentType" className="text-base font-semibold">
                      What type of incident or issue are you facing?
                    </Label>
                    <div className="space-y-2">
                      {incidentTypes.map((type) => (
                        <label
                          key={type}
                          className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${
                            formData.incidentType === type
                              ? 'border-accent-gold bg-accent-gold/5'
                              : 'border-neutral-300 hover:border-accent-gold/50'
                          }`}
                        >
                          <input
                            type="radio"
                            value={type}
                            {...register('incidentType', { required: true })}
                            className="mr-3"
                          />
                          <span className="font-medium">{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.incidentType && (
                      <p className="text-sm text-red-600">Please select an incident type</p>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <Label htmlFor="incidentDate" className="text-base font-semibold">
                      When did the incident occur?
                    </Label>
                    <Input
                      type="date"
                      id="incidentDate"
                      {...register('incidentDate', { required: true })}
                      className="max-w-md"
                    />
                    {errors.incidentDate && (
                      <p className="text-sm text-red-600">Please provide the incident date</p>
                    )}
                    <p className="text-sm text-neutral-600">
                      This helps us understand whether your case falls within the statute of
                      limitations.
                    </p>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Label htmlFor="hasContract" className="text-base font-semibold">
                      Was there a written contract or agreement involved?
                    </Label>
                    <div className="space-y-2">
                      {['Yes', 'No', 'Not Sure'].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${
                            formData.hasContract === option
                              ? 'border-accent-gold bg-accent-gold/5'
                              : 'border-neutral-300 hover:border-accent-gold/50'
                          }`}
                        >
                          <input
                            type="radio"
                            value={option}
                            {...register('hasContract', { required: true })}
                            className="mr-3"
                          />
                          <span className="font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors.hasContract && (
                      <p className="text-sm text-red-600">Please select an option</p>
                    )}
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Get Your Assessment Results</h3>
                      <p className="text-sm text-neutral-600">
                        Provide your contact information to receive your personalized case
                        assessment.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          {...register('name', { required: true })}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-sm text-red-600 mt-1">Name is required</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email', {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                          })}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 mt-1">Valid email is required</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone', { required: true })}
                          placeholder="(555) 123-4567"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600 mt-1">Phone is required</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
