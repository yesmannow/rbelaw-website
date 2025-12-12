import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Building2, 
  Gavel, 
  ShieldCheck, 
  Users, 
  HeartPulse, 
  HardHat,
  Scale
} from 'lucide-react'
import { practiceAreas } from '../../../lib/data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui'

// Icon mapping
const iconMap = {
  'Building2': Building2,
  'Gavel': Gavel,
  'ShieldCheck': ShieldCheck,
  'Users': Users,
  'HeartPulse': HeartPulse,
  'HardHat': HardHat,
  'Scale': Scale,
}

export function PracticeAreasSection() {
  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-navy mb-6">
            What We Do
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
            Comprehensive legal expertise across key practice areas serving businesses throughout Indiana and the Midwest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practiceAreas.map((area, index) => {
            const IconComponent = iconMap[area.icon as keyof typeof iconMap] || Building2
            
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <Link to={`/practice-areas/${area.slug}`} className="block h-full group">
                  <Card className="h-full transition-all duration-300 hover:shadow-corporate hover:border-accent-gold group">
                    <CardHeader className="pb-4">
                      <div className="mb-4 inline-block">
                        <div className="p-3 bg-primary-navy/5 rounded-lg group-hover:bg-accent-gold/10 transition-colors duration-300">
                          <IconComponent className="h-8 w-8 text-accent-gold" />
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-accent-gold transition-colors duration-300">
                        {area.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-neutral-600 mb-4 leading-relaxed">
                        {area.description}
                      </CardDescription>
                      <span className="text-accent-gold text-sm font-semibold inline-flex items-center group-hover:translate-x-1 transition-transform duration-300">
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
