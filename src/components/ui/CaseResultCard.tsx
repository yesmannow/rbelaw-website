/**
 * Case Result Card Component
 * Displays individual case results in a professional card format
 */

import { Link } from 'react-router-dom';
import { Calendar, Scale, TrendingUp, Users } from 'lucide-react';
import type { CaseResult } from '@/lib/types';
import { attorneys } from '@/lib/utils/attorney-logic';

interface CaseResultCardProps {
  caseResult: CaseResult;
  showAttorneys?: boolean;
}

export const CaseResultCard = ({ caseResult, showAttorneys = true }: CaseResultCardProps) => {
  // Get attorney names
  const caseAttorneys = caseResult.attorneys
    .map(id => attorneys.find(att => att.id === id))
    .filter(Boolean);

  // Complexity color mapping
  const complexityColors = {
    'Standard': 'bg-blue-100 text-blue-800',
    'Complex': 'bg-purple-100 text-purple-800',
    'Highly Complex': 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {caseResult.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {caseResult.practiceArea.map(area => (
              <span
                key={area}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-navy/10 text-primary-navy"
              >
                {area.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            ))}
          </div>
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${complexityColors[caseResult.complexity]}`}
        >
          {caseResult.complexity}
        </span>
      </div>

      {/* Summary */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {caseResult.summary}
      </p>

      {/* Outcome */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
        <div className="flex items-start">
          <TrendingUp className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-green-900 mb-1">Outcome</p>
            <p className="text-sm text-green-800">{caseResult.outcome}</p>
            {caseResult.amount && (
              <p className="text-lg font-bold text-green-900 mt-2">
                {caseResult.amount}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1.5" />
          {new Date(caseResult.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          })}
        </div>
        <div className="flex items-center">
          <Scale className="h-4 w-4 mr-1.5" />
          {caseResult.industry.join(', ')}
        </div>
      </div>

      {/* Tags */}
      {caseResult.tags && caseResult.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {caseResult.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Attorneys */}
      {showAttorneys && caseAttorneys.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-gray-500 mr-2">Attorneys:</span>
            <div className="flex flex-wrap gap-2">
              {caseAttorneys.map((attorney, index) => (
                <span key={attorney!.id}>
                  <Link
                    to={`/attorneys/${attorney!.id}`}
                    className="text-primary-navy hover:underline font-medium"
                  >
                    {attorney!.name}
                  </Link>
                  {index < caseAttorneys.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Case Results Grid Component
 */
interface CaseResultsGridProps {
  caseResults: CaseResult[];
  showAttorneys?: boolean;
}

export const CaseResultsGrid = ({ caseResults, showAttorneys = true }: CaseResultsGridProps) => {
  if (caseResults.length === 0) {
    return (
      <div className="text-center py-12">
        <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No case results found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {caseResults.map(caseResult => (
        <CaseResultCard
          key={caseResult.id}
          caseResult={caseResult}
          showAttorneys={showAttorneys}
        />
      ))}
    </div>
  );
};

/**
 * Featured Case Results Section
 */
interface FeaturedCaseResultsProps {
  title?: string;
  subtitle?: string;
  caseResults: CaseResult[];
  limit?: number;
}

export const FeaturedCaseResults = ({
  title = 'Recent Success Stories',
  subtitle = 'Proven results for our clients',
  caseResults,
  limit = 6
}: FeaturedCaseResultsProps) => {
  const displayResults = caseResults.slice(0, limit);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <CaseResultsGrid caseResults={displayResults} />

        {caseResults.length > limit && (
          <div className="text-center mt-12">
            <Link
              to="/case-results"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-navy hover:bg-primary-navy/90 transition-colors"
            >
              View All Case Results
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
