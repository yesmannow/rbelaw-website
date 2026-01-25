import type { BlogPost } from '../types/content'
import { enhancedPracticeAreas } from '../data/practiceAreasEnhanced'

export function parsePostDate(post: Pick<BlogPost, 'date'>): number | null {
  const t = new Date(post.date).getTime()
  return Number.isFinite(t) ? t : null
}

function normalizeText(text: string) {
  return text.toLowerCase()
}

function includesAny(haystack: string, needles: string[]) {
  return needles.some(n => haystack.includes(n))
}

const PRACTICE_AREA_STOPWORDS = new Set([
  'and',
  '&',
  'law',
  'laws',
  'legal',
  'practice',
  'area',
  'areas',
  'business',
  'corporate',
  'litigation',
  'employment',
  'insurance',
  'real',
  'estate',
  'government',
  'health',
  'care',
])

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function normalizeForMatching(value: string) {
  // collapse whitespace + normalize ampersands
  return normalizeText(value)
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function phraseMatches(haystack: string, phrase: string): boolean {
  if (!phrase) return false
  const re = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'i')
  return re.test(haystack)
}

function postSearchText(post: BlogPost): string {
  const contentText = post.content
    .map(block => {
      if (block.type === 'paragraph') return block.text
      if (block.type === 'heading') return block.text
      if (block.type === 'quote') return block.text
      if (block.type === 'list') return block.items.join(' ')
      return ''
    })
    .join(' ')

  return normalizeForMatching(
    [
      post.title,
      post.excerpt,
      post.author,
      post.categories?.join(' ') ?? '',
      post.tags?.join(' ') ?? '',
      contentText,
    ].join(' ')
  )
}

export function derivePracticeAreaTags(post: BlogPost, limit = 3): string[] {
  const haystack = postSearchText(post)

  const scored: Array<{ name: string; score: number }> = []
  for (const pa of enhancedPracticeAreas) {
    const name = pa.name?.trim()
    const slug = pa.slug?.trim()
    if (!name || !slug) continue

    // Prefer matching full phrases (name + slug phrase)
    const namePhrase = normalizeForMatching(name)
    const slugPhrase = normalizeForMatching(slug.split('-').join(' '))

    // Primary: exact name / slug phrase match
    if (namePhrase.length >= 6 && phraseMatches(haystack, namePhrase)) {
      scored.push({ name, score: 100 + namePhrase.length })
      continue
    }
    if (slugPhrase.length >= 6 && phraseMatches(haystack, slugPhrase)) {
      scored.push({ name, score: 80 + slugPhrase.length })
      continue
    }

    // Secondary: match uncommon tokens from the name (skip common words)
    const tokens = namePhrase.split(' ').filter(t => t.length >= 5 && !PRACTICE_AREA_STOPWORDS.has(t))
    if (tokens.length === 0) continue
    const tokenMatches = tokens.filter(t => phraseMatches(haystack, t)).length
    if (tokenMatches > 0) {
      scored.push({ name, score: 20 + tokenMatches * 5 + tokens.join(' ').length })
    }
  }

  scored.sort((a, b) => b.score - a.score)

  const result: string[] = []
  for (const { name } of scored) {
    if (!result.includes(name)) result.push(name)
    if (result.length >= limit) break
  }

  return result
}

export function derivePostCategories(post: BlogPost): string[] {
  const haystack = postSearchText(post)
  const title = normalizeForMatching(post.title)

  if (includesAny(title, ['alert', 'injunction', 'court vacates', 'court issues', 'update'])) {
    return ['Legal Alert']
  }

  if (
    includesAny(title, [
      'welcomes',
      'joins',
      'promoted',
      'retires',
      'appointed',
      'elected',
      'announces',
      'congratulations',
      'farewell',
    ])
  ) {
    return ['Firm News']
  }

  if (
    includesAny(title, [
      'best lawyers',
      'super lawyers',
      'best law firms',
      'recognized',
      'honored',
      'rankings',
      'award',
    ])
  ) {
    return ['Awards & Recognition']
  }

  if (includesAny(title, ['community', 'trail', 'cleanup', 'angel tree', 'mentor', 'united way'])) {
    return ['Community']
  }

  if (includesAny(haystack, ['ai ', 'artificial intelligence', 'generative ai'])) {
    return ['AI & Emerging Tech']
  }

  return ['Insight']
}

export function derivePostTags(post: BlogPost): string[] {
  const haystack = postSearchText(post)
  const tags = new Set<string>()

  derivePracticeAreaTags(post, 4).forEach(t => tags.add(t))

  if (includesAny(haystack, ['ai ', 'artificial intelligence', 'generative ai'])) tags.add('AI')
  if (includesAny(haystack, ['covid', 'pandemic'])) tags.add('COVID-19')
  if (includesAny(haystack, ['ftc', 'noncompete', 'non-compete'])) tags.add('Noncompete')
  if (includesAny(haystack, ['bankruptcy', 'debtor', 'creditor'])) tags.add('Bankruptcy')
  if (includesAny(haystack, ['construction', 'lien', 'subcontract'])) tags.add('Construction')

  return Array.from(tags)
}

