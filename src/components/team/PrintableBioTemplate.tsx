import { forwardRef } from 'react'
import type { Attorney } from '@/lib/types'

interface PrintableBioTemplateProps {
  attorney: Attorney
}

export const PrintableBioTemplate = forwardRef<HTMLDivElement, PrintableBioTemplateProps>(
  ({ attorney }, ref) => {
    return (
      <div ref={ref} className="print-bio-template">
        {/* Header with Logo */}
        <div className="print-header">
          <div className="print-logo">
            <h2>Riley Bennett Egloff LLP</h2>
          </div>
          <div className="print-contact">
            <p>225 South East Street, Suite 200</p>
            <p>Indianapolis, IN 46202</p>
            <p>Tel: 317.636.8000 | Fax: 317.636.8027</p>
            <p>www.rbelaw.com</p>
          </div>
        </div>

        {/* Attorney Name and Title */}
        <div className="print-name">
          <h1>{attorney.name}</h1>
          <p className="print-title">{attorney.title}</p>
        </div>

        {/* Two-column layout */}
        <div className="print-two-column">
          {/* Left Column */}
          <div className="print-left-column">
            <div className="print-section">
              <h3>Contact</h3>
              <p><strong>Email:</strong> {attorney.email}</p>
              <p><strong>Phone:</strong> {attorney.phone}</p>
            </div>

            {attorney.education && attorney.education.length > 0 && (
              <div className="print-section">
                <h3>Education</h3>
                {attorney.education.map((edu, index) => (
                  <div key={index} className="print-education-item">
                    <p><strong>{edu.degree}</strong></p>
                    <p>{edu.institution}</p>
                    <p>{edu.year}</p>
                  </div>
                ))}
              </div>
            )}

            {attorney.barAdmissions && attorney.barAdmissions.length > 0 && (
              <div className="print-section">
                <h3>Bar Admissions</h3>
                <ul>
                  {attorney.barAdmissions.map((bar, index) => (
                    <li key={index}>{bar}</li>
                  ))}
                </ul>
              </div>
            )}

            {attorney.awards && attorney.awards.length > 0 && (
              <div className="print-section">
                <h3>Awards & Recognition</h3>
                <ul>
                  {attorney.awards.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="print-right-column">
            <div className="print-section">
              <h3>Biography</h3>
              <p>{attorney.bio}</p>
            </div>

            {attorney.representativeMatters && attorney.representativeMatters.length > 0 && (
              <div className="print-section">
                <h3>Representative Matters</h3>
                {attorney.representativeMatters.map((matter, index) => (
                  <div key={index} className="print-matter-item">
                    <p>{matter}</p>
                  </div>
                ))}
              </div>
            )}

            {attorney.publications && attorney.publications.length > 0 && (
              <div className="print-section">
                <h3>Publications</h3>
                {attorney.publications.map((pub, index) => (
                  <div key={index} className="print-publication-item">
                    <p><strong>{pub.title}</strong></p>
                    {pub.date && <p><em>{pub.date}</em></p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Print Styles */}
        <style>{`
          @media print {
            .print-bio-template {
              padding: 0.5in;
              font-family: 'Georgia', serif;
              font-size: 11pt;
              line-height: 1.4;
              color: #000;
              background: #fff;
            }

            .print-header {
              border-bottom: 3px solid #1e3a5f;
              padding-bottom: 0.25in;
              margin-bottom: 0.25in;
            }

            .print-logo h2 {
              font-size: 18pt;
              font-weight: bold;
              color: #1e3a5f;
              margin: 0;
            }

            .print-contact {
              margin-top: 0.1in;
              font-size: 9pt;
              color: #333;
            }

            .print-contact p {
              margin: 0.02in 0;
            }

            .print-name {
              margin-bottom: 0.3in;
            }

            .print-name h1 {
              font-size: 22pt;
              font-weight: bold;
              color: #1e3a5f;
              margin: 0 0 0.05in 0;
            }

            .print-title {
              font-size: 12pt;
              color: #666;
              margin: 0;
            }

            .print-two-column {
              display: grid;
              grid-template-columns: 2.5in 1fr;
              gap: 0.3in;
            }

            .print-section {
              margin-bottom: 0.25in;
              break-inside: avoid;
            }

            .print-section h3 {
              font-size: 12pt;
              font-weight: bold;
              color: #1e3a5f;
              margin: 0 0 0.1in 0;
              border-bottom: 1px solid #ccc;
              padding-bottom: 0.05in;
            }

            .print-section p {
              margin: 0.05in 0;
            }

            .print-section ul {
              margin: 0;
              padding-left: 0.2in;
              list-style-type: disc;
            }

            .print-section li {
              margin: 0.05in 0;
            }

            .print-education-item,
            .print-matter-item,
            .print-publication-item {
              margin-bottom: 0.15in;
            }

            .print-matter-year {
              font-size: 9pt;
              color: #666;
              font-style: italic;
            }

            /* Hide web elements when printing */
            nav,
            footer,
            .no-print,
            button {
              display: none !important;
            }
          }

          /* Screen view styles (hidden by default) */
          @media screen {
            .print-bio-template {
              display: none;
            }
          }
        `}</style>
      </div>
    )
  }
)

PrintableBioTemplate.displayName = 'PrintableBioTemplate'
