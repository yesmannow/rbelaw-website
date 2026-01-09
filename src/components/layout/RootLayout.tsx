import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { PageTransition } from './PageTransition'

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        id="main-content"
        className="flex-grow transition-all duration-300 ease-in-out lg:pb-0 pb-20"
        style={{
          paddingTop: 'var(--nav-height)'
        }}
      >
        <PageTransition />
      </main>
      <Footer />
    </div>
  )
}
