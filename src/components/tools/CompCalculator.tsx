import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Calculator, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
import { Input } from '../ui/Input'
import { Label } from '../ui/Label'
import { Button } from '../ui/Button'
import { LeadCaptureModal } from '../marketing/LeadCaptureModal'

interface CompFormData {
  injuryDate: string
  averageWeeklyWage: number
  impairmentRating?: number
}

interface CalculationResult {
  maxWage: number
  maxBenefit: number
  ppiPerDegree: number
  weeklyBenefit: number
  estimatedPPI?: number
  period: string
}

// Statutory limits from the Indiana Workers' Compensation Handbook
const STATUTORY_LIMITS = [
  {
    startDate: '2023-07-01',
    endDate: '2024-06-30',
    maxWage: 1205,
    maxBenefit: 804,
    ppiPerDegree: 1803,
    period: 'July 1, 2023 - June 30, 2024'
  },
  {
    startDate: '2024-07-01',
    endDate: '2025-06-30',
    maxWage: 1241,
    maxBenefit: 828,
    ppiPerDegree: 1857,
    period: 'July 1, 2024 - June 30, 2025'
  },
  {
    startDate: '2025-07-01',
    endDate: '2026-06-30',
    maxWage: 1278,
    maxBenefit: 852,
    ppiPerDegree: 1913,
    period: 'July 1, 2025 - June 30, 2026'
  }
]

function getStatutoryLimits(injuryDate: string) {
  const date = new Date(injuryDate)
  for (const limit of STATUTORY_LIMITS) {
    const start = new Date(limit.startDate)
    const end = new Date(limit.endDate)
    if (date >= start && date <= end) {
      return limit
    }
  }
  // Default to most recent if outside range
  return STATUTORY_LIMITS[STATUTORY_LIMITS.length - 1]
}

