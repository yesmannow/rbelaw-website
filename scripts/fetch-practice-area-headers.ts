import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import axios from 'axios'
import sharp from 'sharp'
import dotenv from 'dotenv'
import process from 'node:process'
import { Buffer } from 'node:buffer'

async function main() {
  // Load env vars from .env.local (fallback to .env)
  const envLocal = path.resolve(process.cwd(), '.env.local')
  if (fs.existsSync(envLocal)) dotenv.config({ path: envLocal })
  else dotenv.config()

  const PEXELS_API_KEY = process.env.PEXELS_API_KEY || ''
  const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || ''
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || ''

  console.log(`[providers] unsplash=${Boolean(UNSPLASH_ACCESS_KEY)} pexels=${Boolean(PEXELS_API_KEY)} pixabay=${Boolean(PIXABAY_API_KEY)}`)

  const configPath = path.resolve('scripts/config/practice-areas.json')
  const outDir = path.resolve('public/assets/practice-areas')
  const mapOut = path.resolve('src/lib/data/practiceAreaHeroes.ts')

  if (!fs.existsSync(configPath)) {
    console.error(`Missing config: ${configPath}`)
    process.exit(1)
  }

  await fsp.mkdir(outDir, { recursive: true })

  const raw = await fsp.readFile(configPath, 'utf8')
  const items: Array<{ slug: string; name: string; queries: string[] }> = JSON.parse(raw)

  // optional CLI filtering: --slug foo,bar
  const onlySlugs: string[] | null = (() => {
    const f = process.argv.find(a => a.startsWith('--slug='))
    if (!f) return null
    return f.split('=')[1].split(',').map(s => s.trim()).filter(Boolean)
  })()

  const selected = onlySlugs ? items.filter(i => onlySlugs.includes(i.slug)) : items

  const widths = [1024, 1536, 1920]
  const minW = 1200
  const minH = 700

  const results: Record<string, { src: string; srcset: string; credit?: string }> = {}
  const metaOut: any[] = []

  for (const item of selected) {
    const queries = item.queries && item.queries.length ? item.queries : [item.name]
    const candidates: Array<{
      url: string
      width: number
      height: number
      source: 'unsplash' | 'pexels' | 'pixabay'
      credit?: string
    }> = []

    // Unsplash
    if (UNSPLASH_ACCESS_KEY) {
      try {
        for (const q of queries) {
          const r = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query: q, per_page: 30, orientation: 'landscape', content_filter: 'high' },
            headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
            timeout: 15000,
          })
          const results = Array.isArray(r.data?.results) ? r.data.results : []
          console.log(`[unsplash] ${item.slug} '${q}' results=${results.length}`)
          for (const res of results) {
            const w = Number(res.width || 0)
            const h = Number(res.height || 0)
            const url = (res?.urls?.full as string) || (res?.urls?.regular as string) || (res?.urls?.raw as string) || undefined
            if (url && w >= minW && h >= minH) {
              candidates.push({ url, width: w, height: h, source: 'unsplash', credit: res?.user?.name })
            }
          }
          if (candidates.length) break
        }
      } catch (e) {
        console.warn(`[unsplash]`, (e as any)?.response?.status || '', (e as any)?.message || e)
      }
    }

    // Pexels
    if (!candidates.length && PEXELS_API_KEY) {
      try {
        for (const q of queries) {
          const r = await axios.get('https://api.pexels.com/v1/search', {
            params: { query: q, per_page: 30, orientation: 'landscape' },
            headers: { Authorization: PEXELS_API_KEY },
            timeout: 15000,
          })
          const photos = Array.isArray(r.data?.photos) ? r.data.photos : []
          console.log(`[pexels] ${item.slug} '${q}' results=${photos.length}`)
          for (const p of photos) {
            const w = Number(p.width || 0)
            const h = Number(p.height || 0)
            const url = (p?.src?.original as string) || (p?.src?.landscape as string) || undefined
            if (url && w >= minW && h >= minH) {
              candidates.push({ url, width: w, height: h, source: 'pexels', credit: p?.photographer })
            }
          }
          if (candidates.length) break
        }
      } catch (e) {
        console.warn(`[pexels]`, (e as any)?.response?.status || '', (e as any)?.message || e)
      }
    }

    // Pixabay
    if (!candidates.length && PIXABAY_API_KEY) {
      try {
        for (const q of queries) {
          const r = await axios.get('https://pixabay.com/api/', {
            params: { key: PIXABAY_API_KEY, q: q, image_type: 'photo', orientation: 'horizontal', per_page: 30, safesearch: true },
            timeout: 15000,
          })
          const hits = Array.isArray(r.data?.hits) ? r.data.hits : []
          console.log(`[pixabay] ${item.slug} '${q}' results=${hits.length}`)
          for (const h of hits) {
            const url = (h.fullHDURL || h.largeImageURL) as string | undefined
            const w = Number(h.imageWidth || 0)
            const hh = Number(h.imageHeight || 0)
            if (url && w >= minW && hh >= minH) {
              candidates.push({ url, width: w, height: hh, source: 'pixabay', credit: h.user })
            }
          }
          if (candidates.length) break
        }
      } catch (e) {
        console.warn(`[pixabay]`, (e as any)?.response?.status || '', (e as any)?.message || e)
      }
    }

    if (!candidates.length) {
      console.warn(`[warn] No large image found for ${item.slug}; falling back to first provider result if available.`)
      // Attempt relaxed fallback with smaller sizes
      // Try unsplash again without size filter
      if (UNSPLASH_ACCESS_KEY) {
        try {
          const r = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query: queries[0], per_page: 1 },
            headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
            timeout: 15000,
          })
          const res = Array.isArray(r.data?.results) && r.data.results[0]
          const url = res?.urls?.full || res?.urls?.regular || res?.urls?.raw
          if (url) candidates.push({ url, width: Number(res?.width || 0), height: Number(res?.height || 0), source: 'unsplash', credit: res?.user?.name })
        } catch (e) { console.warn('[fallback unsplash]', (e as any)?.message || e) }
      }
      // Try pexels fallback
      if (!candidates.length && PEXELS_API_KEY) {
        try {
          const r = await axios.get('https://api.pexels.com/v1/search', {
            params: { query: queries[0], per_page: 1 },
            headers: { Authorization: PEXELS_API_KEY },
            timeout: 15000,
          })
          const p = Array.isArray(r.data?.photos) && r.data.photos[0]
          const url = p?.src?.original || p?.src?.landscape
          if (url) candidates.push({ url, width: Number(p?.width || 0), height: Number(p?.height || 0), source: 'pexels', credit: p?.photographer })
        } catch (e) { console.warn('[fallback pexels]', (e as any)?.message || e) }
      }
      // Try pixabay fallback
      if (!candidates.length && PIXABAY_API_KEY) {
        try {
          const r = await axios.get('https://pixabay.com/api/', {
            params: { key: PIXABAY_API_KEY, q: queries[0], image_type: 'photo', per_page: 1 },
            timeout: 15000,
          })
          const h = Array.isArray(r.data?.hits) && r.data.hits[0]
          const url = h?.fullHDURL || h?.largeImageURL
          if (url) candidates.push({ url, width: Number(h?.imageWidth || 0), height: Number(h?.imageHeight || 0), source: 'pixabay', credit: h?.user })
        } catch (e) { console.warn('[fallback pixabay]', (e as any)?.message || e) }
      }
      if (!candidates.length) {
        console.warn(`[skip] No image found for ${item.slug}`)
        continue
      }
    }

    // Pick best candidate: max area (prefer highest resolution)
    candidates.sort((a, b) => (b.width * b.height) - (a.width * a.height))
    const picked = candidates[0]

    // Fetch original
    const imgResp = await axios.get(picked.url, { responseType: 'arraybuffer', timeout: 20000 })
    const buf = Buffer.from(imgResp.data)

    // Optimize variants
    const srcsetParts: string[] = []
    for (const w of widths) {
      const outFile = path.join(outDir, `${item.slug}-${w}.webp`)
      const rel = `/assets/practice-areas/${item.slug}-${w}.webp`
      await sharp(buf).resize({ width: w }).webp({ quality: 82 }).toFile(outFile)
      srcsetParts.push(`${rel} ${w}w`)
    }

    const src = `/assets/practice-areas/${item.slug}-1920.webp`
    const srcset = srcsetParts.join(', ')
    results[item.slug] = { src, srcset, credit: picked.credit }

    metaOut.push({ slug: item.slug, source: picked.source, credit: picked.credit, original: picked.url })
    console.log(`[ok] ${item.slug} → ${picked.source}`)
  }

  // Write TS mapping
  const fileTs = `// Auto-generated by scripts/fetch-practice-area-headers.ts\n` +
`export interface HeroImage { src: string; srcset: string; credit?: string }\n` +
`export const practiceAreaHeroes: Record<string, HeroImage> = ${JSON.stringify(results, null, 2)} as const;\n` +
`export function getPracticeAreaHero(slug: string): HeroImage | undefined { return practiceAreaHeroes[slug]; }\n`

  await fsp.mkdir(path.dirname(mapOut), { recursive: true })
  await fsp.writeFile(mapOut, fileTs, 'utf8')

  // Write meta for auditing (optional)
  await fsp.mkdir(path.resolve('scripts/output'), { recursive: true })
  await fsp.writeFile(path.resolve('scripts/output/practiceAreaHeroMeta.json'), JSON.stringify(metaOut, null, 2))

  console.log(`\nWrote mapping: ${path.relative(process.cwd(), mapOut)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
