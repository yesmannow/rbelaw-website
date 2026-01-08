import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Search } from 'lucide-react'

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0A2540] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md text-center"
      >
        <h1 className="text-[#B8860B] text-9xl font-playfair font-bold">404</h1>
        <h2 className="text-white text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-white/70 mt-4 leading-relaxed">
          The legal insight or service you are looking for has been moved to our new dynamic prestige ecosystem.
        </p>
        <div className="mt-10 flex flex-col gap-4">
          <Link to="/" className="bg-[#B8860B] text-[#0A2540] py-3 px-8 rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
            <ArrowLeft size={18} /> Return to Home
          </Link>
          <Link to="/newsroom" className="text-white/80 hover:text-[#B8860B] transition-colors flex items-center justify-center gap-2">
            <Search size={18} /> Visit the Newsroom
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
