import { useState } from 'react'
import { Home, Users, Newspaper } from 'lucide-react'
import { DockItem } from './DockItem'
import { CommandCenterFAB } from './CommandCenterFAB'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/Drawer'
import { motion } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

export function MobileDock() {
  const [isContactDrawerOpen, setIsContactDrawerOpen] = useState(false)
  const [isFooterOpen, setIsFooterOpen] = useState(false)

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // If dragged up more than 50px, show footer
    if (info.offset.y < -50) {
      setIsFooterOpen(true)
    }
  }

  return (
    <>
      {/* Mobile Dock - Only visible on screens < md */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="md:hidden fixed bottom-4 left-4 right-4 z-50"
      >
        <div
          className="relative px-4 py-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl"
          style={{
            border: '1px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #5D1F34 0%, #B8860B 100%)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        >
          {/* Dock Items Container */}
          <div className="flex items-center justify-around gap-2">
            {/* Home */}
            <DockItem icon={Home} label="Home" to="/" />

            {/* Attorneys */}
            <DockItem icon={Users} label="Attorneys" to="/attorneys" />

            {/* Command Center FAB (Contact) - Elevated */}
            <div className="relative -top-8">
              <CommandCenterFAB onAction={() => {}} />
            </div>

            {/* Practice Areas */}
            <DockItem icon={Newspaper} label="Practice" to="/practice-areas/business-corporate" />

            {/* About - placeholder for balance */}
            <div className="flex-1" />
          </div>
        </div>
      </motion.div>

      {/* Contact Drawer */}
      <Drawer open={isContactDrawerOpen} onOpenChange={setIsContactDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Contact Us</DrawerTitle>
          </DrawerHeader>
          <div className="space-y-4">
            <a
              href="tel:317-636-8000"
              className="block w-full py-4 px-6 bg-primary-burgundy text-white rounded-lg text-center font-semibold hover:bg-primary-burgundy/90 transition-colors"
            >
              Call Office: 317-636-8000
            </a>
            <a
              href="mailto:info@rbelaw.com"
              className="block w-full py-4 px-6 bg-primary-navy text-white rounded-lg text-center font-semibold hover:bg-primary-navy/90 transition-colors"
            >
              Email: info@rbelaw.com
            </a>
            <a
              href="https://maps.google.com/?q=Riley+Bennett+Egloff+LLP"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 border-2 border-primary-burgundy text-primary-burgundy rounded-lg text-center font-semibold hover:bg-primary-burgundy hover:text-white transition-colors"
            >
              Get Directions
            </a>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Footer Sheet - Revealed on swipe up */}
      <Drawer open={isFooterOpen} onOpenChange={setIsFooterOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Site Map</DrawerTitle>
          </DrawerHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-primary-navy mb-2">Navigation</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li><a href="/" className="hover:text-primary-burgundy">Home</a></li>
                <li><a href="/attorneys" className="hover:text-primary-burgundy">Attorneys</a></li>
                <li><a href="/about" className="hover:text-primary-burgundy">About</a></li>
                <li><a href="/contact" className="hover:text-primary-burgundy">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary-navy mb-2">Practice Areas</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li><a href="/practice-areas/business-corporate" className="hover:text-primary-burgundy">Business & Corporate</a></li>
                <li><a href="/practice-areas/litigation-defense" className="hover:text-primary-burgundy">Litigation</a></li>
                <li><a href="/practice-areas/construction" className="hover:text-primary-burgundy">Construction</a></li>
              </ul>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
