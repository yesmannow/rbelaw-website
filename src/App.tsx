/**
 * src/App.tsx
 * Dynamic Routing & Prestige Transition Engine
 */
import { useState, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { RootLayout } from './components/layout'
import { HomePage } from '@/pages/home'
import { NewsroomPrestige } from '@/pages/NewsroomPrestige'
import { BlogPost } from '@/pages/news/BlogPost'
import PracticeAreasIndex from '@/pages/PracticeAreasIndex'
import { PracticeAreaDetail } from '@/pages/practice-areas/PracticeAreaDetail'
import { AttorneysPage } from '@/pages/attorneys'
import { AttorneyBioPagePrestige } from '@/pages/attorneys/AttorneyBioPagePrestige'
import { ProfessionalsPage, LegalAssistantsPage } from '@/pages/team'
import { AboutPage, HistoryPage, CommunityPage, DiversityPage, CareersPage, FeesPage } from '@/pages/about'
import { ContactPage } from '@/pages/contact'
import { DemoPage } from '@/pages/demo'
import {
  ToolsPage,
  DistrictMapPage,
  LitigationTimelinePage,
  LegalGlossaryPage
} from '@/pages/tools'
import { AINewsDigestPage } from '@/pages/news'
import { AccessibilityStatement, Disclaimer } from '@/pages/legal'
import { NotFound } from '@/pages/NotFound'
import { GlobalSearch } from '@/components/command/GlobalSearch'
import { InstallPrompt } from '@/components/pwa/InstallPrompt'
import { CookieConsent } from '@/components/compliance'
import { SkipToContent } from '@/components/compliance/SkipToContent'
import { NewsSkeleton } from '@/components/news/NewsSkeleton'
import { useLenis } from '@/hooks/useLenis'

// Animated Routes Wrapper for View Transitions
function AnimatedRoutes() {
  const location = useLocation()

  return (
    // 'wait' mode ensures smooth exit-before-enter transitions
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          
          {/* Dynamic Routing for Practice Areas */}
          <Route path="practice-areas" element={<PracticeAreasIndex />} />
          <Route path="practice-areas/:slug" element={<PracticeAreaDetail />} />
          
          {/* Team & Attorneys - Prestige Version */}
          <Route path="attorneys" element={<AttorneysPage />} />
          <Route path="attorneys/:id" element={<AttorneyBioPagePrestige />} />
          <Route path="team/professionals" element={<ProfessionalsPage />} />
          <Route path="team/legal-assistants" element={<LegalAssistantsPage />} />
          
          {/* About Pages */}
          <Route path="about" element={<AboutPage />} />
          <Route path="about/history" element={<HistoryPage />} />
          <Route path="about/community" element={<CommunityPage />} />
          <Route path="about/diversity" element={<DiversityPage />} />
          <Route path="about/careers" element={<CareersPage />} />
          <Route path="about/fees" element={<FeesPage />} />
          
          {/* Contact */}
          <Route path="contact" element={<ContactPage />} />
          
          {/* Newsroom - Prestige Version */}
          <Route path="newsroom" element={<NewsroomPrestige />} />
          <Route path="newsroom/:slug" element={<BlogPost />} />
          
          {/* Demo */}
          <Route path="demo" element={<DemoPage />} />
          
          {/* Tools/Resources */}
          <Route path="resources/tools" element={<ToolsPage />} />
          <Route path="resources/tools/district-map" element={<DistrictMapPage />} />
          <Route path="resources/tools/litigation-timeline" element={<LitigationTimelinePage />} />
          <Route path="resources/tools/legal-glossary" element={<LegalGlossaryPage />} />
          
          {/* News/AI Digest */}
          <Route path="newsroom/ai-digest" element={<AINewsDigestPage />} />
          
          {/* Legal Pages */}
          <Route path="accessibility-statement" element={<AccessibilityStatement />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

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
      <Suspense fallback={
        <div className="section-container py-12">
          <NewsSkeleton count={3} />
        </div>
      }>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  )
}

export default App

