import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout'
import { HomePage } from './pages/home'
import { PracticeAreaPage, BusinessLaw } from './pages/practice-areas'
import { AttorneysPage, AttorneyBioPage } from './pages/attorneys'
import { AboutPage, HistoryPage, CommunityPage, CareersPage, FeesPage } from './pages/about'
import { ContactPage } from './pages/contact'
import { DemoPage } from './pages/demo'
import { 
  ToolsPage, 
  CompCalculatorPage, 
  LienCalculatorPage, 
  SuccessionQuizPage, 
  DistrictMapPage, 
  FLSAWizardPage, 
  LitigationTimelinePage 
} from './pages/tools'
import { GlobalSearch } from './components/command/GlobalSearch'
import { InstallPrompt } from './components/pwa/InstallPrompt'

function App() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <BrowserRouter>
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <InstallPrompt />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="practice-areas/business-law" element={<BusinessLaw />} />
          <Route path="practice-areas/:slug" element={<PracticeAreaPage />} />
          <Route path="attorneys" element={<AttorneysPage />} />
          <Route path="attorneys/:id" element={<AttorneyBioPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about/history" element={<HistoryPage />} />
          <Route path="about/community" element={<CommunityPage />} />
          <Route path="about/careers" element={<CareersPage />} />
          <Route path="about/fees" element={<FeesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="demo" element={<DemoPage />} />
          <Route path="resources/tools" element={<ToolsPage />} />
          <Route path="resources/tools/comp-calculator" element={<CompCalculatorPage />} />
          <Route path="resources/tools/lien-calculator" element={<LienCalculatorPage />} />
          <Route path="resources/tools/succession-quiz" element={<SuccessionQuizPage />} />
          <Route path="resources/tools/district-map" element={<DistrictMapPage />} />
          <Route path="resources/tools/flsa-wizard" element={<FLSAWizardPage />} />
          <Route path="resources/tools/litigation-timeline" element={<LitigationTimelinePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
