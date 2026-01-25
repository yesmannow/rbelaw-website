/**
 * Convert Scraped Content to TypeScript Data Files
 * 
 * Reads scraped-content.json and converts to TypeScript data structures
 * 
 * Usage: node scripts/convert-scraped-data.js
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../scraped-content/scraped-content.json');
const OUTPUT_DIR = path.join(__dirname, '../src/lib/data');

/**
 * Convert practice area data to TypeScript format
 */
function convertPracticeAreas(practiceAreas) {
  const areas = Object.entries(practiceAreas).map(([slug, data]) => {
    // Extract key services from sections
    const keyServices = [];
    data.sections.forEach(section => {
      if (section.content.some(c => c.type === 'list')) {
        const listContent = section.content.find(c => c.type === 'list');
        if (listContent) {
          keyServices.push(...listContent.items.slice(0, 5));
        }
      }
    });

    // Build description from introduction
    const description = data.introduction.join(' ').slice(0, 300) + '...';

    return {
      id: slug,
      name: data.title,
      slug: slug,
      description: description,
      icon: 'Scale', // Default icon, update manually
      image: data.images[0]?.src || '/placeholder.jpg',
      keyServices: keyServices.slice(0, 6),
      overview: data.introduction.join('\n\n'),
      sections: data.sections.map(section => ({
        title: section.heading,
        content: Array.isArray(section.content) 
          ? section.content.filter(c => typeof c === 'string').join('\n\n')
          : section.content
      }))
    };
  });

  return `// Auto-generated from scraped content
// Last updated: ${new Date().toISOString()}

import { PracticeArea } from '../types'

export const practiceAreas: PracticeArea[] = ${JSON.stringify(areas, null, 2)}
`;
}

/**
 * Convert attorney data to TypeScript format
 */
function convertAttorneys(attorneys) {
  const attorneyData = attorneys.map(attorney => {
    // Extract bio overview (first section)
    const overview = attorney.bio[0]?.content.join('\n\n') || '';
    
    // Extract education (look for "Education" section)
    const educationSection = attorney.bio.find(s => 
      s.heading.toLowerCase().includes('education')
    );
    const education = educationSection?.content || [];

    // Extract bar admissions
    const barSection = attorney.bio.find(s => 
      s.heading.toLowerCase().includes('admission') || 
      s.heading.toLowerCase().includes('bar')
    );
    const barAdmissions = barSection?.content || [];

    // Generate slug from name
    const slug = attorney.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return {
      id: slug,
      name: attorney.name,
      title: attorney.title || 'Attorney',
      slug: slug,
      email: attorney.email,
      phone: attorney.phone,
      image: `/images/team/optimized/${slug}.webp`, // Update with actual mapping
      practiceAreas: attorney.practiceAreas,
      bio: {
        overview: overview,
        education: education,
        barAdmissions: barAdmissions,
        professionalAssociations: [],
        publications: [],
        awards: []
      }
    };
  });

  return `// Auto-generated from scraped content
// Last updated: ${new Date().toISOString()}

import { Attorney } from '../types'

export const attorneys: Attorney[] = ${JSON.stringify(attorneyData, null, 2)}
`;
}

/**
 * Convert industry data to TypeScript format
 */
function convertIndustries(industries) {
  const industryData = Object.entries(industries).map(([slug, data]) => {
    const description = data.introduction.join(' ').slice(0, 300) + '...';

    // Extract key challenges from sections
    const challenges = [];
    data.sections.forEach(section => {
      if (section.heading.toLowerCase().includes('challenge')) {
        const listContent = section.content.find(c => c.type === 'list');
        if (listContent) {
          challenges.push(...listContent.items);
        }
      }
    });

    return {
      id: slug,
      name: data.title,
      slug: slug,
      description: description,
      icon: 'Building2', // Default icon
      image: data.images[0]?.src || '/placeholder.jpg',
      overview: data.introduction.join('\n\n'),
      keyChallenges: challenges.slice(0, 5),
      relatedPracticeAreas: [],
      sections: data.sections.map(section => ({
        title: section.heading,
        content: Array.isArray(section.content)
          ? section.content.filter(c => typeof c === 'string').join('\n\n')
          : section.content
      }))
    };
  });

  return `// Auto-generated from scraped content
// Last updated: ${new Date().toISOString()}

export const industries = ${JSON.stringify(industryData, null, 2)}
`;
}

/**
 * Convert about pages to TypeScript format
 */
function convertAboutPages(aboutPages) {
  const pages = Object.entries(aboutPages).map(([slug, data]) => ({
    slug: slug,
    title: data.title,
    metaDescription: data.metaDescription,
    content: {
      introduction: data.introduction,
      sections: data.sections
    }
  }));

  return `// Auto-generated from scraped content
// Last updated: ${new Date().toISOString()}

export const aboutPages = ${JSON.stringify(pages, null, 2)}
`;
}

