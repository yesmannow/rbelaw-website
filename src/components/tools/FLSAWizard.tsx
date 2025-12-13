import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
import { Button } from '../ui/Button'
import { Progress } from '../ui/Progress'
import { LeadCaptureModal } from '../marketing/LeadCaptureModal'

interface Question {
  id: string
  question: string
  helpText?: string
  options: { value: string; label: string; nextQuestion?: string; result?: ComplianceResult }[]
}

type ComplianceStatus = 'compliant' | 'non_compliant' | 'uncertain'

interface ComplianceResult {
  status: ComplianceStatus
  title: string
  message: string
  recommendation: string
}

const QUESTIONS: Question[] = [
  {
    id: 'salary_basis',
    question: 'Is the employee paid on a salary basis?',
    helpText: 'A salary basis means they receive a predetermined amount each pay period, regardless of hours worked.',
    options: [
      { value: 'yes', label: 'Yes, paid a fixed salary', nextQuestion: 'salary_amount' },
      { 
        value: 'no', 
        label: 'No, paid hourly or commission', 
        result: {
          status: 'non_compliant',
          title: 'Non-Exempt Classification',
          message: 'Employees not paid on a salary basis generally cannot be classified as exempt.',
          recommendation: 'This employee likely qualifies for overtime pay. Review your compensation structure and ensure overtime is being properly calculated and paid.'
        }
      }
    ]
  },
  {
    id: 'salary_amount',
    question: 'Is the salary at least $684 per week ($35,568 annually)?',
    helpText: 'This is the minimum salary threshold under current federal FLSA regulations (as of 2024).',
    options: [
      { value: 'yes', label: 'Yes, meets or exceeds $684/week', nextQuestion: 'duties_type' },
      { 
        value: 'no', 
        label: 'No, below $684/week',
        result: {
          status: 'non_compliant',
          title: 'Below Minimum Salary Threshold',
          message: 'The employee does not meet the minimum salary requirement for exempt status.',
          recommendation: 'You must either increase the salary to at least $684/week or reclassify as non-exempt and pay overtime for hours worked over 40 per week.'
        }
      }
    ]
  },
  {
    id: 'duties_type',
    question: 'What best describes the employee\'s primary duties?',
    options: [
      { value: 'executive', label: 'Executive (manages enterprise/department)', nextQuestion: 'executive_duties' },
      { value: 'administrative', label: 'Administrative (office/non-manual work)', nextQuestion: 'administrative_duties' },
      { value: 'professional', label: 'Professional (learned/creative)', nextQuestion: 'professional_duties' },
      { 
        value: 'none', 
        label: 'None of these apply',
        result: {
          status: 'non_compliant',
          title: 'Does Not Meet Duties Test',
          message: 'The employee does not appear to meet any of the standard exempt duties tests.',
          recommendation: 'Reclassify as non-exempt and ensure proper overtime compensation. Document the job duties and review with legal counsel.'
        }
      }
    ]
  },
  {
    id: 'executive_duties',
    question: 'Does the employee manage 2+ full-time employees?',
    helpText: 'Executive exemption requires supervision of at least two full-time employees (or equivalent).',
    options: [
      { value: 'yes', label: 'Yes, supervises 2+ employees', nextQuestion: 'executive_authority' },
      { 
        value: 'no', 
        label: 'No, supervises fewer than 2',
        result: {
          status: 'non_compliant',
          title: 'Does Not Meet Executive Test',
          message: 'The employee does not supervise enough staff to qualify for executive exemption.',
          recommendation: 'Consider reclassifying as non-exempt or review if another exemption category (administrative/professional) might apply.'
        }
      }
    ]
  },
  {
    id: 'executive_authority',
    question: 'Does the employee have authority to hire/fire or make significant recommendations?',
    options: [
      { 
        value: 'yes', 
        label: 'Yes, has hiring/firing authority',
        result: {
          status: 'compliant',
          title: 'Likely Exempt - Executive',
          message: 'Based on your responses, this employee appears to meet the executive exemption criteria.',
          recommendation: 'Continue monitoring to ensure salary levels remain compliant and duties don\'t significantly change. Document the exempt status determination in personnel files.'
        }
      },
      { 
        value: 'no', 
        label: 'No such authority',
        result: {
          status: 'uncertain',
          title: 'Uncertain Classification',
          message: 'The employee meets some executive criteria but lacks full hiring/firing authority.',
          recommendation: 'This is a gray area. Consult with employment counsel to review the specific duties and determine proper classification.'
        }
      }
    ]
  },
  {
    id: 'administrative_duties',
    question: 'Does the employee exercise independent judgment on significant matters?',
    helpText: 'Administrative exemption requires discretion and independent judgment on important business matters.',
    options: [
      { 
        value: 'yes', 
        label: 'Yes, makes independent decisions',
        result: {
          status: 'compliant',
          title: 'Likely Exempt - Administrative',
          message: 'Based on your responses, this employee appears to meet the administrative exemption criteria.',
          recommendation: 'Ensure the work is directly related to management or general business operations. Document the exempt determination and review periodically.'
        }
      },
      { 
        value: 'no', 
        label: 'No, follows established procedures',
        result: {
          status: 'non_compliant',
          title: 'Does Not Meet Administrative Test',
          message: 'The employee lacks sufficient discretion and independent judgment for administrative exemption.',
          recommendation: 'Reclassify as non-exempt and pay overtime. Review job duties to ensure accurate classification.'
        }
      }
    ]
  },
  {
    id: 'professional_duties',
    question: 'Does the work require advanced knowledge in a field of science or learning?',
    helpText: 'Professional exemption typically requires advanced education (typically a bachelor\'s degree or higher in a specialized field).',
    options: [
      { 
        value: 'yes', 
        label: 'Yes, requires specialized education',
        result: {
          status: 'compliant',
          title: 'Likely Exempt - Professional',
          message: 'Based on your responses, this employee appears to meet the learned professional exemption criteria.',
          recommendation: 'Verify the employee has the requisite advanced degree or equivalent knowledge. Document the exempt status and maintain records of qualifications.'
        }
      },
      { 
        value: 'no', 
        label: 'No specialized education required',
        result: {
          status: 'uncertain',
          title: 'Review Creative Professional Exemption',
          message: 'May not meet learned professional test, but could potentially qualify as creative professional.',
          recommendation: 'If the work involves invention, imagination, originality, or talent in a recognized artistic field, consult employment counsel. Otherwise, classify as non-exempt.'
        }
      }
    ]
  }
]

