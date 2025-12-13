import { Link } from 'react-router-dom'
import { Calculator, Calendar, TrendingUp, MapPin, Shield, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'

interface ToolCardProps {
  icon: React.ReactNode
  title: string
  description: string
  to: string
  category: string
}

function ToolCard({ icon, title, description, to, category }: ToolCardProps) {
  return (
    <Link to={to} className="block group">
      <Card className="h-full transition-all hover:shadow-lg hover:border-blue-300">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              {icon}
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-blue-900 mb-1 uppercase tracking-wide">
                {category}
              </div>
              <CardTitle className="text-xl mb-2 group-hover:text-blue-900 transition-colors">
                {title}
              </CardTitle>
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}

export function ToolsPage() {
  const tools = [
    {
      icon: <Calculator className="w-6 h-6 text-blue-900" />,
      title: "Workers' Comp Benefit Calculator",
      description: "Calculate your potential TTD and PPI benefits under Indiana law with official statutory limits.",
      to: "/resources/tools/comp-calculator",
      category: "Workers' Compensation"
    },
    {
      icon: <Calendar className="w-6 h-6 text-blue-900" />,
      title: "Construction Lien Deadline Calculator",
      description: "Never miss a Notice to Owner or Mechanic's Lien filing deadline with our automated timeline generator.",
      to: "/resources/tools/lien-calculator",
      category: "Construction Law"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-900" />,
      title: "Business Succession Readiness Assessment",
      description: "Discover how prepared your business is for leadership transitions with our comprehensive quiz.",
      to: "/resources/tools/succession-quiz",
      category: "Corporate Law"
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-900" />,
      title: "Indiana Worker's Comp District Locator",
      description: "Find your Board Member, Court Reporter, and contact information by county or district.",
      to: "/resources/tools/district-map",
      category: "Workers' Compensation"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-900" />,
      title: "FLSA Exempt Status Wizard",
      description: "Determine if your employee meets federal overtime exemption requirements and avoid costly misclassification.",
      to: "/resources/tools/flsa-wizard",
      category: "Employment Law"
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-900" />,
      title: "Litigation Timeline Generator",
      description: "Visualize your case schedule with key Indiana Trial Rule deadlines and download calendar files.",
      to: "/resources/tools/litigation-timeline",
      category: "Litigation"
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Legal Tools & Resources
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Interactive calculators and assessments designed to help you understand your legal situation
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-sm">
                <strong>Free to use.</strong> No signup required. Get instant results.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <ToolCard key={index} {...tool} />
            ))}
          </div>

          {/* Information Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accurate & Up-to-Date</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">
                  Our tools use current Indiana law and official statutory limits, updated regularly to ensure accuracy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Easy to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">
                  Simple, step-by-step interfaces guide you through complex legal calculations with clear explanations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Expert Support Available</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-600">
                  While these tools provide guidance, our attorneys are available for personalized legal advice on your specific situation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-900 mb-2">Important Disclaimer</h3>
            <p className="text-sm text-yellow-900">
              These tools are provided for informational purposes only and do not constitute legal advice. 
              Results are estimates based on general principles of Indiana law and may not reflect the specifics 
              of your situation. For personalized legal guidance, please{' '}
              <Link to="/contact" className="underline font-semibold">
                contact Riley Bennett Egloff LLP
              </Link>
              {' '}to schedule a consultation with one of our attorneys.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
