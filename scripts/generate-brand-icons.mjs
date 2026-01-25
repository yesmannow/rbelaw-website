import sharp from 'sharp'
import path from 'path'

const INPUT = path.resolve('public/images/logo/images.png')
const OUT_MARK = path.resolve('public/images/logo/rbe-mark-white.png')

const NAVY_BG = '#213469' // tailwind primary.navy
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }

async function ensureWhiteMark() {
  const meta = await sharp(INPUT).metadata()
  if (!meta.width || !meta.height) throw new Error('Unable to read logo dimensions.')

  // Alpha mask from luminance:
  // - white background -> transparent
  // - dark mark -> opaque (with soft anti-aliased edges)
  const alpha = await sharp(INPUT).grayscale().negate().linear(1.6, -50).png().toBuffer()

  // Solid white RGB + computed alpha => white mark on transparent background
  await sharp({
    create: { width: meta.width, height: meta.height, channels: 3, background: '#ffffff' },
  })
    .joinChannel(alpha)
    .png()
    .toFile(OUT_MARK)
}

async function squareIcon({ size, outPath, background, paddingPct }) {
  const markSize = Math.max(1, Math.round(size * (1 - paddingPct * 2)))

  const mark = await sharp(OUT_MARK)
    .resize(markSize, markSize, { fit: 'contain' })
    .png()
    .toBuffer()

  await sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(path.resolve(outPath))
}

async function main() {
  await ensureWhiteMark()

  // Favicons (transparent)
  await squareIcon({
    size: 16,
    outPath: 'public/favicon-16x16.png',
    background: TRANSPARENT,
    paddingPct: 0.15,
  })
  await squareIcon({
    size: 32,
    outPath: 'public/favicon-32x32.png',
    background: TRANSPARENT,
    paddingPct: 0.15,
  })

  // Apple touch + PWA (brand navy background)
  await squareIcon({
    size: 180,
    outPath: 'public/apple-touch-icon.png',
    background: NAVY_BG,
    paddingPct: 0.18,
  })
  await squareIcon({
    size: 192,
    outPath: 'public/pwa-192x192.png',
    background: NAVY_BG,
    paddingPct: 0.18,
  })
  await squareIcon({
    size: 512,
    outPath: 'public/pwa-512x512.png',
    background: NAVY_BG,
    paddingPct: 0.18,
  })

  // Maskable icon needs more padding so it survives OS masks
  await squareIcon({
    size: 512,
    outPath: 'public/pwa-512x512-maskable.png',
    background: NAVY_BG,
    paddingPct: 0.28,
  })

  console.log('Generated brand icons.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

