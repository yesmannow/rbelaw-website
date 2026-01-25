import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { URL } from 'node:url'
import { chromium, type BrowserContextOptions } from 'playwright'

type AuditViewport = {
  name: 'desktop' | 'mobile'
  contextOptions: BrowserContextOptions
}

type PageAudit = {
  viewport: AuditViewport['name']
  url: string
  title: string
  metaDescription: string | null
  canonicalHref: string | null
  h1: string[]
  hasSkipToContentLink: boolean
  navAriaLabel: string | null
  consoleErrors: string[]
  screenshotError?: string
}

const viewports: AuditViewport[] = [
  {
    name: 'desktop',
    contextOptions: { viewport: { width: 1440, height: 900 } },
  },
  {
    name: 'mobile',
    contextOptions: {
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    },
  },
]

const pathsToAudit = [
  '/',
  '/practice-areas',
  '/practice-areas/construction',
  '/attorneys',
  '/about',
  '/contact',
  '/newsroom',
]

function guessContentType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8'
    case '.css':
      return 'text/css; charset=utf-8'
    case '.js':
      return 'text/javascript; charset=utf-8'
    case '.json':
      return 'application/json; charset=utf-8'
    case '.xml':
      return 'application/xml; charset=utf-8'
    case '.svg':
      return 'image/svg+xml'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.webp':
      return 'image/webp'
    case '.avif':
      return 'image/avif'
    case '.ico':
      return 'image/x-icon'
    case '.txt':
      return 'text/plain; charset=utf-8'
    case '.woff2':
      return 'font/woff2'
    default:
      return 'application/octet-stream'
  }
}

async function startDistServer(distDir: string, host: string, port: number) {
  const indexPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexPath)) {
    throw new Error(`dist not found at ${indexPath}. Run npm run build first.`)
  }

  const server = http.createServer((req, res) => {
    try {
      const requestUrl = req.url ?? '/'
      const url = new URL(requestUrl, `http://${host}:${port}`)
      const rawPath = decodeURIComponent(url.pathname)
      const safePath = rawPath.replace(/\0/g, '')

      // Note: do not normalize to avoid escaping distDir. Join already clamps within distDir for our usage
      // because we only accept paths under distDir; if traversal is attempted, it will miss and fall back to index.html.
      const candidate = path.join(distDir, safePath)

      const sendFile = (filePath: string) => {
        const stat = fs.statSync(filePath)
        res.statusCode = 200
        res.setHeader('Content-Type', guessContentType(filePath))
        res.setHeader('Content-Length', stat.size)
        res.setHeader(
          'Cache-Control',
          filePath.endsWith('index.html') ? 'no-cache' : 'public, max-age=31536000, immutable'
        )
        fs.createReadStream(filePath).pipe(res)
      }

      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        sendFile(candidate)
        return
      }

      // SPA fallback: serve index.html for routes.
      sendFile(indexPath)
    } catch (err) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end(err instanceof Error ? err.message : 'server error')
    }
  })

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, host, () => resolve())
  })

  return server
}

async function main() {
  const host = process.env.AUDIT_HOST ?? '127.0.0.1'
  const port = Number(process.env.AUDIT_PORT ?? '4173')
  const baseUrl = process.env.AUDIT_BASE_URL ?? `http://${host}:${port}`
  const startedAt = new Date().toISOString()
  const outputDir = path.resolve('audit-artifacts')
  const screenshotDir = path.join(outputDir, 'screenshots', `ui-audit-${Date.now()}`)
  const outputPath = path.join(outputDir, `ui-audit-${Date.now()}.json`)

  fs.mkdirSync(outputDir, { recursive: true })
  fs.mkdirSync(screenshotDir, { recursive: true })

  const distDir = path.resolve('dist')
  const shouldStartServer = !process.env.AUDIT_BASE_URL
  const server = shouldStartServer ? await startDistServer(distDir, host, port) : null

  const results: PageAudit[] = []
  try {
    for (const viewport of viewports) {
      const browser = await chromium.launch()
      const context = await browser.newContext(viewport.contextOptions)
      const page = await context.newPage()
      page.setDefaultTimeout(60_000)
      page.setDefaultNavigationTimeout(120_000)

      for (const p of pathsToAudit) {
        const url = `${baseUrl}${p}`
        // eslint-disable-next-line no-console
        console.log(`[ui-audit] ${viewport.name} ${url}`)

        const consoleErrors: string[] = []
        const handler = (msg: { type: () => string; text: () => string }) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text())
        }
        page.on('console', handler as never)

        await page.goto(url, { waitUntil: 'domcontentloaded' })
        await page.waitForLoadState('networkidle', { timeout: 25_000 }).catch(() => undefined)
        await page.waitForTimeout(250)

        const title = await page.title()
        const metaDescriptionLocator = page.locator('meta[name="description"]')
        const metaDescription =
          (await metaDescriptionLocator.count()) > 0
            ? await metaDescriptionLocator.first().getAttribute('content')
            : null

        const canonicalLocator = page.locator('link[rel="canonical"]')
        const canonicalHref =
          (await canonicalLocator.count()) > 0
            ? await canonicalLocator.first().getAttribute('href')
            : null

        const h1 = (await page.locator('h1').allTextContents())
          .map((text) => text.trim())
          .filter(Boolean)

        const hasSkipToContentLink = (await page
          .locator('a[href="#main-content"]')
          .allTextContents())
          .some((text) => text.toLowerCase().includes('skip'))

        const navAriaLabel = await page.locator('nav').first().getAttribute('aria-label')

        const safePath = (p === '/' ? 'home' : p.replace(/^\//, '').replace(/[^\w-]+/g, '-')).replace(
          /-+/g,
          '-'
        )
        const screenshotPath = path.join(screenshotDir, `${viewport.name}-${safePath}.png`)
        let screenshotError: string | undefined
        try {
          await page.screenshot({ path: screenshotPath, fullPage: true })
        } catch (err) {
          try {
            await page.screenshot({ path: screenshotPath, fullPage: false })
          } catch {
            // ignore secondary failure
          }
          screenshotError = err instanceof Error ? err.message : String(err)
        }

        results.push({
          viewport: viewport.name,
          url,
          title,
          metaDescription,
          canonicalHref,
          h1,
          hasSkipToContentLink,
          navAriaLabel,
          consoleErrors,
          ...(screenshotError ? { screenshotError } : {}),
        })

        page.off('console', handler as never)
      }

      await context.close()
      await browser.close()
    }
  } finally {
    await new Promise<void>((resolve) => {
      if (!server) return resolve()
      server.close(() => resolve())
    })
  }

  const payload = {
    startedAt,
    baseUrl,
    paths: pathsToAudit,
    results,
  }

  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2), 'utf8')
  // eslint-disable-next-line no-console
  console.log(`[ui-audit] wrote ${outputPath}`)
  // eslint-disable-next-line no-console
  console.log(`[ui-audit] screenshots ${screenshotDir}`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
})
