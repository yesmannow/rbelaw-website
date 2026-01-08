import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { attorneys } from '@/lib/data/attorney-helpers'
import { SEOMeta } from '@/components/seo/SEOMeta'

export function AttorneysPage() {
  return (
    <>
      <SEOMeta
        title="Our Attorneys"
        description="Meet our team of experienced legal professionals committed to delivering exceptional results."
      />

      <div>
        {/* Hero Section */}
        <section className="bg-primary-navy text-white py-16 lg:py-20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-primary text-white mb-4">
                Our Attorneys
              </h1>
              <p className="text-xl text-neutral-200 max-w-3xl">
                Meet our team of experienced legal professionals committed to delivering exceptional results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Attorneys List */}
        <section className="py-16 lg:py-20">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attorneys.map((attorney, index) => (
                <motion.div
                  key={attorney.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/attorneys/${attorney.id}`}
                    className="block bg-white rounded-lg shadow-soft hover:shadow-corporate transition-shadow overflow-hidden group"
                  >
                    <div className="aspect-square bg-neutral-200 overflow-hidden">
                      <img
                        src={attorney.imageUrl}
                        alt={attorney.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-avatar.jpg'
                        }}
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-primary-navy mb-1">
                        {attorney.name}
                      </h3>
                      <p className="text-accent-gold font-medium mb-3">{attorney.title}</p>
                      
                      <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                        {attorney.bio}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Phone className="w-4 h-4" />
                          {attorney.phone}
                        </div>
                        <div className="flex items-center gap-2 text-neutral-600">
                          <Mail className="w-4 h-4" />
                          {attorney.email}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
