import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calculator, Calendar, TrendingUp, MapPin, Shield, Clock, CheckCircle2, Zap, Users, FileText, Building2, AlertTriangle, Brain, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { SEOMeta } from '@/components/seo/SEOMeta'

interface ToolCardProps {
  icon: React.ReactNode
  title: string
  description: string
  to: string
  category: string
  index: number
}

function ToolCard({ icon, title, description, to, category, index }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={to} className="block group h-full">
        <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:border-primary-burgundy hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="p-4 bg-gradient-to-br from-primary-navy to-primary-burgundy rounded-lg group-hover:scale-110 transition-transform duration-300 text-white">
                {icon}
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-primary-burgundy mb-2 uppercase tracking-wide">
                  {category}
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-primary-burgundy transition-colors duration-300">
                  {title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </motion.div>
  )
}

export function ToolsPage() {
  const tools = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Workers' Comp Benefit Calculator",
      description: "Calculate your potential TTD and PPI benefits under Indiana law with official statutory limits.",
      to: "/resources/tools/comp-calculator",
      category: "Workers' Compensation"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Construction Lien Deadline Calculator",
      description: "Never miss a Notice to Owner or Mechanic's Lien filing deadline with our automated timeline generator.",
      to: "/resources/tools/lien-calculator",
      category: "Construction Law"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Contract Risk Analyzer",
      description: "Upload or paste your contract to identify risky clauses like indemnification, liability caps, and payment terms.",
      to: "/resources/tools/contract-analyzer",
      category: "Business & Construction"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Business Entity Comparison Tool",
      description: "Not sure whether to form an LLC, S-Corp, or C-Corp? Get personalized recommendations based on your goals.",
      to: "/resources/tools/entity-comparison",
      category: "Corporate Law"
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      title: "OSHA Incident Rate Calculator",
      description: "Calculate your TRIR, DART, and LTIR rates. Compare your workplace safety metrics against industry benchmarks.",
      to: "/resources/tools/osha-calculator",
      category: "Employment Law"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Know Your Rights Quiz Series",
      description: "Test your legal knowledge with interactive quizzes on employment law, construction law, and insurance defense.",
      to: "/resources/tools/rights-quiz",
      category: "Educational"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Business Succession Readiness Assessment",
      description: "Discover how prepared your business is for leadership transitions with our comprehensive quiz.",
      to: "/resources/tools/succession-quiz",
      category: "Corporate Law"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Indiana Worker's Comp District Locator",
      description: "Find your Board Member, Court Reporter, and contact information by county or district.",
      to: "/resources/tools/district-map",
      category: "Workers' Compensation"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "FLSA Exempt Status Wizard",
      description: "Determine if your employee meets federal overtime exemption requirements and avoid costly misclassification.",
      to: "/resources/tools/flsa-wizard",
      category: "Employment Law"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Litigation Timeline Generator",
      description: "Visualize your case schedule with key Indiana Trial Rule deadlines and download calendar files.",
      to: "/resources/tools/litigation-timeline",
      category: "Litigation"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Legal Glossary",
      description: "Search our comprehensive glossary of 50+ legal terms. Understand complex legal terminology with plain-language definitions.",
      to: "/resources/tools/legal-glossary",
      category: "Educational"
    }
  ]

  return (
    <>
      <SEOMeta
        title="Legal Tools & Resources | Riley Bennett Egloff LLP"
        description="Interactive calculators and assessments designed to help you understand your legal situation."
      />

      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-navy via-primary-slate to-primary-navy text-white py-16 lg:py-20">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Legal Tools & Resources
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Interactive calculators and assessments designed to help you understand your legal situation
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block border border-white/20">
                <p className="text-sm font-medium">
                  <Zap className="inline h-4 w-4 mr-2" />
                  <strong>Free to use.</strong> No signup required. Get instant results.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="section-container py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {tools.map((tool, index) => (
                <ToolCard key={index} {...tool} index={index} />
              ))}
            </div>

            {/* Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              <Card className="border-2 border-primary-navy/10 hover:border-primary-navy/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-navy/10 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-primary-navy" />
                  </div>
                  <CardTitle className="text-lg">Accurate & Up-to-Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Our tools use current Indiana law and official statutory limits, updated regularly to ensure accuracy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary-navy/10 hover:border-primary-navy/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-navy/10 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary-navy" />
                  </div>
                  <CardTitle className="text-lg">Easy to Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Simple, step-by-step interfaces guide you through complex legal calculations with clear explanations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary-navy/10 hover:border-primary-navy/30 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary-navy/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary-navy" />
                  </div>
                  <CardTitle className="text-lg">Expert Support Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    While these tools provide guidance, our attorneys are available for personalized legal advice on your specific situation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 rounded-lg p-6"
            >
              <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Important Disclaimer
              </h3>
              <p className="text-sm text-yellow-900 leading-relaxed">
                These tools are provided for informational purposes only and do not constitute legal advice.
                Results are estimates based on general principles of Indiana law and may not reflect the specifics
                of your situation. For personalized legal guidance, please{' '}
                <Link to="/contact" className="underline font-semibold hover:text-primary-burgundy transition-colors">
                  contact Riley Bennett Egloff LLP
                </Link>
                {' '}to schedule a consultation with one of our attorneys.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
