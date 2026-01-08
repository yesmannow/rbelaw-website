import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  Users, 
  DollarSign, 
  Shield, 
  FileText,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { LeadCaptureModal } from '@/components/marketing/LeadCaptureModal'

interface QuestionnaireData {
  numOwners: string
  annualRevenue: string
  liabilityProtection: string
  taxFlexibility: string
  fundraising: string
  exitStrategy: string
}

interface EntityRecommendation {
  entity: 'LLC' | 'S-Corp' | 'C-Corp' | 'Partnership' | 'Sole Proprietorship'
  score: number
  pros: string[]
  cons: string[]
  bestFor: string
}

export function BusinessEntityComparison() {
  const [step, setStep] = useState<'questionnaire' | 'results'>('questionnaire')
  const [formData, setFormData] = useState<QuestionnaireData>({
    numOwners: '',
    annualRevenue: '',
    liabilityProtection: '',
    taxFlexibility: '',
    fundraising: '',
    exitStrategy: ''
  })
  const [recommendations, setRecommendations] = useState<EntityRecommendation[]>([])
  const [showLeadCapture, setShowLeadCapture] = useState(false)

  const handleInputChange = (field: keyof QuestionnaireData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateRecommendations = (): EntityRecommendation[] => {
    const recs: EntityRecommendation[] = []

    // LLC Scoring
    let llcScore = 50
    if (formData.numOwners === '1' || formData.numOwners === '2-5') llcScore += 15
    if (formData.liabilityProtection === 'high') llcScore += 15
    if (formData.taxFlexibility === 'important') llcScore += 10
    if (formData.fundraising === 'no') llcScore += 10
    if (formData.annualRevenue === 'under-100k' || formData.annualRevenue === '100k-500k') llcScore += 10

    recs.push({
      entity: 'LLC',
      score: llcScore,
      pros: [
        'Pass-through taxation (no double taxation)',
        'Strong liability protection for owners',
        'Flexible management structure',
        'Less formal requirements than corporations',
        'Can elect S-Corp or C-Corp tax treatment'
      ],
      cons: [
        'Self-employment taxes on all profits',
        'May be harder to raise venture capital',
        'Ownership transfer can be complex',
        'Some states have higher LLC fees'
      ],
      bestFor: 'Small to medium businesses with 1-10 owners seeking liability protection and tax flexibility'
    })

    // S-Corp Scoring
    let sCorpScore = 50
    if (formData.numOwners === '1' || formData.numOwners === '2-5') sCorpScore += 10
    if (formData.annualRevenue === '100k-500k' || formData.annualRevenue === '500k-1m') sCorpScore += 15
    if (formData.taxFlexibility === 'important') sCorpScore += 10
    if (formData.liabilityProtection === 'high') sCorpScore += 10
    if (formData.fundraising === 'no') sCorpScore += 5

    recs.push({
      entity: 'S-Corp',
      score: sCorpScore,
      pros: [
        'Pass-through taxation (no double taxation)',
        'Owners can be employees and save on self-employment taxes',
        'Strong liability protection',
        'More credibility than sole proprietorship',
        'Easier to transfer ownership than LLC'
      ],
      cons: [
        'Limited to 100 shareholders',
        'Only one class of stock allowed',
        'Strict ownership restrictions (US citizens/residents only)',
        'More formalities than LLC (board meetings, minutes)',
        'Salary requirements for owner-employees'
      ],
      bestFor: 'Profitable small businesses with 1-100 US-based owners wanting to minimize self-employment taxes'
    })

    // C-Corp Scoring
    let cCorpScore = 40
    if (formData.numOwners === '10+') cCorpScore += 15
    if (formData.annualRevenue === '1m-5m' || formData.annualRevenue === 'over-5m') cCorpScore += 15
    if (formData.fundraising === 'yes') cCorpScore += 20
    if (formData.exitStrategy === 'ipo') cCorpScore += 15
    if (formData.liabilityProtection === 'high') cCorpScore += 10

    recs.push({
      entity: 'C-Corp',
      score: cCorpScore,
      pros: [
        'Unlimited shareholders and multiple stock classes',
        'Easier to raise venture capital and institutional investment',
        'Can go public (IPO)',
        'Strong liability protection',
        'Perpetual existence',
        'Tax-deductible employee benefits'
      ],
      cons: [
        'Double taxation (corporate and dividend taxes)',
        'Most complex and expensive to form and maintain',
        'Extensive record-keeping and reporting requirements',
        'Board of directors required',
        'More regulatory oversight'
      ],
      bestFor: 'High-growth companies seeking venture capital or planning to go public'
    })

    // Sort by score
    return recs.sort((a, b) => b.score - a.score)
  }

  const handleSubmit = () => {
    const recs = calculateRecommendations()
    setRecommendations(recs)
    setStep('results')
  }

  const isFormComplete = Object.values(formData).every(val => val !== '')

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-neutral-600 bg-neutral-50 border-neutral-200'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match'
    if (score >= 60) return 'Good Match'
    return 'Consider Alternatives'
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary-navy mb-4">
            Business Entity Comparison Tool
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Not sure whether to form an LLC, S-Corp, or C-Corp? Answer a few questions and we'll
            recommend the best entity structure for your business goals.
          </p>
        </div>

        {/* Questionnaire */}
        {step === 'questionnaire' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-neutral-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-accent-gold" />
                  Tell Us About Your Business
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Number of Owners */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    <Users className="inline h-4 w-4 mr-2" />
                    How many owners will the business have?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['1', '2-5', '6-10', '10+'].map(option => (
                      <button
                        key={option}
                        onClick={() => handleInputChange('numOwners', option)}
                        className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          formData.numOwners === option
                            ? 'border-accent-gold bg-accent-gold/10 text-primary-navy'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Annual Revenue */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    <DollarSign className="inline h-4 w-4 mr-2" />
                    Expected annual revenue?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { value: 'under-100k', label: 'Under $100K' },
                      { value: '100k-500k', label: '$100K - $500K' },
                      { value: '500k-1m', label: '$500K - $1M' },
                      { value: '1m-5m', label: '$1M - $5M' },
                      { value: 'over-5m', label: 'Over $5M' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange('annualRevenue', option.value)}
                        className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          formData.annualRevenue === option.value
                            ? 'border-accent-gold bg-accent-gold/10 text-primary-navy'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Liability Protection */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    <Shield className="inline h-4 w-4 mr-2" />
                    How important is personal liability protection?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'high', label: 'Very Important' },
                      { value: 'medium', label: 'Somewhat Important' },
                      { value: 'low', label: 'Not Critical' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange('liabilityProtection', option.value)}
                        className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          formData.liabilityProtection === option.value
                            ? 'border-accent-gold bg-accent-gold/10 text-primary-navy'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tax Flexibility */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    <FileText className="inline h-4 w-4 mr-2" />
                    Is tax flexibility important to you?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'important', label: 'Yes, Very Important' },
                      { value: 'not-important', label: 'No, Keep It Simple' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange('taxFlexibility', option.value)}
                        className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          formData.taxFlexibility === option.value
                            ? 'border-accent-gold bg-accent-gold/10 text-primary-navy'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fundraising */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Do you plan to raise venture capital or outside investment?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'yes', label: 'Yes, Planning to Raise Capital' },
                      { value: 'no', label: 'No, Self-Funded' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange('fundraising', option.value)}
                        className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          formData.fundraising === option.value
                            ? 'border-accent-gold bg-accent-gold/10 text-primary-navy'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exit Strategy */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    What's your long-term exit strategy?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'ipo', label: 'Go Public (IPO)' },
                      { value: 'acquisition', label: 'Acquisition' },
                      { value: 'family', label: 'Pass to Family' },
                      { value: 'unsure', label: 'Not Sure Yet' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleInputChange('exitStrategy', option.value)}
                        className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          formData.exitStrategy === option.value
                            ? 'border-accent-gold bg-accent-gold/10 text-primary-navy'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!isFormComplete}
                    className="w-full bg-primary-navy hover:bg-primary-slate text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Get My Recommendations
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results */}
        {step === 'results' && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Top Recommendation */}
              <Card className="border-2 border-accent-gold bg-gradient-to-br from-accent-gold/10 to-accent-gold/5">
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <div className="inline-block px-4 py-2 bg-accent-gold text-primary-navy rounded-full font-bold text-sm mb-3">
                      TOP RECOMMENDATION
                    </div>
                    <h2 className="text-4xl font-bold text-primary-navy mb-2">
                      {recommendations[0]?.entity}
                    </h2>
                    <p className="text-lg text-neutral-700">
                      {recommendations[0]?.bestFor}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Comparison */}
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={rec.entity}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className={`border-2 ${index === 0 ? 'border-accent-gold' : 'border-neutral-200'}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold text-primary-navy">{rec.entity}</h3>
                          <div className={`px-4 py-2 rounded-lg border-2 ${getScoreColor(rec.score)}`}>
                            <div className="text-2xl font-bold">{rec.score}</div>
                            <div className="text-xs font-semibold">{getScoreLabel(rec.score)}</div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Pros */}
                          <div>
                            <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5" />
                              Advantages
                            </h4>
                            <ul className="space-y-2">
                              {rec.pros.map((pro, i) => (
                                <li key={i} className="text-sm text-neutral-700 flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Cons */}
                          <div>
                            <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                              <XCircle className="h-5 w-5" />
                              Disadvantages
                            </h4>
                            <ul className="space-y-2">
                              {rec.cons.map((con, i) => (
                                <li key={i} className="text-sm text-neutral-700 flex items-start gap-2">
                                  <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-neutral-200">
                          <p className="text-sm text-neutral-600">
                            <strong>Best For:</strong> {rec.bestFor}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <Card className="border-2 border-accent-gold bg-gradient-to-br from-primary-navy to-primary-slate text-white">
                <CardContent className="pt-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold mb-3">
                      Ready to Form Your Business?
                    </h3>
                    <p className="text-white/90 mb-6">
                      Our business attorneys can help you form your entity, draft operating agreements,
                      and ensure compliance with Indiana law. Get started with a free consultation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setShowLeadCapture(true)}
                        className="bg-accent-gold hover:bg-accent-gold/90 text-primary-navy px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Get Formation Started
                        <ArrowRight className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setStep('questionnaire')
                          setFormData({
                            numOwners: '',
                            annualRevenue: '',
                            liabilityProtection: '',
                            taxFlexibility: '',
                            fundraising: '',
                            exitStrategy: ''
                          })
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-white/30"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4 text-xs text-neutral-600">
                <p className="font-semibold mb-2">Important Disclaimer:</p>
                <p>
                  This tool provides general guidance based on common business scenarios. Entity selection
                  depends on many factors including state law, tax situation, and specific business goals.
                  This tool does not constitute legal or tax advice. Please consult with qualified attorneys
                  and tax professionals at Riley Bennett Egloff LLP before making entity formation decisions.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        title="Start Your Business Formation"
        description="Our business attorneys will guide you through entity formation, operating agreements, and compliance."
        source="business_entity_comparison"
        metadata={{
          recommendedEntity: recommendations[0]?.entity,
          numOwners: formData.numOwners,
          revenue: formData.annualRevenue
        }}
      />
    </>
  )
}
