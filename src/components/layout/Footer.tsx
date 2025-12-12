import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { practiceAreas } from '../../lib/data'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-navy text-white">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Firm Info */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Riley Bennett Egloff
            </h3>
            <p className="text-neutral-300 mb-6 text-sm">
              A premier mid-sized law firm specializing in Corporate Law, Insurance Defense, Construction, and Litigation.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-accent-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-white mb-4">
              Practice Areas
            </h4>
            <ul className="space-y-2">
              {practiceAreas.slice(0, 4).map((area) => (
                <li key={area.id}>
                  <Link 
                    to={`/practice-areas/${area.slug}`}
                    className="text-neutral-300 hover:text-accent-gold transition-colors text-sm"
                  >
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/attorneys" className="text-neutral-300 hover:text-accent-gold transition-colors text-sm">
                  Attorneys
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-accent-gold transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-accent-gold transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start text-sm">
                <MapPin className="h-5 w-5 text-neutral-300 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-300">
                  123 Main Street<br />
                  Kansas City, MO 64105
                </span>
              </li>
              <li className="flex items-center text-sm">
                <Phone className="h-5 w-5 text-neutral-300 mr-2 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-neutral-300 hover:text-accent-gold transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center text-sm">
                <Mail className="h-5 w-5 text-neutral-300 mr-2 flex-shrink-0" />
                <a href="mailto:info@rbelaw.com" className="text-neutral-300 hover:text-accent-gold transition-colors">
                  info@rbelaw.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-400">
              © {currentYear} Riley Bennett Egloff LLP. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-neutral-400 hover:text-accent-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/disclaimer" className="text-neutral-400 hover:text-accent-gold transition-colors">
                Legal Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
