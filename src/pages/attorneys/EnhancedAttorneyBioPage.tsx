import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, GraduationCap, FileText, Briefcase, Award } from 'lucide-react'
import { getAttorneyById } from '@/lib/data/attorneys'
import { SEOMeta } from '@/components/seo/SEOMeta'
import { LeadCaptureModal } from '@/components/marketing/LeadCaptureModal'
import {
  AttorneyHero,
  StickyNavigation,
  StatsCard,
  StickyContactCard,
  TimelineVisualization,
  RecognitionWall,
  PublicationsList,
  RepresentativeMatters,
  AtAGlanceWidget
} from '@/components/attorneys'

export function EnhancedAttorneyBioPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const attorney = id ? getAttorneyById(id) : null
  const [showLeadCapture, setShowLeadCapture] = useState(false)

  if (!attorney) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-primary-navy mb-4">
            Attorney Not Found
          </h1>
          <button
            onClick={() => navigate('/attorneys')}
            className="text-primary-burgundy hover:underline"
          >
            Back to Attorneys
          </button>
        </div>
      </div>
    )
  }

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'experience', label: 'Experience' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'recognition', label: 'Recognition' },
    { id: 'publications', label: 'Publications' }
  ]

  // Mock data for demonstration - replace with real data
  const mockStats = {
    yearsExperience: 15,
    casesHandled: 500,
    industriesServed: ['Construction', 'Healthcare', 'Manufacturing'],
    languages: ['English']
  }

  return (
    <>
      <SEOMeta
        title={`${attorney.name} | Riley Bennett Egloff LLP`}
        description={attorney.bio}
        image={attorney.imageUrl}
        type="profile"
        author={attorney.name}
      />

      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <AttorneyHero 
          attorney={attorney} 
          onScheduleClick={() => setShowLeadCapture(true)}
        />

        {/* Sticky Navigation */}
        <StickyNavigation sections={sections} />

        {/* Main Content */}
        <section className="py-12">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-12">
                {/* Overview Section */}
                <div id="overview" className="scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-serif font-bold text-primary-navy mb-6">
                      Overview
                    </h2>
                    
                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <StatsCard
                        icon={Trophy}
                        value={500}
                        suffix="+"
                        label="Cases Won"
                        description="Successful outcomes for clients"
                      />
                      <StatsCard
                        icon={GraduationCap}
                        value={15}
                        suffix="+"
                        label="Years Experience"
                        description="Practicing law in Indiana"
                      />
                    </div>

                    {/* Biography */}
                    <div className="prose prose-lg max-w-none">
                      <p className="text-neutral-700 leading-relaxed">
                        {attorney.bio}
                      </p>
                    </div>

                    {/* Bar Admissions */}
                    {attorney.barAdmissions && attorney.barAdmissions.length > 0 && (
                      <div className="mt-8 bg-white rounded-xl border-2 border-neutral-200 p-6">
                        <h3 className="text-xl font-semibold text-primary-navy mb-4 flex items-center gap-2">
                          <Award className="h-5 w-5 text-accent-gold" />
                          Bar Admissions
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {attorney.barAdmissions.map((bar, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-neutral-700">
                              <div className="w-2 h-2 bg-accent-gold rounded-full" />
                              {bar}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Experience Section */}
                <div id="experience" className="scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-serif font-bold text-primary-navy mb-6 flex items-center gap-3">
                      <Briefcase className="h-8 w-8 text-accent-gold" />
                      Representative Matters
                    </h2>
                    <RepresentativeMatters matters={attorney.representativeMatters} />
                  </motion.div>
                </div>

                {/* Credentials Section */}
                <div id="credentials" className="scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-serif font-bold text-primary-navy mb-6 flex items-center gap-3">
                      <GraduationCap className="h-8 w-8 text-accent-gold" />
                      Education & Career Timeline
                    </h2>
                    <TimelineVisualization 
                      education={attorney.education}
                      careerMilestones={[
                        {
                          year: '2020',
                          title: 'Named Partner',
                          description: 'Elevated to partnership at Riley Bennett Egloff LLP',
                          type: 'career'
                        },
                        {
                          year: '2015',
                          title: 'Senior Associate',
                          description: 'Promoted to Senior Associate',
                          type: 'career'
                        }
                      ]}
                    />
                  </motion.div>
                </div>

                {/* Recognition Section */}
                <div id="recognition" className="scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-serif font-bold text-primary-navy mb-6 flex items-center gap-3">
                      <Trophy className="h-8 w-8 text-accent-gold" />
                      Awards & Recognition
                    </h2>
                    <RecognitionWall awards={attorney.awards} />
                  </motion.div>
                </div>

                {/* Publications Section */}
                <div id="publications" className="scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-serif font-bold text-primary-navy mb-6 flex items-center gap-3">
                      <FileText className="h-8 w-8 text-accent-gold" />
                      Publications & Articles
                    </h2>
                    <PublicationsList publications={attorney.publications} />
                  </motion.div>
                </div>
              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-1 space-y-6">
                {/* Contact Card */}
                <StickyContactCard 
                  attorney={attorney}
                  onScheduleClick={() => setShowLeadCapture(true)}
                />

                {/* At a Glance */}
                <AtAGlanceWidget data={mockStats} />

                {/* Professional Associations */}
                {attorney.associations && attorney.associations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-xl border-2 border-neutral-200 p-6"
                  >
                    <h3 className="text-lg font-bold text-primary-navy mb-4">
                      Professional Associations
                    </h3>
                    <ul className="space-y-2">
                      {attorney.associations.map((assoc, idx) => (
                        <li key={idx} className="text-sm text-neutral-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-accent-gold rounded-full mt-2 flex-shrink-0" />
                          <span>{assoc}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-gradient-to-br from-primary-navy to-primary-slate text-white">
          <div className="section-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Ready to Work Together?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Schedule a consultation with {attorney.name.split(' ')[0]} to discuss your legal needs.
              </p>
              <button
                onClick={() => setShowLeadCapture(true)}
                className="bg-accent-gold hover:bg-accent-gold/90 text-primary-navy px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                Schedule Consultation
                <Trophy className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        title={`Schedule a Consultation with ${attorney.name}`}
        description="Our team will reach out to schedule a time that works for you."
        source="attorney_bio"
        metadata={{
          attorneyId: attorney.id,
          attorneyName: attorney.name
        }}
      />
    </>
  )
}
