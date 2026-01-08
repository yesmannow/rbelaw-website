/**
 * Industry Detail Page
 * Displays individual industry with related attorneys and practice areas
 */

import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { iconMap } from '@/lib/data/navigation';

// Import from generated data files
import { industries } from '@/lib/data/industries';
import { attorneys } from '@/lib/data/attorneys';

export function IndustryDetail() {
  const { slug } = useParams();
  const industry = industries.find(ind => ind.slug === slug);

  if (!industry) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Industry Not Found"
          description="The industry you're looking for doesn't exist"
        />
        <div className="section-container py-12 text-center">
          <Link
            to="/industries"
            className="inline-flex items-center gap-2 rounded-lg bg-rbe-burgundy px-6 py-3 text-white hover:bg-rbe-burgundy/90"
          >
            View All Industries
          </Link>
        </div>
      </div>
    );
  }

  const Icon = industry.icon ? iconMap[industry.icon] : Building2;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-rbe-burgundy to-rbe-navy py-20 text-white">
        <div className="section-container">
          <div className="flex items-start gap-6">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
              <Icon className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                {industry.name}
              </h1>
              <p className="text-lg text-white/90">
                {industry.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Industry-Specific Legal Services
              </h2>
              
              <div className="prose prose-lg max-w-none">
                {industry.content && industry.content.length > 0 ? (
                  industry.content.map((block: any, index: number) => {
                    if (block.type === 'text') {
                      return <p key={index}>{block.content}</p>;
                    }
                    return null;
                  })
                ) : (
                  <p className="text-gray-600">
                    We provide comprehensive legal services tailored to the unique needs of the {industry.name.toLowerCase()} industry.
                    Our experienced attorneys understand the regulatory landscape and business challenges you face.
                  </p>
                )}
              </div>

              {/* Key Services */}
              <div className="mt-8 rounded-lg bg-gray-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  How We Can Help
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rbe-burgundy/20">
                      <div className="h-2 w-2 rounded-full bg-rbe-burgundy" />
                    </div>
                    <span className="text-gray-700">Regulatory compliance and guidance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rbe-burgundy/20">
                      <div className="h-2 w-2 rounded-full bg-rbe-burgundy" />
                    </div>
                    <span className="text-gray-700">Contract negotiation and drafting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rbe-burgundy/20">
                      <div className="h-2 w-2 rounded-full bg-rbe-burgundy" />
                    </div>
                    <span className="text-gray-700">Dispute resolution and litigation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rbe-burgundy/20">
                      <div className="h-2 w-2 rounded-full bg-rbe-burgundy" />
                    </div>
                    <span className="text-gray-700">Risk management and mitigation</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-8 rounded-lg border-2 border-rbe-burgundy/20 bg-rbe-burgundy/5 p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Industry Expertise You Can Trust
                </h3>
                <p className="mb-4 text-gray-600">
                  Let our experienced team help you navigate the legal complexities of your industry.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-rbe-burgundy px-6 py-3 text-white hover:bg-rbe-burgundy/90"
                >
                  Schedule a Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="rounded-lg bg-gradient-to-br from-rbe-burgundy to-rbe-navy p-6 text-white">
              <h3 className="mb-2 text-lg font-bold">Get in Touch</h3>
              <p className="mb-4 text-sm text-white/90">
                Speak with an attorney about your {industry.name.toLowerCase()} legal needs.
              </p>
              <a
                href="tel:3176368000"
                className="block rounded-lg bg-white px-4 py-2 text-center font-semibold text-rbe-burgundy hover:bg-white/90"
              >
                (317) 636-8000
              </a>
              <Link
                to="/contact"
                className="mt-3 block rounded-lg border-2 border-white px-4 py-2 text-center font-semibold text-white hover:bg-white/10"
              >
                Contact Form
              </Link>
            </div>

            {/* Related Resources */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Related Resources
              </h3>
              <div className="space-y-3">
                <Link
                  to="/newsroom"
                  className="group flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-all hover:border-rbe-burgundy hover:bg-rbe-burgundy/5"
                >
                  <span className="text-sm font-medium text-gray-900 group-hover:text-rbe-burgundy">
                    Industry News & Insights
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-rbe-burgundy" />
                </Link>
                <Link
                  to="/attorneys"
                  className="group flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-all hover:border-rbe-burgundy hover:bg-rbe-burgundy/5"
                >
                  <span className="text-sm font-medium text-gray-900 group-hover:text-rbe-burgundy">
                    Meet Our Attorneys
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-rbe-burgundy" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
