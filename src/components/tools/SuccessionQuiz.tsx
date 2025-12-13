import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card'
import { Button } from '../ui/Button'
import { Progress } from '../ui/Progress'
import { LeadCaptureModal } from '../marketing/LeadCaptureModal'

interface Question {
  id: string
  question: string
  options: { value: string; label: string; score: number }[]
}

const QUESTIONS: Question[] = [
  {
    id: 'buy_sell',
    question: 'Do you have a funded buy-sell agreement in place?',
    options: [
      { value: 'yes_funded', label: 'Yes, fully funded', score: 15 },
      { value: 'yes_not_funded', label: 'Yes, but not funded', score: 8 },
      { value: 'no', label: 'No agreement', score: 0 }
    ]
  },
  {
    id: 'valuation',
    question: 'Do you have a current business valuation?',
    options: [
      { value: 'recent', label: 'Yes, within the last year', score: 15 },
      { value: 'old', label: 'Yes, but outdated', score: 7 },
      { value: 'no', label: 'No valuation', score: 0 }
    ]
  },
  {
    id: 'successors',
    question: 'Have you identified and trained successors?',
    options: [
      { value: 'identified_trained', label: 'Identified and actively training', score: 15 },
      { value: 'identified', label: 'Identified but not trained', score: 8 },
      { value: 'no', label: 'No successors identified', score: 0 }
    ]
  },
  {
    id: 'estate_plan',
    question: 'Is your business integrated into your estate plan?',
    options: [
      { value: 'yes_integrated', label: 'Yes, fully integrated', score: 10 },
      { value: 'partial', label: 'Partially integrated', score: 5 },
      { value: 'no', label: 'Not integrated', score: 0 }
    ]
  },
  {
    id: 'key_person',
    question: 'Do you have key person insurance?',
    options: [
      { value: 'yes_adequate', label: 'Yes, adequate coverage', score: 10 },
      { value: 'yes_inadequate', label: 'Yes, but inadequate', score: 5 },
      { value: 'no', label: 'No coverage', score: 0 }
    ]
  },
  {
    id: 'documentation',
    question: 'Are business operations and processes documented?',
    options: [
      { value: 'comprehensive', label: 'Comprehensive documentation', score: 10 },
      { value: 'partial', label: 'Partially documented', score: 5 },
      { value: 'minimal', label: 'Minimal or no documentation', score: 0 }
    ]
  },
  {
    id: 'financial_records',
    question: 'How current and organized are your financial records?',
    options: [
      { value: 'excellent', label: 'Excellent and current', score: 10 },
      { value: 'adequate', label: 'Adequate', score: 5 },
      { value: 'poor', label: 'Poor or disorganized', score: 0 }
    ]
  },
  {
    id: 'exit_timeline',
    question: 'Do you have a defined exit timeline?',
    options: [
      { value: 'yes_detailed', label: 'Yes, with detailed plan', score: 10 },
      { value: 'yes_general', label: 'Yes, general timeline', score: 5 },
      { value: 'no', label: 'No timeline', score: 0 }
    ]
  }
]

interface Answer {
  questionId: string
  value: string
  score: number
}

export function SuccessionQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)

  const currentQuestion = QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0)
  const maxScore = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0)
  const percentageScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0

  const handleAnswer = (questionId: string, value: string, score: number) => {
    const newAnswers = answers.filter(a => a.questionId !== questionId)
    newAnswers.push({ questionId, value, score })
    setAnswers(newAnswers)

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300)
    } else {
      setTimeout(() => setShowResults(true), 300)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const restart = () => {
    setCurrentStep(0)
    setAnswers([])
    setShowResults(false)
  }

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'Low Risk', color: 'green', message: 'Your business has strong succession planning in place.' }
    if (score >= 40) return { level: 'Moderate Risk', color: 'yellow', message: 'You have some planning done, but significant gaps remain.' }
    return { level: 'High Risk', color: 'red', message: 'Your business is vulnerable to leadership gaps and succession issues.' }
  }

  const riskAssessment = getRiskLevel(percentageScore)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-900" />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">
              Business Succession Readiness Assessment
            </h1>
            <p className="text-neutral-600 mt-1">
              Discover how prepared your business is for leadership transitions
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Take control of your business future</p>
            <p>Answer 8 questions to receive a comprehensive readiness score and personalized recommendations.</p>
          </div>
        </div>
      </div>

      {!showResults ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle className="text-lg">
                Question {currentStep + 1} of {QUESTIONS.length}
              </CardTitle>
              <span className="text-sm text-neutral-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                  {currentQuestion.question}
                </h3>

                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers.find(a => 
                      a.questionId === currentQuestion.id && a.value === option.value
                    )
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(currentQuestion.id, option.value, option.score)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-blue-900 bg-blue-50'
                            : 'border-neutral-200 hover:border-blue-300 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="text-neutral-900">{option.label}</span>
                      </button>
                    )
                  })}
                </div>

                {currentStep > 0 && (
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
            </AnimatePresence>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Readiness Score</CardTitle>
              <CardDescription>
                Based on your responses to {QUESTIONS.length} key succession planning factors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-4 ${
                  riskAssessment.color === 'green' ? 'bg-green-100' :
                  riskAssessment.color === 'yellow' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <div>
                    <div className={`text-4xl font-bold ${
                      riskAssessment.color === 'green' ? 'text-green-900' :
                      riskAssessment.color === 'yellow' ? 'text-yellow-900' :
                      'text-red-900'
                    }`}>
                      {percentageScore}
                    </div>
                    <div className="text-xs text-neutral-600">out of 100</div>
                  </div>
                </div>

                <h3 className={`text-2xl font-bold mb-2 ${
                  riskAssessment.color === 'green' ? 'text-green-900' :
                  riskAssessment.color === 'yellow' ? 'text-yellow-900' :
                  'text-red-900'
                }`}>
                  {riskAssessment.level}
                </h3>
                <p className="text-neutral-700 mb-6">
                  {riskAssessment.message}
                </p>
              </div>

              <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-neutral-900 mb-4">Key Findings:</h4>
                <div className="space-y-3">
                  {QUESTIONS.map((question) => {
                    const answer = answers.find(a => a.questionId === question.id)
                    const maxPossible = Math.max(...question.options.map(o => o.score))
                    const percentage = maxPossible > 0 ? (answer ? (answer.score / maxPossible) * 100 : 0) : 0
                    
                    return (
                      <div key={question.id} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          percentage >= 70 ? 'bg-green-600' :
                          percentage >= 40 ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm text-neutral-900">{question.question}</p>
                          <div className="mt-1">
                            <Progress value={percentage} className="h-1" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => setShowLeadModal(true)}
                  className="w-full"
                >
                  Get Full Succession Planning Checklist
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  onClick={restart}
                  variant="outline"
                  className="w-full"
                >
                  Retake Assessment
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Next Steps:</strong> Riley Bennett Egloff LLP specializes in business succession planning. Our team can help you address gaps, create comprehensive succession plans, and protect your business legacy.
            </p>
          </div>
        </motion.div>
      )}

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        source="succession_quiz"
        title="Get Your Succession Planning Checklist"
        description="We'll email you a detailed checklist with specific recommendations based on your assessment results."
        metadata={{
          score: percentageScore,
          riskLevel: riskAssessment.level,
          answers: answers
        }}
      />
    </div>
  )
}
