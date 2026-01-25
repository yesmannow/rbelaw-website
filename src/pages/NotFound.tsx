import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Users } from 'lucide-react'

/**
 * NotFound - Prestige 404 Page
 * Branded error page with Navy #0A2540 background and Gold radial glow
 * Retains lost visitors within the prestige brand
 */
export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0A2540] relative flex items-center justify-center px-6 overflow-hidden">
      {/* Gold radial glow background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(184, 134, 11, 0.15) 0%, rgba(10, 37, 64, 0) 70%)'
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl text-center"
      >
        {/* 404 with Playfair Display */}
        <motion.h1 
          className="text-[#B8860B] text-[10rem] md:text-[12rem] font-playfair font-bold leading-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            textShadow: '0 0 20px rgba(184, 134, 11, 0.3)'
          }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="text-white text-3xl md:text-4xl font-semibold mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          This legal insight has been moved
        </motion.h2>
        
        <motion.p 
          className="text-white/70 text-lg mt-6 leading-relaxed max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          The page you're looking for has been relocated to our optimized prestige platform.
        </motion.p>
        
        {/* Navigation Buttons */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link 
            to="/" 
            className="group bg-[#B8860B] text-[#0A2540] py-4 px-8 rounded-lg font-bold hover:bg-[#D4A017] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Home size={20} className="group-hover:-translate-x-1 transition-transform" />
            Return Home
          </Link>
          
          <Link 
            to="/attorneys" 
            className="group border-2 border-[#B8860B] text-[#B8860B] py-4 px-8 rounded-lg font-bold hover:bg-[#B8860B] hover:text-[#0A2540] transition-all flex items-center justify-center gap-3"
          >
            <Users size={20} className="group-hover:scale-110 transition-transform" />
            Meet Our Team
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
