import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
// PageTransition is a legacy component for react-router, not used in Next.js App Router

export function RootLayout({ children }: { children?: React.ReactNode }) {
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
        {children}
      </main>
      <Footer />
    </div>
  )
}
