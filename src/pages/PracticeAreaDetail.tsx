/**
 * Practice Area Detail Page
 * Displays individual practice area with related attorneys
 */

import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Scale } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { iconMap } from '@/lib/data/navigation';

// Import from generated data files
import { practiceAreas } from '@/lib/data/practice-areas';
import { attorneys } from '@/lib/data/attorney-helpers';

export function PracticeAreaDetail() {
  const { slug } = useParams();
  const practiceArea = practiceAreas.find(pa => pa.slug === slug);

  if (!practiceArea) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Practice Area Not Found"
          subtitle="The practice area you're looking for doesn't exist"
        />
        <div className="section-container py-12 text-center">
          <Link
            to="/practice-areas"
            className="inline-flex items-center gap-2 rounded-lg bg-rbe-navy px-6 py-3 text-white hover:bg-rbe-navy/90"
          >
            View All Practice Areas
          </Link>
        </div>
      </div>
    );
  }

  const Icon = practiceArea.icon ? iconMap[practiceArea.icon] : Scale;
  
  // Find related attorneys
  const relatedAttorneys = attorneys.filter(attorney =>
    attorney.practiceAreas.some(pa => 
      pa.toLowerCase().includes(practiceArea.name.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-rbe-navy to-rbe-burgundy py-20 text-white">
        <div className="section-container">
          <div className="flex items-start gap-6">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
              <Icon className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                {practiceArea.name}
              </h1>
              <p className="text-lg text-white/90">
                {practiceArea.description}
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
              <div className="prose prose-lg max-w-none">
                {practiceArea.content && practiceArea.content.length > 0 ? (
                  practiceArea.content.map((block: any, index: number) => {
                    if (block.type === 'text') {
                      return <p key={index}>{block.content}</p>;
                    }
                    return null;
                  })
                ) : (
                  <p className="text-gray-600">
                    Our experienced attorneys provide comprehensive legal services in {practiceArea.name.toLowerCase()}.
                    Contact us to discuss your specific needs.
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="mt-8 rounded-lg bg-gray-50 p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  Need Legal Assistance?
                </h3>
                <p className="mb-4 text-gray-600">
                  Our team is ready to help you navigate your legal challenges.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-rbe-navy px-6 py-3 text-white hover:bg-rbe-navy/90"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Attorneys */}
            {relatedAttorneys.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Our Attorneys
                </h3>
                <div className="space-y-4">
                  {relatedAttorneys.slice(0, 5).map((attorney) => (
                    <Link
                      key={attorney.id}
                      to={`/attorneys/${attorney.id}`}
                      className="group flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition-all hover:border-rbe-navy hover:shadow-md"
                    >
                      {attorney.imageUrl && (
                        <img
                          src={attorney.imageUrl}
                          alt={attorney.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 group-hover:text-rbe-navy">
                          {attorney.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {attorney.title}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:text-rbe-navy group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
                {relatedAttorneys.length > 5 && (
                  <Link
                    to="/attorneys"
                    className="mt-4 block text-center text-sm font-medium text-rbe-navy hover:underline"
                  >
                    View All Attorneys
                  </Link>
                )}
              </div>
            )}

            {/* Contact CTA */}
            <div className="rounded-lg bg-gradient-to-br from-rbe-navy to-rbe-burgundy p-6 text-white">
              <h3 className="mb-2 text-lg font-bold">Schedule a Consultation</h3>
              <p className="mb-4 text-sm text-white/90">
                Discuss your legal needs with our experienced team.
              </p>
              <a
                href="tel:3176368000"
                className="block rounded-lg bg-white px-4 py-2 text-center font-semibold text-rbe-navy hover:bg-white/90"
              >
                (317) 636-8000
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
