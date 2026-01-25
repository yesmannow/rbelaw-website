import { motion } from 'framer-motion'
import { PageHeader } from '../../components/layout'
import { AboutSidebar } from '../../components/about/AboutSidebar'
import { Accordion, AccordionItem } from '../../components/ui'
import { Check, Briefcase, GraduationCap } from 'lucide-react'

export function CareersPage() {
  const benefits = [
    'Semi-annual performance reviews',
    'Bonus potential',
    '401k & Matching',
    'Comprehensive Health Plan',
    'Professional development opportunities',
    'Collaborative work environment'
  ]

  return (
    <div>
      <PageHeader 
        title="Build Your Future at RBE"
        subtitle="Join a team where quality service and entrepreneurial spirit are rewarded."
        backgroundImage="/images/stock%20images/indianapolis-1888215_1280.jpg"
      />

      {/* Why Join Us & Open Positions Split Layout */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Why Join Us */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary-burgundy/10 p-3 rounded-sm mr-4">
                  <Briefcase className="h-6 w-6 text-primary-burgundy" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-primary-burgundy">
                  Why Join Us
                </h2>
              </div>
              
              <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                We are a <span className="font-semibold text-primary-burgundy">meritocracy</span> that 
                rewards quality service and entrepreneurial spirit. We combine the sophistication of a 
                large firm with the collegiality of a boutique practice.
              </p>

              <h3 className="text-xl font-serif font-semibold text-primary-burgundy mb-4">
                What We Offer
              </h3>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                    className="flex items-start"
                  >
                    <Check className="h-5 w-5 text-accent-gold mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Open Positions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary-burgundy/10 p-3 rounded-sm mr-4">
                  <GraduationCap className="h-6 w-6 text-primary-burgundy" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-primary-burgundy">
                  Open Positions
                </h2>
              </div>

              <div className="bg-neutral-50 rounded-sm p-6 mb-8">
                <h3 className="text-lg font-semibold text-primary-burgundy mb-3">
                  Experienced Attorneys
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  We are always seeking talented attorneys with experience in Business Litigation, 
                  Insurance Defense, Labor & Employment, or Estate Planning.
                </p>
                <a 
                  href="mailto:careers@rbelaw.com" 
                  className="inline-block bg-primary-burgundy text-white px-6 py-2 rounded-sm hover:bg-primary-burgundy/90 transition-colors duration-300"
                >
                  Submit Your Resume
                </a>
              </div>

              <div className="bg-neutral-50 rounded-sm p-6">
                <h3 className="text-lg font-semibold text-primary-burgundy mb-3">
                  Support Staff
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  From paralegals to administrative professionals, we value team members who 
                  contribute to our culture of excellence.
                </p>
                <a 
                  href="mailto:careers@rbelaw.com" 
                  className="inline-block bg-primary-burgundy text-white px-6 py-2 rounded-sm hover:bg-primary-burgundy/90 transition-colors duration-300"
                >
                  Apply Now
                </a>
              </div>
            </motion.div>
              </div>
            </div>
            
            {/* Sidebar */}
            <AboutSidebar />
          </div>
        </div>
      </section>

      {/* Summer Associates Program */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-primary-burgundy mb-4 text-center">
              Summer Associate Program
            </h2>
            <p className="text-lg text-neutral-700 text-center mb-10">
              Our program begins in May and focuses on real legal work, not just shadowing. 
              You'll gain hands-on experience across multiple practice areas.
            </p>

            <Accordion className="bg-white rounded-sm p-6 shadow-soft">
              <AccordionItem title="What is the firm culture like?" defaultOpen={true}>
                <p className="mb-3">
                  We foster a collaborative environment where every team member's contribution is valued. 
                  Our attorneys work together across practice areas, sharing knowledge and supporting each other.
                </p>
                <p>
                  You'll experience the sophistication of a large firm with the approachability and 
                  mentorship of a smaller practice.
                </p>
              </AccordionItem>

              <AccordionItem title="What kind of work will I be exposed to?">
                <p className="mb-3">
                  Summer associates work on substantive legal matters including research, drafting motions, 
                  attending depositions, and client meetings. You'll rotate through our core practice areas:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Business Litigation</li>
                  <li>Insurance Defense</li>
                  <li>Labor & Employment</li>
                  <li>Estate Planning</li>
                </ul>
              </AccordionItem>

              <AccordionItem title="How does mentorship work?">
                <p className="mb-3">
                  Each summer associate is paired with a senior attorney mentor who provides guidance, 
                  feedback, and career counseling throughout the program.
                </p>
                <p>
                  You'll also work with multiple attorneys across practice areas, giving you diverse 
                  perspectives and learning opportunities. Regular check-ins ensure you're getting 
                  the experience and support you need.
                </p>
              </AccordionItem>

              <AccordionItem title="What are the program details?">
                <p className="mb-3">
                  <strong>Duration:</strong> 10-12 weeks, beginning in May
                </p>
                <p className="mb-3">
                  <strong>Compensation:</strong> Competitive salary commensurate with market rates
                </p>
                <p>
                  <strong>Application:</strong> We recruit from top law schools. Submit your resume, 
                  transcript, and writing sample to <a href="mailto:recruiting@rbelaw.com" className="text-primary-burgundy hover:underline">recruiting@rbelaw.com</a>
                </p>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  )
}