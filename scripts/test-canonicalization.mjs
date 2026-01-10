/**
 * Test canonicalization of practice areas and industries
 * 
 * Verifies that:
 * 1. Aliases are loaded correctly
 * 2. Name normalization works before slugging
 * 3. Slugs are consistent for semantic duplicates
 */

import { normalizePracticeAreaName, normalizeIndustryName } from './lib/normalize.js'
import { normalizeSlug } from './lib/slug.js'

console.log('╔════════════════════════════════════════════════════════╗')
console.log('║         CANONICALIZATION TEST SUITE                    ║')
console.log('╚════════════════════════════════════════════════════════╝')
console.log('')

// Test Practice Area Canonicalization
console.log('📋 Testing Practice Area Canonicalization...')
console.log('')

const practiceAreaTests = [
  { input: 'Business Law', expected: 'Business & Corporate Law' },
  { input: 'BusinessLaw', expected: 'Business & Corporate Law' },
  { input: 'Corporate Law', expected: 'Business & Corporate Law' },
  { input: 'Healthcare', expected: 'Health Care Law' },
  { input: 'Health Care', expected: 'Health Care Law' },
  { input: 'Employment Law', expected: 'Labor & Employment Law' },
  { input: 'Real Estate', expected: 'Real Estate, Land Use & Zoning' },
  { input: 'Estate Planning', expected: 'Wills, Trusts & Estates' },
  { input: 'Construction', expected: 'Construction Law' },
  { input: 'Some Unknown Area', expected: 'Some Unknown Area' }, // No alias, should return original
]

let practiceAreasPassed = 0
let practiceAreasFailed = 0

for (const test of practiceAreaTests) {
  const result = normalizePracticeAreaName(test.input)
  const resultSlug = normalizeSlug(result)
  const expectedSlug = normalizeSlug(test.expected)
  
  if (result === test.expected && resultSlug === expectedSlug) {
    console.log(`  ✅ "${test.input}" → "${result}" (slug: ${resultSlug})`)
    practiceAreasPassed++
  } else {
    console.log(`  ❌ "${test.input}" → "${result}" (expected: "${test.expected}")`)
    console.log(`     Slug: ${resultSlug} (expected: ${expectedSlug})`)
    practiceAreasFailed++
  }
}

console.log('')
console.log(`Practice Areas: ${practiceAreasPassed} passed, ${practiceAreasFailed} failed`)
console.log('')

// Test Industry Canonicalization
console.log('🏭 Testing Industry Canonicalization...')
console.log('')

const industryTests = [
  { input: 'HealthCare', expected: 'Health Care' },
  { input: 'Healthcare', expected: 'Health Care' },
  { input: 'RealEstate', expected: 'Real Estate' },
  { input: 'Real-Estate', expected: 'Real Estate' },
  { input: 'SportsEntertainment', expected: 'Sports & Entertainment' },
  { input: 'Non-Profit', expected: 'Non-Profit Organizations' },
  { input: 'Nonprofit', expected: 'Non-Profit Organizations' },
  { input: 'Tech', expected: 'Technology' },
  { input: 'Food and Beverage', expected: 'Food, Beverage & Service' },
  { input: 'Manufacturing', expected: 'Manufacturing' }, // No alias, should return original
]

let industriesPassed = 0
let industriesFailed = 0

for (const test of industryTests) {
  const result = normalizeIndustryName(test.input)
  const resultSlug = normalizeSlug(result)
  const expectedSlug = normalizeSlug(test.expected)
  
  if (result === test.expected && resultSlug === expectedSlug) {
    console.log(`  ✅ "${test.input}" → "${result}" (slug: ${resultSlug})`)
    industriesPassed++
  } else {
    console.log(`  ❌ "${test.input}" → "${result}" (expected: "${test.expected}")`)
    console.log(`     Slug: ${resultSlug} (expected: ${expectedSlug})`)
    industriesFailed++
  }
}

console.log('')
console.log(`Industries: ${industriesPassed} passed, ${industriesFailed} failed`)
console.log('')

// Test Slug Stability (semantic duplicates should have same slug)
console.log('🔄 Testing Slug Stability (semantic duplicates)...')
console.log('')

const duplicateTests = [
  {
    group: 'Business Law variants',
    inputs: ['Business Law', 'BusinessLaw', 'Corporate Law', 'Business and Corporate Law'],
    normalize: normalizePracticeAreaName,
  },
  {
    group: 'Healthcare variants',
    inputs: ['HealthCare', 'Healthcare', 'Health Care'],
    normalize: normalizeIndustryName,
  },
  {
    group: 'Real Estate variants',
    inputs: ['RealEstate', 'Real-Estate', 'Real Estate'],
    normalize: normalizeIndustryName,
  },
]

let stabilityPassed = 0
let stabilityFailed = 0

for (const test of duplicateTests) {
  const slugs = test.inputs.map(input => {
    const canonical = test.normalize(input)
    return normalizeSlug(canonical)
  })
  
  const uniqueSlugs = new Set(slugs)
  
  if (uniqueSlugs.size === 1) {
    console.log(`  ✅ ${test.group}: All variants → slug "${[...uniqueSlugs][0]}"`)
    stabilityPassed++
  } else {
    console.log(`  ❌ ${test.group}: Produced ${uniqueSlugs.size} different slugs:`)
    test.inputs.forEach((input, i) => {
      console.log(`     "${input}" → ${slugs[i]}`)
    })
    stabilityFailed++
  }
}

console.log('')
console.log(`Slug Stability: ${stabilityPassed} passed, ${stabilityFailed} failed`)
console.log('')

// Summary
console.log('╔════════════════════════════════════════════════════════╗')
console.log('║                  TEST SUMMARY                          ║')
console.log('╚════════════════════════════════════════════════════════╝')
console.log('')
console.log(`  Practice Areas: ${practiceAreasPassed}/${practiceAreaTests.length} passed`)
console.log(`  Industries: ${industriesPassed}/${industryTests.length} passed`)
console.log(`  Slug Stability: ${stabilityPassed}/${duplicateTests.length} passed`)
console.log('')

const totalPassed = practiceAreasPassed + industriesPassed + stabilityPassed
const totalTests = practiceAreaTests.length + industryTests.length + duplicateTests.length

if (totalPassed === totalTests) {
  console.log('✅ All tests passed!')
  process.exit(0)
} else {
  console.log('❌ Some tests failed')
  process.exit(1)
}
