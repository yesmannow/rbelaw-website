#!/usr/bin/env tsx
/**
 * vCard Automator Script
 * Generates .vcf files for all attorneys using the vcf library
 * Files are saved to public/vcards/
 */

import * as fs from 'fs'
import * as path from 'path'
import vCard from 'vcf'
import { attorneys } from '../src/lib/data/attorneys'

// Ensure vcards directory exists
const vcardsDir = path.join(process.cwd(), 'public', 'vcards')
if (!fs.existsSync(vcardsDir)) {
  fs.mkdirSync(vcardsDir, { recursive: true })
  console.log(`✓ Created directory: ${vcardsDir}`)
}

// Firm information
const FIRM_NAME = 'Riley Bennett Egloff LLP'
const FIRM_ADDRESS = {
  street: '30 South Meridian Street',
  suite: 'Suite 400',
  city: 'Indianapolis',
  state: 'IN',
  zip: '46204',
  country: 'USA'
}

/**
 * Generate a vCard for an attorney
 */
function generateAttorneyVCard(attorney: any): vCard {
  const card = new vCard()

  // Name
  const nameParts = attorney.name.split(' ')
  const lastName = nameParts.pop() || ''
  const firstName = nameParts.join(' ')
  
  card.set('fn', attorney.name)
  card.set('n', `${lastName};${firstName};;;`)

  // Title and Organization
  if (attorney.title) {
    card.set('title', attorney.title)
  }
  card.set('org', FIRM_NAME)

  // Contact Information
  if (attorney.phone) {
    card.add('tel', attorney.phone, { type: ['work', 'voice'] })
  }

  if (attorney.email) {
    card.add('email', attorney.email, { type: 'work' })
  }

  // Address
  const adr = `;;${FIRM_ADDRESS.suite};${FIRM_ADDRESS.street};${FIRM_ADDRESS.city};${FIRM_ADDRESS.state};${FIRM_ADDRESS.zip};${FIRM_ADDRESS.country}`
  card.add('adr', adr, { type: 'work' })

  // URL
  if (attorney.slug) {
    card.set('url', `https://rbelaw.com/attorneys/${attorney.slug}`)
  }

  // Photo
  if (attorney.image) {
    const photoUrl = attorney.image.startsWith('http') 
      ? attorney.image 
      : `https://rbelaw.com${attorney.image}`
    card.set('photo', photoUrl, { mediatype: 'image/webp' })
  }

  // LinkedIn
  if (attorney.linkedIn) {
    card.add('x-socialprofile', attorney.linkedIn, { type: 'linkedin' })
  }

  // Assistant
  if (attorney.assistant && attorney.assistantEmail) {
    card.set('x-assistant', attorney.assistant)
    card.set('x-assistant-email', attorney.assistantEmail)
  }

  // Practice Areas as Categories
  if (attorney.practiceAreas && attorney.practiceAreas.length > 0) {
    card.set('categories', attorney.practiceAreas.join(','))
  }

  // Note with bio excerpt
  if (attorney.bio && attorney.bio.length > 0) {
    // Extract first paragraph from bio
    const firstSection = attorney.bio[0]
    if (firstSection && firstSection.content && firstSection.content.length > 0) {
      const bioText = typeof firstSection.content[0] === 'string' 
        ? firstSection.content[0]
        : ''
      if (bioText) {
        // Limit to first 500 characters
        const truncatedBio = bioText.slice(0, 500) + (bioText.length > 500 ? '...' : '')
        card.set('note', truncatedBio)
      }
    }
  }

  return card
}

/**
 * Generate vCards for all attorneys
 */
function generateAllVCards() {
  console.log(`\n🎴 vCard Automator - Generating vCards for ${attorneys.length} attorneys\n`)

  let successCount = 0
  let errorCount = 0

  attorneys.forEach((attorney, index) => {
    try {
      if (!attorney.slug || !attorney.name) {
        console.error(`✗ Skipping attorney ${index + 1}: Missing slug or name`)
        errorCount++
        return
      }

      const card = generateAttorneyVCard(attorney)
      const vcfContent = card.toString()
      
      // Save to file
      const filename = `${attorney.slug}.vcf`
      const filepath = path.join(vcardsDir, filename)
      
      fs.writeFileSync(filepath, vcfContent, 'utf-8')
      
      console.log(`✓ ${attorney.name.padEnd(30)} → ${filename}`)
      successCount++
    } catch (error) {
      console.error(`✗ Error generating vCard for ${attorney.name}:`, error)
      errorCount++
    }
  })

  console.log(`\n${'='.repeat(60)}`)
  console.log(`✓ Successfully generated: ${successCount} vCards`)
  if (errorCount > 0) {
    console.log(`✗ Failed: ${errorCount} vCards`)
  }
  console.log(`📁 Output directory: ${vcardsDir}`)
  console.log(`${'='.repeat(60)}\n`)
}

// Run the script
generateAllVCards()