export function CompCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CompFormData>()

  const formData = watch()

  const calculateBenefits = (data: CompFormData) => {
    const limits = getStatutoryLimits(data.injuryDate)
    
    // TTD (Temporary Total Disability) is 2/3 of average weekly wage, capped at max benefit
    const calculatedBenefit = (data.averageWeeklyWage * 2) / 3
    const weeklyBenefit = Math.min(calculatedBenefit, limits.maxBenefit)

    const calculationResult: CalculationResult = {
      maxWage: limits.maxWage,
      maxBenefit: limits.maxBenefit,
      ppiPerDegree: limits.ppiPerDegree,
      weeklyBenefit,
      period: limits.period
    }

    // Calculate PPI if impairment rating provided (only for 1-10 degrees)
    if (data.impairmentRating && data.impairmentRating >= 1 && data.impairmentRating <= 10) {
      calculationResult.estimatedPPI = data.impairmentRating * limits.ppiPerDegree
    }

    setResult(calculationResult)
  }

  const onSubmit = (data: CompFormData) => {
    calculateBenefits(data)
  }

  const handleGetFullReport = () => {
    setShowLeadModal(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Calculator className="w-6 h-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">
              Indiana Workers' Comp Benefit Calculator
            </h1>
            <p className="text-neutral-600 mt-1">
              Calculate your potential TTD and PPI benefits under Indiana law
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">This calculator uses official Indiana statutory limits</p>
            <p>Values are based on the Indiana Workers' Compensation Handbook and are updated annually. Results are estimates and not legal advice.</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Information</CardTitle>
            <CardDescription>
              Provide your injury details to calculate estimated benefits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="injuryDate">Date of Injury *</Label>
                <Input
                  id="injuryDate"
                  type="date"
                  {...register('injuryDate', { required: 'Injury date is required' })}
                />
                {errors.injuryDate && (
                  <p className="text-xs text-red-600 mt-1">{errors.injuryDate.message}</p>
                )}
                <p className="text-xs text-neutral-500 mt-1">
                  This determines which statutory limits apply
                </p>
              </div>

              <div>
                <Label htmlFor="averageWeeklyWage">Average Weekly Wage *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                  <Input
                    id="averageWeeklyWage"
                    type="number"
                    step="0.01"
                    className="pl-7"
                    {...register('averageWeeklyWage', { 
                      required: 'Average weekly wage is required',
                      min: { value: 0, message: 'Must be a positive number' }
                    })}
                    placeholder="1000.00"
                  />
                </div>
                {errors.averageWeeklyWage && (
                  <p className="text-xs text-red-600 mt-1">{errors.averageWeeklyWage.message}</p>
                )}
                <p className="text-xs text-neutral-500 mt-1">
                  Your gross weekly earnings before injury
                </p>
              </div>

              <div>
                <Label htmlFor="impairmentRating">Permanent Impairment Rating (Optional)</Label>
                <Input
                  id="impairmentRating"
                  type="number"
                  step="1"
                  {...register('impairmentRating', {
                    min: { value: 1, message: 'Must be between 1-10 degrees' },
                    max: { value: 10, message: 'Must be between 1-10 degrees' }
                  })}
                  placeholder="5"
                />
                {errors.impairmentRating && (
                  <p className="text-xs text-red-600 mt-1">{errors.impairmentRating.message}</p>
                )}
                <p className="text-xs text-neutral-500 mt-1">
                  Enter 1-10 degrees for PPI calculation
                </p>
              </div>

              <Button type="submit" className="w-full">
                Calculate Benefits
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Your Estimated Benefits</CardTitle>
                  <CardDescription>
                    Based on injury period: {result.period}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b border-neutral-200 pb-4">
                    <p className="text-sm text-neutral-600 mb-1">Weekly TTD Benefit</p>
                    <p className="text-3xl font-bold text-blue-900">
                      ${result.weeklyBenefit.toFixed(2)}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      Temporary Total Disability (2/3 of avg wage, max ${result.maxBenefit})
                    </p>
                  </div>

                  {result.estimatedPPI && (
                    <div className="border-b border-neutral-200 pb-4">
                      <p className="text-sm text-neutral-600 mb-1">Estimated PPI Award</p>
                      <p className="text-3xl font-bold text-blue-900">
                        ${result.estimatedPPI.toLocaleString()}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        Permanent Partial Impairment (${result.ppiPerDegree.toLocaleString()} per degree)
                      </p>
                    </div>
                  )}

                  <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                    <h4 className="text-sm font-semibold text-neutral-900">Statutory Limits for Your Period</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-neutral-600">Max Weekly Wage</p>
                        <p className="font-semibold">${result.maxWage}</p>
                      </div>
                      <div>
                        <p className="text-neutral-600">Max Weekly Benefit</p>
                        <p className="font-semibold">${result.maxBenefit}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-neutral-600">PPI Rate (1-10 deg)</p>
                        <p className="font-semibold">${result.ppiPerDegree.toLocaleString()} per degree</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGetFullReport}
                    className="w-full"
                    variant="outline"
                  >
                    Email Me This Calculation
                  </Button>
                </CardContent>
              </Card>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                  <strong>Important:</strong> This is an estimate only. Actual benefits depend on many factors including the nature of your injury, medical evidence, and specific circumstances. Contact Riley Bennett Egloff LLP for a comprehensive evaluation of your case.
                </p>
              </div>
            </motion.div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Calculator className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">
                  Fill out the form to calculate your estimated benefits
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        source="comp_calculator"
        title="Get Your Workers' Comp Calculation Report"
        description="We'll email you a detailed breakdown of your estimated benefits along with next steps."
        metadata={{
          injuryDate: formData.injuryDate,
          averageWeeklyWage: formData.averageWeeklyWage,
          impairmentRating: formData.impairmentRating,
          calculatedWeeklyBenefit: result?.weeklyBenefit,
          estimatedPPI: result?.estimatedPPI
        }}
      />
    </div>
  )
}
