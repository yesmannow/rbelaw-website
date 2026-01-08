import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  CheckCircle2, 
  XCircle,
  Trophy,
  Share2,
  RotateCcw,
  ArrowRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { LeadCaptureModal } from '@/components/marketing/LeadCaptureModal'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

interface QuizTopic {
  id: string
  title: string
  description: string
  icon: string
  questions: Question[]
}

const quizTopics: QuizTopic[] = [
  {
    id: 'employment',
    title: 'Employment Law for Employers',
    description: 'Test your knowledge of employment law compliance and best practices',
    icon: 'Users',
    questions: [
      {
        id: 1,
        question: 'Under the FLSA, what is the minimum salary threshold for most exempt employees (as of 2024)?',
        options: ['$35,568/year', '$47,476/year', '$58,656/year', '$684/week ($35,568/year)'],
        correctAnswer: 3,
        explanation: 'The current FLSA minimum salary threshold is $684 per week ($35,568 annually). Recent attempts to raise this have been blocked by courts.',
        category: 'Wage & Hour'
      },
      {
        id: 2,
        question: 'How long must employers retain I-9 forms after an employee leaves?',
        options: ['1 year', '3 years after hire or 1 year after termination, whichever is later', '5 years', '7 years'],
        correctAnswer: 1,
        explanation: 'I-9 forms must be retained for 3 years after the date of hire OR 1 year after employment ends, whichever is later.',
        category: 'Compliance'
      },
      {
        id: 3,
        question: 'Which of the following is NOT a protected class under Title VII?',
        options: ['Sexual orientation', 'Political affiliation', 'Religion', 'National origin'],
        correctAnswer: 1,
        explanation: 'Political affiliation is not a protected class under federal Title VII. However, sexual orientation is protected as of the 2020 Bostock decision.',
        category: 'Discrimination'
      },
      {
        id: 4,
        question: 'What is the statute of limitations for filing an EEOC charge in Indiana?',
        options: ['180 days', '300 days', '1 year', '2 years'],
        correctAnswer: 1,
        explanation: 'In "deferral states" like Indiana (which has its own civil rights agency), employees have 300 days to file an EEOC charge.',
        category: 'Discrimination'
      },
      {
        id: 5,
        question: 'Under the ADA, when must an employer provide reasonable accommodation?',
        options: ['Always, regardless of cost', 'Only if it costs less than $1,000', 'Unless it causes undue hardship', 'Only for physical disabilities'],
        correctAnswer: 2,
        explanation: 'Employers must provide reasonable accommodation unless it would cause "undue hardship" - significant difficulty or expense relative to the employer\'s size and resources.',
        category: 'ADA'
      },
      {
        id: 6,
        question: 'How many employees must a company have to be covered by FMLA?',
        options: ['15 employees', '25 employees', '50 employees', '100 employees'],
        correctAnswer: 2,
        explanation: 'FMLA applies to employers with 50 or more employees within 75 miles. Employees must work 1,250 hours in the past 12 months to be eligible.',
        category: 'Leave Laws'
      },
      {
        id: 7,
        question: 'Can an employer in Indiana require employees to sign non-compete agreements?',
        options: ['Yes, with no restrictions', 'Yes, if reasonable in scope, time, and geography', 'No, they are banned', 'Only for executives'],
        correctAnswer: 1,
        explanation: 'Indiana allows non-competes if they are reasonable in scope, duration, and geographic area, and protect legitimate business interests.',
        category: 'Employment Contracts'
      },
      {
        id: 8,
        question: 'What is the federal minimum wage for tipped employees?',
        options: ['$2.13/hour', '$5.15/hour', '$7.25/hour', 'Same as regular minimum wage'],
        correctAnswer: 0,
        explanation: 'The federal tipped minimum wage is $2.13/hour, but employers must ensure total compensation (tips + wages) reaches $7.25/hour.',
        category: 'Wage & Hour'
      },
      {
        id: 9,
        question: 'How soon after a workplace injury must an employer report it to OSHA (if it results in hospitalization)?',
        options: ['Immediately', 'Within 8 hours', 'Within 24 hours', 'Within 3 days'],
        correctAnswer: 2,
        explanation: 'Employers must report work-related hospitalizations, amputations, or loss of an eye to OSHA within 24 hours.',
        category: 'Workplace Safety'
      },
      {
        id: 10,
        question: 'Can an employer terminate an at-will employee for any reason?',
        options: ['Yes, absolutely any reason', 'Yes, except for illegal reasons (discrimination, retaliation, etc.)', 'No, they need cause', 'Only with 2 weeks notice'],
        correctAnswer: 1,
        explanation: 'At-will employment allows termination for any reason EXCEPT illegal reasons like discrimination, retaliation for protected activity, or violation of public policy.',
        category: 'Termination'
      }
    ]
  },
  {
    id: 'construction',
    title: 'Construction Law Quiz',
    description: 'Test your knowledge of construction contracts, liens, and liability',
    icon: 'HardHat',
    questions: [
      {
        id: 1,
        question: 'In Indiana, how long does a subcontractor have to file a Notice to Owner after first furnishing labor or materials?',
        options: ['30 days', '60 days', '90 days', '120 days'],
        correctAnswer: 1,
        explanation: 'Subcontractors must file a Notice to Owner within 60 days of first furnishing labor or materials on residential projects (90 days for commercial).',
        category: 'Mechanic\'s Liens'
      },
      {
        id: 2,
        question: 'What is the maximum time to file a mechanic\'s lien in Indiana after last furnishing labor/materials?',
        options: ['60 days', '90 days', '120 days', '180 days'],
        correctAnswer: 1,
        explanation: 'In Indiana, mechanic\'s liens must be filed within 90 days after last furnishing labor or materials (60 days for residential projects).',
        category: 'Mechanic\'s Liens'
      },
      {
        id: 3,
        question: 'Which type of contract clause protects a contractor from liability for delays caused by weather?',
        options: ['Force majeure', 'Liquidated damages', 'Pay-when-paid', 'Indemnification'],
        correctAnswer: 0,
        explanation: 'Force majeure clauses excuse performance due to unforeseeable events beyond the party\'s control, including severe weather.',
        category: 'Contracts'
      },
      {
        id: 4,
        question: 'What is a "pay-if-paid" clause?',
        options: ['Owner pays contractor first', 'Contractor only pays sub if owner pays contractor', 'Payment within 30 days', 'Retainage requirement'],
        correctAnswer: 1,
        explanation: 'Pay-if-paid clauses make the general contractor\'s payment to subcontractors contingent on receiving payment from the owner.',
        category: 'Contracts'
      },
      {
        id: 5,
        question: 'How long must construction companies retain project records in Indiana?',
        options: ['1 year', '3 years', '5 years', '7 years'],
        correctAnswer: 2,
        explanation: 'Best practice is to retain construction records for at least 5-7 years due to statute of limitations for breach of contract and construction defect claims.',
        category: 'Compliance'
      },
      {
        id: 6,
        question: 'What is "retainage" in construction contracts?',
        options: ['Bonus payment', 'Percentage withheld until project completion', 'Insurance premium', 'Permit fee'],
        correctAnswer: 1,
        explanation: 'Retainage is a percentage (typically 5-10%) of each progress payment withheld until project completion to ensure contractor performance.',
        category: 'Payment'
      },
      {
        id: 7,
        question: 'Which insurance is typically required for construction projects?',
        options: ['General liability only', 'Workers\' comp only', 'General liability, workers\' comp, and builder\'s risk', 'No insurance required'],
        correctAnswer: 2,
        explanation: 'Most construction contracts require general liability, workers\' compensation, and builder\'s risk insurance at minimum.',
        category: 'Insurance'
      },
      {
        id: 8,
        question: 'What is a "change order"?',
        options: ['Termination notice', 'Written modification to the contract scope or price', 'Payment request', 'Lien waiver'],
        correctAnswer: 1,
        explanation: 'A change order is a written document modifying the original contract scope, schedule, or price, signed by both parties.',
        category: 'Contracts'
      },
      {
        id: 9,
        question: 'What must a contractor do before filing a mechanic\'s lien in Indiana?',
        options: ['Nothing, just file it', 'Send a Notice to Owner', 'Get a court order', 'Wait 6 months'],
        correctAnswer: 1,
        explanation: 'Subcontractors must send a Notice to Owner before they can file a mechanic\'s lien. General contractors do not need to send this notice.',
        category: 'Mechanic\'s Liens'
      },
      {
        id: 10,
        question: 'How long does a mechanic\'s lien remain enforceable in Indiana?',
        options: ['6 months', '1 year', '2 years', '5 years'],
        correctAnswer: 1,
        explanation: 'A mechanic\'s lien must be enforced (lawsuit filed) within 1 year of recording, or it becomes unenforceable.',
        category: 'Mechanic\'s Liens'
      }
    ]
  },
  {
    id: 'insurance',
    title: 'Insurance Defense Quiz',
    description: 'Test your knowledge of insurance coverage and defense strategies',
    icon: 'Shield',
    questions: [
      {
        id: 1,
        question: 'What does "duty to defend" mean in liability insurance?',
        options: ['Insurer must hire defense attorney', 'Insurer must pay damages', 'Insured must defend themselves', 'Court appoints defender'],
        correctAnswer: 0,
        explanation: 'The duty to defend requires the insurer to provide and pay for legal defense, even if the claim is groundless or fraudulent.',
        category: 'Coverage'
      },
      {
        id: 2,
        question: 'Which is broader: duty to defend or duty to indemnify?',
        options: ['Duty to defend', 'Duty to indemnify', 'They are the same', 'Neither is broader'],
        correctAnswer: 0,
        explanation: 'The duty to defend is broader than the duty to indemnify. Insurers must defend even potentially covered claims.',
        category: 'Coverage'
      },
      {
        id: 3,
        question: 'What is a "reservation of rights" letter?',
        options: ['Policy renewal notice', 'Notice that insurer may deny coverage later', 'Premium increase notice', 'Claim approval'],
        correctAnswer: 1,
        explanation: 'A reservation of rights letter notifies the insured that the insurer is defending under reservation and may later deny coverage.',
        category: 'Coverage'
      },
      {
        id: 4,
        question: 'What is "bad faith" in insurance law?',
        options: ['Filing false claims', 'Unreasonable denial or delay of valid claims', 'Late premium payment', 'Policy cancellation'],
        correctAnswer: 1,
        explanation: 'Bad faith occurs when an insurer unreasonably denies or delays payment of a valid claim, potentially leading to extra-contractual damages.',
        category: 'Bad Faith'
      },
      {
        id: 5,
        question: 'What is an "occurrence" policy?',
        options: ['Covers claims made during policy period', 'Covers incidents that occur during policy period', 'One-time coverage', 'Annual policy'],
        correctAnswer: 1,
        explanation: 'An occurrence policy covers incidents that occur during the policy period, regardless of when the claim is filed.',
        category: 'Policy Types'
      },
      {
        id: 6,
        question: 'What is "subrogation"?',
        options: ['Policy transfer', 'Insurer\'s right to recover from responsible third party', 'Premium discount', 'Coverage exclusion'],
        correctAnswer: 1,
        explanation: 'Subrogation allows an insurer who paid a claim to step into the insured\'s shoes and recover from the party actually responsible.',
        category: 'Claims'
      },
      {
        id: 7,
        question: 'What is the "claims-made" trigger?',
        options: ['When incident occurs', 'When claim is filed during policy period', 'When lawsuit is served', 'When damages are paid'],
        correctAnswer: 1,
        explanation: 'Claims-made policies cover claims first made during the policy period, regardless of when the incident occurred.',
        category: 'Policy Types'
      },
      {
        id: 8,
        question: 'What is an "excess" or "umbrella" policy?',
        options: ['Primary coverage', 'Additional coverage above primary limits', 'Cheaper alternative', 'Commercial only'],
        correctAnswer: 1,
        explanation: 'Excess/umbrella policies provide additional liability coverage above the limits of primary policies.',
        category: 'Policy Types'
      },
      {
        id: 9,
        question: 'What is "stacking" of insurance policies?',
        options: ['Combining limits from multiple policies', 'Layering policies', 'Fraudulent claims', 'Premium increases'],
        correctAnswer: 0,
        explanation: 'Stacking allows an insured to combine coverage limits from multiple policies to increase total available coverage.',
        category: 'Coverage'
      },
      {
        id: 10,
        question: 'What is the "pollution exclusion"?',
        options: ['Environmental coverage', 'Excludes pollution-related claims', 'Hazmat insurance', 'EPA compliance'],
        correctAnswer: 1,
        explanation: 'The pollution exclusion (or "absolute pollution exclusion") bars coverage for pollution-related claims in most CGL policies.',
        category: 'Exclusions'
      }
    ]
  }
]

