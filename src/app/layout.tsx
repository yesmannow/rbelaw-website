import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Riley Bennett Egloff LLP',
  description: 'A premier mid-sized law firm specializing in Corporate Law, Insurance Defense, Construction, and Litigation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
