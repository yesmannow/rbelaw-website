/**
 * Mobile Quick Actions
 * Floating action buttons for instant access
 */

import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export function MobileQuickActions() {
  return (
    <div className="lg:hidden fixed bottom-24 left-4 z-[95] flex flex-col gap-3">
      {/* Quick Call - Always Visible */}
      <motion.a
        href="tel:3176368000"
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="w-14 h-14 rounded-full bg-[#B8860B] shadow-2xl flex items-center justify-center"
        style={{
          boxShadow: '0 10px 40px rgba(184, 134, 11, 0.5)'
        }}
      >
        <Phone className="w-6 h-6 text-[#0A2540]" />
      </motion.a>

      {/* Quick Contact */}
      <motion.div
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
      >
        <Link
          to="/contact"
          className="w-14 h-14 rounded-full bg-[#0A2540] border-2 border-[#B8860B] shadow-2xl flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6 text-[#B8860B]" />
        </Link>
      </motion.div>
    </div>
  )
}
