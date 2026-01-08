import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Users,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { LeadCaptureModal } from '@/components/marketing/LeadCaptureModal'

interface OSHAData {
  totalHours: string
  totalCases: string
  daysAwayCases: string
  restrictedCases: string
  lostWorkdays: string
  industry: string
}

interface OSHAResults {
  trir: number // Total Recordable Incident Rate
  dart: number // Days Away, Restricted, or Transferred Rate
  ltir: number // Lost Time Incident Rate
  industryAvgTRIR: number
  industryAvgDART: number
  status: 'excellent' | 'good' | 'needs-improvement' | 'critical'
}

const industryBenchmarks: Record<string, { trir: number; dart: number }> = {
  construction: { trir: 3.1, dart: 1.8 },
  manufacturing: { trir: 3.4, dart: 1.9 },
  healthcare: { trir: 4.6, dart: 2.3 },
  retail: { trir: 3.2, dart: 1.5 },
  hospitality: { trir: 4.0, dart: 1.7 },
  transportation: { trir: 4.2, dart: 2.4 },
  warehousing: { trir: 4.8, dart: 3.1 },
  other: { trir: 3.0, dart: 1.5 }
}

export function OSHACalculator() {
  const [formData, setFormData] = useState<OSHAData>({
    totalHours: '',
    totalCases: '',
    daysAwayCases: '',
    restrictedCases: '',
    lostWorkdays: '',
    industry: ''
  })
  const [results, setResults] = useState<OSHAResults | null>(null)
  const [showLeadCapture, setShowLeadCapture] = useState(false)

  const handleInputChange = (field: keyof OSHAData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateRates = () => {
    const hours = parseFloat(formData.totalHours)
    const cases = parseFloat(formData.totalCases)
    const daysAway = parseFloat(formData.daysAwayCases)
    const restricted = parseFloat(formData.restrictedCases)

    // OSHA formula: (Number of incidents × 200,000) / Total hours worked
    // 200,000 = base for 100 full-time employees working 40 hours/week, 50 weeks/year
    const trir = (cases * 200000) / hours
    const dart = ((daysAway + restricted) * 200000) / hours
    const ltir = (daysAway * 200000) / hours

    const benchmark = industryBenchmarks[formData.industry] || industryBenchmarks.other

    let status: 'excellent' | 'good' | 'needs-improvement' | 'critical'
    if (trir < benchmark.trir * 0.5) status = 'excellent'
    else if (trir < benchmark.trir) status = 'good'
    else if (trir < benchmark.trir * 1.5) status = 'needs-improvement'
    else status = 'critical'

    setResults({
      trir: parseFloat(trir.toFixed(2)),
      dart: parseFloat(dart.toFixed(2)),
      ltir: parseFloat(ltir.toFixed(2)),
      industryAvgTRIR: benchmark.trir,
      industryAvgDART: benchmark.dart,
      status
    })
  }

  const handleCalculate = () => {
    if (!isFormComplete) {
      alert('Please fill in all fields')
      return
    }
    calculateRates()
  }

  const isFormComplete = Object.values(formData).every(val => val !== '')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-50 border-green-200 text-green-700'
      case 'good':
        return 'bg-blue-50 border-blue-200 text-blue-700'
      case 'needs-improvement':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700'
      case 'critical':
        return 'bg-red-50 border-red-200 text-red-700'
      default:
        return 'bg-neutral-50 border-neutral-200 text-neutral-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircle2 className="h-8 w-8" />
      case 'needs-improvement':
        return <AlertTriangle className="h-8 w-8" />
      case 'critical':
        return <AlertTriangle className="h-8 w-8" />
      default:
        return null
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'Your safety performance is excellent! You are well below industry averages.'
      case 'good':
        return 'Your safety performance is good and below industry average. Keep up the strong safety culture.'
      case 'needs-improvement':
        return 'Your incident rates are above industry average. Consider implementing additional safety measures.'
      case 'critical':
        return 'Your incident rates are significantly above industry average. Immediate action is recommended.'
      default:
        return ''
    }
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary-navy mb-4">
            OSHA Incident Rate Calculator
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Calculate your Total Recordable Incident Rate (TRIR), DART Rate, and Lost Time Incident Rate (LTIR).
            Compare your workplace safety metrics against industry benchmarks.
          </p>
        </div>

        {/* Input Form */}
        {!results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-neutral-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-accent-gold" />
                  Enter Your Safety Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Industry Selection */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-accent-gold focus:outline-none transition-colors"
                  >
                    <option value="">Select your industry...</option>
                    <option value="construction">Construction</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="healthcare">Healthcare & Social Assistance</option>
                    <option value="retail">Retail Trade</option>
                    <option value="hospitality">Hospitality & Food Service</option>
                    <option value="transportation">Transportation</option>
                    <option value="warehousing">Warehousing & Storage</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Total Hours Worked */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      <Clock className="inline h-4 w-4 mr-2" />
                      Total Hours Worked (Annual)
                    </label>
                    <input
                      type="number"
                      value={formData.totalHours}
                      onChange={(e) => handleInputChange('totalHours', e.target.value)}
                      placeholder="e.g., 500000"
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-accent-gold focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      Total hours worked by all employees in the past year
                    </p>
                  </div>

                  {/* Total Recordable Cases */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      <AlertTriangle className="inline h-4 w-4 mr-2" />
                      Total Recordable Cases
                    </label>
                    <input
                      type="number"
                      value={formData.totalCases}
                      onChange={(e) => handleInputChange('totalCases', e.target.value)}
                      placeholder="e.g., 12"
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-accent-gold focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      All work-related injuries and illnesses requiring medical treatment
                    </p>
                  </div>

                  {/* Days Away Cases */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Days Away from Work Cases
                    </label>
                    <input
                      type="number"
                      value={formData.daysAwayCases}
                      onChange={(e) => handleInputChange('daysAwayCases', e.target.value)}
                      placeholder="e.g., 5"
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-accent-gold focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      Cases where employee missed work beyond the day of injury
                    </p>
                  </div>

                  {/* Restricted/Transferred Cases */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      Restricted or Transferred Cases
                    </label>
                    <input
                      type="number"
                      value={formData.restrictedCases}
                      onChange={(e) => handleInputChange('restrictedCases', e.target.value)}
                      placeholder="e.g., 3"
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-accent-gold focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      Cases where employee had work restrictions or job transfer
                    </p>
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="pt-4">
                  <button
                    onClick={handleCalculate}
                    disabled={!isFormComplete}
                    className="w-full bg-primary-navy hover:bg-primary-slate text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <BarChart3 className="h-5 w-5" />
                    Calculate Safety Metrics
                  </button>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>How to find your data:</strong> This information is typically found in your OSHA 300 Log
                    and OSHA 300A Summary. If you need help locating or calculating these numbers, our employment
                    law team can assist.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Overall Status */}
              <Card className={`border-2 ${getStatusColor(results.status)}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(results.status)}
                      <div>
                        <h3 className="text-2xl font-bold mb-1 capitalize">
                          {results.status.replace('-', ' ')}
                        </h3>
                        <p className="text-sm">
                          {getStatusMessage(results.status)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Metrics Dashboard */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* TRIR */}
                <Card className="border-2 border-neutral-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <TrendingUp className="h-10 w-10 text-accent-gold mx-auto mb-3" />
                      <div className="text-4xl font-bold text-primary-navy mb-2">
                        {results.trir}
                      </div>
                      <div className="text-sm font-semibold text-neutral-700 mb-3">
                        Total Recordable Incident Rate (TRIR)
                      </div>
                      <div className="text-xs text-neutral-600 bg-neutral-50 rounded-lg p-2">
                        Industry Avg: <strong>{results.industryAvgTRIR}</strong>
                      </div>
                      {results.trir < results.industryAvgTRIR ? (
                        <div className="mt-2 text-xs text-green-600 font-semibold">
                          ✓ Below Industry Average
                        </div>
                      ) : (
                        <div className="mt-2 text-xs text-red-600 font-semibold">
                          ⚠ Above Industry Average
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* DART */}
                <Card className="border-2 border-neutral-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <AlertTriangle className="h-10 w-10 text-accent-gold mx-auto mb-3" />
                      <div className="text-4xl font-bold text-primary-navy mb-2">
                        {results.dart}
                      </div>
                      <div className="text-sm font-semibold text-neutral-700 mb-3">
                        DART Rate
                      </div>
                      <div className="text-xs text-neutral-600 bg-neutral-50 rounded-lg p-2">
                        Industry Avg: <strong>{results.industryAvgDART}</strong>
                      </div>
                      {results.dart < results.industryAvgDART ? (
                        <div className="mt-2 text-xs text-green-600 font-semibold">
                          ✓ Below Industry Average
                        </div>
                      ) : (
                        <div className="mt-2 text-xs text-red-600 font-semibold">
                          ⚠ Above Industry Average
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* LTIR */}
                <Card className="border-2 border-neutral-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Users className="h-10 w-10 text-accent-gold mx-auto mb-3" />
                      <div className="text-4xl font-bold text-primary-navy mb-2">
                        {results.ltir}
                      </div>
                      <div className="text-sm font-semibold text-neutral-700 mb-3">
                        Lost Time Incident Rate (LTIR)
                      </div>
                      <div className="text-xs text-neutral-600 bg-neutral-50 rounded-lg p-2">
                        Days away from work cases only
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <Card className="border-2 border-neutral-200">
                <CardHeader>
                  <CardTitle>What These Numbers Mean</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary-navy mb-2">
                      Total Recordable Incident Rate (TRIR)
                    </h4>
                    <p className="text-sm text-neutral-700">
                      Measures the total number of work-related injuries and illnesses per 100 full-time employees.
                      This is the most comprehensive safety metric and is used by OSHA for enforcement targeting.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary-navy mb-2">
                      Days Away, Restricted, or Transferred (DART) Rate
                    </h4>
                    <p className="text-sm text-neutral-700">
                      Measures more serious incidents that result in days away from work, restricted work activity,
                      or job transfer. A high DART rate may trigger OSHA inspections.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary-navy mb-2">
                      Lost Time Incident Rate (LTIR)
                    </h4>
                    <p className="text-sm text-neutral-700">
                      Focuses specifically on incidents where employees missed work. This metric is critical for
                      workers' compensation insurance rates and reflects the severity of workplace injuries.
                    </p>
                  </div>

                  {results.status === 'needs-improvement' || results.status === 'critical' ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Recommended Actions:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                        <li>Conduct comprehensive safety audit</li>
                        <li>Review and update safety training programs</li>
                        <li>Implement behavior-based safety initiatives</li>
                        <li>Ensure OSHA compliance and recordkeeping accuracy</li>
                        <li>Consider consulting with workplace safety experts</li>
                      </ul>
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="border-2 border-accent-gold bg-gradient-to-br from-primary-navy to-primary-slate text-white">
                <CardContent className="pt-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold mb-3">
                      Need Help with OSHA Compliance?
                    </h3>
                    <p className="text-white/90 mb-6">
                      Our employment law team helps employers navigate OSHA regulations, respond to inspections,
                      and implement effective safety programs. Get expert guidance on workplace safety compliance.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setShowLeadCapture(true)}
                        className="bg-accent-gold hover:bg-accent-gold/90 text-primary-navy px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Request Safety Compliance Audit
                      </button>
                      <button
                        onClick={() => setResults(null)}
                        className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-white/30"
                      >
                        Calculate Again
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4 text-xs text-neutral-600">
                <p className="font-semibold mb-2">Important Disclaimer:</p>
                <p>
                  This calculator provides estimates based on standard OSHA formulas. Actual OSHA reporting requirements
                  may vary based on your specific industry and circumstances. This tool does not constitute legal advice.
                  For compliance guidance specific to your workplace, consult with qualified employment law attorneys
                  at Riley Bennett Egloff LLP.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        title="Request OSHA Compliance Audit"
        description="Our employment law team will review your safety programs and help ensure OSHA compliance."
        source="osha_calculator"
        metadata={{
          trir: results?.trir,
          dart: results?.dart,
          status: results?.status,
          industry: formData.industry
        }}
      />
    </>
  )
}