export function KnowYourRightsQuiz() {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([])
  const [quizComplete, setQuizComplete] = useState(false)
  const [showLeadCapture, setShowLeadCapture] = useState(false)

  const handleTopicSelect = (topic: QuizTopic) => {
    setSelectedTopic(topic)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setAnsweredQuestions([])
    setQuizComplete(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return

    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    const isCorrect = answerIndex === selectedTopic!.questions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion])
  }

  const handleNext = () => {
    if (currentQuestion < selectedTopic!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizComplete(true)
    }
  }

  const handleRestart = () => {
    setSelectedTopic(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setAnsweredQuestions([])
    setQuizComplete(false)
  }

  const getScorePercentage = () => {
    return Math.round((score / selectedTopic!.questions.length) * 100)
  }

  const getScoreMessage = () => {
    const percentage = getScorePercentage()
    if (percentage >= 90) return { title: 'Expert Level!', message: 'Outstanding! You have excellent knowledge of this area of law.', color: 'text-green-600' }
    if (percentage >= 70) return { title: 'Well Done!', message: 'Great job! You have a solid understanding of the key concepts.', color: 'text-blue-600' }
    if (percentage >= 50) return { title: 'Good Start!', message: 'Not bad! There\'s room to improve your knowledge in this area.', color: 'text-yellow-600' }
    return { title: 'Keep Learning!', message: 'This area is complex. Consider consulting with our attorneys for guidance.', color: 'text-red-600' }
  }

  if (!selectedTopic) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary-navy mb-4">
            Know Your Rights Quiz Series
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Test your legal knowledge with our interactive quizzes. Perfect for employers, contractors,
            and business owners who want to understand their rights and obligations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quizTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-2 border-neutral-200 hover:border-accent-gold transition-all duration-300 cursor-pointer h-full group"
                onClick={() => handleTopicSelect(topic)}
              >
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-gold/20 transition-colors">
                      <Brain className="h-8 w-8 text-accent-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-navy mb-2 group-hover:text-accent-gold transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      {topic.description}
                    </p>
                    <div className="text-sm text-neutral-500">
                      {topic.questions.length} Questions
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (quizComplete) {
    const scoreData = getScoreMessage()
    const percentage = getScorePercentage()

    return (
      <>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-accent-gold">
              <CardContent className="pt-8 text-center">
                <Trophy className="h-20 w-20 text-accent-gold mx-auto mb-4" />
                <h2 className={`text-3xl font-bold mb-2 ${scoreData.color}`}>
                  {scoreData.title}
                </h2>
                <p className="text-lg text-neutral-700 mb-6">
                  {scoreData.message}
                </p>

                <div className="bg-neutral-50 rounded-lg p-8 mb-6">
                  <div className="text-6xl font-bold text-primary-navy mb-2">
                    {score}/{selectedTopic.questions.length}
                  </div>
                  <div className="text-xl text-neutral-600">
                    {percentage}% Correct
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <button
                    onClick={() => {
                      const shareText = `I scored ${score}/${selectedTopic.questions.length} (${percentage}%) on the ${selectedTopic.title}! Test your knowledge at RBE Law.`
                      if (navigator.share) {
                        navigator.share({ text: shareText })
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                    Share Your Score
                  </button>
                  <button
                    onClick={handleRestart}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-primary-navy rounded-lg font-semibold transition-colors"
                  >
                    <RotateCcw className="h-5 w-5" />
                    Try Another Quiz
                  </button>
                </div>

                <div className="bg-gradient-to-br from-primary-navy to-primary-slate text-white rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3">
                    Want Expert Legal Guidance?
                  </h3>
                  <p className="text-white/90 mb-4">
                    While quizzes are fun, real-world legal issues require professional advice.
                    Our experienced attorneys are here to help with your specific situation.
                  </p>
                  <button
                    onClick={() => setShowLeadCapture(true)}
                    className="bg-accent-gold hover:bg-accent-gold/90 text-primary-navy px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                  >
                    Get Personalized Legal Advice
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <LeadCaptureModal
          isOpen={showLeadCapture}
          onClose={() => setShowLeadCapture(false)}
          title="Get Expert Legal Guidance"
          description="Schedule a consultation with our experienced attorneys to discuss your specific legal needs."
          source="know_your_rights_quiz"
          metadata={{
            quizTopic: selectedTopic.title,
            score: score,
            percentage: percentage
          }}
        />
      </>
    )
  }

  const question = selectedTopic.questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-neutral-600">
            Question {currentQuestion + 1} of {selectedTopic.questions.length}
          </span>
          <span className="text-sm font-semibold text-accent-gold">
            Score: {score}/{answeredQuestions.length}
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className="bg-accent-gold h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / selectedTopic.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-neutral-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-accent-gold font-semibold mb-2">
                <Brain className="h-4 w-4" />
                {question.category}
              </div>
              <CardTitle className="text-2xl leading-tight">
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left px-6 py-4 rounded-lg border-2 font-medium transition-all ${
                    showExplanation
                      ? index === question.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-900'
                        : index === selectedAnswer
                        ? 'border-red-500 bg-red-50 text-red-900'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-400'
                      : selectedAnswer === index
                      ? 'border-accent-gold bg-accent-gold/10'
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showExplanation && index === question.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                    {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </button>
              ))}

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-4 p-4 rounded-lg border-2 ${
                      isCorrect
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                          {isCorrect ? 'Correct!' : 'Incorrect'}
                        </p>
                        <p className={`text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next Button */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-4"
                >
                  <button
                    onClick={handleNext}
                    className="w-full bg-primary-navy hover:bg-primary-slate text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {currentQuestion < selectedTopic.questions.length - 1 ? 'Next Question' : 'See Results'}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Exit Quiz */}
      <div className="mt-6 text-center">
        <button
          onClick={handleRestart}
          className="text-sm text-neutral-600 hover:text-primary-navy transition-colors"
        >
          Exit Quiz
        </button>
      </div>
    </div>
  )
}
