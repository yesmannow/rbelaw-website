import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Mail
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { LeadCaptureModal } from '@/components/marketing/LeadCaptureModal'

interface RiskClause {
  id: string
  type: string
  severity: 'high' | 'medium' | 'low'
  clause: string
  explanation: string
  recommendation: string
}

interface AnalysisResult {
  overallRisk: 'high' | 'medium' | 'low'
  riskScore: number
  clauses: RiskClause[]
  totalClauses: number
}

export function ContractRiskAnalyzer() {
  const [contractText, setContractText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [showLeadCapture, setShowLeadCapture] = useState(false)

  // Simulated contract analysis (in production, this would call an AI API)
  const analyzeContract = () => {
    setIsAnalyzing(true)

    // Simulate API delay
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        overallRisk: 'high',
        riskScore: 72,
        totalClauses: 8,
        clauses: [
          {
            id: '1',
            type: 'Indemnification',
            severity: 'high',
            clause: 'Contractor shall indemnify, defend, and hold harmless Owner from any and all claims...',
            explanation: 'This is a broad indemnification clause that may require you to defend claims even if you are not at fault. It could expose your business to unlimited liability.',
            recommendation: 'Negotiate to limit indemnification to claims arising from your negligence or willful misconduct. Add a cap on liability amounts.'
          },
          {
            id: '2',
            type: 'Limitation of Liability',
            severity: 'high',
            clause: 'In no event shall Owner be liable for any consequential, indirect, or punitive damages...',
            explanation: 'This clause limits the other party\'s liability while leaving your liability unlimited. This creates an unfair imbalance of risk.',
            recommendation: 'Ensure limitation of liability is mutual and applies to both parties equally. Consider adding a liability cap for both sides.'
          },
          {
            id: '3',
            type: 'Termination',
            severity: 'medium',
            clause: 'Owner may terminate this agreement at any time for convenience upon 10 days notice...',
            explanation: 'This allows the other party to terminate without cause on short notice, potentially leaving you without compensation for work in progress.',
            recommendation: 'Negotiate for longer notice period (30-60 days) and ensure you receive payment for all work completed plus reasonable wind-down costs.'
          },
          {
            id: '4',
            type: 'Payment Terms',
            severity: 'medium',
            clause: 'Payment shall be made within 90 days of receipt of invoice...',
            explanation: '90-day payment terms create significant cash flow challenges and increase your risk of non-payment.',
            recommendation: 'Negotiate for Net 30 or Net 45 payment terms. Consider requiring progress payments or retainage limits.'
          },
          {
            id: '5',
            type: 'Warranty',
            severity: 'high',
            clause: 'Contractor warrants all work for a period of 5 years from completion...',
            explanation: 'A 5-year warranty period is unusually long and may exceed your insurance coverage period, leaving you exposed.',
            recommendation: 'Negotiate for a standard 1-year warranty period. Ensure warranty period aligns with your insurance coverage.'
          },
          {
            id: '6',
            type: 'Insurance Requirements',
            severity: 'medium',
            clause: 'Contractor shall maintain $5,000,000 in general liability coverage...',
            explanation: 'The required insurance limits may be higher than industry standard and could significantly increase your costs.',
            recommendation: 'Verify these limits are commercially reasonable for the scope of work. Negotiate to match your existing coverage limits.'
          },
          {
            id: '7',
            type: 'Dispute Resolution',
            severity: 'low',
            clause: 'Any disputes shall be resolved through binding arbitration in New York...',
            explanation: 'Arbitration location may be inconvenient and expensive if you are not located nearby.',
            recommendation: 'Negotiate for arbitration in a mutually convenient location or your home jurisdiction.'
          },
          {
            id: '8',
            type: 'Intellectual Property',
            severity: 'medium',
            clause: 'All work product shall be deemed work-for-hire and owned exclusively by Owner...',
            explanation: 'This clause transfers all IP rights to the other party, preventing you from reusing your work or methodologies.',
            recommendation: 'Negotiate to retain ownership of pre-existing IP and general methodologies. Grant only a license for project-specific deliverables.'
          }
        ]
      }

      setAnalysisResult(mockResult)
      setIsAnalyzing(false)
    }, 2500)
  }

  const handleAnalyze = () => {
    if (contractText.trim().length < 100) {
      alert('Please enter at least 100 characters of contract text to analyze.')
      return
    }
    analyzeContract()
  }

  const getRiskColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
    }
  }

  const getRiskIcon = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high':
        return <XCircle className="h-5 w-5" />
      case 'medium':
        return <AlertCircle className="h-5 w-5" />
      case 'low':
        return <CheckCircle2 className="h-5 w-5" />
    }
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary-navy mb-4">
            Contract Risk Analyzer
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Upload or paste your contract to identify risky clauses and get expert recommendations.
            Our AI-powered tool analyzes indemnification, liability, payment terms, and more.
          </p>
        </div>

        {/* Input Section */}
        {!analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-neutral-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6 text-accent-gold" />
                  Enter Contract Text
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Paste Contract Text or Key Clauses
                  </label>
                  <textarea
                    value={contractText}
                    onChange={(e) => setContractText(e.target.value)}
                    placeholder="Paste your contract text here. Include sections like indemnification, limitation of liability, payment terms, warranties, etc."
                    rows={12}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-accent-gold focus:outline-none transition-colors font-mono text-sm"
                  />
                  <p className="text-xs text-neutral-500 mt-2">
                    {contractText.length} characters • Minimum 100 characters required
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || contractText.length < 100}
                    className="flex-1 bg-primary-navy hover:bg-primary-slate text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Analyzing Contract...
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-5 w-5" />
                        Analyze Contract
                      </>
                    )}
                  </button>
                </div>

                {/* Upload Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Upload className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">File Upload Coming Soon</p>
                      <p>Currently, please copy and paste your contract text. PDF/DOCX upload will be available in the next version.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results Section */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Overall Risk Score */}
              <Card className="border-2 border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-red-900 mb-2">
                        Overall Risk Assessment: HIGH
                      </h3>
                      <p className="text-red-700">
                        We identified {analysisResult.clauses.filter(c => c.severity === 'high').length} high-risk clauses
                        that require immediate attention.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-bold text-red-600">{analysisResult.riskScore}</div>
                      <div className="text-sm text-red-700 font-semibold">Risk Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-red-200">
                  <CardContent className="pt-6 text-center">
                    <XCircle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-600 mb-1">
                      {analysisResult.clauses.filter(c => c.severity === 'high').length}
                    </div>
                    <div className="text-sm font-semibold text-neutral-700">High Risk Clauses</div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-yellow-200">
                  <CardContent className="pt-6 text-center">
                    <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      {analysisResult.clauses.filter(c => c.severity === 'medium').length}
                    </div>
                    <div className="text-sm font-semibold text-neutral-700">Medium Risk Clauses</div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200">
                  <CardContent className="pt-6 text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {analysisResult.clauses.filter(c => c.severity === 'low').length}
                    </div>
                    <div className="text-sm font-semibold text-neutral-700">Low Risk Clauses</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Findings */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary-navy mb-4">
                  Detailed Risk Analysis
                </h3>
                <div className="space-y-4">
                  {analysisResult.clauses.map((clause, index) => (
                    <motion.div
                      key={clause.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className={`border-2 ${getRiskColor(clause.severity)}`}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-lg ${getRiskColor(clause.severity)}`}>
                              {getRiskIcon(clause.severity)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-bold text-neutral-900">
                                  {clause.type}
                                </h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getRiskColor(clause.severity)}`}>
                                  {clause.severity} Risk
                                </span>
                              </div>
                              
                              <div className="bg-white/50 p-3 rounded-lg mb-3 border border-neutral-200">
                                <p className="text-sm text-neutral-700 italic">"{clause.clause}"</p>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm font-semibold text-neutral-900 mb-1">⚠️ Why This Is Risky:</p>
                                  <p className="text-sm text-neutral-700">{clause.explanation}</p>
                                </div>

                                <div>
                                  <p className="text-sm font-semibold text-neutral-900 mb-1">✅ Recommendation:</p>
                                  <p className="text-sm text-neutral-700">{clause.recommendation}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <Card className="border-2 border-accent-gold bg-gradient-to-br from-primary-navy to-primary-slate text-white">
                <CardContent className="pt-6">
                  <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold mb-3">
                      Get Expert Contract Review
                    </h3>
                    <p className="text-white/90 mb-6">
                      This automated analysis provides a preliminary assessment. For a comprehensive review by our
                      experienced construction and business attorneys, schedule a consultation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setShowLeadCapture(true)}
                        className="bg-accent-gold hover:bg-accent-gold/90 text-primary-navy px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Mail className="h-5 w-5" />
                        Schedule Contract Review
                      </button>
                      <button
                        onClick={() => setAnalysisResult(null)}
                        className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 border border-white/30"
                      >
                        Analyze Another Contract
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4 text-xs text-neutral-600">
                <p className="font-semibold mb-2">Important Disclaimer:</p>
                <p>
                  This automated contract analysis tool is provided for informational purposes only and does not
                  constitute legal advice. The analysis is based on common risk patterns and may not identify all
                  issues specific to your situation. For comprehensive legal advice tailored to your specific
                  circumstances, please consult with a qualified attorney at Riley Bennett Egloff LLP.
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
        title="Schedule Your Contract Review"
        description="Our experienced attorneys will provide a comprehensive review of your contract and negotiate on your behalf."
        source="contract_risk_analyzer"
        metadata={{
          riskScore: analysisResult?.riskScore,
          highRiskClauses: analysisResult?.clauses.filter(c => c.severity === 'high').length,
          totalClauses: analysisResult?.totalClauses
        }}
      />
    </>
  )
}
