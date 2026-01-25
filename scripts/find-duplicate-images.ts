/**
 * Find likely duplicate images and report them.
 *
 * What it does:
 * - Exact duplicates by SHA1 (byte-for-byte)
 * - Same-stem variants (same path without extension) to help spot duplicates across formats
 *
 * Output:
 * - scripts/output/duplicate-images-report.json
 * - scripts/output/duplicate-images-report.md
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg'])

type FileInfo = {
  path: string
  size: number
  ext: string
  stemKey: string
  sha1?: string
}

async function listFilesRecursive(dir: string): Promise<string[]> {
  const out: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      // eslint-disable-next-line no-await-in-loop
      out.push(...(await listFilesRecursive(full)))
    } else {
      out.push(full)
    }
  }
  return out
}

async function sha1File(filePath: string): Promise<string> {
  const buf = await fs.readFile(filePath)
  return crypto.createHash('sha1').update(buf).digest('hex')
}

function toPosix(p: string) {
  return p.split(path.sep).join('/')
}

async function main() {
  const root = process.cwd()
  const targets = [
    path.join(root, 'public', 'images'),
    path.join(root, 'public', 'assets'),
  ]

  const allFiles: FileInfo[] = []

  for (const dir of targets) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const files = await listFilesRecursive(dir)
      for (const f of files) {
        const ext = path.extname(f).toLowerCase()
        if (!IMAGE_EXTS.has(ext)) continue
        // eslint-disable-next-line no-await-in-loop
        const st = await fs.stat(f)
        const rel = toPosix(path.relative(root, f))
        const stemKey = rel.replace(new RegExp(`${ext}$`, 'i'), '')
        allFiles.push({ path: rel, size: st.size, ext, stemKey })
      }
    } catch {
      // ignore missing dirs
    }
  }

  // Compute hashes (skip huge SVGs if needed; most are small)
  for (const info of allFiles) {
    // eslint-disable-next-line no-await-in-loop
    info.sha1 = await sha1File(path.join(root, info.path))
  }

  const byHash = new Map<string, FileInfo[]>()
  for (const f of allFiles) {
    const h = f.sha1!
    const arr = byHash.get(h) ?? []
    arr.push(f)
    byHash.set(h, arr)
  }

  const exactDuplicates = Array.from(byHash.entries())
    .filter(([, files]) => files.length > 1)
    .map(([hash, files]) => ({
      hash,
      totalBytes: files.reduce((sum, f) => sum + f.size, 0),
      files: files.sort((a, b) => a.path.localeCompare(b.path)),
    }))
    .sort((a, b) => b.totalBytes - a.totalBytes)

  const byStem = new Map<string, FileInfo[]>()
  for (const f of allFiles) {
    const arr = byStem.get(f.stemKey) ?? []
    arr.push(f)
    byStem.set(f.stemKey, arr)
  }

  const sameStemVariants = Array.from(byStem.entries())
    .filter(([, files]) => files.length > 1)
    .map(([stem, files]) => ({
      stem,
      files: files
        .sort((a, b) => a.ext.localeCompare(b.ext))
        .map(f => ({ path: f.path, size: f.size, ext: f.ext })),
    }))
    .sort((a, b) => b.files.length - a.files.length)

  const report = {
    generatedAt: new Date().toISOString(),
    scannedFiles: allFiles.length,
    exactDuplicateGroups: exactDuplicates.length,
    sameStemGroups: sameStemVariants.length,
    exactDuplicates,
    sameStemVariants,
  }

  const outDir = path.join(root, 'scripts', 'output')
  await fs.mkdir(outDir, { recursive: true })
  await fs.writeFile(
    path.join(outDir, 'duplicate-images-report.json'),
    JSON.stringify(report, null, 2),
    'utf8'
  )

  const mdLines: string[] = []
  mdLines.push(`# Duplicate Images Report`)
  mdLines.push(``)
  mdLines.push(`Generated: ${report.generatedAt}`)
  mdLines.push(`Scanned images: ${report.scannedFiles}`)
  mdLines.push(`Exact duplicate groups (byte-for-byte): ${report.exactDuplicateGroups}`)
  mdLines.push(`Same-stem variant groups (different extensions): ${report.sameStemGroups}`)
  mdLines.push(``)

  mdLines.push(`## Largest exact-duplicate groups`)
  for (const grp of exactDuplicates.slice(0, 25)) {
    mdLines.push(`- Hash: \`${grp.hash}\` (${grp.files.length} files, ${grp.totalBytes} bytes)`)
    for (const f of grp.files) mdLines.push(`  - \`${f.path}\` (${f.size} bytes)`)
  }
  mdLines.push(``)

  mdLines.push(`## Same-stem variants (likely duplicates across formats)`)
  for (const grp of sameStemVariants.slice(0, 50)) {
    mdLines.push(`- Stem: \`${grp.stem}\``)
    for (const f of grp.files) mdLines.push(`  - \`${f.path}\` (${f.ext}, ${f.size} bytes)`)
  }

  await fs.writeFile(path.join(outDir, 'duplicate-images-report.md'), mdLines.join('\n'), 'utf8')

  // eslint-disable-next-line no-console
  console.log(`✓ Wrote scripts/output/duplicate-images-report.json and .md`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

