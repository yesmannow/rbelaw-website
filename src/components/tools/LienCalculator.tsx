import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { LeadCaptureModal } from '../marketing/LeadCaptureModal'

interface LienFormData {
  projectType: 'commercial' | 'residential'
  role: 'general_contractor' | 'subcontractor'
  workStartDate: string
  workEndDate?: string
}

interface Deadline {
  name: string
  date: Date
  description: string
  isPassed: boolean
  daysUntil: number
  isWarning: boolean
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function getDaysDifference(date1: Date, date2: Date): number {
  const diffTime = date2.getTime() - date1.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function calculateDeadlines(data: LienFormData): Deadline[] {
  const startDate = new Date(data.workStartDate)
  const endDate = data.workEndDate ? new Date(data.workEndDate) : new Date()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const deadlines: Deadline[] = []

  // Notice to Owner (NTO) - 60 days from first work for Residential
  if (data.projectType === 'residential' && data.role === 'subcontractor') {
    const ntoDate = addDays(startDate, 60)
    const daysUntil = getDaysDifference(today, ntoDate)
    deadlines.push({
      name: 'Notice to Owner (NTO)',
      date: ntoDate,
      description: 'Must be filed within 60 days of first furnishing labor or materials',
      isPassed: today > ntoDate,
      daysUntil,
      isWarning: daysUntil <= 14 && daysUntil >= 0
    })
  }

  // Mechanic's Lien Recording Deadline
  if (data.projectType === 'commercial') {
    // Commercial: 90 days from last work
    const lienDate = addDays(endDate, 90)
    const daysUntil = getDaysDifference(today, lienDate)
    deadlines.push({
      name: 'Mechanic\'s Lien Recording',
      date: lienDate,
      description: 'Must be recorded within 90 days of last furnishing labor or materials (Commercial)',
      isPassed: today > lienDate,
      daysUntil,
      isWarning: daysUntil <= 21 && daysUntil >= 0
    })
  } else {
    // Residential: 60 days from last work
    const lienDate = addDays(endDate, 60)
    const daysUntil = getDaysDifference(today, lienDate)
    deadlines.push({
      name: 'Mechanic\'s Lien Recording',
      date: lienDate,
      description: 'Must be recorded within 60 days of last furnishing labor or materials (Residential)',
      isPassed: today > lienDate,
      daysUntil,
      isWarning: daysUntil <= 14 && daysUntil >= 0
    })
  }

  // Lien Enforcement - 1 year from recording
  const lastLienDate = deadlines[deadlines.length - 1].date
  const enforcementDate = addDays(lastLienDate, 365)
  const enforcementDaysUntil = getDaysDifference(today, enforcementDate)
  deadlines.push({
    name: 'Lien Enforcement',
    date: enforcementDate,
    description: 'Action to foreclose must be filed within 1 year of lien recording',
    isPassed: today > enforcementDate,
    daysUntil: enforcementDaysUntil,
    isWarning: enforcementDaysUntil <= 60 && enforcementDaysUntil >= 0
  })

  return deadlines
}

export function LienCalculator() {
  const [deadlines, setDeadlines] = useState<Deadline[] | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useForm<LienFormData>()

  const formData = watch()

  const onSubmit = (data: LienFormData) => {
    const calculatedDeadlines = calculateDeadlines(data)
    setDeadlines(calculatedDeadlines)
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDeadlineIcon = (deadline: Deadline) => {
    if (deadline.isPassed) {
      return <AlertTriangle className="w-5 h-5 text-red-600" />
    }
    if (deadline.isWarning) {
      return <Clock className="w-5 h-5 text-yellow-600" />
    }
    return <CheckCircle className="w-5 h-5 text-green-600" />
  }

  const getDeadlineColor = (deadline: Deadline) => {
    if (deadline.isPassed) return 'border-red-200 bg-red-50'
    if (deadline.isWarning) return 'border-yellow-200 bg-yellow-50'
    return 'border-green-200 bg-green-50'
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Glassmorphism Header Card */}
      <Card className="mb-8 overflow-hidden border-0 bg-primary-navy/90 backdrop-blur-md shadow-lg">
        <CardHeader className="bg-primary-navy/90">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-3xl font-serif font-bold">
                Construction Lien Deadline Calculator
              </CardTitle>
              <CardDescription className="text-white/80 mt-1">
                Never miss a Notice to Owner or Mechanic's Lien filing deadline
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="mb-8">

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Don't lose your lien rights</p>
            <p>Missing these deadlines can cost you thousands. This calculator generates accurate timelines based on Indiana construction law.</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>
              Enter your project details to calculate filing deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="projectType">Project Type *</Label>
                <Select
                  id="projectType"
                  {...register('projectType', { required: 'Project type is required' })}
                >
                  <option value="">Select project type...</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                </Select>
                {errors.projectType && (
                  <p className="text-xs text-red-600 mt-1">{errors.projectType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="role">Your Role *</Label>
                <Select
                  id="role"
                  {...register('role', { required: 'Role is required' })}
                >
                  <option value="">Select your role...</option>
                  <option value="general_contractor">General Contractor</option>
                  <option value="subcontractor">Subcontractor</option>
                </Select>
                {errors.role && (
                  <p className="text-xs text-red-600 mt-1">{errors.role.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="workStartDate">Date Work Started *</Label>
                <Input
                  id="workStartDate"
                  type="date"
                  {...register('workStartDate', { required: 'Start date is required' })}
                />
                {errors.workStartDate && (
                  <p className="text-xs text-red-600 mt-1">{errors.workStartDate.message}</p>
                )}
                <p className="text-xs text-neutral-500 mt-1">
                  First day labor or materials were furnished
                </p>
              </div>

              <div>
                <Label htmlFor="workEndDate">Date Work Ended (Optional)</Label>
                <Input
                  id="workEndDate"
                  type="date"
                  {...register('workEndDate')}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Leave blank if work is ongoing (uses today's date)
                </p>
              </div>

              <Button type="submit" className="w-full">
                Calculate Deadlines
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          {deadlines ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Your Filing Deadlines</CardTitle>
                  <CardDescription>
                    Based on Indiana construction lien law
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {deadlines.map((deadline, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${getDeadlineColor(deadline)}`}
                    >
                      <div className="flex items-start gap-3">
                        {getDeadlineIcon(deadline)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 mb-1">
                            {deadline.name}
                          </h4>
                          <p className="text-sm text-neutral-700 mb-2">
                            {formatDate(deadline.date)}
                          </p>
                          <p className="text-xs text-neutral-600 mb-2">
                            {deadline.description}
                          </p>
                          {!deadline.isPassed && (
                            <p className={`text-xs font-semibold ${
                              deadline.isWarning ? 'text-yellow-900' : 'text-green-900'
                            }`}>
                              {deadline.daysUntil > 0
                                ? `${deadline.daysUntil} days remaining`
                                : deadline.daysUntil === 0
                                ? 'Due TODAY'
                                : 'OVERDUE'}
                            </p>
                          )}
                          {deadline.isPassed && (
                            <p className="text-xs font-semibold text-red-900">
                              DEADLINE PASSED - {Math.abs(deadline.daysUntil)} days ago
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={() => setShowLeadModal(true)}
                    className="w-full mt-4"
                    variant="outline"
                  >
                    Email Me This Timeline
                  </Button>
                </CardContent>
              </Card>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                  <strong>Disclaimer:</strong> This calculator provides general deadline estimates based on typical Indiana construction law. Specific circumstances may affect your deadlines. Contact Riley Bennett Egloff LLP for legal guidance on your particular situation.
                </p>
              </div>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">
                  Enter your project details to see your filing deadlines
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        source="lien_calculator"
        title="Get Your Lien Deadline Timeline"
        description="We'll email you a detailed timeline with calendar reminders for all critical deadlines."
        metadata={{
          projectType: formData.projectType,
          role: formData.role,
          workStartDate: formData.workStartDate,
          workEndDate: formData.workEndDate,
          deadlines: deadlines?.map(d => ({
            name: d.name,
            date: d.date.toISOString(),
            daysUntil: d.daysUntil
          }))
        }}
      />
    </div>
  )
}
