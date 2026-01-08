/**
 * vCard generation utility for attorney contact cards
 * Generates .vcf files compatible with most contact management systems
 */

import type { Attorney } from '../types'

export interface VCardOptions {
  version?: '3.0' | '4.0'
  organization?: string
  photo?: string
  url?: string
}

/**
 * Generate a vCard string for an attorney
 */
export function generateVCard(attorney: Attorney, options: VCardOptions = {}): string {
  const {
    version = '3.0',
    organization = 'Riley Bennett Egloff LLP',
    photo = attorney.imageUrl,
    url = `https://rbelaw.com/attorneys/${attorney.id}`,
  } = options

  const lines: string[] = []

  // Header
  lines.push('BEGIN:VCARD')
  lines.push(`VERSION:${version}`)

  // Name
  const nameParts = attorney.name.split(' ')
  const lastName = nameParts.pop() || ''
  const firstName = nameParts.join(' ')
  lines.push(`N:${lastName};${firstName};;;`)
  lines.push(`FN:${attorney.name}`)

  // Title and Organization
  if (attorney.title) {
    lines.push(`TITLE:${attorney.title}`)
  }
  lines.push(`ORG:${organization}`)

  // Contact Information
  if (attorney.phone) {
    const cleanPhone = attorney.phone.replace(/\D/g, '')
    lines.push(`TEL;TYPE=WORK,VOICE:${cleanPhone}`)
  }

  if (attorney.email) {
    lines.push(`EMAIL;TYPE=WORK:${attorney.email}`)
  }

  // Assistant
  if (attorney.assistant && attorney.assistantEmail) {
    lines.push(`X-ASSISTANT:${attorney.assistant}`)
    lines.push(`X-ASSISTANT-EMAIL:${attorney.assistantEmail}`)
  }

  // Address (firm address)
  lines.push('ADR;TYPE=WORK:;;30 South Meridian Street, Suite 400;Indianapolis;IN;46204;USA')
  lines.push('LABEL;TYPE=WORK:30 South Meridian Street\\nSuite 400\\nIndianapolis, IN 46204')

  // URLs
  if (url) {
    lines.push(`URL:${url}`)
  }

  if (attorney.linkedIn) {
    lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${attorney.linkedIn}`)
  }

  // Photo
  if (photo && version === '3.0') {
    lines.push(`PHOTO;VALUE=URI:${photo}`)
  } else if (photo && version === '4.0') {
    lines.push(`PHOTO:${photo}`)
  }

  // Practice Areas as Categories
  if (attorney.practiceAreas && attorney.practiceAreas.length > 0) {
    lines.push(`CATEGORIES:${attorney.practiceAreas.join(',')}`)
  }

  // Note with bio
  if (attorney.bio) {
    const cleanBio = attorney.bio.replace(/\n/g, '\\n')
    lines.push(`NOTE:${cleanBio}`)
  }

  // Footer
  lines.push('END:VCARD')

  return lines.join('\r\n')
}

/**
 * Download a vCard file for an attorney
 */
export function downloadVCard(attorney: Attorney, options?: VCardOptions): void {
  const vcard = generateVCard(attorney, options)
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `${attorney.name.replace(/\s+/g, '_')}.vcf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

/**
 * Generate a data URL for a vCard (for direct linking)
 */
export function getVCardDataUrl(attorney: Attorney, options?: VCardOptions): string {
  const vcard = generateVCard(attorney, options)
  const encoded = encodeURIComponent(vcard)
  return `data:text/vcard;charset=utf-8,${encoded}`
}