export function FLSAWizard() {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('salary_basis')
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<ComplianceResult | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)

  const currentQuestion = QUESTIONS.find(q => q.id === currentQuestionId)
  const answeredQuestions = Object.keys(answers).length
  const progress = result ? 100 : (answeredQuestions / 7) * 100

  const handleAnswer = (value: string) => {
    const option = currentQuestion?.options.find(o => o.value === value)
    if (!option) return

    const newAnswers = { ...answers, [currentQuestionId]: value }
    setAnswers(newAnswers)

    if (option.result) {
      setResult(option.result)
    } else if (option.nextQuestion) {
      setTimeout(() => setCurrentQuestionId(option.nextQuestion!), 300)
    }
  }

  const restart = () => {
    setCurrentQuestionId('salary_basis')
    setAnswers({})
    setResult(null)
  }

  const goBack = () => {
    const questionOrder = QUESTIONS.map(q => q.id)
    const currentIndex = questionOrder.indexOf(currentQuestionId)
    if (currentIndex > 0) {
      const previousQuestionId = questionOrder[currentIndex - 1]
      const newAnswers = { ...answers }
      delete newAnswers[currentQuestionId]
      setAnswers(newAnswers)
      setCurrentQuestionId(previousQuestionId)
    }
  }

  const getStatusIcon = (status: ComplianceStatus) => {
    switch (status) {
      case 'compliant': 
        return <CheckCircle className="w-12 h-12 text-green-600" />
      case 'non_compliant': 
        return <AlertTriangle className="w-12 h-12 text-red-600" />
      case 'uncertain': 
        return <Shield className="w-12 h-12 text-yellow-600" />
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Shield className="w-6 h-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">
              FLSA Exempt Status Wizard
            </h1>
            <p className="text-neutral-600 mt-1">
              Determine if your employee meets federal overtime exemption requirements
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Avoid costly misclassification penalties</p>
            <p>Improper exempt classification can result in back wages, liquidated damages, and penalties. Use this tool to assess compliance.</p>
          </div>
        </div>
      </div>

      {!result ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="text-lg">FLSA Classification Assessment</CardTitle>
              <span className="text-sm text-neutral-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {currentQuestion && (
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {currentQuestion.question}
                  </h3>
                  
                  {currentQuestion.helpText && (
                    <p className="text-sm text-neutral-600 mb-6">
                      {currentQuestion.helpText}
                    </p>
                  )}

                  <div className="space-y-3 mb-6">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        className="w-full text-left p-4 rounded-lg border-2 border-neutral-200 hover:border-blue-300 hover:bg-neutral-50 transition-all"
                      >
                        <span className="text-neutral-900">{option.label}</span>
                      </button>
                    ))}
                  </div>

                  {answeredQuestions > 0 && (
                    <Button
                      onClick={goBack}
                      variant="outline"
                      className="w-full"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Classification Assessment Result</CardTitle>
              <CardDescription>
                Based on your responses to the FLSA duties and salary tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                  result.status === 'compliant' ? 'bg-green-100' :
                  result.status === 'non_compliant' ? 'bg-red-100' :
                  'bg-yellow-100'
                }`}>
                  {getStatusIcon(result.status)}
                </div>

                <h3 className={`text-2xl font-bold mb-2 ${
                  result.status === 'compliant' ? 'text-green-900' :
                  result.status === 'non_compliant' ? 'text-red-900' :
                  'text-yellow-900'
                }`}>
                  {result.title}
                </h3>
                <p className="text-neutral-700 mb-4">
                  {result.message}
                </p>
              </div>

              <div className={`rounded-lg p-6 mb-6 ${
                result.status === 'compliant' ? 'bg-green-50 border border-green-200' :
                result.status === 'non_compliant' ? 'bg-red-50 border border-red-200' :
                'bg-yellow-50 border border-yellow-200'
              }`}>
                <h4 className={`font-semibold mb-2 ${
                  result.status === 'compliant' ? 'text-green-900' :
                  result.status === 'non_compliant' ? 'text-red-900' :
                  'text-yellow-900'
                }`}>
                  Recommended Action:
                </h4>
                <p className={`text-sm ${
                  result.status === 'compliant' ? 'text-green-900' :
                  result.status === 'non_compliant' ? 'text-red-900' :
                  'text-yellow-900'
                }`}>
                  {result.recommendation}
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => setShowLeadModal(true)}
                  className="w-full"
                >
                  Get Detailed Compliance Guidance
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  onClick={restart}
                  variant="outline"
                  className="w-full"
                >
                  Assess Another Employee
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Important:</strong> This tool provides general guidance only and is not legal advice. FLSA classification can be complex. Contact Riley Bennett Egloff LLP's employment law team for a comprehensive review of your specific situation.
            </p>
          </div>
        </motion.div>
      )}

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        source="flsa_wizard"
        title="Get Your FLSA Compliance Report"
        description="We'll email you detailed guidance on this classification along with best practices for FLSA compliance."
        metadata={{
          result: result?.status,
          answers: answers
        }}
      />
    </div>
  )
}
