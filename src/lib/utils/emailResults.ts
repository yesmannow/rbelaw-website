/**
 * Email Results Utilities
 * 
 * In production, this would integrate with your backend API
 * to send emails via SendGrid, AWS SES, or similar service
 */

interface EmailResultsOptions {
  to: string
  toolName: string
  results: Record<string, unknown>
  userName?: string
}

/**
 * Send tool results via email
 * This is a mock implementation - replace with actual API call
 */
export async function emailToolResults(options: EmailResultsOptions): Promise<boolean> {
  const { to, toolName, results, userName } = options

  // In production, this would call your backend API
  // Example: await fetch('/api/email/send-results', { method: 'POST', body: JSON.stringify(options) })

  console.log('Sending email results:', {
    to,
    toolName,
    results,
    userName
  })

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock success
      resolve(true)
    }, 1000)
  })
}

/**
 * Format email content based on tool type
 */
export function formatEmailContent(toolName: string, results: Record<string, unknown>): string {
  let content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0A2540 0%, #1E3A5F 100%); padding: 30px; text-align: center;">
        <h1 style="color: #B8860B; margin: 0;">Riley Bennett Egloff LLP</h1>
        <p style="color: white; margin: 10px 0 0 0;">Your ${toolName} Results</p>
      </div>
      
      <div style="padding: 30px; background: #f8f9fa;">
  `

  if (toolName === 'OSHA Calculator') {
    content += `
      <h2 style="color: #0A2540;">Your Workplace Safety Metrics</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background: #0A2540; color: white;">
          <th style="padding: 12px; text-align: left;">Metric</th>
          <th style="padding: 12px; text-align: left;">Your Rate</th>
          <th style="padding: 12px; text-align: left;">Industry Avg</th>
        </tr>
        <tr style="background: white;">
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">TRIR</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${results.trir}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${results.industryAvgTRIR}</td>
        </tr>
        <tr style="background: #f8f9fa;">
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">DART</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${results.dart}</td>
          <td style="padding: 12px; border-bottom: 1px solid #ddd;">${results.industryAvgDART}</td>
        </tr>
        <tr style="background: white;">
          <td style="padding: 12px;">LTIR</td>
          <td style="padding: 12px;">${results.ltir}</td>
          <td style="padding: 12px;">-</td>
        </tr>
      </table>
      <div style="background: ${String(results.status) === 'excellent' ? '#d4edda' : String(results.status) === 'good' ? '#d1ecf1' : '#fff3cd'}; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <strong>Overall Status:</strong> ${String(results.status || '').toUpperCase()}
      </div>
    `
  } else if (toolName === 'Contract Risk Analyzer' && results.clauses && Array.isArray(results.clauses)) {
    const clauses = results.clauses as Array<{ type: string; severity: string; recommendation: string }>
    content += `
      <h2 style="color: #0A2540;">Contract Risk Analysis</h2>
      <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <strong>Overall Risk Score:</strong> ${results.riskScore}/100
      </div>
      <h3 style="color: #0A2540;">Identified Risks:</h3>
      ${clauses.slice(0, 3).map((clause) => `
        <div style="background: white; padding: 15px; margin: 10px 0; border-left: 4px solid ${
          clause.severity === 'high' ? '#dc3545' : clause.severity === 'medium' ? '#ffc107' : '#28a745'
        };">
          <strong>${clause.type}</strong> (${clause.severity.toUpperCase()} Risk)<br/>
          <small style="color: #666;">${clause.recommendation}</small>
        </div>
      `).join('')}
    `
  } else if (toolName === 'Business Entity Comparison') {
    content += `
      <h2 style="color: #0A2540;">Your Business Entity Recommendation</h2>
      <div style="background: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
        <h3 style="color: #155724; margin: 0 0 10px 0;">Recommended Entity: ${results.recommendedEntity}</h3>
        <p style="margin: 0; color: #155724;">Match Score: ${results.score}%</p>
      </div>
    `
  }

  content += `
      </div>
      
      <div style="background: #0A2540; padding: 20px; text-align: center; color: white;">
        <p style="margin: 0 0 10px 0;">Need expert legal guidance?</p>
        <a href="https://rbelaw.com/contact" style="display: inline-block; background: #B8860B; color: #0A2540; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Schedule a Consultation
        </a>
      </div>
      
      <div style="padding: 20px; text-align: center; font-size: 12px; color: #666;">
        <p>Riley Bennett Egloff LLP</p>
        <p>255 E. Carmel Drive, Suite 200 | Carmel, IN 46032</p>
        <p>Phone: (317) 636-8000 | www.rbelaw.com</p>
        <p style="margin-top: 15px; font-size: 10px;">
          This email contains information for informational purposes only and does not constitute legal advice.
        </p>
      </div>
    </div>
  `

  return content
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
