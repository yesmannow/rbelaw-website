import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout'
import { HomePage } from './pages/home'
import { BusinessLaw } from './pages/practice-areas'
import { AttorneysPage, AttorneyBioPage } from './pages/attorneys'
import { ProfessionalsPage, LegalAssistantsPage } from './pages/team'
import { AboutPage, HistoryPage, CommunityPage, DiversityPage, CareersPage, FeesPage } from './pages/about'
import { ContactPage } from './pages/contact'
import { DemoPage } from './pages/demo'
import { IndustriesIndex } from './pages/industries'
import {
  ToolsPage,
  CompCalculatorPage,
  LienCalculatorPage,
  SuccessionQuizPage,
  DistrictMapPage,
  FLSAWizardPage,
  LitigationTimelinePage,
  ContractAnalyzerPage,
  EntityComparisonPage,
  OSHACalculatorPage,
  RightsQuizPage,
  LegalGlossaryPage
} from './pages/tools'
import { AINewsDigestPage } from './pages/news'
import { Newsroom } from './pages/Newsroom'
import { BlogPost } from './pages/BlogPost'
import { PracticeAreaDetail } from './pages/PracticeAreaDetail'
import { IndustryDetail } from './pages/IndustryDetail'
import { AccessibilityStatement, Disclaimer } from './pages/legal'
import { NotFound } from './pages/NotFound'
import { GlobalSearch } from './components/command/GlobalSearch'
import { InstallPrompt } from './components/pwa/InstallPrompt'
import { CookieConsent } from './components/compliance'
import { SkipToContent } from './components/compliance/SkipToContent'
import { ConciergeWidget } from './components/chat'
import { RBELawAssistant } from './components/chat/RBELawAssistant'
import { useLenis } from './hooks/useLenis'

function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  // Initialize smooth scrolling
  useLenis()

  return (
    <BrowserRouter>
      <SkipToContent />
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <InstallPrompt />
      <CookieConsent />
      <ConciergeWidget />
      <RBELawAssistant />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="practice-areas/business-law" element={<BusinessLaw />} />
          <Route path="practice-areas/:slug" element={<PracticeAreaDetail />} />
          <Route path="attorneys" element={<AttorneysPage />} />
          <Route path="attorneys/:id" element={<AttorneyBioPage />} />
          <Route path="team/professionals" element={<ProfessionalsPage />} />
          <Route path="team/assistants" element={<LegalAssistantsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about/history" element={<HistoryPage />} />
          <Route path="about/community" element={<CommunityPage />} />
          <Route path="about/diversity" element={<DiversityPage />} />
          <Route path="about/careers" element={<CareersPage />} />
          <Route path="about/fees" element={<FeesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="newsroom" element={<Newsroom />} />
          <Route path="newsroom/:slug" element={<BlogPost />} />
          <Route path="industries" element={<IndustriesIndex />} />
          <Route path="industries/:slug" element={<IndustryDetail />} />
          <Route path="demo" element={<DemoPage />} />
          <Route path="resources/tools" element={<ToolsPage />} />
          <Route path="resources/tools/comp-calculator" element={<CompCalculatorPage />} />
          <Route path="resources/tools/lien-calculator" element={<LienCalculatorPage />} />
          <Route path="resources/tools/succession-quiz" element={<SuccessionQuizPage />} />
          <Route path="resources/tools/district-map" element={<DistrictMapPage />} />
          <Route path="resources/tools/flsa-wizard" element={<FLSAWizardPage />} />
          <Route path="resources/tools/litigation-timeline" element={<LitigationTimelinePage />} />
          <Route path="resources/tools/contract-analyzer" element={<ContractAnalyzerPage />} />
          <Route path="resources/tools/entity-comparison" element={<EntityComparisonPage />} />
          <Route path="resources/tools/osha-calculator" element={<OSHACalculatorPage />} />
          <Route path="resources/tools/rights-quiz" element={<RightsQuizPage />} />
          <Route path="resources/tools/legal-glossary" element={<LegalGlossaryPage />} />
          <Route path="newsroom/ai-digest" element={<AINewsDigestPage />} />
          <Route path="accessibility-statement" element={<AccessibilityStatement />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
