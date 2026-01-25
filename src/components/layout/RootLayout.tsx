import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileNavBar, MobileLogoHeader } from './mobile'
import { PageTransition } from './PageTransition'

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MobileLogoHeader />
      <main 
        id="main-content" 
        className="flex-grow transition-all duration-300 ease-in-out" 
        style={{ paddingTop: 'var(--nav-height)' }}
      >
        <PageTransition />
      </main>
      <Footer />
      <MobileNavBar />
    </div>
  )
}
