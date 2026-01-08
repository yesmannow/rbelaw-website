import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout'
import { HomePage } from './pages/home'
import { 
  BusinessLaw, 
  BankruptcyReorganization,
  BusinessLitigation,
  CommercialLitigation,
  Construction,
  FamilyLaw,
  GovernmentLaw,
  HealthCare,
  Insurance,
  IntellectualProperty,
  LaborEmployment,
  RealEstate,
  WillsTrustsEstates,
} from './pages/practice-areas'
import IndustriesIndex from './pages/industries/IndustriesIndex'
import IndustryPage from './pages/industries/IndustryPage'
import { AttorneysPage, AttorneyBioPage } from './pages/attorneys'
import { ProfessionalsPage, LegalAssistantsPage } from './pages/team'
import { AboutPage, HistoryPage, CommunityPage, DiversityPage, CareersPage, FeesPage } from './pages/about'
import { ContactPage } from './pages/contact'
import { DemoPage } from './pages/demo'
// Removed IndustriesIndex
import PracticeAreasIndex from './pages/PracticeAreasIndex'
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
// Removed PracticeAreaDetail and IndustryDetail (scraped-data dependent)
import { AccessibilityStatement, Disclaimer } from './pages/legal'
import { NotFound } from './pages/NotFound'
import { GlobalSearch } from './components/command/GlobalSearch'
import { InstallPrompt } from './components/pwa/InstallPrompt'
import { CookieConsent } from './components/compliance'
import { SkipToContent } from './components/compliance/SkipToContent'
import { ConciergeWidget } from './components/chat'
import { RBELawAssistant } from './components/chat/RBELawAssistant'
import { useLenis } from './hooks/useLenis'

// Lazy-loaded heavy pages to improve initial bundle size
const Newsroom = lazy(() => import('./pages/Newsroom').then(m => ({ default: m.Newsroom })))
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })))

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
      <Suspense fallback={<div className="section-container py-12">Loading...</div>}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="practice-areas/business-law" element={<BusinessLaw />} />
          <Route path="practice-areas" element={<PracticeAreasIndex />} />
          <Route path="practice-areas/bankruptcy-reorganization" element={<BankruptcyReorganization />} />
          <Route path="practice-areas/bankruptcy" element={<BankruptcyReorganization />} />
          <Route path="practice-areas/business-litigation" element={<BusinessLitigation />} />
          <Route path="practice-areas/commercial-litigation" element={<CommercialLitigation />} />
          <Route path="practice-areas/construction" element={<Construction />} />
          <Route path="practice-areas/family-law" element={<FamilyLaw />} />
          <Route path="practice-areas/government-law" element={<GovernmentLaw />} />
          <Route path="practice-areas/health-care" element={<HealthCare />} />
          <Route path="practice-areas/insurance" element={<Insurance />} />
          <Route path="practice-areas/intellectual-property" element={<IntellectualProperty />} />
          <Route path="practice-areas/labor-employment" element={<LaborEmployment />} />
          <Route path="practice-areas/real-estate" element={<RealEstate />} />
          <Route path="practice-areas/wills-trusts-estates" element={<WillsTrustsEstates />} />
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
          <Route path="industries/:slug" element={<IndustryPage />} />
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
      </Suspense>
    </BrowserRouter>
  )
}

export default App
