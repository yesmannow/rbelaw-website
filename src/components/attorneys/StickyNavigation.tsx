import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Section {
  id: string
  label: string
}

interface StickyNavigationProps {
  sections: Section[]
}

export function StickyNavigation({ sections }: StickyNavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '')
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if nav should be sticky
      setIsSticky(window.scrollY > 400)

      // Find active section
      const sectionElements = sections.map(s => document.getElementById(s.id))
      const currentSection = sectionElements.find(el => {
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 150 && rect.bottom >= 150
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isSticky ? 0 : -100 }}
      className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 shadow-sm transition-all duration-300 ${
        isSticky ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center overflow-x-auto py-4 gap-2 scrollbar-hide">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-primary-navy text-white'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
