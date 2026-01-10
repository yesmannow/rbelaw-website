import fs from 'fs'
import path from 'path'

const practiceAliasPath = path.resolve('data/normalize/practice-area-aliases.json')
const industryAliasPath = path.resolve('data/normalize/industry-aliases.json')

function loadAliasMap(filePath) {
  try {
    if (!fs.existsSync(filePath)) return {}
    const raw = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

const practiceAreaAliases = loadAliasMap(practiceAliasPath)
const industryAliases = loadAliasMap(industryAliasPath)

function buildAliasData(map) {
  const lowerMap = {}
  const known = new Set()
  Object.entries(map).forEach(([alias, canonical]) => {
    const key = alias.trim().toLowerCase()
    if (key) lowerMap[key] = canonical
    if (canonical) known.add(canonical)
    known.add(alias)
  })
  return { lowerMap, known }
}

const practiceAliasData = buildAliasData(practiceAreaAliases)
const industryAliasData = buildAliasData(industryAliases)

function splitCamel(item, knownSet) {
  if (!knownSet || knownSet.size === 0) return [item]
  const spaced = item.replace(/([a-z])([A-Z])/g, '$1 $2')
  const parts = spaced.split(/\s+/).filter(Boolean)
  if (parts.length > 1 && parts.every(p => knownSet.has(p))) {
    return parts
  }
  return [item]
}

function splitConcatenated(item, knownSet) {
  const pieces = item
    .split(/(?:\r?\n|•|·|▪|–|—|-\s+| {2,}|\t|;|,)/)
    .flatMap(part => splitCamel(part.trim(), knownSet))
    .map(p => p.trim())
    .filter(Boolean)

  return pieces.length > 0 ? pieces : [item.trim()]
}

function normalizeList(raw, aliasData) {
  const { lowerMap, known } = aliasData
  const arr = Array.isArray(raw) ? raw : raw ? [raw] : []
  const result = []
  const seen = new Set()

  for (const val of arr) {
    if (typeof val !== 'string') continue
    const items = splitConcatenated(val, known)
    for (let item of items) {
      const key = item.trim().toLowerCase()
      if (!key) continue
      const canonical = lowerMap[key] || item.trim()
      const dedupeKey = canonical.trim().toLowerCase()
      if (dedupeKey && !seen.has(dedupeKey)) {
        seen.add(dedupeKey)
        result.push(canonical.trim())
      }
    }
  }

  return result
}

export function normalizeAttorneyExtract(extracted) {
  if (!extracted) return extracted
  return {
    ...extracted,
    practiceAreas: normalizeList(extracted.practiceAreas, practiceAliasData),
    industries: normalizeList(extracted.industries, industryAliasData),
  }
}

export function normalizePracticeAreaExtract(extracted) {
  if (!extracted) return extracted
  return {
    ...extracted,
    relatedIndustries: normalizeList(extracted.relatedIndustries, industryAliasData),
  }
}

export function normalizeIndustryExtract(extracted) {
  if (!extracted) return extracted
  return {
    ...extracted,
    relatedPracticeAreas: normalizeList(extracted.relatedPracticeAreas, practiceAliasData),
  }
}

export function normalizeBlogExtract(extracted) {
  if (!extracted) return extracted
  if (Array.isArray(extracted.links)) {
    extracted = {
      ...extracted,
      links: extracted.links
        .map(link => {
          if (!link || typeof link !== 'object') return null
          if (typeof link.url === 'string' && link.url.trim().toLowerCase().startsWith('file://')) {
            return { ...link, url: null }
          }
          return link
        })
        .filter(Boolean),
    }
  }
  return extracted
}

/**
 * Normalize a single practice area name to its canonical form
 * @param {string} name - The practice area name to normalize
 * @returns {string} - The canonical name or original if no alias found
 */
export function normalizePracticeAreaName(name) {
  if (!name || typeof name !== 'string') return name
  const trimmed = name.trim()
  const key = trimmed.toLowerCase()
  return practiceAliasData.lowerMap[key] || trimmed
}

/**
 * Normalize a single industry name to its canonical form
 * @param {string} name - The industry name to normalize
 * @returns {string} - The canonical name or original if no alias found
 */
export function normalizeIndustryName(name) {
  if (!name || typeof name !== 'string') return name
  const trimmed = name.trim()
  const key = trimmed.toLowerCase()
  return industryAliasData.lowerMap[key] || trimmed
}
