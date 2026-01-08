/**
 * Icon Suggestion Generator
 * Suggests appropriate Lucide icons for practice areas and industries
 * 
 * Usage: node scripts/generate-icon-suggestions.js
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRAPED_CONTENT = path.join(__dirname, '../scraped-content/scraped-content.json');
const OUTPUT_FILE = path.join(__dirname, '../ICON_SUGGESTIONS.md');

/**
 * Icon mapping based on keywords
 */
const ICON_MAPPINGS = {
  // Practice Area Keywords
  'bankruptcy': ['TrendingDown', 'DollarSign', 'AlertCircle'],
  'business': ['Briefcase', 'Building2', 'TrendingUp'],
  'corporate': ['Building2', 'Briefcase', 'Users'],
  'litigation': ['Scale', 'Gavel', 'FileText'],
  'commercial': ['ShoppingBag', 'Store', 'Building'],
  'construction': ['HardHat', 'Building', 'Hammer'],
  'family': ['Users', 'Heart', 'Home'],
  'government': ['Landmark', 'Building', 'Shield'],
  'health': ['Heart', 'Stethoscope', 'Hospital'],
  'healthcare': ['Heart', 'Stethoscope', 'Hospital'],
  'insurance': ['Shield', 'Umbrella', 'FileText'],
  'intellectual property': ['Lightbulb', 'Copyright', 'Brain'],
  'ip': ['Lightbulb', 'Copyright', 'Brain'],
  'labor': ['Users', 'Briefcase', 'UserCheck'],
  'employment': ['Users', 'Briefcase', 'UserCheck'],
  'real estate': ['Home', 'Building', 'MapPin'],
  'wills': ['FileText', 'ScrollText', 'Pen'],
  'trusts': ['FileText', 'Lock', 'Shield'],
  'estates': ['Home', 'FileText', 'Key'],
  
  // Industry Keywords
  'finance': ['DollarSign', 'TrendingUp', 'PiggyBank'],
  'food': ['Utensils', 'Coffee', 'UtensilsCrossed'],
  'beverage': ['Coffee', 'Wine', 'Droplet'],
  'manufacturing': ['Factory', 'Cog', 'Package'],
  'media': ['Radio', 'Tv', 'Newspaper'],
  'non-profit': ['Heart', 'Users', 'HandHeart'],
  'nonprofit': ['Heart', 'Users', 'HandHeart'],
  'sports': ['Trophy', 'Target', 'Medal'],
  'entertainment': ['Film', 'Music', 'Tv'],
  'technology': ['Cpu', 'Smartphone', 'Monitor'],
  'tech': ['Cpu', 'Smartphone', 'Monitor'],
  'telecommunications': ['Phone', 'Wifi', 'Radio'],
  'telecom': ['Phone', 'Wifi', 'Radio'],
  'transportation': ['Truck', 'Plane', 'Ship'],
  'retail': ['ShoppingCart', 'Store', 'ShoppingBag'],
  'wholesale': ['Package', 'Boxes', 'Warehouse']
};

/**
 * Suggest icons based on name and keywords
 */
function suggestIcons(name, description = '') {
  const text = (name + ' ' + description).toLowerCase();
  const suggestions = new Set();
  
  // Check each keyword
  Object.entries(ICON_MAPPINGS).forEach(([keyword, icons]) => {
    if (text.includes(keyword)) {
      icons.forEach(icon => suggestions.add(icon));
    }
  });
  
  // If no matches, return generic icons
  if (suggestions.size === 0) {
    return ['Scale', 'Briefcase', 'FileText'];
  }
  
  return Array.from(suggestions).slice(0, 3);
}

/**
 * Generate icon suggestions for practice areas
 */
function generatePracticeAreaSuggestions(practiceAreas) {
  const suggestions = [];
  
  Object.entries(practiceAreas).forEach(([slug, area]) => {
    const icons = suggestIcons(area.name, area.description);
    
    suggestions.push({
      slug,
      name: area.name,
      currentIcon: area.icon || 'Scale',
      suggestedIcons: icons,
      recommended: icons[0]
    });
  });
  
  return suggestions;
}

/**
 * Generate icon suggestions for industries
 */
