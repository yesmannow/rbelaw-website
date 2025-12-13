export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-primary-navy text-white px-6 py-3 rounded-sm font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2"
      accessKey="s"
    >
      Skip to main content
    </a>
  )
}
