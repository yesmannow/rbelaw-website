#!/usr/bin/env tsx
/**
 * Data Audit Script - Newsroom
 * Verifies that all 218+ articles are correctly mapped to existing attorney IDs
 * Ensures type safety and prevents broken links
 */

import { blogPosts } from '../src/lib/data/blog-posts'
import { attorneys } from '../src/lib/data/attorneys'

// Create a map of valid attorney slugs
const validAttorneySlugs = new Set(attorneys.map(a => a.slug))

// Also add common staff/non-attorney authors
const staffAuthors = new Set([
  'staff-writer',
  'anne-marie-farrow',
  'rbe-communications',
  'communications-team'
])

interface AuditResult {
  total: number
  withAuthorId: number
  withAuthorSlug: number
  withNeither: number
  invalidMappings: Array<{
    id: string
    title: string
    author: string
    authorSlug?: string
    authorId?: string
  }>
  suggestions: Map<string, string>
}

/**
 * Normalize author name to slug format
 */
function normalizeToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
}

/**
 * Find best matching attorney slug for an author name
 */
function findBestMatch(authorName: string): string | null {
  const normalized = normalizeToSlug(authorName)
  
  // Direct match
  if (validAttorneySlugs.has(normalized)) {
    return normalized
  }
  
  // Try partial matches
  for (const slug of validAttorneySlugs) {
    if (slug.includes(normalized) || normalized.includes(slug)) {
      return slug
    }
  }
  
  // Try matching by last name
  const parts = normalized.split('-')
  const lastName = parts[parts.length - 1]
  for (const slug of validAttorneySlugs) {
    if (slug.endsWith(lastName)) {
      return slug
    }
  }
  
  return null
}

/**
 * Audit all blog posts
 */
function auditNewsroom(): AuditResult {
  const result: AuditResult = {
    total: blogPosts.length,
    withAuthorId: 0,
    withAuthorSlug: 0,
    withNeither: 0,
    invalidMappings: [],
    suggestions: new Map()
  }

  blogPosts.forEach(post => {
    // Check for authorId
    if (post.authorId) {
      result.withAuthorId++
      // Verify it's valid
      if (!validAttorneySlugs.has(post.authorId) && !staffAuthors.has(post.authorId)) {
        result.invalidMappings.push({
          id: post.id,
          title: post.title,
          author: post.author,
          authorId: post.authorId
        })
      }
    } else if (post.authorSlug) {
      result.withAuthorSlug++
      // Verify it's valid
      if (!validAttorneySlugs.has(post.authorSlug) && !staffAuthors.has(post.authorSlug)) {
        result.invalidMappings.push({
          id: post.id,
          title: post.title,
          author: post.author,
          authorSlug: post.authorSlug
        })
        
        // Try to find a match
        const suggestion = findBestMatch(post.author)
        if (suggestion) {
          result.suggestions.set(post.authorSlug, suggestion)
        }
      }
    } else {
      result.withNeither++
      result.invalidMappings.push({
        id: post.id,
        title: post.title,
        author: post.author
      })
      
      // Try to find a match
      const suggestion = findBestMatch(post.author)
      if (suggestion) {
        result.suggestions.set(post.author, suggestion)
      }
    }
  })

  return result
}

/**
 * Print audit report
 */
function printAuditReport(result: AuditResult) {
  console.log('\n' + '='.repeat(70))
  console.log('📊 NEWSROOM DATA AUDIT REPORT')
  console.log('='.repeat(70))
  console.log(`\n📰 Total Articles: ${result.total}`)
  console.log(`✓  Articles with authorId: ${result.withAuthorId}`)
  console.log(`⚠️  Articles with authorSlug only: ${result.withAuthorSlug}`)
  console.log(`✗  Articles with no mapping: ${result.withNeither}`)
  
  if (result.invalidMappings.length > 0) {
    console.log(`\n🚨 ${result.invalidMappings.length} articles with invalid or missing mappings:\n`)
    
    result.invalidMappings.forEach((item, index) => {
      console.log(`${index + 1}. "${item.title}"`)
      console.log(`   Author: ${item.author}`)
      if (item.authorId) {
        console.log(`   authorId: ${item.authorId} (INVALID)`)
      }
      if (item.authorSlug) {
        console.log(`   authorSlug: ${item.authorSlug} (INVALID)`)
      }
      if (!item.authorId && !item.authorSlug) {
        console.log(`   ❌ No mapping found`)
      }
      
      // Show suggestion
      const suggestionKey = item.authorSlug || item.author
      if (result.suggestions.has(suggestionKey)) {
        console.log(`   💡 Suggested mapping: ${result.suggestions.get(suggestionKey)}`)
      }
      console.log('')
    })
  }
  
  if (result.suggestions.size > 0 && result.invalidMappings.length > 0) {
    console.log('\n💡 SUGGESTED MAPPINGS:')
    console.log('Add the following mappings to your blog posts:\n')
    
    for (const [author, suggestion] of result.suggestions) {
      console.log(`  "${author}" → authorId: "${suggestion}"`)
    }
  }
  
  console.log('\n' + '='.repeat(70))
  
  // Summary
  const percentage = ((result.withAuthorId / result.total) * 100).toFixed(1)
  console.log(`\n📈 Mapping Status: ${percentage}% of articles have authorId`)
  
  if (result.withAuthorId === result.total) {
    console.log('✅ ALL ARTICLES ARE PROPERLY MAPPED!')
  } else if (result.invalidMappings.length === 0) {
    console.log('✅ All mappings are valid (some use authorSlug instead of authorId)')
  } else {
    console.log('⚠️  Some articles need attention')
  }
  
  console.log('\n' + '='.repeat(70))
  
  // List valid attorney slugs
  console.log('\n📋 VALID ATTORNEY SLUGS:')
  console.log(Array.from(validAttorneySlugs).sort().join(', '))
  
  console.log('\n' + '='.repeat(70) + '\n')
}

// Run the audit
const auditResult = auditNewsroom()
printAuditReport(auditResult)

// Exit with error code if there are issues
if (auditResult.invalidMappings.length > 0) {
  process.exit(1)
}
