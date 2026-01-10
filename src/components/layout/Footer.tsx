import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#00115e] text-white">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Firm Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Riley Bennett Egloff LLP
            </h3>
            <p className="text-white/80 mb-6 text-sm max-w-md">
              A premier law firm serving clients throughout Indiana with excellence in corporate law, 
              insurance defense, construction law, and business litigation.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-start text-sm">
                <MapPin className="h-5 w-5 text-white/60 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">
                  500 N. Meridian Street, Suite 550<br />
                  Indianapolis, IN 46204
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-5 w-5 text-white/60 mr-2 flex-shrink-0" />
                <a href="tel:+13176368000" className="text-white/80 hover:text-accent-gold transition-colors">
                  317.636.8000
                </a>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="h-5 w-5 text-white/60 mr-2 flex-shrink-0" />
                <a href="mailto:info@rbelaw.com" className="text-white/80 hover:text-accent-gold transition-colors">
                  info@rbelaw.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/company/riley-bennett-egloff"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/RBELaw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/rbelaw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/rbelaw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-accent-gold transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-accent-gold transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/attorneys" className="text-white/80 hover:text-accent-gold transition-colors text-sm">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/corporate-law" className="text-white/80 hover:text-accent-gold transition-colors text-sm">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/industries" className="text-white/80 hover:text-accent-gold transition-colors text-sm">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/newsroom" className="text-white/80 hover:text-accent-gold transition-colors text-sm">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-accent-gold transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://rbelaw.com/make-a-payment" className="text-white/80 hover:text-accent-gold transition-colors text-sm">
                  Make a Payment
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-serif font-semibold text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/accessibility-statement" className="text-white/80 hover:text-accent-gold transition-colors text-sm">
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-white/80 hover:text-accent-gold transition-colors text-sm">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-accent-gold transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/60">
              © {currentYear} Riley Bennett Egloff LLP. All rights reserved.
            </p>
            <p className="text-xs text-white/50">
              Attorney Advertising. Prior results do not guarantee a similar outcome.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
