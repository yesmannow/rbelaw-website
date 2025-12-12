import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { practiceAreas } from '../../lib/data'
import { NewsMegaMenu } from './NewsMegaMenu'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPracticeAreasOpen, setIsPracticeAreasOpen] = useState(false)
  const [isNewsroomOpen, setIsNewsroomOpen] = useState(false)

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
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-neutral-700 hover:text-primary-navy transition-colors font-medium">
              Home
            </Link>
            
            {/* Practice Areas Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsPracticeAreasOpen(true)}
              onMouseLeave={() => setIsPracticeAreasOpen(false)}
            >
              <button className="flex items-center text-neutral-700 hover:text-primary-navy transition-colors font-medium">
                Practice Areas
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isPracticeAreasOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-corporate rounded-sm animate-fade-in">
                  <div className="py-2">
                    {practiceAreas.map((area) => (
                      <Link
                        key={area.id}
                        to={`/practice-areas/${area.slug}`}
                        className="block px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-navy transition-colors"
                      >
                        {area.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/attorneys" className="text-neutral-700 hover:text-primary-navy transition-colors font-medium">
              Attorneys
            </Link>
            
            {/* Newsroom Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsNewsroomOpen(true)}
              onMouseLeave={() => setIsNewsroomOpen(false)}
            >
              <button className="flex items-center text-neutral-700 hover:text-primary-navy transition-colors font-medium">
                Newsroom
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              <NewsMegaMenu isOpen={isNewsroomOpen} />
            </div>
            
            <Link to="/about" className="text-neutral-700 hover:text-primary-navy transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="btn-primary">
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
