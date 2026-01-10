import type { Metadata, Viewport } from 'next'
import './globals.css'
import { MobileStickyBar } from '@/components/ui/MobileStickyBar'

export const metadata: Metadata = {
  title: 'Riley Bennett Egloff LLP | Corporate Law Excellence',
  description: 'A premier mid-sized law firm specializing in Corporate Law, Insurance Defense, Construction, and Litigation.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#213469',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden">
        {children}
        <MobileStickyBar />
      </body>
    </html>
  )
}