function generateIndustrySuggestions(industries) {
  const suggestions = [];
  
  Object.entries(industries).forEach(([slug, industry]) => {
    const icons = suggestIcons(industry.name, industry.description);
    
    suggestions.push({
      slug,
      name: industry.name,
      currentIcon: industry.icon || 'Building2',
      suggestedIcons: icons,
      recommended: icons[0]
    });
  });
  
  return suggestions;
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(practiceAreaSuggestions, industrySuggestions) {
  let md = `# 🎨 Icon Suggestions for RBE Website

Generated: ${new Date().toISOString()}

This document provides icon suggestions for practice areas and industries based on their names and content.

All icons are from [Lucide Icons](https://lucide.dev/) which is already installed in your project.

---

## 📋 Practice Areas (${practiceAreaSuggestions.length})

| Practice Area | Current | Recommended | Alternatives |
|---------------|---------|-------------|--------------|
`;

  practiceAreaSuggestions.forEach(area => {
    const alternatives = area.suggestedIcons.slice(1).join(', ') || 'None';
    md += `| ${area.name} | \`${area.currentIcon}\` | **\`${area.recommended}\`** | ${alternatives} |\n`;
  });

  md += `\n---

## 🏭 Industries (${industrySuggestions.length})

| Industry | Current | Recommended | Alternatives |
|----------|---------|-------------|--------------|
`;

  industrySuggestions.forEach(industry => {
    const alternatives = industry.suggestedIcons.slice(1).join(', ') || 'None';
    md += `| ${industry.name} | \`${industry.currentIcon}\` | **\`${industry.recommended}\`** | ${alternatives} |\n`;
  });

  md += `\n---

## 🔧 How to Apply

### Method 1: Manual Update (Recommended)

Update your data files with the recommended icons:

\`\`\`typescript
// In src/lib/data/practiceAreas.ts
export const practiceAreas: PracticeArea[] = [
  {
    id: 'construction',
    name: 'Construction Law',
    icon: 'HardHat', // ← Update this
    // ...
  }
]
\`\`\`

### Method 2: Bulk Replace

Use find-and-replace in your editor:

**Practice Areas:**
`;

  practiceAreaSuggestions.forEach(area => {
    if (area.currentIcon !== area.recommended) {
      md += `- Find: \`"id": "${area.slug}",\\n    "name": "${area.name}",\\n    "slug": "${area.slug}",\\n    "description": "...",\\n    "icon": "${area.currentIcon}"\`\n`;
      md += `  Replace with: \`"icon": "${area.recommended}"\`\n\n`;
    }
  });

  md += `\n**Industries:**\n`;

  industrySuggestions.forEach(industry => {
    if (industry.currentIcon !== industry.recommended) {
      md += `- Find: \`"icon": "${industry.currentIcon}"\` in ${industry.slug}\n`;
      md += `  Replace with: \`"icon": "${industry.recommended}"\`\n\n`;
    }
  });

  md += `\n---

## 📚 Icon Reference

### Available Lucide Icons

All these icons are available in your project via \`lucide-react\`:

**Business & Legal:**
- \`Scale\`, \`Gavel\`, \`Briefcase\`, \`FileText\`, \`ScrollText\`

**Buildings & Construction:**
- \`Building\`, \`Building2\`, \`HardHat\`, \`Hammer\`, \`Home\`

**People & Organizations:**
- \`Users\`, \`User\`, \`UserCheck\`, \`Heart\`, \`HandHeart\`

**Finance & Money:**
- \`DollarSign\`, \`TrendingUp\`, \`TrendingDown\`, \`PiggyBank\`

**Protection & Security:**
- \`Shield\`, \`Lock\`, \`Umbrella\`, \`AlertCircle\`

**Technology:**
- \`Cpu\`, \`Smartphone\`, \`Monitor\`, \`Wifi\`, \`Phone\`

**Industry:**
- \`Factory\`, \`Cog\`, \`Package\`, \`Truck\`, \`Plane\`

**Media & Entertainment:**
- \`Radio\`, \`Tv\`, \`Film\`, \`Music\`, \`Trophy\`

**Health & Medical:**
- \`Heart\`, \`Stethoscope\`, \`Hospital\`, \`Pill\`

**Food & Beverage:**
- \`Utensils\`, \`Coffee\`, \`Wine\`, \`UtensilsCrossed\`

**Retail & Shopping:**
- \`ShoppingCart\`, \`Store\`, \`ShoppingBag\`, \`Package\`

**Real Estate:**
- \`Home\`, \`Building\`, \`MapPin\`, \`Key\`

**Innovation:**
- \`Lightbulb\`, \`Brain\`, \`Copyright\`, \`Sparkles\`

---

## 🎯 Quick Apply Script

Copy and paste this into your terminal to see all suggested changes:

\`\`\`bash
# Practice Areas
`;

  practiceAreaSuggestions.forEach(area => {
    md += `echo "${area.slug}: ${area.currentIcon} → ${area.recommended}"\n`;
  });

  md += `\n# Industries\n`;

  industrySuggestions.forEach(industry => {
    md += `echo "${industry.slug}: ${industry.currentIcon} → ${industry.recommended}"\n`;
  });

  md += `\`\`\`

---

## 📝 Notes

- **Recommended icons** are based on keyword matching
- **Alternative icons** provide other good options
- All icons are from Lucide and already available in your project
- You can preview icons at: https://lucide.dev/icons/

---

**Ready to apply?** Update your data files with the recommended icons! 🎨
`;

  return md;
}

/**
 * Generate TypeScript update file
 */
function generateTypeScriptUpdates(practiceAreaSuggestions, industrySuggestions) {
  let ts = `// Auto-generated icon updates
// Copy these into your data files

// Practice Areas Icon Updates
export const practiceAreaIconUpdates = {
`;

  practiceAreaSuggestions.forEach(area => {
    ts += `  '${area.slug}': '${area.recommended}',\n`;
  });

  ts += `}

// Industries Icon Updates
export const industryIconUpdates = {
`;

  industrySuggestions.forEach(industry => {
    ts += `  '${industry.slug}': '${industry.recommended}',\n`;
  });

  ts += `}

// Usage:
// import { practiceAreaIconUpdates } from './icon-updates'
// practiceAreas.forEach(area => {
//   area.icon = practiceAreaIconUpdates[area.slug] || area.icon
// })
`;

  return ts;
}

/**
 * Main function
 */
async function generateIconSuggestions() {
  console.log('🎨 Generating icon suggestions...\n');
  
  try {
    // Read scraped content
    const data = JSON.parse(await fs.readFile(SCRAPED_CONTENT, 'utf-8'));
    
    // Generate suggestions
    console.log('📋 Analyzing practice areas...');
    const practiceAreaSuggestions = generatePracticeAreaSuggestions(data.practiceAreas);
    console.log(`  ✓ Generated ${practiceAreaSuggestions.length} suggestions`);
    
    console.log('\n🏭 Analyzing industries...');
    const industrySuggestions = generateIndustrySuggestions(data.industries);
    console.log(`  ✓ Generated ${industrySuggestions.length} suggestions`);
    
    // Generate markdown report
    console.log('\n📝 Creating markdown report...');
    const markdown = generateMarkdownReport(practiceAreaSuggestions, industrySuggestions);
    await fs.writeFile(OUTPUT_FILE, markdown);
    console.log(`  ✓ Saved to: ${OUTPUT_FILE}`);
    
    // Generate TypeScript updates
    console.log('\n💾 Creating TypeScript update file...');
    const typescript = generateTypeScriptUpdates(practiceAreaSuggestions, industrySuggestions);
    const tsFile = path.join(__dirname, '../src/lib/data/icon-updates.ts');
    await fs.writeFile(tsFile, typescript);
    console.log(`  ✓ Saved to: ${tsFile}`);
    
    // Summary
    console.log('\n✅ Icon suggestions generated!\n');
    console.log('📊 Summary:');
    console.log(`  - Practice areas: ${practiceAreaSuggestions.length}`);
    console.log(`  - Industries: ${industrySuggestions.length}`);
    console.log(`  - Total suggestions: ${practiceAreaSuggestions.length + industrySuggestions.length}`);
    
    console.log('\n📁 Files created:');
    console.log(`  - ${OUTPUT_FILE}`);
    console.log(`  - ${tsFile}`);
    
    console.log('\n📝 Next steps:');
    console.log('  1. Review ICON_SUGGESTIONS.md');
    console.log('  2. Update icons in your data files');
    console.log('  3. Or use icon-updates.ts for bulk updates');
    console.log('  4. Preview icons at https://lucide.dev/icons/\n');
    
  } catch (error) {
    console.error('❌ Generation failed:', error);
  }
}

// Run generator
generateIconSuggestions().catch(console.error);
