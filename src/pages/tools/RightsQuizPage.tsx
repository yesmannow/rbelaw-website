import { SEOMeta } from '@/components/seo/SEOMeta'
import { KnowYourRightsQuiz } from '@/components/tools'

export function RightsQuizPage() {
  return (
    <>
      <SEOMeta
        title="Know Your Rights Quiz Series | Riley Bennett Egloff LLP"
        description="Test your legal knowledge with interactive quizzes on employment law, construction law, and insurance defense. Perfect for employers and business owners."
      />
      
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="section-container">
          <KnowYourRightsQuiz />
        </div>
      </div>
    </>
  )
}
