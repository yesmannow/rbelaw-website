import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Calendar, Download, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Button } from '../ui/Button'
import { LeadCaptureModal } from '../marketing/LeadCaptureModal'

interface TimelineFormData {
  complaintDate: string
  caseType: 'standard' | 'commercial'
}

interface Milestone {
  name: string
  date: Date
  daysFromStart: number
  description: string
  isCompleted: boolean
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function generateTimeline(complaintDate: string, caseType: string): Milestone[] {
  const startDate = new Date(complaintDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const milestones: Milestone[] = [
    {
      name: 'Complaint Filed',
      date: startDate,
      daysFromStart: 0,
      description: 'Date the lawsuit was initiated',
      isCompleted: true
    },
    {
      name: 'Appearance Due',
      date: addDays(startDate, 20),
      daysFromStart: 20,
      description: 'Deadline for defendant to file appearance',
      isCompleted: addDays(startDate, 20) < today
    },
    {
      name: 'Answer Due',
      date: addDays(startDate, 23),
      daysFromStart: 23,
      description: 'Deadline for defendant to file answer or responsive pleading (Indiana Trial Rule 12)',
      isCompleted: addDays(startDate, 23) < today
    },
    {
      name: 'Initial Disclosures',
      date: addDays(startDate, 60),
      daysFromStart: 60,
      description: 'Exchange of initial mandatory disclosures',
      isCompleted: addDays(startDate, 60) < today
    },
    {
      name: 'Case Management Conference',
      date: addDays(startDate, 90),
      daysFromStart: 90,
      description: 'Court conference to establish case schedule and deadlines',
      isCompleted: addDays(startDate, 90) < today
    },
    {
      name: 'Fact Discovery Cutoff',
      date: addDays(startDate, caseType === 'commercial' ? 180 : 150),
      daysFromStart: caseType === 'commercial' ? 180 : 150,
      description: 'Deadline to complete all fact discovery (depositions, interrogatories, document requests)',
      isCompleted: addDays(startDate, caseType === 'commercial' ? 180 : 150) < today
    },
    {
      name: 'Expert Disclosure Deadline',
      date: addDays(startDate, caseType === 'commercial' ? 200 : 170),
      daysFromStart: caseType === 'commercial' ? 200 : 170,
      description: 'Deadline to disclose expert witnesses and reports',
      isCompleted: addDays(startDate, caseType === 'commercial' ? 200 : 170) < today
    },
    {
      name: 'Expert Discovery Cutoff',
      date: addDays(startDate, caseType === 'commercial' ? 240 : 210),
      daysFromStart: caseType === 'commercial' ? 240 : 210,
      description: 'Deadline to complete expert depositions',
      isCompleted: addDays(startDate, caseType === 'commercial' ? 240 : 210) < today
    },
    {
      name: 'Dispositive Motions Deadline',
      date: addDays(startDate, caseType === 'commercial' ? 270 : 240),
      daysFromStart: caseType === 'commercial' ? 270 : 240,
      description: 'Last day to file summary judgment motions',
      isCompleted: addDays(startDate, caseType === 'commercial' ? 270 : 240) < today
    },
    {
      name: 'Pretrial Conference',
      date: addDays(startDate, caseType === 'commercial' ? 330 : 300),
      daysFromStart: caseType === 'commercial' ? 330 : 300,
      description: 'Final conference before trial to discuss exhibits, witnesses, and trial procedures',
      isCompleted: addDays(startDate, caseType === 'commercial' ? 330 : 300) < today
    },
    {
      name: 'Trial Date',
      date: addDays(startDate, caseType === 'commercial' ? 365 : 330),
      daysFromStart: caseType === 'commercial' ? 365 : 330,
      description: 'Estimated trial date (subject to court availability)',
      isCompleted: addDays(startDate, caseType === 'commercial' ? 365 : 330) < today
    }
  ]

  return milestones
}

function generateICSFile(milestones: Milestone[]): string {
  const events = milestones.map(milestone => {
    const dateStr = milestone.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    return `BEGIN:VEVENT
UID:${milestone.name.replace(/\s+/g, '-')}-${milestone.date.getTime()}
DTSTAMP:${dateStr}
DTSTART;VALUE=DATE:${milestone.date.toISOString().split('T')[0].replace(/-/g, '')}
SUMMARY:${milestone.name}
DESCRIPTION:${milestone.description}
END:VEVENT`
  }).join('\n')

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Riley Bennett Egloff LLP//Litigation Timeline//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
${events}
END:VCALENDAR`
}

export function LitigationTimeline() {
  const [timeline, setTimeline] = useState<Milestone[] | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useForm<TimelineFormData>({
    defaultValues: {
      caseType: 'standard'
    }
  })

  const formData = watch()

  const onSubmit = (data: TimelineFormData) => {
    const generatedTimeline = generateTimeline(data.complaintDate, data.caseType)
    setTimeline(generatedTimeline)
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const downloadCalendar = () => {
    if (!timeline) return

    const icsContent = generateICSFile(timeline)
    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'litigation-timeline.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Clock className="w-6 h-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">
              Litigation Timeline Generator
            </h1>
            <p className="text-neutral-600 mt-1">
              Visualize your case schedule with key Indiana Trial Rule deadlines
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Calendar className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Take control of your litigation schedule</p>
            <p>This tool generates a comprehensive timeline based on standard Indiana Trial Rules. Actual deadlines may vary based on court orders.</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
              <CardDescription>
                Enter the complaint date to generate your timeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="complaintDate">Date of Complaint *</Label>
                  <Input
                    id="complaintDate"
                    type="date"
                    {...register('complaintDate', { required: 'Complaint date is required' })}
                  />
                  {errors.complaintDate && (
                    <p className="text-xs text-red-600 mt-1">{errors.complaintDate.message}</p>
                  )}
                  <p className="text-xs text-neutral-500 mt-1">
                    The date the lawsuit was filed
                  </p>
                </div>

                <div>
                  <Label htmlFor="caseType">Case Type</Label>
                  <select
                    id="caseType"
                    {...register('caseType')}
                    className="flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="standard">Standard Civil Case</option>
                    <option value="commercial">Commercial Litigation</option>
                  </select>
                  <p className="text-xs text-neutral-500 mt-1">
                    Commercial cases typically have extended deadlines
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Generate Timeline
                </Button>
              </form>
            </CardContent>
          </Card>

          {timeline && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  onClick={downloadCalendar}
                  variant="outline"
                  className="w-full text-sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download .ics Calendar
                </Button>
                <Button
                  onClick={() => setShowLeadModal(true)}
                  variant="outline"
                  className="w-full text-sm"
                >
                  Email Me This Timeline
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          {timeline ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Your Case Timeline</CardTitle>
                  <CardDescription>
                    Key milestones and deadlines based on Indiana Trial Rules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-200" />

                    {/* Milestones */}
                    <div className="space-y-6">
                      {timeline.map((milestone, index) => (
                        <div key={index} className="relative pl-10">
                          {/* Timeline Dot */}
                          <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.isCompleted 
                              ? 'bg-blue-900 text-white' 
                              : 'bg-white border-2 border-blue-900 text-blue-900'
                          }`}>
                            {milestone.isCompleted ? (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="text-xs font-bold">{index + 1}</span>
                            )}
                          </div>

                          {/* Milestone Content */}
                          <div className={`${
                            milestone.isCompleted 
                              ? 'opacity-60' 
                              : 'bg-blue-50 border border-blue-200 rounded-lg p-4'
                          }`}>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold text-neutral-900">
                                {milestone.name}
                              </h4>
                              <span className="text-sm text-neutral-600 ml-4">
                                Day {milestone.daysFromStart}
                              </span>
                            </div>
                            <p className="text-sm text-blue-900 font-medium mb-1">
                              {formatDate(milestone.date)}
                            </p>
                            <p className="text-sm text-neutral-600">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-200">
                    <h4 className="font-semibold text-neutral-900 mb-2">Important Notes:</h4>
                    <ul className="text-sm text-neutral-600 space-y-1 list-disc list-inside">
                      <li>These are standard deadlines under Indiana Trial Rules</li>
                      <li>Actual deadlines may be modified by court order or scheduling conference</li>
                      <li>Always verify deadlines with your specific court's scheduling order</li>
                      <li>Federal cases follow different timelines under Federal Rules of Civil Procedure</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="py-24 text-center">
                <Clock className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  Generate Your Case Timeline
                </h3>
                <p className="text-neutral-500">
                  Enter the complaint date to see all important deadlines and milestones
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        source="litigation_timeline"
        title="Get Your Litigation Timeline"
        description="We'll email you a PDF of this timeline along with a calendar file you can import into Outlook or Google Calendar."
        metadata={{
          complaintDate: formData.complaintDate,
          caseType: formData.caseType,
          milestones: timeline?.map(m => ({
            name: m.name,
            date: m.date.toISOString(),
            daysFromStart: m.daysFromStart
          }))
        }}
      />
    </div>
  )
}
