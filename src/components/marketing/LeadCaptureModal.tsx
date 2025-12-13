import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { submitLead } from '../../services/marketingService'
import type { LeadData } from '../../lib/types'

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  source: LeadData['source']
  title?: string
  description?: string
  metadata?: Record<string, unknown>
}

interface LeadFormData {
  name: string
  email: string
  company?: string
  role: string
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  source,
  title = 'Get Your Full Report',
  description = 'Enter your information to receive the complete calculation results and personalized recommendations.',
  metadata = {}
}: LeadCaptureModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>()

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)

    const leadData: LeadData = {
      email: data.email,
      name: data.name,
      phone: data.company,
      source,
      metadata: {
        ...metadata,
        role: data.role,
        company: data.company
      }
    }

    const success = await submitLead(leadData)
    
    setIsSubmitting(false)
    if (success) {
      setIsSuccess(true)
      setTimeout(() => {
        onClose()
        setIsSuccess(false)
      }, 2000)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
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
                onClick={onClose}
                className="absolute right-4 top-4 p-1 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Success!</h3>
                  <p className="text-sm text-neutral-600">
                    We'll email you the full report shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
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
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      {...register('company')}
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="role">I am a... *</Label>
                    <Select
                      id="role"
                      {...register('role', { required: 'Please select your role' })}
                    >
                      <option value="">Select one...</option>
                      <option value="employer">Employer</option>
                      <option value="insurer">Insurer/Adjuster</option>
                      <option value="individual">Individual/Employee</option>
                      <option value="contractor">Contractor</option>
                      <option value="hr_manager">HR Manager</option>
                      <option value="business_owner">Business Owner</option>
                      <option value="other">Other</option>
                    </Select>
                    {errors.role && (
                      <p className="text-xs text-red-600 mt-1">{errors.role.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Full Report'}
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
    </AnimatePresence>
  )
}
