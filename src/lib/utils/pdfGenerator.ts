/**
 * PDF Generation Utilities
 * 
 * Note: For production, you would use a library like jsPDF or pdfmake
 * This is a simplified implementation that generates HTML-based PDFs
 */

interface PDFOptions {
  title: string
  content: string
  footer?: string
  logo?: string
}

/**
 * Generate a PDF from HTML content
 * In production, integrate with jsPDF or similar library
 */
export function generatePDF(options: PDFOptions): void {
  const { title, content, footer, logo } = options

  // Create a new window for printing
  const printWindow = window.open('', '_blank')
  
  if (!printWindow) {
    alert('Please allow popups to download PDF')
    return
  }

  // Generate HTML for PDF
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        @page {
          margin: 1in;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 8.5in;
          margin: 0 auto;
        }
        .header {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 3px solid #B8860B;
        }
        .logo {
          max-width: 200px;
          margin-bottom: 1rem;
        }
        h1 {
          color: #0A2540;
          font-size: 28px;
          margin: 0;
        }
        .content {
          margin: 2rem 0;
        }
        .footer {
          margin-top: 3rem;
          padding-top: 1rem;
          border-top: 1px solid #ddd;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        th, td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f8f9fa;
          font-weight: 600;
        }
        .highlight {
          background-color: #fff3cd;
          padding: 1rem;
          border-left: 4px solid #B8860B;
          margin: 1rem 0;
        }
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        ${logo ? `<img src="${logo}" alt="RBE Law" class="logo" />` : ''}
        <h1>${title}</h1>
      </div>
      <div class="content">
        ${content}
      </div>
      <div class="footer">
        ${footer || `
          <p><strong>Riley Bennett Egloff LLP</strong></p>
          <p>255 E. Carmel Drive, Suite 200 | Carmel, IN 46032</p>
          <p>Phone: (317) 636-8000 | www.rbelaw.com</p>
          <p style="margin-top: 1rem; font-size: 10px;">
            This document is provided for informational purposes only and does not constitute legal advice.
            For personalized legal guidance, please contact Riley Bennett Egloff LLP.
          </p>
        `}
      </div>
      <script>
        window.onload = function() {
          window.print();
          // Close window after printing (optional)
          // setTimeout(function() { window.close(); }, 100);
        }
      </script>
    </body>
    </html>
  `

  printWindow.document.write(html)
  printWindow.document.close()
}

/**
 * Generate PDF for tool results
 */
export function generateToolResultsPDF(toolName: string, results: Record<string, any>): void {
  let content = '<h2>Your Results</h2>'

  // Format results based on tool type
  if (toolName === 'OSHA Calculator') {
    content += `
      <table>
        <tr>
          <th>Metric</th>
          <th>Your Rate</th>
          <th>Industry Average</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>TRIR</td>
          <td>${results.trir}</td>
          <td>${results.industryAvgTRIR}</td>
          <td>${results.trir < results.industryAvgTRIR ? '✓ Below Average' : '⚠ Above Average'}</td>
        </tr>
        <tr>
          <td>DART</td>
          <td>${results.dart}</td>
          <td>${results.industryAvgDART}</td>
          <td>${results.dart < results.industryAvgDART ? '✓ Below Average' : '⚠ Above Average'}</td>
        </tr>
        <tr>
          <td>LTIR</td>
          <td>${results.ltir}</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </table>
      <div class="highlight">
        <strong>Overall Status:</strong> ${results.status.toUpperCase()}
      </div>
    `
  } else if (toolName === 'Contract Risk Analyzer') {
    content += `
      <div class="highlight">
        <strong>Overall Risk Score:</strong> ${results.riskScore}/100
      </div>
      <h3>Identified Risks</h3>
      <table>
        <tr>
          <th>Risk Type</th>
          <th>Severity</th>
          <th>Recommendation</th>
        </tr>
        ${results.clauses.map((clause: any) => `
          <tr>
            <td>${clause.type}</td>
            <td>${clause.severity.toUpperCase()}</td>
            <td>${clause.recommendation}</td>
          </tr>
        `).join('')}
      </table>
    `
  } else {
    // Generic results formatting
    content += '<table>'
    Object.entries(results).forEach(([key, value]) => {
      content += `
        <tr>
          <th>${key.replace(/([A-Z])/g, ' $1').trim()}</th>
          <td>${value}</td>
        </tr>
      `
    })
    content += '</table>'
  }

  generatePDF({
    title: `${toolName} Results`,
    content,
    logo: '/RBE-Logo-with-®-RGB-jpg.jpg'
  })
}

/**
 * Generate attorney bio PDF
 */
export function generateAttorneyBioPDF(attorney: any): void {
  const content = `
    <h2>${attorney.name}</h2>
    <p><strong>${attorney.title}</strong></p>
    
    <h3>Biography</h3>
    <p>${attorney.bio}</p>
    
    ${attorney.education && attorney.education.length > 0 ? `
      <h3>Education</h3>
      <ul>
        ${attorney.education.map((edu: any) => `
          <li><strong>${edu.degree}</strong> - ${edu.institution} (${edu.year})</li>
        `).join('')}
      </ul>
    ` : ''}
    
    ${attorney.barAdmissions && attorney.barAdmissions.length > 0 ? `
      <h3>Bar Admissions</h3>
      <ul>
        ${attorney.barAdmissions.map((bar: string) => `<li>${bar}</li>`).join('')}
      </ul>
    ` : ''}
    
    ${attorney.awards && attorney.awards.length > 0 ? `
      <h3>Awards & Recognition</h3>
      <ul>
        ${attorney.awards.map((award: string) => `<li>${award}</li>`).join('')}
      </ul>
    ` : ''}
    
    <div class="highlight">
      <p><strong>Contact Information</strong></p>
      <p>Phone: ${attorney.phone}</p>
      <p>Email: ${attorney.email}</p>
    </div>
  `

  generatePDF({
    title: `${attorney.name} - Attorney Profile`,
    content,
    logo: '/RBE-Logo-with-®-RGB-jpg.jpg'
  })
}
