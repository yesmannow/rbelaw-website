import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { practiceAreas } from '../../lib/data'
import { MegaMenu } from './MegaMenu'
import { triggerGlobalSearch } from '../../lib/utils/megaMenu'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPracticeAreasOpen, setIsPracticeAreasOpen] = useState(false)

  return (
    <nav className="bg-white shadow-soft sticky top-0 z-50">
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold text-primary-navy">
              Riley Bennett Egloff
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/" className="text-neutral-700 hover:text-primary-burgundy transition-colors font-medium">
              Home
            </Link>
            
            {/* Mega Menu */}
            <MegaMenu onSearchTrigger={triggerGlobalSearch} />

            {/* Client Portal - Ghost Button */}
            <Link 
              to="/client-portal" 
              className="text-neutral-700 hover:text-primary-burgundy transition-colors font-medium px-4 py-2 border border-neutral-300 rounded-sm hover:border-primary-burgundy"
            >
              Client Portal
            </Link>

            {/* Contact - Primary Button */}
            <Link to="/contact" className="bg-primary-burgundy hover:bg-primary-burgundy/90 text-white px-6 py-2 rounded-sm font-semibold transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-navy"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-neutral-700 hover:text-primary-navy transition-colors font-medium">
                Home
              </Link>
              
              <div>
                <button 
                  onClick={() => setIsPracticeAreasOpen(!isPracticeAreasOpen)}
                  className="flex items-center text-neutral-700 hover:text-primary-navy transition-colors font-medium w-full"
                >
                  Practice Areas
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isPracticeAreasOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPracticeAreasOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {practiceAreas.map((area) => (
                      <Link
                        key={area.id}
                        to={`/practice-areas/${area.slug}`}
                        className="block text-sm text-neutral-600 hover:text-primary-navy transition-colors"
                      >
                        {area.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/attorneys" className="text-neutral-700 hover:text-primary-navy transition-colors font-medium">
                Attorneys
              </Link>
              <Link to="/about" className="text-neutral-700 hover:text-primary-navy transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="btn-primary inline-block text-center">
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
