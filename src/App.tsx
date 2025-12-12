import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout'
import { HomePage } from './pages/home'
import { PracticeAreaPage } from './pages/practice-areas'
import { AttorneysPage } from './pages/attorneys'
import { AboutPage, HistoryPage, CommunityPage, CareersPage, FeesPage } from './pages/about'
import { ContactPage } from './pages/contact'
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
          <Route path="practice-areas/:slug" element={<PracticeAreaPage />} />
          <Route path="attorneys" element={<AttorneysPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about/history" element={<HistoryPage />} />
          <Route path="about/community" element={<CommunityPage />} />
          <Route path="about/careers" element={<CareersPage />} />
          <Route path="about/fees" element={<FeesPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