/**
 * Generate a summary report
 */
function generateReport(data) {
  return `
# Content Migration Report
Generated: ${new Date().toISOString()}

## Summary

### Practice Areas
- Total: ${Object.keys(data.practiceAreas).length}
- Pages: ${Object.keys(data.practiceAreas).join(', ')}

### Attorneys
- Total: ${data.attorneys.length}
- Profiles: ${data.attorneys.map(a => a.name).join(', ')}

### Industries
- Total: ${Object.keys(data.industries).length}
- Pages: ${Object.keys(data.industries).join(', ')}

### About Pages
- Total: ${Object.keys(data.about).length}
- Pages: ${Object.keys(data.about).join(', ')}

## Next Steps

1. Review generated TypeScript files in \`src/lib/data/\`
2. Update attorney photo mappings
3. Add practice area icons
4. Add industry icons
5. Enhance with additional data:
   - Representative matters
   - Awards and recognition
   - Publications
   - Case results
6. Test all pages
7. Deploy

## Manual Updates Needed

### Practice Areas
- [ ] Update icons (currently set to 'Scale')
- [ ] Add related tools
- [ ] Add FAQ sections
- [ ] Verify key services

### Attorneys
- [ ] Verify photo paths
- [ ] Add representative matters
- [ ] Add awards and recognition
- [ ] Add publications
- [ ] Add professional associations

### Industries
- [ ] Update icons (currently set to 'Building2')
- [ ] Add related practice areas
- [ ] Add case studies
- [ ] Verify key challenges

### About Pages
- [ ] Review content formatting
- [ ] Add images
- [ ] Add CTAs
- [ ] Verify links
`;
}

/**
 * Main conversion function
 */
async function convertScrapedData() {
  console.log('🔄 Converting scraped content to TypeScript...\n');

  try {
    // Read scraped data
    console.log('📖 Reading scraped content...');
    const rawData = await fs.readFile(INPUT_FILE, 'utf-8');
    const data = JSON.parse(rawData);

    // Create output directory
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Convert practice areas
    console.log('⚖️  Converting practice areas...');
    const practiceAreasTS = convertPracticeAreas(data.practiceAreas);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'practiceAreas-scraped.ts'),
      practiceAreasTS
    );
    console.log(`  ✓ Created practiceAreas-scraped.ts (${Object.keys(data.practiceAreas).length} areas)`);

    // Convert attorneys
    console.log('👥 Converting attorneys...');
    const attorneysTS = convertAttorneys(data.attorneys);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'attorneys-scraped.ts'),
      attorneysTS
    );
    console.log(`  ✓ Created attorneys-scraped.ts (${data.attorneys.length} attorneys)`);

    // Convert industries
    console.log('🏭 Converting industries...');
    const industriesTS = convertIndustries(data.industries);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'industries-scraped.ts'),
      industriesTS
    );
    console.log(`  ✓ Created industries-scraped.ts (${Object.keys(data.industries).length} industries)`);

    // Convert about pages
    console.log('📄 Converting about pages...');
    const aboutTS = convertAboutPages(data.about);
    await fs.writeFile(
      path.join(OUTPUT_DIR, 'about-scraped.ts'),
      aboutTS
    );
    console.log(`  ✓ Created about-scraped.ts (${Object.keys(data.about).length} pages)`);

    // Generate report
    console.log('\n📊 Generating migration report...');
    const report = generateReport(data);
    await fs.writeFile(
      path.join(__dirname, '../MIGRATION_REPORT.md'),
      report
    );
    console.log('  ✓ Created MIGRATION_REPORT.md');

    console.log('\n✅ Conversion complete!\n');
    console.log('📁 Generated files:');
    console.log('  - src/lib/data/practiceAreas-scraped.ts');
    console.log('  - src/lib/data/attorneys-scraped.ts');
    console.log('  - src/lib/data/industries-scraped.ts');
    console.log('  - src/lib/data/about-scraped.ts');
    console.log('  - MIGRATION_REPORT.md');
    console.log('\n📝 Next steps:');
    console.log('  1. Review generated files');
    console.log('  2. Merge with existing data files');
    console.log('  3. Update photo paths and icons');
    console.log('  4. Test pages');
    console.log('  5. Deploy\n');

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('❌ Error: scraped-content.json not found!');
      console.error('   Run "node scripts/scrape-old-site.js" first.\n');
    } else {
      console.error('❌ Conversion failed:', error.message);
    }
    process.exit(1);
  }
}

// Run converter
convertScrapedData().catch(console.error);
