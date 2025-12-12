import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout'
import { HomePage } from './pages/home'
import { PracticeAreaPage, BusinessLaw } from './pages/practice-areas'
import { AttorneysPage } from './pages/attorneys'
import { AboutPage, HistoryPage, CommunityPage, CareersPage, FeesPage } from './pages/about'
import { ContactPage } from './pages/contact'
import { IndustriesIndex, IndustryPage } from './pages/industries'
import { DemoPage } from './pages/demo'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="practice-areas/business-law" element={<BusinessLaw />} />
          <Route path="practice-areas/:slug" element={<PracticeAreaPage />} />
          <Route path="attorneys" element={<AttorneysPage />} />
          <Route path="industries" element={<IndustriesIndex />} />
          <Route path="industries/:slug" element={<IndustryPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about/history" element={<HistoryPage />} />
          <Route path="about/community" element={<CommunityPage />} />
          <Route path="about/careers" element={<CareersPage />} />
          <Route path="about/fees" element={<FeesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="demo" element={<DemoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
