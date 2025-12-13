import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileDock } from './mobile'
import { PageTransition } from './PageTransition'

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-grow">
        <PageTransition />
      </main>
      <Footer />
      <MobileDock />
    </div>
  )
}
