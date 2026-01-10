/**
 * Smart Seed Migration Script
 * Migrates static data from src/lib/data into Payload CMS with preserved relationships
 * 
 * Execution Order (Dependency Tree):
 * 1. Taxonomies (Industries, Tags) - No dependencies
 * 2. Media (Headshots) - No dependencies
 * 3. Attorneys - Depends on: Media, Industries, Tags
 * 4. Practice Areas - Depends on: Media, Industries, Tags, Attorneys
 * 5. Blog Posts - Depends on: Media, Attorneys, Practice Areas, Industries, Tags
 */

import { getPayload } from 'payload'
import config from '@payload-config'
import { attorneys } from '../data/attorneys'
import { practiceAreas } from '../data/practiceAreas'
import { industriesManual } from '../data/industries-manual'
import { blogPosts } from '../data/blog-posts'
import type { Attorney } from '../types'

const seed = async () => {
  const payload = await getPayload({ config })
  
  console.log('🌱 Starting Smart Seed Migration...')
  console.log('📊 Data Summary:')
  console.log(`   - ${attorneys.length} Attorneys`)
  console.log(`   - ${practiceAreas.length} Practice Areas`)
  console.log(`   - ${industriesManual.length} Industries`)
  console.log(`   - ${blogPosts.length} Blog Posts`)
  console.log('')

  try {
    // ============================================
    // PHASE 1: Seed Taxonomies (Leaves of the tree)
    // ============================================
    console.log('📂 Phase 1: Seeding Taxonomies...')
    
    // Map to store IDs for relationship linking
    const industryMap = new Map<string, string>()
    const tagMap = new Map<string, string>()
    
    // 1A. Seed Industries
    console.log('   → Creating Industries...')
    for (const industry of industriesManual) {
      try {
        const created = await payload.create({
          collection: 'industries',
          data: {
            title: industry.name,
            slug: industry.slug,
            description: industry.intro,
            icon: 'Building2', // Default icon, can be customized
          },
        })
        industryMap.set(industry.slug, created.id as string)
        console.log(`      ✓ ${industry.name}`)
      } catch (error: any) {
        console.error(`      ✗ Failed to create industry ${industry.name}:`, error.message)
      }
    }
    
    // 1B. Seed Tags (extract from existing data)
    console.log('   → Creating Tags...')
    const uniqueTags = new Set<string>()
    
    // Extract tags from blog posts
    blogPosts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag: string) => uniqueTags.add(tag))
      }
      if (post.categories && Array.isArray(post.categories)) {
        post.categories.forEach((cat: string) => uniqueTags.add(cat))
      }
    })
    
    for (const tagName of uniqueTags) {
      if (!tagName) continue
      try {
        const slug = tagName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        const created = await payload.create({
          collection: 'tags',
          data: {
            name: tagName,
            slug,
          },
        })
        tagMap.set(tagName, created.id as string)
        console.log(`      ✓ ${tagName}`)
      } catch (error: any) {
        console.error(`      ✗ Failed to create tag ${tagName}:`, error.message)
      }
    }
    
    console.log(`   ✅ Created ${industryMap.size} Industries and ${tagMap.size} Tags\n`)

    // ============================================
    // PHASE 2: Seed Attorneys with Relationships
    // ============================================
    console.log('📂 Phase 2: Seeding Attorneys...')
    
    const attorneyMap = new Map<string, string>()
    
    // Parallelize attorney creation for better performance
    const attorneyResults = await Promise.allSettled(
      attorneys.map(async (attorney) => {
        // Map attorney industries to IDs
        const attorneyIndustryIds = attorney.industries
          ?.map((ind: string) => {
            // Try exact match first
            let id = industryMap.get(ind.toLowerCase())
            if (!id) {
              // Try fuzzy match
              for (const [key, value] of industryMap.entries()) {
                if (key.includes(ind.toLowerCase()) || ind.toLowerCase().includes(key)) {
                  id = value
                  break
                }
              }
            }
            return id
          })
          .filter(Boolean) || []

        // Convert bio array to rich text
        const bioText = Array.isArray(attorney.bio) ? attorney.bio.join('\n\n') : attorney.bio || ''
        
        // Map role from title
        let role: 'partner' | 'associate' | 'of-counsel' = 'associate'
        if (attorney.title?.toLowerCase().includes('partner')) {
          role = 'partner'
        } else if (attorney.title?.toLowerCase().includes('counsel')) {
          role = 'of-counsel'
        }

        const created = await payload.create({
          collection: 'attorneys',
          data: {
            name: attorney.name,
            slug: attorney.slug || attorney.id,
            role,
            email: attorney.email,
            phone: attorney.phone,
            bio: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: bioText,
                      },
                    ],
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            education: attorney.education?.map((edu: any) => ({
              institution: edu.institution,
              degree: edu.degree || '',
              year: edu.year || '',
            })) || [],
            quickFacts: {
              barAdmissions: attorney.barAdmissions?.map((admission: string) => ({
                admission,
              })) || [],
              languages: [], // Not in source data
            },
            awards: attorney.awards?.map((award: string) => ({
              award,
            })) || [],
            representativeMatters: attorney.representativeMatters?.map((matter: string) => ({
              matter: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: matter,
                        },
                      ],
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              },
            })) || [],
            publications: attorney.publications?.map((pub: any) => ({
              title: pub.title,
              url: pub.url,
              date: pub.date,
            })) || [],
            videos: attorney.videos?.map((vid: any) => ({
              title: vid.title,
              url: vid.url,
              date: vid.date,
            })) || [],
            linkedIn: attorney.linkedIn,
            vCardUrl: attorney.vCard,
            beyondOffice: attorney.beyondOffice,
            industries: attorneyIndustryIds,
            tags: [], // Can be added later
          },
        })
        
        console.log(`   ✓ ${attorney.name} (${role})`)
        return { attorney, created }
      })
    )
    
    // Populate attorneyMap with successful results
    attorneyResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const { attorney, created } = result.value
        attorneyMap.set(attorney.slug || attorney.id, created.id as string)
      } else {
        const attorney = attorneys[index]
        console.error(`   ✗ Failed to create attorney ${attorney.name}:`, result.reason?.message || result.reason)
      }
    })
    
    console.log(`   ✅ Created ${attorneyMap.size} Attorneys\n`)

    // ============================================
    // PHASE 3: Seed Practice Areas with Relationships
    // ============================================
    console.log('📂 Phase 3: Seeding Practice Areas...')
    
    const practiceAreaMap = new Map<string, string>()
    
    // Parallelize practice area creation for better performance
    const practiceAreaResults = await Promise.allSettled(
      practiceAreas.map(async (pa) => {
        // Find attorneys who practice in this area
        const featuredAttorneyIds: string[] = []
        
        // Match attorneys based on practiceAreas field
        for (const attorney of attorneys) {
          if (attorney.practiceAreas?.some((area: string) => 
            area.toLowerCase().includes(pa.name.toLowerCase()) || 
            pa.name.toLowerCase().includes(area.toLowerCase())
          )) {
            const attorneyId = attorneyMap.get(attorney.slug || attorney.id)
            if (attorneyId) {
              featuredAttorneyIds.push(attorneyId)
            }
          }
        }

        const created = await payload.create({
          collection: 'practice-areas',
          data: {
            title: pa.name,
            slug: pa.slug,
            description: pa.description,
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: pa.detailedDescription || pa.description,
                      },
                    ],
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            icon: pa.icon,
            featuredAttorneys: featuredAttorneyIds.slice(0, 6), // Limit to top 6
            subAreas: pa.subAreas?.map((name: string) => ({ name })) || [],
            caseStudies: pa.caseStudies?.map((cs: any) => ({
              title: cs.title,
              description: cs.description,
              outcome: cs.outcome,
              year: cs.year,
            })) || [],
            industries: [], // Can be linked manually later
            tags: [],
          },
        })
        
        console.log(`   ✓ ${pa.name} (${featuredAttorneyIds.length} attorneys)`)
        return { pa, created }
      })
    )
    
    // Populate practiceAreaMap with successful results
    practiceAreaResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const { pa, created } = result.value
        practiceAreaMap.set(pa.slug, created.id as string)
      } else {
        const pa = practiceAreas[index]
        console.error(`   ✗ Failed to create practice area ${pa.name}:`, result.reason?.message || result.reason)
      }
    })
    
    console.log(`   ✅ Created ${practiceAreaMap.size} Practice Areas\n`)

    // ============================================
    // PHASE 4: Seed Blog Posts with Relationships
    // ============================================
    console.log('📂 Phase 4: Seeding Blog Posts...')
    
    // Parallelize blog post creation for better performance
    const blogResults = await Promise.allSettled(
      blogPosts.slice(0, 20).map(async (post) => { // Limit to first 20 for initial seed
        // Find author by authorSlug
        const authorId = post.authorSlug ? attorneyMap.get(post.authorSlug) : undefined
        
        // Map tags
        const postTagIds = post.tags
          ?.map((tag: string) => tagMap.get(tag))
          .filter(Boolean) || []
        
        // Convert content to rich text
        const contentText = Array.isArray(post.content)
          ? post.content.map((block: any) => block.text || '').join('\n\n')
          : post.excerpt || ''

        const created = await payload.create({
          collection: 'blog',
          data: {
            title: post.title,
            slug: post.slug,
            author: authorId || attorneyMap.values().next().value, // Fallback to first attorney
            excerpt: post.excerpt || '',
            content: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        text: contentText,
                      },
                    ],
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
            publishedDate: new Date(post.date).toISOString(),
            status: 'published',
            categories: post.categories?.map((cat: string) => ({ category: cat })) || [],
            relatedPracticeAreas: [],
            industries: [],
            tags: postTagIds,
          },
        })
        
        console.log(`   ✓ ${post.title}`)
        return created
      })
    )
    
    const blogCount = blogResults.filter(result => result.status === 'fulfilled').length
    blogResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        const post = blogPosts[index]
        console.error(`   ✗ Failed to create blog post ${post.title}:`, result.reason?.message || result.reason)
      }
    })
    
    console.log(`   ✅ Created ${blogCount} Blog Posts\n`)

    // ============================================
    // SUMMARY
    // ============================================
    console.log('✅ Smart Seed Migration Complete!')
    console.log('📊 Final Summary:')
    console.log(`   - Industries: ${industryMap.size}`)
    console.log(`   - Tags: ${tagMap.size}`)
    console.log(`   - Attorneys: ${attorneyMap.size}`)
    console.log(`   - Practice Areas: ${practiceAreaMap.size}`)
    console.log(`   - Blog Posts: ${blogCount}`)
    console.log('')
    console.log('🎯 Next Steps:')
    console.log('   1. Access Admin UI at /admin')
    console.log('   2. Review and refine relationships')
    console.log('   3. Upload attorney headshots to Media collection')
    console.log('   4. Link headshots to attorney profiles')
    console.log('   5. Add featured images to practice areas')

  } catch (error) {
    console.error('❌ Seed migration failed:', error)
    throw error
  }
}

// Run the seed if called directly
if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export default seed
