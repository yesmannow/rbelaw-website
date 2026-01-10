import { normalizeAttorneyExtract, normalizePracticeAreaExtract, normalizeIndustryExtract, normalizeBlogExtract } from './lib/normalize.js'

function log(title, value) {
  console.log(`\n=== ${title} ===`)
  console.dir(value, { depth: null })
}

const sampleAttorney = {
  name: 'Jane Doe',
  practiceAreas: ['BusinessLaw  Construction  Litigation'],
  industries: ['HealthCare•RealEstate•SportsEntertainment'],
}

const samplePracticeArea = {
  name: 'Construction',
  relatedIndustries: ['HealthCare\nRealEstate'],
}

const sampleIndustry = {
  name: 'Health Care',
  relatedPracticeAreas: ['BusinessLawCommercialLitigation'],
}

const sampleBlog = {
  title: 'Test Blog',
  links: [
    { text: 'Safe', url: 'https://example.com' },
    { text: 'Local', url: 'file://tmp/foo' },
  ],
}

log('Attorney', normalizeAttorneyExtract(sampleAttorney))
log('Practice Area', normalizePracticeAreaExtract(samplePracticeArea))
log('Industry', normalizeIndustryExtract(sampleIndustry))
log('Blog', normalizeBlogExtract(sampleBlog))
