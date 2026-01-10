/**
 * Cache utilities for Firecrawl discovery and scraping
 *
 * Provides file-based caching to avoid redundant API calls
 */

import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import crypto from 'crypto'

const CACHE_DIR = path.resolve('data/cache')
const SCRAPE_CACHE_DIR = path.join(CACHE_DIR, 'scrape')

/**
 * Ensure cache directories exist
 */
async function ensureCacheDirs() {
  await fs.mkdir(CACHE_DIR, { recursive: true })
  await fs.mkdir(SCRAPE_CACHE_DIR, { recursive: true })
}

/**
 * Generate a safe filename hash from a URL
 * Uses SHA256 and takes first 16 chars for reasonable uniqueness
 */
export function getCacheKey(url: string): string {
  const hash = crypto.createHash('sha256').update(url).digest('hex')
  return hash.substring(0, 16)
}

/**
 * Get cache file path for a URL
 */
export function getScrapeCachePath(url: string): string {
  const key = getCacheKey(url)
  return path.join(SCRAPE_CACHE_DIR, `${key}.json`)
}

/**
 * Check if a scrape result is cached
 */
export async function isScrapeCached(url: string): Promise<boolean> {
  await ensureCacheDirs()
  const cachePath = getScrapeCachePath(url)
  return existsSync(cachePath)
}

/**
 * Read cached scrape result
 */
export async function readScrapeCache(url: string): Promise<any | null> {
  await ensureCacheDirs()
  const cachePath = getScrapeCachePath(url)

  if (!existsSync(cachePath)) {
    return null
  }

  try {
    const content = await fs.readFile(cachePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.warn(`⚠️  Failed to read cache for ${url}:`, (error as Error).message)
    return null
  }
}

/**
 * Write scrape result to cache
 */
export async function writeScrapeCache(url: string, data: any): Promise<void> {
  await ensureCacheDirs()
  const cachePath = getScrapeCachePath(url)

  try {
    await fs.writeFile(cachePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.warn(`⚠️  Failed to write cache for ${url}:`, (error as Error).message)
  }
}

/**
 * Read cached Map response
 */
export async function readMapCache(): Promise<any | null> {
  await ensureCacheDirs()
  const cachePath = path.join(CACHE_DIR, 'firecrawl-map.json')

  if (!existsSync(cachePath)) {
    return null
  }

  try {
    const content = await fs.readFile(cachePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.warn('⚠️  Failed to read map cache:', (error as Error).message)
    return null
  }
}

/**
 * Write Map response to cache
 */
export async function writeMapCache(data: any): Promise<void> {
  await ensureCacheDirs()
  const cachePath = path.join(CACHE_DIR, 'firecrawl-map.json')

  try {
    await fs.writeFile(cachePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.warn('⚠️  Failed to write map cache:', (error as Error).message)
  }
}

/**
 * Read cached Crawl response
 */
export async function readCrawlCache(): Promise<any | null> {
  await ensureCacheDirs()
  const cachePath = path.join(CACHE_DIR, 'firecrawl-crawl.json')

  if (!existsSync(cachePath)) {
    return null
  }

  try {
    const content = await fs.readFile(cachePath, 'utf8')
    return JSON.parse(content)
  } catch (error) {
    console.warn('⚠️  Failed to read crawl cache:', (error as Error).message)
    return null
  }
}

/**
 * Write Crawl response to cache
 */
export async function writeCrawlCache(data: any): Promise<void> {
  await ensureCacheDirs()
  const cachePath = path.join(CACHE_DIR, 'firecrawl-crawl.json')

  try {
    await fs.writeFile(cachePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.warn('⚠️  Failed to write crawl cache:', (error as Error).message)
  }
}

/**
 * Clear all caches
 */
export async function clearCache(): Promise<void> {
  await ensureCacheDirs()

  const files = [
    path.join(CACHE_DIR, 'firecrawl-map.json'),
    path.join(CACHE_DIR, 'firecrawl-crawl.json'),
  ]

  for (const file of files) {
    if (existsSync(file)) {
      await fs.unlink(file)
    }
  }

  // Clear scrape cache directory
  if (existsSync(SCRAPE_CACHE_DIR)) {
    const files = await fs.readdir(SCRAPE_CACHE_DIR)
    for (const file of files) {
      await fs.unlink(path.join(SCRAPE_CACHE_DIR, file))
    }
  }
}
