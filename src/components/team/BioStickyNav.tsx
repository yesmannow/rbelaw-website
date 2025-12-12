import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BioSection {
  id: string
  label: string
}

interface BioStickyNavProps {
  sections: BioSection[]
}

export function BioStickyNav({ sections }: BioStickyNavProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Account for sticky nav height
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm no-print">
      <div className="section-container">
        <div className="flex items-center gap-6 overflow-x-auto py-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? 'text-primary-navy'
                  : 'text-neutral-600 hover:text-primary-navy'
              }`}
            >
              {section.label}
              {activeSection === section.id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
